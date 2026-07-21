import type { NextConfig } from "next";

// GitHub Pages 等への静的書き出し（BUILD_STATIC=true のときのみ有効）。
// 通常（Vercel）ビルドではサーバー機能（/api/entry・画像最適化）をそのまま使う。
const isStatic = process.env.BUILD_STATIC === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = isStatic
  ? {
      output: "export",
      images: { unoptimized: true },
      basePath: basePath || undefined,
      assetPrefix: basePath || undefined,
      trailingSlash: true,
    }
  : {
      images: {
        // Keep the response format deterministic for microCMS and local images
        // when the Next.js image optimizer is available (for example on Vercel).
        formats: ["image/webp"],
        remotePatterns: [
          { protocol: "https", hostname: "images.microcms-assets.io" },
        ],
      },
    };

export default nextConfig;
