import Image from "next/image";
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
      <div className="grid grid-cols-2 gap-3 [grid-template-rows:176px_176px]">
        <div className="relative row-span-2 overflow-hidden rounded-card">
          <Image
            src="/images/culture/office.jpg"
            alt="ミニマルなオフィスで協働する様子"
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-card">
          <Image
            src="/images/culture/data.jpg"
            alt="データとAIのイメージ"
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-card">
          <Image
            src="/images/culture/light.jpg"
            alt="技術と革新を象徴する光"
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
