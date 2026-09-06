import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/components/ui/Link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Figure } from "@/components/media/Figure";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { buildPageMetadata } from "@/lib/seo/meta";
import { SITE_ORIGIN } from "@/config/site";
import { formatDate } from "@/lib/format";
import { listInsights, loadInsight } from "@/lib/content";

export const dynamicParams = false;

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const posts = await listInsights();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadInsight(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.data.title.replace(/\.$/, ""),
    description: post.data.dek,
    // /insights, not /newsroom. The canonical previously pointed at a path
    // that now 308s — a canonical that redirects is a self-inflicted signal
    // problem, and it is invisible until someone audits it.
    path: `/insights/${slug}`,
    ogType: "article",
    article: {
      publishedTime: post.data.date,
      authors: [post.data.author ?? "Qeet Group"],
    },
  });
}

/**
 * ============================================================================
 * The article template
 * ============================================================================
 *
 * An editorial page rather than a blog post: a full-width opening figure, a
 * measured column for the body, and a reading-progress hairline so a long
 * piece tells you where you are.
 *
 * The measure is deliberately narrow (~42rem, roughly 70 characters). Nothing
 * about a wide layout helps someone read; the column width is the single most
 * consequential typographic decision on a page whose entire purpose is being
 * read.
 *
 * Demonstration content is labelled at the top of the article, not in a
 * footnote. A reader who reaches the end and only then discovers a piece was
 * illustrative has already formed the impression it was not.
 */
export default async function InsightPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await loadInsight(slug);
  if (!post) notFound();

  const { data, content } = post;
  const all = await listInsights();
  const index = all.findIndex((p) => p.slug === slug);

  // Returned newest-first, so "newer" is a LOWER index. Both ends wrap to null.
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  // Same topic first, then most recent — so "related" means related, and only
  // falls back to recency when there is nothing genuinely adjacent.
  const related = [
    ...all.filter((p) => p.slug !== slug && p.data.topic === data.topic),
    ...all.filter((p) => p.slug !== slug && p.data.topic !== data.topic),
  ].slice(0, 2);

  const shareUrl = `${SITE_ORIGIN}/insights/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: data.title.replace(/\.$/, ""), path: `/insights/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            slug,
            title: data.title,
            dek: data.dek,
            date: data.date,
            author: data.author,
            topic: data.topic,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <ReadingProgress />

      <section className="border-b border-rule pb-12 pt-32 md:pb-16 md:pt-40">
        <Container width="wide">
          <FadeRise>
            <Breadcrumbs items={crumbs} />
          </FadeRise>

          <div className="mt-10 max-w-4xl">
            <FadeRise>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-ink-subtle">
                <NextLink
                  href={`/insights/topic/${data.topic.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-sm text-accent-text focus-ring"
                >
                  {data.topic}
                </NextLink>
                <span aria-hidden="true">·</span>
                <time dateTime={data.date}>{formatDate(data.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min read</span>
                {data.demo && <DemoBadge />}
              </p>
            </FadeRise>

            <RevealLines
              as="h1"
              lines={[data.title]}
              className="mt-6 text-balance font-display text-ink text-display-l"
            />

            <FadeRise delay={0.3} className="mt-7 max-w-measure">
              <p className="text-body-l text-ink-muted">{data.dek}</p>
            </FadeRise>

            {data.author && (
              <FadeRise delay={0.4} className="mt-9">
                <p className="font-sans text-body-s text-ink-subtle">By {data.author}</p>
              </FadeRise>
            )}
          </div>
        </Container>
      </section>

      <Container width="wide">
        <FadeRise className="pt-12 md:pt-16">
          <Figure
            slot="insightFallback"
            aspect="editorial"
            priority
            sizes="(min-width: 1536px) 1400px, 100vw"
          />
        </FadeRise>
      </Container>

      <Section padding="tight">
        <FadeRise>
          {/* ~70 characters. The one measurement that decides whether a long
              piece gets finished. */}
          <article className="max-w-measure">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </FadeRise>
      </Section>

      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Eyebrow>Share</Eyebrow>
            <Link
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(shareUrl)}`}
              className="text-body-s text-ink-muted"
            >
              X
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              className="text-body-s text-ink-muted"
            >
              LinkedIn
            </Link>
          </div>
        </FadeRise>
      </Section>

      {(newer || older) && (
        <Section className="border-t border-rule" padding="tight">
          <nav aria-label="More insights" className="grid gap-8 md:grid-cols-2">
            {[
              { item: newer, label: "Newer" },
              { item: older, label: "Older" },
            ].map(({ item, label }) =>
              item ? (
                <FadeRise key={label}>
                  <NextLink
                    href={`/insights/${item.slug}`}
                    className="group/nav block rounded-sm border-t border-rule pt-6 focus-ring"
                  >
                    <span className="font-mono text-label uppercase text-ink-subtle">
                      {label}
                    </span>
                    <span className="mt-3 block text-balance font-display text-ink text-heading-l transition-colors duration-fast group-hover/nav:text-accent-text-hover">
                      {item.data.title}
                    </span>
                  </NextLink>
                </FadeRise>
              ) : (
                <div key={label} aria-hidden="true" />
              ),
            )}
          </nav>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="border-t border-rule bg-surface-sunken" padding="tight">
          <FadeRise>
            <Eyebrow className="mb-8">Related</Eyebrow>
            <ul className="border-t border-rule">
              {related.map((p) => (
                <li key={p.slug}>
                  <NextLink
                    href={`/insights/${p.slug}`}
                    className="group/rel grid grid-cols-1 gap-2 rounded-sm border-b border-rule py-6 transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:items-baseline md:gap-8"
                  >
                    <span className="flex flex-wrap items-center gap-2 font-mono text-label uppercase text-ink-subtle md:col-span-3">
                      {p.data.topic}
                      {p.data.demo && <DemoBadge />}
                    </span>
                    <span className="text-balance font-sans text-heading-m font-medium text-ink transition-colors duration-fast group-hover/rel:text-accent-text-hover md:col-span-9">
                      {p.data.title}
                    </span>
                  </NextLink>
                </li>
              ))}
            </ul>
            <Link href="/insights" variant="arrow" className="mt-10 inline-flex text-body text-ink">
              All insights
            </Link>
          </FadeRise>
        </Section>
      )}
    </>
  );
}
