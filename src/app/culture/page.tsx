import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { CultureBlock } from "@/components/sections/CultureBlock";
import { CareerPath } from "@/components/sections/CareerPath";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { CTA } from "@/components/sections/CTA";
import { qualifications } from "@/lib/content";

export const metadata: Metadata = {
  title: "カルチャー",
  description:
    "数字とカルチャーで知るJQIT。資格取得支援・社内イベント・働く環境をご紹介します。",
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
            lead="エンジニア115名、平均29.8歳の若い組織。QAに強く、資格取得は受験費用を全額支援。数字から、私たちの輪郭が見えてきます。"
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
      <section className="bg-cream py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Certification Support"
            title="資格取得支援制度"
            lead={qualifications.intro}
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {qualifications.byDomain.map((d) => (
              <div key={d.domain} className="bg-paper p-8">
                <div className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                  {d.domain}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {d.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-[13px] leading-[1.8] text-muted before:mr-2 before:text-brand before:content-['—']"
                    >
                      {item}
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
