import NextLink from "next/link";
import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusPill } from "../ui/StatusPill";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { Spotlight } from "../motion/Spotlight";
import { PRODUCT_UI } from "../product-ui/registry";
import { cn } from "@/lib/utils";
import { listProducts } from "@/lib/content";

/**
 * Asymmetric bento grid for the group portfolio. The first product (ordered by
 * the `order` frontmatter field — Qeet ID) occupies a 2×2 featured cell with
 * larger typography and the product description. Remaining products sit in 1×1
 * cells. Spotlight glow follows the cursor on every card. Data-driven: adding
 * an MDX file adds a card; no hardcoded list.
 */
function SectorIcon({ sector }: { sector: string }) {
  switch (sector) {
    case "Identity & Access":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "Design Systems":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "Observability":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 13l4-1 3 6 4-13 3 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Human Capital Management":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 20a5 5 0 0 1 10 0M16 5.2A3 3 0 0 1 16 11M20 20a5 5 0 0 0-3-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "Notification Infrastructure":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "Payments & Billing":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

export async function ProductsBento() {
  const products = await listProducts();

  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="01"
          eyebrow="The portfolio"
          title="One philosophy. Many products."
          description="Each platform is built for what it is — and every one of them runs on the same identity graph, design system, and quality bar."
        />
      </FadeRise>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(180px,auto))]">
        {products.map((p, i) => {
          const isFeatured = i === 0;
          const FeaturedMock = isFeatured ? PRODUCT_UI[p.slug] : undefined;
          return (
            <FadeRise
              key={p.slug}
              delay={(i % 3) * 0.06}
              className={cn("h-full", isFeatured && "lg:col-span-2 lg:row-span-2")}
            >
              <Spotlight
                color="color-mix(in oklab, var(--color-brand) 10%, transparent)"
                className="h-full rounded-2xl"
              >
                <NextLink
                  href={`/products/${p.slug}`}
                  className={cn(
                    "group/card glass-panel flex h-full flex-col rounded-2xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    isFeatured ? "p-7 md:p-9" : "p-6 md:p-7",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center rounded-xl border border-rule bg-canvas text-ink transition-colors duration-300 group-hover/card:border-brand/40 group-hover/card:text-brand",
                        isFeatured ? "h-13 w-13" : "h-11 w-11",
                      )}
                    >
                      <SectorIcon sector={p.data.sector} />
                    </span>
                    <StatusPill stage={p.data.stage} />
                  </div>

                  <h3
                    className={cn(
                      "mt-6 font-display font-semibold tracking-tight text-ink leading-[1.05]",
                      isFeatured ? "text-[2rem] lg:text-[2.25rem]" : "text-[1.625rem]",
                    )}
                  >
                    {p.data.name}
                  </h3>

                  <p className={cn("mt-3 text-ink-muted", isFeatured ? "text-body" : "text-body-s")}>
                    {p.data.tagline}
                  </p>

                  {isFeatured && (
                    <p className="mt-4 text-body-s text-ink-subtle">
                      {p.data.description}
                    </p>
                  )}

                  {/* Featured cell: the product's real UI mock as the visual
                      payload — the flagship shows, the rest tell. Decorative
                      (each mock is aria-hidden internally); masked at the
                      bottom so it reads as a glimpse, not a screenshot. */}
                  {isFeatured && FeaturedMock ? (
                    <div className="relative mt-6 hidden flex-1 items-end overflow-hidden lg:flex [mask-image:linear-gradient(to_bottom,black_58%,transparent_96%)]">
                      <div className="w-full transition-transform duration-500 ease-out-expo group-hover/card:-translate-y-1.5">
                        <FeaturedMock />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1" />
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                    <span className="font-mono text-caption uppercase tracking-[0.12em] text-ink-subtle">
                      {p.data.sector}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-ink-subtle transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:text-brand"
                    >
                      →
                    </span>
                  </div>
                </NextLink>
              </Spotlight>
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
