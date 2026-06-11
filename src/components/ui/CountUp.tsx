"use client";

import { useEffect, useRef, useState } from "react";

// ---- カウントアップ設定値 ----
// 演出時間（約1.2秒）。
const DURATION_MS = 1200;
// ビューポート進入判定の閾値（1px でも交差すれば発火）。
const THRESHOLD = 0.01;
// 下辺を 15% 拡張し「入る手前」で発火させる（FadeIn と同調）。
const ROOT_MARGIN = "0px 0px 15% 0px";

// ease-out（数値が最後に向かって滑らかに減速する）。
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// value を数値としてアニメ可能か判定し、可能なら数値・小数桁数・元のフォーマットを返す。
// 例: "115" → 整数 / "29.8" → 小数1桁 / "全額" "月2" → 非数値（null）。
function parseNumeric(value: string): { target: number; decimals: number } | null {
  const trimmed = value.trim();
  // 純粋な数値（任意の小数）のみ対象。記号・単位・接頭辞付きは静的表示にする。
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return null;
  const target = Number(trimmed);
  if (!Number.isFinite(target)) return null;
  const dot = trimmed.indexOf(".");
  const decimals = dot === -1 ? 0 : trimmed.length - dot - 1;
  return { target, decimals };
}

function format(n: number, decimals: number): string {
  return n.toFixed(decimals);
}

export function CountUp({ value }: { value: string }) {
  const parsed = parseNumeric(value);
  const ref = useRef<HTMLSpanElement | null>(null);

  // SSR/初期表示は必ず最終値を出す（非JS・SEOでも数字が消えない／チラつき防止）。
  // 数値ならマウント後に 0 から再生する。
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    // 非数値（"全額" 等）はアニメ不要 → 静的表示のまま。
    if (!parsed) return;

    const { target, decimals } = parsed;

    // prefers-reduced-motion: reduce → 最終値を即表示（アニメ無し）。
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(format(target, decimals));
      return;
    }

    const el = ref.current;
    if (!el) return;

    let started = false;
    let rafId = 0;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / DURATION_MS, 1);
        const current = target * easeOutCubic(progress);
        setDisplay(format(current, decimals));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          // 端数誤差を避け、最終フレームは厳密な目標値で確定。
          setDisplay(format(target, decimals));
        }
      };
      // 0 から再生開始（初期は最終値表示 → 可視時に 0 から立ち上げる）。
      setDisplay(format(0, decimals));
      rafId = requestAnimationFrame(tick);
    };

    // IO 非対応環境では即最終値（コンテンツ消失を防ぐ）。
    if (typeof IntersectionObserver === "undefined") {
      setDisplay(format(target, decimals));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect(); // 1回だけ。
        }
      },
      { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
    // value 由来の parsed は再マウント以外で変わらない前提のため依存は value のみ。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
