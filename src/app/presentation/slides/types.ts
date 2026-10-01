import type { SlideId } from "./notes";

/**
 * Every slide takes the same props, whether or not it uses them.
 *
 * Slides no longer receive the site's product list: the deck speaks the
 * organisation's status vocabulary, so its portfolio comes from
 * `../portfolio.ts`, and a test keeps that list in step with qeet.in.
 */
export type SlideProps = {
  /** One-based position in the running deck, for the slide marker. */
  index: number;
};

export type Slide = {
  /** Stable id, used in the notes panel and the tests. */
  id: SlideId;
  /** Short title for the slide marker and the presenter view. */
  label: string;
  Component: (props: SlideProps) => React.ReactNode;
  /** Spoken material — about a minute. Never a reading of the slide. */
  notes: string;
  /** What the presenter must not claim on this slide. Never projected. */
  caution: string;
};
