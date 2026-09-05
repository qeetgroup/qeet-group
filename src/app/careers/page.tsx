import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { TrackedMailto } from "@/components/ui/TrackedMailto";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { Figure } from "@/components/media/Figure";
import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata = buildPageMetadata({
  title: "Careers",
  description:
    "What Qeet Group looks for, how we work, and how to reach us. We are not running an open hiring process today.",
  path: "/careers",
});

/**
 * ============================================================================
 * Careers, with no invented openings
 * ============================================================================
 *
 * The strong temptation on a page like this is a roles grid — even an empty
 * one with "no current openings" per department, which still implies a hiring
 * function that is running. Qeet is not running an open process, and the page
 * says so in the first paragraph rather than making someone scroll to find out.
 *
 * That is not a limitation to work around. A candidate who reads a truthful
 * "not right now, here is what we look for and how to reach us" is better
 * served than one who fills in a form that goes nowhere, and they remember
 * which of those two happened to them.
 *
 * The previous version described joining "a portfolio of long-form bets" where
 * "each subsidiary is small enough to feel like a startup" — language from a
 * positioning the organisation no longer holds.
 */

const WHAT_WE_LOOK_FOR = [
  {
    title: "People who think in decades",
    body: "Not the right place for someone optimising the next two years. The work that matters here compounds, which means hiring people who choose where to spend their attention on the same horizon.",
  },
  {
    title: "A bias toward writing",
    body: "Most of what goes well here gets written down — a memo, a document, a message that takes itself seriously. Strong writers tend to be strong thinkers, and we hire on that correlation.",
  },
  {
    title: "Comfort with shared constraints",
    body: "Products here are built on foundations other teams own. That means arguing about a shared decision rather than routing around it, which suits some people and frustrates others.",
  },
  {
    title: "High standards, no theatre",
    body: "Take the quality of the work seriously; take yourself less so. The standard is the standard. The performance around the standard is what we try to avoid.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Careers</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["We are not hiring", "openly right now."]}
            className="max-w-[20ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              There is no open process and no roles list, and this page will not
              invent one. What follows is what we look for and how to reach us —
              which is worth more to the right person than a form that goes
              nowhere.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <div className="grid-editorial items-start">
          <div className="col-lede">
            <Eyebrow className="mb-8">What we look for</Eyebrow>
            <dl className="border-t border-rule">
              {WHAT_WE_LOOK_FOR.map((p) => (
                <FadeRise key={p.title}>
                  <div className="border-b border-rule py-7">
                    <dt className="font-sans text-heading-m font-medium text-ink">
                      {p.title}
                    </dt>
                    <dd className="mt-3 max-w-prose text-body text-ink-muted">{p.body}</dd>
                  </div>
                </FadeRise>
              ))}
            </dl>
          </div>
          <div className="col-figure">
            <FadeRise>
              <Figure slot="careers" aspect="portrait" sizes="(min-width: 1024px) 50vw, 100vw" />
            </FadeRise>
          </div>
        </div>
      </Section>

      <Section tone="inverse" padding="tight">
        <FadeRise>
          <div className="max-w-3xl">
            <h2 className="text-balance font-display text-ink-inverse text-display-m">
              If you read that and recognised yourself, write anyway.
            </h2>
            <p className="mt-6 max-w-prose text-body-l text-ink-inverse/70">
              Tell us what you have shipped that you are proud of, and which part
              of the portfolio you would want to work inside. We read everything
              that arrives, and we would rather hear from someone early than
              advertise a role we have not defined.
            </p>
            <div className="mt-10">
              <TrackedMailto
                email="careers@qeet.in"
                context="careers-page"
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
              How we think
            </Link>
            <Link href="/technology/engineering" variant="arrow" className="text-body text-ink">
              How we build
            </Link>
            <Link href="/company/about" variant="arrow" className="text-body text-ink">
              About Qeet Group
            </Link>
          </div>
        </FadeRise>
      </Section>
    </>
  );
}
