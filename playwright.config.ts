import { defineConfig } from "@playwright/test";

// Serves the actual static export output (out/) so tests run against
// exactly what GitHub Pages will serve — not the Next.js dev server,
// which doesn't have "/" -> uk default-locale copy applied.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  webServer: {
    command: "npx serve out -l 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  use: {
    baseURL: "http://localhost:4173",
  },
});
