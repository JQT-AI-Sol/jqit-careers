import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { HeroParticles } from "@/components/sections/HeroParticles";

export function Hero() {
  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <span
          className="kicker hero-rise"
          style={{ animationDelay: "0.05s" }}
        >
          Careers at JQIT
        </span>

        <h1 className="mt-7 font-serif text-[34px] font-medium leading-[1.6] tracking-[0.04em] text-ink md:text-[62px] md:leading-[1.55]">
          <span className="hero-mask">
            <span style={{ animationDelay: "0.18s" }}>挑戦と革新で、</span>
          </span>
          <br />
          <span className="hero-mask">
            <span style={{ animationDelay: "0.32s" }}>
              未来を<em className="not-italic text-brand">切り拓く</em>。
            </span>
          </span>
        </h1>

        <p
          className="mt-9 max-w-[520px] font-sans text-base leading-[2.1] text-body hero-rise md:mt-10 md:text-[17px]"
          style={{ animationDelay: "0.55s" }}
        >
          開発・インフラ・QA、そしてAI。
          <br className="hidden md:block" />
          最新技術に挑むITのプロフェッショナル集団で、
          <br className="hidden md:block" />
          あなたのキャリアを次のステージへ。
        </p>

        <div
          className="mt-11 flex flex-col items-start gap-6 hero-rise md:flex-row md:items-center md:gap-9"
          style={{ animationDelay: "0.68s" }}
        >
          <Button href="/entry" variant="primary">
            エントリーする
          </Button>
          <Button href="/jobs" variant="arrow">
            職種を見る →
          </Button>
        </div>
      </Container>

      <Container className="mt-16 md:mt-[76px]">
        <div
          className="relative h-[280px] w-full overflow-hidden rounded-card hero-zoom md:h-[520px]"
          style={{ animationDelay: "0.4s" }}
        >
          <Image
            src={asset("/images/hero/hero.jpg")}
            alt="ガラスの大空間で未来を見据える"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1160px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/25" />
          <HeroParticles />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute bottom-0 left-0 h-[120px] w-1.5 bg-brand" />
          <span className="absolute bottom-10 left-10 font-mono text-[11px] tracking-[0.2em] text-white/90 uppercase">
            技術で、本質的な課題を解く。
          </span>
        </div>
      </Container>
    </section>
  );
}
