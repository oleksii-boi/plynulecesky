import Link from "next/link";

// Czech-only by decision — this route is only ever generated for the
// "cs" locale (see generateStaticParams below), regardless of how the
// visitor got here. Both the uk and cs footers link to /cs/terms/
// directly rather than there being a per-locale version of this page.
export function generateStaticParams() {
  return [{ locale: "cs" }];
}

export const metadata = {
  title: "Podmínky ochrany osobních údajů",
  description:
    "Zásady zpracování osobních údajů podle GDPR — Plynule česky, Kateryna Leshchenko.",
  alternates: {
    // Overrides the layout's default canonical (which would otherwise
    // resolve to "/cs/", the homepage) — this page has no uk/other-locale
    // equivalent, so no hreflang "languages" block is set here.
    canonical: "https://plynulecesky.cz/cs/terms/",
  },
};

const CONTACT_EMAIL_LEGAL = "kateryna@plynulecesky.cz";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/cs/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Plynule česky
      </Link>

      <h1 className="mt-12 text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-6xl">
        Podmínky ochrany osobních údajů
      </h1>

      <div className="mt-14 space-y-12 font-medium leading-7 text-muted-foreground">
        <section>
          <h2 className="text-xl tracking-[-0.02em] text-foreground md:text-2xl">
            I. Základní ustanovení
          </h2>
          <div className="mt-5 space-y-4">
            <p>
              Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a
              Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním
              osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR“) je Kateryna
              Leshchenko IČO 23255765 se sídlem Výchozí 21/3, Podolí, 147 00 Praha zapsaná
              v živnostenském rejstříku vedeném Městským úřadem pro hlavní město Praha (dále
              jen: „správce“).
            </p>
            <p>
              Kontaktní údaje správce jsou:
              <br />
              e-mail:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL_LEGAL}`}
                className="underline underline-offset-4"
              >
                {CONTACT_EMAIL_LEGAL}
              </a>
            </p>
            <p>
              Osobními údaji se rozumí veškeré informace o identifikované nebo
              identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je
              fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na
              určitý identifikátor, například jméno, identifikační číslo, lokační údaje,
              síťový identifikátor nebo na jeden či více zvláštních prvků fyzické,
              fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské
              identity této fyzické osoby.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl tracking-[-0.02em] text-foreground md:text-2xl">
            II. Zdroje a kategorie zpracovávaných osobních údajů
          </h2>
          <div className="mt-5 space-y-4">
            <p>
              Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje,
              které správce získal na základě plnění Vaší objednávky:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>jméno a příjmení</li>
              <li>e-mailová adresa</li>
              <li>fyzická adresa</li>
              <li>telefonní číslo</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl tracking-[-0.02em] text-foreground md:text-2xl">
            III. Zákonný důvod a účel zpracování osobních údajů
          </h2>
          <div className="mt-5 space-y-4">
            <p>Zákonným důvodem zpracování osobních údajů je</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,
              </li>
              <li>
                oprávněný zájem správce na poskytování přímého marketingu (zejména pro
                zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f)
                GDPR,
              </li>
              <li>
                Váš souhlas se zpracováním pro účely poskytování přímého marketingu
                (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1
                písm. a) GDPR ve spojení s § 7 odst. 2 zákona č. 480/2004 Sb., o některých
                službách informační společnosti v případě, že nedošlo k objednávce zboží
                nebo služby.
              </li>
            </ul>
            <p>Účelem zpracování osobních údajů je</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze
                smluvního vztahu mezi Vámi a správcem; při objednávce jsou vyžadovány
                osobní údaje, které jsou nutné pro úspěšné vyřízení objednávky (jméno a
                adresa, kontakt), poskytnutí osobních údajů je nutným požadavkem pro
                uzavření a plnění smlouvy, bez poskytnutí osobních údajů není možné
                smlouvu uzavřít či jí ze strany správce plnit,
              </li>
              <li>plnění právních povinností vůči státu,</li>
              <li>zasílání obchodních sdělení a činění dalších marketingových aktivit.</li>
            </ul>
            <p>
              Ze strany správce nedochází k automatickému individuálnímu rozhodování ve
              smyslu čl. 22 GDPR.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl tracking-[-0.02em] text-foreground md:text-2xl">
            IV. Doba uchovávání údajů
          </h2>
          <div className="mt-5 space-y-4">
            <p>Správce uchovává osobní údaje</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního
                vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů
                (po dobu 5 let od ukončení smluvního vztahu).
              </li>
              <li>
                po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely
                marketingu, nejdéle 5 let, jsou-li osobní údaje zpracovávány na základě
                souhlasu.
              </li>
            </ul>
            <p>
              Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl tracking-[-0.02em] text-foreground md:text-2xl">
            V. Příjemci osobních údajů (subdodavatelé správce)
          </h2>
          <div className="mt-5 space-y-4">
            <p>Příjemci osobních údajů jsou osoby</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                podílející se na dodání zboží/služeb/realizaci plateb na základě smlouvy,
              </li>
              <li>
                zajišťující služby provozování e-shopu (Shoptet) a další služby v
                souvislosti s provozováním e-shopu,
              </li>
              <li>zajišťující marketingové služby.</li>
            </ul>
            <p>
              Správce nemá v úmyslu předat osobní údaje do třetí země (do země mimo EU)
              nebo mezinárodní organizaci.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
