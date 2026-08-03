"use client";

import Image from "next/image";
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
          <Image
            src="/images/brand-glyph.svg"
            alt=""
            width={24}
            height={34}
            className="h-8 w-auto"
            priority
          />
          <span>{dict.brand}</span>
        </Link>

        <nav
          id="mobile-navigation"
          aria-label="Primary"
          className={cn(
            "order-3 mt-4 w-full border-t border-foreground/10 pt-3 lg:order-none lg:mt-0 lg:block lg:w-auto lg:border-0 lg:pt-0",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6 lg:whitespace-nowrap">
            {dict.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={activeId === item.id ? "true" : undefined}
                  data-testid={`nav-link-${item.id}`}
                  className={cn(
                    "relative block py-3 text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground lg:py-2",
                    activeId === item.id &&
                      "text-foreground lg:after:absolute lg:after:inset-x-0 lg:after:bottom-0 lg:after:h-px lg:after:bg-foreground"
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
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/70 text-foreground transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
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
