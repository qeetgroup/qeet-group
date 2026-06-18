import { Container } from "../layout/Container";
import { FadeRise } from "../motion/FadeRise";

const domains = [
  "Identity",
  "Design systems",
  "Observability",
  "People",
  "Notifications",
  "Payments",
];

/**
 * Slim breadth band under the hero — signals the span of the platform across
 * six domains (an honest stand-in for a customer logo wall, pre-launch).
 */
export function PlatformStrip() {
  return (
    <section className="border-y border-rule py-10 md:py-12">
      <Container>
        <FadeRise>
          <p className="text-center font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
            One platform across six domains
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
            {domains.map((d, i) => (
              <span key={d} className="flex items-center gap-x-6 md:gap-x-10">
                {i > 0 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-rule-strong" />
                )}
                <span className="font-serif font-normal tracking-[-0.01em] text-ink text-[1.25rem] md:text-[1.5rem]">
                  {d}
                </span>
              </span>
            ))}
          </div>
        </FadeRise>
      </Container>
    </section>
  );
}
