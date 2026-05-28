import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { CompanyRow } from "../ui/CompanyRow";
import { FadeRise } from "../motion/FadeRise";

const companies = [
  {
    name: "Qeetid",
    description:
      "A developer-first authentication and authorization platform built for teams that want enterprise depth without the enterprise complexity.",
    tag: "Identity & Access",
    href: "/companies/qeetid",
  },
];

export function Companies() {
  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <div className="max-w-3xl">
          <Eyebrow>Our Companies</Eyebrow>
          <h2 className="mt-6 font-sans font-medium text-balance tracking-[-0.02em] text-ink text-[2rem] leading-[1.15] md:mt-8 md:text-[2.25rem] md:leading-[1.18] lg:text-[2.5rem] lg:leading-[1.2]">
            One philosophy. Many ventures.
          </h2>
        </div>
      </FadeRise>
      <div className="mt-14 md:mt-20">
        {companies.map((c, i) => (
          <FadeRise key={c.name}>
            <CompanyRow {...c} isFirst={i === 0} />
          </FadeRise>
        ))}
      </div>
      <p className="mt-10 font-sans text-body-s text-ink-subtle">More to come.</p>
    </Section>
  );
}
