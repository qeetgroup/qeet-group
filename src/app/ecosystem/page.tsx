import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { StatusChip } from "@/components/ui/StatusChip";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { EcosystemMap } from "@/components/sections/EcosystemMap";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { buildPageMetadata } from "@/lib/seo/meta";
import { listProductSummaries } from "@/lib/content";
import NextLink from "next/link";

export const metadata = buildPageMetadata({
  title: "Ecosystem",
  description:
    "How Qeet Group products compose one another — one identity layer, one design foundation, and a portfolio built on both.",
  path: "/ecosystem",
});

/**
 * The ecosystem, at full size.
 *
 * The homepage shows the map as a section; this page is the argument around
 * it. The lifecycle table beneath is not a fallback for the map — it is the
 * portfolio as data, which is what a visitor comparing options actually wants
 * and what a screen reader gets either way.
 */
export default async function EcosystemPage() {
  const products = await listProductSummaries();
  const groups = ["available", "development", "planned"] as const;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Ecosystem</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["Products that", "compose each other."]}
            className="max-w-[20ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              Two things in this portfolio are depended on by everything else:
              the identity layer and the design foundation. That is what makes
              it an ecosystem rather than a catalogue — and it is the constraint
              every other product is built inside.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <EcosystemMap products={products} headingLevel={2} />
      </Section>

      <Section className="border-t border-rule bg-surface-sunken">
        <FadeRise>
          <h2 className="font-display text-ink text-display-m">The portfolio, by lifecycle</h2>
          <p className="mt-5 max-w-prose text-body-l text-ink-muted">
            Grouped by what has shipped. Nothing here is presented as available
            before it is.
          </p>
        </FadeRise>

        <div className="mt-14 space-y-14">
          {groups.map((status) => {
            const items = products.filter((p) => p.status === status);
            if (items.length === 0) return null;
            return (
              <FadeRise key={status}>
                <div>
                  <StatusChip status={status} />
                  <ul className="mt-6 border-t border-rule">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <NextLink
                          href={p.href}
                          className="group/row grid grid-cols-1 gap-2 border-b border-rule py-5 transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:items-baseline md:gap-8"
                        >
                          <span className="font-sans text-heading-m font-medium text-ink transition-colors duration-fast group-hover/row:text-accent-text md:col-span-3">
                            {p.name}
                          </span>
                          <span className="text-body-s text-ink-muted md:col-span-7">
                            {p.oneLiner}
                          </span>
                          <span className="font-mono text-label uppercase text-ink-subtle md:col-span-2 md:text-right">
                            {p.sector}
                          </span>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeRise>
            );
          })}
        </div>
      </Section>

      <AudiencePaths />
    </>
  );
}
