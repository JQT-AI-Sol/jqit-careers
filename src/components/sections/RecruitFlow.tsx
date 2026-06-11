import { recruitFlow } from "@/lib/content";

export function RecruitFlow() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
      {recruitFlow.map((s) => (
        <div key={s.step} className="bg-paper p-8">
          <div className="font-mono text-[13px] font-semibold tracking-[0.1em] text-brand">
            STEP {s.step}
          </div>
          <h3 className="mt-4 font-serif text-[20px] font-medium text-ink">
            {s.title}
          </h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.9] text-muted">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
