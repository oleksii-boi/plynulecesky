import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TrustItem {
  icon: ReactNode;
  title: string;
  description?: string;
}

interface TrustStripProps {
  items: TrustItem[];
  className?: string;
}

export function TrustStrip({ items, className }: TrustStripProps) {
  return (
    <section className={cn("py-6", className)}>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="mx-auto flex w-full max-w-[260px] items-center gap-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-foreground">
                {item.icon}
              </div>
              <div>
                <p className="font-medium leading-tight">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
