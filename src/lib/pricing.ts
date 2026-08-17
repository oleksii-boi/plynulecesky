import type { Locale } from "@/lib/i18n/locales";
import { localeTags } from "@/lib/i18n/locales";

// CZK rates. Individual lessons get cheaper the more are booked per month
// (3 or fewer / 4–7 / 8+); the trial lesson is a fixed 45-minute rate.
export const RATES = {
  individualIntensive: { min60: 600, min90: 800 },
  individualPackage: { min60: 650, min90: 850 },
  individual: { min60: 700, min90: 900 },
  group: { min60: 450, min90: 600 },
  trial: { min45: 350 },
} as const;

export function formatCurrency(amountCzk: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(amountCzk);
}
