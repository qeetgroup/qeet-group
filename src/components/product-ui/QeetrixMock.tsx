/**
 * Stylized Qeetrix design-system panel (decorative). Shows tokens, a few
 * components, and a type specimen — monochrome + a single brand chip.
 */
export function QeetrixMock() {
  const chips = [
    "bg-ink",
    "bg-ink-muted",
    "bg-rule-strong",
    "bg-rule",
    "bg-brand",
    "bg-brand-deep",
  ];
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[22rem] rounded-2xl border border-rule bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-subtle">
            Tokens
          </span>
          <span className="rounded-md border border-rule px-1.5 py-0.5 text-[0.625rem] text-ink-muted">
            @qeetrix/ui
          </span>
        </div>

        {/* Color tokens */}
        <div className="mt-2.5 grid grid-cols-6 gap-1.5">
          {chips.map((c, i) => (
            <span key={i} className={`h-7 rounded-md border border-glass-border ${c}`} />
          ))}
        </div>

        {/* Components */}
        <div className="mt-4 flex items-center gap-2">
          <span className="flex h-8 items-center rounded-lg bg-ink px-3 text-[0.75rem] font-medium text-canvas">
            Button
          </span>
          <span className="flex h-8 flex-1 items-center rounded-lg border border-rule px-3 text-[0.75rem] text-ink-subtle">
            Input
          </span>
          {/* toggle (on) */}
          <span className="flex h-5 w-9 items-center rounded-full bg-brand p-0.5">
            <span className="ml-auto h-4 w-4 rounded-full bg-white" />
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-rule px-2 py-0.5 text-[0.6875rem] text-ink-muted">
            Badge
          </span>
          <span className="rounded-full bg-brand/12 px-2 py-0.5 text-[0.6875rem] font-medium text-brand">
            New
          </span>
          <span className="ml-auto font-serif text-[1.5rem] leading-none text-ink">Ag</span>
        </div>
      </div>
    </div>
  );
}
