import { appeals } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { GhostNumber } from "@/components/ui/GhostNumber";

export function Appeal() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
      {appeals.map((a, i) => (
        <FadeIn
          key={a.no}
          className="group relative overflow-hidden"
          style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
        >
          <GhostNumber className="right-0 top-2 text-[60px] md:text-[100px]">
            {a.no}
          </GhostNumber>
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
