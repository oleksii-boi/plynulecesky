import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mailtoHref } from "@/lib/contact";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function BookingFallback({ dict }: { dict: Dictionary }) {
  const content = dict.gettingStarted;
  const href = mailtoHref(content.fallbackHeading, content.fallbackBody);

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

        <Button asChild size="lg" className="w-fit shrink-0">
          <a href={href}>{content.fallbackCta}</a>
        </Button>
      </div>
    </section>
  );
}
