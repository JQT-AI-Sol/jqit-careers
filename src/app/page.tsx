import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { Weapons } from "@/components/sections/Weapons";
import { Empathy } from "@/components/sections/Empathy";
import { Frontier } from "@/components/sections/Frontier";
import { LeaderMessage } from "@/components/sections/LeaderMessage";
import { JobList } from "@/components/sections/JobList";
import { Members } from "@/components/sections/Members";
import { CTA } from "@/components/sections/CTA";
import { Marquee } from "@/components/sections/Marquee";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";
import { Statement } from "@/components/sections/Statement";

export default function Home() {
  return (
    <>
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

      <Empathy />

      <Statement />

      <div className="mt-16 md:mt-24">
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

      <section id="weapons" className="relative overflow-hidden bg-cream py-20 md:py-[140px]">
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

      <LeaderMessage />

      <Frontier />

      <section id="jobs" className="relative overflow-hidden py-20 md:py-[140px]">
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

      <section id="interview" className="bg-cream py-20 md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Members"
            title="社員の声"
            lead="現場で活躍するメンバーの、リアルな声をお届けします。"
          />
          <Members limit={3} />
          <div className="mt-12">
            <Button href="/interviews" variant="arrow">
              社員の声をもっと見る →
            </Button>
          </div>
        </Container>
      </section>

      <section id="culture" className="py-20 md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Our People"
            title="ここには、挑戦する人がいる。"
            lead="多様な経験を持つ仲間が、チームで技術と未来を切り拓いています。"
          />
        </Container>
        <div className="flex flex-col gap-3 md:gap-4">
          <PhotoMarquee
            images={[
              "/images/people/r4.jpg",
              "/images/people/r3.jpg",
              "/images/people/r8.jpg",
            ]}
            direction="right"
            durationSec={66}
          />
        </div>
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
