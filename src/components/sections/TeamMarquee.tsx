import { listProducts } from "@/lib/content";

/**
 * A thin, full-width strip between the Hero and Philosophy that communicates
 * the portfolio breadth at a glance. An infinite CSS marquee — zero JS,
 * GPU-composited, reduced-motion-safe (the CSS block in globals.css collapses
 * the animation to a static snapshot). The inner track duplicates the items so
 * the -50% translateX shift loops seamlessly.
 */
export async function TeamMarquee() {
  const products = await listProducts();
  const items = products.map((p) => ({
    name: p.data.name,
    sector: p.data.sector,
  }));

  return (
    <div className="border-y border-rule py-5 overflow-hidden">
      <p className="sr-only">
        Our platforms:{" "}
        {items.map((it) => `${it.name} (${it.sector})`).join(", ")}
      </p>

      <div
        aria-hidden="true"
        className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="flex w-max animate-marquee">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-4 px-8"
            >
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
  );
}
