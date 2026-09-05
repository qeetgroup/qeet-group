import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { buildPageMetadata } from "@/lib/seo/meta";
import { SITE_SLOGAN } from "@/config/site";

export const metadata = buildPageMetadata({
  title: "Principles",
  description:
    "Question, Explore, Envision, Transform — the four words Qeet Group is named after, and the working consequences of each.",
  path: "/company/principles",
});

/**
 * ============================================================================
 * Principles
 * ============================================================================
 *
 * Q·E·E·T is the organisation's real published acronym, not a value set
 * written for a website. That distinction is the entire reason this page can
 * exist: invented corporate values are detectable at a glance, and a company
 * that invents its own principles has spent the credibility it needed for
 * everything else on the site.
 *
 * Each principle is paired with a CONSEQUENCE rather than an elaboration.
 * "We value curiosity" is unfalsifiable; "this is why we keep a register of
 * where our documentation contradicts our code" is a practice someone could
 * check. Where a principle has no consequence attached, it is decoration.
 */

const PRINCIPLES = [
  {
    letter: "Q",
    word: "Question",
    claim: "Progress begins with the right question.",
    body: "Challenge the conventional answer; isolate the problems that actually matter rather than the ones that are convenient to work on.",
    consequence:
      "It is why the organisation maintains a register of the places its own documentation disagrees with its code, instead of quietly asserting the documentation is correct.",
  },
  {
    letter: "E",
    word: "Explore",
    claim: "Curiosity, made operational.",
    body: "Research, experimentation, and the patient discovery of methods nobody has tried yet — sustained past the point where it stops being interesting.",
    consequence:
      "It is why products here are built rather than assembled, and why the portfolio contains things that will not pay for themselves for years.",
  },
  {
    letter: "E",
    word: "Envision",
    claim: "Designing for what compounds.",
    body: "Bold and specific futures rather than next-quarter targets. The question is not what is achievable this year but what becomes possible once it exists.",
    consequence:
      "It is why identity and the design foundation were built first, before there was a portfolio to justify either of them.",
  },
  {
    letter: "T",
    word: "Transform",
    claim: "Vision is decoration until it ships.",
    body: "Build the things that reshape how work is done — and then actually deliver them, to real people, in production.",
    consequence:
      "It is why a roadmap entry may not be cited here as a shipped capability, and why every product on this site carries a lifecycle status it cannot overstate.",
  },
];

export default function PrinciplesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Principles</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["Four words,", "in that order."]}
            className="max-w-[18ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              {SITE_SLOGAN} Qeet is an acronym before it is a name, and the
              sequence is the argument — the first step is the one most
              organisations skip.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <ol className="border-t border-rule">
          {PRINCIPLES.map((p) => (
            <li key={p.word}>
              <FadeRise>
                <article className="grid grid-cols-1 gap-6 border-b border-rule py-12 md:grid-cols-12 md:gap-8 md:py-16">
                  <div className="md:col-span-3">
                    <span
                      aria-hidden="true"
                      className="block font-display text-accent-text-display text-display-l leading-none"
                    >
                      {p.letter}
                    </span>
                    <h2 className="mt-3 font-sans text-heading-l font-medium text-ink">
                      {p.word}
                    </h2>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-balance font-display text-ink text-heading-xl">
                      {p.claim}
                    </p>
                    <p className="mt-5 max-w-prose text-body-l text-ink-muted">{p.body}</p>
                    <p className="mt-6 max-w-prose border-l-2 border-accent pl-5 text-body text-ink-muted">
                      {p.consequence}
                    </p>
                  </div>
                </article>
              </FadeRise>
            </li>
          ))}
        </ol>

        <FadeRise className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          <Link href="/company/about" variant="arrow" className="text-body text-ink">
            About Qeet Group
          </Link>
          <Link href="/technology/engineering" variant="arrow" className="text-body text-ink">
            How we build
          </Link>
        </FadeRise>
      </Section>

      <AudiencePaths />
    </>
  );
}
