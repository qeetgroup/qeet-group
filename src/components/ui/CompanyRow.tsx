"use client";

import { useRef, type PointerEvent } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

type CompanyRowProps = {
  name: string;
  description: string;
  tag: string;
  href: string;
  isFirst?: boolean;
};

export function CompanyRow({ name, description, tag, href, isFirst }: CompanyRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--cursor-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--cursor-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/row relative isolate",
        !isFirst && "border-t border-rule",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 md:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), color-mix(in oklab, var(--color-accent) 9%, transparent), transparent 65%)",
        }}
      />
      <NextLink
        href={href}
        className="block transition-colors duration-300 hover:bg-ink/[3%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <div className="grid grid-cols-1 gap-6 px-2 py-10 md:grid-cols-12 md:items-end md:gap-8 md:py-14 lg:py-16">
          <div className="md:col-span-8">
            <p className="mb-4 font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
              {tag}
            </p>
            <h3 className="font-serif font-normal tracking-[-0.015em] text-ink text-[2.25rem] leading-[1.05] md:text-[3rem] md:leading-[1.04] lg:text-[3.75rem] lg:leading-[1.03]">
              {name}
            </h3>
            <p className="mt-5 max-w-[34rem] text-body text-ink-muted md:mt-6">{description}</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="inline-flex items-baseline gap-2 text-body text-ink">
              <span>Read more</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover/row:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </NextLink>
    </div>
  );
}
