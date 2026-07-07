import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/SectionHead";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-cream py-[100px] text-center md:py-[150px]">
      <GeoBackdrop />
      <Container className="relative">
        <div className="flex justify-center">
          <Kicker>Join Us</Kicker>
        </div>
        <h2 className="mt-6 font-serif text-[28px] font-medium leading-[1.6] tracking-[0.03em] text-ink md:text-[44px]">
          挑戦したいあなたを、
          <br />
          <span className="text-brand">待っています。</span>
        </h2>
        <p className="mt-6 font-sans text-[15px] text-muted">
          まずはカジュアル面談から。本応募も歓迎。お気軽にエントリーください。
        </p>
        <div className="mt-11 flex justify-center">
          <Button href="/entry" variant="primary">
            エントリーフォームへ
          </Button>
        </div>
      </Container>
    </section>
  );
}
