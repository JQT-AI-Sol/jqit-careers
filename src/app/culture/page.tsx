import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { CultureBlock } from "@/components/sections/CultureBlock";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "カルチャー",
  description:
    "数字とカルチャーで知るJQIT。社内イベント・福利厚生・働く環境をご紹介します。",
};

const benefits = [
  { title: "資格取得支援", body: "最新のIT・AI技術を学び続けられるよう、資格取得を支援します。" },
  { title: "社内イベント・交流", body: "社員総会や交流会など、チームでつながる機会が豊富です。" },
  { title: "挑戦を後押しする文化", body: "新規事業やAI案件など、手を挙げれば挑戦できる環境です。" },
];

export default function CulturePage() {
  return (
    <>
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Culture & Data"
            title="数字とカルチャーで知るJQIT"
            lead="数字と日常の風景から、JQITで働くイメージをお伝えします。※データ・写真は仮です。"
          />
          <CultureBlock />
        </Container>
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

      <CTA />
    </>
  );
}
