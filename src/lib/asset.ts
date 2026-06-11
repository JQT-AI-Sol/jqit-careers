// 画像など public/ 配下のアセットURLに basePath を付与する。
// 静的書き出し（GitHub Pages サブパス配信）では next/image が basePath を
// 自動付与しないため、src に明示的に付ける。Vercel等（basePath無し）では無害。
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string): string => `${BASE}${path}`;
