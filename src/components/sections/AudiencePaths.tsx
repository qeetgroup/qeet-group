import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Anchor } from "@/components/ui/Anchor";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { AUDIENCE_PATHS } from "@/config/nav";

/**
 * ============================================================================
 * AudiencePaths — the closing band, instead of one call to action
 * ============================================================================
 *
 * Six audiences arrive at a corporate site wanting six different things. An
 * enterprise buyer, a developer, a partner, an engineer, a candidate and a
 * journalist share almost no intent, and a single "Get started" serves none of
 * them — it is the vocabulary of a product converting a signup, not an
 * organisation trying to be understood.
 *
 * Each row names the VISITOR rather than the action, so people self-select.
 * That is also why this is a list of destinations rather than a grid of cards:
 * the reader is scanning for the word that describes them, and a vertical list
 * of six labels is far faster to scan than a grid of six boxes.
 */
export function AudiencePaths() {
  return (
    <Section tone="inverse" contained={false}>
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-6 text-ink-inverse/60">Where to next</Eyebrow>
            <RevealLines
              as="h2"
              lines={["Different reasons", "to be here."]}
              className="text-balance font-display text-ink-inverse text-display-l"
            />
          </div>

          <ul className="lg:col-span-8 lg:pt-2">
            {AUDIENCE_PATHS.map((path) => (
              <li key={path.href}>
                <FadeRise>
                  <Anchor
                    href={path.href}
                    className="group/path grid grid-cols-1 gap-2 border-t border-ink-inverse/15 py-7 transition-colors duration-fast last:border-b hover:border-ink-inverse/40 focus-ring sm:grid-cols-12 sm:items-baseline sm:gap-6"
                  >
                    <span className="font-mono text-label uppercase text-ink-inverse/50 sm:col-span-3">
                      {path.audience}
                    </span>
                    <span className="sm:col-span-7">
                      <span className="block font-sans text-heading-m text-ink-inverse">
                        {path.label}
                      </span>
                      {path.description && (
                        <span className="mt-1 block text-body-s text-ink-inverse/60">
                          {path.description}
                        </span>
                      )}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-ink-inverse/50 transition-transform duration-base group-hover/path:translate-x-1 sm:col-span-2 sm:text-right"
                    >
                      →
                    </span>
                  </Anchor>
                </FadeRise>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
