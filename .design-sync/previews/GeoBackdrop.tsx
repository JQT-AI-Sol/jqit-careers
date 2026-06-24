import { GeoBackdrop } from "jqit-careers";

// 構成主義的な隅の背景装飾（赤×黒の円・四角を極薄で四隅に絶対配置）。
// 親に position:relative + overflow:hidden が必要。pointer-events-none。
export const Default = () => (
  <div
    style={{
      position: "relative",
      height: 260,
      background: "#faf9f7",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <GeoBackdrop />
    <p
      style={{
        position: "relative",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".24em",
        textTransform: "uppercase",
        color: "#6b6b67",
      }}
    >
      Constructivist backdrop
    </p>
  </div>
);

// flip で左右反転（隣接セクションで向きを変える用途）。
export const Flipped = () => (
  <div
    style={{
      position: "relative",
      height: 260,
      background: "#ffffff",
      overflow: "hidden",
    }}
  >
    <GeoBackdrop flip />
  </div>
);
