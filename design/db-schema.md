# DB設計書 — JQIT 採用サイト

- **DB**: Supabase（PostgreSQL）
- **対象**: 第1弾（エントリー応募データの保存）
- **関連**: [requirement.md](../docs/requirement.md)（F-011）/ [api-design.md](./api-design.md)
- **トレーサビリティ**: S-013（送信処理）が本スキーマを使用

---

## 1. 方針

- エントリーフォームの応募データを保存する**単一テーブル** `applications` を中心に構成。
- 書き込みは**サーバ（API Route）から service role のみ**。匿名（公開）からの直接 read/write は禁止（RLS）。
- 履歴書ファイルは Supabase Storage の**非公開バケット**に保存し、テーブルにはパスのみ保持。
- 将来の選考管理画面（Phase 2以降）に拡張できるよう `status` を持つ。

---

## 2. テーブル: `applications`

| カラム | 型 | NULL | 既定 | 説明 |
|--------|----|:---:|------|------|
| `id` | `uuid` | NO | `gen_random_uuid()` | 主キー |
| `created_at` | `timestamptz` | NO | `now()` | 応募日時 |
| `name` | `text` | NO | | 氏名（1–50） |
| `email` | `text` | NO | | メールアドレス |
| `phone` | `text` | NO | | 電話番号 |
| `application_type` | `text` | NO | | `apply`（本応募）/ `casual`（カジュアル面談） |
| `desired_positions` | `text[]` | NO | | `dev`/`infra`/`qa`/`ai` の配列（1件以上） |
| `experience` | `text` | NO | | `inexperienced` / `experienced` |
| `message` | `text` | NO | | 自己PR・メッセージ（1–2000） |
| `portfolio_url` | `text` | YES | | ポートフォリオ/GitHub 等 URL（任意） |
| `resume_path` | `text` | YES | | Storage 上の履歴書パス（任意） |
| `consent` | `boolean` | NO | `false` | 個人情報取扱い同意（true 必須） |
| `status` | `text` | NO | `'new'` | `new`/`reviewing`/`contacted`/`closed`（将来の選考管理用） |
| `source` | `text` | YES | | 流入元（utm 等。SNS/リファラル計測） |
| `user_agent` | `text` | YES | | 送信時UA（不正検知補助） |
| `ip_hash` | `text` | YES | | 送信元IPのハッシュ（生IPは保存しない。レート制限/不正検知） |

### 制約・インデックス
- `CHECK (application_type IN ('apply','casual'))`
- `CHECK (experience IN ('inexperienced','experienced'))`
- `CHECK (consent = true)` — 同意なしは保存しない
- `CHECK (array_length(desired_positions,1) >= 1)`
- インデックス: `created_at DESC`, `status`

### DDL（案）
```sql
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  application_type text not null check (application_type in ('apply','casual')),
  desired_positions text[] not null check (array_length(desired_positions,1) >= 1),
  experience text not null check (experience in ('inexperienced','experienced')),
  message text not null,
  portfolio_url text,
  resume_path text,
  consent boolean not null default false check (consent = true),
  status text not null default 'new' check (status in ('new','reviewing','contacted','closed')),
  source text,
  user_agent text,
  ip_hash text
);
create index applications_created_at_idx on public.applications (created_at desc);
create index applications_status_idx on public.applications (status);
```

---

## 3. RLS（行レベルセキュリティ）

```sql
alter table public.applications enable row level security;
-- 公開ロール（anon / authenticated）には一切のポリシーを付与しない（= 既定で全拒否）。
-- 書き込みは API Route の service role キー経由のみ（RLSをバイパス）。
```

> service role キーは**サーバ環境変数**でのみ使用し、クライアントへ露出しない。

---

## 4. Storage（履歴書）

- バケット: `resumes`（**private**）
- 命名: `resumes/{yyyy}/{mm}/{uuid}.{ext}`
- アップロードはサーバ（API Route）経由、service role で実行。
- 直接の公開URLは発行しない。閲覧は将来の管理画面から署名付きURLで。

---

## 5. 環境変数

| 変数 | 用途 |
|------|------|
| `SUPABASE_URL` | Supabase プロジェクトURL |
| `SUPABASE_SERVICE_ROLE_KEY` | サーバ専用（RLSバイパス、クライアント露出禁止） |
| `RESEND_API_KEY` | メール通知（api-design.md） |
| `RECRUIT_NOTIFY_TO` | 採用担当の通知先メール |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile サーバ検証 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile クライアント |

---

## 6. トレーサビリティ

| 要件 | 設計 | 本書の該当 |
|------|------|-----------|
| F-011 エントリー送信処理 | S-013 | `applications` テーブル, Storage, RLS |
| F-014 個人情報同意 | S-016 | `consent` カラム（true必須） |
| F-012 スパム対策（補助） | S-014 | `ip_hash`,`user_agent` |
