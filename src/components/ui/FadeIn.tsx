"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// ---- リビール設定値（堅牢化のためのチューニングノブ） ----
// rootMargin: 下辺を 15% 拡張し「要素がビューポートに入る手前」で発火させる。
const REVEAL_ROOT_MARGIN = "0px 0px 15% 0px";
// threshold: 0.01 = 1px でも交差すれば発火（ファーストビュー直下を取りこぼさない）。
const REVEAL_THRESHOLD = 0.01;
// fallback: マウントから 1200ms 未表示なら強制表示（最大でも 1.2 秒で空白を解消）。
const REVEAL_FALLBACK_MS = 1200;

export function FadeIn({
  children,
  className,
  style,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 4) prefers-reduced-motion: reduce の場合は即表示（リビール無効）。
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
    };

    // 2) マウント時に既にビューポート内/近傍なら即表示（IO 発火を待たずに保証）。
    //    REVEAL_ROOT_MARGIN と同じ 15% 下方拡張で「手前」も近傍とみなす。
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const margin = viewportH * 0.15;
    if (rect.top < viewportH + margin && rect.bottom > 0) {
      reveal();
      return;
    }

    // 1) トリガーを早める: 正の下マージン + 極小 threshold で入る手前で発火。
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer?.disconnect();
          }
        },
        { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
      );
      observer.observe(el);
    } else {
      // IO 非対応環境では即表示（コンテンツ消失を防ぐ）。
      reveal();
    }

    // 3) フォールバック: 一定時間 未表示なら強制表示（空白を 1.2 秒以上残さない）。
    const fallback = window.setTimeout(reveal, REVEAL_FALLBACK_MS);

    return () => {
      window.clearTimeout(fallback);
      observer?.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn("fade-in", visible && "is-visible", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
