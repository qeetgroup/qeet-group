import NextLink from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { buildPageMetadata } from "@/lib/seo/meta";
import { listTechnology } from "@/lib/content";

export const metadata = buildPageMetadata({
  title: "Technology",
  description:
    "The capabilities behind the Qeet Group portfolio — identity, intelligence, payments, communications, visibility, people, and the foundations underneath.",
  path: "/technology",
});

/**
 * The capability index.
 *
 * A numbered editorial list rather than a card grid, for the same reason the
 * homepage rail is: equal cards imply equal weight, and turn an argument into
 * an inventory. Nine entries in a list stay scannable; nine cards become a wall.
 */
export default async function TechnologyPage() {
  const items = await listTechnology();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Technology</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["Built once.", "Shared everywhere."]}
            className="max-w-[20ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              Nine capabilities behind the portfolio. Each is delivered by real
              products rather than described in the abstract — where a capability
              is not yet shipped, the product page says so.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <ol>
          {items.map((item, i) => (
            <li key={item.slug}>
              <FadeRise>
                <NextLink
                  href={`/technology/${item.slug}`}
                  className="group/cap grid grid-cols-1 items-baseline gap-2 border-b border-rule py-8 transition-colors duration-fast hover:border-rule-strong focus-ring md:grid-cols-12 md:gap-8 md:py-10"
                >
                  <span className="font-mono text-label uppercase text-ink-subtle tabular-figures md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="md:col-span-4">
                    <span className="block font-display text-ink text-heading-xl transition-colors duration-fast group-hover/cap:text-accent-text-hover">
                      {item.data.title}
                    </span>
                    <span className="mt-1 block font-mono text-label uppercase text-ink-subtle">
                      {item.data.eyebrow}
                    </span>
                  </span>
                  <span className="max-w-prose text-body text-ink-muted md:col-span-6">
                    {item.data.dek}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-ink-subtle transition-transform duration-base group-hover/cap:translate-x-1 md:col-span-1 md:block md:text-right"
                  >
                    →
                  </span>
                </NextLink>
              </FadeRise>
            </li>
          ))}
        </ol>
      </Section>

      <AudiencePaths />
    </>
  );
}
