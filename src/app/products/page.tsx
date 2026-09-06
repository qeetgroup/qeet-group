import NextLink from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { StatusChip } from "@/components/ui/StatusChip";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, productsListSchema } from "@/lib/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/meta";
import {
  listProductSummaries,
  listPublishableProducts,
  portfolioCounts,
  statusLabel,
  type ProductStatus,
} from "@/lib/content";

export const metadata = buildPageMetadata({
  title: "Products",
  description:
    "The Qeet Group portfolio, grouped by what has shipped — identity, payments, people, communications, observability, intelligence and the productivity suite.",
  path: "/products",
});

/**
 * ============================================================================
 * The portfolio index
 * ============================================================================
 *
 * Grouped by LIFECYCLE, not by domain. Domain grouping is what the mega menu
 * does, because someone navigating already knows what they want. Someone who
 * has landed on this page is asking a different question — what can I actually
 * use — and lifecycle answers it in the order they need.
 *
 * The consequence is that the page opens with four available products rather
 * than fifteen names, and a visitor reaches "Planned" already knowing they are
 * reading about things that do not exist yet. Sorting by domain would have
 * mixed shipped and unbuilt products in every group, which is precisely how
 * portfolio pages end up implying more than they should.
 *
 * Rows, not cards. Fifteen cards is a wall; fifteen rows is a list you can read.
 */

const GROUP_INTRO: Record<ProductStatus, string> = {
  available: "Running in production today. You can use these now.",
  development: "Being built now. Not yet available, and not presented as though they were.",
  planned: "Specified, on the roadmap, and not yet started. There is nothing to try.",
};

export default async function ProductsPage() {
  const [products, publishable, counts] = await Promise.all([
    listProductSummaries(),
    listPublishableProducts(),
    portfolioCounts(),
  ]);

  const order: ProductStatus[] = ["available", "development", "planned"];

  /*
   * Derived, not typed. This headline previously read "Fifteen products." as a
   * literal — which is exactly the hardcoded-count mistake this site is built
   * to avoid, committed in the largest text on the page, where it would survive
   * longest because nobody re-reads a headline.
   */
  const WORDS = [
    "No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen", "Twenty",
  ];
  const countWord = WORDS[counts.total] ?? String(counts.total);

  return (
    <>
      <JsonLd
        data={[
          productsListSchema(
            publishable.map((p) => ({
              slug: p.slug,
              name: p.data.name,
              description: p.data.description,
            })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
        ]}
      />

      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Products</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={[`${countWord} products.`, "Three honest states."]}
            className="max-w-[20ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              Grouped by what has actually shipped rather than by what makes the
              portfolio look largest. Every product here says which of the three
              states it is in, and the page will not let a planned one pretend
              otherwise.
            </Lede>
          </FadeRise>

          <FadeRise delay={0.55} className="mt-14">
            <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-rule pt-8">
              {order.map((s) => (
                <div key={s}>
                  <dd className="font-display text-ink text-heading-xl tabular-figures">
                    {counts[s]}
                  </dd>
                  <dt className="mt-1 font-mono text-label uppercase text-ink-subtle">
                    {statusLabel(s)}
                  </dt>
                </div>
              ))}
            </dl>
          </FadeRise>
        </Container>
      </section>

      {order.map((status) => {
        const group = products.filter((p) => p.status === status);
        if (group.length === 0) return null;

        return (
          <Section
            key={status}
            className={status === "development" ? "border-t border-rule bg-surface-sunken" : "border-t border-rule"}
          >
            <FadeRise>
              <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <StatusChip status={status} />
                  <p className="mt-4 max-w-prose text-body-l text-ink-muted">
                    {GROUP_INTRO[status]}
                  </p>
                </div>
                <p className="font-mono text-label uppercase text-ink-subtle tabular-figures">
                  {group.length} {group.length === 1 ? "product" : "products"}
                </p>
              </div>
            </FadeRise>

            <ul className="mt-12 border-t border-rule md:mt-16">
              {group.map((p) => (
                <li key={p.slug}>
                  <FadeRise>
                    <NextLink
                      href={p.href}
                      className="group/row grid grid-cols-1 gap-3 rounded-sm border-b border-rule py-8 transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:gap-8 md:py-10"
                    >
                      <span className="min-w-0 md:col-span-3">
                        <span className="block font-display text-ink text-heading-xl transition-colors duration-fast group-hover/row:text-accent-text-hover">
                          {p.name}
                        </span>
                        <span className="mt-1 block font-mono text-label uppercase text-ink-subtle">
                          {p.sector}
                        </span>
                      </span>
                      <span className="min-w-0 max-w-prose text-body-l text-ink-muted md:col-span-8">
                        {p.oneLiner}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden text-ink-subtle transition-transform duration-base group-hover/row:translate-x-1 md:col-span-1 md:block md:text-right"
                      >
                        →
                      </span>
                    </NextLink>
                  </FadeRise>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <p className="max-w-prose text-body-l text-ink-muted">
            The portfolio is not a list of independent bets. Almost everything
            here depends on the same identity layer and the same design
            foundation.
          </p>
          <Link href="/ecosystem" variant="arrow" className="mt-8 inline-flex text-body text-ink">
            See how they fit together
          </Link>
        </FadeRise>
      </Section>

      <AudiencePaths />
    </>
  );
}
