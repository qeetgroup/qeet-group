"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { tokenToHex } from "@/lib/color";

/*
 * The WebGL layer is code-split and only requested once we decide to mount it,
 * so `ogl` and the shader never touch the initial bundle or compete with LCP.
 */
const GhostFibers = dynamic(() => import("@/components/vendor/GhostFibers"), {
  ssr: false,
});

/**
 * Should this device render the shader at all?
 *
 * The plan's constraint on generative backgrounds is that they must never
 * compete with content or with Core Web Vitals, so this is deliberately
 * conservative — every "no" falls back to the static mesh, which is a designed
 * state rather than an absence.
 */
function shouldRender(): boolean {
  if (typeof window === "undefined") return false;

  // Honour the OS setting up front. The shader also checks this internally and
  // renders a single static frame, but not mounting at all is cheaper.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  // Phones get the static mesh: a full-viewport fragment shader is the wrong
  // trade on a small screen and a mid-range GPU.
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;

  // Rough low-end signals. Both are advisory and absent in some browsers, so
  // they only ever veto when they are present and clearly low.
  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores <= 4) return false;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof memory === "number" && memory > 0 && memory < 4) return false;

  // No WebGL2, no shader.
  try {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) return false;
  } catch {
    return false;
  }

  return true;
}

/** Re-reads on theme change, so the shader retints when `.light` toggles. */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function useIsLightTheme(): boolean {
  return useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("light"),
    () => false,
  );
}

/**
 * Hero backdrop: a static token-driven mesh, with the GhostFibers shader
 * layered over it on capable devices.
 *
 * The mesh is not a placeholder — it is the design, and it stays visible
 * underneath. The shader fades in on top only after the page has settled, so a
 * visitor who never qualifies for it still sees a finished hero rather than a
 * gap.
 */
export function HeroBackground() {
  const [enabled, setEnabled] = useState(false);
  const isLight = useIsLightTheme();

  useEffect(() => {
    if (!shouldRender()) return;

    // Wait for idle so the shader compile never competes with LCP. The timeout
    // is the ceiling, not the target — on a busy main thread it simply waits.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setEnabled(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Always present: the static, token-driven fallback. */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grain" />

      {enabled ? (
        <div className="absolute inset-0 animate-[fade-in_900ms_var(--ease-expo)_forwards] opacity-0">
          <GhostFibers
            // Tokens rather than literals, so the shader follows the palette —
            // including when the theme flips at runtime.
            lineColor={tokenToHex("--color-accent")}
            glowColor={tokenToHex("--color-brand-700")}
            backdrop={tokenToHex("--color-canvas")}
            lightMode={isLight}
            // Tuned from the upstream demo: slower and softer, because this
            // sits behind a display-size headline and has to read as
            // atmosphere rather than artwork. blueBoost is neutralised — the
            // upstream default pushes the palette toward its indigo demo, and
            // ours is warm.
            speed={0.1}
            scale={2.2}
            layers={4}
            brightness={1.9}
            glowIntensity={1.35}
            lineSharpness={18}
            vignette={0.85}
            grain={0.035}
            blueBoost={1}
            // Half rate and 1x DPR: it is a slow-moving backdrop, and the extra
            // frames and pixels are not perceptible here but are measurable.
            fps={30}
            dpr={1}
          />
        </div>
      ) : null}
    </div>
  );
}
