import { cn } from "@/lib/cn";

/**
 * 極薄の巨大番号（背景タイポ）。カード背景に敷く装飾番号。
 * 濃度（ink/[0.09]）とホバー色（brand/[0.15]）はここで一元管理し、
 * サイズ・位置は呼び出し側の className で指定する。
 */
export function GhostNumber({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute font-display leading-none select-none text-ink/[0.09] transition-colors duration-500 group-hover:text-brand/[0.15]",
        className,
      )}
    >
      {children}
    </span>
  );
}
