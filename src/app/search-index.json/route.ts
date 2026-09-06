import { buildSearchIndex } from "@/lib/search/build-index";

/*
 * The search index carries the full body text of every product, post and memo
 * (~60 KB). Rendering it through a server component in the root layout put all
 * of it into every page's RSC payload — including pages with no search UI on
 * screen — and shipped it twice on /search. Serving it as a static JSON file
 * instead means it is fetched once per document, on demand, and is cacheable.
 */
export const dynamic = "force-static";

export async function GET() {
  const index = await buildSearchIndex();
  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
