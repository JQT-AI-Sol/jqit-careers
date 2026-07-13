import Image from "next/image";
import { stats } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";
import { asset } from "@/lib/asset";

// エンジニアの職種構成（実データ／開発・インフラ・QAの3部署。
// AIは部署ではない=立ち上げ期の少数チームのため、人数比率には含めない）。
const engineers = [
  { label: "開発", count: 23, color: "#2563eb" },
  { label: "インフラ", count: 28, color: "#f97316" },
  { label: "QA", count: 36, color: "#16a34a" },
];
const engTotal = engineers.reduce((sum, e) => sum + e.count, 0);

const cultureFacts = [
  {
    value: "5",
    unit: "領域",
    label: "募集領域",
    body: "開発・インフラ・QA・AI・営業。経験を活かせる入口を広げています。",
  },
  {
    value: "30+",
    unit: "",
    label: "対象資格",
    body: "AI・開発・インフラ・QA・共通領域まで、幅広い資格を支援します。",
  },
  {
    value: "最大6",
    unit: "万円",
    label: "資格手当",
    body: "上位資格まで、合格時の報奨金と月々の手当で学びに返します。",
  },
];

const workStyleFacts = [
  {
    value: "11.36",
    unit: "h",
    label: "平均残業時間",
    note: "月平均・エンジニア",
    body: "無理に働くのではなく、集中して成果を出し、長く続けられる働き方を大切にしています。",
  },
  {
    value: "50.5",
    unit: "%",
    label: "有給取得率",
    note: "2025年度実績",
    body: "付与日から1年未満の社員も含む集計です。",
  },
  {
    value: "100",
    unit: "%",
    label: "育休取得率",
    note: "女性・男性ともに",
    body: "ライフステージが変わっても働き続けられる環境を整えています。",
  },
];

export function CultureBlock() {
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.02fr_0.98fr] md:gap-[72px]">
        <div className="relative">
          <div className="absolute -left-8 top-16 hidden h-24 w-24 rounded-full bg-brand/[0.08] md:block" />
          <div className="absolute -right-4 top-0 hidden h-16 w-16 rotate-12 bg-ink/[0.05] md:block" />

          <div className="relative grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <FadeIn
                key={s.label}
                className="bg-paper p-6 md:p-8"
                style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
              >
                <div className="font-serif text-[40px] leading-none text-ink md:text-[48px]">
                  <CountUp value={s.value} />
                  <span className="ml-1 text-xl text-brand md:text-2xl">{s.unit}</span>
                </div>
                <div className="mt-4 font-sans text-[12.5px] leading-[1.7] tracking-wide text-muted">
                  {s.label}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn
            className="mt-10 border-t border-line pt-8"
            style={{ transitionDelay: "120ms" } as React.CSSProperties}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                  Team Balance
                </span>
                <h2 className="mt-3 font-serif text-[24px] font-medium leading-[1.45] text-ink md:text-[30px]">
                  職種の違うプロが、
                  <br className="hidden sm:block" />
                  同じ方向を向く。
                </h2>
              </div>
              <span className="font-serif text-[18px] text-ink">{engTotal}名</span>
            </div>
            <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
              {engineers.map((e) => (
                <div
                  key={e.label}
                  style={{
                    width: `${(e.count / engTotal) * 100}%`,
                    backgroundColor: e.color,
                  }}
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
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: e.color }}
                    />
                    {e.label}
                  </span>
                  <span className="text-muted">
                    {Math.round((e.count / engTotal) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div>
          <div className="grid grid-cols-6 gap-3 [grid-template-rows:126px_78px_146px] md:[grid-template-rows:150px_88px_174px]">
            <div className="relative col-span-4 row-span-2 overflow-hidden rounded-[18px] bg-line">
              <Image
                src={asset("/images/generated/team-outdoor.jpg")}
                alt="屋外で並ぶJQITメンバーのイメージ"
                fill
                sizes="(max-width: 768px) 65vw, 420px"
                className="object-cover"
                style={{ objectPosition: "50% 28%" }}
              />
            </div>
            <div className="relative col-span-2 overflow-hidden rounded-full bg-line">
              <Image
                src={asset("/images/generated/solo-portrait.jpg")}
                alt="自然光の中で働くメンバーのイメージ"
                fill
                sizes="(max-width: 768px) 32vw, 180px"
                className="object-cover"
                style={{ objectPosition: "50% 34%" }}
              />
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <svg width="104" height="104" viewBox="0 0 104 104" aria-hidden className="block">
                <circle cx="52" cy="52" r="51" fill="#e60012" />
                <circle cx="52" cy="52" r="22" fill="#faf9f7" />
              </svg>
            </div>
            <div className="relative col-span-3 overflow-hidden rounded-[18px] bg-line">
              <Image
                src={asset("/images/generated/trio-laptop.jpg")}
                alt="ノートPCを囲んで相談するメンバーのイメージ"
                fill
                sizes="(max-width: 768px) 50vw, 260px"
                className="object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
            <div className="relative col-span-3 overflow-hidden rounded-[18px] bg-line">
              <Image
                src={asset("/images/generated/walk-outside.jpg")}
                alt="歩きながら会話するメンバーのイメージ"
                fill
                sizes="(max-width: 768px) 50vw, 260px"
                className="object-cover"
                style={{ objectPosition: "50% 35%" }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {cultureFacts.map((fact) => (
              <FadeIn key={fact.label} className="bg-paper p-5">
                <div className="font-serif text-[30px] leading-none text-ink">
                  {fact.value}
                  <span className="ml-1 text-[16px] text-brand">{fact.unit}</span>
                </div>
                <div className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  {fact.label}
                </div>
                <p className="mt-3 font-sans text-[12.5px] leading-[1.75] text-muted">
                  {fact.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <FadeIn className="mt-14 overflow-hidden border border-line bg-paper md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="border-b border-line bg-cream p-7 md:p-9 lg:border-r lg:border-b-0">
            <span className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
              Work Style
            </span>
            <h3 className="mt-4 font-serif text-[27px] font-medium leading-[1.45] text-ink md:text-[34px]">
              働き方を、
              <br className="hidden sm:block" />
              数字で見る。
            </h3>
            <p className="mt-5 max-w-[360px] font-sans text-[13.5px] leading-[1.9] text-muted">
              残業・有給・育休の実績から、長く力を出せる環境を伝えます。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
            {workStyleFacts.map((fact) => (
              <div key={fact.label} className="flex min-h-[260px] flex-col bg-paper p-7 md:p-8">
                <div className="font-serif text-[20px] font-medium leading-[1.45] text-ink md:text-[22px]">
                  {fact.label}
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  {fact.note}
                </div>
                <div className="mt-7 font-serif text-[46px] leading-none text-ink md:text-[54px]">
                  {fact.value}
                  <span className="ml-1 text-[20px] text-brand md:text-[23px]">{fact.unit}</span>
                </div>
                <p className="mt-auto pt-7 font-sans text-[13px] leading-[1.85] text-muted">
                  {fact.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </>
  );
}
