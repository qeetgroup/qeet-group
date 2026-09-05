import NextLink from "next/link";
import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Link } from "../ui/Link";
import { Figure } from "../media/Figure";
import { FadeRise } from "../motion/FadeRise";
import { DemoBadge } from "../ui/DemoBadge";
import { formatDate } from "@/lib/format";
import { leadInsight, listInsights } from "@/lib/content";

/**
 * ============================================================================
 * Insights, as a publication rather than a blog roll
 * ============================================================================
 *
 * The previous version was three equal cards, which is the shape that says
 * "we post things sometimes". Every editorial reference — Accenture, Deloitte,
 * Capgemini, IBM — leads with ONE dominant story and supports it with a
 * secondary rail. That hierarchy is the whole difference between a publication
 * and a feed: it means somebody decided what mattered most.
 *
 * The lead is chosen by the loader (an explicit `featured` flag, falling back
 * to most recent), so the hub is never empty and never depends on anyone
 * remembering to move a flag.
 */
export async function InsightPreview() {
  const [lead, all] = await Promise.all([leadInsight(), listInsights()]);
  if (!lead) return null;

  const rest = all.filter((i) => i.slug !== lead.slug).slice(0, 3);

  return (
    <Section id="insights" className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="04"
          eyebrow="Insights"
          title="Ideas worth making public."
        />
      </FadeRise>

      <div className="mt-14 grid-editorial md:mt-20">
        {/* The lead. Given a figure and display type — it should be obvious
            which story is the important one without reading a word. */}
        <article className="col-wide">
          <FadeRise>
            <NextLink href={`/insights/${lead.slug}`} className="group/lead block rounded-sm focus-ring">
              <Figure
                slot="insightFallback"
                aspect="editorial"
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-ink-subtle">
                <span className="text-accent-text">{lead.data.topic}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={lead.data.date}>{formatDate(lead.data.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{lead.readingTime} min read</span>
                {lead.data.demo && <DemoBadge />}
              </p>
              <h3 className="mt-4 text-balance font-display text-ink text-display-m transition-colors duration-fast group-hover/lead:text-accent-text">
                {lead.data.title}
              </h3>
              <p className="mt-4 max-w-prose text-body-l text-ink-muted">{lead.data.dek}</p>
            </NextLink>
          </FadeRise>
        </article>

        {/* The rail. Text only, deliberately — giving these images too would
            flatten the hierarchy the lead exists to create. */}
        <div className="col-aside">
          <ul className="border-t border-rule">
            {rest.map((item) => (
              <li key={item.slug}>
                <FadeRise>
                  <NextLink
                    href={`/insights/${item.slug}`}
                    className="group/item block border-b border-rule py-6 rounded-sm focus-ring"
                  >
                    <p className="flex flex-wrap items-center gap-x-2 font-mono text-label uppercase text-ink-subtle">
                      <span>{item.data.topic}</span>
                      {item.data.demo && <DemoBadge />}
                    </p>
                    <p className="mt-2 text-balance font-sans text-heading-m font-medium text-ink transition-colors duration-fast group-hover/item:text-accent-text">
                      {item.data.title}
                    </p>
                  </NextLink>
                </FadeRise>
              </li>
            ))}
          </ul>
          <FadeRise className="mt-8">
            <Link href="/insights" variant="arrow" className="text-body text-ink">
              All insights
            </Link>
          </FadeRise>
        </div>
      </div>
    </Section>
  );
}
