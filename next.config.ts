import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep rankings and links from the old WordPress site by sending its URLs to their new homes.
  async redirects() {
    return [
      { source: "/gallery", destination: "/projects", permanent: true },
      { source: "/jobs", destination: "/careers", permanent: true },
      { source: "/jobs/:slug*", destination: "/careers", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/category/:slug*", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
