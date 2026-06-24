import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { appeals } from "@/lib/content";

// デザインの並び（三角・円・六条星）に合わせた GeoMark インデックス
const iconIndex = [4, 2, 3];

/**
 * Why JQIT：JQITで働く3つの理由。
 * 各カードに極薄の特大連番（背景タイポ）とアイコン。
 */
export function WhyJqit() {
  return (
    <section className="relative overflow-hidden bg-cream py-[72px] md:py-[140px]">
      <Container className="relative">
        <SectionHead kicker="Why JQIT" title="JQITで働く、3つの理由。" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:gap-[56px] lg:grid-cols-3">
          {appeals.map((a, i) => (
            <FadeIn
              key={a.no}
              style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
              className="relative overflow-hidden"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-2 right-0 font-display text-[100px] leading-none text-ink/[0.06]"
              >
                {a.no}
              </span>
              <GeoMark index={iconIndex[i]} size={28} className="relative text-brand" />
              <h3 className="relative mt-4 font-serif text-[22px] font-medium leading-[1.6] text-ink">
                {a.title}
              </h3>
              <p className="relative mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted">
                {a.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
