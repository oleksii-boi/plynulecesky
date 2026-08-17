// Single source of truth for contact details / external booking links, so
// they're not duplicated (and risk drifting) across the getting-started,
// pricing, and footer sections. Values carried over as-is from the live
// site (plynulecesky.cz) per the "keep the existing booking system"
// decision.

export const CONTACT_EMAIL = "kateryna@plynulecesky.com";

export const BOOKING_LINKS = {
  trial: "https://calendar.app.google/s6tMV1CSoJVgXVEM8",
  min60: "https://calendar.app.google/MZMuwNBTZpcWH4tp6",
  min90: "https://calendar.app.google/PAgVAsUEwPv2jL448",
} as const;

// TODO: the mockup shows Telegram/Instagram icons in the footer but no
// handle was captured from the source material — swap these placeholders
// for the real profile URLs before launch.
export const SOCIAL_LINKS = {
  telegram: "https://t.me/plynulecesky",
  instagram: "https://instagram.com/plynulecesky",
} as const;

export function mailtoHref(subject: string): string {
  const params = new URLSearchParams({ subject });
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}
