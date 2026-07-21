import { appeals } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";

export function Appeal() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
      {appeals.map((a, i) => (
        <FadeIn
          key={a.no}
          className="group relative overflow-hidden"
          style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
        >
          {/* 極薄の巨大番号（背景タイポ） */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-2 select-none font-display text-[60px] leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-brand/[0.12] md:text-[100px]"
          >
            {a.no}
          </span>
          <GeoMark index={i + 1} size={28} className="relative text-brand" />
          <h3 className="relative mt-4 font-serif text-[22px] font-medium leading-[1.6] text-ink">
            {a.title}
          </h3>
          <p className="relative mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted">
            {a.body}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
