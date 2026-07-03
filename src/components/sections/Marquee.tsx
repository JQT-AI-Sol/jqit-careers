import { cn } from "@/lib/cn";

/**
 * マーキー帯：横長ディスプレイ書体（Archivo Expanded）の特大キーワードが、
 * 極薄(ink 8%)の“背景タイポ”として静かに流れる。枠・地色を持たず本体に溶け込ませ、
 * 語間には赤い細線の幾何学マーク（十字・菱形・円・アステリスク・三角）を巡回配置。
 * 極薄の文字に対し赤マークだけがリズムを刻む構成。軽量CSSアニメ／reduced-motion対応。
 */

// 語間の幾何学マーク。fill なし・細線のアウトラインで上品に。brand 色で差す。
const marks = [
  <path key="plus" d="M12 2.5v19M2.5 12h19" />, // 十字
  <path key="diamond" d="M12 2.5 21.5 12 12 21.5 2.5 12Z" />, // 菱形
  <circle key="ring" cx="12" cy="12" r="8.5" />, // 円
  <path key="asterisk" d="M12 2v20M3.3 7 20.7 17M20.7 7 3.3 17" />, // 六条星
  <path key="triangle" d="M12 3 21 20H3Z" />, // 三角
];

// Claude Design 原本の語ごとのマーク割当て（8語目以降は繰り返し）。
// 単純な5種巡回ではなく、6〜8語目は 十字→円→菱形 の並びになっている。
const markOrder = [0, 1, 2, 3, 4, 0, 2, 1];

function Mark({ index }: { index: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 text-brand md:h-9 md:w-9"
    >
      {marks[markOrder[index % markOrder.length]]}
    </svg>
  );
}

export function Marquee({
  words,
  direction = "left",
  durationSec = 48,
  className,
}: {
  words: string[];
  direction?: "left" | "right";
  durationSec?: number;
  className?: string;
}) {
  const group = (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 font-display text-[44px] leading-none tracking-[0.05em] text-ink/[0.09] uppercase md:px-12 md:text-[116px]">
            {w}
          </span>
          <Mark index={i} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden py-6 md:py-10",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn("marquee-track items-center", direction === "right" && "is-rtl")}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
