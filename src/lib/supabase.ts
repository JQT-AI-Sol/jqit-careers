import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * サーバ専用 Supabase クライアント（service role）。
 * 環境変数が未設定のローカル開発では null を返し、呼び出し側でデグレードする。
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const isSupabaseConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
