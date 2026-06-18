/**
 * Stylized Qeet Logs stream (decorative). Tenant-scoped log rows with level
 * tags and a tiny sparkline. Monochrome with error highlighted in brand.
 */
const rows = [
  { t: "09:24:01", lvl: "INFO", tone: "text-ink-subtle", msg: "auth.login ok · passkey" },
  { t: "09:24:03", lvl: "INFO", tone: "text-ink-subtle", msg: "session.refresh rotated" },
  { t: "09:24:07", lvl: "WARN", tone: "text-ink", msg: "rate_limit near threshold" },
  { t: "09:24:09", lvl: "ERROR", tone: "text-brand", msg: "webhook.delivery retry 2/5" },
  { t: "09:24:12", lvl: "INFO", tone: "text-ink-subtle", msg: "scim.sync 142 users" },
];

export function QeetLogsMock() {
  return (
    <div aria-hidden="true" className="flex h-full w-full">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-rule bg-surface shadow-sm">
        <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
          <span className="text-[0.75rem] font-medium text-ink">Live tail</span>
          <span className="rounded-md border border-rule px-1.5 py-0.5 text-[0.625rem] text-ink-muted">
            tenant: acme
          </span>
          <svg className="ml-auto text-ink-subtle" width="56" height="16" viewBox="0 0 56 16" fill="none" aria-hidden="true">
            <path d="M0 11 L8 9 L14 12 L20 5 L26 8 L32 3 L38 7 L44 4 L50 9 L56 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1 overflow-hidden px-4 py-2 font-mono text-[0.6875rem] leading-[1.7]">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="text-ink-subtle">{r.t}</span>
              <span className={`w-9 shrink-0 font-semibold ${r.tone}`}>{r.lvl}</span>
              <span className="truncate text-ink-muted">{r.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
