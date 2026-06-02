import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Brand favicon, rendered to PNG. Google's search-favicon pipeline is
 * unreliable with SVGs that carry an embedded <style>/prefers-color-scheme
 * (it falls back to whatever clean raster it can find — previously the plain
 * black apple-icon). So we hand it a flat raster of the brand mark. 192 is a
 * multiple of 48, which Google prefers, and downscales cleanly to 16/32.
 */
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default async function Icon() {
  // qeet-mark.svg is theme-adaptive (a prefers-color-scheme <style> swaps the
  // bowl black<->white) for browser tabs. A raster can't adapt, and Google
  // renders favicons on white, so flatten to a fixed dark bowl for the PNG.
  const raw = await readFile(join(process.cwd(), "public", "qeet-mark.svg"), "utf-8");
  const svg = raw
    .replace(/<style>[\s\S]*?<\/style>/i, "")
    .replace(/class="bowl"/i, 'fill="#0A0A0A"');
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUri} width={192} height={192} alt="Qeet" />
      </div>
    ),
    { ...size },
  );
}
