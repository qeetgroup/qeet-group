import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { RevealLines } from "../motion/RevealLines";
import { FadeRise } from "../motion/FadeRise";
import { TextLoop } from "../motion/TextLoop";
import { listProductSummaries } from "@/lib/content";

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
 *
 * The one moving element is the closing line, where the product name cycles.
 * It earns its place by carrying the argument the section is making — that
 * signing in once reaches all of them — in a way a static sentence cannot,
 * and by putting the portfolio in front of a reader who has not yet scrolled
 * to the ecosystem map. Products come from the live collection, so it can
 * never name something the site does not contain.
 */
export async function PositionStatement() {
  const products = await listProductSummaries();
  const names = products.map((p) => p.name);

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
              "Most software companies",
              "build a product. We are",
              "building the ground it",
              "stands on.",
            ]}
            accentIndex={3}
            className="text-balance font-display text-ink text-display-l"
          />
          <FadeRise className="mt-10 max-w-measure space-y-6 text-body-l text-ink-muted md:mt-14">
            <p>
              Qeet Group is one technology organisation, not a collection of
              separate ventures. Its products are built by different teams for
              different problems, but they share an identity layer, a design
              foundation, and a set of standards that do not bend per product.
            </p>
            <p>
              That shared ground is the actual work. It is why signing in once
              reaches everything, why every interface behaves the same way, and
              why adding the next product costs less than the last one did.
            </p>
          </FadeRise>

          <FadeRise className="mt-12 md:mt-16">
            <p className="flex flex-wrap items-baseline gap-x-3 font-display text-ink text-display-m">
              <span>One way into</span>
              <TextLoop
                items={names}
                srLabel="Products include"
                className="text-accent-text-display"
              />
            </p>
          </FadeRise>
        </div>
      </div>
    </Section>
  );
}
