import { locales, isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Specialization } from "@/components/specialization";
import { Testimonials } from "@/components/testimonials";
import { GettingStarted } from "@/components/getting-started";
import { Pricing } from "@/components/pricing";
import { BookingFallback } from "@/components/booking-fallback";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_EMAIL } from "@/lib/contact";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Every nav anchor (#about, #testimonials, #getting-started, #pricing,
// #faq) now has real content behind it — Slice 9 adds the footer/contact
// section below Faq, which isn't itself a nav item.
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "uk";
  const dict = getDictionary(locale);
  const pathname = `/${locale}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kateryna Leshchenko",
    jobTitle: dict.about.eyebrow,
    email: CONTACT_EMAIL,
    url: "https://plynulecesky.cz/",
    knowsLanguage: ["uk", "cs"],
    hasCredential: dict.about.credentials,
    makesOffer: dict.specialization.items.map((item) => ({
      "@type": "Offer",
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- static, locally-built JSON-LD, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader locale={locale} pathname={pathname} dict={dict} />
      <main>
        <Hero dict={dict} />
        <About dict={dict} />
        <Specialization dict={dict} />
        <Testimonials dict={dict} locale={locale} />
        <GettingStarted dict={dict} />
        <Pricing dict={dict} locale={locale} />
        <BookingFallback dict={dict} />
        <Faq dict={dict} locale={locale} />
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}
