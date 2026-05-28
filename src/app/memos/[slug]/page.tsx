import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Link } from "@/components/ui/Link";
import { FadeRise } from "@/components/motion/FadeRise";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { listMemos, loadMemo } from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const memos = await listMemos();
  return memos.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const memo = await loadMemo(slug);
  if (!memo) return {};
  return {
    title: memo.data.title.replace(/\.$/, ""),
    description: memo.data.dek,
    alternates: { canonical: `/memos/${slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function MemoPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const memo = await loadMemo(slug);
  if (!memo) notFound();

  const { data, content } = memo;

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
            section: "memos",
          }),
          breadcrumbSchema([
            { name: "Memos", path: "/memos" },
            { name: data.title.replace(/\.$/, ""), path: `/memos/${slug}` },
          ]),
        ]}
      />
      <section className="pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Link href="/memos" className="font-sans text-body-s text-ink-muted">
              <span aria-hidden="true" className="mr-1 inline-block">←</span>
              Memos
            </Link>
          </FadeRise>
          <FadeRise delay={0.1} className="mt-10 max-w-3xl md:mt-14">
            <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
              <time dateTime={data.date}>{formatDate(data.date)}</time>
              <span aria-hidden="true"> · </span>
              <span>{memo.readingTime} min read</span>
            </p>
            <h1 className="mt-6 text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.25rem] leading-[1.08] md:mt-8 md:text-[3.25rem] md:leading-[1.06] lg:text-[4rem] lg:leading-[1.04]">
              {data.title}
            </h1>
            <p className="mt-6 max-w-[40rem] text-body-l text-ink-muted md:mt-8">
              {data.dek}
            </p>
            {data.author && (
              <p className="mt-8 font-sans text-body-s text-ink-subtle md:mt-10">
                By {data.author}
              </p>
            )}
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
