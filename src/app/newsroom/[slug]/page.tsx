import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/components/ui/Link";
import { PostRow } from "@/components/ui/PostRow";
import { FadeRise } from "@/components/motion/FadeRise";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { listPosts, loadPost } from "@/lib/content";

export const dynamicParams = false;

type RouteParams = { slug: string };

const SITE_ORIGIN = "https://qeet.in";

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};
  return {
    title: post.data.title.replace(/\.$/, ""),
    description: post.data.dek,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const { data, content } = post;
  const allPosts = await listPosts();
  const morePosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const shareUrl = `${SITE_ORIGIN}/newsroom/${slug}`;
  const shareTitle = encodeURIComponent(data.title);
  const shareEncodedUrl = encodeURIComponent(shareUrl);

  return (
    <>
      {/* Article header */}
      <section className="pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Link href="/newsroom" className="font-sans text-body-s text-ink-muted">
              <span aria-hidden="true" className="mr-1 inline-block">←</span>
              Newsroom
            </Link>
          </FadeRise>
          <FadeRise delay={0.1} className="mt-10 max-w-3xl md:mt-14">
            <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
              <time dateTime={data.date}>{formatDate(data.date)}</time>
              <span aria-hidden="true"> · </span>
              <span>{data.category}</span>
            </p>
            <h1 className="mt-6 text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.25rem] leading-[1.08] md:mt-8 md:text-[3.25rem] md:leading-[1.06] lg:text-[4rem] lg:leading-[1.04]">
              {data.title}
            </h1>
            <p className="mt-6 max-w-[40rem] text-body-l text-ink-muted md:mt-8">{data.dek}</p>
            {data.author && (
              <p className="mt-8 font-sans text-body-s text-ink-subtle md:mt-10">
                By {data.author}
              </p>
            )}
          </FadeRise>
        </Container>
      </section>

      {/* Body */}
      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <article className="max-w-[42rem]">
            <MDXRemote source={content} components={mdxComponents} />
          </article>
        </FadeRise>
      </Section>

      {/* Share */}
      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <div className="flex flex-col gap-5 md:flex-row md:items-baseline md:gap-12">
            <Eyebrow>Share</Eyebrow>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareEncodedUrl}`}
                className="font-sans text-body text-ink"
              >
                Twitter
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareEncodedUrl}`}
                className="font-sans text-body text-ink"
              >
                LinkedIn
              </Link>
              <Link
                href={`mailto:?subject=${shareTitle}&body=${shareEncodedUrl}`}
                className="font-sans text-body text-ink"
              >
                Email
              </Link>
            </div>
          </div>
        </FadeRise>
      </Section>

      {/* More from the newsroom */}
      {morePosts.length > 0 && (
        <Section className="border-t border-rule">
          <FadeRise>
            <Eyebrow className="mb-12 md:mb-16">More from the newsroom</Eyebrow>
          </FadeRise>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
            {morePosts.map((p, i) => (
              <FadeRise key={p.slug} delay={i * 0.06}>
                <PostRow
                  date={p.data.date}
                  category={p.data.category}
                  title={p.data.title}
                  dek={p.data.dek}
                  href={`/newsroom/${p.slug}`}
                />
              </FadeRise>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
