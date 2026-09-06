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
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { listProductSummaries, listTechnology, loadTechnology } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/meta";

export const dynamicParams = false;

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const items = await listTechnology();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await loadTechnology(slug);
  if (!item) return {};
  return buildPageMetadata({
    title: item.data.title,
    description: item.data.dek,
    path: `/technology/${slug}`,
  });
}

/**
 * A capability page.
 *
 * The cross-links at the foot are the point of the template: a capability that
 * cannot name the products delivering it is marketing. Those products carry
 * their real lifecycle status here too — so a capability delivered only by
 * something still in development says so, on the same page that describes it.
 */
export default async function TechnologyDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const item = await loadTechnology(slug);
  if (!item) notFound();

  const all = await listProductSummaries();
  const delivered = (item.data.products ?? [])
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
          { name: item.data.title, path: `/technology/${slug}` },
        ])}
      />

      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            {/* Same items as the JSON-LD above, deliberately — the visible
                trail and the structured one disagreeing is a classic SEO bug. */}
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Technology", path: "/technology" },
                { name: item.data.title, path: `/technology/${slug}` },
              ]}
            />
          </FadeRise>
          <FadeRise className="mt-10">
            <Eyebrow>{item.data.eyebrow}</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={[item.data.title]}
            className="mt-6 text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.3} className="mt-8 max-w-2xl">
            <Lede>{item.data.dek}</Lede>
          </FadeRise>
        </Container>
      </section>

      <Section padding="tight">
        <FadeRise>
          <article className="max-w-measure">
            <MDXRemote source={item.content} components={mdxComponents} />
          </article>
        </FadeRise>
      </Section>

      {delivered.length > 0 && (
        <Section className="border-t border-rule bg-surface-sunken" padding="tight">
          <FadeRise>
            <Eyebrow className="mb-8">Delivered by</Eyebrow>
            <ul className="border-t border-rule">
              {delivered.map((p) => (
                <li key={p.slug}>
                  <NextLink
                    href={p.href}
                    className="group/prod grid grid-cols-1 gap-2 border-b border-rule py-6 transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:items-baseline md:gap-8"
                  >
                    <span className="font-display text-ink text-heading-xl transition-colors duration-fast group-hover/prod:text-accent-text-hover md:col-span-3">
                      {p.name}
                    </span>
                    <span className="text-body text-ink-muted md:col-span-7">
                      {p.oneLiner}
                    </span>
                    <span className="md:col-span-2 md:text-right">
                      <StatusChip status={p.status} />
                    </span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </FadeRise>
        </Section>
      )}
    </>
  );
}
