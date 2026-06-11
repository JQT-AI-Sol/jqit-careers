import { cn } from "@/lib/cn";

/**
 * マーキー帯：英字キーワードが横に流れる上品な演出。
 * モノクロ＋赤の差し色。軽量CSSアニメ（依存なし）、prefers-reduced-motion対応。
 * 端はマスクでフェードさせてエディトリアルに。
 */
export function Marquee({
  words,
  direction = "left",
  durationSec = 38,
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
          <span className="px-7 font-mono text-[26px] font-semibold tracking-[0.04em] text-ink/30 uppercase md:px-10 md:text-[44px]">
            {w}
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand md:h-2 md:w-2" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-line bg-cream py-5 md:py-7",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn("marquee-track", direction === "right" && "is-rtl")}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
