import { SectionHead } from "jqit-careers";

// 全セクション共通の見出しブロック（Kicker + 明朝H2 + リード）。
// title は ReactNode なので強調語を赤（text-brand）で差せる。FadeIn 内包。
export const Default = () => (
  <SectionHead
    kicker="OUR STRENGTH"
    title={
      <>
        進化する<span className="text-brand">SES</span>という、第三の選択肢。
      </>
    }
    lead="受託でも自社開発でもない。最前線の現場で技術を磨きながら、キャリアを自分で設計する——JQITはそんな働き方を本気で支えます。"
  />
);

export const Centered = () => (
  <SectionHead
    center
    kicker="CULTURE"
    title="挑戦と革新で、未来を切り拓く。"
    lead="一人ひとりの成長が、会社の進化に直結する。"
  />
);
