import { Button } from "jqit-careers";

// CTA / リンクの3バリアント。href は必須、http:// 始まりは外部リンク（別タブ）。
export const Primary = () => (
  <Button href="#entry">カジュアル面談を申し込む</Button>
);

export const Outline = () => (
  <Button href="#jobs" variant="outline">
    募集職種を見る
  </Button>
);

export const Arrow = () => (
  <Button href="#about" variant="arrow">
    JQITについて知る
  </Button>
);
