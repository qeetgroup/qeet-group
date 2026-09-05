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
        eyebrow="07 — Company"
        headline={["Progress begins", "with the right", "question."]}
        accentLine={2}
        slot="companyVision"
        aspect="editorial"
        cta={{ href: "/company/about", label: "About Qeet Group" }}
      >
        <p>
          Qeet is an acronym before it is a name: question, explore, envision,
          transform. It describes an order of operations, and the first step is
          the one most organisations skip.
        </p>
        <p className="mt-6">
          It also has consequences we would rather live with than talk around.
          It is why the organisation keeps a register of the places its own
          documentation disagrees with its code, and why a roadmap entry is not
          allowed to be cited here as a shipped capability.
        </p>
      </EditorialFeature>
    </Section>
  );
}
