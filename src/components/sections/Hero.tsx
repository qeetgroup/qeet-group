import { Container } from "../layout/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Link } from "../ui/Link";
import { Button } from "../ui/Button";
import { FadeRise } from "../motion/FadeRise";
import { RevealLines } from "../motion/RevealLines";
import { VideoFigure } from "../media/VideoFigure";
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
    // `on-dark`: this hero sits on a scrimmed photograph in BOTH themes, so its
    // accent tokens must not follow the light theme. See globals.css.
    <section className="on-dark relative isolate overflow-hidden">
      {/*
        Full-bleed media behind the type. `scrim-full` guarantees the contrast
        rather than hoping the footage is dark enough — the scrim floor is
        measured against a blown-out white frame, so the headline holds no
        matter what the media does.
      */}
      <div className="absolute inset-0 -z-10">
        <VideoFigure
          slot="homeHero"
          aspect="free"
          scrim="full"
          priority
          sizes="100vw"
          className="h-full [&_figure]:h-full [&_figure>div]:h-full"
        />
      </div>

      <Container width="wide">
        <div className="flex min-h-[86svh] flex-col justify-end pb-20 pt-36 md:min-h-[92svh] md:pb-28 md:pt-40">
          <FadeRise>
            <Eyebrow className="mb-8 text-ink-inverse/70 md:mb-10">
              Qeet Group
            </Eyebrow>
          </FadeRise>

          <RevealLines
            as="h1"
            lines={["Building the systems", "other systems", "are built on."]}
            className="max-w-[18ch] text-balance font-display text-ink-inverse text-display-2xl"
          />

          <FadeRise delay={0.5} className="mt-10 max-w-xl md:mt-12">
            <p className="text-body-l text-ink-inverse/75">
              One organisation, one identity layer, one design foundation — and a
              portfolio of products that compose each other rather than compete
              for the same desk.
            </p>
          </FadeRise>

          <FadeRise delay={0.65} className="mt-10 md:mt-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <Button href="/ecosystem" size="lg" variant="accent">
                See the ecosystem
              </Button>
              <Link href="/company/about" variant="arrow" className="text-body text-ink-inverse">
                What Qeet Group is
              </Link>
            </div>
          </FadeRise>

          <FadeRise delay={0.8} className="mt-14 md:mt-20">
            <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-ink-inverse/20 pt-8">
              {[
                { n: counts.total, label: "Products" },
                { n: counts.available, label: "Available today" },
                { n: counts.development, label: "In development" },
                { n: counts.planned, label: "Planned" },
              ].map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-ink-inverse text-heading-xl tabular-figures">
                    {s.n}
                  </dd>
                  <dt className="mt-1 font-mono text-label uppercase text-ink-inverse/60">
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
