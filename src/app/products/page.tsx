import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { ProductListingRow } from "@/components/ui/ProductListingRow";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { listProducts } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { productsListSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata = buildPageMetadata({
  title: "Products",
  description:
    "Explore Qeet Group's products — Qeet ID, Qeetrix, Qeet Logs, Qeet People, Qeet Notify, and Qeet Pay. Built on one identity graph.",
  path: "/products",
});

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
            <h1 className="text-balance font-display font-normal text-ink text-display-xl">
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
