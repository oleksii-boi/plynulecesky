import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("sitemap", () => {
  it("includes the canonical root, /cs/, /cs/terms/, and /cs/cancellation/ — and never /uk/", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://plynulecesky.cz/");
    expect(urls).toContain("https://plynulecesky.cz/cs/");
    expect(urls).toContain("https://plynulecesky.cz/cs/terms/");
    expect(urls).toContain("https://plynulecesky.cz/cs/cancellation/");
    expect(urls.some((url) => url.includes("/uk/"))).toBe(false);
  });
});

describe("robots", () => {
  it("points at the sitemap and allows crawling", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://plynulecesky.cz/sitemap.xml");
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
