import { Section } from "../layout/Section";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";

export function ClosingCTA() {
  return (
    <Section tone="inverse">
      <FadeRise>
        <div className="max-w-3xl">
          <p className="font-serif font-normal text-balance tracking-[-0.015em] text-ink-inverse text-[2.5rem] leading-[1.08] md:text-[3.5rem] md:leading-[1.06] lg:text-[4.5rem] lg:leading-[1.04]">
            Build something that matters with us.
          </p>
          <div className="mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:gap-10">
            <Link href="/careers" variant="arrow" className="text-body text-ink-inverse">
              See open roles
            </Link>
            <Link href="/contact" variant="arrow" className="text-body text-ink-inverse">
              Get in touch
            </Link>
          </div>
        </div>
      </FadeRise>
    </Section>
  );
}
