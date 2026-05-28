import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { FadeRise } from "@/components/motion/FadeRise";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Joining Qeet Group means joining a portfolio of long-form bets. Roles open as the team comes together.",
};

const principles = [
  {
    title: "People who think in decades.",
    body: "We are not the right place for someone trying to optimize the next two years. The work we want to do is the work that compounds — and that means hiring people who choose where to invest their attention with the same horizon in mind.",
  },
  {
    title: "Operators, not titles.",
    body: "We pay for the work, not the seniority signal. The most useful people we have ever worked with are the ones who can do the obvious next thing without waiting to be told whether their title permits it.",
  },
  {
    title: "A bias toward writing.",
    body: "Most of the work that goes well at this company gets written down somewhere — a memo, a doc, a Slack post that takes itself seriously. Strong writers tend to be strong thinkers, and we hire on that correlation.",
  },
  {
    title: "High standards, no theater.",
    body: "Take the quality of your work seriously. Don't take yourself too seriously. The standards are the standards; the theater around the standards is what we try to avoid.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Careers</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Work at Qeet.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              Joining Qeet Group means joining a portfolio of long-form bets. Each subsidiary
              is small enough to feel like a startup and serious enough to require operators
              who can ship at scale.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {/* What we look for */}
      <Section className="border-t border-rule">
        <FadeRise>
          <Eyebrow>What we look for</Eyebrow>
        </FadeRise>
        <ol className="mt-12 md:mt-20">
          {principles.map((p, i) => (
            <FadeRise key={p.title}>
              <li
                className={cn(
                  "grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-14",
                  i !== 0 && "border-t border-rule",
                )}
              >
                <div className="md:col-span-3 lg:col-span-2">
                  <span className="block font-serif font-normal leading-none text-ink-subtle text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
                  <h3 className="mb-3 font-sans font-medium text-[1.25rem] leading-[1.3] text-ink md:text-[1.5rem] md:leading-[1.3]">
                    {p.title}
                  </h3>
                  <p className="max-w-[34rem] text-body text-ink-muted">{p.body}</p>
                </div>
              </li>
            </FadeRise>
          ))}
        </ol>
      </Section>

      {/* Open roles */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Open roles</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              We&rsquo;re not actively hiring right now.
            </p>
            <p className="mt-5 text-body text-ink-muted">
              If you think you should work with us, write to{" "}
              <Link href="mailto:careers@qeet.in" className="text-ink">
                careers@qeet.in
              </Link>
              . Tell us briefly what you have shipped that you are proud of, and which Qeet
              Group venture you would want to work inside.
            </p>
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
