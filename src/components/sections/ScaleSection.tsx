import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeRise } from "../motion/FadeRise";
import { MetricBand } from "./MetricBand";
import { portfolioMetrics, PORTFOLIO_VERIFIED_ON } from "@/config/metrics";
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
          index="03"
          eyebrow="The group today"
          title="Growing with intention."
          description="A clear view of the portfolio today, including the products still being built and those planned for the future."
        />
      </FadeRise>

      <MetricBand
        className="mt-16 md:mt-20"
        metrics={portfolioMetrics(counts)}
      />

      <p className="mt-8 font-mono text-caption text-ink-subtle">
        Portfolio status verified {formatDate(PORTFOLIO_VERIFIED_ON)}.
      </p>
    </Section>
  );
}
