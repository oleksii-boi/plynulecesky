import Link from "next/link";
import { CalendarClock, CreditCard } from "lucide-react";

// Czech-only by decision — same pattern as /cs/terms/. Both locale
// footers link here directly; there is no per-locale variant.
export function generateStaticParams() {
  return [{ locale: "cs" }];
}

export const metadata = {
  title: "Podmínky zrušení",
  description: "Zásady zrušení lekcí a vrácení peněz — Plynule česky.",
  alternates: {
    canonical: "https://plynulecesky.cz/cs/cancellation/",
  },
};

const CONTACT_EMAIL_LEGAL = "kateryna@plynulecesky.cz";

export default function CancellationPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <Link
        href="/cs/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Plynule česky
      </Link>

      <h1 className="mt-12 max-w-3xl text-5xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground md:text-7xl">
        Podmínky zrušení
      </h1>

      <section className="mt-14 rounded-[2rem] bg-card p-8 md:p-10">
        <div className="flex items-center gap-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-background">
            <CalendarClock className="size-5" aria-hidden />
          </span>
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-foreground">
            Zrušení a přesunutí lekce
          </h2>
        </div>
        <ul className="mt-7 list-disc space-y-3 pl-5 font-medium leading-7 text-muted-foreground">
          <li>Zrušení nebo přesunutí nejpozději 24 hodin před lekcí je zdarma.</li>
          <li>
            Zrušení méně než 24 hodin předem — lekce se považuje za odučenou, peníze se
            nevrací.
          </li>
          <li>Neomluvená absence — lekce se považuje za odučenou.</li>
          <li>Přesunutí po vzájemné dohodě je možné kdykoli.</li>
        </ul>
      </section>

      <section className="mt-5 rounded-[2rem] bg-card p-8 md:p-10">
        <div className="flex items-center gap-4">
          <span className="flex size-11 items-center justify-center rounded-full bg-background">
            <CreditCard className="size-5" aria-hidden />
          </span>
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-foreground">
            Vrácení peněz
          </h2>
        </div>
        <ul className="mt-7 list-disc space-y-3 pl-5 font-medium leading-7 text-muted-foreground">
          <li>
            Zaplacené, ale neodučené lekce (při dodržení podmínek zrušení výše) se vrací do 7
            pracovních dnů na platební kartu, kterou byla provedena platba.
          </li>
          <li>
            Technické problémy na straně lektorky: lekce se přesune, nebo se peníze vrátí v
            plné výši.
          </li>
          <li>Za již odučené lekce se peníze nevrací.</li>
        </ul>
      </section>

      <p className="mt-8 rounded-2xl bg-background px-6 py-5 text-sm font-medium text-muted-foreground">
        Pro řešení otázek ohledně plateb kontaktujte:{" "}
        <a
          href={`mailto:${CONTACT_EMAIL_LEGAL}`}
          className="underline underline-offset-4"
        >
          {CONTACT_EMAIL_LEGAL}
        </a>
      </p>
    </main>
  );
}
