import { Section } from "../layout/Section";
import { IdentityGraph } from "../ui/IdentityGraph";
import { EditorialFeature } from "./EditorialFeature";

/**
 * Qeet ID, given the prominence the organisation's own records say it has:
 * the only product every other product depends on, and therefore the
 * highest-consequence component in the portfolio.
 *
 * Framed as a front door rather than as an auth product. The technical
 * vocabulary lives on the product's own site; what belongs here is why an
 * organisation should care that identity is solved once.
 */
export function IdentitySection() {
  return (
    <Section id="identity" className="border-t border-rule">
      <EditorialFeature
        eyebrow="02 — Identity"
        headline={["Everything starts", "at the same door."]}
        accentLine={1}
        media={<IdentityGraph coreLabel decorative={false} className="mx-auto max-w-md lg:max-w-none" />}
        cta={{ href: "/technology/identity", label: "How identity works here" }}
      >
        <p>
          A person signs in once and reaches everything they are entitled to
          reach. An administrator grants access in one place and revokes it in
          one place. When someone joins, the right things open on their first
          day; when they leave, they close on their last — everywhere, at once.
        </p>
        <p className="mt-6">
          That is only possible because every product asks the same system who
          someone is. It is the least visible decision in the portfolio and the
          one that constrains all the others.
        </p>
      </EditorialFeature>
    </Section>
  );
}
