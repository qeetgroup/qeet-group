import { Section } from "../layout/Section";
import { EditorialFeature } from "./EditorialFeature";

/**
 * Qeet AI.
 *
 * The organisation's own records are unusually clear that this is not a
 * chatbot — it is described as an identity, memory, knowledge and agent
 * layer that composes the other products. The section is written to defend
 * that positioning against the default reading, because "AI" on a corporate
 * site is assumed to mean an assistant until proven otherwise.
 *
 * The argument is the constraint, not the capability: what makes this
 * interesting is that it can only see what the person asking is allowed to
 * see. That is a claim a competitor cannot make cheaply, and it is true here
 * only because identity was built first.
 */
export function IntelligenceSection() {
  return (
    <Section id="intelligence" className="border-t border-rule">
      <EditorialFeature
        eyebrow="04 — Intelligence"
        headline={["The hard part was", "never the model."]}
        accentLine={1}
        slot="intelligence"
        aspect="portrait"
        flip
        cta={{ href: "/technology/intelligence", label: "How intelligence works here" }}
      >
        <p>
          Every organisation adopting artificial intelligence meets the same
          problem in the same order. The capability is easy to obtain and easy
          to demonstrate. Connecting it safely to the organisation&rsquo;s own
          information is the hard part — and the only part that produces value
          past the demonstration.
        </p>
        <p className="mt-6">
          A system that cannot see what the organisation knows is a novelty. One
          that can see all of it, regardless of who is asking, is a serious
          liability. The useful position is the narrow one between those, and
          reaching it depends entirely on knowing who is asking.
        </p>
      </EditorialFeature>
    </Section>
  );
}
