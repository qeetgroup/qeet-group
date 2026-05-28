import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeRise } from "@/components/motion/FadeRise";
import { SearchBox } from "@/components/sections/SearchBox";
import { buildSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across Qeet Group pages, companies, and newsroom posts.",
  alternates: { canonical: "/search" },
  // The page itself is fine to index, but its results aren't.
  robots: { index: true, follow: true },
};

export default async function SearchPage() {
  const index = await buildSearchIndex();
  return (
    <>
      <section className="pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Search</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Find anything.
            </h1>
          </FadeRise>
        </Container>
      </section>
      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <SearchBox index={index} />
        </FadeRise>
      </Section>
    </>
  );
}
