import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Link } from "@/components/ui/Link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PostRow } from "@/components/ui/PostRow";
import { FadeRise } from "@/components/motion/FadeRise";
import { listPosts } from "@/lib/content";

const FALLBACK_ROUTES: Array<{ label: string; href: string; description: string }> = [
  {
    label: "About",
    href: "/about",
    description: "Why we exist and how we work.",
  },
  {
    label: "Companies",
    href: "/companies",
    description: "One philosophy. Many companies.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Partnerships, press, or general inquiries.",
  },
];

export default async function NotFound() {
  const posts = await listPosts();
  const latest = posts.slice(0, 2);

  return (
    <>
      <section className="pb-16 pt-20 md:pb-24 md:pt-28 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-12">404</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[3rem] leading-[1.05] sm:text-[4rem] md:text-[5.5rem] md:leading-[1.04] lg:text-[7rem] lg:leading-[1.02]">
              Nothing here.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-xl md:mt-12">
            <p className="text-body-l text-ink-muted">
              The page you were looking for doesn&rsquo;t exist or has moved. A few places
              to try instead.
            </p>
          </FadeRise>
          <FadeRise delay={0.55} className="mt-10 md:mt-14">
            <Link href="/" variant="arrow" className="text-body text-ink">
              Return home
            </Link>
          </FadeRise>
        </Container>
      </section>

      <Section className="border-t border-rule" padding="tight">
        <FadeRise>
          <Eyebrow className="mb-10 md:mb-14">Try one of these</Eyebrow>
        </FadeRise>
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {FALLBACK_ROUTES.map((r, i) => (
            <FadeRise key={r.href} delay={i * 0.06}>
              <li>
                <Link href={r.href} variant="arrow" className="text-body text-ink">
                  {r.label}
                </Link>
                <p className="mt-3 max-w-[24rem] text-body-s text-ink-muted">
                  {r.description}
                </p>
              </li>
            </FadeRise>
          ))}
        </ul>
      </Section>

      {latest.length > 0 && (
        <Section className="border-t border-rule" padding="tight">
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">From the newsroom</Eyebrow>
          </FadeRise>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
            {latest.map((p, i) => (
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
