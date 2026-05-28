"use server";

import { Resend } from "resend";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function subscribeNewsletter(
  _prev: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  // Honeypot — same trick as the contact form.
  const honeypot = ((formData.get("website") as string | null) ?? "").trim();
  if (honeypot) return { status: "success" };

  const email = ((formData.get("email") as string | null) ?? "").trim();
  if (!email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "That doesn't look like a valid email." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Dev fallback: no Resend keys → succeed silently after logging.
  if (!apiKey || !audienceId) {
    console.info("[newsletter] would-subscribe:", email);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[newsletter] resend error:", err);
    return {
      status: "error",
      message: "Something went wrong. Try again, or email support@qeet.in.",
    };
  }
}
