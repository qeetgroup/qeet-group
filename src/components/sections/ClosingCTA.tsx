import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { Spotlight } from "../motion/Spotlight";
import { Magnetic } from "../motion/Magnetic";

export function ClosingCTA() {
  return (
    <Section tone="inverse" contained={false} className="relative overflow-hidden">
      {/* Ambient brand glow anchored to the bottom of the dark panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]"
      />
      <Container>
        <FadeRise>
          <Spotlight
            size={640}
            color="color-mix(in oklab, var(--color-brand) 22%, transparent)"
            className="rounded-3xl"
          >
            <div className="relative max-w-3xl py-2">
              <p className="font-serif font-normal text-balance tracking-[-0.015em] text-ink-inverse text-[2.5rem] leading-[1.08] md:text-[3.5rem] md:leading-[1.06] lg:text-[4.5rem] lg:leading-[1.04]">
                Build something that matters with us.
              </p>
              <div className="mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:gap-10">
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
          </Spotlight>
        </FadeRise>
      </Container>
    </Section>
  );
}
