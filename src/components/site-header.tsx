"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

export function SiteHeader({
  locale,
  pathname,
  dict,
}: {
  locale: Locale;
  pathname: string;
  dict: Dictionary;
}) {
  const activeId = useActiveSection(dict.nav.map((item) => item.id));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLabel =
    locale === "uk"
      ? isMenuOpen
        ? "Закрити меню"
        : "Відкрити меню"
      : isMenuOpen
        ? "Zavřít menu"
        : "Otevřít menu";

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/[0.05] bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-3 px-6 py-4">
        <Link
          href={`/${locale}/`}
          className="flex items-center gap-2.5 text-lg font-medium tracking-[-0.02em]"
        >
          <span className="iris-frame flex size-8 items-center justify-center rounded-full text-sm font-medium text-accent">
            P
          </span>
          <span>{dict.brand}</span>
        </Link>

        <nav
          id="mobile-navigation"
          aria-label="Primary"
          className={cn(
            "order-3 mt-4 w-full border-t border-foreground/10 pt-3 md:order-none md:mt-0 md:block md:w-auto md:border-0 md:pt-0",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-6 md:whitespace-nowrap">
            {dict.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={activeId === item.id ? "true" : undefined}
                  data-testid={`nav-link-${item.id}`}
                  className={cn(
                    "relative block py-3 text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground md:py-2",
                    activeId === item.id &&
                      "text-foreground md:after:absolute md:after:inset-x-0 md:after:bottom-0 md:after:h-px md:after:bg-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#getting-started"
            className="hidden h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[0_1px_2px_rgba(10,13,18,0.8),0_0_0_1px_#0a0d12] transition-colors hover:bg-[#262c37] sm:flex"
          >
            {dict.hero.ctaPrimary}
          </a>
          <LanguageSwitcher locale={locale} pathname={pathname} sectionId={activeId} />
          <button
            type="button"
            aria-label={menuLabel}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            data-testid="mobile-menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/70 text-foreground transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden"
          >
            {isMenuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
