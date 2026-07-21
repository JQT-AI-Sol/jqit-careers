import { Kicker } from "jqit-careers";

// 見出しの導入ラベル（mono 600 / .24em / uppercase / muted）。
// ::before に赤24pxの細線が付く（.kicker）。SectionHead 内でも使われる。
export const Default = () => <Kicker>OUR STRENGTH</Kicker>;

export const Variants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Kicker>CULTURE</Kicker>
    <Kicker>RECRUIT FLOW</Kicker>
    <Kicker>MESSAGE</Kicker>
  </div>
);
