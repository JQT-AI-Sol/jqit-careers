import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";
import { Hero } from "@/components/sections/Hero";
import { Empathy } from "@/components/sections/Empathy";
import { Weapons } from "@/components/sections/Weapons";
import { LeaderMessage } from "@/components/sections/LeaderMessage";
import { MembersCarousel } from "@/components/sections/MembersCarousel";
import { Marquee } from "@/components/sections/Marquee";
import { Strengths } from "@/components/sections/Strengths";
import { Frontier } from "@/components/sections/Frontier";
import { JobList } from "@/components/sections/JobList";
import { Faq } from "@/components/sections/Faq";
import {
  BrandMarquee,
  heroMarqueeTiles,
  ourPeopleMarqueeTiles,
} from "@/components/sections/BrandMarquee";
import { CTA } from "@/components/sections/CTA";
import { stats } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* ヒーロー上部：人物写真＋幾何学シェイプのマーキー */}
      <div className="pt-5 md:pt-8">
        <BrandMarquee tiles={heroMarqueeTiles} eager />
      </div>

      <Hero />

      {/* 共感（Before）：経験者SESの消耗を言語化 */}
      <Empathy />

      {/* 5つの武器（After）：進化するSESの答え */}
      <section
        id="weapons"
        className="relative overflow-hidden bg-cream py-[72px] md:py-[140px]"
      >
        <GeoBackdrop />
        <Container className="relative">
          <SectionHead
            kicker="5 Weapons"
            title={
              <>
                “進化するSES”、
                <br />
                5つの武器。
              </>
            }
            lead={
              <>
                ひとりで送り出さない。技術を、腐らせない。
                <br className="hidden md:block" />
                そのためのJQITの答えが、この5つ。
              </>
            }
          />
          <Weapons />
        </Container>
      </section>

      {/* 事業責任者メッセージ（取材後に実物へ差し替え） */}
      <LeaderMessage />

      {/* 社員紹介（ドラッグ可能なスライダー） */}
      <section id="interview" className="bg-cream py-[72px] md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Members"
            title="社員紹介"
            lead="現場で活躍するメンバーの、リアルな声をお届けします。"
          />
          <MembersCarousel />
          <p className="mt-[18px] flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-[#9a9a95] uppercase">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M8 7 4 12l4 5M16 7l4 5-4 5" />
            </svg>
            Drag ・ ドラッグで操作できます
          </p>
          <div className="mt-8">
            <Button href="/interviews" variant="arrow">
              社員の声をもっと見る →
            </Button>
          </div>
        </Container>
      </section>

      {/* バリュー（特大タイポのマーキー） */}
      <Marquee
        words={[
          "Customer First",
          "Challenge",
          "Innovation",
          "Ownership",
          "Lifelong Learning",
          "Altruism",
          "Thinking Engineers",
          "Growing People",
        ]}
      />

      {/* 技術方向性：4つの専門領域 */}
      <Strengths />

      {/* その先へ：受託・自社AI(NOVA)・全社AI実装 */}
      <Frontier />

      {/* カルチャー：人物写真のマーキー */}
      <section id="culture" className="py-[72px] md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Our People"
            title="ここには、挑戦する人がいる。"
            lead="多様な経験を持つ仲間が、チームで技術と未来を切り拓いています。"
          />
        </Container>
        <BrandMarquee
          tiles={ourPeopleMarqueeTiles}
          direction="right"
          durationSec={66}
        />
      </section>

      {/* 数字で見るJQIT（公開範囲の拡大に合わせて項目を追加していく） */}
      <section id="data" className="bg-cream py-[72px] md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Data"
            title="数字で見るJQIT。"
            lead="まずは組織のいまを、数字で。働き方や案件構成のデータも、順次公開していきます。"
          />
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
            {stats.map((s, i) => (
              <FadeIn
                key={s.label}
                style={{ transitionDelay: `${i * 110}ms` } as React.CSSProperties}
                className="border-b border-line py-10 sm:px-10 sm:py-14 sm:[&:nth-child(3n+1)]:pl-0 sm:[&:nth-child(3n)]:pr-0 sm:[&:not(:nth-child(3n+1))]:border-l"
              >
                <div className="font-mono text-[11px] tracking-[0.18em] text-brand uppercase">
                  0{i + 1}
                </div>
                <div className="mt-6 font-serif text-[64px] leading-none tracking-[0.01em] text-ink md:text-[96px]">
                  <CountUp value={s.value} />
                  <span className="ml-2 text-[26px] text-brand md:text-[34px]">
                    {s.unit}
                  </span>
                </div>
                <div className="mt-5 font-sans text-[13px] leading-[1.8] tracking-wide text-muted">
                  {s.label}
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/culture" variant="arrow">
              数字とカルチャーを見る →
            </Button>
          </div>
        </Container>
      </section>

      {/* 募集職種 */}
      <section
        id="jobs"
        className="relative overflow-hidden py-[72px] md:py-[140px]"
      >
        <GeoBackdrop flip />
        <Container className="relative">
          <SectionHead
            kicker="Jobs"
            title="募集職種"
            lead="開発・インフラ・QA・AI。あなたの経験を、チームを率いて活かせる4領域があります。"
          />
          <JobList />
        </Container>
      </section>

      {/* FAQ：応募前の不安を解消 */}
      <section id="faq" className="bg-cream py-[72px] md:py-[140px]">
        <Container className="max-w-[840px]">
          <SectionHead
            kicker="FAQ"
            title="よくある質問"
            lead="応募・面談の前によくいただく質問にお答えします。"
          />
          <Faq />
          <div className="mt-10">
            <Button href="/recruit" variant="arrow">
              採用フローを見る →
            </Button>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
