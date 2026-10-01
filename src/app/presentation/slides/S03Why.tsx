import { Lines, Rise, Slide, SlideBody, SlideFooter, SlideMark } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 03 — why Qeet exists.
 *
 * One comparison, built as one: two questions, one dimmed and one not. The
 * dimming does the work a paragraph would otherwise have to do — the eye
 * reads the hierarchy before the words, and understands that Qeet starts one
 * step earlier than the question above it.
 *
 * No arrow between them. An arrow would suggest the first question is wrong;
 * it is not wrong, it is just second.
 *
 * The closing line is stated as Qeet's BELIEF. This slide used to carry a
 * pull quote about why "most great companies fail", which is a claim about
 * the world that no source supports. A conviction can be held without one.
 */
export function S03Why({ index }: SlideProps) {
  return (
    <Slide>
      <SlideMark index={index} label="Why Qeet exists" />

      <SlideBody>
        <Rise>
          <p className="deck-label font-mono text-ink-subtle">Most organisations begin here</p>
          <p className="deck-display-s mt-[1.2cqw] font-display text-ink-subtle">
            What should we build?
          </p>
        </Rise>

        <Rise delay={0.24} className="mt-[4.4cqw]">
          <p className="deck-label font-mono text-ink-muted">Qeet begins one step earlier</p>
        </Rise>
        <Lines
          as="h2"
          delay={0.34}
          lines={["What problem", "actually matters?"]}
          accentIndex={1}
          className="deck-display mt-[1.2cqw] font-display text-ink"
        />
      </SlideBody>

      <SlideFooter delay={0.75}>
        We believe execution cannot rescue the wrong problem.
      </SlideFooter>
    </Slide>
  );
}
