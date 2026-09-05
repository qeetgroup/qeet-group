/**
 * Date formatting.
 *
 * Content frontmatter carries date-only strings (`2026-04-15`), which
 * `new Date()` parses as UTC midnight. Formatting that without pinning the
 * timezone renders the *previous* day for any viewer west of UTC — and since
 * the site is statically generated, the build machine's timezone decides it
 * for everyone. A US-region build made every published date on the site a day
 * early.
 *
 * Pinning to UTC keeps the rendered date identical to what the author wrote,
 * everywhere, and removes the server/client hydration mismatch that a
 * locale-dependent format would otherwise cause.
 */
const LONG = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const SHORT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** "April 15, 2026" */
export function formatDate(iso: string): string {
  return LONG.format(new Date(iso));
}

/** "Apr 15, 2026" — for dense rows and metadata. */
export function formatDateShort(iso: string): string {
  return SHORT.format(new Date(iso));
}
