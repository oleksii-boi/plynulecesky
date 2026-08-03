export interface SectionIntersection {
  id: string;
  isIntersecting: boolean;
  intersectionRatio: number;
}

// Pure selection logic, factored out of the IntersectionObserver callback
// so it's unit-testable without a real observer (jsdom has none). Picks
// the most-visible intersecting section; falls back to the previous
// active id if nothing currently intersects (avoids flicker to "none"
// while scrolling past section boundaries).
export function getActiveSectionId(
  entries: SectionIntersection[],
  previousActiveId: string | null
): string | null {
  const visible = entries.filter((e) => e.isIntersecting);
  if (visible.length === 0) {
    return previousActiveId;
  }
  return visible.reduce((most, current) =>
    current.intersectionRatio > most.intersectionRatio ? current : most
  ).id;
}
