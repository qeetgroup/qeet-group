"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { chromeSettle } from "@/lib/motion";
import { deckSlides } from "./slides";
import type { DeckVariant } from "./slides/notes";
import { StillProvider, usePrefersStill } from "./slides/primitives";
import type { Slide } from "./slides/types";
import { useDeck } from "./useDeck";

/**
 * ============================================================================
 * The deck
 * ============================================================================
 *
 * Renders the slide list twice, on purpose.
 *
 *   .deck-screen  one slide at a time, animated, keyboard-driven.
 *   .deck-print   every slide, static, one per page, each followed by its
 *                 notes and cautions.
 *
 * The second is not a nicety. A live presentation has to survive a room where
 * the laptop is not ours, the browser is unknown and the network is a
 * rumour — so the PDF is a first-class output, and the way to guarantee it
 * matches the deck is to render it from the same components rather than to
 * maintain an export. `deck.css` decides which tree is visible; neither is a
 * copy of the other.
 *
 * The print tree renders inside `StillProvider still`, so every primitive in
 * it resolves to its final state as plain markup: no motion components, and
 * nothing for the print rasteriser to catch mid-transition.
 */

type DeckProps = {
  /** Which running order to present. See `slides/index.ts` for the variants. */
  variant?: DeckVariant;
};

const KEYS: Array<[string, string]> = [
  ["→ · space · page down", "Next slide"],
  ["← · page up", "Previous slide"],
  ["home · end", "First · last slide"],
  ["1 – 9", "Jump to slide"],
  ["N", "Speaker notes"],
  ["G", "Grid overlay"],
  ["?", "This list"],
];

export function Deck({ variant = "master" }: DeckProps) {
  const slides = deckSlides(variant);
  const deck = useDeck({ count: slides.length });
  const reduce = usePrefersStill();
  const slide = slides[deck.index];

  /*
   * The deck is a fixed surface over the site chrome, so the document behind
   * it must not scroll: a stray trackpad gesture mid-sentence that reveals the
   * footer underneath is the kind of thing nobody forgets.
   */
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Never swallow a browser shortcut. Cmd-P in particular has to reach the
      // print dialog, because that is the PDF path.
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
        case "Spacebar":
          event.preventDefault();
          deck.next();
          return;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          deck.prev();
          return;
        case "Home":
          event.preventDefault();
          deck.first();
          return;
        case "End":
          event.preventDefault();
          deck.last();
          return;
        case "Escape":
          if (deck.helpOpen) deck.toggleHelp();
          return;
        default:
          break;
      }

      const key = event.key.toLowerCase();
      if (key === "n") {
        deck.toggleNotes();
        return;
      }
      if (key === "g") {
        deck.toggleGrid();
        return;
      }
      if (key === "?" || (key === "/" && event.shiftKey)) {
        deck.toggleHelp();
        return;
      }
      if (/^[1-9]$/.test(key)) {
        deck.goTo(Number.parseInt(key, 10) - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deck]);

  const slideProps = { index: deck.index + 1 };

  /*
   * Three grid rows — stage, notes, controls — sized in deck.css. The rows
   * are placed explicitly, because the notes row is empty while notes are
   * closed and the controls must not slide up into it.
   */
  return (
    <div className="deck-shell fixed inset-0 z-modal bg-canvas" data-notes={deck.notesOpen ? "open" : "closed"}>
      {/* ---------------------------------------------------------------- screen */}
      <div className="deck-screen row-start-1">
        <div className="deck-stage">
          {deck.gridOpen ? <GridOverlay /> : null}

          {reduce ? (
            <StillProvider still={false}>
              <slide.Component {...slideProps} />
            </StillProvider>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                variants={chromeSettle}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <slide.Component {...slideProps} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {deck.notesOpen ? (
        <div className="deck-notes-panel row-start-2 border-t border-rule px-6 pt-5">
          <div className="mx-auto w-full max-w-4xl pb-4">
            <SpeakerNotes slide={slide} heading={`Speaker notes — ${slide.label}`} size="text-body-s" />
          </div>
        </div>
      ) : null}

      <Hud
        index={deck.index}
        count={deck.count}
        label={slide.label}
        atStart={deck.atStart}
        atEnd={deck.atEnd}
        onPrev={deck.prev}
        onNext={deck.next}
        onHelp={deck.toggleHelp}
      />

      {deck.helpOpen ? <KeyMap onClose={deck.toggleHelp} /> : null}

      {/*
       * The one thing a screen reader needs that the visual deck does not
       * provide: which slide is now current. Polite, so it waits for a gap
       * rather than interrupting the presenter's own speech synthesiser.
       */}
      <p aria-live="polite" className="sr-only">
        Slide {deck.index + 1} of {deck.count}: {slide.label}
      </p>

      {/* ----------------------------------------------------------------- print */}
      <div className="deck-print">
        <StillProvider still>
          {slides.map((printSlide, i) => (
            <div key={printSlide.id}>
              <div className="deck-print-page">
                <div className="deck-stage bg-canvas">
                  <printSlide.Component index={i + 1} />
                </div>
              </div>
              <div className="deck-print-notes bg-canvas">
                <SpeakerNotes
                  slide={printSlide}
                  heading={`${String(i + 1).padStart(2, "0")} — ${printSlide.label} · speaker notes`}
                  size="text-body"
                />
              </div>
            </div>
          ))}
        </StillProvider>
      </div>
    </div>
  );
}

/**
 * The spoken material, then the caution. The caution is set apart — a rule,
 * and the accent on its label — because it is the one paragraph the presenter
 * must not skim: it names the claim that may not be made on this slide.
 */
function SpeakerNotes({
  slide,
  heading,
  size,
}: {
  slide: Slide;
  heading: string;
  size: "text-body" | "text-body-s";
}) {
  return (
    <>
      <p className="font-mono text-label uppercase text-ink-subtle">{heading}</p>
      <div className="mt-4 space-y-3">
        {slide.notes.split("\n\n").map((paragraph, i) => (
          <p key={i} className={`font-sans ${size} text-ink-muted`}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-5 border-t border-rule pt-4">
        <p className="font-mono text-label uppercase text-accent-text">Careful</p>
        <p className={`mt-2 font-sans ${size} text-ink`}>{slide.caution}</p>
      </div>
    </>
  );
}

/**
 * Slide position, progress and the two controls, as fixed-size site chrome —
 * in a row of their own beneath the stage, so they can never sit on top of a
 * slide.
 */
function Hud({
  index,
  count,
  label,
  atStart,
  atEnd,
  onPrev,
  onNext,
  onHelp,
}: {
  index: number;
  count: number;
  label: string;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  onHelp: () => void;
}) {
  return (
    <div className="deck-hud row-start-3 flex items-center justify-between gap-6 px-5">
      <p className="font-mono text-caption text-ink-subtle">
        Press <span className="text-ink-muted">N</span> for notes ·{" "}
        <button
          type="button"
          onClick={onHelp}
          className="rounded-sm text-ink-muted underline decoration-current/30 underline-offset-4 focus-ring"
        >
          keys
        </button>
      </p>

      <div className="flex items-center gap-4">
        <span className="sr-only">{label}</span>
        <span className="tabular-figures font-mono text-caption text-ink-subtle">
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
          {" / "}
          {count}
        </span>
        {/* A 96px rule rather than a percentage bar: it reports where we are
            without inviting anyone to read a completion figure off it. */}
        <span aria-hidden="true" className="block h-px w-24 bg-rule-strong">
          <span
            className="block h-px bg-accent transition-[width] duration-base"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
        </span>
        <span className="flex gap-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={atStart}
            aria-label="Previous slide"
            className="rounded-sm px-2 py-1 font-mono text-caption text-ink-subtle transition-colors duration-fast hover:text-ink disabled:opacity-30 focus-ring"
          >
            ←
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={atEnd}
            aria-label="Next slide"
            className="rounded-sm px-2 py-1 font-mono text-caption text-ink-subtle transition-colors duration-fast hover:text-ink disabled:opacity-30 focus-ring"
          >
            →
          </button>
        </span>
      </div>
    </div>
  );
}

function KeyMap({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-canvas/85 p-6">
      <div className="glass-panel w-full max-w-md rounded-lg p-6">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-label uppercase text-ink-subtle">Keys</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm font-mono text-caption text-ink-subtle underline decoration-current/30 underline-offset-4 focus-ring"
          >
            close
          </button>
        </div>
        <dl className="mt-4">
          {KEYS.map(([key, action]) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-6 border-t border-rule py-2.5 last:border-b"
            >
              <dt className="font-mono text-caption text-ink">{key}</dt>
              <dd className="font-sans text-body-s text-ink-muted">{action}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/**
 * A review aid, not part of the deck: the safe area every slide composes
 * inside, and the twelve-column grid within it — the same two boxes the
 * layout audit measures against — so a misaligned element can be seen rather
 * than argued about. Bound to G and never on by default.
 */
function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 px-(--deck-safe-x) py-(--deck-safe-y)"
    >
      <div className="deck-grid h-full outline outline-accent/40">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-full bg-accent/10" />
        ))}
      </div>
    </div>
  );
}
