import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/components/ui/Link";
import { Stat } from "@/components/ui/Stat";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  Activity,
  ArrowRight,
  Colorfilter,
  FingerScan,
  Notification,
  People,
  ShieldTick,
  Wallet,
} from "@qeetrix/icons";
import { Contrast, Swatch } from "./Swatch";

export const metadata: Metadata = {
  title: "Design system",
  description: "Internal token reference for qeet.in.",
  robots: { index: false, follow: false },
};

const NEUTRAL = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 1000];
const BRAND = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const TYPE_SCALE = [
  ["display-2xl", "text-display-2xl", "Home hero only. One per site."],
  ["display-xl", "text-display-xl", "Page h1."],
  ["display-l", "text-display-l", "Article titles, closing statements."],
  ["display-m", "text-display-m", "Section headers, metrics."],
  ["heading-xl", "text-heading-xl", "Sub-sections, MDX h2."],
  ["heading-l", "text-heading-l", "Card titles, list rows."],
  ["heading-m", "text-heading-m", "FAQ questions, small headings."],
  ["heading-s", "text-heading-s", "Dense headings."],
];

const BODY_SCALE = [
  ["body-l", "text-body-l", "Lede paragraphs."],
  ["body", "text-body", "Default running text."],
  ["body-s", "text-body-s", "Secondary and meta."],
  ["caption", "text-caption", "Captions, footnotes."],
  ["label", "text-label uppercase", "Eyebrows and mono labels."],
];

const RULES = [
  ["rule", "--color-rule", "decorative hairline"],
  ["rule-strong", "--color-rule-strong", "visible divider"],
  ["rule-interactive", "--color-rule-interactive", "meaningful borders — needs 3:1"],
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-rule py-6 md:grid-cols-[14rem_1fr] md:gap-8">
      <p className="font-mono text-caption text-ink-subtle">{label}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function DesignPage() {
  return (
    <>
      <Section padding="tight">
        <Eyebrow>Internal</Eyebrow>
        <Heading level={1} size="display-l" className="mt-6 text-ink">
          Design system
        </Heading>
        <Text size="body-l" className="mt-6 max-w-prose">
          The token reference for qeet.in. Not indexed, not linked from the site.
          Dark is the default — use the toggle in the nav to review both themes.
          Contrast figures are measured live from the resolved tokens, so they
          cannot drift from what actually ships. The same pairings are asserted
          in CI by <code className="font-mono">bun run check:contrast</code>.
        </Text>
      </Section>

      <Section padding="tight" className="border-t border-rule">
        <Eyebrow>01 — Colour</Eyebrow>
        <Heading size="display-m" className="mt-5 text-ink">
          Ramps
        </Heading>
        <Text size="body-s" className="mt-4 max-w-prose">
          Both ramps are OKLCH, so the steps are perceptually even. Neutrals
          carry a faint cool cast (hue 248); the signal ramp is anchored at{" "}
          <code className="font-mono">#e8ff47</code> and drifts toward gold as
          it darkens, because holding a yellow-green&rsquo;s hue while darkening
          it produces olive. Both are theme-independent: semantic tokens point
          at them.
        </Text>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {NEUTRAL.map((step) => (
            <Swatch key={step} token={`--color-neutral-${step}`} label={`neutral-${step}`} />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {BRAND.map((step) => (
            <Swatch key={step} token={`--color-signal-${step}`} label={`signal-${step}`} />
          ))}
        </div>
      </Section>

      <Section padding="tight" className="border-t border-rule">
        <Eyebrow>02 — Semantic tokens</Eyebrow>
        <Heading size="display-m" className="mt-5 text-ink">
          What components actually use
        </Heading>
        <Text size="body-s" className="mt-4 max-w-prose">
          A component may reference only these. No literal hex, no raw{" "}
          <code className="font-mono">oklch()</code>, no{" "}
          <code className="font-mono">dark:</code> colour override — theming
          happens in one file.
        </Text>

        <Row label="surfaces">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Swatch token="--color-canvas" label="canvas" />
            <Swatch token="--color-surface" label="surface" />
            <Swatch token="--color-surface-raised" label="surface-raised" />
            <Swatch token="--color-surface-overlay" label="surface-overlay" />
            <Swatch token="--color-surface-sunken" label="surface-sunken" />
            <Swatch token="--color-inverse" label="inverse" />
          </div>
        </Row>

        <Row label="ink — on canvas / on surface">
          <div className="space-y-3">
            {[
              ["ink", "--color-ink"],
              ["ink-muted", "--color-ink-muted"],
              ["ink-subtle", "--color-ink-subtle"],
            ].map(([label, token]) => (
              <div key={token} className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-body" style={{ color: `var(${token})` }}>
                  {label} — the quick brown fox jumps over the lazy dog
                </span>
                <span className="flex items-center gap-3">
                  <Contrast fg={token} bg="--color-canvas" />
                  <Contrast fg={token} bg="--color-surface" />
                </span>
              </div>
            ))}
          </div>
        </Row>

        <Row label="rules">
          <div className="space-y-4">
            {RULES.map(([label, token, note]) => (
              <div key={token}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-mono text-caption text-ink">
                    {label} <span className="text-ink-subtle">— {note}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Contrast fg={token} bg="--color-canvas" use="ui" />
                    <Contrast fg={token} bg="--color-surface" use="ui" />
                  </span>
                </div>
                <div className="mt-2 h-px w-full" style={{ background: `var(${token})` }} />
              </div>
            ))}
            <Text size="caption" tone="subtle">
              Only rule-interactive is expected to clear 3:1. The other two are
              decorative and exempt from 1.4.11 — they carry no meaning the
              layout does not already convey.
            </Text>
          </div>
        </Row>

        <Row label="accent — three jobs">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-body-s font-medium text-accent-contrast">
                Label on an accent fill
              </span>
              <Contrast fg="--color-accent-contrast" bg="--color-accent" />
              <Text size="caption" tone="subtle">
                White here would be 3.01:1 — a fail.
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-body text-accent-text">Accent text (normal size)</span>
              <Contrast fg="--color-accent-text" bg="--color-canvas" />
              <Text size="caption" tone="subtle">
                Needs 4.5:1. signal-800 in light (a deep gold); the true signal in dark.
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-display text-display-m text-accent-text-display">
                Accent at display size
              </span>
              <Contrast fg="--color-accent-text-display" bg="--color-canvas" use="large-text" />
              <Text size="caption" tone="subtle">
                Large text only, so 3:1 applies. Lets the light canvas stay
                close to #ff6900, which measures 2.81:1 and clears neither bar.
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-block h-10 w-24 rounded-md bg-accent" />
              <span className="inline-block h-10 w-24 rounded-md bg-accent-soft" />
              <span className="inline-block h-10 w-24 rounded-md bg-accent-faint" />
              <Text size="caption" tone="subtle">
                accent / accent-soft / accent-faint — fills and washes. Never text.
              </Text>
            </div>
          </div>
        </Row>

        <Row label="focus">
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              className="focus-ring rounded-md border border-rule-interactive px-4 py-2 text-body-s text-ink"
            >
              Tab to me
            </button>
            <Contrast fg="--color-focus" bg="--color-canvas" use="ui" />
            <Contrast fg="--color-focus" bg="--color-surface" use="ui" />
          </div>
        </Row>

        <Row label="functional">
          <div className="grid grid-cols-3 gap-3 sm:max-w-md">
            <Swatch token="--color-success" label="success" />
            <Swatch token="--color-warning" label="warning" />
            <Swatch token="--color-error" label="error" />
          </div>
        </Row>
      </Section>

      <Section padding="tight" className="border-t border-rule">
        <Eyebrow>03 — Type</Eyebrow>
        <Heading size="display-m" className="mt-5 text-ink">
          A fluid scale
        </Heading>
        <Text size="body-s" className="mt-4 max-w-prose">
          Every step is a <code className="font-mono">clamp()</code>, so type is
          continuous across viewports instead of jumping at breakpoints — resize
          the window to check. Line-height and tracking travel with the token.
          Two Qeet faces from @qeetrix/ui. Qeet UI carries headings and chrome;
          Qeet Text carries body copy. Hierarchy comes from weight, size and
          space rather than from switching typeface.
        </Text>

        <div className="mt-12 space-y-10">
          {TYPE_SCALE.map(([token, cls, note]) => (
            <div key={token} className="border-t border-rule pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="font-mono text-caption text-ink-subtle">{token}</span>
                <span className="font-mono text-caption text-ink-subtle">{note}</span>
              </div>
              <p className={`mt-4 font-display text-ink ${cls}`}>
                We question, we transform.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-6">
          {BODY_SCALE.map(([token, cls, note]) => (
            <div key={token} className="border-t border-rule pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="font-mono text-caption text-ink-subtle">{token}</span>
                <span className="font-mono text-caption text-ink-subtle">{note}</span>
              </div>
              <p className={`mt-3 font-sans text-ink-muted ${cls}`}>
                Six platforms, one identity graph, built for the long term.
              </p>
            </div>
          ))}
        </div>

        <Row label="faces">
          <div className="space-y-3">
            <p className="font-display text-heading-l text-ink">Qeet UI — headings, 600</p>
            <p className="font-ui text-body text-ink">Qeet UI — controls, 500</p>
            <p className="font-sans text-body text-ink">Qeet Text — body copy, 400</p>
            <p className="font-mono text-body text-ink">Fira Code — data and IDs</p>
          </div>
        </Row>

        <Row label="tabular figures">
          <div className="space-y-2">
            <p className="font-mono text-body text-ink tabular-figures">
              1,111,111 · 0.00 · 99.95%
            </p>
            <p className="font-mono text-body text-ink-subtle">
              1,111,111 · 0.00 · 99.95%{" "}
              <span className="text-caption">(proportional, for comparison)</span>
            </p>
          </div>
        </Row>
      </Section>

      <Section padding="tight" className="border-t border-rule">
        <Eyebrow>04 — Elevation, radii, motion</Eyebrow>

        <Row label="shadows">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {["sm", "md", "lg", "xl"].map((s) => (
              <div key={s}>
                <div
                  className="h-20 rounded-lg bg-surface"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                />
                <p className="mt-3 font-mono text-caption text-ink-subtle">shadow-{s}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="h-20 max-w-xs rounded-lg bg-surface shadow-glow" />
            <p className="mt-3 font-mono text-caption text-ink-subtle">
              shadow-glow — primary CTA and featured surfaces only
            </p>
          </div>
        </Row>

        <Row label="radii">
          <div className="flex flex-wrap gap-6">
            {["xs", "sm", "md", "lg", "xl", "2xl"].map((r) => (
              <div key={r}>
                <div
                  className="h-16 w-16 border border-rule-strong bg-surface"
                  style={{ borderRadius: `var(--radius-${r})` }}
                />
                <p className="mt-2 font-mono text-caption text-ink-subtle">{r}</p>
              </div>
            ))}
          </div>
        </Row>

        <Row label="easing">
          <ul className="space-y-2 font-mono text-caption text-ink-muted">
            <li>ease-expo — the signature curve, mirrors EASE_OUT in lib/motion</li>
            <li>ease-quart — softer entrances</li>
            <li>ease-soft — symmetric, for state changes</li>
            <li>ease-entrance — scroll reveals</li>
          </ul>
        </Row>

        <Row label="duration">
          <ul className="space-y-2 font-mono text-caption text-ink-muted">
            <li>instant 120ms — colour and opacity on hover</li>
            <li>fast 200ms — the default interaction</li>
            <li>base 320ms — panels, view transitions</li>
            <li>slow 520ms — section reveals</li>
            <li>slower 900ms — ambient</li>
          </ul>
        </Row>

        <Row label="layout">
          <ul className="space-y-2 font-mono text-caption text-ink-muted">
            <li>container: prose 46rem · narrow 62rem · default 80rem · wide 96rem</li>
            <li>space-section / space-section-tight — fluid vertical rhythm</li>
            <li>z: base 0 · raised 10 · sticky 20 · nav 40 · dropdown 50 · overlay 60 · modal 70 · toast 80</li>
          </ul>
        </Row>
      </Section>

      <Section padding="tight" className="border-t border-rule">
        <Eyebrow>05 — Components</Eyebrow>
        <Heading size="display-m" className="mt-5 text-ink">
          Every variant, every state
        </Heading>
        <Text size="body-s" className="mt-4 max-w-prose">
          Interactive elements carry all six states — default, hover,
          focus-visible, active, disabled and loading. Tab through this section
          to check the focus treatment against each surface.
        </Text>

        <Row label="Button — variants">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="solid">Solid</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Row>

        <Row label="Button — sizes">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Row>

        <Row label="Button — states">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button variant="outline" disabled>
              Disabled outline
            </Button>
            <Button href="/design" variant="ghost">
              As a link
            </Button>
          </div>
          <Text size="caption" tone="subtle" className="mt-4">
            Loading keeps the label in flow but hidden, so the control does not
            change width mid-submit.
          </Text>
        </Row>

        <Row label="Button — with icons">
          <div className="flex flex-wrap items-center gap-4">
            <Button icon={<Icon icon={ArrowRight} />} iconPosition="end">
              Explore products
            </Button>
            <Button variant="outline" icon={<Icon icon={ShieldTick} />}>
              Security
            </Button>
          </div>
        </Row>

        <Row label="Badge">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Neutral</Badge>
            <Badge tone="accent" dot>
              Accent
            </Badge>
            <Badge tone="success" dot>
              Success
            </Badge>
            <Badge tone="warning" dot>
              Warning
            </Badge>
            <Badge tone="error" dot>
              Error
            </Badge>
            <Badge tone="outline">Outline</Badge>
          </div>
        </Row>

        <Row label="StatusChip — the closed lifecycle vocabulary">
          <div className="flex flex-wrap items-center gap-6">
            {(["available", "development", "planned"] as const).map((status) => (
              <StatusChip key={status} status={status} />
            ))}
          </div>
        </Row>

        <Row label="Card">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card padding="sm">
              <p className="font-sans text-body-s text-ink">glass (default)</p>
            </Card>
            <Card variant="solid" padding="sm">
              <p className="font-sans text-body-s text-ink">solid</p>
            </Card>
            <Card variant="outline" padding="sm">
              <p className="font-sans text-body-s text-ink">outline</p>
            </Card>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card href="/design" padding="sm">
              <p className="font-sans text-body-s text-ink">
                interactive — hover and tab me
              </p>
            </Card>
            <Card padding="sm" interactive>
              <p className="font-sans text-body-s text-ink">interactive, no spotlight</p>
            </Card>
          </div>
        </Row>

        <Row label="Stat">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <Stat value="6" label="Platforms" context="One identity graph" />
            <Stat value="67" label="Repositories" context="Across the group" />
            <Stat value="2026" label="Founded" context="India" />
          </div>
        </Row>

        <Row label="Icon — @qeetrix/icons">
          <div className="flex flex-wrap items-center gap-6 text-ink">
            <Icon icon={FingerScan} size={24} />
            <Icon icon={Colorfilter} size={24} />
            <Icon icon={Activity} size={24} />
            <Icon icon={People} size={24} />
            <Icon icon={Notification} size={24} />
            <Icon icon={Wallet} size={24} />
            <Icon icon={ShieldTick} size={24} variant="solid" />
          </div>
          <Text size="caption" tone="subtle" className="mt-4">
            1,166 icons, tree-shaken. The wrapper forces{" "}
            <code className="font-mono">color=&quot;currentColor&quot;</code>: the
            library defaults each svg to white, which would vanish on this
            canvas in light mode.
          </Text>
        </Row>

        <Row label="Link">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/design">Default</Link>
            <Link href="/design" variant="arrow">
              With arrow
            </Link>
            <Link href="https://qeet.in">External</Link>
          </div>
        </Row>
      </Section>

      <Section padding="tight" className="border-t border-rule">
        <Eyebrow>06 — Ambient surfaces</Eyebrow>
        <Text size="body-s" className="mt-4 max-w-prose">
          All decorative. Carriers must be{" "}
          <code className="font-mono">aria-hidden</code>, and the reduced-motion
          block freezes any animation so each degrades to a static wash.
        </Text>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {["bg-grid", "glass-panel"].map((cls) => (
            <div key={cls}>
              <div className={`h-40 rounded-lg border border-rule ${cls}`} />
              <p className="mt-3 font-mono text-caption text-ink-subtle">.{cls}</p>
            </div>
          ))}
        </div>
        <Text size="body-s" tone="subtle" className="mt-10 max-w-prose">
          Adding a token? Put it in{" "}
          <code className="font-mono">src/app/globals.css</code> and surface it
          here. If it is not on this page, it does not exist.
        </Text>
      </Section>
    </>
  );
}
