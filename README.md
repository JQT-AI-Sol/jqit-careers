# JQIT 採用サイト（recruitment_lp）

JQITの本格採用サイト。Next.js (App Router) + Tailwind CSS + Supabase。
デザインは明朝ベースのエディトリアル・ミニマル（`design/design-system.md`）。

## セットアップ

```bash
pnpm install
cp .env.example .env.local   # 値を設定（未設定でもローカル動作可）
pnpm dev                     # http://localhost:3000
```

## スクリプト

| コマンド | 内容 |
|---------|------|
| `pnpm dev` | 開発サーバー |
| `pnpm build` | 本番ビルド |
| `pnpm start` | 本番サーバー |
| `pnpm lint` | ESLint |

## 構成

```
src/
├ app/                 各ルート（/ /about /jobs /interviews /culture /recruit /entry /privacy）
│  └ api/entry/        エントリー送信API
├ components/          ui / layout / sections / forms
└ lib/                 site / content / entry-schema / supabase / turnstile / rate-limit
content/               データ駆動コンテンツ（jobs/interviews/faq/stats/recruit-flow）.json
design/                要件・設計・デザインシステム
wireframes/            デザインモックアップ（v2採用）
supabase/migrations/   DBスキーマ（applications）
```

## コンテンツの更新

`content/*.json` を編集するだけで職種・社員の声・FAQ・数字・採用フローを差し替えできます（非エンジニア可）。

## 外部サービス（本番）

`.env.example` 参照。**未設定のローカルでは、エントリー送信は保存・通知をスキップしてログ出力する安全なデグレード動作**になります。

- **Supabase**: 応募データ保存。`supabase/migrations/0001_applications.sql` を適用。
- **Resend**: 採用担当へのメール通知。
- **Cloudflare Turnstile**: Bot対策。

## デプロイ

Vercel を想定。環境変数を設定のうえ、`pnpm build` が通ることを確認してデプロイしてください。

## 進捗管理

`WORKFLOW.md` にフェーズ進捗を記録しています（ai-solution-demo ワークフロー流用、Phase 7-9 はスキップ）。
