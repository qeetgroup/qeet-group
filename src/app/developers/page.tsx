import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Anchor } from "@/components/ui/Anchor";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import { buildPageMetadata } from "@/lib/seo/meta";
import { ORG_PROPERTIES } from "@/config/site";
import { isLive } from "@/config/live-hosts";

export const metadata = buildPageMetadata({
  title: "Developers",
  description:
    "Documentation, API references, SDKs and the Qeet Group design system — the properties engineers actually need.",
  path: "/developers",
});

/**
 * ============================================================================
 * A signpost, not a destination
 * ============================================================================
 *
 * This page exists because engineers arriving at qeet.in need somewhere
 * obvious to go, and it deliberately does very little beyond pointing at the
 * places that hold the real material.
 *
 * The temptation is to reproduce documentation here — a quickstart, a code
 * sample, an endpoint table. That would immediately become the stale copy:
 * docs.qeet.in and apis.qeet.in are generated from the products themselves,
 * and a marketing site cannot keep pace with them. A signpost that is always
 * correct beats an excerpt that is usually not.
 *
 * It is also why this page is the one place the business-language rule relaxes
 * slightly — naming an API reference is not jargon, it is the address.
 */
const DESTINATIONS = [
  {
    href: "https://docs.qeet.in",
    label: "Documentation",
    body: "Guides and reference for every Qeet product, in one place.",
  },
  {
    href: "https://apis.qeet.in",
    label: "API reference",
    body: "Interactive reference across the portfolio, generated from the products themselves.",
  },
  {
    href: "https://ui.qeet.in",
    label: "Design system",
    body: "Qeetrix — the components, tokens and patterns every Qeet interface is built from.",
  },
  {
    href: "https://github.com/qeetgroup",
    label: "GitHub",
    body: "Open repositories, SDKs and issue trackers.",
  },
];

export default function DevelopersPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <PageAmbient />
        <Container width="wide">
          <FadeRise>
            <Eyebrow className="mb-8">Developers</Eyebrow>
          </FadeRise>
          <RevealLines
            as="h1"
            lines={["Everything you need", "is somewhere else."]}
            className="max-w-[20ch] text-balance font-display text-ink text-display-xl"
          />
          <FadeRise delay={0.4} className="mt-10 max-w-2xl">
            <Lede>
              Deliberately. Documentation and API references are generated from
              the products themselves, so they are always current — and this
              page would only ever be a stale copy of them.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      <Section>
        <ul className="grid-editorial">
          {DESTINATIONS.map((d) => {
            const live = isLive(d.href) || d.href.startsWith("https://github.com");
            return (
            <li key={d.href} className="col-figure">
              <FadeRise>
                {/* Unreachable destinations are shown, disabled, with the
                    reason — an engineer planning around them is better served
                    than one who finds the link broken. */}
                <Anchor
                  href={live ? d.href : "#"}
                  aria-disabled={live ? undefined : true}
                  className={live
                    ? "group/dest block border-t border-rule pt-6 rounded-sm focus-ring"
                    : "group/dest block cursor-not-allowed border-t border-rule pt-6 opacity-55"}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-ink text-heading-xl transition-colors duration-fast group-hover/dest:text-accent-text-hover">
                      {d.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-ink-subtle transition-transform duration-base group-hover/dest:-translate-y-0.5 group-hover/dest:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="mt-3 block max-w-prose text-body text-ink-muted">
                    {d.body}
                  </span>
                  <span className="mt-4 block font-mono text-label uppercase text-ink-subtle">
                    {d.href.replace(/^https:\/\//, "")}
                    {!live && " · not yet live"}
                  </span>
                </Anchor>
              </FadeRise>
            </li>
            );
          })}
        </ul>
      </Section>

      <Section className="border-t border-rule bg-surface-sunken" padding="tight">
        <FadeRise>
          <Eyebrow className="mb-6">Qeet Group properties</Eyebrow>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {ORG_PROPERTIES.map((p) =>
              isLive(p.href) ? (
                <li key={p.href}>
                  <Anchor href={p.href} className="rounded-sm font-mono text-body-s text-ink-muted transition-colors duration-fast hover:text-ink focus-ring">
                    {p.label}
                  </Anchor>
                </li>
              ) : (
                <li key={p.href} className="font-mono text-body-s text-ink-subtle">
                  {p.label} · not yet live
                </li>
              ),
            )}
          </ul>
        </FadeRise>
      </Section>
    </>
  );
}
