import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { MembersCarousel } from "@/components/sections/MembersCarousel";
import { Message } from "@/components/sections/Message";
import { Marquee } from "@/components/sections/Marquee";
import { Strengths } from "@/components/sections/Strengths";
import { WhyJqit } from "@/components/sections/WhyJqit";
import { JobList } from "@/components/sections/JobList";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      {/* ヒーロー上部：人物写真のマーキー */}
      <div className="pt-5 md:pt-8">
        <PhotoMarquee
          images={[
            "/images/people/r6.jpg",
            "/images/people/r1.jpg",
            "/images/people/r2.jpg",
            "/images/people/r7.jpg",
          ]}
          direction="left"
          eager
        />
      </div>

      <Hero />

      {/* 社員紹介（ドラッグ可能なスライダー） */}
      <section id="interview" className="bg-cream py-[72px] md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Members"
            title="社員紹介"
            lead="未経験から、経験者まで。実際に働くメンバーのリアルな声をお届けします。"
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

      <Message />

      {/* バリュー（特大タイポのマーキー） */}
      <div className="mt-6">
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
      </div>

      <Strengths />

      <WhyJqit />

      {/* 募集職種 */}
      <section id="jobs" className="relative overflow-hidden py-[72px] md:py-[140px]">
        <Container className="relative">
          <SectionHead
            kicker="Jobs"
            title="募集職種"
            lead="開発・インフラ・QA・AI。あなたの経験を、チームを率いて活かせる4領域があります。"
          />
          <JobList />
        </Container>
      </section>

      {/* カルチャー：人物写真のマーキー */}
      <section id="culture" className="py-[72px] md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Our People"
            title="ここには、挑戦する人がいる。"
            lead="未経験から、経験者まで。多様なバックグラウンドの仲間が、技術で未来を切り拓いています。"
          />
        </Container>
        <PhotoMarquee
          images={[
            "/images/people/r4.jpg",
            "/images/people/r3.jpg",
            "/images/people/r8.jpg",
          ]}
          direction="right"
          durationSec={66}
        />
        <Container className="mt-12 md:mt-16">
          <Button href="/culture" variant="arrow">
            数字とカルチャーを見る →
          </Button>
        </Container>
      </section>

      <CTA />
    </>
  );
}
