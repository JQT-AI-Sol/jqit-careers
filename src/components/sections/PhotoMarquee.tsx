import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/**
 * 写真マーキー：人物写真が横に流れる帯（SmartHR風／顔が見える）。
 * モノクロ統一。軽量CSSアニメ（marquee-track を流用）、prefers-reduced-motion対応。
 */
export function PhotoMarquee({
  images,
  direction = "left",
  durationSec = 60,
  className,
}: {
  images: string[];
  direction?: "left" | "right";
  durationSec?: number;
  className?: string;
}) {
  const group = (
    <div className="flex shrink-0">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative mx-1.5 h-[180px] w-[240px] shrink-0 overflow-hidden rounded-card bg-ink md:mx-2 md:h-[260px] md:w-[340px]"
        >
          <Image
            src={asset(src)}
            alt=""
            fill
            sizes="(max-width: 768px) 240px, 340px"
            className="object-cover grayscale"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]",
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
