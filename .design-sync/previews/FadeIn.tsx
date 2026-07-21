import { FadeIn } from "jqit-careers";

// スクロールイン汎用ラッパ（opacity0+Y20px→0 / 0.8s）。IntersectionObserver で
// 発火、reduced-motion では即時表示。静止画ではフェード後の最終状態を示す。
export const Default = () => (
  <FadeIn>
    <p
      style={{
        margin: 0,
        fontFamily: "var(--font-serif)",
        fontSize: 22,
        fontWeight: 500,
        color: "#14140f",
        lineHeight: 1.6,
      }}
    >
      スクロールで静かにせり上がる、汎用リビールラッパー。
    </p>
    <p
      style={{
        marginTop: 12,
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        lineHeight: 1.95,
        color: "#6b6b67",
      }}
    >
      IntersectionObserver で発火し、未発火でも 1.2 秒で強制表示。
      prefers-reduced-motion では即時表示にフォールバックします。
    </p>
  </FadeIn>
);
