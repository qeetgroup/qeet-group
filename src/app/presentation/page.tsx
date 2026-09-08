import type { Metadata } from "next";
import { listProductSummaries } from "@/lib/content";
import { Deck } from "./Deck";
import "./deck.css";

/**
 * The corporate presentation.
 *
 * Unlisted, in the same way `/design` is unlisted: noindex here, disallowed in
 * robots.ts, absent from the sitemap by construction, and in neither the nav
 * nor the footer. It is a working artefact for a room, not a page for the
 * public — and a corporate deck that turns up in search results is a deck that
 * gets quoted six months out of date.
 *
 * The products come from the real MDX collection, so the one slide that names
 * them cannot drift from qeet.in. There is no second portfolio list in this
 * directory, and no lifecycle status is written down here.
 */
export const metadata: Metadata = {
  title: "Presentation",
  description: "Internal corporate presentation for Qeet Group.",
  robots: { index: false, follow: false },
};

export default async function PresentationPage() {
  const products = await listProductSummaries();
  return <Deck products={products} />;
}
