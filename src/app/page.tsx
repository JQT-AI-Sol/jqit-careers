import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { StrengthGrid } from "@/components/sections/StrengthGrid";
import { Appeal } from "@/components/sections/Appeal";
import { JobList } from "@/components/sections/JobList";
import { Members } from "@/components/sections/Members";
import { CTA } from "@/components/sections/CTA";
import { Marquee } from "@/components/sections/Marquee";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="mt-16 md:mt-24">
        <Marquee
          words={[
            "Challenge",
            "Innovation",
            "Development",
            "Infrastructure",
            "Quality Assurance",
            "Artificial Intelligence",
          ]}
        />
      </div>

      <section id="about" className="py-20 md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Our Strength"
            title={
              <>
                4つの専門領域で、
                <br />
                社会に価値を生む。
              </>
            }
            lead="受託開発・自社サービス開発・AI導入コンサルまで。確かな技術力と、使う人を想う日本品質で、新しい価値を創造します。"
          />
          <StrengthGrid />
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-[140px]">
        <Container>
          <SectionHead kicker="Why JQIT" title="JQITで働く、3つの理由。" />
          <Appeal />
        </Container>
      </section>

      <section id="jobs" className="py-20 md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Jobs"
            title="募集職種"
            lead="あなたの強みと、挑戦したい領域で選べる4職種。未経験からのスタートも歓迎します。"
          />
          <JobList />
        </Container>
      </section>

      <section id="interview" className="bg-cream py-20 md:py-[140px]">
        <Container>
          <SectionHead
            kicker="Members"
            title="社員の声"
            lead="未経験から、経験者まで。実際に働くメンバーのリアルな声をお届けします。"
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
            lead="未経験から、経験者まで。多様なバックグラウンドの仲間が、技術で未来を切り拓いています。"
          />
        </Container>
        <div className="flex flex-col gap-3 md:gap-4">
          <PhotoMarquee
            images={[
              "/images/people/p1.jpg",
              "/images/people/p2.jpg",
              "/images/people/p8.jpg",
              "/images/people/p3.jpg",
              "/images/people/p5.jpg",
            ]}
            direction="left"
          />
          <PhotoMarquee
            images={[
              "/images/people/p6.jpg",
              "/images/people/p9.jpg",
              "/images/people/p4.jpg",
              "/images/people/p7.jpg",
              "/images/people/p10.jpg",
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
