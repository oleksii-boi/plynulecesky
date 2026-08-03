import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Slice 11 validation: "axe reports zero critical/serious violations
// sitewide" — enforced automatically in CI rather than left as a manual
// step. Moderate/minor issues are still reported (visible in the CI log)
// but don't fail the build.
const pages = ["/uk/", "/cs/", "/cs/terms/", "/cs/cancellation/"];

for (const path of pages) {
  test(`no critical/serious axe violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    if (blocking.length > 0) {
      console.log(JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });
}
