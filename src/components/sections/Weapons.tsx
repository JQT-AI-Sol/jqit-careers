import { weapons, weaponsUpside } from "@/lib/content";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeoMark } from "@/components/ui/GeoMark";

/**
 * 進化するSES＝5つの武器（トップ核セクション #3）。
 * 旧「Why JQIT / 3つの理由」を置き換える本命ブロック。
 * 5武器をエディトリアルな行リストで提示し、②推奨技術（core）だけ視覚強調する。
 * 末尾に受託・自社AI(NOVA)への upside ブリッジを添える。
 */
export function Weapons() {
  return (
    <div>
      <ol aria-label="進化するSES＝5つの武器" className="border-t border-line">
        {weapons.map((w, i) => (
          <FadeIn
            as="li"
            key={w.no}
            style={{ transitionDelay: `${i * 90}ms` } as React.CSSProperties}
            className="group brand-line-row relative grid grid-cols-1 gap-4 overflow-hidden border-b border-line py-9 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:py-14"
          >
            {/* 極薄の巨大番号（背景タイポ） */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 right-0 select-none font-display text-[64px] leading-none text-ink/[0.05] transition-colors duration-500 group-hover:text-brand/[0.11] md:text-[112px]"
            >
              {w.no}
            </span>

            {/* 左：マーク＋カテゴリ＋見出し */}
            <div className="brand-line-label relative pl-2 md:pl-3">
              <div className="flex items-center gap-5">
                <GeoMark index={i} size={26} className="text-brand" />
                <span className="kicker">{w.label}</span>
                {w.core && (
                  <span className="inline-flex items-center rounded-full bg-brand px-2.5 py-0.5 font-sans text-[10px] font-bold tracking-[0.12em] text-white uppercase">
                    Core
                  </span>
                )}
              </div>
              <h3
                className={cn(
                  "mt-4 font-serif text-[25px] font-medium leading-[1.45] tracking-[0.01em] md:text-[31px]",
                  w.core ? "text-brand" : "text-ink",
                )}
              >
                {w.headline}
              </h3>
            </div>

            {/* 右：本文（行内で中央寄せ） */}
            <p className="relative font-sans text-[14px] leading-[2.05] text-muted md:self-center md:text-[15px]">
              {w.body}
            </p>
          </FadeIn>
        ))}
      </ol>

      {/* その先へ（upside／核B）ブリッジ */}
      <FadeIn className="mt-12 md:mt-16">
        <div className="relative border-l-2 border-brand bg-white/55 px-7 py-7 md:px-10 md:py-9">
          <span className="kicker">Beyond SES</span>
          <p className="mt-3 font-serif text-[18px] leading-[1.85] text-ink md:text-[21px]">
            {weaponsUpside.lead}
            <span className="font-sans text-[14.5px] leading-[2.05] text-body md:text-[15.5px]">
              {weaponsUpside.body}
            </span>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
