# design-sync NOTES — jqit-careers

## What this repo is (read first)
これは**公開コンポーネントライブラリではなく Next.js 16 アプリ**（採用LP）。標準コンバータの
パッケージ shape を「off-converter」で運用している。同期スコープは **`src/components/ui/` の
プリミティブのみ**（Button / Container / SectionHead / Kicker / FadeIn / CountUp / GeoBackdrop /
GeoMark の8つ）。sections/layout/forms は意図的に対象外（Next/コンテンツ強結合で汎用性が低い）。

## Re-sync 手順（順番厳守）
```sh
pnpm build                              # out/_next の CSS + フォントを再生成（必須）
node .design-sync/prep-css.mjs          # out/ から tokens.css / fonts-src.css を再生成
# 再コピー（古い .ds-sync は古いコンバータを動かす）
cp -r <skill>/package-*.mjs <skill>/resync.mjs <skill>/lib <skill>/storybook .ds-sync/
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle   # playwright必要(下記)
```
- `.ds-sync` のデプは別管理: `cd .ds-sync && npm i esbuild ts-morph @types/react playwright`。
- chromium は macOS の `~/Library/Caches/ms-playwright/`（`~/.cache` ではない）。`npx playwright install chromium`。
- chromium起動はサンドボックスでブロックされることがある → 検証コマンドはサンドボックス無効で実行。

## 設計上のキモ
- **self-repo なので `cfg.entry`（`.design-sync/ds-entry.mjs`）が必須**。これが無いと synth-mode が
  `node_modules/jqit-careers` を探して落ちる。ds-entry が package.json まで walk-up させる。
- **コンポーネント発見は `componentSrcMap` で8個を明示**（.d.ts が無いため）。新規 ui プリミティブを
  足したら ds-entry.mjs と componentSrcMap の両方に追記する。
- **`next/link` は `.design-sync/tsconfig.build.json` の paths で shim**（`.design-sync/shims/next-link.tsx`）へ。
  他の `next/*` を import する ui を足したら同様に shim を追加。
- **React は外部化**（`window.React`）。classic JSX変換で `React.createElement` が free変数になり、
  `_vendor/react.js` が立てる `window.React` に解決される（動作確認済み）。
- **フォント**: next/font の CJK 全サブセット（約254 woff2 / 約16MB）を out/ から取り込む。@font-face は
  実ファミリ名（"Noto Serif JP" 等）で、`@theme` の `--font-serif: var(--font-noto-serif), "Noto Serif JP", serif`
  フォールバック鎖が解決する → **変数の :root 昇格は不要**。
- **社外秘流出防止**: `guidelinesGlob: []` と `docsDir` をダミーにして `docs/`（社外秘=戦略/要件/QA）を
  一切取り込まない。**この2設定は絶対に外さないこと**。

## Known render warns（再同期時、ここに無い警告は「新規」）
- `[RENDER_THIN] GeoMark` — SVGでテキストが無いだけの誤検知。赤5図形は描画済み=benign。
- `tokens: N defined, M referenced (2 missing, below threshold)` — 閾値以下で非ブロッキング。

## Re-sync risks（次回が壊れないための見張り）
- **tokens.css / fonts-src.css は out/ 由来の生成物**（gitignore）。`pnpm build` → `prep-css.mjs` を
  踏まずにビルドすると古い/欠落CSSで同期され、フォントが落ちる。
- **CountUp のキャプチャPNGはアニメ途中値**（毎回違う数字）で非決定的。grade はソース(.tsx)追従なので
  再キャプチャでは無効化されない。実DSペインではライブ描画で最終値(115名/46.6%)に到達する。
- **プレビューの数値(115/46.6/全額)は例示**。実数の確定値ではない（design-system.md 付録参照）。
- **group は全て "general"**（`src/components/ui` が全部 generic dir 名のため）。表示上の分類だけの問題。
- prep-css.mjs は `--color-brand`/`e60012` を含む chunk を tokens として選ぶ。Tailwind出力の構成が
  変わって複数chunkに分かれたら選定ロジックを見直す。
