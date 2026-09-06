import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { EditorialFeature } from "@/components/sections/EditorialFeature";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { MetricBand } from "@/components/sections/MetricBand";
import { buildPageMetadata } from "@/lib/seo/meta";
import { ORGANISATION_METRICS, portfolioMetrics } from "@/config/metrics";
import { FOUNDING_YEAR } from "@/config/site";
import { portfolioCounts } from "@/lib/content";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Qeet Group is one technology organisation building a connected ecosystem of products on shared identity and design foundations.",
  path: "/company/about",
});

/**
 * ============================================================================
 * About
 * ============================================================================
 *
 * A full rewrite rather than an edit. The previous page described a
 * "multi-company holding" that provides "capital, a philosophy, a network and
 * a quality bar" to autonomous "subsidiaries" and then "gets out of the way".
 * Every load-bearing noun in that description is now wrong: Qeet is one
 * organisation whose products share an identity layer and a design foundation,
 * which is the opposite of getting out of the way.
 *
 * Principles are deliberately NOT repeated here. They have their own page, and
 * a company section that states its values twice has usually thought about
 * them once.
 */
export default async function AboutPage() {
  const counts = await portfolioCounts();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">About Qeet Group</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["One organisation,", "not a collection", "of ventures."]}
            className="max-w-[18ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.45} className="mt-10 max-w-2xl">
            <Lede>
              Qeet Group builds software products that compose one another. They
              are made by different teams for different problems, and they share
              an identity layer, a design foundation, and a set of standards that
              does not bend per product.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <div className="grid-editorial">
          <div className="col-aside">
            <Eyebrow>Why it exists</Eyebrow>
          </div>
          <div className="col-wide space-y-6 text-body-l text-ink-muted">
            <FadeRise>
              <p>
                Most organisations accumulate their software one decision at a
                time. Each choice is defensible on its own — this team needs
                this tool, and the tool arrives with its own accounts, its own
                interface conventions and its own idea of who you are.
              </p>
            </FadeRise>
            <FadeRise>
              <p>
                The cost of that arrives years later, at the points where the
                whole has to be reasoned about at once: someone leaving, an
                audit, an incident, an acquisition. By then the accumulated
                answer is something nobody can fully describe.
              </p>
            </FadeRise>
            <FadeRise>
              <p className="text-ink">
                Qeet Group exists to answer those questions once and build
                everything else on top. That shared ground is the actual
                product; the things in the portfolio are what it makes possible.
              </p>
            </FadeRise>
          </div>
        </div>
      </Section>

      <Section className="border-t border-rule bg-surface-sunken">
        <EditorialFeature
          eyebrow="How it is organised"
          headline={["Independent teams.", "Shared ground."]}
          accentLine={1}
          slot="companyCulture"
          aspect="portrait"
          flip
          cta={{ href: "/ecosystem", label: "See how the products connect" }}
        >
          <p>
            Each product owns its own architecture, its own roadmap and its own
            technical decisions. What is not optional is the connective layer.
            No product builds its own way of knowing who someone is, and none
            invents its own interface conventions.
          </p>
          <p className="mt-6">
            The test of whether that is working is not whether the products look
            alike. It is whether the next one costs less to build than the last
            one did.
          </p>
        </EditorialFeature>
      </Section>

      <Section className="border-t border-rule">
        <FadeRise>
          <Eyebrow className="mb-4">The organisation today</Eyebrow>
          <p className="max-w-prose text-body-l text-ink-muted">
            Founded {FOUNDING_YEAR}, based in India. Every figure below is
            derived from the portfolio itself or carries the source it came
            from — there are no customer counts, revenue figures or uptime
            claims here, because none of those is verified.
          </p>
        </FadeRise>

        <MetricBand className="mt-14" metrics={portfolioMetrics(counts)} />
        <MetricBand className="mt-14" metrics={ORGANISATION_METRICS} />
      </Section>

      <Section className="border-t border-rule bg-surface-sunken" padding="tight">
        <FadeRise>
          <div className="grid-editorial">
            <div className="col-aside">
              <Eyebrow>More</Eyebrow>
            </div>
            <div className="col-wide flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/company/principles" variant="arrow" className="text-body text-ink">
                Our principles
              </Link>
              <Link href="/company/leadership" variant="arrow" className="text-body text-ink">
                Leadership
              </Link>
              <Link href="/company/faq" variant="arrow" className="text-body text-ink">
                Questions we get asked
              </Link>
              <Link href="/company/press" variant="arrow" className="text-body text-ink">
                Press resources
              </Link>
            </div>
          </div>
        </FadeRise>
      </Section>

      <AudiencePaths />
    </>
  );
}
