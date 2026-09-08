import type { ProductSummary } from "@/lib/content/types";

/**
 * Every slide takes the same props, whether or not it uses them.
 *
 * `products` is loaded once on the server from the real MDX collection and
 * threaded through, so the one slide that names products cannot fall out of
 * step with qeet.in: there is no second list to maintain and no copy of a
 * lifecycle status living in the deck.
 */
export type SlideProps = {
  /** One-based position in the deck, for the slide marker. */
  index: number;
  products: ProductSummary[];
};

export type Slide = {
  /** Stable id, used in the notes panel and the tests. */
  id: string;
  /** Short title for the slide marker and the presenter view. */
  label: string;
  Component: (props: SlideProps) => React.ReactNode;
  /** Spoken material — 45 to 90 seconds. Never a reading of the slide. */
  notes: string;
};
