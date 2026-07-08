import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { strengths } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * 各事業部の責任者メッセージ＋事業内容（トップ #4）。「人を主軸」に据える核セクション。
 * 事業責任者＝開発／インフラ／QA／AIソリューションの4事業部長。
 * 各事業部の事業内容(focus)は content.ts の strengths（実データ）を流用。
 */
const leaders = [
  {
    dept: "開発事業部",
    name: "大野 健",
    image: "/images/leaders/ohno.jpg",
    comment:
      "アプリもWebも、チームで深く作る。あなたの開発経験を、リードする立場で活かせます。",
    focus: strengths[0].body,
  },
  {
    dept: "インフラ事業部",
    name: "嵐 亮太",
    image: "/images/leaders/arashi.png",
    comment:
      "クラウド・IaC・自動化。止まらない基盤を、設計からチームで担います。",
    focus: strengths[1].body,
  },
  {
    dept: "QA事業部",
    name: "岩崎 顕儀",
    image: "/images/leaders/iwasaki.jpg",
    comment:
      "品質は、技術で支える。テスト設計から自動化まで、専門性を伸ばせる現場です。",
    focus: strengths[2].body,
  },
  {
    dept: "AIソリューション事業部",
    name: "宮本 尚寛",
    image: "/images/leaders/miyamoto.jpg",
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

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {leaders.map((l, i) => (
            <FadeIn
              as="article"
              key={l.dept}
              style={{ transitionDelay: `${(i % 2) * 90}ms` } as React.CSSProperties}
              className="flex h-full min-h-[300px] flex-col bg-paper p-7 md:p-8"
            >
              <div className="flex min-h-[74px] items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink">
                  <Image
                    src={asset(l.image)}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] leading-[1.5] tracking-[0.12em] text-brand uppercase">
                    {l.dept}
                  </p>
                  <p className="mt-1 font-serif text-[17px] text-ink">
                    {l.name}
                  </p>
                </div>
              </div>

              {/* サンプルコメント */}
              <p className="mt-5 min-h-[7.6em] font-sans text-[13.5px] leading-[1.9] text-body md:min-h-[8.6em] xl:min-h-[9.6em]">
                {l.comment}
              </p>

              {/* 事業内容（実データ） */}
              <p className="border-t border-line pt-4 font-sans text-[12px] leading-[1.75] text-muted">
                {l.focus}
              </p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
