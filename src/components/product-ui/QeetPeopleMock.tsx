/**
 * Stylized Qeet People surface (decorative). A small reporting tree with
 * avatar monograms and roles. Monochrome with one brand status dot.
 */
function Avatar({ initials, brand }: { initials: string; brand?: boolean }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-medium ${
        brand ? "bg-brand text-white" : "bg-ink/8 text-ink"
      }`}
    >
      {initials}
    </span>
  );
}

function Person({ initials, name, role, brand }: { initials: string; name: string; role: string; brand?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={initials} brand={brand} />
      <span className="min-w-0">
        <span className="block truncate text-[0.8125rem] leading-tight text-ink">{name}</span>
        <span className="block truncate text-[0.6875rem] text-ink-subtle">{role}</span>
      </span>
    </div>
  );
}

export function QeetPeopleMock() {
  return (
    <div aria-hidden="true" className="flex h-full w-full">
      <div className="flex w-full flex-col rounded-2xl border border-rule bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[0.75rem] font-medium text-ink">Org · Engineering</span>
          <span className="rounded-full border border-rule px-2 py-0.5 text-[0.625rem] text-ink-muted">
            12 members
          </span>
        </div>

        <div className="mt-3">
          <Person initials="AR" name="Aanya Rao" role="VP, Engineering" brand />
          <div className="ml-4 mt-2 border-l border-rule pl-4">
            <div className="space-y-2">
              <Person initials="KM" name="Kabir Mehta" role="Staff Engineer" />
              <Person initials="DS" name="Diya Shah" role="Product Designer" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 border-t border-rule pt-2.5 text-[0.625rem] text-ink-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Payroll · PF · ESI compliant
        </div>
      </div>
    </div>
  );
}
