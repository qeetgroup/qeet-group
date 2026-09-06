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
  /**
   * Who made the photograph.
   *
   * Distinct from `credit`, and the distinction is the whole reason both
   * exist: `credit` is COPY — Figure renders it as a visible caption — while
   * `author` is PROVENANCE, recorded and never printed. The Unsplash Licence
   * does not require attribution, so putting a photographer's name under
   * every section image would be clutter rather than compliance; but shipping
   * stock with no record of where it came from is how a licence audit becomes
   * impossible two years later.
   */
  author?: string;
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
 * Unsplash, cropped at the CDN.
 *
 * The advantage over the picsum helper below is not quality, it is CONTROL:
 * the crop is a URL parameter, so a slot asks for the exact ratio it renders
 * at and gets it, instead of the registry bending its ratios to whatever the
 * source happens to be. `crop=entropy` picks the most detailed region, which
 * matters for the two slots that change ratio aggressively — the data centre
 * is a portrait shot going into a 16:9 frame, and the meeting is 3:2 going
 * into a 21:9 band.
 *
 * `licence: "licensed"` rather than `"placeholder"`, because that is now the
 * truth: these are real photographs under the Unsplash Licence, free for
 * commercial use with no attribution required. `demo: true` stays, because
 * they are still stand-ins for photography Qeet has not commissioned — the
 * licence is settled, the art direction is not.
 *
 * Only free-licence photographs are used. Unsplash also serves Unsplash+
 * results from `plus.unsplash.com` under `premium_photo-` slugs, which are
 * paid Getty-backed images; two of the first-pass picks were those and were
 * dropped. Anything not on `images.unsplash.com` does not belong here.
 */
function unsplash(
  base: string,
  width: number,
  height: number,
  alt: string,
  author: string,
  /*
   * How the CDN should choose the crop. `entropy` picks the most detailed
   * region and is right nearly always — but it is a heuristic about detail,
   * not about meaning, and it can be confidently wrong. On the data centre it
   * chose the ceiling: the light fixtures and cable trays are busier than the
   * server cabinets, so a photograph of infrastructure at scale cropped down
   * to a picture of a nice ceiling. `focalpoint` with an explicit fp-y is the
   * override for exactly that case.
   */
  crop: string = "entropy",
): Photo {
  return {
    kind: "photo",
    src: `${base}?w=${width}&h=${height}&fit=crop&crop=${crop}&q=75&fm=jpg`,
    width,
    height,
    alt,
    author,
    licence: "licensed",
    demo: true,
  };
}

/**
 * Slots are named for the ROLE the media plays, not for what it depicts —
 * `companyVision`, not `peopleAroundTable`. Renaming the slot when the subject
 * changes would defeat the point of the indirection.
 */
export const MEDIA = {
  /**
   * The homepage positioning band. Abstract and low-contrast on
   * purpose — it sits under a full-bleed typographic statement, so it has to
   * be texture rather than subject.
   *
   * Kimon Maritz / Unsplash — worm's-eye view photography of concrete building
   */
  positioning: unsplash("https://images.unsplash.com/photo-1483366774565-c783b9f70e2c", 1920, 1080, "", "Kimon Maritz"),

  /**
   * Qeet ID. Deliberately a person, and the only human face in the
   * upper half of the homepage: identity is about someone signing in, not
   * about a lock icon.
   *
   * Musharraf Khan / Unsplash — Professional man sitting, using a laptop
   */
  identity: unsplash("https://images.unsplash.com/photo-1782069327324-57353ef863fc", 1600, 2000, "", "Musharraf Khan"),

  /**
   * Qeet AI. An abstract grayscale exposure rather than anything
   * literal, and that took some looking — searching Unsplash for "AI" returns
   * almost nothing but glowing brains, neon "AI" lettering and cyborg heads,
   * which is exactly the stock-tech cliche the brief rules out. Movement and
   * light carry "computation" without claiming a product that is still in
   * development has a face.
   *
   * MARIOLA GROBELSKA / Unsplash — Abstract grayscale image with blurred light and dark
   */
  intelligence: unsplash("https://images.unsplash.com/photo-1749836851384-24dbcfa77f08", 1920, 1080, "", "MARIOLA GROBELSKA"),

  /**
   * How the group builds. Exact 16:9 at source, so this one is not
   * cropped at all.
   *
   * Roman Serdyuk / Unsplash — photo of gray metal structure during daytime
   */
  engineering: unsplash("https://images.unsplash.com/photo-1509024368907-57294758cfc5", 1920, 1080, "", "Roman Serdyuk"),

  /**
   * Architecture rather than padlocks. Mass and structure say
   * "engineered to hold" without the security-theatre iconography.
   *
   * Christophe Laurenceau / Unsplash — architectural photo of building
   */
  security: unsplash("https://images.unsplash.com/photo-1504625709867-b4e45e3bb9dd", 1920, 1080, "", "Christophe Laurenceau"),

  /**
   * Qeet Logs. A real data centre, chosen bright and near-white
   * over the colourful alternatives — the vivid cooling-fan shots were more
   * striking and would have put teal and violet on a page whose only
   * saturated colour is the brand orange.
   *
   * Tony Marinescu / Unsplash — Modern data center with rows of white server cabinets
   */
  visibility: unsplash(
    "https://images.unsplash.com/photo-1784652852605-6945598f2af3",
    1920,
    1080,
    "",
    "Tony Marinescu",
    /* Biased low, or the 16:9 crop of this portrait source lands on the
     * ceiling instead of the cabinet rows. */
    "focalpoint&fp-y=0.75",
  ),

  /**
   * The one place on the site where people should be visibly,
   * unambiguously present. A working meeting, not a posed team photo.
   *
   * Smartworks Coworking / Unsplash — people sitting at the table looking to another person standing in front of
   */
  companyVision: unsplash("https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65", 2400, 1030, "", "Smartworks Coworking"),

  /**
   * Candid collaboration, and the third attempt at this slot.
   *
   * The first search returned almost nothing but people handing each other
   * gift boxes, which is apparently what stock libraries think culture looks
   * like. The second pick was two colleagues on a hillside balcony — a good
   * photograph, but it filled a 4:5 frame with foliage and put more green on
   * the page than every other image combined, on a site whose palette is
   * greys plus one orange.
   *
   * Annie Spratt / Unsplash — men sitting in front of their laptop computer
   */
  companyCulture: unsplash("https://images.unsplash.com/photo-1521737711867-e3b97375f902", 1600, 2000, "", "Annie Spratt"),

  /**
   * Portrait crop for the careers rail. Someone working, which is
   * the honest promise of the page.
   *
   * Sopan Shewale / Unsplash — man using MacBook on table
   */
  careers: unsplash("https://images.unsplash.com/photo-1548057407-b022b3f5b6ab", 1200, 1500, "", "Sopan Shewale"),

  /**
   * Used when an insight declares no image of its own, so it
   * has to be neutral enough to sit under any headline without implying a
   * subject.
   *
   * Christian Perner / Unsplash — white concrete building wall
   */
  insightFallback: unsplash("https://images.unsplash.com/photo-1463130456064-77fda7f96d6b", 1920, 1080, "", "Christian Perner"),

  /**
   * The light theme's hero backdrop, and the only slot still served through
   * Lorem Picsum — it was chosen and signed off before the rest moved to
   * Unsplash, and re-sourcing an approved image to tidy the plumbing would be
   * changing a decision to satisfy a convention.
   *
   * Architecture straight up between two towers. Three things made it the
   * pick, and only one is taste:
   *
   *   - The centre of the frame is near-white sky and the hero's type is
   *     centred, so the composition puts its own quietest region exactly
   *     where the headline lands.
   *   - It is NEUTRAL grey. The runner-up had a pale blue sky, which would
   *     have introduced the only hue on a site whose palette is greys plus
   *     one orange.
   *   - The towers frame the edges and leave the middle alone, so it reads as
   *     a backdrop rather than a picture competing with the words.
   */
  heroLight: placeholder(1048, 2400, 1600, ""),
} as const satisfies Record<string, MediaAsset>;

export type MediaSlot = keyof typeof MEDIA;

/**
 * The hosts next.config.ts must allow through the image optimiser. Exported so
 * the config and the registry cannot drift — adding a source here without
 * allowing it there produces a runtime error on a page nobody may visit for
 * weeks.
 */
export const MEDIA_HOSTS = [
  "images.unsplash.com",
  /* Still serving the light hero only — see the heroLight slot. */
  "picsum.photos",
  "fastly.picsum.photos",
] as const;
