import type { Metadata } from "next";
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
 * The deck's portfolio lives in `./portfolio.ts`, in the organisation's status
 * vocabulary, and `slides.test.tsx` keeps it in step with the products
 * qeet.in publishes.
 */
export const metadata: Metadata = {
  title: "Presentation",
  description: "Internal corporate presentation for Qeet Group.",
  robots: { index: false, follow: false },
};

export default function PresentationPage() {
  return <Deck variant="master" />;
}
