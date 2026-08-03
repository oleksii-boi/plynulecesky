import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Specialization } from "@/components/specialization";
import { getDictionary } from "@/lib/i18n/dictionaries";

describe("Specialization", () => {
  it.each(["uk", "cs"] as const)("renders exactly 3 specialization cards for %s", (locale) => {
    const dict = getDictionary(locale);
    render(<Specialization dict={dict} />);

    expect(dict.specialization.items).toHaveLength(3);
    for (const item of dict.specialization.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it("has the same number of items across locales (content parity)", () => {
    const uk = getDictionary("uk");
    const cs = getDictionary("cs");
    expect(cs.specialization.items.length).toBe(uk.specialization.items.length);
  });
});
