import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="section-shell scroll-mt-28">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-[var(--lavender)]">
          <div className="absolute -right-12 -top-12 size-52 rounded-full bg-white/55" />
          <div className="absolute bottom-[-4rem] left-[-3rem] size-64 rounded-full bg-[#e4ccff]" />
          <Image
            src="/images/kateryna.png"
            alt={dict.about.photoAlt}
            fill
            sizes="(min-width: 1024px) 440px, 100vw"
            className="z-10 origin-bottom scale-[1.18] object-contain object-bottom"
          />
        </div>

        <div className="paper-card p-8 md:p-10 lg:p-12">
          <h2 className="text-4xl font-medium leading-[1.08] tracking-[-0.02em] md:text-5xl">
            {dict.about.heading}
          </h2>

          <div className="mt-7 space-y-4 text-base font-medium leading-7 text-muted-foreground">
            {dict.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-9 text-base font-medium text-foreground">
            {dict.about.credentialsHeading}
          </h3>
          <ul className="mt-3 space-y-2">
            {dict.about.credentials.map((credential) => (
              <li
                key={credential}
                className="flex gap-3 rounded-2xl bg-background/75 p-4 text-sm font-medium leading-6 text-card-foreground"
              >
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
