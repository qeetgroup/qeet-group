"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/components/sections/CommandPalette";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import type { ProductSummary } from "@/lib/content";
import { NAV_LINKS } from "@/config/site";

const navLinks = NAV_LINKS;

export function Nav({ products }: { products: ProductSummary[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);
  const isElevated = scrolled || open;
  const productsActive = pathname === "/products" || pathname.startsWith("/products/");

  const linkBase =
    "relative py-1 font-ui text-[0.9375rem] tracking-tight transition-colors duration-200";

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
          isElevated
            ? "border-b border-rule bg-canvas/70 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-canvas/60"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:h-20 lg:px-16">
          <Magnetic strength={0.3}>
            <NextLink
              href="/"
              aria-label="Qeet Group home"
              className="group flex items-center gap-2.5 font-display text-[1.4rem] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[1.5rem] lg:text-[1.625rem]"
            >
              {/* Identity-core dot — a small echo of the graph signature. */}
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-125"
              />
              Qeet Group
            </NextLink>
          </Magnetic>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {/* Products mega-panel: opens on hover and on keyboard focus-within. */}
            <div className="group relative">
              <NextLink
                href="/products"
                className={cn(linkBase, "flex items-center gap-1.5", productsActive ? "text-ink" : "text-ink-muted hover:text-ink")}
                aria-haspopup="true"
              >
                Products
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="mt-0.5 text-ink-subtle transition-transform duration-300 group-hover:rotate-180"
                >
                  <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {productsActive && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-brand" />}
              </NextLink>

              {/* pt bridge keeps hover alive across the gap to the panel */}
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-[opacity,transform] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 motion-safe:translate-y-1 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-within:translate-y-0">
                <div className="glass-panel w-136 rounded-2xl p-3 backdrop-blur-xl">
                  <div className="grid max-h-[70vh] grid-cols-2 gap-1 overflow-y-auto">
                    {products.map((p) => (
                      <NextLink
                        key={p.href}
                        href={p.href}
                        className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-brand-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 group-hover/item:bg-brand",
                            p.live ? "bg-brand" : "bg-rule-strong",
                          )}
                        />
                        <span className="min-w-0">
                          <span className="block font-ui text-[0.9375rem] font-medium text-ink">{p.name}</span>
                          <span className="mt-0.5 block truncate text-caption text-ink-subtle">{p.sector}</span>
                        </span>
                        <span
                          className={cn(
                            "ml-auto shrink-0 font-mono text-[0.6875rem] uppercase tracking-widest",
                            p.live ? "text-brand" : "text-ink-subtle",
                          )}
                        >
                          {p.statusLabel}
                        </span>
                      </NextLink>
                    ))}
                  </div>
                  <NextLink
                    href="/products"
                    className="mt-1 flex items-center justify-between rounded-xl border-t border-rule px-3 pb-1 pt-3 text-body-s text-ink transition-colors duration-200 hover:text-brand"
                  >
                    Explore all platforms
                    <span aria-hidden="true">→</span>
                  </NextLink>
                </div>
              </div>
            </div>

            {navLinks.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <NextLink
                  key={l.href}
                  href={l.href}
                  className={cn(linkBase, active ? "text-ink" : "text-ink-muted hover:text-ink")}
                >
                  {l.label}
                  {active &&
                    (reduce ? (
                      <span className="absolute inset-x-0 -bottom-0.5 h-px bg-brand" />
                    ) : (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-brand"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    ))}
                </NextLink>
              );
            })}
            <NextLink
              href="/search"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT));
              }}
              className="ml-2 inline-flex h-9 items-center gap-2 rounded-full border border-rule px-3.5 text-ink-muted transition-colors duration-200 hover:border-rule-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
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
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-sm"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {open ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
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
      </header>

      {/*
        Overlay renders as a sibling of <header>, NOT inside it. The header
        applies backdrop-filter when elevated, which would otherwise create a
        containing block for fixed descendants and collapse this overlay.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-4 pb-12 md:px-10">
              {[{ href: "/products", label: "Products" }, ...navLinks, { href: "/search", label: "Search" }].map((l, i) => {
                const active = pathname === l.href || pathname.startsWith(l.href + "/");
                return (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: EASE_OUT }}
                  >
                    <NextLink
                      href={l.href}
                      onClick={closeMenu}
                      className={cn(
                        "block border-b border-rule py-5 font-display font-medium text-[1.875rem] leading-tight tracking-[-0.02em] transition-colors duration-200 md:text-[2.25rem]",
                        active ? "text-ink" : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {l.label}
                    </NextLink>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
