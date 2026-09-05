import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { RevealLines } from "../motion/RevealLines";
import { FadeRise } from "../motion/FadeRise";

/**
 * The claim, set as type and nothing else.
 *
 * Every reference site has a moment like this — Deloitte's "Connecting the
 * dots", Cognizant's positioning paragraph — and it always has the same job:
 * to say plainly what the organisation is, once, without an illustration to
 * hide a vague sentence behind.
 *
 * Deliberately the least decorated section on the page. It follows a
 * full-bleed video hero, and the contrast between that and a bare typographic
 * band is what makes the claim land as a statement rather than as more
 * marketing.
 */
export function PositionStatement() {
  return (
    <Section id="what-we-are" className="border-t border-rule">
      <div className="grid-editorial">
        <div className="col-aside">
          <Eyebrow>What Qeet Group is</Eyebrow>
        </div>
        <div className="col-wide">
          <RevealLines
            as="h2"
            lines={[
              "A family of products.",
              "A single point of view.",
            ]}
            accentIndex={1}
            className="text-balance font-display text-ink text-display-l"
          />
          <FadeRise className="mt-10 max-w-prose space-y-6 text-body-l text-ink-muted md:mt-14">
            <p>
              Qeet Group brings together products for people, work,
              communication, payments and more. Each has a clear role and its
              own path, while the group gives them shared purpose and reach.
            </p>
            <p>
              We build for the long term: thoughtfully, honestly and with the
              discipline to let every new product strengthen what already
              exists.
            </p>
          </FadeRise>
        </div>
      </div>
    </Section>
  );
}
