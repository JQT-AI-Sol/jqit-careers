import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: "2026-06-11",
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/entry" ? 0.9 : 0.7,
  }));
}
