import { twMerge } from "tailwind-merge";

// Tailwindクラス結合。競合ユーティリティ（px-8 vs px-10 等）は後勝ちで解決される。
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
