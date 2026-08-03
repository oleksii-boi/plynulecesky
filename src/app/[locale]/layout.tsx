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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
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
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: "Plynule česky — Kateryna Leshchenko",
        },
      ],
      locale: localeTags[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Plynule česky — Kateryna Leshchenko",
      description,
      images: ["/images/og.jpg"],
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
