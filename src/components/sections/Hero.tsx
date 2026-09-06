import { Container } from "../layout/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Link } from "../ui/Link";
import { Button } from "../ui/Button";
import { FadeRise } from "../motion/FadeRise";
import { RevealLines } from "../motion/RevealLines";
import { HeroBackdrop } from "./HeroBackdrop";
import { portfolioCounts } from "@/lib/content";

/**
 * ============================================================================
 * The hero
 * ============================================================================
 *
 * The previous hero was the shape the brief rules out: eyebrow, huge gradient
 * headline, two buttons, a floating figure. Every startup landing page in the
 * category is that arrangement.
 *
 * What the reference set does instead is lead with a STATEMENT over media, at
 * scale, with a single onward path. Accenture's "Together We Reinvented",
 * Cognizant's "We're an AI Builder", LTM's positioning line — none of them
 * sells a product above the fold. They say what the organisation is and let
 * the navigation handle everything else.
 *
 * Two details are doing more work than they look:
 *
 *   ONE CTA, NOT TWO. A second button of equal weight is an admission that we
 *   do not know what the visitor should do next. The secondary path is a text
 *   link, which is a hierarchy rather than a choice.
 *
 *   THE FACT LINE IS DERIVED. Counts come from the content collection at build
 *   time, so the hero cannot claim a portfolio size the site does not contain.
 *   That is a real risk here: hero copy is exactly where a stale number
 *   survives longest, because nobody re-reads it.
 */
export async function Hero() {
  const counts = await portfolioCounts();

  return (
    <section className="relative isolate overflow-hidden">
      {/*
        Full-bleed generated backdrop behind the type.

        `bg-canvas` on the wrapper is not redundant — it is the no-JavaScript
        and no-WebGL fallback. The shader paints into a canvas element that
        only exists after hydration, so without this the hero would open as a
        transparent gap; with it, it degrades to a flat brand surface and the
        headline stays readable either way.

        There is no scrim. The shader is generated FROM the canvas colour, so
        its darkest regions are the page background itself and it never
        threatens the headline the way a photograph can — a scrim here would
        only mute the fibres it exists to show.
      */}
      <div className="absolute inset-0 -z-10 bg-canvas">
        <HeroBackdrop />
      </div>

      <Container width="wide">
        {/*
          Centred vertically, and that is tied to the backdrop rather than to
          taste: GhostFibers puts its brightest point at the exact centre of
          the viewport and vignettes toward the edges, so bottom-aligned copy
          sat in the darkest part of its own background while the glow went to
          waste above it.

          Centred on both axes. `items-center` centres each block in the
          column and `text-center` centres the text inside them — both are
          needed, because centring the flex container alone leaves every child
          still setting its own text flush left, which is what the first
          attempt at this got wrong.

          The children each need help too: capped measures (`max-w-*`) become
          `mx-auto` or they hug the left edge, and the button row and stat row
          need their own `justify-center` since they are flex containers in
          their own right.

          `pt` still exceeds `pb` because the fixed nav overlays the top of
          this section: equal padding would centre the block in the SECTION but
          leave it visually low in the space a reader actually sees.
        */}
        <div className="flex min-h-[86svh] flex-col items-center justify-center pb-24 pt-36 text-center md:min-h-[92svh] md:pb-28 md:pt-44">
          <FadeRise>
            <Eyebrow className="mb-8 md:mb-10">
              Qeet Group
            </Eyebrow>
          </FadeRise>

          {/*
            The headline is the name, expanded. Qeet is an acronym before it is
            a word — question, explore, envision, transform — so the largest
            type on the site says what the organisation is called and what it
            does in the same four words. That is why it survives scrutiny where
            the previous line did not: it is not a claim to be checked, it is
            the company's own name read aloud.

            Two lines, split down the middle, so the four verbs pair off rather
            than running as a list. The measure has to clear the longer of the
            two — 27ch against a 26-character line — or the mask would clip a
            wrapped fragment, since RevealLines gives each ENTRY one mask, not
            each rendered row.
          */}
          <RevealLines
            as="h1"
            lines={["We question, We explore,", "We envision, We transform."]}
            className="mx-auto max-w-[27ch] text-balance font-display text-ink text-display-2xl"
          />

          <FadeRise delay={0.5} className="mx-auto mt-10 max-w-xl md:mt-12">
            <p className="text-body-l text-ink-muted">
              Four words, one name. One organisation, one identity layer, one
              design foundation — and a portfolio of products that compose each
              other rather than compete for the same desk.
            </p>
          </FadeRise>

          <FadeRise delay={0.65} className="mt-10 md:mt-12">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
              <Button href="/ecosystem" size="lg" variant="accent">
                See the ecosystem
              </Button>
              <Link href="/company/about" variant="arrow" className="text-body text-ink">
                What Qeet Group is
              </Link>
            </div>
          </FadeRise>

          <FadeRise delay={0.8} className="mt-14 md:mt-20">
            <dl className="flex flex-wrap justify-center gap-x-12 gap-y-6 border-t border-rule pt-8">
              {[
                { n: counts.total, label: "Products" },
                { n: counts.available, label: "Available today" },
                { n: counts.development, label: "In development" },
                { n: counts.planned, label: "Planned" },
              ].map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-ink text-heading-xl tabular-figures">
                    {s.n}
                  </dd>
                  <dt className="mt-1 font-mono text-label uppercase text-ink-subtle">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </FadeRise>
        </div>
      </Container>
    </section>
  );
}
