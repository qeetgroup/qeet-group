/**
 * ============================================================================
 * The navigation model
 * ============================================================================
 *
 * Navigation is the primary UX for an organisation with sixteen products. The
 * reference set makes that case in both directions: Salesforce organises by
 * product, industry and role so a visitor can self-select, while Oracle is
 * repeatedly cited as the counter-example — it contains everything and guides
 * nothing.
 *
 * Five primary destinations, matching the density corporate sites settle on
 * (Accenture, Deloitte and Wipro all run four to six). The shape borrows their
 * logic but not their labels: "What we do / What we think / Who we are" is the
 * vocabulary of a services firm selling engagements, and Qeet ships products.
 *
 * `Ecosystem` is top-level on purpose. It is the one thing Qeet has that none
 * of the references do — a portfolio whose members compose one another — and
 * burying it inside Products would make it look like a marketing page rather
 * than the organising idea.
 *
 * This module is DATA ONLY. It is imported by the desktop mega menu, the
 * mobile accordion, the footer and the search index, and each of those renders
 * it differently — which only works while nothing here knows about rendering.
 */

export type NavLink = {
  href: string;
  label: string;
  /** One line shown in the mega panel. Omit for dense link lists. */
  description?: string;
  /** Renders an external affordance and opens in a new tab. */
  external?: boolean;
};

export type NavGroup = {
  heading: string;
  items: NavLink[];
};

export type NavDestination = {
  href: string;
  label: string;
  /**
   * Absent means a plain link with no panel. Present means a mega panel, which
   * is a promise that there is enough beneath it to be worth the interaction —
   * a panel holding three links is worse than no panel.
   */
  groups?: NavGroup[];
  /** Promoted link pinned to the foot of the panel. */
  feature?: NavLink;
};

/**
 * Products is intentionally NOT listed here. Its panel is generated from the
 * live MDX collection at request time (see the Nav component), so adding a
 * product file puts it in the navigation with no edit to this file. Hardcoding
 * sixteen product links here is precisely how a portfolio site drifts out of
 * date.
 */
export const TECHNOLOGY: NavGroup[] = [
  {
    heading: "Capabilities",
    items: [
      { href: "/technology/identity", label: "Identity", description: "One secure way in" },
      { href: "/technology/intelligence", label: "Intelligence", description: "Reasoning over what an organisation knows" },
      { href: "/technology/payments", label: "Payments", description: "Moving and accounting for money" },
      { href: "/technology/communications", label: "Communications", description: "Reaching people reliably" },
      { href: "/technology/visibility", label: "Visibility", description: "Knowing what systems are doing" },
      { href: "/technology/people", label: "People", description: "Employing and paying a workforce" },
    ],
  },
  {
    heading: "Foundations",
    items: [
      { href: "/technology/design-foundation", label: "Design foundation", description: "The system every product is built from" },
      { href: "/technology/security", label: "Security", description: "How we protect what we hold" },
      { href: "/technology/engineering", label: "Engineering", description: "How we build" },
    ],
  },
];

/**
 * Insight topics are NOT listed here — they are derived from the collection
 * and passed in by the chrome (see `insightsGroups`). Hardcoding them produced
 * exactly the failure you would expect: links to `/insights/topic/research`
 * and `/insights/topic/engineering` that 404ed, because the only articles with
 * those topics were demo content and therefore hidden in production.
 *
 * Deriving means a topic link exists if and only if there is something behind
 * it, in whatever content mode the build is running.
 */
export const INSIGHTS_STATIC: NavGroup = {
  heading: "From the organisation",
  items: [
    { href: "/insights", label: "All insights" },
    { href: "/company/now", label: "What we're working on" },
    { href: "/insights/rss.xml", label: "RSS feed" },
  ],
};

/** Builds the Insights panel from the topics that actually have articles. */
export function insightsGroups(topics: string[]): NavGroup[] {
  const byTopic: NavGroup = {
    heading: "By topic",
    items: topics.map((t) => ({
      href: `/insights/topic/${t.toLowerCase().replace(/\s+/g, "-")}`,
      label: t,
    })),
  };
  return byTopic.items.length > 0 ? [byTopic, INSIGHTS_STATIC] : [INSIGHTS_STATIC];
}

export const COMPANY: NavGroup[] = [
  {
    heading: "About",
    items: [
      { href: "/company/about", label: "About Qeet Group" },
      { href: "/company/principles", label: "Principles" },
      { href: "/company/leadership", label: "Leadership" },
      { href: "/company/faq", label: "Questions" },
    ],
  },
  {
    heading: "Connect",
    items: [
      { href: "/careers", label: "Careers" },
      { href: "/company/press", label: "Press" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/**
 * The primary bar. Products is first because it is what most visitors came
 * for, and Company last because the people who want it will look for it there
 * regardless — that ordering is near-universal across the reference set.
 */
export const PRIMARY_NAV: NavDestination[] = [
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology", groups: TECHNOLOGY },
  { href: "/ecosystem", label: "Ecosystem" },
  // `groups` is injected by the chrome from live topics — see insightsGroups().
  { href: "/insights", label: "Insights" },
  { href: "/company/about", label: "Company", groups: COMPANY },
];

/** Right-hand rail. Deliberately small — a utility rail that grows becomes a second nav. */
export const UTILITY_NAV: NavLink[] = [
  { href: "/developers", label: "Developers" },
  { href: "/contact", label: "Contact" },
];

/**
 * ============================================================================
 * Audience paths
 * ============================================================================
 *
 * Six audiences arrive at a corporate site wanting six different things, and
 * one "Get started" button serves none of them. These replace the single
 * catch-all CTA: each names the visitor rather than the action, so people
 * self-select instead of being funnelled.
 *
 * Nothing here says "Book a demo" or "Start free" — those are the vocabulary
 * of a product trying to convert a signup, not an organisation trying to be
 * understood.
 */
export const AUDIENCE_PATHS: Array<NavLink & { audience: string }> = [
  {
    audience: "Enterprise",
    href: "/products",
    label: "Explore the portfolio",
    description: "What we build, and what state each product is in.",
  },
  {
    audience: "Developers",
    href: "/developers",
    label: "Explore the developer platform",
    description: "Documentation, API references and SDKs.",
  },
  {
    audience: "Engineers",
    href: "/technology/engineering",
    label: "Explore how we build",
    description: "The principles and standards our teams work to.",
  },
  {
    audience: "Partners",
    href: "/contact?intent=partnership",
    label: "Partner with Qeet",
    description: "Integrations, distribution and joint work.",
  },
  {
    audience: "Candidates",
    href: "/careers",
    label: "Join Qeet",
    description: "How we work, and where we're hiring.",
  },
  {
    audience: "Press",
    href: "/company/press",
    label: "Media resources",
    description: "Brand assets, facts and contacts.",
  },
];
