import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "@/components/about";
import { getDictionary } from "@/lib/i18n/dictionaries";

describe("About", () => {
  it.each(["uk", "cs"] as const)("renders all credentials and bio paragraphs for %s", (locale) => {
    const dict = getDictionary(locale);
    render(<About dict={dict} />);

    for (const paragraph of dict.about.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    for (const credential of dict.about.credentials) {
      expect(screen.getByText(credential)).toBeInTheDocument();
    }
    // Two responsive portrait variants: mobile/desktop and the tablet float.
    expect(screen.getAllByRole("img", { name: dict.about.photoAlt })).toHaveLength(2);
  });

  it("keeps the same number of credentials across locales (content parity)", () => {
    const uk = getDictionary("uk");
    const cs = getDictionary("cs");
    expect(cs.about.credentials.length).toBe(uk.about.credentials.length);
    expect(cs.about.paragraphs.length).toBe(uk.about.paragraphs.length);
  });
});
