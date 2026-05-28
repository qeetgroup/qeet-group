import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { CompanyListingRow } from "@/components/ui/CompanyListingRow";
import { FadeRise } from "@/components/motion/FadeRise";
import { listCompanies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Qeet Group ventures. Each is built for what it is. They share a philosophy, not a roadmap.",
};

export default async function CompaniesPage() {
  const companies = await listCompanies();

  return (
    <>
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Our Companies</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Our companies.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-xl md:mt-12">
            <Lede>
              Each is built for what it is. They share a philosophy, not a roadmap.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section className="border-t border-rule" padding="tight">
        {companies.map((c, i) => (
          <FadeRise key={c.slug}>
            <CompanyListingRow
              name={c.data.name}
              description={c.data.description}
              sector={c.data.sector}
              stage={c.data.stage}
              founded={c.data.founded}
              externalUrl={c.data.externalUrl}
              internalHref={`/companies/${c.slug}`}
              isFirst={i === 0}
            />
          </FadeRise>
        ))}
        <p className="mt-16 border-t border-rule pt-10 font-sans text-body-s text-ink-subtle md:mt-20 md:pt-14">
          More to come.
        </p>
      </Section>
    </>
  );
}
