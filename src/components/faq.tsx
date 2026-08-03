import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqItems } from "@/lib/faq";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

export function Faq({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items = getFaqItems(locale);

  return (
    <section id="faq" className="section-shell scroll-mt-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="section-title">{dict.faq.heading}</h2>
        </div>

        <Accordion type="single" collapsible className="mt-14 space-y-3">
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="rounded-[2rem] border-0 bg-card px-7 md:px-10"
            >
              <AccordionTrigger
                data-testid={`faq-question-${index}`}
                className="py-7 text-base font-medium tracking-[-0.01em] hover:no-underline md:text-lg"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-7 text-base font-medium leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
