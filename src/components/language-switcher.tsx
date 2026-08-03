import { locales, switchLocalePath, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Plain <a>s, not a server redirect — GitHub Pages has no middleware,
// so switching language is just navigating to the sibling static route.
// When the visitor is mid-page, the active section id is appended as a
// hash so the other locale opens at the same spot.
export function LanguageSwitcher({
  locale,
  pathname,
  sectionId = null,
}: {
  locale: Locale;
  pathname: string;
  sectionId?: string | null;
}) {
  const otherLocale = locales.find((l) => l !== locale)!;
  const dict = getDictionary(locale);
  const href =
    switchLocalePath(pathname, otherLocale) + (sectionId ? `#${sectionId}` : "");

  return (
    <a
      href={href}
      lang={otherLocale}
      aria-label={dict.switcher.ariaLabel}
      className="flex h-10 min-w-10 items-center justify-center rounded-full bg-white/70 px-3 text-xs font-medium tracking-[-0.01em] text-foreground transition-colors hover:bg-white"
      data-testid="language-switcher"
    >
      {dict.switcher.label}
    </a>
  );
}
