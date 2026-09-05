import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { listMemos } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/meta";
import { PostRow } from "@/components/ui/PostRow";

export const metadata = buildPageMetadata({
  title: "Memos",
  description:
    "Long-form notes from Qeet Group — questions we're working through, ideas worth writing down.",
  path: "/memos",
});

export default async function MemosPage() {
  const memos = await listMemos();

  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <PageAmbient />
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Memos</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-display font-normal text-ink text-display-xl">
              Memos.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-xl md:mt-12">
            <Lede>
              Long-form notes. Less newsroom, more thinking-out-loud.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section className="border-t border-rule" padding="tight">
        {memos.length === 0 ? (
          <p className="font-sans text-body text-ink-muted">
            The first memo is being written. Check back soon.
          </p>
        ) : (
          <div className="divide-y divide-rule">
            {memos.map((m) => (
              <FadeRise key={m.slug}>
                <PostRow
                  layout="listing"
                  date={m.data.date}
                  title={m.data.title}
                  dek={m.data.dek}
                  readingTime={m.readingTime}
                  href={`/memos/${m.slug}`}
                />
              </FadeRise>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
