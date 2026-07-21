/**
 * Cloudflare Turnstile のサーバ検証。
 * TURNSTILE_SECRET_KEY 未設定のローカル開発では検証をスキップ（true）。
 */
export async function verifyTurnstile(
  token: string | null,
  ip?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // dev degrade
  if (!token) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    },
  );
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export const isTurnstileConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
