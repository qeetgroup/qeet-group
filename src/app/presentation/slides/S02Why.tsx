import { Lines, PullQuote, Rise, SlideMark } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 02 — why Qeet exists.
 *
 * The whole slide is one comparison, so it is built as one: two questions, the
 * same size, one dimmed and one not. Setting the first in `ink-subtle` does
 * the work a paragraph of explanation would otherwise have to do — the eye
 * reads the hierarchy before it reads the words, and understands that Qeet
 * starts one step earlier than the question above it.
 *
 * No arrow between them. An arrow would suggest the first question is wrong;
 * it is not wrong, it is just second.
 */
export function S02Why({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Why Qeet exists" />

      <div className="grid-editorial">
        <div className="col-wide">
          <Rise>
            <p className="deck-label font-mono text-ink-subtle">
              Most organisations begin here
            </p>
            <p className="deck-display-s mt-[1.4cqw] font-display text-ink-subtle">
              What should we build?
            </p>
          </Rise>

          <Rise delay={0.24} className="mt-[4cqw]">
            <p className="deck-label font-mono text-ink-subtle">Qeet begins here</p>
          </Rise>

          <Lines
            as="h2"
            delay={0.34}
            lines={["What problem", "actually matters?"]}
            accentIndex={1}
            className="deck-display mt-[1.4cqw] font-display text-ink"
          />
        </div>
      </div>

      <div className="grid-editorial">
        <PullQuote
          delay={0.7}
          className="col-lede"
          source="Introducing Qeet Group"
        >
          Most great companies fail not because the execution was wrong, but
          because the original question was too small.
        </PullQuote>
      </div>
    </div>
  );
}
