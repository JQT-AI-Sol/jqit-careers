import { stats } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function CultureBlock() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-[72px]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-12">
        {stats.map((s, i) => (
          <FadeIn
            key={s.label}
            style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
          >
            <div className="font-serif text-[44px] leading-none text-ink md:text-[54px]">
              {s.value}
              <span className="ml-1 text-2xl text-brand">{s.unit}</span>
            </div>
            <div className="mt-3.5 font-sans text-[12.5px] tracking-wide text-muted">
              {s.label}
            </div>
          </FadeIn>
        ))}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-3 [grid-auto-rows:170px]">
        <div className="row-span-2 rounded-card bg-gradient-to-br from-[#bdbbb5] to-[#4a4844] grayscale" />
        <div className="rounded-card bg-gradient-to-br from-[#cbc9c3] to-[#6b6964] grayscale" />
        <div className="rounded-card bg-gradient-to-br from-[#cbc9c3] to-[#6b6964] grayscale" />
      </div>
    </div>
  );
}
