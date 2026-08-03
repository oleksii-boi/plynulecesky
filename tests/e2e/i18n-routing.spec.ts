import { test, expect } from "@playwright/test";

// Slice 1 validation: locale routing + default-locale-at-root behave
// correctly against the real static export output.

test('"/" serves the Ukrainian build (default locale) with lang="uk"', async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Говоріть чеською вільно і впевнено"
  );
});

test('"/uk/" renders with lang="uk"', async ({ page }) => {
  await page.goto("/uk/");
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
});

test('"/cs/" renders with lang="cs"', async ({ page }) => {
  await page.goto("/cs/");
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
});

test("language switcher toggles locale and preserves the path", async ({ page }) => {
  await page.goto("/uk/");
  await page.getByTestId("language-switcher").click();
  await expect(page).toHaveURL(/\/cs\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");

  await page.getByTestId("language-switcher").click();
  await expect(page).toHaveURL(/\/uk\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
});

test("language switcher preserves the active section across locales", async ({ page }) => {
  await page.goto("/uk/");
  await page.getByTestId("nav-link-pricing").click();
  await expect(page).toHaveURL(/#pricing$/);

  await page.getByTestId("language-switcher").click();
  await expect(page).toHaveURL(/\/cs\/#pricing$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page.locator("#pricing")).toBeInViewport();
});
