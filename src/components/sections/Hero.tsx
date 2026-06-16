import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { HeroParticles } from "@/components/sections/HeroParticles";
import { LightTrail } from "@/components/sections/LightTrail";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24">
      {/* ネットワーク（粒子）背景 */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <HeroParticles />
      </div>
      {/* 赤い光跡（右側を埋める装飾） */}
      <LightTrail className="-z-10 right-0 bottom-0 hidden h-[135%] w-[58%] md:block" />
      {/* 斜めの赤線（デスクトップのみ） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-[-10%] left-[44%] hidden w-px origin-top rotate-[24deg] bg-gradient-to-b from-brand/0 via-brand/40 to-brand/0 md:block"
      />

      <Container>
        <div className="flex items-start gap-8 md:gap-14">
          {/* 縦書き「挑戦と革新」墨グラデ（赤→黒） */}
          <h1
            className="hero-rise shrink-0 bg-gradient-to-b from-brand via-ink to-ink bg-clip-text font-serif text-[68px] leading-none font-bold tracking-[0.04em] text-transparent [writing-mode:vertical-rl] md:text-[120px]"
            style={{ animationDelay: "0.1s" }}
          >
            挑戦と革新
          </h1>

          {/* 右：kicker＋タグライン＋リード＋CTA */}
          <div className="max-w-[520px] pt-4 md:pt-16">
            <span
              className="kicker hero-rise"
              style={{ animationDelay: "0.05s" }}
            >
              Careers at JQIT
            </span>

            <p
              className="hero-rise mt-5 font-serif text-[24px] leading-[1.55] font-bold tracking-[0.03em] text-ink md:mt-8 md:text-[42px]"
              style={{ animationDelay: "0.22s" }}
            >
              で顧客の<em className="not-italic text-brand">未来</em>を
              <br className="md:hidden" />
              <br className="hidden md:block" />
              切り拓く。
            </p>

            <p
              className="hero-rise mt-7 max-w-[520px] font-sans text-base leading-[2.1] text-body md:mt-9 md:text-[17px]"
              style={{ animationDelay: "0.55s" }}
            >
              ひとりで客先に放り込まれ、レガシーに塩漬け。
              <br className="hidden md:block" />
              その“当たり前”を、私たちは変える。チームで率い、推奨技術で伸び、AIを現場へ。
              <br className="hidden md:block" />
              その先には、受託・自社AIへの道も。
            </p>

            <div
              className="hero-rise mt-8 flex flex-col items-start gap-5 md:mt-11 md:flex-row md:items-center md:gap-9"
              style={{ animationDelay: "0.68s" }}
            >
              <Button href="/entry" variant="primary">
                エントリーする
              </Button>
              <Button href="/jobs" variant="arrow">
                職種を見る →
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* 集合写真ブロック（縦書きヒーローの下に維持） */}
      <Container className="mt-16 md:mt-[88px]">
        <div
          className="relative h-[380px] w-full overflow-hidden rounded-2xl hero-zoom md:h-[600px]"
          style={{ animationDelay: "0.4s" }}
        >
          <Image
            src={asset("/images/people/r5.jpg")}
            alt="桜並木に集うJQITのメンバー"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1160px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute bottom-0 left-0 h-[120px] w-1.5 bg-brand" />
          <span className="absolute bottom-10 left-10 font-mono text-[11px] tracking-[0.2em] text-white/90 uppercase">
            技術で、本質的な課題を解く。
          </span>
          <span
            className="absolute right-10 bottom-10 hidden items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/70 uppercase hero-rise md:flex"
            style={{ animationDelay: "0.9s" }}
          >
            Scroll
            <span className="block h-7 w-px bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
          </span>
        </div>
      </Container>
    </section>
  );
}
