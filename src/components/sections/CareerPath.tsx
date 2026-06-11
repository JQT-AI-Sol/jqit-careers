import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import data from "@/../content/career.json";

export function CareerPath() {
  return (
    <section className="py-20 md:py-[120px]">
      <Container>
        <SectionHead
          kicker="Career & Growth"
          title="未経験から、専門家へ。"
          lead={data.intro}
        />

        {/* 成長ステップ */}
        <div className="grid grid-cols-1 border-t border-line md:grid-cols-4">
          {data.steps.map((s, i) => (
            <FadeIn
              key={s.no}
              className="relative border-b border-line py-9 md:border-b-0 md:border-r md:py-11 md:pr-7 md:pl-7 md:first:pl-0 md:last:border-r-0"
              style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
            >
              {/* 進む感を出す赤い矢印（PC、最終ステップ以外） */}
              {i < data.steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-11 -right-[7px] z-10 hidden font-mono text-[15px] leading-none text-brand md:block"
                >
                  →
                </span>
              )}
              <div className="font-mono text-[13px] font-semibold tracking-[0.1em] text-brand">
                {s.no}
              </div>
              <h3 className="mt-4 font-serif text-[20px] font-medium leading-[1.5] text-ink">
                {s.title}
              </h3>
              <div className="mt-2 font-mono text-[11px] tracking-[0.08em] text-muted">
                {s.period}
              </div>
              <p className="mt-3.5 font-sans text-[13.5px] leading-[1.95] text-muted">
                {s.desc}
              </p>
              <div className="mt-5 border-t border-line pt-4">
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  Support
                </span>
                <p className="mt-1.5 font-sans text-[13px] font-medium leading-[1.7] text-brand">
                  {s.support}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 広がるキャリア（職種横断の異動例） */}
        <div className="mt-16 md:mt-24">
          <FadeIn>
            <h3 className="font-serif text-[22px] font-medium text-ink md:text-[26px]">
              広がるキャリア
            </h3>
            <p className="mt-3 font-sans text-[13.5px] leading-[1.95] text-muted">
              職種は固定されません。QAから開発へ、開発から生成AIへ。これまでの経験を活かしながら、新しい領域へ越境していけます。
            </p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {data.crossPaths.map((c, i) => (
              <FadeIn
                key={`${c.from}-${c.to}`}
                className="bg-paper p-7"
                style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 font-mono text-[13px] font-medium tracking-[0.04em] text-ink">
                  <span className="inline-flex items-center rounded-card border border-line px-3 py-1.5 leading-none">
                    {c.from}
                  </span>
                  <span aria-hidden className="text-[16px] leading-none text-brand">
                    →
                  </span>
                  <span className="inline-flex items-center rounded-card border border-ink px-3 py-1.5 leading-none text-ink">
                    {c.to}
                  </span>
                </div>
                <p className="mt-3.5 font-sans text-[13px] leading-[1.85] text-muted">
                  {c.note}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 資格取得支援への一言＋CTA */}
        <FadeIn className="mt-14 flex flex-col gap-6 border-t border-line pt-12 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[640px] font-serif text-[17px] font-medium leading-[1.85] text-ink md:text-[19px]">
            {data.closing}
          </p>
          <Button href="/entry" variant="primary" className="shrink-0">
            エントリーする
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
