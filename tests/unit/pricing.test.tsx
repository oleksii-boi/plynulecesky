import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pricing } from "@/components/pricing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BOOKING_LINKS } from "@/lib/contact";
import { RATES } from "@/lib/pricing";

describe("Pricing", () => {
  it.each(["uk", "cs"] as const)(
    "shows every lesson rate for %s",
    (locale) => {
      const dict = getDictionary(locale);
      render(<Pricing dict={dict} locale={locale} />);

      // formatCurrency output varies by locale (symbol placement/spacing),
      // so assert on the presence of the raw amounts rather than exact
      // formatted strings.
      for (const amount of [
        RATES.individual.min60,
        RATES.individual.min90,
        RATES.individualPackage.min60,
        RATES.individualPackage.min90,
        RATES.individualIntensive.min60,
        RATES.individualIntensive.min90,
        RATES.group.min60,
        RATES.group.min90,
        RATES.trial.min45,
      ]) {
        const matches = screen.getAllByText((text) => text.includes(String(amount)));
        expect(matches.length).toBeGreaterThan(0);
      }
    }
  );

  it.each(["uk", "cs"] as const)(
    "the only booking action is the trial CTA for %s",
    (locale) => {
      const dict = getDictionary(locale);
      render(<Pricing dict={dict} locale={locale} />);

      const links = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
      expect(links).toEqual([BOOKING_LINKS.trial]);
    }
  );
});
