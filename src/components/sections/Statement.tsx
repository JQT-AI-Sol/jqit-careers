import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";

/**
 * メッセージコーナー。MVVM（特に「技術は手段、目的は人の力を引き出す」「考える
 * エンジニア集団」「対等に社会実装をリード」）を凝縮したステートメント。
 */
export function Statement() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-[130px]">
      <GeoBackdrop flip />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          {/* 左：kicker＋見出し */}
          <FadeIn>
            <Kicker>Message</Kicker>
            <h2 className="mt-6 font-serif text-[30px] leading-[1.5] font-medium tracking-[0.02em] text-ink md:text-[44px]">
              技術ではなく、
              <br />
              <em className="not-italic text-brand">人</em>を起点に。
            </h2>
          </FadeIn>

          {/* 右：本文 */}
          <FadeIn style={{ transitionDelay: "120ms" } as React.CSSProperties}>
            <div className="space-y-6 font-sans text-[15px] leading-[2.05] text-body md:text-base">
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
                であり続ける。ひとりで送り出すのではなく、チームで考え、現場をリードする存在へ。
              </p>
              <p className="flex items-center gap-3 pt-2 font-serif text-[16px] font-medium text-ink md:text-[18px]">
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
