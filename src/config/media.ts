/**
 * ============================================================================
 * The media registry
 * ============================================================================
 *
 * Every photograph, video and loop on the site is declared here and referenced
 * by SLOT NAME, never by URL at a call site. Three reasons, in order of how
 * much trouble each one saves:
 *
 *   1. Swapping stock for commissioned photography becomes a data edit. If
 *      sections held their own URLs, re-shooting the site would mean editing
 *      every section.
 *   2. Licence and credit travel WITH the asset, so an image cannot end up on
 *      the page without its attribution.
 *   3. Alt text is written once, next to the reason the image is there, rather
 *      than improvised at the call site — which is where alt text goes to die.
 *
 * ---------------------------------------------------------------------------
 * On the current assets
 * ---------------------------------------------------------------------------
 * The photography below is PLACEHOLDER and every entry is marked `demo: true`,
 * because it is generic stock standing in for imagery Qeet has not shot. It is
 * served through Lorem Picsum, which returns real photographs over stable IDs
 * — chosen over hotlinking a stock library directly because it makes no
 * licensing claim we would have to honour, and because it is unmistakably a
 * placeholder rather than something that could quietly ship as final art.
 *
 * Photography renders at its own colour. An earlier revision graded every
 * image to a cool duotone so that mismatched stock read as one set; that was
 * removed deliberately — it made the same photograph look like two different
 * photographs across the theme toggle, and it would have had to come out the
 * day real commissioned work arrived anyway. What holds the set together now
 * is the closed crop vocabulary and the scrim system, not a filter.
 *
 * ---------------------------------------------------------------------------
 * No video
 * ---------------------------------------------------------------------------
 * The hero used a vendored MP4 loop and no longer does — it is a generated
 * WebGL backdrop (components/media/GhostFibers). The shader resolves at any
 * size where the 720p file read as blurry on a desktop hero, costs ~15KB
 * against 6.5MB, and is drawn from the brand tokens rather than tinted toward
 * them. This registry is photography only.
 *
 * THE POSTER IS THE VIDEO'S OWN FRAME, not a separate stock photo. That is the
 * detail that makes poster-first work: the still and the footage are the same
 * image, so playback begins with no visible swap, and everyone who never gets
 * the video — reduced motion, save-data, no JS — sees exactly what the video
 * would have opened on.
 */

export type MediaLicence = "placeholder" | "cc-by" | "cc-by-sa" | "owned" | "licensed";

export type Photo = {
  kind: "photo";
  src: string;
  /** Intrinsic dimensions — required by next/image and by layout stability. */
  width: number;
  height: number;
  /**
   * Empty string is a valid, meaningful value: it marks the image as
   * decorative, and a screen reader will skip it. Used where the surrounding
   * copy already carries everything the image conveys, which for atmospheric
   * section art is most of the time. Alt text that narrates a decorative photo
   * is noise, not access.
   */
  alt: string;
  credit?: string;
  licence: MediaLicence;
  demo?: boolean;
};

export type MediaAsset = Photo;

/**
 * Placeholder photograph helper. Centralised so the day these are replaced,
 * the thing to delete is one function and every call site fails loudly rather
 * than silently keeping a stock image.
 */
function placeholder(id: number, width: number, height: number, alt: string): Photo {
  return {
    kind: "photo",
    src: `https://picsum.photos/id/${id}/${width}/${height}`,
    width,
    height,
    alt,
    /*
     * No `credit`. Figure renders credit as a visible caption, so setting one
     * here printed "Placeholder imagery" under every image on the site —
     * scaffolding language leaking onto a corporate page.
     *
     * `licence: "placeholder"` still records what these are, which is the part
     * that has to survive: it is how the eventual swap to commissioned or
     * licensed photography can be audited. The distinction is deliberate —
     * licence is a FACT about the asset, credit is COPY on the page, and only
     * the second one belongs to the reader.
     */
    licence: "placeholder",
    demo: true,
  };
}

/**
 * Slots are named for the ROLE the media plays, not for what it depicts —
 * `companyVision`, not `peopleAroundTable`. Renaming the slot when the subject
 * changes would defeat the point of the indirection.
 */
export const MEDIA = {
  /** The positioning statement band — abstract, architectural, low contrast. */
  positioning: placeholder(1048, 1920, 1080, ""),

  /** Identity section — a person, deliberately human against the diagrams. */
  identity: placeholder(342, 1600, 2000, ""),

  /** Intelligence / Qeet AI — abstract computational texture. */
  intelligence: placeholder(1071, 1920, 1080, ""),

  /** Engineering and security — architectural structure, hard edges. */
  engineering: placeholder(180, 1920, 1080, ""),
  security: placeholder(160, 1920, 1080, ""),

  /** Observability — infrastructure at scale. */
  visibility: placeholder(201, 1920, 1080, ""),

  /** Company and vision — the one place people should be visibly present. */
  companyVision: placeholder(1067, 2400, 1030, ""),
  companyCulture: placeholder(366, 1600, 2000, ""),

  /** Careers — portrait crop for the rail. */
  careers: placeholder(64, 1200, 1500, ""),

  /** Editorial fallback, used when an insight declares no image of its own. */
  insightFallback: placeholder(1039, 1920, 1080, ""),
} as const satisfies Record<string, MediaAsset>;

export type MediaSlot = keyof typeof MEDIA;

/**
 * The hosts next.config.ts must allow through the image optimiser. Exported so
 * the config and the registry cannot drift — adding a source here without
 * allowing it there produces a runtime error on a page nobody may visit for
 * weeks.
 */
export const MEDIA_HOSTS = ["picsum.photos", "fastly.picsum.photos"] as const;
