import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";
import { cn } from "@/lib/utils";

type Milestone = {
  when: string;
  title: string;
  body: string;
  /** Upcoming milestones render a hollow marker. */
  upcoming?: boolean;
};

const milestones: Milestone[] = [
  {
    when: "2026 · Founding",
    title: "One question, a long horizon.",
    body: "Qeet Group starts as a multi-company holding — built to back products that compound over years, not quarters.",
  },
  {
    when: "2026 · Qeet ID",
    title: "The identity platform ships.",
    body: "Passkeys, SSO, RBAC, and a hash-chained audit log go generally available — the spine the rest of the group builds on.",
  },
  {
    when: "2026 · Qeetrix",
    title: "One design system for every product.",
    body: "The shared token-and-component foundation enters early access, so every surface feels like one family.",
  },
  {
    when: "Next",
    title: "The platform expands.",
    body: "Logs, People, Notify, and Pay — each on the same identity graph, and built to the same quality bar.",
    upcoming: true,
  },
];

export function OurStory() {
  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="04"
          eyebrow="Our Story"
          title="Built in the open, for the long term."
          description="A young group with a clear trajectory — here's where we are, and where we're headed."
        />
      </FadeRise>

      <ol className="mt-12 md:mt-16">
        {milestones.map((m, i) => (
          <FadeRise key={m.title} delay={i * 0.05}>
            <li
              className={cn(
                "grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10",
                i !== 0 && "border-t border-rule",
              )}
            >
              <div className="flex items-center gap-3 md:col-span-3 lg:col-span-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    m.upcoming ? "border border-brand" : "bg-brand",
                  )}
                />
                <span className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                  {m.when}
                </span>
              </div>
              <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
                <h3 className="font-serif font-normal tracking-[-0.01em] text-ink text-[1.5rem] leading-[1.18] md:text-[1.75rem]">
                  {m.title}
                </h3>
                <p className="mt-2 max-w-[40rem] text-body text-ink-muted">{m.body}</p>
              </div>
            </li>
          </FadeRise>
        ))}
      </ol>
    </Section>
  );
}
