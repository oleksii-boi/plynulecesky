"use client";

import { useEffect, useRef, useState } from "react";
import { getActiveSectionId } from "@/lib/get-active-section-id";

// Scroll-spy for the nav: watches each section id and reports which one
// is currently most visible, so SiteHeader can mark that nav link active.
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const mapped = observerEntries.map((entry) => ({
          id: entry.target.id,
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
        }));
        const next = getActiveSectionId(mapped, activeIdRef.current);
        activeIdRef.current = next;
        setActiveId(next);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
