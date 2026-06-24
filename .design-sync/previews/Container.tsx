import { Container } from "jqit-careers";

// 中央寄せの最大幅コンテナ（max-w-[1160px] + 左右ガター px-5 md:px-8）。
// ページ全体の横幅とガターを揃える基準。
export const Default = () => (
  <div style={{ background: "#faf9f7", paddingTop: 24, paddingBottom: 24 }}>
    <Container>
      <div
        style={{
          border: "1px solid #e7e5e0",
          background: "#fff",
          borderRadius: 2,
          padding: "24px 28px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.9,
            color: "#2a2a28",
          }}
        >
          Container は最大幅 1160px・左右ガター付きで内容を中央に収めます。
          ヘッダー / フッターを含む全セクションがこの幅と余白に揃います。
        </p>
      </div>
    </Container>
  </div>
);
