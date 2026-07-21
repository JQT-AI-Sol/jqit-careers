import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";

/**
 * 共感（Before）ブロック（トップ）。5武器（答え）の手前に、経験者SESエンジニアの
 * “あるある”な消耗を言語化して共感をつくる。痛みの主語は「SESという業態」ではなく
 * 「ひとり常駐・レガシー塩漬けという働き方/環境」。SES自体は否定しない。
 * 赤(brand)はピボット文の一語だけに限定し、muted/ink 主体の抑えたトーンで、
 * この後に来る赤い5武器との対比をつくる。
 */
const aruaru = [
  {
    label: "ひとり常駐",
    body: "相談できる仲間も、引き上げてくれる先輩もいない。",
  },
  {
    label: "レガシー保守",
    body: "何年も同じ現場。市場価値が上がっている実感がない。",
  },
  {
    label: "自腹の学習",
    body: "新しい技術は、いつも休日と持ち出し。学びが評価に返らない。",
  },
  {
    label: "消耗だけが残る",
    body: "気づけば、スキルより疲労ばかりが積み上がる。",
  },
];

export function Empathy() {
  return (
    <section className="relative overflow-hidden py-20 md:py-[140px]">
      <GeoBackdrop flip />
      <Container className="relative">
        <SectionHead kicker="Before" title="その消耗、当たり前じゃない。" />

        {/* “あるある” 4項目（デスクトップ2列 / モバイル1列） */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {aruaru.map((item, i) => (
            <FadeIn
              key={item.label}
              style={{ transitionDelay: `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <GeoMark index={i} size={20} className="text-muted/70" />
                <span className="font-sans text-sm font-medium text-ink">
                  「{item.label}」
                </span>
              </div>
              <p className="mt-3 font-sans text-[14px] leading-[1.95] text-muted">
                {item.body}
              </p>
            </FadeIn>
          ))}
        </div>

        {/* ピボット文（唯一の赤強調） */}
        <FadeIn className="mt-14 md:mt-20">
          <p className="font-serif text-[22px] leading-[1.6] text-ink md:text-[30px]">
            それは、あなたの実力の問題じゃない。
            <br />
            <em className="not-italic text-brand">
              “どこで働くか”の問題だ。
            </em>
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
