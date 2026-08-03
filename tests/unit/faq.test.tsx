import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Faq } from "@/components/faq";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getFaqItems } from "@/lib/faq";

describe("Faq", () => {
  it.each(["uk", "cs"] as const)("renders every question for %s", (locale) => {
    const dict = getDictionary(locale);
    render(<Faq dict={dict} locale={locale} />);

    const items = getFaqItems(locale);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("has the same number of Q&A pairs in both locales (no missing translation)", () => {
    const ukItems = getFaqItems("uk");
    const csItems = getFaqItems("cs");
    expect(csItems.length).toBe(ukItems.length);
  });

  it("has no empty question or answer in either locale", () => {
    for (const locale of ["uk", "cs"] as const) {
      for (const item of getFaqItems(locale)) {
        expect(item.question.trim().length).toBeGreaterThan(0);
        expect(item.answer.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
