import { strengths } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

const strengthLabels = [
  { name: "DEVELOPMENT", tags: ["Mobile", "Web", "Modern Stack"] },
  { name: "INFRASTRUCTURE", tags: ["Cloud", "IaC", "CI/CD"] },
  { name: "QUALITY ASSURANCE", tags: ["Test Design", "Automation"] },
  { name: "ARTIFICIAL INTELLIGENCE", tags: ["LLM", "Agent", "AI Native"] },
];

export function StrengthGrid() {
  return (
    <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
      {strengths.map((s, i) => (
        <FadeIn
          key={s.no}
          className="group brand-line-card relative overflow-hidden border-b border-line px-5 py-10 md:px-7"
          style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
        >
          <div className="relative flex min-h-[64px] items-start justify-between gap-4 border-b border-line pb-5">
            <div>
              <span className="block h-px w-8 bg-brand" />
              <span className="mt-4 block font-mono text-[10px] font-medium leading-[1.55] tracking-[0.16em] text-brand uppercase">
                {strengthLabels[i]?.name}
              </span>
            </div>
            <span className="shrink-0 select-none font-display text-[46px] leading-none text-ink/[0.07] transition-colors duration-500 group-hover:text-brand/[0.14] md:text-[56px]">
              {s.no}
            </span>
          </div>
          <h3 className="brand-line-label relative mt-6 font-serif text-[23px] font-medium text-ink">
            {s.title}
          </h3>
          <p className="relative mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted min-h-[4.6em] md:min-h-[5.1em]">
            {s.body}
          </p>
          <ul className="relative mt-5 flex flex-wrap gap-2">
            {strengthLabels[i]?.tags.map((tag) => (
              <li
                key={tag}
                className="border border-line bg-paper/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </FadeIn>
      ))}
    </div>
  );
}
