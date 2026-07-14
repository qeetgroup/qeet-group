import { buildSearchIndex } from "@/lib/search/build-index";
import { CommandPalette } from "./CommandPalette";

/**
 * Server wrapper that resolves the search index at build/request time and
 * hands it to the client palette. Used in the root layout so ⌘K works on
 * every route without each page rebuilding the index.
 */
export async function CommandPaletteShell() {
  const index = await buildSearchIndex();
  return <CommandPalette index={index} />;
}
