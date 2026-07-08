import { strengths } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";

export function StrengthGrid() {
  return (
    <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
      {strengths.map((s, i) => (
        <FadeIn
          key={s.no}
          className="group brand-line-card relative overflow-hidden border-b border-line py-10 pr-7"
          style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
        >
          {/* 極薄の巨大番号（背景タイポ） */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-8 select-none font-display text-[46px] leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-brand/[0.13] md:text-[72px]"
          >
            {s.no}
          </span>
          {/* 領域を示す幾何学マーク */}
          <GeoMark index={i} size={24} className="relative text-brand" />
          <h3 className="brand-line-label relative mt-5 font-serif text-[23px] font-medium text-ink">
            {s.title}
          </h3>
          <p className="relative mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted min-h-[4.6em] md:min-h-[5.1em]">
            {s.body}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
