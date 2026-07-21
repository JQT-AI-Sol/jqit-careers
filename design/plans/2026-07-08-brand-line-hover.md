# brand-line ホバーエフェクト統一適用 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corporateサイトの brand-line ホバーパターン（赤縦線＋cream背景＋ラベルスライド）を採用LPの全カード・リスト要素に統一適用する。

**Architecture:** globals.css に共通クラス（.brand-line-card / .brand-line-row / .brand-line-label / .brand-line-no）を定義し、各コンポーネントにクラスを付与する。FadeIn（.fade-in）と同一要素になる場合の transition 競合は、合成 transition ルールで解決する。

**Tech Stack:** Next.js (static export) / Tailwind CSS v4 / worktree: `/Users/takahiromiyamoto/DEV/01.Company/recruitment_lp_next`（feature/keikensha-recruit-phase0）

## Global Constraints

- カラートークンは既存の `--color-brand: #e60012` / `--color-brand-dark: #b3000e` / `--color-cream: #faf9f7` を使用（新規追加禁止）
- `@media (hover: hover)` でタッチデバイス除外、`prefers-reduced-motion: reduce` で transition 無効化（Corporate と同一）
- worktree の WIP 変更（content/jobs.json、営業職追加、リーダー写真等）を自分のコミットに混ぜないこと。Messages.tsx のみ WIP と同居するため -U1 パッチで自分の hunk だけを index に載せる
- 対象外: Frontier（ダーク背景で cream が合わない）、jobs/page.tsx の求人詳細 article（非インタラクティブな長文記事＋WIPファイル）、CultureBlock（カード構造なし）、Button / Header（既に Corporate 同等の hover あり）

---

### Task 1: globals.css に brand-line パターンを追加

**Files:**
- Modify: `src/app/globals.css`（末尾、geo-spin ブロックの後に追記）

**Interfaces:**
- Produces: `.brand-line-card`（カード型）/ `.brand-line-row`（行型）/ `.brand-line-label`（hover時3pxスライド）/ `.brand-line-no`（hover時 brand-dark 変色）

- [ ] **Step 1: 末尾に以下を追記**

```css
/* ===== brand-line: hover時に赤の縦線＋cream背景（Corporateサイト共通パターン） ===== */
.brand-line-card,
.brand-line-row {
  position: relative;
  overflow: hidden;
  transition:
    background-color 0.28s ease,
    color 0.28s ease;
}

.brand-line-card::before,
.brand-line-row::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 2px;
  background: var(--color-brand);
  transform: scaleY(0);
  transform-origin: 50% 0;
  transition: transform 0.32s cubic-bezier(0.16, 0.84, 0.44, 1);
  z-index: 1; /* Members等の画像フルブリードカードでも線が画像の上に出るように */
}

.brand-line-label {
  transition:
    color 0.28s ease,
    transform 0.32s cubic-bezier(0.16, 0.84, 0.44, 1);
}

.brand-line-no {
  transition: color 0.28s ease;
}

/* FadeIn(.fade-in)と同一要素に付く場合、リビールのtransitionを潰さず合成する */
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .fade-in.brand-line-card,
  .fade-in.brand-line-row {
    transition:
      opacity 0.8s cubic-bezier(0.16, 0.84, 0.44, 1),
      transform 0.8s cubic-bezier(0.16, 0.84, 0.44, 1),
      background-color 0.28s ease,
      color 0.28s ease;
  }
}

@media (hover: hover) {
  .brand-line-card:hover,
  .brand-line-row:hover {
    background: var(--color-cream);
  }

  .brand-line-card:hover::before,
  .brand-line-row:hover::before {
    transform: scaleY(1);
  }

  .brand-line-card:hover .brand-line-label,
  .brand-line-row:hover .brand-line-label {
    transform: translateX(3px);
  }

  .brand-line-card:hover .brand-line-no,
  .brand-line-row:hover .brand-line-no {
    color: var(--color-brand-dark);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-line-card,
  .brand-line-row,
  .brand-line-card::before,
  .brand-line-row::before,
  .brand-line-label,
  .brand-line-no {
    transition: none;
  }

  .brand-line-card:hover .brand-line-label,
  .brand-line-row:hover .brand-line-label {
    transform: none;
  }
}
```

- [ ] **Step 2: コミット**

```bash
git add src/app/globals.css
git commit -m "feat(hover): brand-lineホバーパターンをCorporateから移植"
```

### Task 2: トップ核セクション4つに適用（JobList / Weapons / StrengthGrid / Faq）

**Files:**
- Modify: `src/components/sections/JobList.tsx:16`（Link className）、`:25`（左コンテンツdiv）
- Modify: `src/components/sections/Weapons.tsx:21`（FadeIn as="li" className）、`:32`（左div）
- Modify: `src/components/sections/StrengthGrid.tsx:11`（FadeIn className）、`:23`（h3）
- Modify: `src/components/sections/Faq.tsx:14`（行div）、`:24`（質問span）

**Interfaces:**
- Consumes: Task 1 の `.brand-line-*` クラス

- [ ] **Step 1: JobList** — Link の `transition-all hover:bg-cream` と `md:hover:pl-5` を削除し `brand-line-row` を追加。左コンテンツ `<div className="relative">` → `<div className="brand-line-label relative">`

```tsx
className="group brand-line-row relative grid grid-cols-1 items-start gap-2 overflow-hidden border-b border-line py-9 md:grid-cols-[1fr_auto] md:items-center md:gap-8"
```

- [ ] **Step 2: Weapons** — FadeIn の className に `brand-line-row` を追加。左カラム `<div className="relative">` → `<div className="brand-line-label relative">`

```tsx
className="group brand-line-row relative grid grid-cols-1 gap-4 overflow-hidden border-b border-line py-9 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:py-14"
```

- [ ] **Step 3: StrengthGrid** — FadeIn の className に `brand-line-card` を追加、h3 に `brand-line-label`

```tsx
className="group brand-line-card relative overflow-hidden border-b border-line py-10 pr-7"
```

- [ ] **Step 4: Faq** — 行 div に `brand-line-row`、質問 span に `brand-line-label`

```tsx
<div key={i} className="brand-line-row border-b border-line">
...
<span className="brand-line-label font-serif text-[17px] font-medium text-ink md:text-[19px]">
```

- [ ] **Step 5: コミット**

```bash
git add src/components/sections/{JobList,Weapons,StrengthGrid,Faq}.tsx
git commit -m "feat(hover): 求人リスト・武器・強み・FAQにbrand-line適用"
```

### Task 3: カード群に適用（Members / CareerPath / RecruitFlow / interviews前後リンク）

**Files:**
- Modify: `src/components/sections/Members.tsx:28`（Link className）
- Modify: `src/components/sections/CareerPath.tsx:22`（FadeIn className）、`:31`（h3）
- Modify: `src/components/sections/RecruitFlow.tsx:10`（FadeIn className）、`:16`（h3）
- Modify: `src/app/interviews/[slug]/page.tsx:168,183`（prev/next Link）、`:173,188`（タイトルspan）

- [ ] **Step 1: Members** — Link に `brand-line-card`（画像ズーム等の既存 group-hover は維持）

```tsx
className="group brand-line-card flex h-full flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
```

- [ ] **Step 2: CareerPath** — ステップセルに `brand-line-card`、h3 に `brand-line-label`

```tsx
className="brand-line-card flex h-full flex-col bg-paper p-8 md:p-10"
```

- [ ] **Step 3: RecruitFlow** — セルに `brand-line-card`、h3 に `brand-line-label`

```tsx
className="brand-line-card bg-paper p-8"
```

- [ ] **Step 4: interviews/[slug] 前後リンク** — `transition-colors hover:bg-cream` を `brand-line-row` に置き換え（2箇所）、タイトル span に `brand-line-label` 追加

```tsx
className="group brand-line-row flex flex-col gap-2 py-9 md:pr-10"
...
className="group brand-line-row flex flex-col items-start gap-2 py-9 md:items-end md:pl-10 md:text-right"
```

- [ ] **Step 5: コミット**

```bash
git add src/components/sections/{Members,CareerPath,RecruitFlow}.tsx "src/app/interviews/[slug]/page.tsx"
git commit -m "feat(hover): メンバー・キャリア・選考フロー・前後リンクにbrand-line適用"
```

### Task 4: Messages リーダーカードに適用（WIPと分離コミット）

**Files:**
- Modify: `src/components/sections/Messages.tsx:99`（leaders.items の FadeIn className。WIP変更あり—自分のhunkのみstage）

- [ ] **Step 1:** `className="bg-paper p-9 md:p-12"` → `className="brand-line-card bg-paper p-9 md:p-12"` に編集
- [ ] **Step 2:** 自分の hunk だけを index へ:

```bash
git diff -U1 src/components/sections/Messages.tsx > /tmp/messages.patch
# パッチから brand-line-card の hunk のみ残して他を削除した selective.patch を作成
git apply --cached --unidiff-zero selective.patch
git commit -m "feat(hover): リーダーメッセージカードにbrand-line適用"
```

分離できない場合はこのタスクをスキップし、最終報告で「Messages はWIPコミット後に適用要」と明記する。

### Task 5: ビルド検証＋Playwrightでhover確認

- [ ] **Step 1:** `pnpm build` — Expected: exit 0
- [ ] **Step 2:** `npx serve out`（または python http.server）で静的出力を配信し、Playwright MCP で `/`（JobList・Weapons・StrengthGrid）、`/recruit`（Faq・RecruitFlow）、`/interviews/chida`（前後リンク）の hover 状態をスクリーンショット
- [ ] **Step 3:** 赤縦線・cream背景・ラベルスライドの表示、およびリビールアニメーションの非破壊を目視確認。Members のカードは画像フルブリードのため、線とcreamの見え方が不自然なら調整（例: 線のみ・cream無し）

### Task 6: main へ deploy

- [ ] **Step 1:** WIP混入を防ぐため、featureブランチのHEAD（自分のコミットまで）から一時worktreeを作成してクリーンビルド

```bash
git worktree add /tmp/deploy-build feature/keikensha-recruit-phase0
cd /tmp/deploy-build && pnpm install && pnpm build
```

- [ ] **Step 2:** out/ の成果物を main worktree（recruitment_lp）へコピーし、`deploy:` コミット
- [ ] **Step 3:** main の既存の未コミット変更（前回セッションのWIPビルド残り）は混ぜない。自分のビルドで上書きされたファイルのみコミット
- [ ] **Step 4:** push（GitHub Pages 反映）
