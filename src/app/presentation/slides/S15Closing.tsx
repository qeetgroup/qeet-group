import { Wordmark } from "@/components/ui/Wordmark";
import { SITE_ORIGIN } from "@/config/site";
import { Lines, Rise, Rule } from "./primitives";

/**
 * Slide 15 — closing.
 *
 * Deliberately the mirror of slide 01: same ambient grid, same wordmark, same
 * restraint. The opening slide set the four words as a name; this one sets
 * them as four separate statements, one per line, at the largest type in the
 * deck. Same words, and by this point they should mean something different.
 *
 * No call to action, no contact grid, no next steps. The room is the call to
 * action — a slide asking for a follow-up meeting is asking the wall to do the
 * presenter's job.
 */
const WORDS = ["Question.", "Explore.", "Envision.", "Transform."];

export function S15Closing() {
  return (
    <div className="deck-slide justify-between">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] mask-[radial-gradient(ellipse_78%_70%_at_72%_82%,black,transparent_74%)]"
      />
      <div aria-hidden="true" className="bg-grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <Rise>
          <Wordmark href={null} />
        </Rise>
      </div>

      <div className="relative">
        <Lines
          as="h2"
          lines={WORDS}
          className="deck-display font-display text-ink"
        />
      </div>

      <div className="relative max-w-[54cqw]">
        <Rule delay={0.7} />
        <Rise delay={0.82} className="mt-[2cqw]">
          <p className="deck-heading-s font-display text-ink-muted">
            It is not just what Qeet stands for. It is how Qeet intends to
            work.
          </p>
          <p className="deck-label mt-[2cqw] font-mono text-ink-subtle">
            {SITE_ORIGIN.replace(/^https?:\/\//, "")}
          </p>
        </Rise>
      </div>
    </div>
  );
}
