import { GeoMark } from "jqit-careers";

// 赤の差し色で使う細線の幾何マーク5種（十字・菱形・円・六条星・三角）。
// stroke=currentColor なので親の色で着色。index%5 で巡回、size で大きさ。
export const AllShapes = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "#e60012" }}>
    <GeoMark index={0} />
    <GeoMark index={1} />
    <GeoMark index={2} />
    <GeoMark index={3} />
    <GeoMark index={4} />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 20, alignItems: "center", color: "#e60012" }}>
    <GeoMark index={1} size={16} />
    <GeoMark index={1} size={24} />
    <GeoMark index={1} size={40} />
  </div>
);
