import { Counter } from "@/components/motion/Counter";
import { FadeRise } from "@/components/motion/FadeRise";
import type { Metric } from "@/config/metrics";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * MetricBand — numbers that can be checked
 * ============================================================================
 *
 * Large numerical storytelling is a corporate-site staple, and it is also
 * where corporate sites most often stop being truthful. "Trusted by
 * thousands", "99.99% uptime", "10x faster" — unfalsifiable, unattributed, and
 * quietly corrosive: a reader who tests one claim and finds it hollow starts
 * discounting the rest of the page.
 *
 * So this component will not render a metric that cannot say where it came
 * from. `evidence` and `source` are required by the type, and a metric missing
 * them is dropped rather than displayed — failing quiet is the right direction
 * here, because the alternative is publishing an unsourced number.
 *
 * Demo metrics are visibly marked. Planned ones are rendered in the future
 * tense they belong in, so an intention cannot be read as an achievement.
 */

function EvidenceMark({ metric }: { metric: Metric }) {
  if (metric.evidence === "verified") return null;
  return (
    <span
      className={cn(
        "mt-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-label uppercase",
        metric.evidence === "demo"
          ? "border-rule-interactive text-ink-subtle"
          : "border-rule text-ink-subtle",
      )}
    >
      {metric.evidence === "demo" ? "Illustrative" : "Planned"}
    </span>
  );
}

/** Numeric metrics count up; everything else is rendered as written. */
function Value({ metric }: { metric: Metric }) {
  const numeric = /^\d+$/.test(metric.value);
  return (
    <span className="block font-display text-ink text-display-xl tabular-figures">
      {numeric ? <Counter value={Number(metric.value)} /> : metric.value}
    </span>
  );
}

export function MetricBand({
  metrics,
  className,
  /** Rendered under the band — where the figures come from and when checked. */
  provenance,
}: {
  metrics: Metric[];
  className?: string;
  provenance?: string;
}) {
  const renderable = metrics.filter((m) => m.evidence && m.source);
  if (renderable.length === 0) return null;

  return (
    <div className={className}>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {renderable.map((m) => (
          <FadeRise key={m.label}>
            <div className="border-t border-rule pt-6">
              {/* dd before dt: the number is the headline and the label
                  explains it. Source order stays dt-then-dd for assistive
                  technology — the visual order is a flex reversal, not a
                  markup one. */}
              <div className="flex flex-col-reverse">
                <dt className="mt-3 font-sans text-body-s font-medium text-ink">
                  {m.label}
                </dt>
                <dd>
                  <Value metric={m} />
                </dd>
              </div>
              {m.note && <p className="mt-2 text-caption text-ink-subtle">{m.note}</p>}
              <EvidenceMark metric={m} />
            </div>
          </FadeRise>
        ))}
      </dl>
      {provenance && (
        <p className="mt-12 border-t border-rule pt-6 font-mono text-label uppercase text-ink-subtle">
          {provenance}
        </p>
      )}
    </div>
  );
}
