import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { buildPageMetadata } from "@/lib/seo/meta";
import { formatDate } from "@/lib/format";
import { listInsightTopics, listInsightsByTopic } from "@/lib/content";

export const dynamicParams = false;

type RouteParams = { topic: string };

/** URL form of a topic: "Perspectives" → "perspectives". */
const toSlug = (topic: string) => topic.toLowerCase().replace(/\s+/g, "-");

/*
 * Params come from the topics that ACTUALLY EXIST in the collection, not from
 * a list someone maintains. With `dynamicParams = false`, that means a topic
 * page cannot exist for a topic with nothing in it — an empty index is a
 * worse experience than a link that was never offered, and the navigation is
 * derived from the same source so no link is ever offered for one.
 */
export async function generateStaticParams() {
  const topics = await listInsightTopics();
  return topics.map((t) => ({ topic: toSlug(t) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { topic } = await params;
  const items = await listInsightsByTopic(topic);
  if (items.length === 0) return {};
  return buildPageMetadata({
    title: items[0].data.topic,
    description: `Qeet Group writing on ${items[0].data.topic.toLowerCase()}.`,
    path: `/insights/topic/${topic}`,
  });
}

export default async function TopicPage({ params }: { params: Promise<RouteParams> }) {
  const { topic } = await params;
  const items = await listInsightsByTopic(topic);
  if (items.length === 0) notFound();

  const label = items[0].data.topic;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-14 pt-32 md:pb-16 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Insights", path: "/insights" },
                { name: label, path: `/insights/topic/${topic}` },
              ]}
            />
          </FadeRise>
          <FadeRise className="mt-10">
            <Eyebrow>Insights</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={[label]}
            className="mt-6 text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.3} className="mt-8 max-w-2xl">
            <Lede>
              {items.length} {items.length === 1 ? "piece" : "pieces"} on {label.toLowerCase()}.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section padding="tight">
        <ul className="border-t border-rule">
          {items.map((item) => (
            <li key={item.slug}>
              <FadeRise>
                <NextLink
                  href={`/insights/${item.slug}`}
                  className="group/row grid grid-cols-1 gap-3 border-b border-rule py-8 rounded-sm transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:gap-8"
                >
                  <p className="font-mono text-label uppercase text-ink-subtle md:col-span-3">
                    <time dateTime={item.data.date}>{formatDate(item.data.date)}</time>
                    <span aria-hidden="true"> · </span>
                    {item.readingTime} min
                    {item.data.demo && <DemoBadge className="ml-2" />}
                  </p>
                  <div className="md:col-span-9">
                    <h2 className="text-balance font-display text-ink text-heading-xl transition-colors duration-fast group-hover/row:text-accent-text-hover">
                      {item.data.title}
                    </h2>
                    <p className="mt-3 max-w-prose text-body text-ink-muted">{item.data.dek}</p>
                  </div>
                </NextLink>
              </FadeRise>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
