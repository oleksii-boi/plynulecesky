import type { MetadataRoute } from "next";

// Pre-rendered to robots.txt at build time (works under output:'export').
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://plynulecesky.cz/sitemap.xml",
  };
}
