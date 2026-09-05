import NextLink from "next/link";
import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { TECHNOLOGY } from "@/config/nav";

/**
 * The capability spread.
 *
 * The obvious treatment is six equal cards, which the brief rules out and
 * which would be wrong anyway: equal cards say every capability matters
 * equally, and they turn a narrative into an inventory.
 *
 * This is a numbered editorial list instead — closer to a table of contents
 * than a grid. It scales past six without becoming a wall (there are nine
 * entries), it reads top to bottom like an argument, and on a phone it needs
 * no reflow because a list is already a column.
 *
 * Entries come from the nav model, so the capability set has exactly one
 * definition shared by the navigation, the footer and this section.
 */
export function TechnologyRail() {
  const items = TECHNOLOGY.flatMap((g) => g.items);

  return (
    <Section id="technology" className="border-t border-rule bg-surface-sunken">
      <FadeRise>
        <SectionHeader
          index="03"
          eyebrow="Technology"
          title="What the portfolio is made of."
          description="Nine capabilities, built once and shared. Each is delivered by products in the portfolio rather than described in the abstract."
        />
      </FadeRise>

      <ol className="mt-16 md:mt-20">
        {items.map((item, i) => (
          <li key={item.href}>
            <FadeRise>
              <NextLink
                href={item.href}
                className="group/cap grid grid-cols-1 items-baseline gap-2 border-t border-rule py-7 transition-colors duration-fast last:border-b hover:border-rule-strong focus-ring md:grid-cols-12 md:gap-8 md:py-9"
              >
                <span className="font-mono text-label uppercase text-ink-subtle tabular-figures md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-ink text-heading-xl transition-colors duration-fast group-hover/cap:text-accent-text md:col-span-4">
                  {item.label}
                </span>
                <span className="max-w-prose text-body text-ink-muted md:col-span-6">
                  {item.description}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-ink-subtle transition-transform duration-base group-hover/cap:translate-x-1 md:col-span-1 md:block md:text-right"
                >
                  →
                </span>
              </NextLink>
            </FadeRise>
          </li>
        ))}
      </ol>

      <FadeRise className="mt-14">
        <Link href="/technology" variant="arrow" className="text-body text-ink">
          All capabilities
        </Link>
      </FadeRise>
    </Section>
  );
}
