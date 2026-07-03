import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";

/**
 * その先：受託・自社AI(NOVA)（トップ #6）。
 * SESの“その先”の upside を、暗い(ink背景)プレミアムなセクションとして提示し、
 * 直前までの cream/白セクションとの強いコントラストを作る。
 * トーンは正直に：「全員がプロダクトへ移れる」とは書かず、「道が実在＋いまは
 * 少数だからこそ早期に中核を担える」で。具体的な人数は出さない。
 */
const pillars = [
  {
    label: "受託開発",
    headline: "プロダクトに、深く関わる。",
    body: "立ち上げ期から拡大中。要件から運用まで踏み込む開発を、チームで。",
  },
  {
    label: "自社SaaS NOVA",
    headline: "“自分たちのプロダクト”を持つ。",
    body: "AIマッチング×一元管理。すでにリリース済みの、自社開発SaaS。",
  },
  {
    label: "全社AI実装",
    headline: "AIを、“使う側”で。",
    body: "Claude Code・Codexを実務に。社内業務にもAIエージェントを実装する。",
  },
] as const;

export function Frontier() {
  return (
    <section
      id="frontier"
      className="relative overflow-hidden bg-ink py-20 md:py-[140px] text-cream"
    >
      <Container className="relative">
        {/* 見出し（暗背景のため SectionHead は使わず自前で組む） */}
        <FadeIn>
          <Kicker tone="inverse">Frontier</Kicker>
          <h2 className="mt-6 font-serif text-[30px] font-medium leading-[1.45] tracking-[0.02em] text-cream md:text-[48px]">
            SESの、その先へ。
          </h2>
          <p className="mt-6 max-w-[640px] font-sans text-[15px] leading-[2.05] text-white/70 md:text-base">
            JQITは、SESだけの会社じゃない。受託開発も、自社AIプロダクトも、全社のAI駆動開発も——ここから伸びていく領域だ。
          </p>
        </FadeIn>

        {/* 3本柱カード */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-7">
          {pillars.map((p, i) => (
            <FadeIn
              key={p.label}
              style={{ transitionDelay: `${i * 100}ms` } as React.CSSProperties}
              className="rounded-2xl border border-white/20 bg-white/[0.03] p-7 md:p-8"
            >
              <GeoMark index={i} size={26} className="text-brand" />
              <p className="mt-5 font-sans text-[12px] tracking-[0.08em] text-white/65">
                {p.label}
              </p>
              <h3 className="mt-2 text-balance font-serif text-[19px] text-cream">
                {p.headline}
              </h3>
              <p className="mt-3 font-sans text-[13.5px] leading-[1.95] text-white/65">
                {p.body}
              </p>
            </FadeIn>
          ))}
        </div>

        {/* 正直ノート */}
        <FadeIn className="mt-12 md:mt-16">
          <div className="border-l-2 border-brand pl-6 md:pl-7">
            <p className="max-w-[760px] font-sans text-[14.5px] leading-[2.0] text-white/75 md:text-[15.5px]">
              AI組織も受託も、いまはまだ少数の立ち上げ期。だからこそ、SESで力をつけたあなたが“次”の中核を担える。実際に、常駐からプロダクト側へ移ったメンバーもいる。
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
