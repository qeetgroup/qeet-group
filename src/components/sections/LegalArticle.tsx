import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FadeRise } from "@/components/motion/FadeRise";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import type { LoadedLegal } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function LegalArticle({ doc }: { doc: LoadedLegal }) {
  const { data, content } = doc;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: data.title, path: `/legal/${doc.slug}` },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs)]} />
      <section className="pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Breadcrumbs items={crumbs} className="mb-8 md:mb-10" />
            <Eyebrow className="mb-8 md:mb-10">Legal</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1} className="max-w-3xl">
            <h1 className="text-balance font-display font-normal text-ink text-display-l">
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
