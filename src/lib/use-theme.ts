"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/**
 * Reads the active theme from <html>.
 *
 * Dark is the default, so it is the ABSENCE of a class — `.light` is what opts
 * out. That way a visitor without JavaScript still gets the intended brand
 * surface, and the inline script in layout.tsx only has to act for people who
 * chose light.
 *
 * Implemented with useSyncExternalStore over a MutationObserver rather than
 * React state: the theme lives on a DOM node that anything can change, so it is
 * external state and has to be subscribed to, not mirrored. Mirroring it would
 * mean a setState-in-effect and a cascading render.
 *
 * The server snapshot is `null`, not "dark". Callers can then render a neutral
 * placeholder until hydration instead of guessing a theme and visibly flipping
 * if they guessed wrong.
 *
 * Extracted from ThemeToggle, which owned this privately until GhostFibers
 * needed the same answer — a shader whose palette must follow the theme.
 */
function getThemeSnapshot(): Theme | null {
  if (typeof document === "undefined") return null;
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function subscribe(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function useTheme(): Theme | null {
  return useSyncExternalStore<Theme | null>(subscribe, getThemeSnapshot, () => null);
}
