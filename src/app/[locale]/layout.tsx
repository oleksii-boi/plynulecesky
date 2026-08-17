import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { locales, localeTags, isLocale, type Locale } from "@/lib/i18n/locales";
import { CONTACT_EMAIL } from "@/lib/contact";

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

// Titles/descriptions lead with the phrases the audience actually
// searches («уроки чеської мови онлайн», «чеська для українців»,
// "výuka češtiny pro Ukrajince/cizince"), not just the brand name.
const metaTitles: Record<Locale, string> = {
  uk: "Уроки чеської мови онлайн для українців — Plynule česky",
  cs: "Výuka češtiny pro Ukrajince online — Plynule česky",
};

const metaDescriptions: Record<Locale, string> = {
  uk: "Уроки чеської мови онлайн для українців. Індивідуальні та групові заняття рівнів A1–C1, підготовка до іспиту на ПМЖ (trvalý pobyt) та вступу до вишів. Викладач Катерина Лещенко живе в Чехії з 2014 року. Запис онлайн.",
  cs: "Výuka češtiny pro Ukrajince a cizince online. Individuální a skupinové lekce úrovní A1–C1, příprava na zkoušku pro trvalý pobyt i přijímací zkoušky na VŠ. Lektorka Kateryna Leshchenko, certifikát Univerzity Karlovy. Online rezervace.",
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : "uk";
  const title = metaTitles[locale];
  const description = metaDescriptions[locale];

  return {
    metadataBase: new URL("https://plynulecesky.cz"),
    title: {
      default: title,
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
        "x-default": canonicalPaths.uk,
      },
    },
    openGraph: {
      title,
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
      title,
      description,
      images: ["/images/og.jpg"],
    },
  };
}

// Site-wide brand identity, distinct from the per-page Person schema in
// [locale]/page.tsx (which describes Kateryna, the instructor). Rendered
// in the root layout — rather than only on the home page — so it's
// present on every locale/route, including /terms/ and /cancellation/.
function buildOrganizationData(locale: Locale) {
  const url = `https://plynulecesky.cz${canonicalPaths[locale]}`;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Plynule česky",
    url,
    logo: "https://plynulecesky.cz/images/brand-glyph.svg",
    image: "https://plynulecesky.cz/images/og.jpg",
    email: CONTACT_EMAIL,
    founder: {
      "@type": "Person",
      name: "Kateryna Leshchenko",
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
  const organizationData = buildOrganizationData(locale);

  return (
    <html lang={locale} className={sans.variable}>
      <body className="font-sans">
        {/* eslint-disable-next-line react/no-danger -- static, locally-built JSON-LD, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        {children}
      </body>
    </html>
  );
}
