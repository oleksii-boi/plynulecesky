import { test, expect } from "@playwright/test";

// Slice 2 validation: every nav anchor resolves to an existing section id
// with no console errors, on both locales.

const navIds = ["about", "testimonials", "getting-started", "pricing", "faq"];

for (const locale of ["uk", "cs"] as const) {
  test(`[${locale}] all nav links scroll to an existing section with no console errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto(`/${locale}/`);

    for (const id of navIds) {
      await page.getByTestId(`nav-link-${id}`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }

    expect(errors, `console/page errors on /${locale}/: ${errors.join("\n")}`).toEqual([]);
  });
}
