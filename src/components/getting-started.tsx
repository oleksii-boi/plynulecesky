import type { Dictionary } from "@/lib/i18n/dictionaries";

export function GettingStarted({ dict }: { dict: Dictionary }) {
  const gs = dict.gettingStarted;

  return (
    <section id="getting-started" className="section-shell -scroll-mt-20 md:-scroll-mt-28 lg:-scroll-mt-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">{gs.heading}</h2>
      </div>

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {gs.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative border-t border-foreground/15 pt-6 text-card-foreground"
          >
            <span
              aria-hidden
              className="text-sm font-medium text-accent"
              data-testid={`step-number-${index + 1}`}
            >
              0{index + 1}
            </span>
            <h3 className="mt-8 text-xl font-medium tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

    </section>
  );
}
