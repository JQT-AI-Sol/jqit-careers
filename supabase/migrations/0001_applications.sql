-- JQIT 採用サイト: 応募データテーブル（design/db-schema.md 準拠）
-- Supabase SQL Editor または supabase db push で適用してください。

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  application_type text not null check (application_type in ('apply','casual')),
  desired_positions text[] not null check (array_length(desired_positions, 1) >= 1),
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

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_status_idx on public.applications (status);

-- RLS: 公開ロールには一切のポリシーを付与しない（= 既定で全拒否）。
-- 書き込みは API Route の service role キー経由のみ（RLS をバイパス）。
alter table public.applications enable row level security;

-- Storage: 履歴書用の非公開バケット（Supabase ダッシュボード or 下記で作成）
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;
