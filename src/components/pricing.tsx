import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RATES, formatCurrency } from "@/lib/pricing";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

export function Pricing({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.pricing;

  return (
    <section id="pricing" className="scroll-mt-28">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">{p.heading}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-7 text-muted-foreground">
            {p.subheading}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {p.tiers.map((tier, tierIndex) => {
            const rates = RATES[tier.key];
            return (
              <article
                key={tier.key}
                className={cn(
                  "flex h-full flex-col rounded-[2rem] p-8 md:p-10",
                  tierIndex === 0 ? "bg-card" : "bg-[var(--powder)]"
                )}
              >
                <div>
                  <p className="text-xs font-medium text-muted-foreground">0{tierIndex + 1}</p>
                  <h3 className="mt-8 text-3xl font-medium tracking-[-0.02em]">{tier.title}</h3>
                  <p className="mt-4 max-w-md text-sm font-medium leading-6 text-muted-foreground">
                    {tier.note}
                  </p>
                </div>

                <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
                  {(["min60", "min90"] as const).map((duration, index) => {
                    const booking = dict.gettingStarted.bookingCtas[index]!;
                    return (
                      <div
                      key={duration}
                      className="flex items-center justify-between gap-4 py-6"
                    >
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {p.durationLabels[duration]}
                          </p>
                          <p className="mt-1 text-3xl font-medium tracking-[-0.03em]">
                            {formatCurrency(rates[duration], locale)}
                          </p>
                        </div>
                        <a
                          href={booking.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={booking.label}
                          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-[#262c37]"
                        >
                          <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-7 text-sm font-medium text-muted-foreground">
                  {p.discountHeading}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-5 max-w-5xl rounded-2xl bg-white/60 px-6 py-5 text-center text-sm font-medium text-muted-foreground">
          {p.discountNote}
        </div>
      </div>
    </section>
  );
}
