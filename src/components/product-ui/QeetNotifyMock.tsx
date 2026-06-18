/**
 * Stylized Qeet Notify surface (decorative). Three compact multi-channel
 * toasts with per-channel icons; the top toast lifts slightly on tile hover.
 */
function ChannelIcon({ name }: { name: "mail" | "chat" | "bell" }) {
  if (name === "chat") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 5h16v11H9l-4 3v-3H4z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "bell") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const toasts: Array<{ channel: string; msg: string; live: boolean; icon: "mail" | "chat" | "bell" }> = [
  { channel: "Email", msg: "Receipt sent to ana@acme.com", live: true, icon: "mail" },
  { channel: "WhatsApp", msg: "OTP delivered · 6s", live: false, icon: "chat" },
  { channel: "Push", msg: "Build #482 passed", live: false, icon: "bell" },
];

export function QeetNotifyMock() {
  return (
    <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-[20rem] space-y-1.5">
        {toasts.map((t, i) => (
          <div
            key={t.channel}
            className="flex items-center gap-3 rounded-xl border border-rule bg-surface px-3.5 py-2 shadow-sm transition-transform duration-300 first:group-hover/bento:-translate-y-0.5"
            style={{ opacity: 1 - i * 0.1 }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink/8 text-ink">
              <ChannelIcon name={t.icon} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="text-[0.75rem] font-medium leading-tight text-ink">{t.channel}</span>
                {t.live && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
              </span>
              <span className="block truncate text-[0.6875rem] leading-tight text-ink-subtle">
                {t.msg}
              </span>
            </span>
            <span className="shrink-0 self-start text-[0.625rem] text-ink-subtle">now</span>
          </div>
        ))}
      </div>
    </div>
  );
}
