import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { PostListingRow } from "@/components/ui/PostListingRow";
import { FadeRise } from "@/components/motion/FadeRise";
import { listPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Announcements and milestones from Qeet Group and its ventures.",
};

export default async function NewsroomPage() {
  const posts = await listPosts();

  return (
    <>
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Newsroom</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Newsroom.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-xl md:mt-12">
            <Lede>Announcements and milestones from Qeet Group and its ventures.</Lede>
          </FadeRise>
        </Container>
      </section>

      <Section className="border-t border-rule" padding="tight">
        {posts.length === 0 ? (
          <p className="font-sans text-body text-ink-muted">No posts yet.</p>
        ) : (
          posts.map((post, i) => (
            <FadeRise key={post.slug}>
              <PostListingRow
                date={post.data.date}
                category={post.data.category}
                title={post.data.title}
                dek={post.data.dek}
                href={`/newsroom/${post.slug}`}
                isFirst={i === 0}
              />
            </FadeRise>
          ))
        )}
      </Section>
    </>
  );
}
