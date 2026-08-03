import { test, expect } from "@playwright/test";

// Slice 12 validation: old plynulecesky.cz anchors (#about, #method,
// #pricing, #contact) still land somewhere sensible after the rebuild,
// rather than 404ing or silently dropping to the top of the page.
const legacyAnchors = ["about", "method", "pricing", "contact"];

test("legacy anchor ids from the old live site still exist on the page", async ({ page }) => {
  await page.goto("/uk/");
  for (const id of legacyAnchors) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test("visiting the old #contact URL scrolls to the footer contact section", async ({ page }) => {
  await page.goto("/uk/#contact");
  await expect(page.locator("#contact")).toBeInViewport();
});
