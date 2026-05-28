"use server";

import { Resend } from "resend";
import { validateContactInput, type ContactFieldErrors } from "./validate";

export type { ContactFieldErrors } from "./validate";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: ContactFieldErrors;
  /** Echo the user's input back into the form on validation error. */
  values?: { name: string; email: string; topic: string; message: string };
};

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: a hidden field humans don't see. Bots fill every input they find.
  const honeypot = ((formData.get("website") as string | null) ?? "").trim();
  if (honeypot) return { status: "success" };

  // Time-trap: form mounts a timestamp on render. Submissions under 3s are bots.
  const startedAtRaw = ((formData.get("started_at") as string | null) ?? "").trim();
  const startedAt = Number.parseInt(startedAtRaw, 10);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3000) {
    return { status: "success" };
  }
  // TODO(rate-limit): add IP-based rate limiting via Vercel KV / Upstash once
  // either is provisioned. Read x-forwarded-for in a route handler wrapper.

  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const topic = ((formData.get("topic") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();

  const errors = validateContactInput({ name, email, topic, message });

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      values: { name, email, topic, message },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // In development without a key, succeed but log instead of sending. This
    // lets local testing exercise the full happy-path UI without configuring
    // Resend.
    console.warn("[contact] RESEND_API_KEY not set — skipping send.");
    console.info("[contact] message would have sent:", { name, email, topic, message });
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Qeet Group <support@qeet.in>",
      to: [process.env.CONTACT_TO ?? "support@qeet.in"],
      replyTo: email,
      subject: `[${topic}] Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n`,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return {
      status: "error",
      errors: {
        _global:
          "Something went wrong sending your message. Try again, or email support@qeet.in directly.",
      },
      values: { name, email, topic, message },
    };
  }
}
