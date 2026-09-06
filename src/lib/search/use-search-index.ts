"use client";

import { useEffect, useState } from "react";
import type { SearchEntry } from "./index";

/** Module-level cache: fetched once per document, shared by every consumer. */
let cached: SearchEntry[] | null = null;
let inFlight: Promise<SearchEntry[]> | null = null;

function fetchIndex(): Promise<SearchEntry[]> {
  if (cached) return Promise.resolve(cached);
  inFlight ??= fetch("/search-index.json")
    .then((r) => (r.ok ? r.json() : []))
    .then((data: SearchEntry[]) => {
      cached = data;
      return data;
    })
    .catch(() => {
      // Let a later open retry rather than caching the failure.
      inFlight = null;
      return [] as SearchEntry[];
    });
  return inFlight;
}

/**
 * Loads the search index from the static /search-index.json route.
 *
 * @param enabled gates the fetch. The ⌘K palette passes its open state, so a
 *   visitor who never opens it never pays for the index; /search passes true.
 * @returns null while loading, so callers can distinguish "still fetching"
 *   from "no results".
 */
export function useSearchIndex(enabled: boolean): SearchEntry[] | null {
  const [index, setIndex] = useState<SearchEntry[] | null>(cached);

  useEffect(() => {
    if (!enabled || index !== null) return;
    let cancelled = false;
    fetchIndex().then((data) => {
      if (!cancelled) setIndex(data);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, index]);

  return index;
}
