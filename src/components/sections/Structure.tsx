import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";

const facts = [
  {
    title: "Operating companies",
    body: "Each product is its own company — its own team, product, and runway. The group provides capital, a network, and a quality bar.",
  },
  {
    title: "Independent",
    body: "No outside capital, no fund. We answer to the work and the long term, not to a quarterly clock.",
  },
  {
    title: "Remote-first",
    body: "A small senior team runs the holding, distributed; each company chooses the setup that suits it.",
  },
];

export function Structure() {
  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="03"
          eyebrow="How We're Structured"
          title="A holding company, not a hierarchy."
          description="The group exists to set the philosophy, hold the quality bar, and back the operators who build — then get out of the way."
        />
      </FadeRise>

      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
        {facts.map((f, i) => (
          <FadeRise key={f.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-rule bg-surface p-6 md:p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <h3 className="font-sans font-medium tracking-[-0.01em] text-ink text-[1.125rem]">
                  {f.title}
                </h3>
              </div>
              <p className="text-body-s text-ink-muted">{f.body}</p>
            </div>
          </FadeRise>
        ))}
      </div>
    </Section>
  );
}
