import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

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

export const cultureMarqueeTiles: Tile[] = [
  { kind: "photo", src: "/images/generated/team-outdoor.jpg", w: 216, h: 304, mt: 74 },
  {
    kind: "hourglass",
    w: 172,
    h: 214,
    top: "8,10 164,10 86,110",
    bottom: "8,204 164,204 86,102",
    cx: 86,
    cy: 106,
    r: 36,
    mt: 42,
    mx: 18,
  },
  { kind: "circleImg", src: "/images/generated/trio-laptop.jpg", size: 210, mt: 90, mx: 18 },
  { kind: "photo", src: "/images/generated/desk-review.jpg", w: 238, h: 318, mt: 18 },
  { kind: "ring", size: 108, outer: "#e60012", inner: "#faf9f7", mt: 124, mx: 18 },
  { kind: "photo", src: "/images/generated/cafe-table.jpg", w: 344, h: 218, mt: 104 },
  { kind: "dot", size: 78, color: "#14140f", mt: 32, mx: 20 },
  { kind: "circleImg", src: "/images/generated/greenery-chat.jpg", size: 184, mt: 76, mx: 18 },
  { kind: "photo", src: "/images/generated/meeting-room.jpg", w: 278, h: 204, mt: 32 },
  { kind: "ring", size: 72, outer: "#14140f", inner: "#f3f1ec", mt: 126, mx: 16 },
  { kind: "photo", src: "/images/generated/walk-outside.jpg", w: 190, h: 284, mt: 58 },
];

function TileView({ tile, eager }: { tile: Tile; eager: boolean }) {
  const mx = tile.mx ?? 10;
  const margin = { marginTop: tile.mt ?? 0, marginLeft: mx, marginRight: mx };

  switch (tile.kind) {
    case "photo":
      return (
        <div
          className="relative shrink-0 overflow-hidden rounded-2xl bg-line"
          style={{ width: tile.w, height: tile.h, ...margin }}
        >
          <Image
            src={asset(tile.src)}
            alt=""
            fill
            sizes={`${tile.w}px`}
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        </div>
      );
    case "circleImg":
      return (
        <div
          className="relative shrink-0 overflow-hidden rounded-full bg-line"
          style={{ width: tile.size, height: tile.size, ...margin }}
        >
          <Image
            src={asset(tile.src)}
            alt=""
            fill
            sizes={`${tile.size}px`}
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        </div>
      );
    case "dot":
      return (
        <div
          className="shrink-0 rounded-full"
          style={{ width: tile.size, height: tile.size, background: tile.color, ...margin }}
        />
      );
    case "ring": {
      const cx = tile.size / 2;
      return (
        <div className="shrink-0" style={{ width: tile.size, height: tile.size, ...margin }}>
          <svg width={tile.size} height={tile.size} viewBox={`0 0 ${tile.size} ${tile.size}`} className="block">
            <circle cx={cx} cy={cx} r={cx - 1} fill={tile.outer} />
            <circle cx={cx} cy={cx} r={Math.round(tile.size * 0.24)} fill={tile.inner} />
          </svg>
        </div>
      );
    }
    case "hourglass":
      return (
        <div className="shrink-0" style={{ width: tile.w, height: tile.h, ...margin }}>
          <svg width={tile.w} height={tile.h} viewBox={`0 0 ${tile.w} ${tile.h}`} className="block">
            <polygon points={tile.top} fill="#e7e5e0" />
            <polygon points={tile.bottom} fill="#e60012" />
            <circle cx={tile.cx} cy={tile.cy} r={tile.r} fill="#ffffff" />
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
  const group = (
    <div className="flex shrink-0 items-start">
      {tiles.map((tile, index) => (
        <TileView key={index} tile={tile} eager={eager && index < tiles.length} />
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
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[20%] bg-[linear-gradient(to_bottom,#fff,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-[linear-gradient(to_top,#fff_35%,transparent)]" />
      <div
        className={cn("marquee-track items-start", direction === "right" && "is-rtl")}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
