import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { strengths } from "@/lib/content";

/**
 * 各事業部の責任者メッセージ＋事業内容（トップ #4）。「人を主軸」に据える核セクション。
 * 事業責任者＝開発／インフラ／QA／AIソリューションの4事業部長。
 * 取材・撮影が未了のため、写真はシルエットのプレースホルダー、氏名・コメントはサンプル明示で“枠”を先行。
 * 各事業部の事業内容(focus)は content.ts の strengths（実データ）を流用。
 * ※実物（事業部長の写真・氏名・本人コメント）に差し替えて公開すること。
 */
const leaders = [
  {
    dept: "開発事業部",
    comment:
      "アプリもWebも、チームで深く作る。あなたの開発経験を、リードする立場で活かせます。",
    focus: strengths[0].body,
  },
  {
    dept: "インフラ事業部",
    comment:
      "クラウド・IaC・自動化。止まらない基盤を、設計からチームで担います。",
    focus: strengths[1].body,
  },
  {
    dept: "QA事業部",
    comment:
      "品質は、技術で支える。テスト設計から自動化まで、専門性を伸ばせる現場です。",
    focus: strengths[2].body,
  },
  {
    dept: "AIソリューション事業部",
    comment:
      "AIを“使う側”で開発する。生成AI・LLMの最前線が、ここにあります。",
    focus: strengths[3].body,
  },
];

export function LeaderMessage() {
  return (
    <section className="relative overflow-hidden py-20 md:py-[140px]">
      <Container className="relative">
        <SectionHead
          kicker="Leadership"
          title="各事業部の責任者から。"
          lead="開発・インフラ・QA・AIソリューション——4つの事業部それぞれを率いる責任者が、現場をどう変えていくのか。"
        />
        <p className="-mt-6 mb-12 font-sans text-[12px] tracking-[0.04em] text-muted md:-mt-10 md:mb-14">
          ※写真・氏名・コメントはサンプルです（取材後に差し替え予定）。
        </p>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {leaders.map((l, i) => (
            <FadeIn
              as="article"
              key={l.dept}
              style={{ transitionDelay: `${(i % 2) * 90}ms` } as React.CSSProperties}
              className="flex h-full flex-col bg-paper p-7 md:p-9"
            >
              {/* 事業部長：顔写真プレースホルダー（差し替え予定）＋部署・氏名 */}
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-ink">
                  <svg
                    viewBox="0 0 100 110"
                    aria-hidden
                    className="absolute inset-0 m-auto h-3/4 w-3/4 text-white/20"
                    fill="currentColor"
                  >
                    <circle cx="50" cy="38" r="20" />
                    <path d="M16 110c0-20 15-34 34-34s34 14 34 34Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase">
                    {l.dept}
                  </p>
                  <p className="mt-1 font-serif text-[18px] text-ink">
                    （事業部長 氏名）
                  </p>
                </div>
              </div>

              {/* サンプルコメント */}
              <p className="mt-5 font-sans text-[14px] leading-[2.0] text-body">
                {l.comment}
              </p>

              {/* 事業内容（実データ） */}
              <p className="mt-5 border-t border-line pt-4 font-sans text-[12.5px] leading-[1.9] text-muted">
                {l.focus}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
