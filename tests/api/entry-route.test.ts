import { describe, it, expect, beforeAll } from "vitest";
import { POST } from "@/app/api/entry/route";

/**
 * これらのテストは Supabase / Resend / Turnstile を「環境変数未設定の
 * デグレード状態」で動かす（モック不要）。
 * - TURNSTILE_SECRET_KEY 未設定 → Turnstile 検証スキップ（通る・fetchは呼ばれない）
 * - SUPABASE_URL / *_KEY 未設定 → DB保存はログにフォールバックし 200 ok:true
 * - RESEND_API_KEY 未設定 → メール通知スキップ
 */
beforeAll(() => {
  delete process.env.TURNSTILE_SECRET_KEY;
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.RESEND_API_KEY;
  delete process.env.RECRUIT_NOTIFY_TO;
});

interface EntryFields {
  name?: string;
  email?: string;
  phone?: string;
  applicationType?: string;
  desiredPositions?: string[];
  experience?: string;
  message?: string;
  portfolioUrl?: string;
  consent?: string;
  company?: string; // honeypot
}

/** 妥当なフィールド値のベース。 */
function baseFields(): EntryFields {
  return {
    name: "山田太郎",
    email: "taro@example.com",
    phone: "09012345678",
    applicationType: "apply",
    desiredPositions: ["dev"],
    experience: "experienced",
    message: "よろしくお願いします。",
    portfolioUrl: "",
    consent: "true",
  };
}

function buildFormData(fields: EntryFields): FormData {
  const fd = new FormData();
  const set = (k: string, v: string | undefined) => {
    if (v !== undefined) fd.set(k, v);
  };
  set("name", fields.name);
  set("email", fields.email);
  set("phone", fields.phone);
  set("applicationType", fields.applicationType);
  set("experience", fields.experience);
  set("message", fields.message);
  set("portfolioUrl", fields.portfolioUrl);
  set("consent", fields.consent);
  set("company", fields.company);
  for (const p of fields.desiredPositions ?? []) {
    fd.append("desiredPositions", p);
  }
  return fd;
}

// レート制限（同一IPハッシュで5回まで）を避けるため、テストごとに固有IPを使う。
let ipCounter = 0;
function nextIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

async function postEntry(formData: FormData) {
  const req = new Request("http://localhost/api/entry", {
    method: "POST",
    body: formData,
    headers: { "x-forwarded-for": nextIp() },
  });
  // route は NextRequest を期待するが formData()/headers.get() のみ使用するため
  // Web標準 Request で代替できる。
  const res = await POST(req as never);
  const json = (await res.json()) as {
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string[]>;
  };
  return { res, json };
}

describe("POST /api/entry - 正常系", () => {
  it("妥当な FormData → 200 ok:true（デグレード状態でも受理）", async () => {
    const { res, json } = await postEntry(buildFormData(baseFields()));
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("desiredPositions を複数 → 200 ok:true", async () => {
    const fields = baseFields();
    fields.desiredPositions = ["dev", "infra", "qa", "ai"];
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("consent=on（チェックボックス）でも受理する", async () => {
    const fields = baseFields();
    fields.consent = "on";
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("applicationType=casual でも受理する", async () => {
    const fields = baseFields();
    fields.applicationType = "casual";
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });
});

describe("POST /api/entry - honeypot", () => {
  it("company に値があれば成功を装って 200 ok:true で破棄する", async () => {
    const fields = baseFields();
    fields.company = "bot-filled-this";
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  it("company が空白のみなら通常処理される", async () => {
    const fields = baseFields();
    fields.company = "   ";
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
  });
});

describe("POST /api/entry - バリデーション失敗", () => {
  it("email が不正 → 400 validation + fieldErrors.email", async () => {
    const fields = baseFields();
    fields.email = "not-an-email";
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("validation");
    expect(json.fieldErrors?.email).toBeDefined();
  });

  it("desiredPositions 未選択 → 400 validation + fieldErrors.desiredPositions", async () => {
    const fields = baseFields();
    fields.desiredPositions = [];
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("validation");
    expect(json.fieldErrors?.desiredPositions).toBeDefined();
  });

  it("consent 未チェック → 400 validation + fieldErrors.consent", async () => {
    const fields = baseFields();
    fields.consent = undefined; // 送信しない
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("validation");
    expect(json.fieldErrors?.consent).toBeDefined();
  });

  it("name 空 → 400 validation", async () => {
    const fields = baseFields();
    fields.name = "";
    const { res, json } = await postEntry(buildFormData(fields));
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("validation");
    expect(json.fieldErrors?.name).toBeDefined();
  });
});

describe("POST /api/entry - 不正リクエスト", () => {
  it("multipart/form-data でない（formData parse 失敗）→ 400 invalid_request", async () => {
    const req = new Request("http://localhost/api/entry", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": nextIp(),
      },
      body: JSON.stringify({ name: "x" }),
    });
    const res = await POST(req as never);
    const json = (await res.json()) as { ok: boolean; error?: string };
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("invalid_request");
  });
});
