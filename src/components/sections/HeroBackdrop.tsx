"use client";

import GhostFibers from "@/components/media/GhostFibers";
import { useTheme } from "@/lib/use-theme";

/**
 * The hero's generated backdrop.
 *
 * A thin client wrapper whose only job is to feed GhostFibers the palette for
 * the ACTIVE THEME. The shader takes flat hex values — it cannot resolve a CSS
 * custom property — so the tokens have to be handed to it, and handed to it
 * again when the theme changes.
 *
 * `useTheme` returns null on the server and until hydration. That renders the
 * dark palette, which is correct: dark is the site default, and a light-theme
 * visitor briefly sees the dark backdrop rather than a flash of white.
 *
 * Colours mirror the token layer:
 *   line     rule-strong   the fibre strokes, quiet structural hairlines
 *   glow     the accent    brand orange, and the only saturated thing here
 *   backdrop the canvas    so the shader's edges meet the page seamlessly
 *
 * The upstream defaults were a dark navy and indigo. Those are handsome and
 * belong to somebody else; driving the shader from Qeet's own tokens is what
 * makes this the site's backdrop rather than a component someone installed.
 */
export function HeroBackdrop() {
  const theme = useTheme();
  const light = theme === "light";

  return (
    <GhostFibers
      lineColor={light ? "#c8c8c8" : "#3d3d3d"}
      glowColor="#ff6900"
      backdrop={light ? "#fcfcfc" : "#0a0a0a"}
      lightMode={light}
      /*
       * Slower and calmer than the reference defaults. This sits under a
       * headline that people are meant to read; a backdrop that draws the eye
       * is competing with the one thing the hero exists to say.
       */
      speed={0.14}
      rotationSpeed={0.16}
      scale={2.4}
      layers={4}
      glowIntensity={light ? 0.5 : 1.1}
      brightness={light ? 1.2 : 1.7}
      vignette={0.85}
      grain={0.045}
      /* Blue push off: it turns a warm glow muddy on this palette. */
      blueBoost={1}
      /* 1x. At DPR 3 this shader fills nine times the pixels for a backdrop
       * sitting under a scrim — the cost is invisible and the battery is not. */
      dpr={1}
      fps={48}
    />
  );
}
