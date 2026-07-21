import { CountUp } from "jqit-careers";

// 数値のカウントアップ（1.2s ease-out / 画面進入で1回）。数値文字列のみ動き、
// "全額" 等の非数値はそのまま静的表示。明朝の大きな数字＋赤い単位で組むのが定番。
const Stat = ({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) => (
  <div>
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: 54,
        fontWeight: 400,
        lineHeight: 1,
        color: "#14140f",
      }}
    >
      <CountUp value={value} />
      <span style={{ color: "#e60012", fontSize: 24, marginLeft: 2 }}>{unit}</span>
    </div>
    <p
      style={{
        marginTop: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "#6b6b67",
      }}
    >
      {label}
    </p>
  </div>
);

export const Engineers = () => (
  <Stat value="115" unit="名" label="エンジニア在籍数" />
);

export const QaRatio = () => (
  <Stat value="46.6" unit="%" label="QA / テスト領域比率" />
);

// 非数値はアニメせずそのまま表示される例。
export const NonNumeric = () => (
  <Stat value="全額" unit="" label="資格受験費用の補助" />
);
