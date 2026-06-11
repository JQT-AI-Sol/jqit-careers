import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Hero } from "@/components/sections/Hero";
import { StrengthGrid } from "@/components/sections/StrengthGrid";
import { Appeal } from "@/components/sections/Appeal";
import { JobList } from "@/components/sections/JobList";
import { Members } from "@/components/sections/Members";
import { CultureBlock } from "@/components/sections/CultureBlock";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />

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
            lead="実際に働くメンバーのリアルな声。※写真・内容は後日支給データに差し替え。"
          />
          <Members />
        </Container>
      </section>

      <section id="culture" className="py-20 md:py-[140px]">
        <Container>
          <SectionHead kicker="Culture & Data" title="数字とカルチャーで知るJQIT" />
          <CultureBlock />
        </Container>
      </section>

      <CTA />
    </>
  );
}
