import { test, expect } from "@playwright/test";

// Footer legal links resolve, and footer -> cancellation / privacy -> back
// works from both locales even though those pages only exist in Czech.

for (const locale of ["uk", "cs"] as const) {
  test(`[${locale}] footer cancellation link navigates to the Czech page and back`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/`);

    await page
      .getByRole("link", { name: /Умови та повернення|Podmínky a vrácení peněz/ })
      .click();
    await expect(page).toHaveURL(/\/cs\/cancellation\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "cs");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Podmínky zrušení");

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/${locale}/$`));
  });

  test(`[${locale}] footer privacy link navigates to the Czech terms page and back`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/`);

    await page
      .getByRole("link", { name: /Захист персональних даних|Ochrana osobních údajů/ })
      .click();
    await expect(page).toHaveURL(/\/cs\/terms\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "cs");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Podmínky ochrany osobních údajů"
    );

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/${locale}/$`));
  });
}

test("footer social/email links are not dead hrefs", async ({ page }) => {
  await page.goto("/uk/");
  for (const name of ["Email", "Telegram"]) {
    const link = page.getByRole("link", { name });
    await expect(link).toHaveAttribute("href", /.+/);
  }
});
