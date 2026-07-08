import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "受付完了",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className="py-28 text-center md:py-[160px]">
      <Container className="max-w-[680px]">
        <div className="flex justify-center">
          <Kicker>Thank You</Kicker>
        </div>
        <h1 className="mt-6 font-serif text-[30px] font-medium leading-[1.6] tracking-[0.03em] text-ink md:text-[40px]">
          お申し込みを
          <br />
          受け付けました。
        </h1>
        <p className="mx-auto mt-7 max-w-[460px] font-sans text-[15px] leading-[2] text-muted">
          カジュアル面談・ご応募のお申し込みありがとうございます。担当者より追ってご連絡いたします。今しばらくお待ちください。
        </p>
        <div className="mt-11 flex justify-center">
          <Button href="/" variant="outline">
            トップへ戻る
          </Button>
        </div>
      </Container>
    </section>
  );
}
