import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Brand assets, fact sheet, and press contact for Qeet Group and its companies.",
  alternates: { canonical: "/press" },
};

const assets = [
  {
    label: "Wordmark — light",
    note: "SVG · on light backgrounds",
    href: "/qeet-logo-light.svg",
  },
  {
    label: "Wordmark — dark",
    note: "SVG · on dark backgrounds",
    href: "/qeet-logo-dark.svg",
  },
  {
    label: "Mark",
    note: "SVG · square icon",
    href: "/icon.svg",
  },
];

const facts = [
  { label: "Name", value: "Qeet Group" },
  { label: "Founded", value: "2026" },
  { label: "Structure", value: "Multi-company holding" },
  { label: "Headquarters", value: "Remote-first" },
  { label: "Site", value: "qeet.in" },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Press</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Press &amp; brand.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              Assets, a short fact sheet, and a direct line to reach us. For interviews,
              comments, or media requests, write to{" "}
              <Link href="mailto:press@qeet.in" className="text-ink">
                press@qeet.in
              </Link>
              .
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {/* Fact sheet */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Fact sheet</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-sans text-body text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-[34rem] text-body text-ink-muted">
              Qeet Group is a multi-company holding built on a single philosophy: that
              meaningful progress begins with the right question, asked early, and the
              patience to chase the answer for years.
            </p>
          </FadeRise>
        </div>
      </Section>

      {/* Brand assets */}
      <Section className="border-t border-rule">
        <FadeRise>
          <Eyebrow className="mb-10 md:mb-14">Brand assets</Eyebrow>
        </FadeRise>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-12">
          {assets.map((a, i) => (
            <FadeRise key={a.href} delay={i * 0.06}>
              <div>
                <div className="flex h-40 items-center justify-center border border-rule px-6">
                  {/* Plain <img> so the SVG renders 1:1 without Next image optimization. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.href}
                    alt={a.label}
                    className="max-h-16 w-auto max-w-full"
                  />
                </div>
                <p className="mt-4 font-sans text-body text-ink">{a.label}</p>
                <p className="mt-1 font-sans text-body-s text-ink-muted">{a.note}</p>
                <p className="mt-3">
                  <a
                    href={a.href}
                    download
                    className="font-sans text-body-s text-ink underline decoration-current/30 decoration-1 underline-offset-[5px] transition-[text-decoration-color] hover:decoration-brand"
                  >
                    Download
                  </a>
                </p>
              </div>
            </FadeRise>
          ))}
        </div>
        <p className="mt-12 max-w-[34rem] font-sans text-body-s text-ink-muted md:mt-16">
          Please don&rsquo;t alter the marks, recolor them, or pair them with messaging
          that misrepresents the Group or its companies. If you need a custom format or
          have a question about usage, email{" "}
          <Link href="mailto:press@qeet.in" className="text-ink">
            press@qeet.in
          </Link>
          .
        </p>
      </Section>

      {/* Follow Qeet Group */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Follow Qeet Group</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              Official accounts where the Group is active.
            </p>
            <p className="mt-5 max-w-[34rem] text-body text-ink-muted">
              These are the only accounts that speak for Qeet Group. Anything
              else using the brand mark is not us.
            </p>
            <div className="mt-8">
              <SocialIcons size="md" />
            </div>
          </FadeRise>
        </div>
      </Section>

      {/* Press contact */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Press contact</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              <Link href="mailto:press@qeet.in" className="text-ink">
                press@qeet.in
              </Link>
            </p>
            <p className="mt-5 max-w-[34rem] text-body text-ink-muted">
              We aim to respond within two business days. For partnership inquiries, use{" "}
              <Link href="mailto:partnerships@qeet.in" className="text-ink">
                partnerships@qeet.in
              </Link>{" "}
              instead.
            </p>
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
