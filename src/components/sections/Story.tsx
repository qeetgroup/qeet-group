import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Eyebrow } from "../ui/Eyebrow";
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

/**
 * The story chapter: a signed founders' letter (the holding-company pattern —
 * Berkshire's chairman letter, Alphabet's founders' letter) with the group's
 * vision and mission set as quiet ruled statements beneath it, and the
 * milestone timeline alongside. Merges the old VisionMission + OurStory +
 * FoundersNote sections into one editorial spread.
 */
export function Story() {
  return (
    <Section className="border-t border-rule bg-surface">
      <FadeRise>
        <SectionHeader
          index="03"
          eyebrow="The Story"
          title="Built in the open, for the long term."
        />
      </FadeRise>

      <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 lg:grid-cols-12 lg:gap-16">
        {/* The letter, with vision + mission as its closing arguments. */}
        <div className="lg:col-span-7">
          <FadeRise>
            <Eyebrow>A note from the founders</Eyebrow>
            <div className="mt-8 space-y-6 font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[1.5rem] leading-[1.38] md:text-[1.75rem] md:leading-[1.36]">
              <p>
                The best companies begin from the right question, asked early — and chased for
                years, not quarters.
              </p>
              <p>
                We&rsquo;re building a family of products on one identity graph, in the open, for
                the long term. Vision is decoration until it ships; the point is to deliver the
                future we said we&rsquo;d build, on the timeline we said we&rsquo;d build it.
              </p>
            </div>
            <p className="mt-8 font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
              — The founding team · Qeet Group
            </p>
          </FadeRise>

          <FadeRise delay={0.1} className="mt-12 space-y-8 md:mt-14">
            <div className="border-l-2 border-brand pl-6">
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-3 text-body-l text-ink-muted">
                A future of limitless possibilities, where industries and individuals thrive
                through questioning, exploring, and transforming ideas into reality.
              </p>
            </div>
            <div className="border-l-2 border-rule-strong pl-6">
              <Eyebrow>Mission</Eyebrow>
              <p className="mt-3 text-body-l text-ink-muted">
                Empower people and organizations to adapt, innovate, and transform by embracing
                curiosity, exploration, and future-focused thinking.
              </p>
            </div>
          </FadeRise>
        </div>

        {/* The record — milestones as a compact rail. */}
        <div className="lg:col-span-5">
          <FadeRise delay={0.15}>
            <ol className="rounded-2xl border border-rule bg-canvas p-2 shadow-sm">
              {milestones.map((m, i) => (
                <li
                  key={m.title}
                  className={cn("p-5 md:p-6", i !== 0 && "border-t border-rule")}
                >
                  <div className="flex items-center gap-3">
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
                  <h3 className="mt-3 font-serif font-normal tracking-[-0.01em] text-ink text-[1.25rem] leading-[1.22] md:text-[1.375rem]">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-body-s text-ink-muted">{m.body}</p>
                </li>
              ))}
            </ol>
          </FadeRise>
        </div>
      </div>
    </Section>
  );
}
