import type { Locale } from "@/lib/i18n/locales";
import uk from "@/content/testimonials.uk.json";
import cs from "@/content/testimonials.cs.json";

export interface Testimonial {
  name: string;
  quote: string;
}

export interface TestimonialsData {
  isPlaceholder: boolean;
  items: Testimonial[];
}

const data: Record<Locale, TestimonialsData> = { uk, cs };

export function getTestimonials(locale: Locale): TestimonialsData {
  return data[locale];
}
