import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { StatusPill } from "../ui/StatusPill";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { listProducts } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import {
  Activity,
  Colorfilter,
  FingerScan,
  Notification,
  People,
  ShieldTick,
  Wallet,
} from "@qeetrix/icons";
import { Icon, type QeetrixIcon } from "@/components/ui/Icon";

/**
 * Uniform grid for the group portfolio. Every product gets the same card
 * structure — sector icon + status pill, name, tagline, and a sector/arrow
 * footer — so the portfolio reads as one family with no favourites. Spotlight
 * glow follows the cursor on every card. Data-driven: adding an MDX file adds
 * a card; no hardcoded list.
 */
/*
 * Sector icons come from @qeetrix/icons — the group's published library —
 * rather than the six hand-drawn SVGs that used to live here. One source of
 * truth for iconography across the products and this site.
 */
const SECTOR_ICON: Record<string, QeetrixIcon> = {
  "Identity & Access": FingerScan,
  "Design Systems": Colorfilter,
  Observability: Activity,
  "Human Capital Management": People,
  "Notification Infrastructure": Notification,
  "Payments & Billing": Wallet,
};

function SectorIcon({ sector }: { sector: string }) {
  const glyph = SECTOR_ICON[sector] ?? ShieldTick;
  return <Icon icon={glyph} size={18} />;
}

export async function ProductsBento() {
  const products = await listProducts();

  return (
    <Section className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="01"
          eyebrow="The portfolio"
          title="One philosophy. Many products."
          description="Each platform is built for what it is — and every one of them runs on the same identity graph, design system, and quality bar."
        />
      </FadeRise>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {products.map((p, i) => (
          <FadeRise key={p.slug} delay={(i % 3) * 0.06} className="h-full">
            <Card href={`/products/${p.slug}`} className="group/card h-full">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-rule bg-canvas text-ink transition-colors duration-300 group-hover/card:border-accent/40 group-hover/card:text-accent-text">
                    <SectorIcon sector={p.data.sector} />
                  </span>
                  <StatusPill stage={p.data.stage} />
                </div>

                <h3 className="mt-6 font-display text-heading-l font-normal text-ink">
                  {p.data.name}
                </h3>

                <p className="mt-3 text-body-s text-ink-muted">{p.data.tagline}</p>

                <div className="flex-1" />

                <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                  <span className="font-mono text-caption uppercase tracking-[0.12em] text-ink-subtle">
                    {p.data.sector}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink-subtle transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:text-accent-text"
                  >
                    →
                  </span>
                </div>
            </Card>
          </FadeRise>
        ))}
      </div>

      <FadeRise className="mt-10 md:mt-12">
        <Link href="/products" variant="arrow" className="text-body text-ink">
          Explore all products
        </Link>
      </FadeRise>
    </Section>
  );
}
