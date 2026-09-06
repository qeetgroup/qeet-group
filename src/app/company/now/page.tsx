import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { buildPageMetadata } from "@/lib/seo/meta";
import { formatDate } from "@/lib/format";

/*
 * The /now page follows the nownownow.com convention: a short, dated
 * snapshot of what we're focused on this quarter. Edit the constants
 * below — keep paragraphs short, keep the lastUpdated current. If you
 * haven't updated it in 3 months, the page is lying.
 */

const lastUpdated = "2026-05-28"; // ISO. Bump every time you edit below.
const place = "Remote-first";

const focusAreas: Array<{ title: string; body: string }> = [
  {
    title: "Growing Qeet ID past its first wave of teams.",
    body: "Qeet ID is in production and is being adopted by engineering teams across startups and enterprises. The focus this quarter is depth over breadth — better integrations, better defaults, better docs — and making sure the experience holds as adoption scales.",
  },
  {
    title: "Framing what comes next in the portfolio.",
    body: "Several products are specified and not yet started. The work right now is deciding which of them earns being built next, and spending longer on that question than on the answer. There is no public timeline.",
  },
  {
    title: "Talking to people, not running a process.",
    body: "We are in conversations with people who could lead work inside the portfolio. There is no open process and no roles list. If that sounds like you, write to careers@qeet.in.",
  },
];

/*
 * What we are NOT doing, stated as plainly as what we are.
 *
 * This list is the more useful half of the page. Anyone can publish what they
 * are working on; publishing what you have decided against is what makes the
 * first list credible.
 */
const notRightNow: string[] = [
  "Claiming security certifications we do not hold.",
  "Starting a new product before the case for it is made.",
  "Running an open hiring process.",
  "Public events or conference appearances.",
];

export const metadata = buildPageMetadata({
  title: "Now",
  description: `What Qeet Group is focused on right now (as of ${lastUpdated}).`,
  path: "/company/now",
});

export default function NowPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <PageAmbient />
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">Now</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-display text-ink text-display-xl">
              What we&rsquo;re working on.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              A short, dated snapshot of where the Group&rsquo;s attention is
              going. Updated when it changes.
            </Lede>
          </FadeRise>
          <FadeRise delay={0.5} className="mt-10 md:mt-12">
            <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle"
              />
              <time dateTime={lastUpdated}>Updated {formatDate(lastUpdated)}</time>
              <span aria-hidden="true"> · </span>
              <span>{place}</span>
            </p>
          </FadeRise>
        </Container>
      </section>

      {/* Focus */}
      <Section className="border-t border-rule">
        <FadeRise>
          <Eyebrow className="mb-12 md:mb-16">In focus</Eyebrow>
        </FadeRise>
        <ol>
          {focusAreas.map((item, i) => (
            <FadeRise key={item.title}>
              <li
                className={
                  i === 0
                    ? "grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-14"
                    : "grid grid-cols-1 gap-4 border-t border-rule py-10 md:grid-cols-12 md:gap-8 md:py-14"
                }
              >
                <div className="md:col-span-3 lg:col-span-2">
                  <span className="block font-display leading-none text-ink-subtle text-display-m">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
                  <h2 className="mb-3 font-sans font-medium text-heading-m text-ink">
                    {item.title}
                  </h2>
                  <p className="max-w-note text-body text-ink-muted">{item.body}</p>
                </div>
              </li>
            </FadeRise>
          ))}
        </ol>
      </Section>

      {/* What we're not doing */}
      {notRightNow.length > 0 && (
        <Section className="border-t border-rule">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <FadeRise className="md:col-span-4">
              <Eyebrow>Not right now</Eyebrow>
            </FadeRise>
            <FadeRise className="md:col-span-8 lg:col-span-7">
              <p className="text-body-l text-ink">
                Things we are deliberately not doing this quarter.
              </p>
              <ul className="mt-8 space-y-3">
                {notRightNow.map((line) => (
                  <li
                    key={line}
                    className="text-body text-ink-muted before:mr-3 before:text-ink-subtle before:content-['—']"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </FadeRise>
          </div>
        </Section>
      )}

      {/* Pointer to insights / contact */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Stay close</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              When focus shifts, it shows up first in the{" "}
              <Link href="/insights" className="text-ink">
                insights
              </Link>{" "}
              and on this page. For specific conversations,{" "}
              <Link href="/contact" className="text-ink">
                write to us
              </Link>
              .
            </p>
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
