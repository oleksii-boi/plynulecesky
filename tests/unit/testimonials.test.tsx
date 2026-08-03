import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/components/testimonials";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getTestimonials } from "@/lib/testimonials";

describe("Testimonials", () => {
  it.each(["uk", "cs"] as const)("renders no empty cards for %s", (locale) => {
    const dict = getDictionary(locale);
    render(<Testimonials dict={dict} locale={locale} />);

    const { items } = getTestimonials(locale);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(item.quote))).toBeInTheDocument();
    }
  });

  it("uses the two real reviews (Anna, Olena)", () => {
    for (const locale of ["uk", "cs"] as const) {
      const { items, isPlaceholder } = getTestimonials(locale);
      expect(isPlaceholder).toBe(false);
      expect(items).toHaveLength(2);
      expect(items.map((i) => i.name)).toEqual(["Anna", "Olena"]);
    }
  });
});
