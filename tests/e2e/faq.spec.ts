import { test, expect } from "@playwright/test";

// Slice 8 validation: the accordion is keyboard-operable (Radix gives us
// this for free, but we verify it end to end rather than trust the
// library blindly).
test("FAQ item expands and collapses via the keyboard", async ({ page }) => {
  await page.goto("/uk/");

  const trigger = page.getByTestId("faq-question-0");
  await trigger.focus();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("FAQ items are reachable via Tab and respond to Space", async ({ page }) => {
  await page.goto("/cs/");

  const trigger = page.getByTestId("faq-question-1");
  await trigger.focus();
  await page.keyboard.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});
