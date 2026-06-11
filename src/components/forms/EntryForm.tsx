"use client";

import { useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  entrySchema,
  type EntryInput,
  applicationTypes,
  applicationTypeLabels,
  experiences,
  experienceLabels,
  positions,
  positionLabels,
} from "@/lib/entry-schema";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const labelCls = "mb-2 block font-sans text-[13px] font-bold text-ink";
const reqCls = "ml-1 text-brand";
const inputCls =
  "w-full rounded-card border border-line bg-paper px-4 py-3 font-sans text-[15px] text-body outline-none transition-colors focus:border-brand";
const errCls = "mt-1.5 font-sans text-[12px] text-brand";

export function EntryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPosition = searchParams.get("position");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryInput>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      applicationType: "apply",
      desiredPositions: positions.includes(
        initialPosition as (typeof positions)[number],
      )
        ? [initialPosition as (typeof positions)[number]]
        : [],
      portfolioUrl: "",
    },
  });

  const honeypotRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: EntryInput) => {
    setStatus("submitting");
    setServerError(null);

    // 静的書き出し（GitHub Pages 等のテスト環境）ではサーバーAPIが無いため、
    // 送信は行わずサンクス画面へ遷移する（本番=Vercelでは通常どおりAPIへ送信）。
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      router.push("/entry/thanks");
      return;
    }

    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("email", values.email);
    fd.set("phone", values.phone);
    fd.set("applicationType", values.applicationType);
    values.desiredPositions.forEach((p) => fd.append("desiredPositions", p));
    fd.set("experience", values.experience);
    fd.set("message", values.message);
    fd.set("portfolioUrl", values.portfolioUrl ?? "");
    fd.set("consent", values.consent ? "true" : "false");
    if (resume) fd.set("resume", resume);
    if (token) fd.set("turnstileToken", token);
    fd.set("company", honeypotRef.current?.value ?? ""); // honeypot
    fd.set("source", searchParams.toString());

    try {
      const res = await fetch("/api/entry", { method: "POST", body: fd });
      if (res.ok) {
        router.push("/entry/thanks");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (body.error === "rate_limited") {
        setServerError(
          "送信が集中しています。少し時間をおいて再度お試しください。",
        );
      } else if (body.error === "file_too_large") {
        setServerError("履歴書ファイルは10MB以内にしてください。");
      } else if (body.error === "turnstile") {
        setServerError("認証に失敗しました。再度お試しください。");
      } else {
        setServerError(
          "送信に失敗しました。お手数ですが時間をおいて再度お試しください。",
        );
      }
      setStatus("error");
    } catch {
      setServerError("通信エラーが発生しました。再度お試しください。");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-7"
    >
      {/* honeypot（人間は入力しない。値があれば bot とみなす） */}
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <Field label="お名前" required error={errors.name?.message}>
        {(id) => <input id={id} className={inputCls} {...register("name")} />}
      </Field>

      <Field label="メールアドレス" required error={errors.email?.message}>
        {(id) => (
          <input id={id} type="email" className={inputCls} {...register("email")} />
        )}
      </Field>

      <Field label="電話番号" required error={errors.phone?.message}>
        {(id) => (
          <input id={id} type="tel" className={inputCls} {...register("phone")} />
        )}
      </Field>

      <Field
        label="応募種別"
        required
        error={errors.applicationType?.message}
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {applicationTypes.map((t) => (
            <label key={t} className="flex items-center gap-2 font-sans text-[14px]">
              <input type="radio" value={t} {...register("applicationType")} />
              {applicationTypeLabels[t]}
            </label>
          ))}
        </div>
      </Field>

      <Field
        label="希望職種（複数選択可）"
        required
        error={errors.desiredPositions?.message as string | undefined}
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {positions.map((p) => (
            <label key={p} className="flex items-center gap-2 font-sans text-[14px]">
              <input
                type="checkbox"
                value={p}
                {...register("desiredPositions")}
              />
              {positionLabels[p]}
            </label>
          ))}
        </div>
      </Field>

      <Field label="経験区分" required error={errors.experience?.message}>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {experiences.map((e) => (
            <label key={e} className="flex items-center gap-2 font-sans text-[14px]">
              <input type="radio" value={e} {...register("experience")} />
              {experienceLabels[e]}
            </label>
          ))}
        </div>
      </Field>

      <Field label="自己PR・メッセージ" required error={errors.message?.message}>
        {(id) => (
          <textarea
            id={id}
            rows={6}
            className={inputCls}
            {...register("message")}
          />
        )}
      </Field>

      <Field
        label="ポートフォリオ / GitHub 等 URL（任意）"
        error={errors.portfolioUrl?.message}
      >
        {(id) => (
          <input
            id={id}
            type="url"
            placeholder="https://"
            className={inputCls}
            {...register("portfolioUrl")}
          />
        )}
      </Field>

      <Field label="履歴書 / 職務経歴書（任意・PDF等 10MBまで）">
        <div className="flex flex-wrap items-center gap-3">
          {/* OS標準UIを視覚的に隠しつつ機能は維持。labelのhtmlForで紐付け */}
          <input
            id="resume-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
          <label
            htmlFor="resume-input"
            className="inline-flex cursor-pointer items-center rounded-card border border-line bg-cream px-4 py-2 font-sans text-[13px] text-body transition-colors hover:border-brand"
          >
            ファイルを選択
          </label>
          <span className="font-sans text-[13px] text-body">
            {resume ? resume.name : "未選択"}
          </span>
        </div>
      </Field>

      <div>
        <label className="flex items-start gap-2.5 font-sans text-[14px] text-body">
          <input type="checkbox" value="true" {...register("consent")} className="mt-1" />
          <span>
            <a href="/privacy" target="_blank" className="text-brand underline">
              プライバシーポリシー
            </a>
            に同意します
            <span className={reqCls}>*</span>
          </span>
        </label>
        {errors.consent && (
          <p className={errCls}>{errors.consent.message}</p>
        )}
      </div>

      {siteKey && (
        <Turnstile siteKey={siteKey} onSuccess={setToken} options={{ theme: "light" }} />
      )}

      {serverError && (
        <p className="rounded-card border border-brand/30 bg-brand/5 px-4 py-3 font-sans text-[14px] text-brand-dark">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 w-full rounded-card bg-brand px-9 py-4 font-sans text-[15px] font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 md:w-auto"
      >
        {status === "submitting" ? "送信中…" : "エントリーを送信する"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  /**
   * 単一入力フィールドは render-prop で受け取った id を input に渡し、
   * label と htmlFor/id で紐付ける（スクリーンリーダー対応）。
   * ラジオ/チェックボックス群など複数入力のフィールドは ReactNode を渡し、
   * label はグループ見出しとして機能する。
   */
  children: React.ReactNode | ((id: string) => React.ReactNode);
}) {
  const id = useId();
  const isRenderProp = typeof children === "function";
  return (
    <div>
      <label className={labelCls} htmlFor={isRenderProp ? id : undefined}>
        {label}
        {required && <span className={reqCls}>*</span>}
      </label>
      {isRenderProp ? children(id) : children}
      {error && <p className={errCls}>{error}</p>}
    </div>
  );
}
