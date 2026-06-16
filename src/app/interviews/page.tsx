import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Members } from "@/components/sections/Members";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "社員の声",
  description:
    "JQITで働くメンバーのリアルな声。開発・インフラ・QA・AIの現場と、経験者のキャリアをご紹介します。",
  alternates: { canonical: "/interviews" },
};

export default function InterviewsPage() {
  return (
    <>
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Members"
            title="社員の声"
            lead="開発・インフラ・QA、そしてAI。各領域で活躍するメンバーの、リアルな声をお届けします。"
            headingLevel="h1"
          />
          <Members />
        </Container>
      </section>
      <CTA />
    </>
  );
}
