import { Counter } from "../motion/Counter";
import { FadeRise } from "../motion/FadeRise";
import { Container } from "../layout/Container";
import { listProducts } from "@/lib/content";

type Metric = {
  value?: number;
  display?: string;
  label: string;
  context: string;
};

/**
 * Full-bleed proof band directly under the hero: the portfolio marquee on top
 * (breadth at a glance) and the group's hard numbers beneath it (depth at a
 * glance). Merges the old TeamMarquee + ProofMetrics sections into one dense
 * surface. The marquee is pure CSS (GPU-composited, reduced-motion-safe via
 * the global block); counters render their final value on the server so
 * no-JS and reduced-motion users see correct numbers immediately.
 */
export async function ProofBand() {
  const products = await listProducts();

  const items = products.map((p) => ({
    name: p.data.name,
    sector: p.data.sector,
  }));

  const metrics: Metric[] = [
    { value: products.length, label: "Products", context: "identity, data, people, and money" },
    { value: 1, label: "Identity graph", context: "every product, one secure login" },
    { value: 4, label: "Principles", context: "question · explore · envision · transform" },
    { display: "2026", label: "Founded", context: "built for the long term" },
  ];

  return (
    <section className="border-y border-rule bg-mesh">
      {/* Portfolio marquee — communicates breadth before the numbers make the case. */}
      <div className="overflow-hidden border-b border-rule py-5">
        <p className="sr-only">
          Our platforms: {items.map((it) => `${it.name} (${it.sector})`).join(", ")}
        </p>
        <div
          aria-hidden="true"
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="flex w-max animate-marquee">
            {[...items, ...items].map((item, i) => (
              <div key={i} className="flex shrink-0 items-center gap-4 px-8">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="font-ui text-body-s font-medium text-ink whitespace-nowrap">
                  {item.name}
                </span>
                <span className="font-mono text-caption text-ink-subtle whitespace-nowrap">
                  {item.sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The numbers. */}
      <Container className="py-14 md:py-18">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <FadeRise key={m.label} delay={i * 0.06}>
              <div>
                <div className="font-serif font-normal tracking-[-0.02em] tabular-nums text-ink text-[3.25rem] leading-none md:text-[4rem]">
                  {m.display ?? <Counter value={m.value ?? 0} />}
                </div>
                <div aria-hidden="true" className="mt-5 h-px w-9 bg-brand" />
                <p className="mt-5 font-sans text-body font-medium text-ink">{m.label}</p>
                <p className="mt-1.5 text-body-s text-ink-subtle">{m.context}</p>
              </div>
            </FadeRise>
          ))}
        </div>
      </Container>
    </section>
  );
}
