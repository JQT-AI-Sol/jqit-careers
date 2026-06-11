#!/bin/bash
# GitHub Pages 等向けの静的書き出しビルド。
# /api/entry（サーバー処理）は静的書き出しに含められないため、ビルド中だけ退避する。
# 使い方:
#   NEXT_PUBLIC_BASE_PATH=/repo-name ./scripts/build-static.sh   # サブパス配信時
#   ./scripts/build-static.sh                                    # 独自ドメイン/ユーザーPages
set -euo pipefail
cd "$(dirname "$0")/.."

API_DIR="src/app/api"
BAK_DIR="/tmp/jqit_api_bak_$$"

restore() {
  if [ -d "$BAK_DIR" ]; then
    rm -rf "$API_DIR"
    mv "$BAK_DIR" "$API_DIR"
    echo "↩️  /api ルートを復元しました"
  fi
}
trap restore EXIT

if [ -d "$API_DIR" ]; then
  mv "$API_DIR" "$BAK_DIR"
  echo "📦 /api ルートを一時退避（静的書き出しに含めないため）"
fi

echo "🏗  静的書き出しビルド中 (output: export)..."
BUILD_STATIC=true \
NEXT_PUBLIC_STATIC_EXPORT=true \
NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-}" \
  pnpm exec next build

# GitHub Pages が Jekyll 処理をしないように .nojekyll を出力
touch out/.nojekyll

echo "✅ 完了: out/ に静的サイトを書き出しました（$(find out -type f | wc -l | tr -d ' ') ファイル）"
