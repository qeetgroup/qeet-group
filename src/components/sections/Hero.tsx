import { Container } from "../layout/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Link } from "../ui/Link";
import { Button } from "../ui/Button";
import { IdentityGraph } from "../ui/IdentityGraph";
import { FadeRise } from "../motion/FadeRise";
import { WordReveal } from "../motion/WordReveal";
import { Magnetic } from "../motion/Magnetic";
import { listProductSummaries } from "@/lib/content";

/**
 * The thesis. A confident two-column opening: the group's defining statement on
 * the left, the identity-graph signature as a real figure on the right. The
 * graph and the count are derived from the live product list, so the hero scales
 * as the portfolio grows. A monospace thesis line carries the hard facts; orange
 * appears only at the graph's core.
 */
export async function Hero() {
  const products = await listProductSummaries();
  const nodes = products.map((p) => ({ label: p.short }));
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      {/* Ambient orbs: slowly-drifting colour blobs that add depth to the hero
          background. Purely decorative; aria-hidden and pointer-events-none.
          The reduced-motion CSS block in globals.css collapses all animation
          durations to 0.01ms for users who request it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-32 -top-24 h-[420px] w-[580px] rounded-full bg-brand opacity-[0.10] blur-[120px] animate-blob"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute -bottom-16 -right-24 h-[380px] w-[460px] rounded-full bg-brand-deep opacity-[0.07] blur-[100px] animate-blob-slow"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[280px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-[0.05] blur-[80px] animate-blob"
          style={{ animationDelay: "-16s" }}
        />
      </div>
      {/* Fine grain texture over the blobs. */}
      <div aria-hidden="true" className="bg-grain pointer-events-none absolute inset-0 -z-10" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <FadeRise>
              <Eyebrow className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 md:mb-10">
                <span>Qeet Group</span>
                <span aria-hidden="true" className="text-rule-strong">/</span>
                <span className="font-mono normal-case tracking-normal text-ink-subtle">
                  Holding company · Est. 2026
                </span>
              </Eyebrow>
            </FadeRise>

            <h1 className="text-balance font-display font-semibold tracking-[-0.03em] text-ink text-[2.75rem] leading-[1.03] sm:text-[3.5rem] md:text-[4.25rem] md:leading-[1.02] lg:text-[4.75rem]">
              <WordReveal text="We question, We explore, We envision, We" />{" "}
              <span className="text-brand">
                <WordReveal text="transform." initialDelay={0.57} />
              </span>
            </h1>

            <FadeRise delay={0.7} className="mt-8 max-w-xl md:mt-10">
              <p className="text-body-l text-ink-muted">
                Qeet Group is a multi-company holding built on a single philosophy: that meaningful
                progress begins with the right question.
              </p>
            </FadeRise>

            <FadeRise delay={0.9} className="mt-9 md:mt-11">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                <Button href="/products" size="lg" magnetic>
                  Explore products
                </Button>
                <Magnetic strength={0.4}>
                  <Link href="#philosophy" variant="arrow" className="text-body text-ink">
                    Read our philosophy
                  </Link>
                </Magnetic>
              </div>
            </FadeRise>

            <FadeRise delay={1.05} className="mt-11 md:mt-14">
              <p className="font-mono text-caption uppercase tracking-[0.18em] text-ink-subtle">
                <span className="text-ink">{products.length}</span> platforms
                <span aria-hidden="true" className="px-2 text-rule-strong">·</span>
                <span className="text-ink">1</span> identity graph
                <span aria-hidden="true" className="px-2 text-rule-strong">·</span>
                built for the long term
              </p>
            </FadeRise>
          </div>

          {/* Signature figure. Decorative=false → it's a real, labelled diagram,
              one node per live product. */}
          <FadeRise delay={0.3} className="lg:col-span-5">
            <IdentityGraph
              nodes={nodes}
              labels
              decorative={false}
              className="mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            />
          </FadeRise>
        </div>
      </Container>
    </section>
  );
}
