import { ogTemplate, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/seo/og-template";
import { portfolioCounts } from "@/lib/content";

export const alt = "Qeet Group — one organisation, one ecosystem";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  // Derived, not written. A social card is the single worst place for a stale
  // number: it is cached by every platform that scrapes it and outlives any
  // correction made here.
  const { total } = await portfolioCounts();

  return ogTemplate({
    // Not "Qeet Group" — the wordmark already sits above it. The eyebrow
    // carries the philosophy the organisation actually publishes.
    eyebrow: "Question · Explore · Envision · Transform",
    headline: `One organisation. ${total} products. One way in.`,
  });
}
