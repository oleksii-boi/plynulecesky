import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Landmark, MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const icons = [Landmark, GraduationCap, MessagesSquare];
const tileColors = ["bg-[var(--lavender)]", "bg-card", "bg-[var(--peach)]"];
const iconColors = [
  "bg-background",
  "bg-background",
  "bg-background",
];

// Not a top-level nav item (matches the mockup, where this sits as a
// content block right after "about" rather than its own nav entry) but
// still gets a stable id for deep-linking/testing.
export function Specialization({ dict }: { dict: Dictionary }) {
  return (
    <section id="specialization" className="section-shell -scroll-mt-20 md:-scroll-mt-28 lg:-scroll-mt-32">
      {/* Old live site's nav had "Методика" (#method) pointing at roughly
          this content — kept as a zero-height anchor so old #method links
          still land in the right place instead of a dead jump-to-top. */}
      <span id="method" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">{dict.specialization.heading}</h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {dict.specialization.items.map((item, index) => {
          const Icon = icons[index]!;
          return (
          <Card
            key={item.title}
            className={cn(
              "group min-h-[340px] overflow-hidden transition-transform duration-500 hover:-translate-y-1",
              tileColors[index]
            )}
          >
            <CardHeader className="h-full justify-between p-8 md:p-10">
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-full text-foreground",
                  iconColors[index]
                )}
              >
                <Icon className="size-6 stroke-[1.5]" aria-hidden />
              </span>
              <div className="mt-16">
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription className="mt-4 text-sm font-medium leading-6">
                  {item.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
