import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { BentoCard } from "../ui/BentoCard";
import { FadeRise } from "../motion/FadeRise";
import { Link } from "../ui/Link";
import { PRODUCT_UI } from "../product-ui/registry";
import { listProducts } from "@/lib/content";

/**
 * Bento layout per product slug. Qeet ID is the featured tile (3 cols × 2
 * rows); the rest fill a 6-column grid. Order matches listProducts() (by the
 * `order` frontmatter), so default grid auto-placement produces the bento.
 */
const SPAN: Record<string, string> = {
  qeetid: "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  qeetrix: "lg:col-span-3",
  "qeet-people": "lg:col-span-3",
  "qeet-logs": "lg:col-span-2",
  "qeet-notify": "lg:col-span-2",
  "qeet-pay": "lg:col-span-2",
};

export async function ProductsBento() {
  const products = await listProducts();

  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="01"
          eyebrow="Our Products"
          title="One platform. Many products."
          description="Six products on one identity graph — each built for what it is, sharing a philosophy, a design system, and a quality bar."
        />
      </FadeRise>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-6 lg:auto-rows-[18rem]">
        {products.map((p, i) => {
          const Mock = PRODUCT_UI[p.slug];
          return (
            <FadeRise
              key={p.slug}
              delay={Math.min(i, 3) * 0.06}
              className={SPAN[p.slug] ?? "lg:col-span-2"}
            >
              <BentoCard
                name={p.data.name}
                tagline={p.data.tagline}
                stage={p.data.stage}
                href={`/products/${p.slug}`}
              >
                {Mock ? <Mock /> : null}
              </BentoCard>
            </FadeRise>
          );
        })}
      </div>

      <FadeRise className="mt-10 md:mt-12">
        <Link href="/products" variant="arrow" className="text-body text-ink">
          Explore all products
        </Link>
      </FadeRise>
    </Section>
  );
}
