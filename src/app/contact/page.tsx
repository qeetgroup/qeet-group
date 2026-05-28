import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { FadeRise } from "@/components/motion/FadeRise";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Qeet Group — partnerships, press, or general inquiries.",
};

const channels = [
  {
    label: "Partnerships",
    email: "partnerships@qeet.in",
    description: "Working with one of our subsidiaries, or exploring a new venture together.",
  },
  {
    label: "Press",
    email: "press@qeet.in",
    description: "Interviews, comments, and media inquiries.",
  },
  {
    label: "General",
    email: "hello@qeet.in",
    description: "Anything else.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Contact</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Get in touch.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-xl md:mt-12">
            <Lede>
              The best way to reach us is by email. We read everything that arrives.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {/* Channels */}
      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <Eyebrow className="mb-12 md:mb-16">By topic</Eyebrow>
        </FadeRise>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          {channels.map((c, i) => (
            <FadeRise key={c.label} delay={i * 0.06}>
              <div>
                <h2 className="font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[1.75rem] leading-[1.16] md:text-[2rem]">
                  {c.label}
                </h2>
                <p className="mt-4 text-body text-ink-muted">{c.description}</p>
                <div className="mt-5">
                  <Link href={`mailto:${c.email}`} className="font-sans text-body text-ink">
                    {c.email}
                  </Link>
                </div>
              </div>
            </FadeRise>
          ))}
        </div>
      </Section>

      {/* Form */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Or send a message</Eyebrow>
            <p className="mt-6 max-w-[28rem] text-body text-ink-muted">
              We&rsquo;ll route it to the right person and respond within a few days.
            </p>
          </FadeRise>
          <FadeRise className="md:col-span-8">
            <ContactForm />
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
