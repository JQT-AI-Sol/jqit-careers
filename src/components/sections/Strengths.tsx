import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { strengths } from "@/lib/content";

// デザインの並び（十字・菱形・六条星・円）に合わせた GeoMark インデックス
const iconIndex = [0, 1, 3, 2];

/**
 * Our Strength：開発・インフラ・QA・AI の4専門領域。
 * 上罫線で区切ったグリッド。各カードに極薄の連番（背景タイポ）とアイコン。
 */
export function Strengths() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-[72px] md:py-[140px]"
    >
      <Container className="relative">
        <SectionHead
          kicker="Our Strength"
          title={
            <>
              4つの専門領域で、
              <br />
              社会に価値を生む。
            </>
          }
          lead="受託開発・自社サービス開発・AI導入コンサルまで。確かな技術力と、使う人を想う日本品質で、新しい価値を創造します。"
        />
        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((s, i) => (
            <FadeIn
              key={s.no}
              style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
              className="group relative overflow-hidden border-b border-line py-10 pr-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-8 right-0 font-display text-[72px] leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-brand/[0.13]"
              >
                {s.no}
              </span>
              <GeoMark index={iconIndex[i]} size={24} className="relative text-brand" />
              <h3 className="relative mt-5 font-serif text-[23px] font-medium text-ink">
                {s.title}
              </h3>
              <p className="relative mt-3.5 min-h-[5.1em] font-sans text-[13.5px] leading-[1.95] text-muted">
                {s.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
