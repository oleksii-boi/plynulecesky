import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GettingStarted } from "@/components/getting-started";
import { BookingFallback } from "@/components/booking-fallback";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CONTACT_EMAIL, mailtoHref } from "@/lib/contact";

describe("mailtoHref", () => {
  it("builds a mailto link with the contact address and encoded subject, and no body", () => {
    const href = mailtoHref("Test subject");
    expect(href.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
    expect(href).toContain("subject=Test%20subject");
    expect(href).not.toContain("body=");
  });
});

describe("GettingStarted", () => {
  it.each(["uk", "cs"] as const)(
    "renders all 3 steps for %s",
    (locale) => {
      const dict = getDictionary(locale);
      render(<GettingStarted dict={dict} />);

      expect(dict.gettingStarted.steps).toHaveLength(3);
      for (const step of dict.gettingStarted.steps) {
        expect(screen.getByText(step.title)).toBeInTheDocument();
      }
    }
  );

  it("the email fallback CTA is a real mailto link, not a dead placeholder", () => {
    const dict = getDictionary("uk");
    render(<BookingFallback dict={dict} />);
    const fallbackLink = screen.getByText(dict.gettingStarted.fallbackCta);
    expect(fallbackLink.getAttribute("href")).toContain(`mailto:${CONTACT_EMAIL}`);
  });
});
