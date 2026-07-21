import { recruitFlow } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function RecruitFlow() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
      {recruitFlow.map((s, i) => (
        <FadeIn
          key={s.step}
          className="brand-line-card bg-paper p-8"
          style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
        >
          <div className="font-mono text-[13px] font-semibold tracking-[0.1em] text-brand">
            STEP {s.step}
          </div>
          <h3 className="brand-line-label mt-4 font-serif text-[20px] font-medium text-ink">
            {s.title}
          </h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.9] text-muted">
            {s.desc}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
