"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { MEDIA, type MediaSlot, type Video } from "@/config/media";
import { Figure, type FigureAspect, type FigureScrim } from "./Figure";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * VideoFigure — cinematic background footage, with the brakes built in
 * ============================================================================
 *
 * Autoplaying video is the single most common way a premium corporate site
 * becomes hostile: it burns metered data, it drains battery, and for a viewer
 * with a vestibular disorder, unstoppable background motion can be genuinely
 * disabling. So the video is opt-OUT for the browser, not opt-in for the user.
 *
 * Playback is suppressed entirely — poster only, no video element, no bytes —
 * when ANY of these hold:
 *
 *   • the viewer prefers reduced motion;
 *   • the connection reports save-data or a slow effective type;
 *   • the registry has no file yet (`src: null`).
 *
 * That last case is why this component treats "no video" as a first-class
 * state rather than an error. No free video CDN permits hotlinking, so slots
 * ship poster-only until a real file is vendored. The consequence is that the
 * degraded path is not a rarely-exercised fallback — it is what most people
 * see today, which is the best possible reason for it to be the well-built one.
 *
 * When video does play there is always a visible pause control. A GIF could
 * not offer one, which is the accessibility half of why animated loops here
 * are `<video>` rather than `.gif`; the other half is that a 3-second loop is
 * roughly 20x smaller as MP4.
 */

type ConnectionLike = { saveData?: boolean; effectiveType?: string };

function readLightweight(): boolean {
  const c = (navigator as Navigator & { connection?: ConnectionLike }).connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === "slow-2g" || c.effectiveType === "2g";
}

function subscribeToConnection(onChange: () => void): () => void {
  const c = (navigator as Navigator & {
    connection?: ConnectionLike & EventTarget;
  }).connection;
  c?.addEventListener?.("change", onChange);
  return () => c?.removeEventListener?.("change", onChange);
}

/**
 * The connection API is external browser state, so it is read through
 * useSyncExternalStore rather than copied into state by an effect.
 *
 * The server snapshot is `true` — assume the constrained case. That makes
 * poster-only the server-rendered output in every case, so the first paint
 * never contains a <video> we might have to tear down, and there is no
 * hydration mismatch to reconcile. The client then decides on its own terms,
 * and re-decides if the connection changes mid-session.
 */
function useLightweightMode(): boolean {
  return useSyncExternalStore(subscribeToConnection, readLightweight, () => true);
}

type VideoFigureProps = {
  slot: MediaSlot;
  aspect?: FigureAspect;
  scrim?: FigureScrim;
  priority?: boolean;
  sizes?: string;
  className?: string;
  children?: React.ReactNode;
};

export function VideoFigure({
  slot,
  aspect = "hero",
  scrim = "bottom",
  priority = false,
  sizes = "100vw",
  className,
  children,
}: VideoFigureProps) {
  const asset = MEDIA[slot] as Video;
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const lightweight = useLightweightMode();
  const [playing, setPlaying] = useState(true);

  // Derived, not stored. Every input is already reactive, so holding this in
  // state would only create a window where the two disagree.
  const enabled = Boolean(asset.src) && !reduce && !lightweight;

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/*
        The poster is a real Figure, so it inherits the grade, the scrim and the
        aspect ratio. The video is layered over it and shares the frame, which
        means the transition when playback begins is a crossfade between two
        identically-treated surfaces rather than a visible swap.
      */}
      <Figure
        slot={slot}
        photo={asset.poster}
        aspect={aspect}
        scrim={scrim}
        priority={priority}
        sizes={sizes}
      >
        {enabled && asset.src && (
          <video
            ref={videoRef}
            src={asset.src}
            poster={asset.poster.src}
            autoPlay
            muted
            loop
            playsInline
            // Decorative footage behind type. The `alt` in the registry
            // describes it for anyone reviewing the asset, but announcing a
            // looping background to a screen reader is noise.
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {children}
      </Figure>

      {enabled && asset.src && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          className="absolute bottom-4 right-4 z-raised inline-flex h-9 items-center gap-2 rounded-full border border-glass-border bg-glass px-3.5 font-mono text-label uppercase text-ink backdrop-blur-md transition-colors duration-fast hover:bg-glass-strong focus-ring"
        >
          <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
          {playing ? "Pause" : "Play"}
          <span className="sr-only"> background video</span>
        </button>
      )}
    </div>
  );
}
