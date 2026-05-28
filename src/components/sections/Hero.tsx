import { Container } from "../layout/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { WordReveal } from "../motion/WordReveal";

export function Hero() {
  return (
    <section className="relative flex min-h-[88svh] items-center pb-24 pt-12 md:pb-32 md:pt-20">
      <Container>
        <div className="max-w-[68rem]">
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Qeet Group · Est. 2026</Eyebrow>
          </FadeRise>
          <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.875rem] leading-[1.05] sm:text-[4rem] sm:leading-[1.04] md:text-[5.25rem] md:leading-[1.03] lg:text-[6.5rem] lg:leading-[1.02]">
            <WordReveal text="We question, we explore, we envision, we transform." />
          </h1>
          <FadeRise delay={0.7} className="mt-10 max-w-xl md:mt-12">
            <p className="text-body-l text-ink-muted">
              Qeet Group is a multi-company holding built on a single philosophy: that meaningful
              progress begins with the right question.
            </p>
          </FadeRise>
          <FadeRise delay={0.95} className="mt-10 md:mt-14">
            <Link href="#philosophy" variant="arrow" className="text-body text-ink">
              Read our philosophy
            </Link>
          </FadeRise>
        </div>
      </Container>
    </section>
  );
}
