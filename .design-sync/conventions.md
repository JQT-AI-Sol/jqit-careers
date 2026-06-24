# JQIT Careers — デザインシステム（プリミティブ）

明朝エディトリアル × 赤(#e60012) × モノクロの採用ブランド。白い余白の上で明朝が静かに語り、
赤だけが差し色として精密に入る——「雑誌のようなエンジニアリング・ブランディング」。
このライブラリは `src/components/ui/` のプリミティブ8種（`window.JqitCareers.*`）：
**Button / Container / SectionHead / Kicker / FadeIn / CountUp / GeoBackdrop / GeoMark**。

## セットアップ（プロバイダ不要）
React コンテキストやテーマプロバイダは**不要**。各コンポーネントは自己完結で、`styles.css`
（トークン＋フォント＋ユーティリティ＋カスタムCSS）が読み込まれていればブランド通りに描画される。
ラップが要るのは演出系のみ：`GeoBackdrop` は **`position:relative` + `overflow:hidden` の親**の中に置く
（隅に絶対配置の装飾）。`FadeIn` / `SectionHead` はスクロールで現れる（reduced-motion で即時表示）。
フォントは Noto Serif JP(明朝) / Noto Sans JP / Archivo(mono) / Anton(display)。**`<body>` 既定は明朝(serif)**。

## スタイリングのイディオム（Tailwind v4 ＋ @theme トークン）
クラス名は下記の語彙を使う（`tailwind.config` は無く `@theme` で生成）。**新しい色名・トークンを発明しない**。

| 系統 | クラス（実在） | 値 / 用途 |
|---|---|---|
| 赤(差し色) | `bg-brand` `text-brand` `border-brand` / `hover:bg-brand-dark` | #e60012 / hover #b3000e。CTA・強調語1語・線・マーク。**広い面に塗らない** |
| 文字3階層 | `text-ink` / `text-body` / `text-muted` | #14140f 見出し / #2a2a28 本文 / #6b6b67 補助(AA) |
| 地・罫線 | `bg-paper` `bg-cream` / `border-line` `bg-line` | #fff / #faf9f7 交互背景 / #e7e5e0 1px罫線 |
| 書体 | `font-serif` `font-sans` `font-mono` | 明朝(既定) / サンセリフ / Archivo英字ラベル |
| 角丸 | `rounded-card` / `rounded-2xl` | UI部品=2px(硬質) / 写真=16px |
| 見出し肩 | `.kicker` | mono大文字＋先頭に赤24px線。導入ラベル |

原則：**影は使わない**（`shadow-*` 不使用、分離は「1px罫線＋広い余白」）。赤は数%まで。

## 真実のありか（要約より実ファイル）
- スタイル全体：`_ds/jqit-careers/styles.css`（→ tokens＋fonts＋ `_ds_bundle.css`：@themeトークン＋
  ユーティリティ＋ `.kicker`/`.fade-in`/`.geo-*` 等のカスタムCSS）。色名・トークンはここを grep するのが確実。
- 各コンポーネントの API は `<Name>.d.ts`、使い方は `<Name>.prompt.md`。

## 組み立て例
```tsx
// 見出し（赤強調語）＋本文＋CTA。罫線と余白で構造を作る（影は使わない）
<section className="bg-paper">
  <Container>
    <SectionHead
      kicker="OUR STRENGTH"
      title={<>進化する<span className="text-brand">SES</span>という、第三の選択肢。</>}
      lead="最前線の現場で技術を磨き、キャリアを自分で設計する。"
    />
    <div className="mt-10 border-t border-line pt-8">
      <Button href="#entry">カジュアル面談を申し込む</Button>
    </div>
  </Container>
</section>
```
