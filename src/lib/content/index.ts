/**
 * Content domain barrel. Keeps the established `@/lib/content` import path
 * stable while the implementation lives in focused modules:
 *   • types.ts   — frontmatter + loaded-document shapes
 *   • loaders.ts — filesystem/MDX loading, sorting, derived summaries
 */
export * from "./types";
export * from "./loaders";
