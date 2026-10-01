import { Wordmark } from "@/components/ui/Wordmark";
import { SITE_ORIGIN } from "@/config/site";
import { QEET } from "./canon";
import { Lines, Rise, Rule, Slide } from "./primitives";

/**
 * Slide 15 — closing.
 *
 * Deliberately the mirror of slide 01: same ambient grid, same wordmark, same
 * restraint. The opening set the four words as a name; this sets them as four
 * separate statements, one per line. Same words, and by now they should mean
 * something different.
 *
 * No call to action, no contact grid, no next steps. The room is the call to
 * action — a slide asking for a follow-up meeting is asking the wall to do the
 * presenter's job.
 */
const WORDS = QEET.map((p) => `${p.word}.`);

export function S15Closing() {
  return (
    <Slide className="justify-between">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.28] mask-[radial-gradient(ellipse_78%_70%_at_72%_82%,black,transparent_74%)]"
      />
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_78%_70%_at_72%_82%,black,transparent_74%)]"
      />

      <div className="relative">
        <Rise>
          <Wordmark href={null} className="gap-[0.8cqw] text-[2.2cqw]" />
        </Rise>
      </div>

      <div className="relative">
        <Lines as="h2" lines={WORDS} className="deck-display font-display text-ink" />
      </div>

      <div className="relative max-w-[60cqw]">
        <Rule delay={0.7} className="bg-rule-strong" />
        <Rise delay={0.82} className="mt-[2cqw]">
          <p className="deck-heading-s font-display text-ink-muted">
            It is not simply what Qeet stands for.
            <br />
            <span className="text-ink">It is how Qeet thinks, builds, learns and moves forward.</span>
          </p>
          <p className="deck-label mt-[2cqw] font-mono text-ink-subtle">
            {SITE_ORIGIN.replace(/^https?:\/\//, "")}
          </p>
        </Rise>
      </div>
    </Slide>
  );
}
