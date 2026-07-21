import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const envFileArg = process.argv.find((arg) => arg.startsWith("--env-file="));
loadEnv(envFileArg ? envFileArg.slice("--env-file=".length) : resolve(root, ".env.local"));

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;
const dryRun = process.argv.includes("--dry-run");
const endpoint = "recruit-interviews";

if (!serviceDomain || !apiKey) {
  fail("MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定してください。");
}

const interviews = JSON.parse(
  readFileSync(resolve(root, "content/interviews.json"), "utf8"),
);
const existing = await getExisting();

for (const [index, interview] of interviews.entries()) {
  const current = existing.find((item) => item.slug === interview.slug);
  const image = current?.image || (await uploadMedia(interview.image));
  const fields = {
    slug: interview.slug,
    name: interview.name,
    role: interview.role,
    dept: interview.dept,
    career: interview.career,
    image,
    imagePosition: interview.imagePosition,
    title: interview.title,
    excerpt: interview.excerpt,
    reason: interview.reason,
    work: interview.work,
    growth: interview.growth,
    message: interview.message,
    noteUrl: interview.sourceUrl?.includes("note.com") ? interview.sourceUrl : undefined,
    sourceUrl: interview.sourceUrl,
    featured: index < 3,
    sortOrder: index + 1,
    seoTitle: interview.title,
    seoDescription: interview.excerpt,
  };

  if (dryRun) {
    console.log(`[dry-run] ${current ? "update" : "create"} ${interview.slug}`);
  } else if (current) {
    await writeContent("PATCH", current.id, fields);
    console.log(`updated ${interview.slug}`);
  } else {
    await writeContent("POST", null, fields);
    console.log(`created ${interview.slug}`);
  }
}

console.log(`社員インタビュー${interviews.length}件の移行が完了しました。`);

async function getExisting() {
  if (dryRun) return [];
  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=100`,
    { headers: { "X-MICROCMS-API-KEY": apiKey } },
  );
  const body = await readResponse(response);
  if (!response.ok) fail(`既存データを取得できませんでした (${response.status})\n${body}`);
  return JSON.parse(body).contents;
}

async function uploadMedia(publicPath) {
  const relativePath = publicPath.replace(/^\//, "");
  const filePath = resolve(root, "public", relativePath.replace(/^images\//, "images/"));
  if (!existsSync(filePath)) fail(`${filePath} が見つかりません。`);
  if (statSync(filePath).size > 5 * 1024 * 1024) fail(`${relativePath} は5MBを超えています。`);
  if (dryRun) return `https://example.microcms-assets.io/${basename(filePath)}`;

  const form = new FormData();
  form.append(
    "file",
    new Blob([readFileSync(filePath)], { type: mimeType(filePath) }),
    basename(filePath),
  );
  const response = await fetch(
    `https://${serviceDomain}.microcms-management.io/api/v1/media`,
    {
      method: "POST",
      headers: { "X-MICROCMS-API-KEY": apiKey },
      body: form,
    },
  );
  const body = await readResponse(response);
  if (!response.ok) fail(`画像をアップロードできませんでした (${response.status})\n${body}`);
  return JSON.parse(body).url;
}

async function writeContent(method, id, fields) {
  const suffix = id ? `/${id}` : "";
  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/${endpoint}${suffix}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": apiKey,
      },
      body: JSON.stringify(fields),
    },
  );
  const body = await readResponse(response);
  if (!response.ok) fail(`コンテンツを書き込めませんでした (${response.status})\n${body}`);
}

function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
}

function mimeType(path) {
  const extension = extname(path).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  return "image/jpeg";
}

async function readResponse(response) {
  const text = await response.text();
  return text || "(empty response)";
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
