import { cn } from "@/lib/cn";

/**
 * 赤の差し色で使う細線の幾何学マーク（十字・菱形・円・六条星・三角）。
 * Marquee と統一したデザイン言語。index で巡回、size で大きさ指定。
 */
const shapes = [
  <path key="plus" d="M12 2.5v19M2.5 12h19" />,
  <path key="diamond" d="M12 2.5 21.5 12 12 21.5 2.5 12Z" />,
  <circle key="ring" cx="12" cy="12" r="8.5" />,
  <path key="asterisk" d="M12 2v20M3.3 7 20.7 17M20.7 7 3.3 17" />,
  <path key="triangle" d="M12 3 21 20H3Z" />,
];

export function GeoMark({
  index = 0,
  size = 24,
  className,
}: {
  index?: number;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      {shapes[index % shapes.length]}
    </svg>
  );
}
