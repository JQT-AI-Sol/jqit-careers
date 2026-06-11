import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { EntryForm } from "@/components/forms/EntryForm";

export const metadata: Metadata = {
  title: "エントリー",
  description:
    "JQITへのエントリー・カジュアル面談のお申し込みフォーム。未経験から経験者まで歓迎します。",
};

export default function EntryPage() {
  return (
    <section className="py-20 md:py-[120px]">
      <Container className="max-w-[720px]">
        <SectionHead
          kicker="Entry"
          title="エントリー"
          lead="本応募・カジュアル面談、どちらも歓迎します。下記フォームよりお気軽にお申し込みください。"
        />
        <Suspense fallback={<div className="font-sans text-muted">読み込み中…</div>}>
          <EntryForm />
        </Suspense>
      </Container>
    </section>
  );
}
