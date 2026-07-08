import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { EntryForm } from "@/components/forms/EntryForm";

export const metadata: Metadata = {
  title: "カジュアル面談",
  description:
    "JQITへのカジュアル面談・本応募のお申し込みフォーム。経験を活かして次のステージへ進みたい方を歓迎します。",
  alternates: { canonical: "/entry" },
};

export default function EntryPage() {
  return (
    <section className="py-20 md:py-[120px]">
      <Container className="max-w-[720px]">
        <SectionHead
          kicker="Casual Interview"
          title="カジュアル面談"
          lead="まずは話を聞いてみたい、興味のある職種について相談したい。そんな段階でも歓迎します。本応募もこちらから可能です。"
          headingLevel="h1"
        />
        {process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" && (
          <p className="mb-8 rounded-card border border-line bg-cream px-4 py-3 font-sans text-[13px] text-muted">
            ※ こちらはプレビュー環境です。フォームの送信機能は無効化されています。
          </p>
        )}
        <Suspense fallback={<div className="font-sans text-muted">読み込み中…</div>}>
          <EntryForm />
        </Suspense>
      </Container>
    </section>
  );
}
