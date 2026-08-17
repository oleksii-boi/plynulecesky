import { test, expect } from "@playwright/test";

test("homepage declares hreflang alternates for both locales", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('link[rel="alternate"][hreflang]');
  await expect(links).toHaveCount(2);
  const hreflangs = await links.evaluateAll((els) =>
    els.map((el) => el.getAttribute("hreflang"))
  );
  expect(hreflangs.sort()).toEqual(["cs", "uk"]);
});

test("homepage has a canonical link and OG tags", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://plynulecesky.cz/"
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://plynulecesky.cz/images/og.jpg"
  );
});

test("homepage exposes favicon and apple touch icon", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /favicon/);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    "href",
    "/apple-touch-icon.png"
  );
});

test("sitemap.xml and robots.txt are generated", async ({ page, request, baseURL }) => {
  const sitemapRes = await request.get(`${baseURL}/sitemap.xml`);
  expect(sitemapRes.ok()).toBe(true);
  expect(await sitemapRes.text()).toContain("<urlset");

  const robotsRes = await request.get(`${baseURL}/robots.txt`);
  expect(robotsRes.ok()).toBe(true);
  expect(await robotsRes.text()).toContain("Sitemap:");
});

test("homepage embeds valid JSON-LD structured data", async ({ page }) => {
  await page.goto("/");
  // Two blocks: EducationalOrganization from the layout, Person from the page.
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(blocks.length).toBeGreaterThan(0);

  const entries = blocks.map((block) => JSON.parse(block));
  expect(entries.map((entry) => entry["@type"])).toContain("EducationalOrganization");

  const person = entries.find((entry) => entry["@type"] === "Person");
  expect(person).toBeTruthy();
  expect(person.email).toContain("@");
});
