import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { EntryForm } from "@/components/forms/EntryForm";

export const metadata: Metadata = {
  title: "エントリー",
  description:
    "JQITへのエントリー・カジュアル面談のお申し込みフォーム。経験を活かして次のステージへ進みたい方を歓迎します。",
  alternates: { canonical: "/entry" },
};

export default function EntryPage() {
  return (
    <section className="py-20 md:py-[120px]">
      <Container className="max-w-[720px]">
        <SectionHead
          kicker="Entry"
          title="エントリー"
          lead="本応募・カジュアル面談、どちらも歓迎します。カジュアル面談は、聞きたいことや興味のある職種だけでも大丈夫です。"
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
