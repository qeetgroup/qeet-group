import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { NewsroomList } from "@/components/sections/NewsroomList";
import { listPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Announcements and milestones from Qeet Group and its companies.",
  alternates: { canonical: "/newsroom" },
};

export default async function NewsroomPage() {
  const posts = await listPosts();

  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <PageAmbient />
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
            <Lede>Announcements and milestones from Qeet Group and its companies.</Lede>
          </FadeRise>
          <FadeRise delay={0.5} className="mt-8 md:mt-10">
            <Link href="/newsroom/rss.xml" className="font-sans text-body-s text-ink-muted">
              Subscribe via RSS
            </Link>
          </FadeRise>
        </Container>
      </section>

      <Section className="border-t border-rule" padding="tight">
        {posts.length === 0 ? (
          <p className="font-sans text-body text-ink-muted">No posts yet.</p>
        ) : (
          <NewsroomList
            posts={posts.map((p) => ({
              slug: p.slug,
              date: p.data.date,
              category: p.data.category,
              title: p.data.title,
              dek: p.data.dek,
              readingTime: p.readingTime,
            }))}
          />
        )}
      </Section>
    </>
  );
}
