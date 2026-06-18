import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { listMemos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Memos",
  description:
    "Long-form notes from Qeet Group — questions we're working through, ideas worth writing down.",
  alternates: { canonical: "/memos" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
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
          memos.map((m, i) => (
            <FadeRise key={m.slug}>
              <article
                className={
                  i === 0
                    ? "py-10 md:py-12 lg:py-14"
                    : "border-t border-rule py-10 md:py-12 lg:py-14"
                }
              >
                <a
                  href={`/memos/${m.slug}`}
                  className="group/memo grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas rounded-sm"
                >
                  <div className="md:col-span-3 lg:col-span-3">
                    <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                      <time dateTime={m.data.date}>{formatDate(m.data.date)}</time>
                      <span aria-hidden="true"> · </span>
                      <span>{m.readingTime} min read</span>
                    </p>
                  </div>
                  <div className="md:col-span-9 lg:col-span-9">
                    <h2 className="text-balance font-serif font-normal tracking-[-0.01em] text-ink text-[1.75rem] leading-[1.18] md:text-[2.25rem] md:leading-[1.16] lg:text-[2.5rem] lg:leading-[1.14]">
                      {m.data.title}
                    </h2>
                    <p className="mt-3 max-w-[40rem] text-body text-ink-muted md:mt-4">
                      {m.data.dek}
                    </p>
                  </div>
                </a>
              </article>
            </FadeRise>
          ))
        )}
      </Section>
    </>
  );
}
