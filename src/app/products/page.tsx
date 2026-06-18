import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { ProductListingRow } from "@/components/ui/ProductListingRow";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { listProducts } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { productsListSchema, breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Qeet Group's products — Qeet ID, Qeetrix, Qeet Logs, Qeet People, Qeet Notify, and Qeet Pay. Built India-first on one identity graph.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <>
      <JsonLd
        data={[
          productsListSchema(
            products.map((c) => ({
              slug: c.slug,
              name: c.data.name,
              description: c.data.description,
            })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
        ]}
      />
      <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <PageAmbient />
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Our Products</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Our products.
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
        {products.map((c, i) => (
          <FadeRise key={c.slug}>
            <ProductListingRow
              name={c.data.name}
              description={c.data.description}
              sector={c.data.sector}
              stage={c.data.stage}
              founded={c.data.founded}
              externalUrl={c.data.externalUrl}
              internalHref={`/products/${c.slug}`}
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
