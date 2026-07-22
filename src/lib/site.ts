export const site = {
  name: "JQIT",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://careers.jqit.co.jp",
  description:
    "JQITの採用サイト。開発・インフラ・QA・AI・営業。最新技術に挑むITのプロフェッショナル集団で、経験を活かして挑戦したい人を歓迎します。",
  corporateUrl: "https://jqit.co.jp",
  novaUrl: "https://nova-ai.jp",
  aiSupportUrl: "https://ai.jqit.co.jp/",
  tagline: "挑戦と革新で、未来を切り拓く。",
} as const;

export const nav = [
  { href: "/about", label: "私たちについて" },
  { href: "/jobs", label: "職種紹介" },
  { href: "/interviews", label: "社員の声" },
  { href: "/culture", label: "カルチャー" },
  { href: "/recruit", label: "採用フロー" },
] as const;

export const footerNav = {
  Recruit: [
    { href: "/about", label: "私たちについて" },
    { href: "/jobs", label: "職種紹介" },
    { href: "/interviews", label: "社員の声" },
    { href: "/culture", label: "カルチャー" },
    { href: "/recruit", label: "採用フロー" },
  ],
  Company: [
    { href: "/about", label: "会社概要" },
    { href: "/about#business", label: "事業について" },
    { href: "/about#strength", label: "JQITの強み" },
    { href: "/about#product", label: "製品 NOVA" },
    { href: "/about#ai-enablement", label: "AI導入支援" },
    { href: site.corporateUrl, label: "コーポレートサイト", external: true },
  ],
  Contact: [
    { href: "/entry", label: "カジュアル面談" },
    { href: "/entry", label: "お問い合わせ" },
    { href: "/privacy", label: "プライバシーポリシー" },
  ],
} as const;
