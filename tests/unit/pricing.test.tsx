import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pricing } from "@/components/pricing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BOOKING_LINKS } from "@/lib/contact";
import { getPackageDiscount, RATES } from "@/lib/pricing";

describe("getPackageDiscount", () => {
  it("is 0% below the package threshold", () => {
    expect(getPackageDiscount(1)).toBe(0);
    expect(getPackageDiscount(3)).toBe(0);
  });

  it("is 5% for 4-7 lessons/month", () => {
    expect(getPackageDiscount(4)).toBe(0.05);
    expect(getPackageDiscount(7)).toBe(0.05);
  });

  it("is 10% for 8+ lessons/month", () => {
    expect(getPackageDiscount(8)).toBe(0.1);
    expect(getPackageDiscount(20)).toBe(0.1);
  });
});

describe("Pricing", () => {
  it.each(["uk", "cs"] as const)(
    "shows the correct individual and group rates for %s",
    (locale) => {
      const dict = getDictionary(locale);
      render(<Pricing dict={dict} locale={locale} />);

      // formatCurrency output varies by locale (symbol placement/spacing),
      // so assert on the presence of the raw amounts rather than exact
      // formatted strings.
      for (const amount of [
        RATES.individual.min60,
        RATES.individual.min90,
        RATES.group.min60,
        RATES.group.min90,
      ]) {
        const matches = screen.getAllByText((text) => text.includes(String(amount)));
        expect(matches.length).toBeGreaterThan(0);
      }

      const links = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
      expect(links).toContain(BOOKING_LINKS.min60);
      expect(links).toContain(BOOKING_LINKS.min90);
    }
  );
});
