import type { MetadataRoute } from "next";

// Pre-rendered to sitemap.xml at build time (works under output:'export').
// "/uk/" is deliberately omitted — "/" is the canonical URL for the
// default (Ukrainian) locale per the postbuild default-locale copy, so
// listing both would be duplicate-content.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://plynulecesky.cz";
  return [
    {
      url: `${base}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/cs/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/cs/terms/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/cs/cancellation/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
