import { S01Title } from "./S01Title";
import { S02Why } from "./S02Why";
import { S03Method } from "./S03Method";
import { S04QeetId } from "./S04QeetId";
import { S05Question } from "./S05Question";
import { S06Explore } from "./S06Explore";
import { S07Envision } from "./S07Envision";
import { S08Transform } from "./S08Transform";
import { S09Loop } from "./S09Loop";
import { S10Portfolio } from "./S10Portfolio";
import { S11Lifecycle } from "./S11Lifecycle";
import { S12Compounding } from "./S12Compounding";
import { S13Difference } from "./S13Difference";
import { S14LongTerm } from "./S14LongTerm";
import { S15Closing } from "./S15Closing";
import { SLIDE_IDS, SLIDE_LABELS, SLIDE_NOTES, type SlideId } from "./notes";
import type { Slide, SlideProps } from "./types";

/**
 * The deck, assembled.
 *
 * Order lives in `notes.ts` as `SLIDE_IDS` rather than in the array below, so
 * the running order, the labels and the spoken material are one list that
 * cannot fall out of step — and so the tests can assert the order without
 * importing a single React component.
 *
 * The narrative sequence is deliberate: the audience meets a real product at
 * position four, before the four letters are unpacked. A deck that spends
 * eight slides on method before showing anything that exists is asking for
 * credit it has not yet earned.
 */
const COMPONENTS: Record<SlideId, (props: SlideProps) => React.ReactNode> = {
  title: S01Title,
  why: S02Why,
  method: S03Method,
  "qeet-id": S04QeetId,
  question: S05Question,
  explore: S06Explore,
  envision: S07Envision,
  transform: S08Transform,
  loop: S09Loop,
  portfolio: S10Portfolio,
  lifecycle: S11Lifecycle,
  compounding: S12Compounding,
  difference: S13Difference,
  "long-term": S14LongTerm,
  closing: S15Closing,
};

export const SLIDES: Slide[] = SLIDE_IDS.map((id) => ({
  id,
  label: SLIDE_LABELS[id],
  Component: COMPONENTS[id],
  notes: SLIDE_NOTES[id],
}));
