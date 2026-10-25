import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: "Skyland",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#262626",
    theme_color: "#06aec4",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: siteConfig.logo.src, sizes: "1080x1080", type: "image/png", purpose: "any" },
    ],
  };
}
