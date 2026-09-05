import { Section } from "../layout/Section";
import { EditorialFeature } from "./EditorialFeature";

/**
 * The company, told through its founding question rather than through a
 * mission statement.
 *
 * Q·E·E·T — Question, Explore, Envision, Transform — is the organisation's
 * own published acronym, not something written for this page. Using the real
 * one matters: an invented value set is detectable, and a corporate site that
 * invents its own principles has nothing left to be believed about.
 */
export function CompanySection() {
  return (
    <Section id="company" className="border-t border-rule bg-surface-sunken">
      <EditorialFeature
        eyebrow="02 — Company"
        headline={["Progress begins", "with the right", "question."]}
        accentLine={2}
        slot="companyVision"
        aspect="editorial"
        cta={{ href: "/company/about", label: "About Qeet Group" }}
      >
        <p>
          Qeet is an acronym before it is a name: question, explore, envision,
          transform. These are not values arranged for a wall; they describe how
          we move from uncertainty to useful work.
        </p>
        <p className="mt-6">
          Qeet Group is being built for a long horizon. That means choosing
          clarity over noise, treating every product as part of a larger whole
          and being candid about what is here today and what still lies ahead.
        </p>
      </EditorialFeature>
    </Section>
  );
}
