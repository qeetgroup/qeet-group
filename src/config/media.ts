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
 * The `.figure-qeet` grade in globals.css does a great deal of work here: with
 * every image stripped to luminance and pushed back through a single cool
 * tone, generic photography still reads as one coherent set. That is what
 * makes shipping placeholders viable rather than embarrassing.
 *
 * ---------------------------------------------------------------------------
 * On video
 * ---------------------------------------------------------------------------
 * `src: null` is a supported, deliberate state, not an unfinished one.
 *
 * No free video CDN permits hotlinking (Mixkit and Coverr both refuse it), so
 * rather than ship URLs that 403 in production, video slots declare their
 * poster and leave `src` null until a real file is vendored into
 * `public/media/`. VideoFigure renders the poster alone in that case — which
 * is the same path it takes under `prefers-reduced-motion` and under
 * save-data, so it is a path that must work regardless.
 *
 * The consequence worth stating plainly: the site is never broken by a missing
 * video, and adding one later is a one-line change here.
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

export type Video = {
  kind: "video";
  /** null until a real file is vendored. See the note above. */
  src: string | null;
  poster: Photo;
  /** Describes the footage for anyone who cannot see it play. */
  alt: string;
  credit?: string;
  licence: MediaLicence;
  demo?: boolean;
};

export type MediaAsset = Photo | Video;

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
    credit: "Placeholder imagery",
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
  /** Homepage hero. 21:9, the widest crop in the system. */
  homeHero: {
    kind: "video",
    src: null,
    poster: placeholder(1015, 2400, 1030, ""),
    alt: "Aerial footage of built infrastructure at dusk.",
    licence: "placeholder",
    demo: true,
  } satisfies Video,

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
