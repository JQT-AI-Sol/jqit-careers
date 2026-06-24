// Regenerate the design-sync CSS inputs from the Next build output (`out/`).
// Run AFTER `pnpm build` and BEFORE the converter, on every (re-)sync:
//   pnpm build && node .design-sync/prep-css.mjs
//
// Produces (gitignored — they are build output, re-derived each run):
//   .design-sync/styles/tokens.css   — @theme tokens + Tailwind utilities + globals.css custom CSS
//   .design-sync/styles/fonts-src.css — all next/font @font-face rules, url()s repointed at out/media
//
// Why scrape `out/` instead of compiling Tailwind ourselves: the Next build
// already emits the exact utilities the source uses, the @theme token :root,
// the hand-written CSS (kicker / fade-in / geo-* / hero-* / marquee), and the
// real-family @font-face declarations — one source of truth, no drift.
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..");
const chunksDir = join(repo, "out/_next/static/chunks");
const stylesOut = join(here, "styles");

if (!existsSync(chunksDir)) {
  console.error(`[prep-css] ${chunksDir} not found — run \`pnpm build\` first.`);
  process.exit(1);
}
mkdirSync(stylesOut, { recursive: true });

const cssFiles = readdirSync(chunksDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => join(chunksDir, f));

// 1. tokens.css = the chunk that carries the @theme :root tokens + utilities.
const tokenChunk = cssFiles.find((f) => {
  const c = readFileSync(f, "utf8");
  return c.includes("--color-brand") || c.includes("e60012");
});
if (!tokenChunk) {
  console.error("[prep-css] no chunk with --color-brand / e60012 found");
  process.exit(1);
}
let tokensCss = readFileSync(tokenChunk, "utf8");
// Defensive: a static-export chunk shouldn't @import siblings, but strip any
// just in case so the styles.css closure stays self-contained.
const strippedImports = (tokensCss.match(/@import[^;]+;/g) || []).length;
tokensCss = tokensCss.replace(/@import[^;]+;/g, "");
writeFileSync(join(stylesOut, "tokens.css"), tokensCss);
console.error(
  `[prep-css] tokens.css <- ${tokenChunk.split("/").pop()} (${(tokensCss.length / 1024).toFixed(0)} KB${strippedImports ? `, stripped ${strippedImports} @import` : ""})`,
);

// 2. fonts-src.css = every @font-face across all chunks, deduped, url()s
//    repointed from `../media/` (relative to out/.../chunks) to a path
//    resolvable from .design-sync/styles/.
const faces = new Set();
for (const f of cssFiles) {
  const c = readFileSync(f, "utf8");
  for (const m of c.matchAll(/@font-face\s*\{[^}]*\}/g)) {
    // out/_next/static/chunks -> ../media  ==  out/_next/static/media
    // .design-sync/styles     -> ../../out/_next/static/media
    const rule = m[0].replace(/url\(\s*['"]?\.\.\/media\//g, "url(../../out/_next/static/media/");
    faces.add(rule);
  }
}
if (!faces.size) {
  console.error("[prep-css] no @font-face rules found in chunks");
  process.exit(1);
}
writeFileSync(join(stylesOut, "fonts-src.css"), [...faces].join("\n") + "\n");
console.error(`[prep-css] fonts-src.css <- ${faces.size} @font-face rule(s)`);
