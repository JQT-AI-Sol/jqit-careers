import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * メッセージ：「技術ではなく、人を起点に。」
 * 左に見出し、右に本文を置く2カラム。JQITの思想（手段としての技術／考えるエンジニア）を語る。
 */
export function Message() {
  return (
    <section className="relative overflow-hidden bg-cream py-[72px] md:py-[130px]">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-[80px]">
          <FadeIn>
            <Kicker>Message</Kicker>
            <h2 className="mt-6 font-serif text-[28px] font-medium leading-[1.5] tracking-[0.02em] text-ink md:text-[44px]">
              技術ではなく、
              <br />
              <em className="not-italic text-brand">人</em>を起点に。
            </h2>
          </FadeIn>

          <FadeIn style={{ transitionDelay: "120ms" } as React.CSSProperties}>
            <div className="flex flex-col gap-6 font-sans text-base leading-[2.05] text-body">
              <p>
                私たちは、技術を目的にしません。技術はあくまで手段。本当に大切なのは、エンジニアと顧客——
                <span className="font-medium text-ink">
                  “人”が持つ本来の力を引き出すこと
                </span>
                だと考えています。
              </p>
              <p>
                特定の技術や業界に縛られず、多様なプロジェクトを通じて一人ひとりの市場価値を高める。それが結果として、お客様の本質的な課題解決につながると信じています。
              </p>
              <p>
                だから私たちは、ただ技術者を派遣するのではなく、事業を深く理解し“本当に必要なソリューション”を提案できる
                <span className="font-medium text-ink">「考えるエンジニア」集団</span>
                であり続ける。下請けではなく、顧客と対等に、社会実装をリードする存在へ。
              </p>
              <p className="mt-2 flex items-center gap-3 font-serif text-lg font-medium text-ink">
                <span className="h-px w-8 bg-brand" />
                挑戦と革新で、顧客の未来を切り拓く。
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
