import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { TrackedMailto } from "@/components/ui/TrackedMailto";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata = buildPageMetadata({
  title: "Leadership",
  description:
    "Qeet Group has not published its leadership yet. What it has published is how decisions get made.",
  path: "/company/leadership",
});

/**
 * ============================================================================
 * Leadership, with nobody on it
 * ============================================================================
 *
 * There are no named people here because none have been published, and
 * inventing an executive row of stock portraits would be the most obviously
 * false thing on the site — a leadership page is the first place a journalist
 * or an enterprise buyer checks against LinkedIn.
 *
 * So the page answers the question behind the question. Someone arriving here
 * usually wants to know how decisions get made and who is accountable, not a
 * list of job titles. That can be answered truthfully today.
 *
 * The previous version described "a small senior team that runs the holding
 * company itself — not the subsidiaries", which described a structure the
 * organisation no longer claims.
 */

const HOW_DECISIONS_WORK = [
  {
    title: "Product decisions sit with product teams",
    body: "Each product owns its own architecture, roadmap and technical choices. Nobody at the organisation level approves a release.",
  },
  {
    title: "Shared foundations are decided once, in the open",
    body: "Identity and the design foundation are the two things everything depends on, so changes to either are argued at the organisation level rather than per product. That is the trade for not rebuilding them eight times.",
  },
  {
    title: "Standards are written down, not remembered",
    body: "Engineering standards, the security baseline and the domain architecture exist as documents that products are held to, and a register is kept of where those documents and the code disagree.",
  },
  {
    title: "Claims are separated from evidence",
    body: "A roadmap entry may not be presented as a shipped capability — including on this website, where the rule is enforced by the code that renders the pages rather than left to whoever writes the copy.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Leadership</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["We have not", "published this yet."]}
            className="max-w-[20ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              The team will be introduced as it comes together, and not before.
              In the meantime, here is the thing most people are actually asking
              when they open a leadership page: how decisions get made, and who
              is accountable for them.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <div className="grid-editorial items-start">
          <div className="col-aside">
            <Eyebrow>How decisions work</Eyebrow>
          </div>
          <dl className="col-wide border-t border-rule">
            {HOW_DECISIONS_WORK.map((d) => (
              <FadeRise key={d.title}>
                <div className="border-b border-rule py-8">
                  <dt className="font-display text-ink text-heading-xl">{d.title}</dt>
                  <dd className="mt-4 max-w-prose text-body-l text-ink-muted">{d.body}</dd>
                </div>
              </FadeRise>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="inverse" padding="tight">
        <FadeRise>
          <div className="max-w-3xl">
            <h2 className="text-balance font-display text-ink-inverse text-display-m">
              If you would want to lead work here, say so.
            </h2>
            <p className="mt-6 max-w-prose text-body-l text-ink-inverse/70">
              There is no open process. There are conversations. Tell us what you
              have shipped that you are proud of and which part of the portfolio
              you would want to work inside.
            </p>
            <div className="mt-10">
              <TrackedMailto
                email="careers@qeet.in"
                context="leadership-page"
                className="text-body text-ink-inverse"
              >
                careers@qeet.in
              </TrackedMailto>
            </div>
          </div>
        </FadeRise>
      </Section>

      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <Link href="/company/principles" variant="arrow" className="text-body text-ink">
              Our principles
            </Link>
            <Link href="/company/about" variant="arrow" className="text-body text-ink">
              About Qeet Group
            </Link>
            <Link href="/careers" variant="arrow" className="text-body text-ink">
              Careers
            </Link>
          </div>
        </FadeRise>
      </Section>
    </>
  );
}
