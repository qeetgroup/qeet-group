"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import type { SearchEntry } from "@/lib/search";

const TYPE_LABEL: Record<SearchEntry["type"], string> = {
  page: "Page",
  company: "Company",
  post: "Newsroom",
  memo: "Memo",
};

function scoreEntry(entry: SearchEntry, q: string): number {
  if (!q) return 0;
  const title = entry.title.toLowerCase();
  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 60;
  if (entry.description.toLowerCase().includes(q)) return 30;
  if (entry.haystack.includes(q)) return 10;
  return 0;
}

export function SearchBox({ index }: { index: SearchEntry[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [] as Array<SearchEntry & { score: number }>;
    return index
      .map((e) => ({ ...e, score: scoreEntry(e, q) }))
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [index, query]);

  const showEmpty = query.trim().length >= 2 && results.length === 0;

  return (
    <div className="max-w-2xl">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        autoComplete="off"
        placeholder="Search the site…"
        className={cn(
          "w-full appearance-none border-0 border-b border-rule-strong bg-transparent",
          "py-4 font-serif text-[1.75rem] leading-[1.18] text-ink placeholder:text-ink-subtle md:text-[2.25rem]",
          "focus:border-ink focus:outline-none transition-colors duration-200",
        )}
      />

      {showEmpty && (
        <p className="mt-10 font-sans text-body text-ink-muted">
          Nothing matched &ldquo;{query.trim()}&rdquo;.
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-10 md:mt-14">
          {results.map((r, i) => (
            <li key={r.url} className={cn(i !== 0 && "border-t border-rule")}>
              <NextLink
                href={r.url}
                className="block py-6 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:py-8"
              >
                <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                  {TYPE_LABEL[r.type]}
                </p>
                <h2 className="mt-2 font-serif font-normal text-balance text-ink text-[1.5rem] leading-[1.18] md:text-[1.75rem] md:leading-[1.16]">
                  {r.title}
                </h2>
                {r.description && (
                  <p className="mt-2 max-w-[40rem] text-body text-ink-muted">
                    {r.description}
                  </p>
                )}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
