import { cn } from "@/lib/cn";

/**
 * 構成主義的な背景装飾。赤×黒の円と四角を、各セクションの「隅」に極薄で配置。
 * 円はゆるやかに浮遊（geo-float）、四角はごく遅く回転（geo-spin）し、背景が静かに息づく。
 * div ベースなのでモバイル/デスクトップ両方で確実に表示され、テキスト中央を避ける。
 * flip で左右反転。reduced-motion 時はアニメ無効（globals.css 側で制御）。
 */
export function GeoBackdrop({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        flip && "-scale-x-100",
        className,
      )}
    >
      {/* 右上：四角(赤・回転)＋円(黒・浮遊) */}
      <div
        className="geo-spin absolute -top-7 right-5 h-24 w-24 bg-brand/[0.08] md:right-10 md:h-44 md:w-44"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="geo-float absolute top-9 -right-7 h-20 w-20 rounded-full bg-ink/[0.07] md:top-12 md:right-2 md:h-40 md:w-40"
        style={{ animationDelay: "-1s" }}
      />
      {/* 左下：四角(黒・回転)＋赤い円(浮遊) */}
      <div
        className="geo-spin absolute bottom-12 -left-7 h-16 w-16 bg-ink/[0.06] md:bottom-16 md:left-2 md:h-32 md:w-32"
        style={{ animationDelay: "-38s" }}
      />
      <div
        className="geo-float absolute -bottom-6 left-8 h-14 w-14 rounded-full bg-brand/[0.08] md:left-14 md:h-24 md:w-24"
        style={{ animationDelay: "-5s" }}
      />
      {/* 右下：大きな円(浮遊) */}
      <div
        className="geo-float absolute -right-10 -bottom-12 h-32 w-32 rounded-full bg-ink/[0.06] md:h-56 md:w-56"
        style={{ animationDelay: "-3s" }}
      />
    </div>
  );
}
