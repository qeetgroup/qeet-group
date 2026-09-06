"use client";

import Image from "next/image";
import GhostFibers from "@/components/media/GhostFibers";
import { MEDIA } from "@/config/media";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * ============================================================================
 * The hero's backdrop — two of them, one per theme
 * ============================================================================
 *
 * DARK gets the generated shader. LIGHT gets a photograph of a building.
 *
 * That is not indecision. The shader is drawn FROM the canvas colour, so on
 * dark it emerges out of the page and the fibres read as light in darkness —
 * which is the only direction the effect works in. Inverted for light mode it
 * became grey smudges on off-white: technically the same component, visually a
 * smear. A photograph gives the light theme its own idea rather than a worse
 * version of the dark one.
 *
 * ---------------------------------------------------------------------------
 * Why CSS switches them and not JavaScript
 * ---------------------------------------------------------------------------
 * Both are rendered and the `light:` variant decides which is displayed. The
 * obvious alternative — read the theme with useTheme and return one or the
 * other — has a flaw that only shows up in the browser: a client component
 * still server-renders, useTheme cannot know the theme on the server, so a
 * light-mode visitor would get the shader in the SSR payload and watch it swap
 * to a photograph on hydration. The `.light` class is on <html> before first
 * paint, so letting CSS choose means the right backdrop is the first one
 * painted.
 *
 * Rendering both costs nothing at runtime. GhostFibers gates its render loop
 * on an IntersectionObserver, and a `display: none` element never intersects —
 * so in light mode the shader is not merely invisible, its rAF loop is stopped.
 * It has a ResizeObserver too, which is what makes it come back correctly
 * sized when someone toggles the theme.
 *
 * Because the shader now only ever appears on dark, its palette is the dark
 * palette, flat. It used to take a `lightMode` prop and a second set of
 * colours; those were the smear.
 */
export function HeroBackdrop() {
  /*
   * Phone tuning for the shader, and a legibility fix rather than a taste one.
   *
   * Fibre scale is in VIEWPORT units, so the same `scale` that draws fine
   * filaments across a 1440px hero draws three wide bands across a 360px one —
   * straight through the lead paragraph. Finer and quieter on small screens.
   *
   * The query asks "is this a phone" rather than "is this a desktop" on
   * purpose: useMediaQuery answers false on the server, so the desktop
   * treatment is the one that renders before hydration, exactly as min-width
   * behaves in CSS.
   */
  const phone = useMediaQuery("(max-width: 767px)");
  const photo = MEDIA.heroLight;

  return (
    <>
      {/* -- dark: the shader ------------------------------------------- */}
      <div className="absolute inset-0 light:hidden">
        <GhostFibers
          /*
           * Colours mirror the token layer:
           *   line     rule-strong   quiet structural hairlines
           *   glow     the accent    brand orange, the only saturated thing
           *   backdrop the canvas    so the shader meets the page seamlessly
           *
           * The upstream defaults were a dark navy and indigo. Handsome, and
           * somebody else's; driving it from Qeet's tokens is what makes this
           * the site's backdrop rather than a component someone installed.
           */
          lineColor="#3d3d3d"
          glowColor="#ff6900"
          backdrop="#0a0a0a"
          /*
           * Slower and calmer than the reference defaults. This sits under a
           * headline people are meant to read; a backdrop that draws the eye
           * competes with the one thing the hero exists to say.
           */
          speed={0.14}
          rotationSpeed={0.16}
          scale={phone ? 4.2 : 2.4}
          layers={4}
          glowIntensity={phone ? 0.6 : 1.1}
          brightness={phone ? 1.15 : 1.7}
          vignette={0.85}
          grain={0.045}
          /* Blue push off: it turns a warm glow muddy on this palette. */
          blueBoost={1}
          /* 1x. At DPR 3 this fills nine times the pixels for a backdrop
           * behind a scrim — the cost is invisible and the battery is not. */
          dpr={1}
          fps={48}
        />
        {/*
          Phone-only, and measured. At 360px the bands land under the lead
          paragraph — ink-muted, the lowest-contrast text in the hero — at
          roughly 3.2:1 against a 4.5:1 floor. 45% canvas takes it to about
          5.7:1. From md up there is no scrim, because none is needed and it
          would only mute the fibres it exists to show.
        */}
        <div aria-hidden="true" className="absolute inset-0 bg-canvas/45 md:hidden" />
      </div>

      {/* -- light: the building ---------------------------------------- */}
      <div className="absolute inset-0 hidden light:block">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          /* The LCP element on a light-theme first paint, so it is eager and
             full-viewport at every breakpoint. */
          priority
          sizes="100vw"
          /* 70 rather than the site's usual 75: this sits under a 75% scrim,
             where compression artefacts are unresolvable, and it is the
             largest single image on the site. */
          quality={70}
          className="object-cover"
        />
        {/*
          The scrim, at every width rather than only on phones. Its job here is
          not to fix one breakpoint but to guarantee the pairing at all of
          them — the same argument the media system makes for photographs
          generally: the floor has to hold whatever the image underneath
          decides to do, including being swapped for a different image. The
          composite is measured as --scrim-hero-light-solid in
          scripts/check-contrast.ts.
        */}
        <div aria-hidden="true" className="absolute inset-0 bg-(--scrim-hero-light)" />
      </div>
    </>
  );
}
