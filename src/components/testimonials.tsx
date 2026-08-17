import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTestimonials } from "@/lib/testimonials";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

export function Testimonials({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { items, isPlaceholder } = getTestimonials(locale);
  return (
    <section
      id="testimonials"
      className="overflow-hidden -scroll-mt-20 md:-scroll-mt-28 lg:-scroll-mt-32"
    >
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">{dict.testimonials.heading}</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Card
              key={item.name}
              data-placeholder={isPlaceholder || undefined}
              className={cn(
                "min-h-[300px]",
                index === 1 ? "bg-[var(--powder)]" : "bg-card"
              )}
            >
              <CardContent className="flex h-full min-h-[300px] flex-col p-8 md:p-10">
                <Quote className="size-7 stroke-[1.5] text-accent" aria-hidden />
                <p className="mt-8 flex-1 text-base font-medium leading-7 text-muted-foreground md:text-lg">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-8 border-t border-foreground/10 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-background text-sm font-medium text-foreground">
                      {item.name.slice(0, 1)}
                    </span>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
