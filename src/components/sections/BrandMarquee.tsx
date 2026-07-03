import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/**
 * ブランドマーキー：人物写真と幾何学シェイプ（赤丸・砂時計型の三角・リング・
 * 丸抜き写真）を不揃いに織り交ぜて横に流す、構成主義的な演出。
 * Claude Design 原本の構成を忠実に再現。上下に白フェード・左右にマスクをかけ、
 * 帯の縁を背景に溶かす。CSSアニメ（marquee-track）・prefers-reduced-motion対応。
 */

type Tile =
  | { kind: "photo"; src: string; w: number; h: number; mt?: number; mx?: number }
  | { kind: "circleImg"; src: string; size: number; mt?: number; mx?: number }
  | { kind: "dot"; size: number; color: string; mt?: number; mx?: number }
  | { kind: "ring"; size: number; outer: string; inner: string; mt?: number; mx?: number }
  | {
      kind: "hourglass";
      w: number;
      h: number;
      top: string;
      bottom: string;
      cx: number;
      cy: number;
      r: number;
      mt?: number;
      mx?: number;
    };

// ヒーロー上部（左流れ・62s）
export const heroMarqueeTiles: Tile[] = [
  { kind: "photo", src: "/images/people/r6.jpg", w: 300, h: 372, mt: 0 },
  { kind: "dot", size: 86, color: "#e60012", mt: 18, mx: 8 },
  { kind: "photo", src: "/images/people/r1.jpg", w: 280, h: 212, mt: 80 },
  {
    kind: "hourglass",
    w: 194,
    h: 236,
    top: "10,12 184,12 97,122",
    bottom: "10,224 184,224 97,112",
    cx: 97,
    cy: 117,
    r: 42,
    mt: 118,
    mx: 12,
  },
  { kind: "circleImg", src: "/images/people/r3.jpg", size: 222, mt: 22 },
  { kind: "photo", src: "/images/people/r2.jpg", w: 236, h: 300, mt: 32 },
  { kind: "circleImg", src: "/images/people/r8.jpg", size: 178, mt: 92 },
  { kind: "ring", size: 130, outer: "#e60012", inner: "#faf9f7", mt: 6, mx: 14 },
  { kind: "photo", src: "/images/people/r7.jpg", w: 330, h: 236, mt: 88 },
];

// Our People（右流れ・66s）
export const ourPeopleMarqueeTiles: Tile[] = [
  { kind: "photo", src: "/images/people/r4.jpg", w: 300, h: 372, mt: 0 },
  { kind: "ring", size: 116, outer: "#14140f", inner: "#faf9f7", mt: 14, mx: 12 },
  { kind: "photo", src: "/images/people/r3.jpg", w: 280, h: 212, mt: 80 },
  { kind: "circleImg", src: "/images/people/r1.jpg", size: 228, mt: 26 },
  { kind: "photo", src: "/images/people/r8.jpg", w: 236, h: 300, mt: 32 },
  { kind: "circleImg", src: "/images/people/r6.jpg", size: 150, mt: 120 },
  {
    kind: "hourglass",
    w: 202,
    h: 246,
    top: "10,12 192,12 101,128",
    bottom: "10,234 192,234 101,118",
    cx: 101,
    cy: 123,
    r: 45,
    mt: 34,
    mx: 12,
  },
  { kind: "photo", src: "/images/people/r2.jpg", w: 330, h: 236, mt: 88 },
];

function TileView({ t, eager }: { t: Tile; eager: boolean }) {
  const mx = t.mx ?? 10;
  const margin = { marginTop: t.mt ?? 0, marginLeft: mx, marginRight: mx };

  switch (t.kind) {
    case "photo":
      return (
        <div
          className="relative shrink-0 overflow-hidden rounded-2xl bg-line"
          style={{ width: t.w, height: t.h, ...margin }}
        >
          <Image
            src={asset(t.src)}
            alt=""
            fill
            sizes={`${t.w}px`}
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        </div>
      );
    case "circleImg":
      return (
        <div
          className="relative shrink-0 overflow-hidden rounded-full bg-line"
          style={{ width: t.size, height: t.size, ...margin }}
        >
          <Image
            src={asset(t.src)}
            alt=""
            fill
            sizes={`${t.size}px`}
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        </div>
      );
    case "dot":
      return (
        <div
          className="shrink-0 rounded-full"
          style={{ width: t.size, height: t.size, background: t.color, ...margin }}
        />
      );
    case "ring": {
      const cx = t.size / 2;
      return (
        <div className="shrink-0" style={{ width: t.size, height: t.size, ...margin }}>
          <svg width={t.size} height={t.size} viewBox={`0 0 ${t.size} ${t.size}`} className="block">
            <circle cx={cx} cy={cx} r={cx - 1} fill={t.outer} />
            <circle cx={cx} cy={cx} r={Math.round(t.size * 0.24)} fill={t.inner} />
          </svg>
        </div>
      );
    }
    case "hourglass":
      return (
        <div className="shrink-0" style={{ width: t.w, height: t.h, ...margin }}>
          <svg width={t.w} height={t.h} viewBox={`0 0 ${t.w} ${t.h}`} className="block">
            <polygon points={t.top} fill="#e7e5e0" />
            <polygon points={t.bottom} fill="#e60012" />
            <circle cx={t.cx} cy={t.cy} r={t.r} fill="#ffffff" />
          </svg>
        </div>
      );
  }
}

export function BrandMarquee({
  tiles,
  direction = "left",
  durationSec = 62,
  eager = false,
  className,
}: {
  tiles: Tile[];
  direction?: "left" | "right";
  durationSec?: number;
  eager?: boolean;
  className?: string;
}) {
  // eager指定時も先読みは初期ビューポートに入りうる1グループ目の先頭数枚だけ。
  // 2グループ目（ループ用の複製）と帯の後方タイルはlazyのままにする。
  const EAGER_TILE_COUNT = 4;
  const renderGroup = (isFirstGroup: boolean) => (
    <div className="flex shrink-0 items-start">
      {tiles.map((t, i) => (
        <TileView
          key={i}
          t={t}
          eager={eager && isFirstGroup && i < EAGER_TILE_COUNT}
        />
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative h-[clamp(290px,46vw,480px)] overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        className,
      )}
      aria-hidden
    >
      {/* 上下の白フェード（帯の縁を背景に溶かす） */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[20%] bg-[linear-gradient(to_bottom,#fff,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-[linear-gradient(to_top,#fff_35%,transparent)]" />
      <div
        className={cn("marquee-track items-start", direction === "right" && "is-rtl")}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {renderGroup(true)}
        {renderGroup(false)}
      </div>
    </div>
  );
}
