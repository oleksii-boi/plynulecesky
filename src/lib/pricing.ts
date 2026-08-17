import type { Locale } from "@/lib/i18n/locales";
import { localeTags } from "@/lib/i18n/locales";

// CZK rates. Individual lessons drop to the package tier from the 5th
// lesson onward; the trial lesson is a fixed 45-minute rate.
export const RATES = {
  individual: { min60: 700, min90: 900 },
  individualPackage: { min60: 650, min90: 850 },
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
