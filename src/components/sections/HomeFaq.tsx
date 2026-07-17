import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";

/**
 * A few high-signal questions surfaced on the homepage, using native
 * <details> (accessible, no JS). Full set lives on /faq.
 */
const faqs = [
  {
    q: "What is Qeet Group?",
    a: "A multi-company holding that starts and operates products which share one philosophy, a design system, and a quality bar — not a roadmap.",
  },
  {
    q: "Do you take outside capital?",
    a: "No. Qeet Group isn't a fund and isn't raising LP capital — we back our own companies and build for the long term.",
  },
  {
    q: "Are you accepting pitches from founders?",
    a: "Not in an open way. We start and operate our own companies. If you'd want to build one inside the group, write to partnerships@qeet.in.",
  },
  {
    q: "What do the products share?",
    a: "One identity graph (Qeet ID), one design system (Qeetrix), and one quality bar — built to feel like one family.",
  },
  {
    q: "Are you hiring?",
    a: "Not actively, but we're always interested in senior operators who think in decades. See the Careers page.",
  },
];

export function HomeFaq() {
  return (
    <Section className="border-t border-rule">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <FadeRise className="md:col-span-4">
          <SectionHeader index="05" eyebrow="FAQ" title="Questions, answered." />
          <div className="mt-6">
            <Link href="/faq" variant="arrow" className="text-body text-ink">
              All questions
            </Link>
          </div>
        </FadeRise>

        <FadeRise delay={0.1} className="md:col-span-8 lg:col-span-7">
          <dl>
            {faqs.map((item, i) => (
              <details
                key={item.q}
                className={`group border-rule ${i !== 0 ? "border-t" : ""}`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <dt className="font-serif font-normal text-ink text-[1.25rem] leading-[1.3] md:text-[1.375rem]">
                    {item.q}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-rule text-ink-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="max-w-[40rem] pb-6 text-body text-ink-muted">{item.a}</dd>
              </details>
            ))}
          </dl>
        </FadeRise>
      </div>
    </Section>
  );
}
