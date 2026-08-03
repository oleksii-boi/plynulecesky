import type { Locale } from "@/lib/i18n/locales";
import { localeTags } from "@/lib/i18n/locales";

// CZK rates, carried over from the live site / mockup as-is.
export const RATES = {
  individual: { min60: 700, min90: 900 },
  group: { min60: 450, min90: 600 },
} as const;

// Source FAQ copy ("4 to 8 lessons -> 5%, from 8 lessons -> 10%") has an
// overlapping boundary at exactly 8. Resolved here as: 4-7 -> 5%, 8+ ->
// 10% (i.e. the higher tier wins once you hit 8) — flag this assumption
// if the client meant something else.
export function getPackageDiscount(lessonCount: number): number {
  if (lessonCount >= 8) return 0.1;
  if (lessonCount >= 4) return 0.05;
  return 0;
}

export function formatCurrency(amountCzk: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(amountCzk);
}
