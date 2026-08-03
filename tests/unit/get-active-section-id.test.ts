import { describe, expect, it } from "vitest";
import { getActiveSectionId } from "@/lib/get-active-section-id";

describe("getActiveSectionId", () => {
  it("picks the intersecting section with the highest visibility ratio", () => {
    const result = getActiveSectionId(
      [
        { id: "about", isIntersecting: true, intersectionRatio: 0.3 },
        { id: "pricing", isIntersecting: true, intersectionRatio: 0.8 },
        { id: "faq", isIntersecting: false, intersectionRatio: 0 },
      ],
      null
    );
    expect(result).toBe("pricing");
  });

  it("ignores non-intersecting entries entirely", () => {
    const result = getActiveSectionId(
      [{ id: "about", isIntersecting: false, intersectionRatio: 0 }],
      "pricing"
    );
    // nothing visible right now -> keep the previous active section
    // instead of flickering to "none" between section boundaries
    expect(result).toBe("pricing");
  });

  it("returns null when nothing has ever intersected", () => {
    const result = getActiveSectionId(
      [{ id: "about", isIntersecting: false, intersectionRatio: 0 }],
      null
    );
    expect(result).toBeNull();
  });
});
