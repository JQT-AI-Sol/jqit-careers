# brand-line ホバーエフェクト統一適用 設計書

日付: 2026-07-08
対象ブランチ: feature/keikensha-recruit-phase0

## 目的

Corporateサイト（`/Users/takahiromiyamoto/DEV/01.Company/Corporate/`）で採用している
「赤い縦線＋背景色変化」のホバーエフェクト（brand-line パターン）を採用LPにも適用し、
両サイトのインタラクションデザインを統一する。

## Corporateサイトのパターン仕様（移植元: `app/globals.css:105-179`）

カード・行要素にカーソルを合わせたとき:

1. 左端に 2px の赤縦線（`--color-brand: #e60012`）が `scaleY(0) → scaleY(1)` で上から伸びる
   （`::before` 疑似要素、`transition: transform 0.32s cubic-bezier(0.16, 0.84, 0.44, 1)`）
2. 背景が `--color-cream: #faf9f7` に変化（`transition: background-color 0.28s ease`）
3. ラベル（`.brand-line-label`）が `translateX(3px)` で右へスライド
4. 番号・装飾数字（`.brand-line-no`）が `--color-brand-dark: #b3000e` に変色
5. `@media (hover: hover)` でタッチデバイスを除外
6. `prefers-reduced-motion: reduce` で全 transition を無効化

カラートークンは両サイトで完全一致しているため、変数の追加・変更は不要。

## 実装方式

Corporateと同じ「globals.cssに共通クラス定義 → 各コンポーネントにクラス付与」方式。

- `.brand-line-card` … カード型要素（縦線は要素の左端）
- `.brand-line-row` … リスト行型要素（縦線位置は `left` で調整可能）
- `.brand-line-label` … hover時に3pxスライドするテキスト
- `.brand-line-no` … hover時に変色する番号・装飾数字

採用LPのセクション構造に合わせ、縦線の `left` オフセットは実装時に各構造へ調整する。

## 適用対象（カード・リスト系すべて）

| コンポーネント | クラス | 備考 |
|---|---|---|
| `JobList`（求人リスト行） | `brand-line-row` + `brand-line-no` | 既存の `hover:bg-cream` / `md:hover:pl-5` は重複のため置き換え |
| `Weapons`（5つの武器） | `brand-line-row` + `brand-line-no` | 背景の装飾番号を変色対象に |
| `StrengthGrid`（強みグリッド） | `brand-line-card` | |
| `Faq` | `brand-line-row` | 質問行に適用 |
| `Members`（社員カード） | `brand-line-card` | 既存の画像ズーム（group-hover:scale）は維持 |
| `CareerPath` / `RecruitFlow` / `Messages` / `CultureBlock` 等 | 構造に応じて card/row | カード・行構造がある場合のみ |

### 変更しないもの

- `Button`（primary/outline/arrow）… 既にCorporateと同等のhoverあり
- `Header` ナビリンク … 既に `hover:text-brand` あり
- `EntryForm` のフォーム部品 … フォーカスリング等は現状維持

## 作業フロー

1. feature/keikensha-recruit-phase0 で実装・コミット（既存WIP変更とは分離してコミットする）
2. `pnpm build` + Playwright でhover表示を確認
3. ビルド成果物を main へ `deploy:` コミットして公開反映（従来の慣例に従う）

## 成功基準

- カード・リスト要素hover時に赤縦線・cream背景・ラベルスライドがCorporateと同じ質感で動作する
- タッチデバイス・reduced-motion環境で余計なエフェクトが出ない
- ビルドが通り、既存のレイアウト・リビールアニメーションに回帰がない
