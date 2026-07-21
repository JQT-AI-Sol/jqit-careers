import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getInterviews } from "@/lib/interviews";

export const dynamic = "force-static";

const routes = [
  "",
  "/about",
  "/jobs",
  "/interviews",
  "/culture",
  "/recruit",
  "/entry",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const interviews = await getInterviews();
  const staticRoutes = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: "2026-06-11",
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/entry" ? 0.9 : 0.7,
  }));
  const interviewRoutes = interviews.map((interview) => ({
    url: `${site.url}/interviews/${interview.slug}`,
    lastModified: interview.revisedAt || interview.publishedAt || "2026-07-17",
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...interviewRoutes];
}
