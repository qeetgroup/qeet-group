import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";
import { MetricBand } from "./MetricBand";
import { ORGANISATION_METRICS, portfolioMetrics, PORTFOLIO_VERIFIED_ON } from "@/config/metrics";
import { portfolioCounts } from "@/lib/content";
import { formatDate } from "@/lib/format";

/**
 * The numbers.
 *
 * Two rows: the portfolio counts, derived from the content collection at build
 * time, and the organisational facts that cannot be derived and therefore
 * carry an explicit source and verification date.
 *
 * What is absent matters as much as what is present. There is no customer
 * count, no revenue figure, no headcount and no uptime percentage, because
 * none of those is verified anywhere in the organisation's records. A metric
 * band is the easiest place on a website to lie and the easiest place to be
 * caught doing it.
 */
export async function ScaleSection() {
  const counts = await portfolioCounts();

  return (
    <Section id="scale" className="border-t border-rule">
      <FadeRise>
        <SectionHeader
          index="06"
          eyebrow="Scale"
          title="What actually exists."
          description="Counts derived from the portfolio itself rather than stated — so this section cannot drift from what the site contains."
        />
      </FadeRise>

      <MetricBand
        className="mt-16 md:mt-20"
        metrics={portfolioMetrics(counts)}
      />

      <MetricBand
        className="mt-16"
        metrics={ORGANISATION_METRICS}
        provenance={`Organisation figures verified ${formatDate(PORTFOLIO_VERIFIED_ON)} against the Qeet Group repository records.`}
      />
    </Section>
  );
}
