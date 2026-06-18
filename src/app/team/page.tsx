import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The Qeet Group team. Senior operators and partners building a multi-company holding for ideas that compound.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <PageAmbient />
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Team</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              The people behind the bet.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              We will introduce the team in full as it comes together. Until then, a short
              note on who we&rsquo;re looking for — and a direct line if you think you are
              one of them.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {/* What we are building */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>What we are building</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              A small senior team that runs the holding company itself — not the
              subsidiaries. Most of the operating work happens inside the companies; the
              Group exists to set the philosophy, hold the quality bar, and back the
              operators we trust to build the long-form bets.
            </p>
            <p className="mt-6 text-body text-ink-muted">
              Subsidiary leadership is announced from the companies themselves. The team
              on this page is the one supporting all of them.
            </p>
          </FadeRise>
        </div>
      </Section>

      {/* Joining */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Joining</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              If you are a senior operator considering joining a young multi-company
              holding, write to{" "}
              <Link href="mailto:careers@qeet.in" className="text-ink">
                careers@qeet.in
              </Link>
              .
            </p>
            <p className="mt-5 max-w-[34rem] text-body text-ink-muted">
              Tell us briefly what you have shipped that you are proud of, and which
              Qeet Group company you would want to work inside.
            </p>
            <p className="mt-8 font-sans text-body-s text-ink-subtle">
              See also{" "}
              <Link href="/careers" className="text-ink-muted">
                Careers
              </Link>{" "}
              for what we look for and how we work.
            </p>
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
