"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/search", label: "Search", mobileOnly: true },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-300",
          isElevated
            ? "border-b border-rule bg-canvas/80 backdrop-blur-md supports-backdrop-filter:bg-canvas/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:h-20 lg:px-16">
          <NextLink
            href="/"
            aria-label="Qeet Group home"
            className="font-serif text-[1.5rem] leading-none tracking-tight text-ink sm:text-[1.625rem] lg:text-[1.75rem]"
          >
            Qeet Group
          </NextLink>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks
              .filter((l) => !l.mobileOnly)
              .map((l) => {
                const active = pathname === l.href || pathname.startsWith(l.href + "/");
                return (
                  <NextLink
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "text-[0.9375rem] tracking-tight transition-colors duration-200",
                      active ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {l.label}
                  </NextLink>
                );
              })}
            <NextLink
              href="/search"
              aria-label="Search"
              className="ml-2 inline-flex h-10 w-10 items-center justify-center text-ink-muted hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
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
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-canvas lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-4 pb-12 md:px-10">
            {navLinks.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <NextLink
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className={cn(
                    "border-b border-rule py-5 font-serif text-[1.875rem] leading-tight transition-colors duration-200 md:text-[2.25rem]",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {l.label}
                </NextLink>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
