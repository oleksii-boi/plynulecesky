import { test, expect } from "@playwright/test";

test("mobile navigation opens from the burger menu and closes after selection", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/uk/");

  const toggle = page.getByTestId("mobile-menu-toggle");
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  for (const id of ["about", "testimonials", "getting-started", "pricing", "faq"]) {
    await expect(page.getByTestId(`nav-link-${id}`)).toBeHidden();
  }

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByTestId("nav-link-faq")).toBeVisible();

  await page.getByTestId("nav-link-faq").click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByTestId("nav-link-faq")).toBeHidden();
  await expect(page.locator("#faq")).toBeInViewport();
});
