import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

afterEach(cleanup);

// next/image expects to run inside a full Next.js app (it reads loader
// config from next.config.js at build time) — outside that, in a plain
// Vitest/jsdom run, it can't resolve a loader. Mock it as a bare <img>,
// which is the standard approach for unit-testing components that use it;
// the real optimized <Image> behavior is covered by the Playwright e2e
// suite running against the actual static export.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, sizes: _sizes, ...imgProps } = props;
    return React.createElement("img", imgProps);
  },
}));

// next/link (App Router) observes viewport intersection for prefetching.
// jsdom has no IntersectionObserver — polyfill a no-op so components using
// <Link> can render in unit tests without a runtime error.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;
