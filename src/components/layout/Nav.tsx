"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Wordmark } from "@/components/ui/Wordmark";
import { StatusChip } from "@/components/ui/StatusChip";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/components/sections/CommandPalette";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { cn } from "@/lib/utils";
import { chromeSettle, EASE_OUT } from "@/lib/motion";
import type { ProductSummary } from "@/lib/content";
import { insightsGroups, PRIMARY_NAV, UTILITY_NAV, type NavGroup } from "@/config/nav";

/*
 * ============================================================================
 * Global navigation
 * ============================================================================
 *
 * Navigation is the primary interface for a sixteen-product portfolio, so this
 * is the component that decides whether the site is usable. Three things are
 * load-bearing and none of them are visual:
 *
 * 1. THE PRODUCTS PANEL IS DERIVED, NOT AUTHORED. It is built from the live
 *    MDX collection, grouped by domain and ordered by lifecycle. Adding a
 *    product file puts it in the navigation. Nothing here lists products.
 *
 * 2. HOVER IS AN ENHANCEMENT, NOT THE MECHANISM. The panel opens on hover for
 *    a pointer, and on click/Enter for everything else. A hover-only mega menu
 *    is unusable by keyboard and hostile on touch, which is most visitors.
 *
 * 3. MOBILE IS ITS OWN INFORMATION ARCHITECTURE. Not this menu, narrower. The
 *    desktop panel is a wide multi-column layout that cannot shrink into a
 *    phone; mobile gets an accordion where each destination expands in place.
 */

type PanelId = string | null;

/** Products are grouped by domain, in a fixed order that reads as a hierarchy. */
const GROUP_ORDER = [
  "identity",
  "foundation",
  "business",
  "intelligence",
  "visibility",
  "communications",
  "media",
  "productivity",
] as const;

const GROUP_LABEL: Record<string, string> = {
  identity: "Identity",
  foundation: "Foundation",
  business: "Business",
  intelligence: "Intelligence",
  visibility: "Visibility",
  communications: "Communications",
  media: "Media",
  productivity: "Productivity",
};

function groupProducts(products: ProductSummary[]) {
  return GROUP_ORDER.map((group) => ({
    group,
    label: GROUP_LABEL[group] ?? group,
    items: products.filter((p) => p.group === group),
  })).filter((g) => g.items.length > 0);
}

/* -------------------------------------------------------------------------- */

function useHoverIntent(onOpen: (id: string) => void, onClose: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clear, []);
  return {
    // Opening is delayed so that sweeping the cursor across the bar on the way
    // somewhere else does not flash three panels open behind it.
    enter: (id: string) => {
      clear();
      timer.current = setTimeout(() => onOpen(id), 90);
    },
    // Closing is delayed more generously: the cursor has to cross a gap between
    // the trigger and the panel, and a panel that closes mid-traverse is the
    // single most irritating mega-menu failure.
    leave: () => {
      clear();
      timer.current = setTimeout(onClose, 180);
    },
    cancel: clear,
  };
}

function PanelColumns({ groups }: { groups: NavGroup[] }) {
  return (
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.heading}>
          <p className="font-mono text-label uppercase text-ink-subtle">{g.heading}</p>
          <ul className="mt-4 space-y-1">
            {g.items.map((item) => (
              <li key={item.href}>
                <NextLink
                  href={item.href}
                  className="group/item -mx-3 block rounded-md px-3 py-2 transition-colors duration-fast hover:bg-accent-faint focus-ring"
                >
                  <span className="block font-sans text-body-s font-medium text-ink">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="mt-0.5 block text-caption text-ink-subtle">
                      {item.description}
                    </span>
                  )}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProductPanel({ products }: { products: ProductSummary[] }) {
  const groups = groupProducts(products);
  return (
    <>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="font-mono text-label uppercase text-ink-subtle">{g.label}</p>
            <ul className="mt-4 space-y-1">
              {g.items.map((p) => (
                <li key={p.href}>
                  <NextLink
                    href={p.href}
                    className="-mx-3 block rounded-md px-3 py-2 transition-colors duration-fast hover:bg-accent-faint focus-ring"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-sans text-body-s font-medium text-ink">
                        {p.name}
                      </span>
                      <StatusChip status={p.status} showDot={false} className="shrink-0" />
                    </span>
                    <span className="mt-0.5 block text-caption text-ink-subtle">
                      {p.oneLiner}
                    </span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <NextLink
        href="/ecosystem"
        className="mt-8 flex items-center justify-between border-t border-rule pt-5 text-body-s text-ink transition-colors duration-fast hover:text-accent-text focus-ring"
      >
        See how the products fit together
        <span aria-hidden="true">→</span>
      </NextLink>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function Nav({
  products,
  topics,
}: {
  products: ProductSummary[];
  /** Live insight topics. Derived in the layout, so a topic link exists only
   *  where there is something behind it. */
  topics: string[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<PanelId>(null);
  const pathname = usePathname();

  /*
   * Open state is stored WITH the route it was opened on, and read back only
   * while that route is still current. Navigating therefore closes every menu
   * for free.
   *
   * The obvious alternative — an effect on `pathname` that calls setState —
   * is a cascading render: the new page paints with the panel still open, then
   * immediately re-renders without it. Deriving during render means the panel
   * is simply never open on a route it was not opened on.
   */
  const [menu, setMenu] = useState<{ panel: PanelId; mobile: boolean; at: string }>({
    panel: null,
    mobile: false,
    at: pathname,
  });
  const sameRoute = menu.at === pathname;
  const openPanel = sameRoute ? menu.panel : null;
  const mobileOpen = sameRoute ? menu.mobile : false;

  const setOpenPanel = useCallback(
    (panel: PanelId) => setMenu({ panel, mobile: false, at: pathname }),
    [pathname],
  );
  const setMobileOpen = useCallback(
    (next: boolean) => setMenu({ panel: null, mobile: next, at: pathname }),
    [pathname],
  );
  const reduce = useReducedMotion();
  const panelBaseId = useId();
  const barRef = useRef<HTMLDivElement>(null);

  // Injected rather than static — see the note in config/nav.ts.
  const groupsFor = (label: string): NavGroup[] =>
    label === "Insights"
      ? insightsGroups(topics)
      : (PRIMARY_NAV.find((d) => d.label === label)?.groups ?? []);

  const closePanel = useCallback(() => setOpenPanel(null), [setOpenPanel]);
  const hover = useHoverIntent(setOpenPanel, closePanel);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the open panel and returns focus to the bar; a click outside
  // dismisses it. Both are required for a menu to be operable by keyboard.
  useEffect(() => {
    if (!openPanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPanel(null);
        barRef.current?.querySelector<HTMLElement>("[data-nav-trigger]")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenPanel(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [openPanel, setOpenPanel]);

  // Lock body scroll behind the mobile overlay, and close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, setMobileOpen]);

  const isElevated = scrolled || mobileOpen || openPanel !== null;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const linkBase =
    "relative py-1 font-sans text-body-s font-medium tracking-tight transition-colors duration-fast";

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "sticky top-0 z-nav w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-base",
          isElevated
            ? "border-b border-rule bg-canvas/80 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-canvas/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          ref={barRef}
          className="mx-auto flex h-16 w-full max-w-wide items-center justify-between px-(--space-gutter) lg:h-20"
          onMouseLeave={hover.leave}
        >
          <Wordmark className="flex" />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {PRIMARY_NAV.map((dest) => {
              const active = isActive(dest.href);
              const isProducts = dest.href === "/products";
              const hasPanel = isProducts || groupsFor(dest.label).length > 0;
              const panelId = `${panelBaseId}-${dest.label}`;
              const expanded = openPanel === dest.label;

              if (!hasPanel) {
                return (
                  <NextLink
                    key={dest.href}
                    href={dest.href}
                    onMouseEnter={hover.leave}
                    className={cn(
                      linkBase,
                      active ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {dest.label}
                    {active && <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" />}
                  </NextLink>
                );
              }

              return (
                <div
                  key={dest.href}
                  className="relative"
                  onMouseEnter={() => hover.enter(dest.label)}
                >
                  <button
                    type="button"
                    data-nav-trigger
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenPanel(expanded ? null : dest.label)}
                    onFocus={() => setOpenPanel(dest.label)}
                    className={cn(
                      linkBase,
                      "flex items-center gap-1.5 focus-ring rounded-sm",
                      active || expanded ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {dest.label}
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 text-ink-subtle transition-transform duration-base",
                        expanded && "rotate-180",
                      )}
                    >
                      <path
                        d="m3 4.5 3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {active && <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" />}
                  </button>
                </div>
              );
            })}

            <span aria-hidden="true" className="h-4 w-px bg-rule" />

            {UTILITY_NAV.map((l) => (
              <NextLink
                key={l.href}
                href={l.href}
                onMouseEnter={hover.leave}
                className={cn(linkBase, "text-ink-muted hover:text-ink")}
              >
                {l.label}
              </NextLink>
            ))}

            <NextLink
              href="/search"
              aria-label="Search"
              title="Search (⌘K)"
              onMouseEnter={hover.leave}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT));
              }}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-rule px-3.5 text-ink-muted transition-colors duration-fast hover:border-rule-strong hover:text-ink focus-ring"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <kbd className="font-mono text-[0.6875rem] tracking-[0.08em] text-ink-subtle">⌘K</kbd>
            </NextLink>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink focus-ring"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 8.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 15.5h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/*
          The panel spans the full bar rather than floating under its trigger.
          A sixteen-product grid does not fit in a dropdown, and anchoring wide
          panels to narrow triggers is what makes mega menus feel unmoored.
        */}
        <AnimatePresence>
          {openPanel && (
            <motion.div
              key={openPanel}
              id={`${panelBaseId}-${openPanel}`}
              variants={reduce ? undefined : chromeSettle}
              initial={reduce ? false : "hidden"}
              animate="visible"
              exit={reduce ? undefined : "exit"}
              onMouseEnter={hover.cancel}
              onMouseLeave={hover.leave}
              className="absolute inset-x-0 top-full hidden border-b border-rule bg-canvas/95 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto w-full max-w-wide px-(--space-gutter) py-10">
                {openPanel === "Products" ? (
                  <ProductPanel products={products} />
                ) : (
                  <PanelColumns groups={groupsFor(openPanel)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/*
        Overlay renders as a sibling of <header>, NOT inside it. The header
        applies backdrop-filter when elevated, which would otherwise create a
        containing block for fixed descendants and collapse this overlay.
      */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 top-16 z-overlay overflow-y-auto bg-canvas/97 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex w-full max-w-wide flex-col px-(--space-gutter) pb-16 pt-4"
            >
              {PRIMARY_NAV.map((dest) => {
                const expanded = mobileSection === dest.label;
                const groups =
                  dest.href === "/products"
                    ? groupProducts(products).map((g) => ({
                        heading: g.label,
                        items: g.items.map((p) => ({ href: p.href, label: p.name })),
                      }))
                    : groupsFor(dest.label);

                if (groups.length === 0) {
                  return (
                    <NextLink
                      key={dest.href}
                      href={dest.href}
                      className="block border-b border-rule py-5 font-display text-heading-xl text-ink-muted transition-colors duration-fast hover:text-ink"
                    >
                      {dest.label}
                    </NextLink>
                  );
                }

                return (
                  <div key={dest.href} className="border-b border-rule">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setMobileSection(expanded ? null : dest.label)}
                      className="flex w-full items-center justify-between rounded-sm py-5 text-left font-display text-heading-xl text-ink focus-ring"
                    >
                      {dest.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "text-ink-subtle transition-transform duration-base",
                          expanded && "rotate-45",
                        )}
                      >
                        +
                      </span>
                    </button>
                    {expanded && (
                      <div className="space-y-6 pb-6">
                        {groups.map((g) => (
                          <div key={g.heading}>
                            <p className="font-mono text-label uppercase text-ink-subtle">
                              {g.heading}
                            </p>
                            <ul className="mt-3 space-y-3">
                              {g.items.map((item) => (
                                <li key={item.href}>
                                  <NextLink
                                    href={item.href}
                                    className="block rounded-sm text-body text-ink-muted transition-colors duration-fast hover:text-ink focus-ring"
                                  >
                                    {item.label}
                                  </NextLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {[...UTILITY_NAV, { href: "/search", label: "Search" }].map((l) => (
                  <NextLink
                    key={l.href}
                    href={l.href}
                    className="rounded-sm font-sans text-body text-ink-muted transition-colors duration-fast hover:text-ink focus-ring"
                  >
                    {l.label}
                  </NextLink>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
