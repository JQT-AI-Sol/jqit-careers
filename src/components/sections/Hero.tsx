import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/SectionHead";

export function Hero() {
  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <Kicker>Careers at JQIT</Kicker>
        <h1 className="mt-7 font-serif text-[34px] font-medium leading-[1.6] tracking-[0.04em] text-ink md:text-[62px] md:leading-[1.55]">
          挑戦と革新で、
          <br />
          未来を<span className="text-brand">切り拓く</span>。
        </h1>
        <p className="mt-9 max-w-[520px] font-sans text-base leading-[2.1] text-body md:mt-10 md:text-[17px]">
          開発・インフラ・QA、そしてAI。
          <br className="hidden md:block" />
          最新技術に挑むITのプロフェッショナル集団で、
          <br className="hidden md:block" />
          あなたのキャリアを次のステージへ。
        </p>
        <div className="mt-11 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-9">
          <Button href="/entry" variant="primary">
            エントリーする
          </Button>
          <Button href="/jobs" variant="arrow">
            職種を見る →
          </Button>
        </div>
      </Container>

      <Container className="mt-16 md:mt-[76px]">
        <div className="relative h-[280px] w-full overflow-hidden rounded-card bg-gradient-to-br from-[#d8d6d0] via-[#9c9a94] to-[#3a3a36] grayscale md:h-[520px]">
          <span className="absolute bottom-0 left-0 h-[120px] w-1.5 bg-brand" />
          <span className="absolute bottom-10 left-10 font-mono text-[11px] tracking-[0.2em] text-white/85 uppercase">
            技術で、本質的な課題を解く。
          </span>
        </div>
      </Container>
    </section>
  );
}
