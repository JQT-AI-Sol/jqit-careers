import { z } from "zod";

export const applicationTypes = ["casual", "apply"] as const;
export const experiences = ["inexperienced", "experienced"] as const;
export const positions = ["dev", "infra", "qa", "ai", "sales"] as const;

export const entrySchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(50)
    .regex(/^[^\r\n]*$/, "お名前に改行は使用できません"),
  email: z.email("メールアドレスの形式が正しくありません"),
  phone: z
    .string()
    .min(10, "電話番号を入力してください")
    .max(15)
    .regex(/^[0-9+\-() ]+$/, "電話番号の形式が正しくありません"),
  applicationType: z.enum(applicationTypes, {
    error: "応募種別を選択してください",
  }),
  desiredPositions: z
    .array(z.enum(positions, { error: "希望職種を選択してください" }))
    .min(1, "希望職種を1つ以上選択してください"),
  experience: z.enum(experiences, {
    error: "経験区分を選択してください",
  }),
  message: z
    .string()
    .min(1, "メッセージを入力してください")
    .max(2000, "2000文字以内で入力してください"),
  portfolioUrl: z
    .union([z.url("URLの形式が正しくありません"), z.literal("")])
    .optional(),
  consent: z.literal(true, {
    message: "個人情報の取扱いに同意してください",
  }),
});

export type EntryInput = z.infer<typeof entrySchema>;

export const applicationTypeLabels: Record<
  (typeof applicationTypes)[number],
  string
> = {
  apply: "本応募",
  casual: "カジュアル面談希望",
};

export const experienceLabels: Record<
  (typeof experiences)[number],
  string
> = {
  inexperienced: "未経験",
  experienced: "経験者",
};

export const positionLabels: Record<(typeof positions)[number], string> = {
  dev: "開発",
  infra: "インフラ",
  qa: "QA",
  ai: "AI",
  sales: "営業",
};
