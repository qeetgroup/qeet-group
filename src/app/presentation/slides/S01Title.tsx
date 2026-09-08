import { Wordmark } from "@/components/ui/Wordmark";
import { SITE_SLOGAN } from "@/config/site";
import { Lines, Rise, Rule } from "./primitives";

/**
 * Slide 01 — the opening.
 *
 * Four elements and a great deal of nothing. The temptation on a title slide
 * is to establish credibility, which is how title slides acquire a strapline,
 * a metric, a founding year and a row of logos. None of that is more
 * persuasive than the discipline of leaving it out.
 *
 * The only ambient surface in the deck sits here and on the closing slide:
 * the site's own architectural hairline grid, masked and at low opacity. It is
 * the same motif the site uses behind its heroes, so the deck opens in a room
 * the audience may already have visited.
 */
export function S01Title() {
  return (
    <div className="deck-slide justify-between">
      {/* Decorative, hidden from assistive technology, and frozen under
          reduced motion by the global block in globals.css. */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] mask-[radial-gradient(ellipse_78%_70%_at_28%_18%,black,transparent_74%)]"
      />
      <div aria-hidden="true" className="bg-grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <Rise>
          <Wordmark href={null} />
        </Rise>
      </div>

      <div className="relative">
        <Lines
          as="h1"
          lines={["QEET"]}
          className="deck-display-xl font-display text-ink"
        />

        <Rise delay={0.22} className="mt-[2.2cqw] max-w-[62cqw]">
          <Rule />
          <p className="deck-heading mt-[2cqw] font-display text-ink-muted">
            {SITE_SLOGAN}
          </p>
        </Rise>

        <Rise delay={0.38} className="mt-[2.6cqw] max-w-[46cqw]">
          <p className="deck-body font-sans text-ink-subtle">
            A technology group built around a different way of deciding what
            deserves to exist.
          </p>
        </Rise>
      </div>
    </div>
  );
}
