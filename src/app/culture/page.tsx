import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Kicker, SectionHead } from "@/components/ui/SectionHead";
import { CultureBlock } from "@/components/sections/CultureBlock";
import { CareerPath } from "@/components/sections/CareerPath";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { CTA } from "@/components/sections/CTA";
import { qualifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "カルチャー",
  description:
    "数字とカルチャーで知るJQIT。資格取得支援・社内イベント・働く環境をご紹介します。",
  alternates: { canonical: "/culture" },
};

const benefits = [
  {
    title: "資格取得支援",
    body: "推奨資格の受験費用を会社が負担。合格時には一時報奨金と資格手当も支給します。",
  },
  {
    title: "社内イベント・交流",
    body: "3ヶ月に一度のイベントや社員総会など、チームでつながる機会が豊富です。",
  },
  {
    title: "実力主義のキャリア",
    body: "年功序列ではなく、やる気とスキルで評価。頑張りが給与とポジションに直結します。",
  },
];

export default function CulturePage() {
  return (
    <>
      <section className="pt-20 md:pt-[120px]">
        <Container>
          <SectionHead
            kicker="Culture & Data"
            title="数字が語る、JQITの“いま”。"
            lead="社員115名、エンジニアは開発・インフラ・QAの3領域に87名。推奨技術の習得支援と資格費用の全額負担で、経験を積んだ人ほど報われる。数字から、私たちの輪郭が見えてきます。"
            headingLevel="h1"
          />
          <CultureBlock />
        </Container>
        <div className="mt-16 flex flex-col gap-3 md:mt-24 md:gap-4">
          <PhotoMarquee
            images={[
              "/images/people/p4.jpg",
              "/images/people/p2.jpg",
              "/images/people/p6.jpg",
              "/images/people/p8.jpg",
              "/images/people/p9.jpg",
            ]}
            direction="left"
          />
        </div>
      </section>

      <section className="bg-cream py-20 md:py-[120px]">
        <Container>
          <SectionHead kicker="Benefits" title="働く環境・制度" />
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-14">
            {benefits.map((b) => (
              <div key={b.title}>
                <h3 className="font-serif text-[20px] font-medium text-ink">
                  {b.title}
                </h3>
                <p className="mt-3 font-sans text-[13.5px] leading-[1.95] text-muted">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* キャリアパス（成長ステップ） */}
      <CareerPath />

      {/* 資格取得支援 詳細 */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <div className="grid gap-9 border-t border-line pt-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:pt-12">
            <div>
              <Kicker>Certification Support</Kicker>
              <h2 className="mt-6 font-serif text-[30px] font-medium leading-[1.45] tracking-[0.02em] text-ink md:text-[48px]">
                資格取得支援制度
              </h2>
            </div>
            <div>
              <p className="font-sans text-[15px] leading-[2] text-body">
                {qualifications.intro}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                {["受験費用を会社負担", "合格時の一時報奨金", "月々の資格手当"].map(
                  (item) => (
                    <div key={item} className="bg-paper px-5 py-4">
                      <p className="font-sans text-[13px] font-medium leading-[1.6] text-brand">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {qualifications.byDomain.map((d, i) => (
              <div key={d.domain} className="flex h-full flex-col bg-paper p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                    {d.domain}
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-muted">
                    0{i + 1}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {d.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 font-sans text-[13px] leading-[1.75] text-muted"
                    >
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
