import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { MetaPair } from "@/components/ui/MetaPair";
import { FadeRise } from "@/components/motion/FadeRise";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { listCompanies, loadCompany } from "@/lib/content";

export const dynamicParams = false;

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const companies = await listCompanies();
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await loadCompany(slug);
  if (!company) return {};
  return {
    title: company.data.name,
    description: company.data.description,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const company = await loadCompany(slug);
  if (!company) notFound();

  const { data, content } = company;
  const externalLabel = data.externalUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-20 md:pb-20 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Link href="/companies" variant="arrow" className="text-body-s text-ink-muted">
              <span className="inline-block rotate-180 mr-1" aria-hidden="true">→</span>
              All companies
            </Link>
          </FadeRise>
          <FadeRise delay={0.1} className="mt-10 md:mt-14">
            <Eyebrow className="mb-6 md:mb-8">{data.tagline}</Eyebrow>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[3rem] leading-[1.04] sm:text-[4rem] md:text-[5.5rem] md:leading-[1.03] lg:text-[7rem] lg:leading-[1.02]">
              {data.name}
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>{data.description}</Lede>
          </FadeRise>
        </Container>
      </section>

      {/* Meta strip */}
      <section className="border-t border-rule py-10 md:py-14">
        <Container>
          <FadeRise>
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 md:grid-cols-4 md:gap-x-8">
              <MetaPair label="Sector" value={data.sector} />
              <MetaPair label="Stage" value={data.stage} />
              <MetaPair label="Founded" value={data.founded} />
              <div>
                <Eyebrow>Site</Eyebrow>
                <p className="mt-2 font-sans text-body text-ink">
                  <Link href={data.externalUrl} className="text-ink">
                    {externalLabel}
                  </Link>
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* MDX body */}
      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <article className="max-w-[42rem]">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </FadeRise>
      </Section>

      {/* Closing external CTA */}
      <Section tone="inverse" padding="tight">
        <FadeRise>
          <div className="max-w-3xl">
            <p className="font-serif font-normal text-balance tracking-[-0.015em] text-ink-inverse text-[2rem] leading-[1.1] md:text-[2.75rem] md:leading-[1.08] lg:text-[3.5rem] lg:leading-[1.06]">
              The product, documentation, and pricing live at {externalLabel}.
            </p>
            <div className="mt-10 md:mt-12">
              <Link href={data.externalUrl} className="text-body text-ink-inverse">
                Visit {externalLabel}
              </Link>
            </div>
          </div>
        </FadeRise>
      </Section>
    </>
  );
}
