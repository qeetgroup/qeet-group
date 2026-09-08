"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

/**
 * ============================================================================
 * Deck state
 * ============================================================================
 *
 * All navigation state for the presentation lives here, in one hook, for one
 * reason: a presenter view is eventually going to want the same state on a
 * second display — current slide, next slide, notes, elapsed time — and the
 * only way that stays cheap is if none of it is entangled with the rendering.
 *
 * THE PRESENTER-MODE EXTENSION POINT. A future presenter window mounts this
 * same hook behind a `?presenter` param. Because the deck's position is held
 * in the URL rather than in component state, the two windows already share a
 * synchronisation primitive — and `current`, `upcoming` and `elapsedMs` are
 * the three values such a view needs. That work is not done here and nothing
 * below is bent toward it; this comment is the whole of the commitment.
 *
 * ---------------------------------------------------------------------------
 * Why the hash is the source of truth
 * ---------------------------------------------------------------------------
 * The obvious implementation holds the slide index in `useState` and syncs the
 * hash to it in an effect. That is a setState inside an effect, which the
 * React Compiler's lint rules reject and which is genuinely the wrong shape:
 * the position is external state that outlives a render pass and that a
 * presenter may edit by hand in the address bar.
 *
 * So the hash IS the position, read through `useSyncExternalStore`. Server
 * snapshot is empty, which resolves to slide one, and the client corrects
 * after hydration without a mismatch. `#/4` is slide four — reloadable,
 * linkable, and openable straight onto the slide someone just asked about.
 */

export type DeckOptions = {
  /** Total slide count. Navigation clamps to it. */
  count: number;
};

export type Deck = {
  index: number;
  /** Zero-based index of the slide after the current one, or null at the end. */
  upcoming: number | null;
  count: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  first: () => void;
  last: () => void;
  atStart: boolean;
  atEnd: boolean;
  /** Milliseconds since the first advance. Null until the deck is under way. */
  elapsedMs: number | null;
  notesOpen: boolean;
  toggleNotes: () => void;
  gridOpen: boolean;
  toggleGrid: () => void;
  helpOpen: boolean;
  toggleHelp: () => void;
};

/*
 * `history.replaceState` deliberately does not fire `hashchange` — fifteen
 * slides walked twice should not mean thirty entries in the back button, so a
 * plain `location.hash =` assignment is out. The custom event is what closes
 * that loop: it is the notification `replaceState` declines to send.
 */
const DECK_NAVIGATE = "deck:navigate";

function subscribeToHash(onChange: () => void): () => void {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(DECK_NAVIGATE, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(DECK_NAVIGATE, onChange);
  };
}

/** The raw hash, so snapshot equality is a string comparison. */
function hashSnapshot(): string {
  return window.location.hash;
}

function serverHashSnapshot(): string {
  return "";
}

/** Forgiving on purpose: anything unrecognised is slide one, not an error. */
function parseHash(hash: string, count: number): number {
  const match = /^#\/(\d+)$/.exec(hash);
  if (!match) return 0;
  const oneBased = Number.parseInt(match[1], 10);
  if (!Number.isFinite(oneBased)) return 0;
  return Math.min(Math.max(oneBased - 1, 0), count - 1);
}

export function useDeck({ count }: DeckOptions): Deck {
  const hash = useSyncExternalStore(subscribeToHash, hashSnapshot, serverHashSnapshot);
  const index = parseHash(hash, count);

  const [notesOpen, setNotesOpen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  /*
   * The clock starts on the first MOVE, not on mount: a deck left open on the
   * title slide while the room settles has not started. Both values are set
   * from an event handler, never from an effect.
   */
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const goTo = useCallback(
    (target: number) => {
      const next = Math.min(Math.max(target, 0), count - 1);
      if (next !== index) {
        const stamp = Date.now();
        setStartedAt((existing) => existing ?? stamp);
        setNow((existing) => existing ?? stamp);
      }
      window.history.replaceState(null, "", `#/${next + 1}`);
      window.dispatchEvent(new Event(DECK_NAVIGATE));
    },
    [count, index],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const first = useCallback(() => goTo(0), [goTo]);
  const last = useCallback(() => goTo(count - 1), [goTo, count]);

  const toggleNotes = useCallback(() => setNotesOpen((v) => !v), []);
  const toggleGrid = useCallback(() => setGridOpen((v) => !v), []);
  const toggleHelp = useCallback(() => setHelpOpen((v) => !v), []);

  /*
   * A one-second tick, and only once the deck is under way. An interval
   * running from mount would keep a laptop awake and re-render the deck sixty
   * times a minute for a clock nobody has asked for yet. The state is set in
   * the timer callback, which is the only place an effect should be setting
   * it.
   */
  useEffect(() => {
    if (startedAt === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  const elapsedMs = useMemo(() => {
    if (startedAt === null || now === null) return null;
    return Math.max(0, now - startedAt);
  }, [startedAt, now]);

  return {
    index,
    upcoming: index < count - 1 ? index + 1 : null,
    count,
    next,
    prev,
    goTo,
    first,
    last,
    atStart: index === 0,
    atEnd: index === count - 1,
    elapsedMs,
    notesOpen,
    toggleNotes,
    gridOpen,
    toggleGrid,
    helpOpen,
    toggleHelp,
  };
}
