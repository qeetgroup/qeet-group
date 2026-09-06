"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * The same reasoning as use-theme: a media query is state the BROWSER owns, so
 * it is subscribed to rather than copied into React state. Copying it means a
 * setState inside an effect, which is a cascading render and — worse — a frame
 * where the component has already painted with the wrong answer.
 *
 * The server snapshot is `false` for every query. That is a deliberate choice
 * rather than a limitation: callers should treat `false` as "not yet known"
 * and pick a default that is safe when the query is unanswerable, because on
 * the server it genuinely is. In practice that means writing queries in the
 * form "is this the SMALL screen" and letting the desktop treatment be the
 * server-rendered one, which is what CSS itself does with min-width.
 *
 * Used by the hero backdrop, where the shader has to be tuned differently on a
 * phone and cannot be reached by a media query, since its parameters are
 * uniforms rather than CSS.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );

  const snapshot = useCallback(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, snapshot, () => false);
}
