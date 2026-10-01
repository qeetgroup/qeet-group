import { Wordmark } from "@/components/ui/Wordmark";
import { SITE_ORIGIN, SITE_SLOGAN } from "@/config/site";
import { POSITIONING } from "./canon";
import { Lines, Rise, Rule, Slide } from "./primitives";

/**
 * Slide 01 — the opening.
 *
 * The name, the four words it stands for, and the one line that says what
 * kind of organisation this is. The temptation on a title slide is to
 * establish credibility — a strapline, a metric, a founding year, a row of
 * logos — and none of that is more persuasive than leaving it out.
 *
 * The only ambient surface in the deck sits here and on the closing slide:
 * the site's own hairline grid, masked and faint, re-scaled to the stage.
 */
export function S01Title() {
  return (
    <Slide className="justify-between">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.28] mask-[radial-gradient(ellipse_78%_70%_at_28%_18%,black,transparent_74%)]"
      />
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_78%_70%_at_28%_18%,black,transparent_74%)]"
      />

      <div className="relative">
        <Rise>
          <Wordmark href={null} className="gap-[0.8cqw] text-[2.2cqw]" />
        </Rise>
      </div>

      <div className="relative">
        <Lines as="h1" lines={["QEET"]} className="deck-hero font-display text-ink" />

        <Rise delay={0.22} className="mt-[2.6cqw] max-w-[60cqw]">
          <Rule className="bg-rule-strong" />
          <p className="deck-heading mt-[2cqw] font-display text-ink">{SITE_SLOGAN}</p>
          <p className="deck-heading-s mt-[1.2cqw] font-display text-ink-muted">
            {POSITIONING}
          </p>
        </Rise>
      </div>

      <Rise delay={0.5} className="relative">
        <p className="deck-label font-mono text-ink-subtle">
          {SITE_ORIGIN.replace(/^https?:\/\//, "")}
        </p>
      </Rise>
    </Slide>
  );
}
