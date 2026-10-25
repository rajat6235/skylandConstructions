import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const lastModified = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
