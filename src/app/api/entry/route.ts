import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { entrySchema } from "@/lib/entry-schema";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyTurnstile } from "@/lib/turnstile";
import { hashIp, isRateLimited } from "@/lib/rate-limit";
import {
  applicationTypeLabels,
  experienceLabels,
  positionLabels,
} from "@/lib/entry-schema";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 400 },
    );
  }

  // 1. honeypot（botは hidden の company を埋めがち）→ 成功を装って破棄
  if ((form.get("company") as string)?.trim()) {
    return NextResponse.json({ ok: true });
  }

  // IP・レート制限
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const ipHash = hashIp(ip);
  if (isRateLimited(ipHash)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  // 2. Turnstile 検証
  const turnstileToken = (form.get("turnstileToken") as string) || null;
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: "turnstile", fieldErrors: {} },
      { status: 400 },
    );
  }

  // 3. 入力検証（zod）
  const parsed = entrySchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    applicationType: form.get("applicationType"),
    desiredPositions: form.getAll("desiredPositions"),
    experience: form.get("experience"),
    message: form.get("message"),
    portfolioUrl: form.get("portfolioUrl") ?? "",
    consent: form.get("consent") === "true" || form.get("consent") === "on",
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "validation", fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // 4. 履歴書ファイル（任意）
  const resume = form.get("resume");
  let resumePath: string | null = null;
  const supabase = getSupabaseAdmin();

  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "file_too_large" },
        { status: 413 },
      );
    }
    if (supabase) {
      try {
        const ext = resume.name.split(".").pop() || "bin";
        const path = `resumes/${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
        const buf = Buffer.from(await resume.arrayBuffer());
        const { error } = await supabase.storage
          .from("resumes")
          .upload(path, buf, { contentType: resume.type, upsert: false });
        if (!error) resumePath = path;
        else console.warn("[entry] resume upload failed:", error.message);
      } catch (e) {
        console.warn("[entry] resume upload error:", e);
      }
    }
  }

  // 5. DB保存（未設定ならログにフォールバック）
  const record = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    application_type: data.applicationType,
    desired_positions: data.desiredPositions,
    experience: data.experience,
    message: data.message,
    portfolio_url: data.portfolioUrl || null,
    resume_path: resumePath,
    consent: data.consent,
    source: (form.get("source") as string) || null,
    user_agent: request.headers.get("user-agent") ?? null,
    ip_hash: ipHash,
  };

  if (supabase) {
    const { error } = await supabase.from("applications").insert(record);
    if (error) {
      console.error("[entry] db insert failed:", error.message);
      return NextResponse.json(
        { ok: false, error: "server" },
        { status: 500 },
      );
    }
  } else {
    console.info(
      "[entry] (degraded: Supabase未設定) 受信した応募:",
      JSON.stringify({ ...record, ip_hash: "***" }, null, 2),
    );
  }

  // 6. メール通知（best-effort。失敗しても応募は受理済み）
  await sendNotification(data).catch((e) =>
    console.warn("[entry] mail send failed:", e),
  );

  return NextResponse.json({ ok: true });
}

async function sendNotification(
  data: import("@/lib/entry-schema").EntryInput,
) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RECRUIT_NOTIFY_TO;
  if (!key || !to) {
    console.info("[entry] (degraded: Resend未設定) メール通知スキップ");
    return;
  }
  const resend = new Resend(key);
  const positions = data.desiredPositions
    .map((p) => positionLabels[p])
    .join("・");
  const subject = `【採用エントリー】${data.name} 様 / ${applicationTypeLabels[data.applicationType]} / ${positions}`;
  const html = `
    <h2>採用エントリーが届きました</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>応募種別</b></td><td>${applicationTypeLabels[data.applicationType]}</td></tr>
      <tr><td><b>氏名</b></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><b>メール</b></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><b>電話</b></td><td>${escapeHtml(data.phone)}</td></tr>
      <tr><td><b>希望職種</b></td><td>${positions}</td></tr>
      <tr><td><b>経験区分</b></td><td>${experienceLabels[data.experience]}</td></tr>
      <tr><td><b>ポートフォリオ</b></td><td>${escapeHtml(data.portfolioUrl || "-")}</td></tr>
      <tr><td valign="top"><b>メッセージ</b></td><td>${escapeHtml(data.message).replace(/\n/g, "<br>")}</td></tr>
    </table>`;
  await resend.emails.send({
    from: process.env.RECRUIT_FROM ?? "JQIT Careers <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
