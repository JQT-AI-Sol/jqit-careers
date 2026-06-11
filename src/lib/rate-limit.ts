import { createHash } from "crypto";

/**
 * 簡易レート制限（メモリ内）。本番のマルチインスタンス環境では
 * Upstash Redis 等への置き換えを推奨。MVP では同一IPの連続送信を抑止する。
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1分
const MAX_HITS = 5;

export function hashIp(ip: string | null | undefined): string {
  const salt = process.env.RATE_SALT ?? "jqit-careers";
  return createHash("sha256")
    .update(`${salt}:${ip ?? "unknown"}`)
    .digest("hex")
    .slice(0, 32);
}

export function isRateLimited(ipHash: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ipHash) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ipHash, arr);
  return arr.length > MAX_HITS;
}
