import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { Magnetic } from "../motion/Magnetic";

export function ClosingCTA() {
  return (
    <Section tone="inverse" contained={false} className="relative isolate overflow-hidden">
      {/* Subtle monochrome grid texture — no colour wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,var(--color-ink-inverse)_1px,transparent_1px)] bg-size-[28px_28px] opacity-[0.05] mask-[radial-gradient(ellipse_70%_80%_at_50%_0%,black,transparent_72%)]"
      />
      <Container>
        <FadeRise>
          <div className="max-w-3xl">
            <p className="font-serif font-normal text-balance tracking-[-0.015em] text-ink-inverse text-[2.5rem] leading-[1.08] md:text-[3.5rem] md:leading-[1.06] lg:text-[4.5rem] lg:leading-[1.04]">
              Build something that matters with us.
            </p>
            <p className="mt-6 max-w-xl text-body-l text-ink-inverse/70 md:mt-8">
              A small team backing long-form bets. If you want to ship the future on the timeline
              you said you would, we should talk.
            </p>
            <div className="mt-12 flex flex-col gap-6 md:mt-14 md:flex-row md:gap-10">
              <Magnetic strength={0.4}>
                <Link href="/careers" variant="arrow" className="text-body text-ink-inverse">
                  See open roles
                </Link>
              </Magnetic>
              <Magnetic strength={0.4}>
                <Link href="/contact" variant="arrow" className="text-body text-ink-inverse">
                  Get in touch
                </Link>
              </Magnetic>
            </div>
          </div>
        </FadeRise>
      </Container>
    </Section>
  );
}
