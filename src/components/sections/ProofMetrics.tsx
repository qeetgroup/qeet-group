import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";
import { Counter } from "../motion/Counter";

type Metric = {
  value?: number;
  display?: string;
  label: string;
  context: string;
};

const metrics: Metric[] = [
  { value: 6, label: "Products", context: "identity, data, people, and money" },
  { value: 1, label: "Identity graph", context: "every product, one secure login" },
  { value: 4, label: "Principles", context: "question · explore · envision · transform" },
  { display: "2026", label: "Founded", context: "built for the long term" },
];

export function ProofMetrics() {
  return (
    <Section className="border-t border-rule" padding="tight">
      <FadeRise>
        <SectionHeader index="05" eyebrow="By the numbers" />
      </FadeRise>

      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-14 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <FadeRise key={m.label} delay={i * 0.06}>
            <div>
              <div className="font-serif font-normal tracking-[-0.02em] tabular-nums text-ink text-[3.25rem] leading-none md:text-[4rem]">
                {m.display ?? <Counter value={m.value ?? 0} />}
              </div>
              <div aria-hidden="true" className="mt-5 h-px w-9 bg-brand" />
              <p className="mt-5 font-sans text-body font-medium text-ink">{m.label}</p>
              <p className="mt-1.5 text-body-s text-ink-subtle">{m.context}</p>
            </div>
          </FadeRise>
        ))}
      </div>
    </Section>
  );
}
