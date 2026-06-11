import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/**
 * 写真マーキー（不揃い版）：高さ・幅・縦位置をずらした人物写真が横に流れる。
 * 縦長/横長の切り取りを混在させ、モダンで動きのある“流れ”に。モノクロ統一。
 * 軽量CSSアニメ（marquee-track 流用）、prefers-reduced-motion対応。
 */

// 形のバリエーション（幅・高さ・縦オフセット）。崩しすぎない範囲で不揃いに。
const shapes = [
  "mt-0 w-[230px] h-[300px] md:w-[300px] md:h-[372px]", // 縦長・大
  "mt-12 md:mt-20 w-[210px] h-[160px] md:w-[280px] md:h-[212px]", // 横長・下げ
  "mt-5 md:mt-8 w-[180px] h-[236px] md:w-[236px] md:h-[300px]", // 縦長・中
  "mt-16 md:mt-[88px] w-[250px] h-[178px] md:w-[330px] md:h-[236px]", // 横長・大・下げ
  "mt-2 w-[170px] h-[214px] md:w-[214px] md:h-[276px]", // 縦長・小
];

export function PhotoMarquee({
  images,
  direction = "left",
  durationSec = 62,
  className,
}: {
  images: string[];
  direction?: "left" | "right";
  durationSec?: number;
  className?: string;
}) {
  const group = (
    <div className="flex shrink-0 items-start">
      {images.map((src, i) => (
        <div
          key={i}
          className={cn(
            "relative mx-1.5 shrink-0 overflow-hidden rounded-2xl bg-ink md:mx-2.5",
            shapes[i % shapes.length],
          )}
        >
          <Image
            src={asset(src)}
            alt=""
            fill
            sizes="(max-width: 768px) 250px, 330px"
            className="object-cover grayscale"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative h-[360px] overflow-hidden md:h-[480px]",
        "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "marquee-track items-start",
          direction === "right" && "is-rtl",
        )}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
