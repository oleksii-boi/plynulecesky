# Plynule česky — website rebuild

Bilingual (Ukrainian default / Czech) marketing site for Kateryna Leshchenko's
Czech-language tutoring business. Next.js static export, deployed to GitHub
Pages at the custom domain `plynulecesky.cz`. Built section-by-section per
`plynule-cesky-execution-plan.md` (the vertical-slice plan this repo
implements).

## Status

Slice 0 (scaffolding) is in place: project structure, static-export/i18n
routing plumbing, testing setup, and the GitHub Pages deploy workflow.
Content sections (about, specialization cards, testimonials, pricing, FAQ,
etc.) land in subsequent slices — see the plan doc for the full list and
what's done so far.

**This scaffold was authored without network access to npm or GitHub** (the
build environment it was written in blocks those registries), so it has
**not yet been `npm install`'d, built, or test-run anywhere**. Treat the
first `npm ci && npm run build` locally or in CI as the real verification
step for Slice 0 — please report back anything that doesn't come up clean
so it can be fixed before building on top of it.

## Getting started

```bash
npm install

npm run dev                  # dev server — visit /uk or /cs directly.
                              # "/" only resolves to the uk build after a
                              # full `npm run build` (see below), since the
                              # default-locale-at-root trick is a postbuild
                              # static-file copy, not a dev-server route.
```

## Building & testing

```bash
npm run lint
npm run typecheck
npm test          # unit tests (Vitest + React Testing Library)
npm run build      # next build (static export) + postbuild default-locale copy
npm run e2e         # Playwright smoke tests against the real out/ export
```

All four are what CI runs on every push/PR (`.github/workflows/deploy.yml`);
on `main` it also deploys `out/` to GitHub Pages.

## Why the `/` → `/uk/` trick

GitHub Pages serves static files only — no server, no middleware, no
request-time redirects. Locale routing lives entirely under
`src/app/[locale]/...` with `generateStaticParams(['uk', 'cs'])`, which
produces `/uk/` and `/cs/` as fully independent static HTML documents (each
with its own correct `<html lang>`). To make `/` itself serve the Ukrainian
(default-locale) version without a redirect, `scripts/postbuild-default-locale.mjs`
copies `out/uk/*` up to `out/` after every build. `/uk/` keeps working too;
`/cs/` is untouched. See `src/lib/i18n/locales.ts` for the routing helpers.

## Project structure

```
src/
  app/
    [locale]/           # root layout lives here (only place allowed to
      layout.tsx         # render <html>/<body>) — generateStaticParams
      page.tsx            # produces /uk/ and /cs/
    globals.css
  components/
    ui/                  # shadcn/ui primitives (plain source, not a dependency)
    language-switcher.tsx
  lib/
    i18n/
      locales.ts         # locale list, default locale, path-swap helper
      dictionaries.ts     # per-locale copy, extended slice by slice
    utils.ts
scripts/
  postbuild-default-locale.mjs
tests/
  unit/                  # Vitest + Testing Library
  e2e/                   # Playwright, runs against the real static export
.github/workflows/deploy.yml
public/CNAME              # plynulecesky.cz
```

## Deployment

Repo → Settings → Pages → Source: "GitHub Actions" (the workflow handles
the rest). See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full DNS
cutover steps, rollback plan, and legacy-URL compatibility notes.
