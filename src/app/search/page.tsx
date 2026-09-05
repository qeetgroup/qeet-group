import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeRise } from "@/components/motion/FadeRise";
import { SearchBox } from "@/components/sections/SearchBox";
import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Search",
    description: "Search across Qeet Group pages, companies, and newsroom posts.",
    path: "/search",
  }),
  // The page is fine to index; a `?q=` result view is not.
  robots: { index: true, follow: false },
};

export default function SearchPage() {
  return (
    <>
      <section className="pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Search</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-display font-normal text-ink text-display-xl">
              Find anything.
            </h1>
          </FadeRise>
        </Container>
      </section>
      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <Suspense fallback={null}>
            <SearchBox />
          </Suspense>
        </FadeRise>
      </Section>
    </>
  );
}
