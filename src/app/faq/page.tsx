import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { FadeRise } from "@/components/motion/FadeRise";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Qeet Group — what we back, how we work, whether we take outside capital, and how to reach the right inbox.",
  alternates: { canonical: "/faq" },
};

type FaqGroup = {
  heading: string;
  items: Array<{ question: string; answer: string }>;
};

const groups: FaqGroup[] = [
  {
    heading: "About the Group",
    items: [
      {
        question: "What is Qeet Group?",
        answer:
          "A multi-company holding built to start, support, and grow companies that take long-term bets on questions worth answering. Each subsidiary is operated independently. They share a philosophy, a quality standard, and a refusal to ship work the team cannot defend — they do not share a roadmap, a thesis, or an org chart.",
      },
      {
        question: "How is the Group structured?",
        answer:
          "As a holding company with operating subsidiaries. Each one is its own company with its own team, its own product, and its own runway. The Group provides capital, a philosophy, a network, and a quality bar — and then gets out of the way.",
      },
      {
        question: "Where is Qeet Group based?",
        answer:
          "Remote-first. The Group's small operating team works distributed; individual companies choose what makes sense for them.",
      },
    ],
  },
  {
    heading: "Capital and companies",
    items: [
      {
        question: "Are you accepting pitches or applications from founders?",
        answer:
          "Not in an open, unsolicited way. The Group starts and operates its own companies rather than running a fund. If you have a company you'd want to build inside the Group, the right path is to write to partnerships@qeet.in and tell us what you'd build and why now.",
      },
      {
        question: "Do you take outside LP capital?",
        answer:
          "No. Qeet Group is not currently raising LP capital and is not structured as a fund. If this changes, it will be announced in the newsroom.",
      },
      {
        question: "What stage do you back?",
        answer:
          "We start companies rather than fund them. The Group incubates and operates subsidiaries from inception. We do not lead seed or Series A rounds in external companies.",
      },
      {
        question: "What sectors are you focused on?",
        answer:
          "Sector is downstream of question. We back companies that begin from genuinely ambitious questions — across domains. The current focus is identity and access (Qeet ID); future companies will be announced as they take shape.",
      },
      {
        question: "Do subsidiaries ever fail or get sold?",
        answer:
          "They might. The Group is structured to give companies the patience to chase the right answer over years — but patience is not a guarantee. If a company cannot reach the quality bar, we close it deliberately and write about why. If a sale is the right outcome for the people and the work, we'd consider it. Neither is the default.",
      },
    ],
  },
  {
    heading: "Qeet ID",
    items: [
      {
        question: "What is Qeet ID?",
        answer:
          "Qeet ID is the first company inside the Group — a developer-first authentication and authorization platform. It puts sign-in, multi-factor, multi-tenant access control, machine-to-machine auth, signed webhooks, and a hash-chained audit log on a single identity graph. The product, documentation, and pricing live at id.qeet.in.",
      },
      {
        question: "What can it do today, and what's coming?",
        answer:
          "Available now: email/password with stateful sessions and refresh-token rotation, passwordless magic links, email and phone one-time codes, TOTP multi-factor with recovery codes, multi-tenant RBAC with a permission-check API, API keys and OAuth client-credentials for machine-to-machine, OpenID Connect discovery/JWKS/userinfo, HMAC-signed webhooks with retries and a dead-letter queue, and a hash-chained audit log. On the roadmap: passkeys, social sign-in, SAML 2.0, SCIM 2.0, OAuth authorization-code flow, and asymmetric token signing. The company page lists what's live versus what's next.",
      },
      {
        question: "Does Qeet ID support enterprise SSO and directory provisioning?",
        answer:
          "OpenID Connect is supported today, so standards-based clients integrate now. SAML 2.0 (service provider and identity provider) and SCIM 2.0 directory provisioning are on the roadmap as the platform hardens toward 1.0. If enterprise SSO timing matters for your evaluation, write to partnerships@qeet.in.",
      },
      {
        question: "How do I start, and is there a free tier?",
        answer:
          "Start at id.qeet.in — sign up, install, and you can stand up sign-in the same day. The free tier covers 5,000 monthly active users with no credit card required. Paid tiers are documented on the site.",
      },
    ],
  },
  {
    heading: "Working with us",
    items: [
      {
        question: "Are you hiring?",
        answer:
          "Not actively, but we're always interested in senior operators considering joining a young multi-company holding. Write to careers@qeet.in with what you've shipped that you're proud of and which company you'd want to work inside. See the Careers page for what we look for.",
      },
      {
        question: "How do partnerships work?",
        answer:
          "Partnerships happen at the company level, not the Group level — each subsidiary handles its own customer, channel, and integration partnerships. For Group-level discussions (corporate partnerships, co-investing alongside us in a company, or building something together), write to partnerships@qeet.in.",
      },
      {
        question: "How long do you take to respond?",
        answer:
          "We aim to respond to direct inquiries within a few business days. Press inquiries usually get the fastest turnaround.",
      },
    ],
  },
  {
    heading: "Press and media",
    items: [
      {
        question: "Where do I find logos and brand assets?",
        answer:
          "The press kit page has wordmarks, the mark, and a one-paragraph fact sheet. Please don't recolor the marks or pair them with messaging that misrepresents the Group.",
      },
      {
        question: "Are interviews and quotes available?",
        answer:
          "Yes. Write to press@qeet.in with the angle, the publication, and the deadline. We try to respond within two business days.",
      },
    ],
  },
];

export default function FaqPage() {
  const allFaqs = groups.flatMap((g) => g.items);

  return (
    <>
      <JsonLd data={faqPageSchema(allFaqs)} />

      {/* Hero */}
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">FAQ</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.04] sm:text-[3.5rem] md:text-[5rem] md:leading-[1.03] lg:text-[6rem] lg:leading-[1.02]">
              Questions, asked early.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              The things people ask us most. If you don&rsquo;t see what
              you&rsquo;re looking for,{" "}
              <Link href="/contact" className="text-ink">
                get in touch
              </Link>
              .
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {groups.map((group) => (
        <Section key={group.heading} className="border-t border-rule" padding="tight">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <FadeRise className="md:col-span-4">
              <Eyebrow>{group.heading}</Eyebrow>
            </FadeRise>
            <div className="md:col-span-8 lg:col-span-7">
              <dl>
                {group.items.map((item, i) => (
                  <FadeRise key={item.question}>
                    <div
                      className={cn(
                        "py-8 md:py-10",
                        i !== 0 && "border-t border-rule",
                      )}
                    >
                      <dt className="font-serif font-normal text-balance text-ink text-[1.375rem] leading-[1.25] md:text-[1.625rem] md:leading-[1.22]">
                        {item.question}
                      </dt>
                      <dd className="mt-4 max-w-[40rem] text-body text-ink-muted">
                        {item.answer}
                      </dd>
                    </div>
                  </FadeRise>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      ))}

      {/* Still have a question */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Still have a question</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              Write to the address that fits best.
            </p>
            <p className="mt-5 max-w-[34rem] text-body text-ink-muted">
              <Link href="mailto:partnerships@qeet.in" className="text-ink">
                partnerships@qeet.in
              </Link>{" "}
              for partnership or commercial conversations.{" "}
              <Link href="mailto:press@qeet.in" className="text-ink">
                press@qeet.in
              </Link>{" "}
              for media. Anything else,{" "}
              <Link href="/contact" className="text-ink">
                use the contact form
              </Link>{" "}
              and we&rsquo;ll route it to the right person.
            </p>
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
