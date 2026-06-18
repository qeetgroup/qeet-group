/**
 * Stylized Qeet ID sign-in surface (decorative, monochrome + orange accent).
 * Pure presentational markup — no inputs are interactive.
 */
function ProviderTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-8 items-center justify-center rounded-lg border border-rule bg-canvas text-ink-muted">
      {children}
    </div>
  );
}

export function QeetIdMock() {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[20rem] rounded-2xl border border-rule bg-surface p-5 shadow-sm">
        <p className="font-serif text-[1.125rem] leading-none text-ink">Sign in to Qeet</p>
        <p className="mt-1.5 text-[0.75rem] text-ink-subtle">Welcome back. Continue with…</p>

        <div className="mt-4 flex h-9 items-center rounded-lg border border-rule px-3 text-[0.8125rem] text-ink-subtle">
          you@company.com
          <span className="ml-auto h-3.5 w-px animate-pulse bg-ink-subtle motion-reduce:animate-none" />
        </div>
        <div className="mt-2 flex h-9 items-center justify-center rounded-lg bg-brand text-[0.8125rem] font-medium text-white">
          Continue
        </div>

        <div className="my-3 flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-subtle">
          <span className="h-px flex-1 bg-rule" />
          or
          <span className="h-px flex-1 bg-rule" />
        </div>

        <div className="flex h-9 items-center justify-center gap-2 rounded-lg border border-rule text-[0.8125rem] text-ink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="16" r="1.4" fill="currentColor" />
          </svg>
          Continue with a passkey
        </div>

        <div className="mt-2 grid grid-cols-4 gap-2">
          <ProviderTile>
            <span className="text-[0.8125rem] font-semibold">G</span>
          </ProviderTile>
          <ProviderTile>
            <span className="grid grid-cols-2 gap-px">
              <span className="h-1.5 w-1.5 bg-current" />
              <span className="h-1.5 w-1.5 bg-current" />
              <span className="h-1.5 w-1.5 bg-current" />
              <span className="h-1.5 w-1.5 bg-current" />
            </span>
          </ProviderTile>
          <ProviderTile>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 12.5c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2 2.4 2s1.3-.6 2.5-.6 1.5.6 2.5.6 1.7-.9 2.3-1.9c.7-1 1-2 1-2.1-.1 0-2.2-.9-2.2-3.2zM14 6.3c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9 0 1.8-.4 2.3-1.1z" />
            </svg>
          </ProviderTile>
          <ProviderTile>
            <span className="text-[0.8125rem] font-semibold">SSO</span>
          </ProviderTile>
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rule px-2 py-1 text-[0.6875rem] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Passkey · MFA verified
        </div>
      </div>
    </div>
  );
}
