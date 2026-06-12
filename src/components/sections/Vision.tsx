import { Container } from "@/components/ui/Container";
import { HeroParticles } from "@/components/sections/HeroParticles";

/**
 * 理念/ビジョンセクション。縦書き明朝の「挑戦と革新」を墨グラデ(赤→黒)で大きく据え、
 * 既存の粒子コンステレーションを背景に流用。横書きのタグライン＋英字ラベル＋斜め赤線で
 * 和×モダンのエディトリアルに。hero(集合写真)とは別の"世界観"の見せ場。
 */
export function Vision() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-40">
      {/* 粒子背景（流用） */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <HeroParticles />
      </div>
      {/* 斜めの赤線 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-[-10%] left-[40%] w-px origin-top rotate-[24deg] bg-gradient-to-b from-brand/0 via-brand/45 to-brand/0"
      />

      <Container className="relative">
        <div className="relative flex min-h-[460px] items-start md:min-h-[640px]">
          {/* 縦書き大見出し（墨グラデ 赤→黒） */}
          <h2 className="bg-gradient-to-b from-brand via-ink to-ink bg-clip-text font-serif text-[64px] leading-none font-bold tracking-[0.04em] text-transparent [writing-mode:vertical-rl] md:text-[112px]">
            挑戦と革新
          </h2>

          {/* 英字ラベル（縦書きの足元） */}
          <div className="mt-auto mb-1 ml-5 font-mono text-[10px] leading-[2.4] tracking-[0.22em] text-muted md:ml-9">
            CHALLENGE
            <br />
            &amp; INNOVATION
            <br />
            <br />
            <span className="text-ink">OPEN THE FUTURE</span>
            <br />
            FOR OUR CLIENTS
            <span className="mt-3 block h-px w-9 bg-brand" />
          </div>

          {/* タグライン（右上） */}
          <div className="absolute top-14 right-0 max-w-[252px] text-right md:top-24 md:max-w-[560px]">
            <p className="font-serif text-[22px] leading-[1.7] font-bold tracking-[0.04em] text-ink md:text-[36px]">
              で顧客の<em className="not-italic text-brand">未来</em>を切り開く。
            </p>
            <span className="mt-5 ml-auto block h-px w-44 bg-brand/60 md:w-56" />
          </div>
        </div>
      </Container>
    </section>
  );
}
