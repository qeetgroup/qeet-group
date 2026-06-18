import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { ProductCard } from "../ui/ProductCard";
import { FadeRise } from "../motion/FadeRise";
import { Reveal } from "../motion/Reveal";
import { Marquee } from "../motion/Marquee";
import { Counter } from "../motion/Counter";
import { listProducts } from "@/lib/content";

export async function Products() {
  const all = await listProducts();

  const stats: Array<{ value: number; label: string }> = [
    { value: all.length, label: "Products" },
    { value: 2026, label: "Founded" },
    { value: 4, label: "Principles" },
  ];

  return (
    <Section className="relative border-t border-rule">
      <FadeRise>
        <div className="max-w-3xl">
          <Eyebrow>Our Products</Eyebrow>
          <h2 className="mt-6 font-sans font-medium text-balance tracking-[-0.02em] text-ink text-[2rem] leading-[1.15] md:mt-8 md:text-[2.25rem] md:leading-[1.18] lg:text-[2.5rem] lg:leading-[1.2]">
            <Reveal>One philosophy.</Reveal>{" "}
            <Reveal delay={0.08}>Many products.</Reveal>
          </h2>
        </div>
      </FadeRise>

      {/* Animated metrics */}
      <FadeRise className="mt-12 md:mt-16">
        <dl className="grid grid-cols-3 gap-6 border-y border-rule py-8 md:gap-10 md:py-10 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-serif font-normal tracking-[-0.02em] text-ink text-[2.5rem] leading-none md:text-[3.5rem]">
                <Counter value={s.value} />
              </dd>
              <dt className="mt-3 font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </FadeRise>

      {/* Glass tilt-card grid */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
        {all.map((c, i) => (
          <FadeRise key={c.slug} delay={(i % 3) * 0.06}>
            <ProductCard
              name={c.data.name}
              description={c.data.description}
              tag={c.data.sector}
              href={`/products/${c.slug}`}
            />
          </FadeRise>
        ))}
      </div>

      {/* Product wordmark marquee — "one group, many products" in motion */}
      <FadeRise className="mt-14 md:mt-20">
        <Marquee speed={42} className="border-y border-rule py-6 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {all.map((c) => (
            <span
              key={c.slug}
              className="inline-flex items-center gap-4 font-serif text-[1.5rem] text-ink-muted md:text-[1.875rem]"
            >
              {c.data.name}
              <span aria-hidden="true" className="text-brand">·</span>
            </span>
          ))}
        </Marquee>
      </FadeRise>
    </Section>
  );
}
