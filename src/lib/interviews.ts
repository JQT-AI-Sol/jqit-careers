import "server-only";
import { cache } from "react";
import { interviewFallback, type Interview } from "@/lib/content";

type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
};

type MicroCMSInterview = Omit<Interview, "image"> & {
  image?: string | { url: string; width?: number; height?: number };
};

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

/**
 * microCMS Image API can return a WebP representation without requiring a
 * server-side image optimizer. This is important for the static GitHub Pages
 * build, where next/image is intentionally unoptimized.
 */
function toMicroCmsWebp(url?: string): string | undefined {
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "images.microcms-assets.io") return url;

    parsed.searchParams.set("fm", "webp");
    return parsed.toString();
  } catch {
    // Preserve malformed/relative values so the existing fallback behavior
    // remains unchanged and the rendering layer can handle them normally.
    return url;
  }
}

function normalize(items: MicroCMSInterview[]): Interview[] {
  const fallbackBySlug = new Map(
    interviewFallback.map((interview) => [interview.slug, interview]),
  );
  const normalized = items.map((item) => {
    const fallback = fallbackBySlug.get(item.slug);
    const cmsImage = toMicroCmsWebp(
      typeof item.image === "string" ? item.image : item.image?.url,
    );

    return {
      ...fallback,
      ...item,
      image: cmsImage ?? fallback?.image,
    };
  });
  const cmsSlugs = new Set(normalized.map((interview) => interview.slug));

  return [...normalized, ...interviewFallback.filter(({ slug }) => !cmsSlugs.has(slug))].sort(
    (a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER),
  );
}

export const getInterviews = cache(async (): Promise<Interview[]> => {
  if (!serviceDomain || !apiKey) return normalize(interviewFallback);

  try {
    const response = await fetch(
      `https://${serviceDomain}.microcms.io/api/v1/recruit-interviews?limit=100`,
      {
        headers: { "X-MICROCMS-API-KEY": apiKey },
        cache: "force-cache",
      },
    );

    if (!response.ok) throw new Error(`microCMS returned ${response.status}`);
    const data = (await response.json()) as MicroCMSListResponse<MicroCMSInterview>;
    return data.contents.length > 0
      ? normalize(data.contents)
      : normalize(interviewFallback);
  } catch (error) {
    console.warn("[microCMS] 社員インタビュー取得失敗。ローカルデータを使用します。", error);
    return normalize(interviewFallback);
  }
});

export async function getInterviewBySlug(slug: string): Promise<Interview | undefined> {
  const interviews = await getInterviews();
  return interviews.find((interview) => interview.slug === slug);
}
