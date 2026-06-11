# API設計書 — JQIT 採用サイト

- **対象**: 第1弾。エントリー送信API（サイト内フォームのバックエンド）
- **関連**: [requirement.md](../docs/requirement.md)（F-010〜F-014）/ [db-schema.md](./db-schema.md) / [screen-design.md](./screen-design.md)（S-012/S-013/S-014）
- **方針**: Next.js App Router の Route Handler。公開APIは最小限（エントリー送信のみ）。

---

## 1. エンドポイント一覧

| メソッド | パス | 概要 | 対応F |
|---------|------|------|------|
| `POST` | `/api/entry` | エントリー応募の受信（Turnstile検証→Storage保存→DB保存→メール通知） | F-010/F-011/F-012/F-014 |

> 第1弾はこの1本のみ。職種/FAQ/インタビュー等の読み取りはビルド時に `content/` から静的生成（API不要）。

---

## 2. `POST /api/entry`

### 2.1 リクエスト
- Content-Type: `multipart/form-data`（履歴書ファイル添付に対応）
- フィールド:

| フィールド | 必須 | 型/制約 |
|-----------|:---:|--------|
| `name` | ✅ | string 1–50 |
| `email` | ✅ | email |
| `phone` | ✅ | string 10–15桁相当 |
| `applicationType` | ✅ | `apply`\|`casual` |
| `desiredPositions` | ✅ | string[]（`dev`\|`infra`\|`qa`\|`ai`、1件以上） |
| `experience` | ✅ | `inexperienced`\|`experienced` |
| `message` | ✅ | string 1–2000 |
| `portfolioUrl` | ー | url |
| `resume` | ー | file（PDF/doc, ≤10MB） |
| `consent` | ✅ | `true` |
| `source` | ー | string（utm 等） |
| `company` | ー | **honeypot**（人間は空。値があれば bot とみなす） |
| `turnstileToken` | ✅ | Cloudflare Turnstile トークン |

### 2.2 処理フロー
```
1. honeypot 検査: `company` に値あり → 200 OK を返しつつ破棄（botに成功と誤認させる）
2. Turnstile 検証: TURNSTILE_SECRET_KEY で siteverify。失敗 → 400
3. 入力検証: zod スキーマで検証。失敗 → 400（fieldErrors を返す）
4. レート制限: ip_hash 単位で短時間の多重送信を抑制（メモリ/Upstash等）。超過 → 429
5. 履歴書あり: Supabase Storage(resumes, private) に service role でアップロード → resume_path 取得
6. DB保存: applications に insert（consent=true 必須、ip_hash/user_agent 付与）
7. メール通知: Resend で RECRUIT_NOTIFY_TO へ応募内容を送信（添付or リンク）
8. 応答: 200 { ok: true }
```

### 2.3 バリデーション（zod・サーバ/クライアント共通）
```ts
const EntrySchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9\-+() ]{10,15}$/),
  applicationType: z.enum(['apply','casual']),
  desiredPositions: z.array(z.enum(['dev','infra','qa','ai'])).min(1),
  experience: z.enum(['inexperienced','experienced']),
  message: z.string().min(1).max(2000),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  consent: z.literal(true),
  source: z.string().max(200).optional(),
});
// resume(file) と turnstileToken は別途検証
```

### 2.4 レスポンス
| ステータス | ボディ | 意味 |
|-----------|--------|------|
| 200 | `{ ok: true }` | 受付成功（honeypot破棄時も200） |
| 400 | `{ ok:false, error:'validation', fieldErrors:{...} }` | 入力不正 / Turnstile失敗 |
| 413 | `{ ok:false, error:'file_too_large' }` | 履歴書サイズ超過 |
| 429 | `{ ok:false, error:'rate_limited' }` | 連続送信 |
| 500 | `{ ok:false, error:'server' }` | サーバ内部エラー（保存/送信失敗） |

### 2.5 エラーハンドリング方針
- DB保存成功・メール送信失敗 → 応募は受け付け済み。サーバログに記録し、200を返す（応募者にエラーを見せない）。再送ジョブ/監視は将来検討。
- Storage失敗 → 履歴書は任意のため、添付なしで応募を継続し warning ログ。
- 秘密情報（service role / Resend / Turnstile secret）は**サーバ環境変数のみ**。クライアントへ出さない。

### 2.6 セキュリティ
- 全て HTTPS。CORS は同一オリジンのみ。
- Turnstile ＋ honeypot ＋ レート制限の三層で bot/スパム抑止（F-012）。
- 生IPは保存せず ip_hash（ソルト付き）で保持（db-schema §2）。

---

## 3. メール通知テンプレート（Resend）

- 宛先: `RECRUIT_NOTIFY_TO`
- 件名: `【採用エントリー】{name} 様 / {applicationType} / {positions}`
- 本文: 入力項目の一覧＋応募日時。履歴書は添付 or 管理リンク。

---

## 4. トレーサビリティ（F → API）

| 要件 | 本書の該当 |
|------|-----------|
| F-010 エントリー入力 | リクエスト/バリデーション（§2.1, §2.3） |
| F-011 送信処理 | 処理フロー §2.2（Storage→DB→メール） |
| F-012 スパム対策 | honeypot / Turnstile / レート制限（§2.2, §2.6） |
| F-013 完了表示 | 200応答 → クライアントが `/entry/thanks` へ遷移 |
| F-014 個人情報同意 | `consent: literal(true)` 必須（§2.3） |
