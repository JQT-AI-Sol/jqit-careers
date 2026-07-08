import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Kicker, SectionHead } from "@/components/ui/SectionHead";
import { CultureBlock } from "@/components/sections/CultureBlock";
import { CareerPath } from "@/components/sections/CareerPath";
import { CTA } from "@/components/sections/CTA";
import { qualifications } from "@/lib/content";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";
import { Marquee } from "@/components/sections/Marquee";
import {
  BrandMarquee,
  cultureMarqueeTiles,
} from "@/components/sections/BrandMarquee";

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
      <section className="relative overflow-hidden pt-20 md:pt-[120px]">
        <GeoBackdrop />
        <Container className="relative">
          <SectionHead
            kicker="Culture & Data"
            title="人と数字で見る、JQITのカルチャー。"
            lead="社員106名、エンジニア87名。開発・インフラ・QAを軸に、AIと営業まで含めてチームで顧客の未来を切り拓く。制度の数字と、顔が見えるチームの空気から、JQITの働き方をお伝えします。"
            headingLevel="h1"
          />
          <CultureBlock />
        </Container>
        <div className="mt-14 md:mt-20">
          <Marquee
            words={[
              "Team First",
              "Modern Stack",
              "Career Growth",
              "Quality",
              "AI Native",
            ]}
            durationSec={58}
          />
          <BrandMarquee
            tiles={cultureMarqueeTiles}
            direction="right"
            durationSec={70}
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-20 md:py-[120px]">
        <GeoBackdrop flip />
        <Container className="relative">
          <SectionHead
            kicker="Benefits"
            title="働く環境・制度"
            lead="経験者が安心して力を出せるように、学び・交流・評価の仕組みを整えています。"
          />
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
      <section className="relative overflow-hidden bg-cream py-16 md:py-24">
        <GeoBackdrop />
        <Container>
          <div className="relative grid gap-9 border-t border-line pt-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:pt-12">
            <div>
              <Kicker>Certification Support</Kicker>
              <h2 className="mt-6 font-serif text-[27px] font-medium leading-[1.5] tracking-[0.02em] text-ink md:text-[38px]">
                資格は、かなり広く支援しています。
              </h2>
            </div>
            <div>
              <div className="border-l border-brand pl-5">
                <p className="font-serif text-[22px] font-medium leading-[1.55] text-ink md:text-[28px]">
                  対象資格30以上。
                  <br />
                  学びが、報われる制度です。
                </p>
                <p className="mt-4 font-sans text-[13.5px] leading-[1.9] text-muted">
                  AI・開発・インフラ・QA・共通領域まで、推奨資格を幅広く支援しています。
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {qualifications.highlights.map((item) => (
                  <div key={item} className="border border-line bg-paper px-4 py-3">
                    <p className="whitespace-nowrap font-sans text-[12.5px] font-medium leading-none text-brand">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-10 overflow-x-auto border-y border-line py-4">
            <div className="grid min-w-[1060px] grid-cols-5 gap-px bg-line">
            {qualifications.byDomain.map((d, i) => (
              <div key={d.domain} className="flex min-h-[210px] flex-col bg-paper p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-[11px] tracking-[0.16em] text-brand uppercase">
                    {d.domain}
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-muted">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-5 font-serif text-[25px] leading-none text-ink">
                  {d.count}
                </div>
                <p className="mt-3 font-sans text-[12.5px] leading-[1.75] text-muted">
                  {d.focus}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {d.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line bg-cream px-3 py-2 font-sans text-[12.5px] leading-[1.45] text-muted"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
