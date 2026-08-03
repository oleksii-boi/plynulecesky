import type { Locale } from "@/lib/i18n/locales";
import uk from "@/content/faq.uk.json";
import cs from "@/content/faq.cs.json";

export interface FaqItem {
  question: string;
  answer: string;
}

const data: Record<Locale, FaqItem[]> = { uk, cs };

export function getFaqItems(locale: Locale): FaqItem[] {
  return data[locale];
}
