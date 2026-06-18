import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { MetaPair } from "@/components/ui/MetaPair";
import { TrackedExternalLink } from "@/components/ui/TrackedExternalLink";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { PRODUCT_UI } from "@/components/product-ui/registry";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/structured-data";
import { listProducts, loadProduct } from "@/lib/content";

export const dynamicParams = false;

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return {};
  return {
    title: product.data.name,
    description: product.data.description,
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const { data, content } = product;
  const externalLabel = data.externalUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const Mock = PRODUCT_UI[slug];

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            slug,
            name: data.name,
            description: data.description,
            sector: data.sector,
            externalUrl: data.externalUrl,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: data.name, path: `/products/${slug}` },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-20 md:pb-20 md:pt-28 lg:pt-32">
        <PageAmbient />
        <Container>
          <FadeRise>
            <Link href="/products" variant="arrow" className="text-body-s text-ink-muted">
              <span className="inline-block rotate-180 mr-1" aria-hidden="true">→</span>
              All products
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

      {/* Product preview */}
      {Mock && (
        <section className="pb-4 md:pb-8">
          <Container>
            <FadeRise>
              <div className="relative overflow-hidden rounded-3xl border border-rule bg-canvas/40 p-8 md:p-16">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-rule)_1px,transparent_1px)] bg-size-[18px_18px] opacity-50"
                />
                <div className="relative mx-auto max-w-[26rem]">
                  <Mock />
                </div>
              </div>
            </FadeRise>
          </Container>
        </section>
      )}

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
                  <TrackedExternalLink
                    href={data.externalUrl}
                    slug={slug}
                    label="meta-strip"
                    className="text-ink"
                  >
                    {externalLabel}
                  </TrackedExternalLink>
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
              <TrackedExternalLink
                href={data.externalUrl}
                slug={slug}
                label="closing-cta"
                className="text-body text-ink-inverse"
              >
                Visit {externalLabel}
              </TrackedExternalLink>
            </div>
          </div>
        </FadeRise>
      </Section>
    </>
  );
}
