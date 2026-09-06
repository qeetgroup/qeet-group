import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusChip } from "@/components/ui/StatusChip";
import { MetaPair } from "@/components/ui/MetaPair";
import { TrackedExternalLink } from "@/components/ui/TrackedExternalLink";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { Figure } from "@/components/media/Figure";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { hasProductVisual, ProductVisual } from "@/components/product-ui/registry";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/structured-data";
import { listProducts, listProductSummaries, loadProduct } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/meta";
import { isLive } from "@/config/live-hosts";

export const dynamicParams = false;

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return {};
  return buildPageMetadata({
    title: product.data.name,
    description: product.data.description,
    path: `/products/${slug}`,
  });
}

/**
 * ============================================================================
 * The product template
 * ============================================================================
 *
 * One template, three behaviours, driven entirely by lifecycle status. The
 * whole point is that the honesty is STRUCTURAL rather than editorial — a
 * planned product cannot be given a "Visit" button by someone writing copy,
 * because the button is not rendered for it at all.
 *
 *   available    full treatment: product visual, outbound links, closing CTA
 *   development  same page, no outbound links, explicit "not yet" close
 *   planned      no visual (there is no interface to abstract), no links, and
 *                a close that states plainly there is nothing to try
 *
 * The related rail at the foot is domain-grouped rather than lifecycle-grouped
 * — someone reading about payments wants the other business products, not the
 * other things that happen to have shipped.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const { data, content } = product;

  /*
   * Two conditions, not one. A planned product has nowhere to send anyone by
   * definition — but a product that is being built may have a zone reserved
   * whose DNS does not exist yet, and linking to that is a broken link on a
   * page whose entire argument is that we do not overstate things.
   *
   * `externalUrl` in frontmatter is the zone the product WILL own; this is
   * where it becomes a link, and only if someone can actually arrive.
   */
  const externalUrl =
    data.status !== "planned" && isLive(data.externalUrl) ? data.externalUrl : undefined;
  const externalLabel = externalUrl?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const hasVisual = hasProductVisual(slug);

  const all = await listProductSummaries();
  const related = all.filter((p) => p.group === data.group && p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            slug,
            name: data.name,
            description: data.description,
            sector: data.sector,
            externalUrl,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: data.name, path: `/products/${slug}` },
          ]),
        ]}
      />

      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: data.name, path: `/products/${slug}` },
              ]}
            />
          </FadeRise>

          <div className="mt-10 grid-editorial items-end">
            <div className="col-lede">
              <FadeRise>
                <StatusChip status={data.status} />
              </FadeRise>
              <RevealLines
                as="h1"
                lines={[data.name]}
                className="mt-6 text-balance font-display text-ink text-display-2xl"
              />
              <FadeRise delay={0.3} className="mt-6">
                <p className="text-balance font-display text-accent-text-display text-display-m">
                  {data.tagline}
                </p>
              </FadeRise>
              <FadeRise delay={0.45} className="mt-8 max-w-xl">
                <Lede>{data.oneLiner}</Lede>
              </FadeRise>
            </div>

            {/* The visual side. A product with no interface yet gets an
                abstract figure rather than an invented screen. */}
            <div className="col-figure">
              <FadeRise delay={0.2}>
                {hasVisual ? (
                  <div className="aspect-editorial flex items-center justify-center rounded-xl border border-rule bg-surface p-8">
                    <ProductVisual slug={slug} />
                  </div>
                ) : (
                  <Figure
                    slot={data.status === "planned" ? "positioning" : "engineering"}
                    aspect="editorial"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                )}
              </FadeRise>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-rule py-10 md:py-12">
        <Container width="wide">
          <FadeRise>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8">
              <MetaPair label="Sector" value={data.sector} />
              <div>
                <Eyebrow>Status</Eyebrow>
                <StatusChip status={data.status} className="mt-2" />
              </div>
              {externalUrl && (
                <div>
                  <Eyebrow>Site</Eyebrow>
                  <p className="mt-2 font-sans text-body text-ink">
                    <TrackedExternalLink
                      href={externalUrl}
                      slug={slug}
                      label="meta-strip"
                      className="text-ink"
                    >
                      {externalLabel}
                    </TrackedExternalLink>
                  </p>
                </div>
              )}
            </div>
          </FadeRise>
        </Container>
      </section>

      <Section padding="tight">
        <FadeRise>
          <article className="max-w-measure">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </FadeRise>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-rule bg-surface-sunken" padding="tight">
          <FadeRise>
            <Eyebrow className="mb-8">Related in the portfolio</Eyebrow>
            <ul className="border-t border-rule">
              {related.map((p) => (
                <li key={p.slug}>
                  <NextLink
                    href={p.href}
                    className="group/rel grid grid-cols-1 gap-2 rounded-sm border-b border-rule py-6 transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:items-baseline md:gap-8"
                  >
                    <span className="font-display text-ink text-heading-l transition-colors duration-fast group-hover/rel:text-accent-text-hover md:col-span-3">
                      {p.name}
                    </span>
                    <span className="text-body text-ink-muted md:col-span-7">{p.oneLiner}</span>
                    <span className="md:col-span-2 md:text-right">
                      <StatusChip status={p.status} showDot={false} />
                    </span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </FadeRise>
        </Section>
      )}

      <Section tone="inverse" padding="tight">
        <FadeRise>
          <div className="max-w-3xl">
            {externalUrl ? (
              <>
                <p className="text-balance font-display text-ink-inverse text-display-l">
                  {data.name} lives at {externalLabel}.
                </p>
                <div className="mt-10">
                  <TrackedExternalLink
                    href={externalUrl}
                    slug={slug}
                    label="closing-cta"
                    className="text-body text-ink-inverse"
                  >
                    Visit {externalLabel}
                  </TrackedExternalLink>
                </div>
              </>
            ) : (
              <>
                <p className="text-balance font-display text-ink-inverse text-display-l">
                  {data.name} is planned. There is nothing to try yet.
                </p>
                <p className="mt-6 max-w-prose text-body-l text-ink-inverse/70">
                  It is specified and on the roadmap. When it ships it will be
                  listed as available — here, and everywhere else on this site,
                  at the same time.
                </p>
                <NextLink
                  href="/products"
                  className="mt-10 inline-flex items-center gap-2 rounded-sm text-body text-ink-inverse focus-ring"
                >
                  See what is available today
                  <span aria-hidden="true">→</span>
                </NextLink>
              </>
            )}
          </div>
        </FadeRise>
      </Section>
    </>
  );
}
