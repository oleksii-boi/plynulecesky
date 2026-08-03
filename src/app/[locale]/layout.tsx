import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { locales, localeTags, isLocale, type Locale } from "@/lib/i18n/locales";

// This is the ROOT layout (there is no src/app/layout.tsx above it) so it
// is the only place allowed to render <html>/<body>. That's what lets us
// set a correct, per-locale `lang` attribute without a server: every
// locale gets fully pre-rendered as its own static HTML document via
// generateStaticParams below.

const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// "/" (not "/uk/") is the canonical URL for the default locale — see
// scripts/postbuild-default-locale.mjs — so that's what's used for
// canonical/hreflang self-references, not the locale-prefixed path.
const canonicalPaths: Record<Locale, string> = {
  uk: "/",
  cs: "/cs/",
};

const metaDescriptions: Record<Locale, string> = {
  uk: "Чеська мова з викладачем Катериною Лещенко. Індивідуальні та групові заняття рівнів A1–C1. Сертифікат Карлового університету. Запис на заняття онлайн.",
  cs: "Čeština s lektorkou Katerynou Leshchenko. Individuální a skupinové lekce úrovní A1–C1. Certifikát Univerzity Karlovy. Online rezervace lekcí.",
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "uk";
  const description = metaDescriptions[locale];

  return {
    metadataBase: new URL("https://plynulecesky.cz"),
    title: {
      default: "Plynule česky — Kateryna Leshchenko",
      template: "%s — Plynule česky",
    },
    description,
    alternates: {
      canonical: canonicalPaths[locale],
      languages: {
        uk: canonicalPaths.uk,
        cs: canonicalPaths.cs,
      },
    },
    openGraph: {
      title: "Plynule česky — Kateryna Leshchenko",
      description,
      url: canonicalPaths[locale],
      siteName: "Plynule česky",
      // TODO: swap for a real 1200x630 OG image before launch.
      images: ["/images/og.jpg"],
      locale: localeTags[locale],
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "uk";

  return (
    <html lang={locale} className={sans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
