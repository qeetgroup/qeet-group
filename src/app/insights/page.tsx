import NextLink from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { Figure } from "@/components/media/Figure";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { InsightList } from "@/components/sections/InsightList";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { formatDate } from "@/lib/format";
import { leadInsight, listInsights, listInsightTopics } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata = buildPageMetadata({
  title: "Insights",
  description:
    "Perspectives, engineering notes, research and announcements from Qeet Group.",
  path: "/insights",
});

/**
 * ============================================================================
 * The insights hub
 * ============================================================================
 *
 * Built as a publication front page, not a post list. The distinction is the
 * lead: every editorial reference — Accenture, Deloitte, Capgemini, IBM —
 * opens with ONE dominant story and supports it with a rail, because that
 * hierarchy is what says somebody decided which piece mattered most. An
 * undifferentiated list says nobody did.
 *
 * The lead is chosen by the loader (explicit `featured`, falling back to most
 * recent), so the page is never empty and never depends on someone
 * remembering to move a flag.
 *
 * The previous version was headed "Newsroom" and described "announcements and
 * milestones from Qeet Group and its companies" — a section for press
 * releases. Insights carries essays and engineering writing too, and the
 * topic rail exists so those are findable rather than buried under the
 * announcements.
 */
export default async function InsightsPage() {
  const [lead, all, topics] = await Promise.all([
    leadInsight(),
    listInsights(),
    listInsightTopics(),
  ]);

  const rest = lead ? all.filter((i) => i.slug !== lead.slug) : all;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />

      <section className="relative isolate overflow-hidden border-b border-rule pb-14 pt-32 md:pb-16 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Insights</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["What we think,", "written down."]}
            className="max-w-[18ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Lede className="max-w-2xl">
              Perspectives, engineering notes, research and announcements. Where
              a piece is illustrative rather than reported, it says so on the
              page.
            </Lede>
            <Link
              href="/insights/rss.xml"
              className="shrink-0 font-mono text-label uppercase text-ink-muted"
            >
              Subscribe via RSS
            </Link>
          </FadeRise>
        </Container>
      </section>

      {lead && (
        <Section padding="tight">
          <FadeRise>
            <NextLink
              href={`/insights/${lead.slug}`}
              className="group/lead grid-editorial items-center rounded-sm focus-ring"
            >
              <div className="col-figure lg:order-2">
                <Figure
                  slot="insightFallback"
                  aspect="editorial"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="col-lede lg:order-1">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-ink-subtle">
                  <span className="text-accent-text">{lead.data.topic}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={lead.data.date}>{formatDate(lead.data.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{lead.readingTime} min read</span>
                  {lead.data.demo && <DemoBadge />}
                </p>
                <h2 className="mt-5 text-balance font-display text-ink text-display-l transition-colors duration-fast group-hover/lead:text-accent-text-hover">
                  {lead.data.title}
                </h2>
                <p className="mt-6 max-w-prose text-body-l text-ink-muted">{lead.data.dek}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-body text-ink">
                  Read
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-base group-hover/lead:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </NextLink>
          </FadeRise>
        </Section>
      )}

      {topics.length > 1 && (
        <Section className="border-t border-rule" padding="tight">
          <FadeRise>
            <Eyebrow className="mb-6">Browse by topic</Eyebrow>
            <ul className="flex flex-wrap gap-x-3 gap-y-3">
              {topics.map((t) => (
                <li key={t}>
                  <NextLink
                    href={`/insights/topic/${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center rounded-full border border-rule px-4 py-1.5 font-sans text-body-s text-ink-muted transition-colors duration-fast hover:border-rule-strong hover:text-ink focus-ring"
                  >
                    {t}
                  </NextLink>
                </li>
              ))}
            </ul>
          </FadeRise>
        </Section>
      )}

      <Section className="border-t border-rule" padding="tight">
        {rest.length === 0 ? (
          <p className="text-body text-ink-muted">Nothing else published yet.</p>
        ) : (
          <InsightList
            posts={rest.map((p) => ({
              slug: p.slug,
              date: p.data.date,
              category: p.data.topic,
              title: p.data.title,
              dek: p.data.dek,
              readingTime: p.readingTime,
              demo: p.data.demo === true,
            }))}
          />
        )}
      </Section>
    </>
  );
}
