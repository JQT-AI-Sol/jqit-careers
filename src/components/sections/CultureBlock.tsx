import Image from "next/image";
import { stats } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";
import { asset } from "@/lib/asset";

// エンジニアの職種構成（実データ／開発・インフラ・QAの3部署。
// AIは部署ではない=立ち上げ期の少数チームのため、人数比率には含めない）。
const engineers = [
  { label: "開発", count: 22, bar: "bg-ink/30", dot: "bg-ink/30" },
  { label: "インフラ", count: 28, bar: "bg-ink/55", dot: "bg-ink/55" },
  { label: "QA", count: 37, bar: "bg-brand", dot: "bg-brand" },
];
const engTotal = engineers.reduce((sum, e) => sum + e.count, 0);

export function CultureBlock() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-[72px]">
      <div>
        {/* 見出し数字 */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-10">
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="font-serif text-[40px] leading-none text-ink md:text-[48px]">
                <CountUp value={s.value} />
                <span className="ml-1 text-2xl text-brand">{s.unit}</span>
              </div>
              <div className="mt-3 font-sans text-[12.5px] tracking-wide text-muted">
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* エンジニアの職種構成（積み上げバー＋凡例） */}
        <FadeIn
          className="mt-10 border-t border-line pt-8"
          style={{ transitionDelay: "120ms" } as React.CSSProperties}
        >
          <div className="flex items-baseline justify-between">
            <span className="font-sans text-[12.5px] tracking-wide text-muted">
              エンジニアの職種構成
            </span>
            <span className="font-serif text-[16px] text-ink">{engTotal}名</span>
          </div>
          <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
            {engineers.map((e) => (
              <div
                key={e.label}
                className={e.bar}
                style={{ width: `${(e.count / engTotal) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {engineers.map((e) => (
              <div
                key={e.label}
                className="flex items-center justify-between font-sans text-[13px]"
              >
                <span className="flex items-center gap-2 text-ink">
                  <span className={`h-2.5 w-2.5 rounded-full ${e.dot}`} />
                  {e.label}
                </span>
                <span className="text-muted">
                  {e.count}名・{Math.round((e.count / engTotal) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="grid grid-cols-2 gap-3 [grid-template-rows:176px_176px]">
        <div className="relative row-span-2 overflow-hidden rounded-2xl">
          <Image
            src={asset("/images/culture/office.jpg")}
            alt="ミニマルなオフィスで協働する様子"
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={asset("/images/culture/data.jpg")}
            alt="データとAIのイメージ"
            fill
            sizes="(max-width: 768px) 50vw, 280px"
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={asset("/images/culture/light.jpg")}
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
