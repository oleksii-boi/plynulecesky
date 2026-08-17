import Image from "next/image";
import { GraduationCap, Mail, Send } from "lucide-react";
import {
  BOOKING_LINKS,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  mailtoHref,
} from "@/lib/contact";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Legal pages are Czech-only by decision — every locale's footer links
// to the same /cs/... URLs; there are no per-locale variants.
const CANCELLATION_HREF = "/cs/cancellation/";
const PRIVACY_HREF = "/cs/terms/";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  const contactCtas = [
    {
      label: dict.footer.trialCta,
      href: BOOKING_LINKS.trial,
      icon: GraduationCap,
      external: true,
    },
    {
      label: dict.gettingStarted.fallbackTelegramCta,
      href: SOCIAL_LINKS.telegram,
      icon: Send,
      external: true,
    },
    {
      label: dict.gettingStarted.fallbackCta,
      href: mailtoHref(dict.gettingStarted.fallbackEmailSubject),
      icon: Mail,
      external: false,
    },
  ];

  return (
    // id="contact" preserves the old live site's #contact anchor (same
    // "ready to start? email me" content lived there) so any external
    // links/bookmarks to plynulecesky.cz/#contact keep working.
    <footer id="contact" className="scroll-mt-28">
      <div className="section-shell pb-8">
        <div className="grid gap-10 rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
          <div>
            <h2 className="max-w-2xl text-4xl font-medium leading-[1.08] tracking-[-0.02em] md:text-6xl">
              {dict.footer.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-white/70">
              {dict.footer.body}
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-1">
            {contactCtas.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex min-w-56 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/images/brand-glyph.svg"
                alt=""
                width={27}
                height={39}
                className="h-9 w-auto"
              />
              <span className="text-lg font-medium tracking-[-0.02em]">{dict.brand}</span>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 max-w-2xl text-sm font-medium leading-6 text-muted-foreground transition-colors hover:text-foreground"
            >
              {dict.footer.emailCta}
            </a>

        <div className="mt-7 flex justify-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-foreground transition-colors hover:bg-white"
          >
            <Mail className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-foreground transition-colors hover:bg-white"
          >
            <Send className="h-5 w-5" aria-hidden />
          </a>
        </div>

        </div>

        <div className="mt-10 border-t border-foreground/10 pt-6 text-center text-xs text-muted-foreground">
          <p>
            {year} Plynule česky · Kateryna Leshchenko, IČO 23255765 ·{" "}
            <a href={CANCELLATION_HREF} className="underline underline-offset-4">
              {dict.footer.termsLabel}
            </a>
            {" · "}
            <a href={PRIVACY_HREF} className="underline underline-offset-4">
              {dict.footer.privacyLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
