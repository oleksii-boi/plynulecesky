import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mailtoHref, SOCIAL_LINKS } from "@/lib/contact";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function BookingFallback({ dict }: { dict: Dictionary }) {
  const content = dict.gettingStarted;
  const href = mailtoHref(content.fallbackEmailSubject);

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 md:pb-28">
      <div className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] bg-[var(--lavender)] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10 lg:p-12">
        <div className="max-w-2xl">
          <Mail className="size-6 stroke-[1.5] text-accent" aria-hidden />
          <h2 className="mt-6 text-2xl font-medium leading-tight tracking-[-0.02em] md:text-3xl">
            {content.fallbackHeading}
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-muted-foreground">
            {content.fallbackBody}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3">
          <Button asChild size="lg" className="w-full justify-start gap-2">
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer">
              <Send className="size-5 stroke-[1.5]" aria-hidden />
              {content.fallbackTelegramCta}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full justify-start gap-2">
            <a href={href}>
              <Mail className="size-5 stroke-[1.5]" aria-hidden />
              {content.fallbackCta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
