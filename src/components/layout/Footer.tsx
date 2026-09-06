import NextLink from "next/link";
import { Container } from "./Container";
import { Eyebrow } from "../ui/Eyebrow";
import { NewsletterForm } from "../forms/NewsletterForm";
import { SocialIcons } from "../ui/SocialIcons";
import { CurrentYear } from "../ui/CurrentYear";
import { Anchor } from "../ui/Anchor";
import { Wordmark } from "../ui/Wordmark";
import { FadeRise } from "../motion/FadeRise";
import { CONTACT, ORG_PROPERTIES, SITE_DESCRIPTION } from "@/config/site";
import { COMPANY, insightsGroups, TECHNOLOGY } from "@/config/nav";
import { isLive } from "@/config/live-hosts";
import type { ProductSummary } from "@/lib/content";

/*
 * ============================================================================
 * The enterprise footer
 * ============================================================================
 *
 * Large multi-column footers are near-universal across the reference set, and
 * they are not decoration — for a portfolio site the footer is the second
 * navigation, and often the one people actually use, because it is the only
 * place the whole organisation is visible at once.
 *
 * Two decisions worth recording:
 *
 * 1. COLUMNS ARE DERIVED FROM THE NAV MODEL, not re-listed here. The previous
 *    footer maintained its own link lists, which is how a footer ends up
 *    pointing at pages that moved six months ago. Products come from the live
 *    MDX collection for the same reason.
 *
 * 2. THE PROPERTIES ROW IS ITS OWN THING. docs.qeet.in, apis.qeet.in and
 *    ui.qeet.in are not pages of this site — they are separate properties the
 *    organisation operates. Burying them in a link column implies they are
 *    sections of qeet.in; giving them their own row states what they are, and
 *    means a developer looking for documentation does not have to guess the
 *    hostname.
 */

type FooterLink = { href: string; label: string };
type FooterColumn = { heading: string; items: FooterLink[] };

const RESOURCES: FooterColumn = {
  heading: "Resources",
  items: [
    { href: "/developers", label: "Developers" },
    { href: "/search", label: "Search" },
    { href: "/insights/rss.xml", label: "RSS feed" },
    { href: "/llms.txt", label: "llms.txt" },
  ],
};

const LEGAL: FooterColumn = {
  heading: "Legal",
  items: [
    { href: "/legal/privacy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
    { href: `mailto:${CONTACT.security}`, label: "Report a vulnerability" },
  ],
};

/** Flattens a nav model's groups into one footer column. */
function fromGroups(heading: string, groups: { items: FooterLink[] }[]): FooterColumn {
  return { heading, items: groups.flatMap((g) => g.items) };
}

function FooterLinkRow({ href, label }: FooterLink) {
  return (
    <li>
      <Anchor
        href={href}
        className="rounded-sm text-body-s text-ink-muted transition-colors duration-fast hover:text-ink focus-ring"
      >
        {label}
      </Anchor>
    </li>
  );
}

export function Footer({
  products,
  topics,
}: {
  products: ProductSummary[];
  topics: string[];
}) {
  const year = new Date().getFullYear();

  const columns: FooterColumn[] = [
    { heading: "Products", items: products.map((p) => ({ href: p.href, label: p.name })) },
    fromGroups("Technology", TECHNOLOGY),
    fromGroups("Company", COMPANY),
    fromGroups("Insights", insightsGroups(topics)),
    RESOURCES,
    LEGAL,
  ];

  return (
    <footer className="relative border-t border-rule bg-canvas">
      <Container width="wide">
        <FadeRise className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-3">
            <Wordmark tintOnHover />
            <p className="mt-5 max-w-xs text-body-s text-ink-muted">{SITE_DESCRIPTION}</p>
            <div className="mt-8">
              <Eyebrow className="mb-3">Stay in touch</Eyebrow>
              <NewsletterForm />
            </div>
          </div>

          {/*
            Six columns at the widest breakpoint, two on a phone. Not three:
            product names are long enough that three columns on a 360px screen
            wraps every one of them onto two lines.
          */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
            {columns.map((col) => (
              <div key={col.heading}>
                <Eyebrow className="mb-5">{col.heading}</Eyebrow>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <FooterLinkRow key={`${col.heading}-${item.href}`} {...item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeRise>

        <div className="flex flex-col gap-6 border-t border-rule py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow className="mb-4">Qeet Group properties</Eyebrow>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {ORG_PROPERTIES.map((p) => {
                /* A property whose host does not resolve is named, not linked.
                   Better to say "coming" than to hand someone a dead link. */
                if (!isLive(p.href)) {
                  return (
                    <li key={p.href}>
                      <span className="block font-mono text-body-s text-ink-subtle">
                        {p.label}
                      </span>
                      <span className="block text-caption text-ink-subtle">
                        {p.description} · not yet live
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={p.href}>
                    <Anchor href={p.href} className="group/prop rounded-sm focus-ring">
                      <span className="block font-mono text-body-s text-ink transition-colors duration-fast group-hover/prop:text-accent-text-hover">
                        {p.label}
                      </span>
                      <span className="block text-caption text-ink-subtle">{p.description}</span>
                    </Anchor>
                  </li>
                );
              })}
            </ul>
          </div>
          <SocialIcons />
        </div>

        <div className="flex flex-col gap-4 border-t border-rule py-8 text-body-s text-ink-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear buildYear={year} /> Qeet Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <NextLink
              href="/contact"
              className="rounded-sm transition-colors duration-fast hover:text-ink focus-ring"
            >
              Contact
            </NextLink>
            <a
              href="#main"
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors duration-fast hover:text-ink focus-ring"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
