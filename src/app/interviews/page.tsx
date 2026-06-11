import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Members } from "@/components/sections/Members";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "社員の声",
  description:
    "JQITで働くメンバーのリアルな声。未経験からの挑戦、AI・インフラ・QAの現場をご紹介します。",
};

export default function InterviewsPage() {
  return (
    <>
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHead
            kicker="Members"
            title="社員の声"
            lead="開発・インフラ・QA。未経験から、経験者まで。実際に働くメンバーのリアルな声をお届けします。"
          />
          <Members />
        </Container>
      </section>
      <CTA />
    </>
  );
}
