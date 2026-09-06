/**
 * Hidden honeypot field. Bots fill it in; the server actions reject any
 * submission where it is non-empty.
 *
 * Both forms carried their own copy of this, and one had already drifted to an
 * inline class string. Keeping it in one place means the concealment technique
 * — which has to stay invisible to humans but present to naive scrapers —
 * cannot get half-changed.
 *
 * Deliberately off-screen rather than `display:none` or `hidden`: a bot that
 * respects those would skip the field, which is the opposite of the point.
 * `aria-hidden` and `tabIndex={-1}` keep it away from assistive tech and the
 * keyboard.
 */
export function HoneypotField({ id = "website" }: { id?: string }) {
  return (
    <div
      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <label htmlFor={id}>
        Website (leave blank)
        <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
