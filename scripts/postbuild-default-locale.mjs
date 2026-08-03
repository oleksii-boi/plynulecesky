// GitHub Pages has no server, so there is no way to redirect "/" -> "/uk/"
// at request time. Instead, after `next build` (static export) produces
// out/uk/... and out/cs/..., this script copies the contents of out/uk/
// up to the site root so that "/" serves byte-identical Ukrainian HTML,
// while "/uk/" keeps working too and "/cs/" is untouched.
//
// Run automatically via the "postbuild" npm script.

import { cp, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const defaultLocaleDir = path.join(outDir, "uk");

async function main() {
  if (!existsSync(outDir)) {
    throw new Error(`Expected static export output at ${outDir} — did "next build" run first?`);
  }
  if (!existsSync(defaultLocaleDir)) {
    throw new Error(
      `Expected default-locale output at ${defaultLocaleDir} — check generateStaticParams() includes "uk".`
    );
  }

  const entries = await readdir(defaultLocaleDir, { withFileTypes: true });

  for (const entry of entries) {
    const src = path.join(defaultLocaleDir, entry.name);
    const dest = path.join(outDir, entry.name);
    await cp(src, dest, { recursive: true });
  }

  console.log(`postbuild: copied out/uk/* -> out/ (default locale = uk)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
