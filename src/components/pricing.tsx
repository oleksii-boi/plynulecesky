import { Button } from "@/components/ui/button";
import { BOOKING_LINKS } from "@/lib/contact";
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

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] bg-card p-6 md:p-10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-foreground/10">
                <th scope="col" className="py-4 pr-4" />
                <th
                  scope="col"
                  className="w-24 py-4 px-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground md:w-32 md:text-sm"
                >
                  {p.columns.min60}
                </th>
                <th
                  scope="col"
                  className="w-24 py-4 pl-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground md:w-32 md:text-sm"
                >
                  {p.columns.min90}
                </th>
              </tr>
            </thead>
            <tbody>
              {p.rows.map((row) => {
                const rates = RATES[row.key];
                return (
                  <tr
                    key={row.key}
                    className="border-b border-foreground/10 last:border-0"
                  >
                    <th
                      scope="row"
                      className="py-5 pr-4 text-left text-sm font-medium leading-6 md:text-base"
                    >
                      {row.label}
                      {row.note ? (
                        <span className="block text-xs font-normal text-muted-foreground md:inline md:text-sm md:before:content-['_·_']">
                          {row.note}
                        </span>
                      ) : null}
                    </th>
                    <td className="py-5 px-3 text-right text-lg font-medium tracking-[-0.02em] md:text-xl">
                      {formatCurrency(rates.min60, locale)}
                    </td>
                    <td className="py-5 pl-3 text-right text-lg font-medium tracking-[-0.02em] md:text-xl">
                      {formatCurrency(rates.min90, locale)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-5 flex max-w-3xl flex-col items-center gap-6 rounded-[2rem] bg-[var(--powder)] p-6 text-center md:flex-row md:justify-between md:p-10 md:text-left">
          <div>
            <p className="text-lg font-medium tracking-[-0.01em] md:text-xl">
              {p.trialLabel}
            </p>
            <p className="mt-1 text-3xl font-medium tracking-[-0.03em]">
              {formatCurrency(RATES.trial.min45, locale)}
            </p>
          </div>
          <Button asChild size="lg">
            <a href={BOOKING_LINKS.trial} target="_blank" rel="noreferrer">
              {p.ctaLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
