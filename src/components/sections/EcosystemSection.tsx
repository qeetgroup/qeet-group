import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { EcosystemMap } from "./EcosystemMap";
import { listProductSummaries } from "@/lib/content";

/**
 * The signature section. Everything else on the page is an elaboration of what
 * this figure shows, which is why it sits third rather than being saved.
 *
 * The map is a client component; this wrapper stays a server component so the
 * product data is fetched at build time and passed down as plain props. The
 * interactive part ships JavaScript; the portfolio data does not.
 */
export async function EcosystemSection() {
  const products = await listProductSummaries();

  return (
    <Section id="ecosystem" className="border-t border-rule bg-surface-sunken">
      <FadeRise>
        <SectionHeader
          index="01"
          eyebrow="The ecosystem"
          title={`${products.length} products. Two dependencies.`}
          description="Almost nothing in this portfolio stands alone. Every product authenticates through the same identity layer and is built from the same design foundation — so they compose rather than merely coexist."
        />
      </FadeRise>

      <div className="mt-16 md:mt-24">
        <EcosystemMap products={products} />
      </div>

      <FadeRise className="mt-16 border-t border-rule pt-8">
        <Link href="/ecosystem" variant="arrow" className="text-body text-ink">
          Explore the ecosystem in full
        </Link>
      </FadeRise>
    </Section>
  );
}
