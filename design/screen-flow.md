# 画面遷移図 — JQIT 採用サイト

- **対象**: 第1弾（Phase 1）
- **関連**: [screen-design.md](./screen-design.md) / [requirement.md](../docs/requirement.md)

---

## 1. 全体遷移（ナビゲーション）

ヘッダーの GlobalNav（S-002）から、どのページへも遷移可能。CTA は常にエントリーへ誘導。

```mermaid
flowchart TD
    TOP["SCR-01 トップ /"]
    ABOUT["SCR-02 Why JQIT /about"]
    JOBS["SCR-03 職種紹介 /jobs"]
    INTV["SCR-04 社員インタビュー /interviews"]
    CULT["SCR-05 カルチャー /culture"]
    RECRUIT["SCR-06 採用フロー+FAQ /recruit"]
    ENTRY["SCR-07 エントリー /entry"]
    THANKS["SCR-08 完了 /entry/thanks"]
    PRIV["SCR-09 プライバシー /privacy"]

    TOP --> ABOUT & JOBS & INTV & CULT & RECRUIT & ENTRY
    ABOUT --> JOBS & ENTRY
    JOBS -->|"この職種に応募/相談\n?position=xxx"| ENTRY
    INTV --> ENTRY
    CULT --> ENTRY
    RECRUIT --> ENTRY
    ENTRY -->|"同意リンク"| PRIV
    ENTRY -->|"送信成功(200)"| THANKS
    THANKS --> TOP
    PRIV --> ENTRY

    %% グローバルナビ/フッターは全ページから相互遷移可
```

---

## 2. エントリー送信フロー（主要シナリオ）

```mermaid
sequenceDiagram
    participant U as 応募者
    participant F as EntryForm (S-012)
    participant API as POST /api/entry
    participant TS as Turnstile
    participant ST as Supabase Storage
    participant DB as Supabase DB
    participant M as Resend(メール)

    U->>F: 項目入力・同意チェック・Turnstile
    F->>F: クライアント検証(zod)
    F->>API: multipart 送信
    API->>API: honeypot 検査
    API->>TS: トークン検証
    TS-->>API: OK
    API->>API: サーバ検証(zod)
    alt 履歴書あり
        API->>ST: アップロード(private)
        ST-->>API: resume_path
    end
    API->>DB: applications へ insert
    DB-->>API: OK
    API->>M: 採用担当へ通知
    API-->>F: 200 { ok:true }
    F->>U: /entry/thanks へ遷移(SCR-08)
```

---

## 3. 例外・代替フロー

| ケース | 挙動 |
|--------|------|
| 入力不正 / Turnstile失敗 | 400。フォームにフィールドエラー表示、遷移しない（F-010/F-012） |
| 履歴書サイズ超過 | 413。ファイル項目にエラー表示 |
| 連続送信（bot/多重） | 429。一定時間後に再試行を案内 |
| メール送信のみ失敗 | 応募はDB保存済みのため 200 を返し、サンクス遷移（api-design §2.5） |
| サーバエラー | 500。再送を促すメッセージ表示、入力値は保持 |
| honeypot 検出 | 200を返しつつ破棄（botに気づかせない） |

---

## 4. 第1弾スコープ外の遷移（Phase 2 で追加予定）

- `/interviews/[slug]`（インタビュー詳細）
- `/jobs/[slug]`（職種別 詳細ページ）
- フォトギャラリー詳細、ブログ/NEWS 一覧・詳細
