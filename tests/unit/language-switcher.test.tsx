import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/language-switcher";

describe("LanguageSwitcher", () => {
  it("on the Ukrainian page, links to the Czech version of the current path", () => {
    render(<LanguageSwitcher locale="uk" pathname="/uk/pricing/" />);
    const link = screen.getByTestId("language-switcher");
    expect(link).toHaveAttribute("href", "/cs/pricing/");
    expect(link).toHaveTextContent("CZ");
    // "CZ" alone is a weak accessible name for screen reader users —
    // there must be a real descriptive aria-label behind it.
    expect(link.getAttribute("aria-label")?.length).toBeGreaterThan(5);
  });

  it("on the Czech page, links to the Ukrainian version of the current path", () => {
    render(<LanguageSwitcher locale="cs" pathname="/cs/pricing/" />);
    const link = screen.getByTestId("language-switcher");
    expect(link).toHaveAttribute("href", "/uk/pricing/");
    expect(link).toHaveTextContent("UA");
  });

  it("appends the active section hash so the other locale opens at the same spot", () => {
    render(
      <LanguageSwitcher locale="uk" pathname="/uk/" sectionId="pricing" />
    );
    expect(screen.getByTestId("language-switcher")).toHaveAttribute(
      "href",
      "/cs/#pricing"
    );
  });

  it("omits the hash when no section is active", () => {
    render(<LanguageSwitcher locale="uk" pathname="/uk/" sectionId={null} />);
    expect(screen.getByTestId("language-switcher")).toHaveAttribute("href", "/cs/");
  });
});
