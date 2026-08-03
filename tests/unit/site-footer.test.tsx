import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/contact";

describe("SiteFooter", () => {
  it.each(["uk", "cs"] as const)(
    "links email, telegram, and the (Czech-only) legal pages for %s",
    (locale) => {
      const dict = getDictionary(locale);
      render(<SiteFooter dict={dict} />);

      const links = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
      expect(links).toContain(`mailto:${CONTACT_EMAIL}`);
      expect(links).toContain(SOCIAL_LINKS.telegram);
      // Both locales link to the same Czech-only legal pages — there is no
      // per-locale variant, by decision.
      expect(links).toContain("/cs/cancellation/");
      expect(links).toContain("/cs/terms/");
    }
  );
});
