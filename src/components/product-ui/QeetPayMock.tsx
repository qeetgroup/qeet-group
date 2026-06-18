/**
 * Stylized Qeet Pay checkout surface (decorative). Amount, payment methods,
 * card field, and a GST-invoice note. Monochrome + brand pay button.
 */
export function QeetPayMock() {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center py-2">
      <div className="w-full max-w-[20rem] rounded-2xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[0.6875rem] uppercase leading-none tracking-[0.14em] text-ink-subtle">
            Amount due
          </span>
          <span className="font-serif text-[1.5rem] leading-none text-ink tabular-nums">
            ₹1,499<span className="text-ink-subtle">.00</span>
          </span>
        </div>

        <div className="mt-3 flex gap-1.5">
          {["UPI", "Card", "NACH"].map((m, i) => (
            <span
              key={m}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-center text-[0.6875rem] ${
                i === 0
                  ? "border-brand/40 bg-brand/8 font-medium text-ink"
                  : "border-rule text-ink-subtle"
              }`}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="mt-2 flex h-9 items-center gap-2 rounded-lg border border-rule px-3 text-[0.8125rem]">
          <span className="tabular-nums tracking-[0.1em] text-ink-muted">•••• •••• •••• 4242</span>
          <span className="ml-auto h-3.5 w-5 rounded-[3px] bg-ink/15" />
        </div>

        <div className="mt-2 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-brand text-[0.8125rem] font-medium text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          Pay ₹1,499.00 · GST invoice
        </div>
      </div>
    </div>
  );
}
