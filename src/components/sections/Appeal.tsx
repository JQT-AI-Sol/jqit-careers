import { appeals } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function Appeal() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
      {appeals.map((a, i) => (
        <FadeIn
          key={a.no}
          style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
        >
          <div className="font-mono text-[13px] font-semibold tracking-[0.1em] text-brand">
            {a.no}
          </div>
          <h3 className="mt-4 font-serif text-[22px] font-medium leading-[1.6] text-ink">
            {a.title}
          </h3>
          <p className="mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted">
            {a.body}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
