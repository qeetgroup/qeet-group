import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeRise } from "@/components/motion/FadeRise";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import type { LoadedLegal } from "@/lib/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LegalArticle({ doc }: { doc: LoadedLegal }) {
  const { data, content } = doc;
  return (
    <>
      <section className="pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-8 md:mb-10">Legal</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1} className="max-w-3xl">
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.5rem] leading-[1.06] md:text-[3.5rem] md:leading-[1.04] lg:text-[4.25rem] lg:leading-[1.02]">
              {data.title}
            </h1>
            <p className="mt-8 font-sans text-body-s text-ink-subtle md:mt-10">
              Last updated <time dateTime={data.lastUpdated}>{formatDate(data.lastUpdated)}</time>
            </p>
          </FadeRise>
        </Container>
      </section>

      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <article className="max-w-[42rem]">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </FadeRise>
      </Section>
    </>
  );
}
