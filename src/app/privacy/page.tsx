import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "JQIT 採用サイトにおける個人情報の取扱いについて。",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "1. 個人情報の取得",
    b: "当社は、採用エントリーフォーム等を通じて、氏名・連絡先・職務経歴等の個人情報を、適法かつ公正な手段により取得します。",
  },
  {
    h: "2. 利用目的",
    b: "取得した個人情報は、採用選考・採用に関するご連絡・採用活動の改善のために利用します。これら以外の目的では利用しません。",
  },
  {
    h: "3. 第三者提供",
    b: "法令に基づく場合等を除き、ご本人の同意なく個人情報を第三者に提供することはありません。",
  },
  {
    h: "4. 安全管理",
    b: "個人情報への不正アクセス・紛失・漏洩等を防止するため、適切な安全管理措置を講じます。",
  },
  {
    h: "5. 開示・訂正・削除等",
    b: "ご本人からの個人情報の開示・訂正・削除等のご請求には、合理的な範囲で速やかに対応します。",
  },
  {
    h: "6. お問い合わせ窓口",
    b: "個人情報の取扱いに関するお問い合わせは、当社採用担当までご連絡ください。",
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-[120px]">
      <Container className="max-w-[800px]">
        <SectionHead
          kicker="Privacy Policy"
          title="プライバシーポリシー"
          lead="本ポリシーは、JQIT 採用サイトにおける個人情報の取扱いについて定めるものです。"
          headingLevel="h1"
        />
        <div className="flex flex-col gap-9 border-t border-line pt-12">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-serif text-[19px] font-medium text-ink">
                {s.h}
              </h2>
              <p className="mt-3 font-sans text-[14px] leading-[2] text-body">
                {s.b}
              </p>
            </div>
          ))}
          <p className="mt-4 font-sans text-[13px] text-muted">
            制定日：2026年6月11日 / JQIT
          </p>
        </div>
      </Container>
    </section>
  );
}
