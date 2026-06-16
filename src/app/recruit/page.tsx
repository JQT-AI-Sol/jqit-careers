import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { RecruitFlow } from "@/components/sections/RecruitFlow";
import { Faq } from "@/components/sections/Faq";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "採用フロー・FAQ",
  description:
    "JQITの採用フロー（エントリーから内定まで）と、よくある質問をご紹介します。",
  alternates: { canonical: "/recruit" },
};

export default function RecruitPage() {
  return (
    <>
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Recruit Flow"
            title="採用フロー"
            lead="エントリーから内定まで、丁寧に進めます。まずはカジュアル面談からのご応募も歓迎です。"
            headingLevel="h1"
          />
          <RecruitFlow />
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-[120px]">
        <Container className="max-w-[840px]">
          <SectionHead kicker="FAQ" title="よくある質問" />
          <Faq />
        </Container>
      </section>

      <CTA />
    </>
  );
}
