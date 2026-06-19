import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";

/**
 * Group-level operating principles — how the holding works and what it backs.
 * A homepage teaser of the four principles detailed on /about.
 */
const principles = [
  {
    n: "01",
    title: "Ask better, before answering.",
    body: "We treat the framing of a problem as the highest-leverage work. Get the question right and the answer eventually finds us.",
  },
  {
    n: "02",
    title: "Build for compound returns.",
    body: "We avoid work whose value peaks at launch. Every product is built to keep getting better for a decade.",
  },
  {
    n: "03",
    title: "Take quality personally.",
    body: "The standards we ship to are the ones we'd hold a competitor to. If it isn't good enough, we say so — and fix it.",
  },
  {
    n: "04",
    title: "Trust the operator.",
    body: "Products have real autonomy. We provide capital, a philosophy, a network, and a quality bar — then get out of the way.",
  },
];

export function HowWeBuild() {
  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="02"
          eyebrow="How We Build"
          title="How we operate, and what we back."
          description="A holding structure lets us treat each product as a long campaign. Four principles run across every company in the group."
        />
      </FadeRise>

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-16 md:grid-cols-2 md:gap-y-14">
        {principles.map((p, i) => (
          <FadeRise key={p.n} delay={(i % 2) * 0.06}>
            <div className="border-t border-rule pt-6">
              <span className="font-serif font-normal tracking-[-0.02em] tabular-nums text-ink-subtle text-[2rem] leading-none">
                {p.n}
              </span>
              <h3 className="mt-4 font-sans font-medium tracking-[-0.01em] text-ink text-[1.25rem] leading-[1.3]">
                {p.title}
              </h3>
              <p className="mt-2 max-w-[30rem] text-body text-ink-muted">{p.body}</p>
            </div>
          </FadeRise>
        ))}
      </div>
    </Section>
  );
}
