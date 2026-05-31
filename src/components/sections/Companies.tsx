import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { CompanyRow } from "../ui/CompanyRow";
import { FadeRise } from "../motion/FadeRise";
import { listCompanies } from "@/lib/content";

const HOME_LIMIT = 3;

export async function Companies() {
  const all = await listCompanies();
  const featured = all.slice(0, HOME_LIMIT);

  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <div className="max-w-3xl">
          <Eyebrow>Our Companies</Eyebrow>
          <h2 className="mt-6 font-sans font-medium text-balance tracking-[-0.02em] text-ink text-[2rem] leading-[1.15] md:mt-8 md:text-[2.25rem] md:leading-[1.18] lg:text-[2.5rem] lg:leading-[1.2]">
            One philosophy. Many companies.
          </h2>
        </div>
      </FadeRise>
      <div className="mt-14 md:mt-20">
        {featured.map((c, i) => (
          <FadeRise key={c.slug}>
            <CompanyRow
              name={c.data.name}
              description={c.data.description}
              tag={c.data.sector}
              href={`/companies/${c.slug}`}
              isFirst={i === 0}
            />
          </FadeRise>
        ))}
      </div>
      {all.length > HOME_LIMIT && (
        <p className="mt-10 font-sans text-body-s text-ink-subtle">
          And {all.length - HOME_LIMIT} more.
        </p>
      )}
      {all.length <= HOME_LIMIT && (
        <p className="mt-10 font-sans text-body-s text-ink-subtle">More to come.</p>
      )}
    </Section>
  );
}
