import { strengths } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function StrengthGrid() {
  return (
    <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
      {strengths.map((s, i) => (
        <FadeIn
          key={s.no}
          className="border-b border-line py-10 pr-7"
          style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
        >
          <div className="font-mono text-xs tracking-[0.1em] text-brand">
            {s.no}
          </div>
          <h3 className="mt-5 font-serif text-[23px] font-medium text-ink">
            {s.title}
          </h3>
          <p className="mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted">
            {s.body}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
