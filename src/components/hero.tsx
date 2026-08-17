import { Button } from "@/components/ui/button";
import { BOOKING_LINKS } from "@/lib/contact";
import { TrustStrip } from "@/components/trust-strip";
import { GraduationCap, Languages, MapPin } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  const trustIcons = [GraduationCap, Languages, MapPin];

  return (
    <section id="hero" aria-label="Hero" className="overflow-hidden">
      <div className="section-shell pb-14 pt-16 text-center md:pt-24">
        <h1 className="mx-auto max-w-6xl text-balance text-6xl font-medium leading-[0.98] tracking-[-0.045em] text-foreground sm:text-7xl md:text-8xl lg:text-[108px]">
          {dict.hero.heading}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-7 text-muted-foreground md:text-xl">
          {dict.hero.subheading}
        </p>

        <Button asChild size="lg" className="mt-9">
          <a href={BOOKING_LINKS.trial} target="_blank" rel="noreferrer">
            {dict.hero.ctaPrimary}
          </a>
        </Button>

        <TrustStrip
          className="mt-12 text-left"
          items={dict.hero.stats.map((stat, index) => {
            const Icon = trustIcons[index]!;
            return {
              icon: <Icon className="size-5 stroke-[1.5]" aria-hidden />,
              title: stat.value,
              description: stat.label,
            };
          })}
        />

        <div
          className="iris-frame relative mx-auto mt-16 h-[300px] max-w-4xl overflow-hidden rounded-[5.5rem] bg-background md:h-[380px]"
          aria-hidden
        >
          <div className="absolute left-[8%] top-[18%] h-20 w-40 -rotate-6 rounded-full bg-[var(--lavender)] shadow-[inset_-10px_-12px_24px_rgba(112,73,145,0.12),0_16px_28px_rgba(80,120,160,0.09)] md:h-28 md:w-56" />
          <div className="absolute bottom-[-36px] left-[18%] h-44 w-56 rotate-6 rounded-[2rem] bg-white p-7 text-left shadow-[0_18px_40px_rgba(4,69,144,0.12)] md:h-56 md:w-72 md:p-9">
            <div className="mb-6 h-2 w-20 rounded-full bg-[var(--powder)]" />
            <p className="text-4xl font-medium tracking-[-0.04em] md:text-5xl">Ahoj!</p>
            <div className="mt-7 space-y-3">
              <div className="h-2 rounded-full bg-[#e9edf0]" />
              <div className="h-2 w-4/5 rounded-full bg-[#e9edf0]" />
            </div>
          </div>
          <div className="absolute right-[16%] top-[16%] size-28 -rotate-6 rounded-[2.25rem] bg-[#2f8df4] shadow-[inset_-12px_-14px_22px_rgba(0,65,150,0.18),0_18px_30px_rgba(0,105,224,0.18)] md:size-40">
            <span className="absolute left-[28%] top-[38%] size-2 rounded-full bg-white md:size-3" />
            <span className="absolute right-[28%] top-[38%] size-2 rounded-full bg-white md:size-3" />
            <span className="absolute bottom-[28%] left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-2 border-white md:w-10" />
          </div>
          <div className="absolute bottom-[12%] right-[7%] h-14 w-44 rotate-[-14deg] rounded-full bg-[var(--peach)] shadow-[inset_-10px_-8px_16px_rgba(170,93,45,0.12),0_14px_26px_rgba(80,120,160,0.08)] md:h-20 md:w-64" />
          <div className="absolute right-[28%] top-[8%] size-5 rounded-full bg-[var(--solar)] md:size-8" />
          <div className="absolute bottom-[22%] left-[8%] size-10 rounded-full bg-[var(--mint)] md:size-16" />
        </div>
      </div>
    </section>
  );
}
