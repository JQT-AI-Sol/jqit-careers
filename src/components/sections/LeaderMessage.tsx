import { Container } from "@/components/ui/Container";
import { Kicker, SectionHead } from "@/components/ui/SectionHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";
import { GeoBackdrop } from "@/components/ui/GeoBackdrop";
import { company } from "@/lib/content";

/**
 * 事業責任者メッセージ＋事業内容（トップ #4）。
 * 「人を主軸」に据える核セクション。顔出し・一次コメントが本来の姿だが、
 * 取材・撮影が未了のため、写真はプレースホルダー（シルエット＝差し替え予定）、
 * メッセージはサンプル明示で“枠”を先行。事業内容は content.ts の実データを使用。
 * ※実物（事業責任者の写真・氏名・本人コメント）に差し替えて公開すること。
 */

// 事業内容＝実データ（2事業＋自社プロダクト NOVA）
const businesses = [
  ...company.businesses.map((b) => ({ name: b.name, body: b.body })),
  { name: `自社プロダクト「${company.product.name}」`, body: company.product.body },
];

export function LeaderMessage() {
  return (
    <section className="relative overflow-hidden py-20 md:py-[140px]">
      <GeoBackdrop flip />
      <Container className="relative">
        <SectionHead
          kicker="Leadership"
          title="事業責任者から。"
          lead="技術や制度の前に、私たちが何を変えようとしているのか。現場を預かる責任者の言葉で。"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.78fr_1.22fr] md:gap-16">
          {/* 左：顔写真プレースホルダー（差し替え予定） */}
          <FadeIn>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
              {/* 人物シルエット（写真が入る位置） */}
              <svg
                viewBox="0 0 100 120"
                aria-hidden
                className="absolute inset-0 m-auto h-1/2 w-1/2 text-white/15"
                fill="currentColor"
              >
                <circle cx="50" cy="42" r="22" />
                <path d="M12 120c0-23 17-38 38-38s38 15 38 38Z" />
              </svg>
              {/* サンプル注記 */}
              <span className="absolute left-4 top-4 rounded-full border border-white/25 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">
                Photo ／ 差し替え予定
              </span>
              {/* 氏名・所属（差し替え予定） */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="font-serif text-[22px] tracking-[0.06em] text-white">
                  （事業責任者 氏名）
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">
                  事業責任者 ／ Division Lead
                </p>
              </div>
            </figure>
          </FadeIn>

          {/* 右：メッセージ（サンプル） */}
          <FadeIn style={{ transitionDelay: "120ms" } as React.CSSProperties}>
            <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 font-sans text-[10px] font-bold tracking-[0.12em] text-brand uppercase">
              Sample ／ 差し替え予定
            </span>
            <blockquote className="mt-5 space-y-5 font-sans text-[15px] leading-[2.05] text-body md:text-base">
              <p>
                私たちは、「ひとりで客先に送り出すSES」を変えたいと考えています。
                <span className="font-medium text-ink">
                  チームで現場に入り、会社が技術への投資を惜しまない。
                </span>
                エンジニア一人ひとりが消耗せず、技術を伸ばし続けられる——それが、JQITのつくりたい現場です。
              </p>
              <p>
                その先には、受託や自社AIプロダクトへ進む道もあります。経験を積んだあなたの力を、ここで次のステージへ。まずは一度、話を聞かせてください。
              </p>
            </blockquote>
            <p className="mt-7 flex items-center gap-3 font-serif text-[16px] font-medium text-ink md:text-[18px]">
              <span className="h-px w-8 bg-brand" />
              （署名・役職）
            </p>
          </FadeIn>
        </div>

        {/* 事業内容（実データ） */}
        <div className="mt-16 md:mt-24">
          <FadeIn>
            <Kicker>Business</Kicker>
            <h3 className="mt-5 font-serif text-[22px] font-medium tracking-[0.02em] text-ink md:text-[28px]">
              JQITの事業
            </h3>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {businesses.map((b, i) => (
              <FadeIn
                key={b.name}
                as="article"
                style={{ transitionDelay: `${i * 90}ms` } as React.CSSProperties}
                className="flex h-full flex-col bg-paper p-7 md:p-8"
              >
                <GeoMark index={i} size={24} className="text-brand" />
                <h4 className="mt-5 font-serif text-[18px] font-medium leading-[1.5] text-ink">
                  {b.name}
                </h4>
                <p className="mt-3 font-sans text-[13.5px] leading-[1.95] text-muted">
                  {b.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
