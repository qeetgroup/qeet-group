import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";

/**
 * ============================================================================
 * Trust, without a single badge
 * ============================================================================
 *
 * This is the section where corporate sites reach for compliance logos, and
 * where Qeet cannot: the organisation holds no certifications, and its own
 * records list SOC 2 and a trust centre as roadmap items rather than
 * achievements. Displaying a badge would be the most damaging thing on the
 * site — it is the one claim an enterprise buyer will actually verify.
 *
 * So the section states PRINCIPLES instead, and says plainly that the
 * certifications are not held. That is a stronger position than it looks:
 * everyone claims to be secure, and almost nobody volunteers what they have
 * not done yet.
 *
 * Every principle below is drawn from the organisation's real security
 * baseline, not written for this page.
 */

const PRINCIPLES = [
  {
    title: "Least privilege",
    body: "Access is granted narrowly and explicitly. Nothing is permitted because it was convenient at the time.",
  },
  {
    title: "Secure by default",
    body: "The safe configuration is the one you get without asking. Making something less strict is a deliberate act with a name attached.",
  },
  {
    title: "Tenant isolation",
    body: "One customer's data is separated from another's by the architecture, not by the correctness of a query someone wrote on a Friday.",
  },
  {
    title: "Zero implicit trust",
    body: "Being inside the network is not a credential. Every request establishes who is asking and what they may do.",
  },
  {
    title: "Auditability",
    body: "Consequential actions are recorded so they can be produced later — and so that alteration is detectable rather than assumed away.",
  },
  {
    title: "Defence in depth",
    body: "No single control is load-bearing. Anything important is protected more than once, because controls fail.",
  },
];

export function TrustSection() {
  return (
    <Section id="trust" tone="inverse">
      <FadeRise>
        <SectionHeader
          index="05"
          eyebrow="Engineering and security"
          title="Principles, not badges."
          description="Qeet Group holds no security certifications today, and this page will not imply otherwise. What it can state is the baseline every product is built to — and where that falls short of a formal attestation, the honest word is 'yet'."
          className="[&_h2]:text-ink-inverse [&_p]:text-ink-inverse/70 [&_span]:text-ink-inverse/60"
        />
      </FadeRise>

      <dl className="mt-16 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <FadeRise key={p.title}>
            <div className="border-t border-ink-inverse/20 pt-6">
              <dt className="font-sans text-heading-m font-medium text-ink-inverse">
                {p.title}
              </dt>
              <dd className="mt-3 text-body-s text-ink-inverse/70">{p.body}</dd>
            </div>
          </FadeRise>
        ))}
      </dl>

      <FadeRise className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
        <Link href="/technology/security" variant="arrow" className="text-body text-ink-inverse">
          Read the security position
        </Link>
        <Link href="/technology/engineering" variant="arrow" className="text-body text-ink-inverse">
          How we build
        </Link>
      </FadeRise>
    </Section>
  );
}
