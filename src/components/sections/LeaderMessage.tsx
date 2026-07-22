import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { company, strengths } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * 各事業部の責任者メッセージ＋事業内容（トップ #4）。「人を主軸」に据える核セクション。
 * 事業責任者＝開発／インフラ／QA／AIソリューション／ITソリューション営業の5事業部長。
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
  {
    dept: "ITソリューション営業部",
    name: "菊地 優",
    image: "/images/leaders/kikuchi.jpg",
    comment:
      "お客様の課題を捉え、エンジニアと最適な解決策をつくる。人と技術をつなぐ営業です。",
    focus: company.businesses[0].body,
  },
];

export function LeaderMessage() {
  return (
    <section className="relative overflow-hidden py-20 md:py-[140px]">
      <Container className="relative">
        <SectionHead
          kicker="Leadership"
          title="各事業部の責任者から。"
          lead="開発・インフラ・QA・AIソリューション・ITソリューション営業——5つの事業部それぞれを率いる責任者が、現場をどう変えていくのか。"
        />

        <div className="overflow-hidden border border-line">
          {leaders.map((l, i) => (
            <FadeIn
              key={l.dept}
              as="article"
              style={{ transitionDelay: `${(i % 2) * 90}ms` } as React.CSSProperties}
              className="grid grid-cols-1 border-b border-line last:border-b-0 md:grid-cols-2"
            >
              <div
                className={`relative min-h-[240px] overflow-hidden bg-paper md:min-h-[300px] ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={asset(l.image)}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 548px"
                  className="object-cover"
                />
              </div>

              <div
                className={`flex min-h-[240px] flex-col justify-center bg-cream px-7 py-10 md:min-h-[300px] md:px-12 md:py-14 ${
                  i % 2 === 1 ? "md:border-r" : "md:border-l"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] leading-[1.5] tracking-[0.12em] text-brand uppercase">
                      {l.dept}
                    </p>
                    <p className="mt-1 font-serif text-[17px] text-ink">
                      {l.name}
                    </p>
                  </div>
                </div>

                <span className="mt-6 block h-px w-8 bg-brand" aria-hidden />
                <p className="mt-5 font-serif text-[17px] leading-[2] tracking-[0.01em] text-ink md:text-[18px]">
                  {l.comment}
                </p>

                <p className="mt-5 border-t border-line pt-4 font-sans text-[12px] leading-[1.75] text-muted">
                  {l.focus}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
