import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { GhostNumber } from "@/components/ui/GhostNumber";

/**
 * 各事業部の方針（トップ #4）。「人を主軸」に据える核セクション。
 * 取材・撮影が未了のため、現段階では“事業部の方針ステートメント”として構成し、
 * 責任者の顔写真・実名・本人コメントは取材後にカードへ追加する（プレースホルダーの
 * 人物シルエットは未完成な印象を与えるため置かない）。
 * 事業内容の説明は後続の Strengths セクション（strengths データ）に委ね、
 * ここでは重複させない。
 */
const leaders = [
  {
    dept: "開発事業部",
    en: "Development",
    comment:
      "アプリもWebも、チームで深く作る。あなたの開発経験を、リードする立場で活かせます。",
  },
  {
    dept: "インフラ事業部",
    en: "Infrastructure",
    comment:
      "クラウド・IaC・自動化。止まらない基盤を、設計からチームで担います。",
  },
  {
    dept: "QA事業部",
    en: "Quality Assurance",
    comment:
      "品質は、技術で支える。テスト設計から自動化まで、専門性を伸ばせる現場です。",
  },
  {
    dept: "AIソリューション事業部",
    en: "AI Solutions",
    comment:
      "AIを“使う側”で開発する。生成AI・LLMの最前線が、ここにあります。",
  },
];

export function LeaderMessage() {
  return (
    <section className="relative overflow-hidden py-20 md:py-[140px]">
      <Container className="relative">
        <SectionHead
          kicker="Divisions"
          title="4つの事業部が、現場を変える。"
          lead="開発・インフラ・QA・AIソリューション——それぞれの事業部が、現場にどう向き合うのか。"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {leaders.map((l, i) => (
            <FadeIn
              as="article"
              key={l.dept}
              style={{ transitionDelay: `${(i % 2) * 90}ms` } as React.CSSProperties}
              className="group relative flex h-full flex-col overflow-hidden bg-paper p-7 md:p-9"
            >
              <GhostNumber className="-top-2 right-3 text-[88px]">
                0{i + 1}
              </GhostNumber>

              <div className="relative flex items-center gap-3">
                <GeoMark index={i} size={24} className="text-brand" />
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-muted uppercase">
                  {l.en}
                </span>
              </div>

              <p className="relative mt-6 font-mono text-[11px] tracking-[0.14em] text-brand uppercase">
                {l.dept}
              </p>
              <h3 className="relative mt-3 font-serif text-[19px] font-medium leading-[1.75] text-ink md:text-[21px]">
                {l.comment}
              </h3>
            </FadeIn>
          ))}
        </div>

        <p className="mt-6 font-sans text-[12px] tracking-[0.04em] text-muted">
          ※各事業部責任者の顔・実名メッセージは、取材後に順次公開します。
        </p>
      </Container>
    </section>
  );
}
