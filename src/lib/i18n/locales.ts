// Central source of truth for supported locales.
//
// This is a statically-exported site with no server/middleware (GitHub
// Pages), so locale routing is done entirely via generateStaticParams on
// `src/app/[locale]/...` segments — there is no runtime locale detection
// or redirect. "/" is made to serve the Ukrainian build output via a
// postbuild copy step (see scripts/postbuild-default-locale.mjs), while
// "/cs/" always serves Czech.

export const locales = ["uk", "cs"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uk";

// BCP-47 tags used for <html lang="">, hreflang, and Intl.NumberFormat.
export const localeTags: Record<Locale, string> = {
  uk: "uk-UA",
  cs: "cs-CZ",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Given the current locale-prefixed path (e.g. "/cs/pricing"), return the
// equivalent path in the other locale (e.g. "/uk/pricing"). Used by the
// language switcher, which is a plain link — not a server redirect.
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0]!)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return `/${segments.join("/")}/`;
}
