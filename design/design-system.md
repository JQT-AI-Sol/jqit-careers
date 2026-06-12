# デザインシステム — JQIT 採用サイト

> **このドキュメントの位置づけ**
> 現在の実装（`src/`）から実値を抽出した「再現・横展開できる」リファレンス。
> 別案件のデザイナー/エンジニアが、このトークンとコンポーネントをコピーすれば同じ世界観を再現できることを目標にする。
> スタック: **Next.js 16.2.9 (App Router / Turbopack) + React 19 + Tailwind CSS v4 (`@theme`) + next/font**。
> 推測値は載せない。値はすべて実コード参照付き。

---

## 1. コンセプト

**明朝エディトリアル × 赤(#e60012) × モノクロ** の採用LP。

- **トーン&マナー（一言定義）**: 「白い余白の上で明朝が静かに語り、赤(#e60012)だけが精密に差し込む、雑誌のようなエンジニアリング・ブランディング」。
- 影付きカードを使わず、**1px罫線と広い余白で構造を作る**。ビズリーチ採用サイト級の清潔感・上質感が出発点。
- そこへ**構成主義的な幾何学装飾**（赤い円・四角・5種のマーク）と**横に流れるモーション**（写真/タイポ/パーティクル）を重ね、静と動のコントラストでエンジニアらしい先進性を足す。
- 配色比率の原則: **白〜オフ白 70%+ / 黒（文字）20% / 赤 数%**。赤を広い面に塗らない。

---

## 2. デザイントークン

実装は Tailwind v4 の `@theme`（`src/app/globals.css` L4-20）。`--color-*` を定義すると `bg-brand` `text-ink` `border-line` 等が自動生成される（v4 はこの仕組み。`tailwind.config` は無い）。

### 2.1 カラー（8値・実HEX）

| トークン | HEX | Tailwind utility | 用途 |
|---|---|---|---|
| `--color-brand` | `#e60012` | `bg-brand` / `text-brand` / `border-brand` | JQITレッド。CTA・強調語1語・アクセント線・幾何マーク |
| `--color-brand-dark` | `#b3000e` | `hover:bg-brand-dark` | 赤ボタンのホバー |
| `--color-ink` | `#14140f` | `text-ink` / `bg-ink` | 見出し・濃文字・フッター背景・画像背景（暖色寄りの黒） |
| `--color-body` | `#2a2a28` | `text-body` | 本文（`<body>` の既定色） |
| `--color-muted` | `#6b6b67` | `text-muted` | 補助テキスト・キャプション（**WCAG AA = 4.5:1 を満たす最暗グレー**） |
| `--color-line` | `#e7e5e0` | `border-line` / `bg-line` | 1px罫線・区切り・グリッドのギャップ地色 |
| `--color-paper` | `#ffffff` | `bg-paper` | 基本背景 |
| `--color-cream` | `#faf9f7` | `bg-cream` | セクション交互背景・ホバー地・淡色CTA背景 |

> フッター内だけは例外的に生HEXを使用（`text-[#b7b7b1]` 本文 / `border-[#2d2d28]` 罫線 / `text-[#76766f]` コピーライト）。ダーク地での明度調整用ローカル値で、トークン化はされていない。

### 2.2 フォント変数

`@theme`（L14-17）。実フォントは `layout.tsx` の next/font が `--font-noto-serif` 等を注入し、フォールバックチェーンで受ける。

| トークン | 解決先 | utility |
|---|---|---|
| `--font-serif` | `var(--font-noto-serif), "Noto Serif JP", serif` | `font-serif` |
| `--font-sans` | `var(--font-noto-sans), "Noto Sans JP", system-ui, sans-serif` | `font-sans` |
| `--font-mono` | `var(--font-archivo), "Archivo", sans-serif` | `font-mono` |
| `--font-display` | `var(--font-anton), "Archivo", system-ui, sans-serif` | `font-display` |

`<body>` の既定 font-family は **serif**（`globals.css` L34）。本文も明朝が基調で、サンセリフは明示指定（`font-sans`）した箇所のみ。

### 2.3 半径・不透明度・イージング

- **`--radius-card: 2px`**（`rounded-card`）。ほぼ直角＝硬質・上質。ボタン・入力・タグに使う。
  - ※画像/写真は別系統で `rounded-2xl`(16px) を使用（Hero・PhotoMarquee・Members・Culture）。意図的な二系統: UI部品=2px硬質 / 写真=16px柔らかめ。
- **不透明度の使い分け規則**（透過アルファ記法 `bg-brand/[0.08]` 等）:
  - 巨大背景番号タイポ: `text-ink/[0.05]`〜`/[0.06]`（極薄）→ ホバーで `text-brand/[0.10]`〜`/[0.13]`（赤くうっすら点灯）
  - Marquee の特大タイポ: `text-ink/[0.09]`（紙に溶ける薄さ）
  - GeoBackdrop の幾何図形: 赤 `bg-brand/[0.08]` / 黒 `bg-ink/[0.06]`〜`/[0.07]`
  - HeroParticles の線: ベース `rgba(20,20,15,α)`・赤 `rgba(230,0,18,α)`、α は距離で `0〜0.26`（粒子間）/ `0〜0.32`（カーソル）
- **共通イージング**: `cubic-bezier(0.16, 0.84, 0.44, 1)`（出だしが速く終わりが滑らかに減速する上品なease-out）。
  fade-in / reveal-mask / hero-* / モバイルメニュー で**全モーション共通**。短ホバーのみ `ease-out`(Tailwind既定 = `cubic-bezier(0,0,0.58,1)`)。

---

## 3. タイポグラフィ

### 3.1 フォント4種の役割

| 役割 | フォント | weight (next/font) | 使いどころ |
|---|---|---|---|
| **serif** | Noto Serif JP | 300/400/500/600/700 | 見出し・キーステートメント・社員名/コピー。基本は `font-medium`(500) |
| **sans** | Noto Sans JP | 400/500/700 | 本文・リード・補助テキスト・フォーム・ナビ |
| **mono** | Archivo | 500/600 | 英字ラベル・KICKER・カテゴリ・STEP番号・矢印リンク・ロゴ・コピーライト |
| **display** | Anton | 400 | 特大ディスプレイ専用＝Marquee の極薄特大タイポ / 巨大背景番号 |

next/font 設定（`layout.tsx` L8-38）: 全て `subsets:["latin"]`・`display:"swap"`。serif/sans/anton は `preload:false`（和文の巨大プリロードを避ける）。Archivo のみ preload 有効（英字ラベルは即時必要）。`<html>` に4変数 class を付与（L64）。

### 3.2 サイズ階層（実値）

| スタイル | サイズ(SP→PC) | 書体/太さ | 行間 | 字間 | 参照 |
|---|---|---|---|---|---|
| Hero見出し H1 | `38px → 62px` | serif 500 | 1.6→1.55 | .04em | `Hero.tsx` L21 |
| セクション見出し H2 | `27px → 38px` | serif 500 | 1.5 | .02em | `SectionHead.tsx` L30 |
| CTA見出し | `28px → 44px` | serif 500 | 1.6 | .03em | `CTA.tsx` L14 |
| 代表メッセージ H2 | `26px → 36px` | serif 500 | 1.55 | .02em | `Messages.tsx` L41 |
| 職種名 H3 | `24px → 28px` | serif 500 | — | .02em | `JobList.tsx` L30 |
| 強み/魅力 H3 | `22〜23px` | serif 500 | 1.6 | — | `StrengthGrid/Appeal` |
| リード文 | `15〜17px` | sans 400 | 2.0〜2.1 | 0 | `SectionHead.tsx` L34 |
| カード本文 | `13.5px` | sans 400・**色=muted** | 1.95 | 0 | 各カード |
| KICKER | `11px` | mono 600 | — | .24em | `.kicker`（uppercase・先頭に赤24px線） |
| 英字role/category | `10〜12px` | mono | — | .12〜.16em | uppercase |
| Stat数値 | `44px → 54px` | serif 400 | 1.0 | — | `CultureBlock.tsx` L16（単位は赤 `text-2xl`） |
| Marquee特大 | `44px → 116px` | display(Anton) | none | .05em | `Marquee.tsx` L53 |
| 巨大背景番号 | `46〜70px → 72〜100px` | display(Anton) | none | — | 各カード（極薄） |

SP/PC は Tailwind の `md:`（≥768px）で切替。和文巨大表示は **必ず `text-[..] md:text-[..]` の二段指定**（モバイル巨大化防止 → §9 落とし穴③）。

> **本文色の注意**: §4 の原則は「本文=body」だが、**カード本文（StrengthGrid / Appeal / Members / JobList summary）は実装では `text-muted`(#6b6b67)**。本文より一段薄い補助色で組まれており、原則と実装に乖離がある。横展開時はどちらに寄せるか先に決める。`text-body`(#2a2a28) を使うのは Hero/CTA リードや代表メッセージ本文など「読ませる」段落。

---

## 4. カラー運用

- **赤はアクセント（差し色）専用**: CTAボタン、Hero/CTA見出しの強調語**1語**、KICKERの24px線、幾何マーク（GeoMark）、矢印リンクのホバー色、フォーム必須`*`・エラー・フォーカス枠。**広い面に赤を塗らない**。
- **文字は3階層**: 見出し=`ink`(#14140f) / 本文=`body`(#2a2a28) / 補助=`muted`(#6b6b67)。
- **コントラスト確保の経緯**: 旧 `muted` は `#8a8a85` だったが白地で 4.5:1 を割る。現行 **`#6b6b67`** に暗くして **WCAG AA(4.5:1)** をクリア（§9 落とし穴⑤・A11y要件 F-017）。新規で補助テキスト色を足す際もこの値を下限に。
- **選択/フォーカス**: `::selection` は赤地に白（`globals.css` L40）。`:focus-visible` は `outline:2px solid brand; offset:2px`（L44）。
- **画像の扱い**: 当初は写真も grayscale で「モノクロ＋赤」だったが、実社員写真の反映時に **PhotoMarquee/Hero/Culture はフルカラーへ方針転換**（grayscale除去）。Members（社員の声）だけは AI生成のモノクロ後ろ姿のまま `grayscale` クラスが残る（§末尾「差し替え待ち」参照）。

---

## 5. レイアウト・余白

- **コンテナ**: `Container`（`mx-auto w-full max-w-[1160px] px-5 md:px-8`）= 最大1160px / 左右ガター SP 20px・PC 32px。Header/Footer も同じ max-w・padding を内製で踏襲。
- **セクション縦余白の定番**: `py-20 md:py-[140px]`（80px → 140px）。CTAのみ `py-[100px] md:py-[150px]`。代表メッセージ系は `md:py-[120px]`。
- **セクション見出しブロック下の余白**: `mb-12 md:mb-[72px]`（`SectionHead`）。見出しブロックの max幅は `720px`、リードは `max-w` で読みやすく折り返す。
- **グリッド構成**:
  - 強み = `grid-cols-2 md:grid-cols-4`（上下に罫線、列は余白で分離・縦罫なし）
  - 魅力 = `grid-cols-1 md:grid-cols-3 gap-10 md:gap-14`
  - 社員の声 = `grid-cols-1 md:grid-cols-3 gap-9`
  - 職種 = リスト行（`grid-cols-[1fr_auto]`、行間を罫線で区切る）
  - 数字+写真 = `grid-cols-[1.05fr_0.95fr]`
  - リーダー/フロー/キャリア = `grid gap-px ... border bg-line`（**1pxギャップを `bg-line` で見せる罫線グリッド**＝箱を囲わず線で割る定番テク）
- **原則**: 影は使わない（`shadow-*` 不使用）。分離は「罫線 + 余白」。広い余白そのものが上質感。

---

## 6. モーション/演出カタログ（21技法 / A〜E）

各技法に【実装】【主要値】【reduced-motion】を付す。共通イージングは `cubic-bezier(0.16,0.84,0.44,1)`。

> **「21技法」の数え方**: ⑯-⑳は §3/§4/§5 で詳述した**基盤の再掲**（独立した実装技法ではなく世界観の構成要素）、㉑は細部4種を1枠に集約したもの。厳密に「個別実装された技法」として数えると**実質18前後**。番号は通し参照用の便宜的なもの。なお ⑤に挙げる `reveal-mask` は**CSSのみ存在し未配線（dead CSS）**＝現状は技法として稼働していない（下記⑤参照）。**㉒㉓は Vision セクション追加で増えた実装技法**（墨グラデ文字／縦書き明朝＝旧「未使用候補」が実装に昇格）。

### A. 横に流れる

**①PhotoMarquee — 写真の不揃い横流れ + 端マスクフェード**
- 【実装】`sections/PhotoMarquee.tsx` + `.marquee-track`(`globals.css` L172)
- 【主要値】5種の不揃いshape（縦長/横長・縦オフセット）を巡回。`durationSec` 既定62（home右流れは66）。端は `[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]`。写真は `rounded-2xl`。
- 【reduced-motion】`.marquee-track { animation:none }`（L180）→ 停止して静止表示。
- 【要注意】`<Image unoptimized>` 必須（§9 落とし穴①）。

**②Marquee — 極薄Anton特大タイポ + 赤い幾何マーク5種が横流れ**
- 【実装】`sections/Marquee.tsx`
- 【主要値】`font-display text-[44px] md:text-[116px] text-ink/[0.09] uppercase`。語間に `Mark`(赤・strokeWidth1.3)。`durationSec` 既定48。`direction`で左右。端マスク `black_10%..black_90%`。トラックは `group` を2連結して無限ループ。
- 【reduced-motion】同上 `animation:none`。

**③HeroParticles — 点+線のコンステレーション（カーソル反応・FV背景全体）**
- 【実装】`sections/HeroParticles.tsx`（canvas, 依存なし）。Hero の `-z-10` 背景に敷く。
- 【主要値】粒子数 = `clamp(28, area/15000, 72)`。速度 `±0.22`。粒子間リンク距離 `LINK=132`、カーソルリンク `MOUSE_LINK=168`。色 = 黒 `rgba(20,20,15,*)` / 9個に1個 赤 `rgba(230,0,18,*)`。DPR上限2。`ResizeObserver`で追従。
- 【reduced-motion】粒子を動かさず1フレームだけ描画（静止コンステレーション）。

### B. 登場 / スクロールイン

**④hero-rise / hero-mask / hero-zoom（ロード時自動再生）— ※ここの "mask" は実使用される `hero-mask`**
- 【実装】`globals.css` L100-144、`Hero.tsx`（L22/L26 で `hero-mask` を**実使用**）で `style={{animationDelay}}` を要素ごとにずらす。
- 【主要値】`heroRise`=opacity0+Y26px→0 / 0.9s。`heroMask`=行を `translateY(110%)→0`（マスクからせり上げ）/ 1s、親に `overflow:hidden`。`heroZoom`=画像 `scale(1.08)→1` + フェード / 1.4s。delay: kicker0.05s→見出し0.18/0.32s→画像0.4s→リード0.55s→CTA0.68s→Scroll0.9s の階段。
- 【reduced-motion】`@media (reduce)` で `.hero-mask>span{transform:none}`（マスクで文字が隠れたまま固定するのを防ぐ・L150）。`hero-rise/zoom` はアニメ定義自体が `no-preference` ブロック内なので reduce では無効＝即表示。
- ⚠️ **`hero-mask`（実使用・本項）と `reveal-mask`（未配線・下記⑤）は別物**。CSS名が似ているが混同しないこと。

**⑤fade-in（スクロールイン）— ※`reveal-mask` は未配線(dead CSS)**
- 【実装】`.fade-in`(`globals.css` L73-83) + JS `ui/FadeIn.tsx`（IntersectionObserver）。**`FadeIn` が出力するのは `fade-in` クラスのみ**で、見出し（`SectionHead` の H2 含む）も例外なく `fade-in` で登場する。
- 【主要値】fade-in = opacity0+Y20px→0 / 0.8s。IO: `threshold 0.01` + `rootMargin "0px 0px 15% 0px"`（入る手前で発火）。**1.2sフォールバック**で未発火でも強制表示（空白事故防止）。`transitionDelay` をindexで段階付け（カード `i*80〜120ms`）。
- 【reduced-motion】`FadeIn` は JS で `matchMedia('reduce')` を検知し即 `is-visible`。
- 🟥 **`reveal-mask`（行を下からせり上げる見出しマスク）は `globals.css` L86-98 に定義はあるが、どのコンポーネントからも参照されていない死にCSS**。`FadeIn` は付与しない。使うなら対象要素に手動で `reveal-mask`＋内側`<span>`を付与し、`is-visible` をトグルするJS（`FadeIn` 相当）を別途配線する必要がある。現状は §10「未使用だが相性が良い」に近い扱い。

### C. ホバー

**⑥ボタンの矢印スライド** — `Button.tsx`: `ArrowIcon` が `group-hover:translate-x-1.5`(0.3s ease-out)。primary/outlineは `active:translate-y-px` で押下感。
**⑦JobListホバー** — 行に `hover:bg-cream` + `md:hover:pl-5`（左inset）+ 右矢印 `group-hover:translate-x-1.5 group-hover:text-brand`。背景の巨大番号も `group-hover:text-brand/10`。
**⑧Members写真 scaleズーム** — `group-hover:scale-[1.04]`(0.5s)。見出しは `group-hover:text-brand`、Read More は `group-hover:gap-2.5`。
**⑨巨大番号がホバーで赤く点灯** — 各カードの背景Anton番号 `text-ink/[0.05〜0.06] → group-hover:text-brand/[0.10〜0.13]`（0.5s `transition-colors`）。
**⑩arrow下線ボタン（gap拡大）** — `Button` variant=`arrow`: mono英字 + `border-b`、`hover:text-brand hover:border-brand hover:gap-4`（下線が赤に・矢印が離れる）。

### D. グラフィック装飾

**⑪GeoBackdrop（構成主義の隅装飾）** — `ui/GeoBackdrop.tsx`: 各セクション四隅に `absolute` で赤/黒の円・四角を極薄配置（`bg-brand/[0.08]` `bg-ink/[0.06〜0.07]`）。`flip` で左右反転（隣接セクションで向きを変える）。**div実装必須**（§9 落とし穴②）。
**⑫GeoMark（赤い幾何マーク5種）** — `ui/GeoMark.tsx`: 十字/菱形/円/六条星/三角を `index%5` で巡回。`stroke=currentColor strokeWidth1.4`、`text-brand` で赤。StrengthGrid/Appeal/JobListの見出し肩に置く。Marquee内の `Mark` と同じ図形言語。
**⑬極薄の巨大番号タイポ（Anton）** — 各カードに `font-display` の `01..` を背景として絶対配置（D⑨と同要素）。構造を数字で示す。
**⑭kicker（赤い極細線 + 英大文字）** — `.kicker`(`globals.css` L51): mono600/11px/.24em/uppercase/muted、`::before` に `width24px height1px bg-brand` の赤線、線とテキストの間隔は `gap:10px`。全セクション見出しの導入。
**⑮端のマスクフェード** — `mask-image:linear-gradient(...)` で Marquee/PhotoMarquee の左右端を紙に溶かす（流れの始端終端を隠す）。
**㉒墨グラデ文字（赤→黒）** ※Vision追加 — `Vision.tsx`: `bg-gradient-to-b from-brand via-ink to-ink` + `bg-clip-text text-transparent`（=`background-clip:text` + `linear-gradient(brand→ink)`）。明朝の特大見出しに墨のような赤→黒のグラデを乗せる。透明文字なので**フォールバック色を持たない**点に注意（グラデが効かない環境では消える）。
**㉓縦書き明朝** ※Vision追加 — `Vision.tsx`: `[writing-mode:vertical-rl] font-serif font-bold`（`text-[64px] md:text-[112px]`、`items-start`で1列固定）。和の縦組みで雑誌的な「見せ場」を作る。横書きタグラインと直交させてリズムを出す。横書きタグライン+斜め赤線+英字ラベルと組み合わせて1セクションを構成。

### E. 基盤（世界観そのもの）

**⑯明朝エディトリアル + フォント4種**（§3）/ **⑰赤×モノクロ**（§4）/ **⑱角丸ほぼ無し(2px)**（UI部品。写真のみ16px）/ **⑲広い余白**（§5）/ **⑳人物写真フルカラー + sticky blurヘッダー**（Header §7）/ **㉑細部** — Hero "Scroll" の `animate-pulse` 縦線、Hero画像左下の赤縦バー `w-1.5 h-[120px] bg-brand`、Members写真左下の赤ライン、FAQ開時の左 `border-l-2 border-brand`。

---

## 7. コンポーネントカタログ

### UI primitives（`src/components/ui/`）

| コンポーネント | 役割 | 主要prop | 実装値 / メモ |
|---|---|---|---|
| **Button** | CTA/リンク | `href, variant("primary"\|"outline"\|"arrow"), className` | base=`font-sans font-bold text-sm tracking-.02em duration-300`。primary=`bg-brand text-white px-10 py-[18px] rounded-card hover:bg-brand-dark`。outline=`border border-ink hover:bg-ink hover:text-white`。arrow=`font-mono text-[13px] .12em border-b hover:text-brand hover:gap-4`（矢印アイコン無し）。`http`始まりは`<a target=_blank>`、内部は`<Link>`。 |
| **Container** | 中央寄せ枠 | `className` | `max-w-[1160px] px-5 md:px-8` |
| **SectionHead / Kicker** | 見出しブロック | `kicker, title, lead, center` | `FadeIn`内包＝H2も `fade-in` で登場（`reveal-mask` ではない／§6⑤）。`mb-12 md:mb-[72px] max-w-[720px]`。H2=serif 27/38px。`center`で中央寄せ。 |
| **FadeIn** | スクロールイン汎用ラッパ | `as, className, style, ...rest` | IO + reduce検知 + 1.2sフォールバック。`style={{transitionDelay}}`でstagger。 |
| **CountUp** | 数値カウントアップ | `value:string` | 1200ms / `easeOutCubic`。IO発火・1回のみ。**数値文字列のみ**アニメ（"全額"等はそのまま）。SSRは最終値を出しチラつき防止。reduceは即最終値。**現状 CultureBlock のみで使用**。 |
| **GeoBackdrop** | 隅の構成主義装飾 | `flip, className` | div5枚を四隅にabsolute。`pointer-events-none`。 |
| **GeoMark** | 赤い幾何マーク | `index, size, className` | 5図形を`index%5`巡回。`text-brand`指定で赤。 |

### Sections（`src/components/sections/`）

| コンポーネント | 役割 | 使用箇所 | メモ |
|---|---|---|---|
| **Hero** | FV | `/`(home) | HeroParticles背景 + hero-rise/mask/zoom + 画像(`people/r5.jpg`)。画像は**フルカラー素材だが視認性のため全面 `bg-ink/20` オーバーレイ＋下部 `bg-gradient-to-t from-black/55` を重ねる**（白テキスト/赤縦バー/Scroll表示を乗せるため）。赤縦バー=`w-1.5 h-[120px] bg-brand`。 |
| **HeroParticles** | FV背景canvas | Hero | §6③ |
| **Marquee** | 英字+幾何の横流れ帯 | home | `words[]`を渡す。`Customer First / Challenge ...` |
| **Vision** | 理念/ビジョンの見せ場 | home（**Marquee直後・`#about`(OUR STRENGTH)直前**） | `bg-paper py-24 md:py-40`、背景に **HeroParticles を流用**(`-z-10`)。縦書き明朝の大見出し「挑戦と革新」=`[writing-mode:vertical-rl] font-serif font-bold text-[64px] md:text-[112px] tracking-[0.04em]`、`items-start`で1列固定。**墨グラデ**=`bg-gradient-to-b from-brand via-ink to-ink bg-clip-text text-transparent`(上=赤#e60012→下=黒#14140f)。斜め赤線=`rotate-[24deg]` の `w-px` グラデ縦線(`from-brand/0 via-brand/45 to-brand/0`)。横書きタグライン「で顧客の**未来**を切り開く。」(未来=`text-brand`、`max-w-[252px] md:max-w-[560px]`でwidow/重なり回避)。英字ラベル `CHALLENGE & INNOVATION / OPEN THE FUTURE FOR OUR CLIENTS`(mono10px/.22em)+`h-px w-9 bg-brand`赤線。ui-reviewer計測(375/1280)PASS=横スクロール無し・重なり19pxクリアランス。**Hero(集合写真)とは別軸の世界観の見せ場**。 |
| **PhotoMarquee** | 写真横流れ | home(×2), culture系 | `images[] direction durationSec`。`unoptimized`必須。 |
| **StrengthGrid** | 4専門領域 | home `#about` | `lib/content.ts strengths`。背景Anton番号 + GeoMark + serif H3。 |
| **Appeal** | 働く3つの理由 | home | `appeals`。3カラム・背景番号・GeoMark。 |
| **JobList** | 職種リスト行 | home `#jobs`, /jobs | `jobs.json`。category(赤mono)+GeoMark+serif職種名+未経験OK/経験者歓迎タグ(`before:content-['—'] before:text-brand`)。ホバー§6⑦。 |
| **Members** | 社員の声カード | home, /interviews | `interviews.json`。`aspect-[4/3] rounded-2xl bg-ink` 写真(grayscale)+ `"`引用符 + 名前/dept。ホバーscale。**写真は `interviews` の並びをそのまま使わず、ローカル配列 `memberImages`(m1,m3,m5,m2,m4,m6 の意図的シャッフル順)を `i % 6` で割り当てる**（同種カードの単調化回避の小技。本文と写真の対応は意味を持たせていない）。 |
| **CultureBlock** | 数字 + 写真モザイク | /culture | `stats.json` + CountUp。右に2:1の写真グリッド(`rounded-2xl`)。 |
| **CTA** | 最終導線 | home末尾, 各所 | `bg-cream py-[100px] md:py-[150px] text-center` + GeoBackdrop + 強調語赤 + primaryボタン。 |
| **Messages** | 代表/リーダーメッセージ | /about系 | `messages.json`。代表写真は**プレースホルダ**（"※写真は後日掲載予定"）。リーダーは`gap-px bg-line`罫線グリッド。 |
| **CareerPath** | 成長ステップ+越境 | /culture系 | `career.json`。4ステップに赤い→/↓矢印。`rounded-card border`のfrom→toタグ。 |
| **RecruitFlow** | 選考フロー4段 | /recruit系 | `recruit-flow.json`。`gap-px bg-line` グリッド。 |
| **Faq** | アコーディオン | /recruit系 | `faq.json`。`+/−`(赤mono)、開時 `border-l-2 border-brand pl-5`。`useState`で単一open。 |

### Layout（`src/components/layout/`）

| コンポーネント | 実装値 |
|---|---|
| **Header** | `sticky top-0 z-50 border-b border-line`。背景に別レイヤ `absolute -z-10 bg-paper/85 backdrop-blur-md`（半透明blur）。高さ`78px`。PCナビ=sans13.5px・`hover:text-brand` + 赤「エントリー」`rounded-card bg-brand`。SPはハンバーガー(`h-11 w-11`=44px tap)→ `fixed inset-x-0 top-[78px] bottom-0 bg-paper`の全面オーバーレイ（明朝リンク、共通イージングで250ms）。 |
| **Footer** | `bg-ink pt-20 pb-9`。ローカル色 `#b7b7b1`(本文)/`#2d2d28`(罫線)/`#76766f`(コピー)。Logo(light) + 明朝タグライン + mono英字見出し(Recruit/Company/Contact等) + `© 2026 JQIT INC.`。 |
| **Logo** | mono21px/600/.06em + 先頭に `h-2.5 w-2.5 rounded-full bg-brand`（赤dot） + "JQIT"。`light`で白文字。 |

### Forms（`src/components/forms/EntryForm.tsx`）

**見た目**
- 入力: `inputCls = w-full rounded-card border border-line bg-paper px-4 py-3 text-[15px] outline-none focus:border-brand`（フォーカスで赤枠）。
- ラベル上配置、必須 `*` = `text-brand`。エラー = `text-[12px] text-brand`。
- 送信ボタン = `rounded-card bg-brand ... hover:bg-brand-dark disabled:opacity-60`。

**挙動層（引き継ぎ先が必ず踏むので明記）**
- バリデーション = **zod**(`lib/entry-schema.ts`) を **react-hook-form** + `@hookform/resolvers` で接続。
- スパム対策 = **Turnstile**（トークンを `turnstileToken` で送出） + **honeypot**（`company` フィールドを `absolute left-[-9999px] h-0 w-0 opacity-0` で視覚的に隠し、入力があれば bot と判定）。
- 送信先 = `POST /api/entry`（`multipart/form-data`、履歴書ファイル添付可）。成功で `/entry/thanks` へ遷移。
- ⚠️ **静的書き出し時の分岐**: `process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"`（GitHub Pages 等の静的デプロイ）の場合、**API を一切叩かず即 `/entry/thanks` へ遷移する**（`EntryForm.tsx` L63-66）。つまり**静的デプロイでは「実際には送信されていないのに成功画面が出る」**。本番（Vercel・APIあり）と静的プレビューで挙動が変わる点を引き継ぎ先に必ず伝えること。

---

## 8. インタラクションパターン（まとめ）

| パターン | トリガー | 実装 |
|---|---|---|
| 矢印スライド | ボタンホバー | `group-hover:translate-x-1.5`（icon）/ arrow variantは`hover:gap-4` |
| cream背景 + 左inset | JobList行ホバー | `hover:bg-cream md:hover:pl-5` |
| scaleズーム | 写真ホバー | `group-hover:scale-[1.04]`(0.5s) |
| 番号が赤く点灯 | カードホバー | 背景Anton番号 `→ group-hover:text-brand/[.10〜.13]` |
| 下線が赤に | arrowリンク/Members | `hover:text-brand hover:border-brand` |
| fade-in | スクロールイン（**見出しも本文も全て**） | `FadeIn` + `.fade-in.is-visible`（0.8s・stagger） |
| hero-mask | Hero見出しの行せり上げ（ロード時のみ） | `.hero-mask>span`（1s／§6④。スクロールインの `reveal-mask` とは別物・後者は未使用） |
| カウントアップ | 数値が画面進入 | `CountUp`(1.2s ease-out, 1回) |

すべて `prefers-reduced-motion: reduce` で無効化/即時表示に落ちる（CSS側 `@media` + JS側 `matchMedia`）。

---

## 9. レスポンシブ規則 + 既知の落とし穴

**規則**
- ブレークポイントは Tailwind 既定 `md:`(≥768px) を主軸。SP→PCの二段で値を切替。
- 巨大表示は必ず `text-[..] md:text-[..]`。
- タップ領域 **44px** 確保（ハンバーガー`h-11 w-11`、矢印/ロゴ）。
- 補助テキストは `muted=#6b6b67`(WCAG AA 4.5:1)以上。

**落とし穴（別案件で踏まないために）**
1. **`PhotoMarquee` の `<Image>` は `unoptimized` 必須**。付けないと dev の画像最適化が `w=3840` を要求し、マーキー transform 中の画像が `complete:false` のままグレーボックス化する。静的サイトなので元画像を直配信してOK（`PhotoMarquee.tsx` L50）。
2. **`GeoBackdrop` は div ベースで実装**（各セクション隅に absolute）。SVGの `preserveAspectRatio="...slice"` はモバイル縦長セクションで図形が画面外へ逃げて消えるため不可。
3. **巨大番号・Marquee は `text-[..] md:text-[..]` でレスポンシブサイズ必須**（モバイルで巨大化して崩れるのを防ぐ）。
4. **`Archivo Expanded` はこの Next.js(16.2.9 turbopack) のフォント在庫に無く500エラー**。Anton / Bebas Neue / Syne 等は使用可（display用に Anton を採用済み）。
5. **`muted` は `#6b6b67`**。旧 `#8a8a85` は白地で 4.5:1 を割るため不可。
6. **モバイル幅検証はサブエージェント `ui-reviewer`（Playwright `browser_resize` 375px）で行う**。Claude本体の Chrome MCP `resize_window` はウィンドウ最小幅でモバイル幅まで縮められない。

---

## 10. 過不足の棚卸し

**使用中**: §6 の①〜㉓のうち、**`reveal-mask`（⑤の片割れ）を除くすべてが実装済み**。`reveal-mask` はCSS定義のみで未配線（dead CSS／§6⑤）＝**全技法が実装済みではない**。また ⑯-⑳は基盤の再掲・㉑は細部集約のため、独立実装技法としての実数は20前後（Vision追加の㉒墨グラデ文字・㉓縦書き明朝を含む／§6冒頭の注記参照）。

**旧「未使用候補」から実装に昇格**
- **縦書き明朝（`writing-mode: vertical-rl`）** — **Vision セクション（§7）で実装済み**。墨グラデ文字（赤→黒）と組み合わせ、Hero(集合写真)とは別軸の世界観の見せ場として配置（§6㉒㉓）。

**未使用だが相性が良い（今後の拡張候補）**
- **reveal-mask（見出しの行せり上げスクロールイン）** — CSSは `globals.css` L86-98 に**既にある**が未配線。見出しに手動付与＋`is-visible`トグルJSを足せばすぐ使える「実装済みの未使用資産」。`fade-in` より演出性が高い。
- **数字カウントアップをトップに** — `CountUp` は既存だが現状 CultureBlock のみ。Hero直下やStrength帯に「115名 / 46.6%」等を出すと先進性が増す。
- **ダークセクション反転** — `bg-ink` は画像背景/Footerのみ。セクション全体を黒地反転（白明朝）するリズムは未使用。
- **フィルムグレイン質感** — 写真/背景に微ノイズを乗せると質感が上がる。
- **スクロール連動の文字ハイライト** — リード文を語単位で `ink→muted` から点灯させる演出。
- **スティッキー・スクロールテリング** — 左固定見出し+右スクロール本文（カルチャー/事業紹介向き）。

**改善余地（軽微な技術的負債）**
- 角丸の二系統（UI=2px / 写真=16px）が混在。意図的だが、ドキュメント化しておかないと横展開時に揺れる。
- Footerのダーク色がトークン外（生HEX 3色）。`--color-ink-soft` 等として `@theme` に吸い上げると再利用しやすい。
- `CountUp` の活用箇所が少ない（上記）。
- **`PhotoMarquee.tsx` 冒頭コメントに旧方針「モノクロ統一」が残存**（実装は grayscale を除去済み＝フルカラー）。コメントが実装と矛盾。フルカラー転換時にコメント更新が漏れた跡なので、横展開でコピーする前に直すこと。
- カード本文が `text-muted`（§3.2/§4 の本文色原則と乖離）。意図的だが原則化されていない。

---

## 11. 別案件への引き継ぎガイド

**依存（最小セット）**
- Tailwind CSS v4（`@import "tailwindcss"` + `@theme`）。`tailwind.config` は不要、`globals.css` だけでトークン定義が完結。
- `next/font`（Noto Serif JP / Noto Sans JP / Archivo / Anton）。`@theme` の `--font-*` と `layout.tsx` の `variable` 名を一致させる。
- `lib/cn.ts`（依存ゼロの className 結合）。`lib/asset.ts`（静的書き出し時の basePath 付与）。

**再利用手順**
1. `src/app/globals.css`（L1-184）をコピー。色（8値）とフォント変数名を案件に合わせて差し替え（ブランド赤を変えるなら `--color-brand` `--color-brand-dark` の2値だけでOK）。
2. `layout.tsx` の next/font ブロックをコピー。フォントを変える場合は §9④（Expanded系はturbopack在庫無し）に注意。
3. `ui/`（Button, Container, SectionHead, FadeIn, CountUp, GeoBackdrop, GeoMark）をそのまま移植。これだけで「kicker付き見出し + スクロールイン + 幾何装飾 + 2px硬質ボタン」が揃う。
4. モーション3種（marquee / hero-* / fade系）は CSS が `globals.css` に閉じているので、対応する section/JS を一緒に運べば動く。

**注意点**
- `<body>` の既定 font-family が **serif**。サンセリフを基調にする案件では `globals.css` L34 を `--font-sans` に変える。
- reduced-motion 対応は CSS と JS の**両方**に入っている。片方だけ移植しない。
- 写真は `rounded-2xl`(16px)、UI部品は `rounded-card`(2px) の二系統。混ぜない。
- PhotoMarquee を使うなら `unoptimized` を必ず維持（§9①）。

---

## 付録: 未確定 / 差し替え待ち（コンテンツ棚卸し）

- `content/messages.json`: 代表取締役名 `代表取締役 ●●（※仮）` — 正式名へ差し替え待ち。
- `content/messages.json`: 代表メッセージ本文3段すべて `（※仮・要差し替え）` — 正式文面待ち。
- `content/messages.json`: 部門リーダー4名（開発/インフラ/QA/AI）の所属・役職・コメントすべて `（※仮）` — 正式内容待ち。
- `Messages.tsx`: 代表写真が `※写真は後日掲載予定` のプレースホルダ枠 — 実写真待ち。
- `Members`（社員の声）: 写真が AI生成のモノクロ後ろ姿（`grayscale`）— 実社員写真（フルカラー）へ差し替え待ち。
- `content/stats.json`: 数値（エンジニア115名 / 平均29.8歳 / QA比率46.6% / 受験費用全額）— 最新値の確定待ち。年収等の待遇コンテンツは未掲載。
- `content/jobs.json` ほか職種詳細・資格手当金額（`qualifications` は「金額は資格により異なる」止まり）— 確定値待ち。
