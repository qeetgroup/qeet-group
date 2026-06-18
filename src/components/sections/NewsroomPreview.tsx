import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Link } from "../ui/Link";
import { PostRow } from "../ui/PostRow";
import { FadeRise } from "../motion/FadeRise";
import { Spotlight } from "../motion/Spotlight";
import { listPosts } from "@/lib/content";

export async function NewsroomPreview() {
  const posts = (await listPosts()).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Eyebrow>Newsroom</Eyebrow>
          <Link href="/newsroom" variant="arrow" className="font-sans text-body-s text-ink-muted">
            All posts
          </Link>
        </div>
      </FadeRise>
      <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
        {posts.map((post, i) => (
          <FadeRise key={post.slug} delay={i * 0.06} className="h-full">
            <Spotlight
              color="color-mix(in oklab, var(--color-brand) 12%, transparent)"
              className="h-full rounded-3xl"
            >
              <div className="glass-panel h-full rounded-3xl p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg md:p-8">
                <PostRow
                  date={post.data.date}
                  category={post.data.category}
                  title={post.data.title}
                  dek={post.data.dek}
                  href={`/newsroom/${post.slug}`}
                />
              </div>
            </Spotlight>
          </FadeRise>
        ))}
      </div>
    </Section>
  );
}
