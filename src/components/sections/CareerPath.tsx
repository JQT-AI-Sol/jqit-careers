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
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {data.steps.map((s, i) => (
            <FadeIn
              key={s.no}
              className="flex h-full flex-col bg-paper p-8 md:p-10"
              style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="font-mono text-[13px] font-semibold tracking-[0.1em] text-brand">
                  {s.no}
                </div>
                <div className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-5 text-balance font-serif text-[22px] font-medium leading-[1.5] text-ink md:text-[24px]">
                {s.title}
              </h3>
              <div className="mt-2 font-mono text-[11px] tracking-[0.08em] text-muted">
                {s.period}
              </div>
              <p className="mt-4 font-sans text-[13.5px] leading-[1.95] text-muted">
                {s.desc}
              </p>
              <div className="mt-8 border-t border-line pt-5 md:mt-auto">
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

        {/* 段階的なキャリアアップ例 */}
        <div className="mt-16 md:mt-24">
          <FadeIn>
            <h3 className="font-serif text-[22px] font-medium text-ink md:text-[26px]">
              段階的にスキルアップするキャリア
            </h3>
            <p className="mt-3 font-sans text-[13.5px] leading-[1.95] text-muted">
              未経験からでも学べるオリジナルカリキュラムを用意。勉強会や1on1ヒアリング、メンター制度で、会社と先輩エンジニアが成長を支えます。
            </p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
            {data.crossPaths.map((c, i) => (
              <FadeIn
                key={c.title}
                className="bg-paper p-7"
                style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
              >
                <h4 className="font-serif text-[17px] font-medium text-ink">
                  {c.title}
                </h4>
                <div className="mt-5 flex flex-col">
                  {c.steps.map((step, index) => (
                    <div
                      key={step}
                      className="font-mono text-[12px] font-medium tracking-[0.04em] text-ink"
                    >
                      <span className="inline-flex min-h-8 w-full items-center rounded-card border border-line px-3 py-1.5 leading-[1.45]">
                        {step}
                      </span>
                      {index < c.steps.length - 1 && (
                        <span
                          aria-hidden
                          className="block py-1.5 text-center text-[15px] leading-none text-brand"
                        >
                          ↓
                        </span>
                      )}
                    </div>
                  ))}
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
