"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { HoneypotField } from "./HoneypotField";
import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { Events, track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

const TOPICS = ["Partnerships", "Press", "Hiring", "General", "Other"];

const inputCls =
  "w-full appearance-none border-0 border-b border-rule-strong bg-transparent py-3 font-sans text-body text-ink placeholder:text-ink-subtle focus:border-ink transition-colors duration-200 aria-[invalid=true]:border-error";

const labelCls = "block font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle";

const fieldErrorCls = "mt-2 font-sans text-body-s text-error";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    if (state.status === "success") track(Events.ContactSubmit);
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="max-w-2xl">
        <p
          role="status"
          className="font-display text-balance text-ink text-heading-xl"
        >
          Got it. We&rsquo;ll get back to you within a few days.
        </p>
        <p className="mt-5 text-body text-ink-muted">
          In the meantime, you can also reach us directly at the addresses above.
        </p>
      </div>
    );
  }

  const values = state.values ?? { name: "", email: "", topic: "", message: "" };
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="max-w-2xl" noValidate>
      {/* Anti-spam: hidden honeypot + render timestamp. */}
      <HoneypotField />
      <input type="hidden" name="started_at" value={startedAt} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={values.name}
            required
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputCls, "mt-3")}
          />
          {errors.name && (
            <p id="name-error" className={fieldErrorCls}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            required
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputCls, "mt-3")}
          />
          {errors.email && (
            <p id="email-error" className={fieldErrorCls}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <label htmlFor="topic" className={labelCls}>
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={values.topic || ""}
          required
          aria-invalid={Boolean(errors.topic) || undefined}
          aria-describedby={errors.topic ? "topic-error" : undefined}
          className={cn(inputCls, "mt-3 cursor-pointer pr-8")}
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p id="topic-error" className={fieldErrorCls}>
            {errors.topic}
          </p>
        )}
      </div>

      <div className="mt-10">
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={values.message}
          required
          minLength={10}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputCls, "mt-3 resize-y")}
        />
        {errors.message && (
          <p id="message-error" className={fieldErrorCls}>
            {errors.message}
          </p>
        )}
      </div>

      {errors._global && (
        <p
          role="alert"
          className="mt-8 border-l-2 border-error pl-4 font-sans text-body-s text-error"
        >
          {errors._global}
        </p>
      )}

      <div className="mt-10 md:mt-12">
        <SubmitButton />
      </div>
    </form>
  );
}

/**
 * The form's primary action.
 *
 * Uses the Button primitive rather than a hand-rolled <button>. The previous
 * version reimplemented the pill shape, height, padding and hover here, and had
 * already drifted from Button's own values — which is the whole reason Button
 * exists. It also meant this control missed the designed loading state.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="accent" size="lg" loading={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}
