"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
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

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);
  const isElevated = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-300",
        isElevated
          ? "border-b border-rule bg-canvas/80 backdrop-blur-md supports-backdrop-filter:bg-canvas/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
        <NextLink
          href="/"
          aria-label="Qeet Group home"
          className="group/brand inline-flex items-center gap-2.5 text-ink"
        >
          <Logo className="h-7 w-7 md:h-8 md:w-8" />
          <span className="font-serif text-[1.625rem] leading-none tracking-tight md:text-[1.75rem]">
            Qeet
          </span>
        </NextLink>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => {
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
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex items-center justify-center p-2 text-ink md:hidden"
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

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-canvas md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 pt-6 pb-12">
            {navLinks.map((l) => (
              <NextLink
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="border-b border-rule py-5 font-serif text-[2rem] leading-tight text-ink"
              >
                {l.label}
              </NextLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
