"use client";

import { useSyncExternalStore } from "react";

/** The year cannot change mid-session, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

/**
 * The whole site is statically rendered, so `new Date().getFullYear()` in a
 * server component freezes at build time — a copyright notice that silently
 * goes stale on 1 January.
 *
 * This renders the build-time year on the server (so there is no empty first
 * paint and no layout shift) and the visitor's actual year on the client.
 * useSyncExternalStore rather than an effect: reading the clock is reading an
 * external system, and setState-in-effect is a lint error here.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );

  return <>{year}</>;
}
