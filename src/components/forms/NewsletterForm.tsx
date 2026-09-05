"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import {
  subscribeNewsletter,
  type NewsletterFormState,
} from "@/app/newsletter/actions";
import { Events, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { HoneypotField } from "./HoneypotField";

const initialState: NewsletterFormState = { status: "idle" };

export function NewsletterForm({ className }: { className?: string }) {
  const [state, formAction] = useActionState(subscribeNewsletter, initialState);

  useEffect(() => {
    if (state.status === "success") track(Events.NewsletterSubscribe);
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "font-sans text-body-s text-ink-muted",
          className,
        )}
      >
        Thanks — you&rsquo;ll hear from us when we have something to share.
      </p>
    );
  }

  return (
    <form action={formAction} className={cn("max-w-sm", className)} noValidate>
      <HoneypotField id="nl-website" />
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-end gap-3 border-b border-rule-strong">
        <input
          id="nl-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={state.status === "error" || undefined}
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent py-2 font-sans text-body-s text-ink placeholder:text-ink-subtle"
        />
        <SubmitButton />
      </div>
      {state.status === "error" && state.message && (
        <p role="alert" className="mt-2 font-sans text-body-s text-error">
          {state.message}
        </p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "shrink-0 py-2 font-sans text-body-s text-ink underline decoration-current/30 decoration-1 underline-offset-[5px]",
        "transition-[text-decoration-color,opacity] duration-200 hover:decoration-accent disabled:opacity-60 disabled:cursor-not-allowed",
        "focus-ring",
      )}
    >
      {pending ? "Subscribing…" : "Subscribe"}
    </button>
  );
}
