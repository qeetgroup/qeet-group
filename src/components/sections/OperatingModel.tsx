import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";

/**
 * The operating model — how the holding builds (four principles) and how it's
 * structured (three facts), merged into one chapter. Principles keep their
 * numbering (they're the group's actual ordered doctrine); structure facts sit
 * beneath as a compact ruled strip, denser and quieter than the old card grid.
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

const structure = [
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

export function OperatingModel() {
  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="02"
          eyebrow="Operating Model"
          title="A holding company, not a hierarchy."
          description="A holding structure lets us treat each product as a long campaign. Four principles run across every company in the group — and the structure exists to protect them."
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

      {/* Structure strip — the how-we're-organized facts, one ruled row each. */}
      <FadeRise className="mt-14 md:mt-20">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-rule bg-surface md:grid-cols-3">
          {structure.map((f, i) => (
            <div
              key={f.title}
              className={
                i === 0
                  ? "p-6 md:p-7"
                  : "border-t border-rule p-6 md:border-l md:border-t-0 md:p-7"
              }
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
                <h3 className="font-sans font-medium tracking-[-0.01em] text-ink text-[1.125rem]">
                  {f.title}
                </h3>
              </div>
              <p className="text-body-s text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </FadeRise>
    </Section>
  );
}
