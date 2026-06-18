import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { FadeRise } from "../motion/FadeRise";

/**
 * Editorial pull-quote from the founding memo (honest brand voice — not a
 * fabricated customer testimonial). Large centered serif for impact.
 */
export function EditorialQuote() {
  return (
    <Section className="border-t border-rule" contained={false}>
      <Container>
        <FadeRise>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-serif font-normal italic text-balance tracking-[-0.015em] text-ink text-[2rem] leading-[1.16] md:text-[3rem] md:leading-[1.12] lg:text-[3.5rem] lg:leading-[1.1]">
              &ldquo;Vision is decoration until it ships. The point is to deliver the future you
              said you&rsquo;d build — on the timeline you said you&rsquo;d build it.&rdquo;
            </blockquote>
            <figcaption className="mt-8 font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
              Qeet Group · Founding memo
            </figcaption>
          </figure>
        </FadeRise>
      </Container>
    </Section>
  );
}
