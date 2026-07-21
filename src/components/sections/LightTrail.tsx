import { cn } from "@/lib/cn";

/**
 * 赤い光跡（道）。複数の曲線を少しずつずらして束ね、blur で光のトレイルに見せる。
 * ヒーロー右側を埋める装飾。粒子コンステレーションと相性を取り、赤の差し色で未来感を出す。
 */
const paths = [
  "M110,760 C330,560 380,360 660,300",
  "M80,770 C350,580 410,380 680,330",
  "M150,750 C310,540 360,340 645,275",
  "M60,775 C365,600 430,405 690,350",
  "M185,740 C295,510 350,325 630,255",
  "M40,778 C380,615 445,420 700,365",
  "M340,780 C600,560 705,300 715,30",
  "M420,775 C655,540 725,260 735,0",
  "M270,778 C560,580 690,330 705,70",
];

export function LightTrail({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 720 780"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 52%), linear-gradient(to bottom, transparent 0%, black 26%, black 50%, transparent 64%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 52%), linear-gradient(to bottom, transparent 0%, black 26%, black 50%, transparent 64%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
      className={cn("pointer-events-none absolute select-none", className)}
    >
      <defs>
        <linearGradient id="lt-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(230,0,18,0)" />
          <stop offset="42%" stopColor="rgba(230,0,18,0.55)" />
          <stop offset="78%" stopColor="rgba(230,0,18,0.28)" />
          <stop offset="100%" stopColor="rgba(230,0,18,0)" />
        </linearGradient>
        <filter id="lt-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <g filter="url(#lt-glow)" stroke="url(#lt-grad)" fill="none">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeWidth={0.8 + (i % 3) * 0.7}
            opacity={0.35 + (i % 3) * 0.22}
          />
        ))}
      </g>
    </svg>
  );
}
