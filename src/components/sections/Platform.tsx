import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";
import { listProducts } from "@/lib/content";

const pillars = [
  {
    title: "One identity graph",
    body: "Every product authenticates, authorizes, and audits on Qeet ID — sessions, RBAC, and a hash-chained log, shared.",
  },
  {
    title: "One design system",
    body: "Qeetrix tokens and components make every surface feel like one family, from sign-in to checkout.",
  },
  {
    title: "One quality bar",
    body: "Shared standards across the group: nothing ships that the team can't stand behind.",
  },
];

export async function Platform() {
  const products = await listProducts();
  const surfaces = products.filter((p) => p.slug !== "qeetid");

  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="02"
          eyebrow="The Platform"
          title="Many products. One foundation."
          description="Qeet products aren't a loose collection of apps — they share an identity graph, a design system, and a quality bar. Build on one, and the rest fit."
        />
      </FadeRise>

      {/* Layered architecture diagram */}
      <FadeRise className="mt-12 md:mt-16">
        <div className="rounded-3xl border border-rule bg-surface p-6 shadow-sm md:p-10">
          <p className="mb-5 text-center font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
            Product surfaces
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {surfaces.map((p) => (
              <span
                key={p.slug}
                className="rounded-xl border border-rule bg-canvas px-4 py-2.5 font-sans text-body-s text-ink"
              >
                {p.data.name}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center gap-4 text-ink-subtle">
            <span className="h-px flex-1 bg-rule" />
            <span className="font-sans text-caption uppercase tracking-[0.14em]">
              all build on
            </span>
            <span className="h-px flex-1 bg-rule" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-brand/8 px-6 py-6 text-center sm:flex-row sm:gap-3">
            <span className="font-serif font-normal tracking-[-0.015em] text-ink text-[1.75rem] leading-none">
              Qeet ID
            </span>
            <span className="hidden text-ink-subtle sm:inline">·</span>
            <span className="font-sans text-body text-ink-muted">one identity graph</span>
          </div>
        </div>
      </FadeRise>

      {/* Pillars */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
        {pillars.map((p, i) => (
          <FadeRise key={p.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-rule bg-surface p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <h3 className="font-sans font-medium tracking-[-0.01em] text-ink text-[1.125rem]">
                  {p.title}
                </h3>
              </div>
              <p className="text-body-s text-ink-muted">{p.body}</p>
            </div>
          </FadeRise>
        ))}
      </div>
    </Section>
  );
}
