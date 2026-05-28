"use server";

import { Resend } from "resend";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "topic" | "message" | "_global", string>
>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: ContactFieldErrors;
  /** Echo the user's input back into the form on validation error. */
  values?: { name: string; email: string; topic: string; message: string };
};

const TOPICS = ["Partnerships", "Press", "Hiring", "General", "Other"] as const;

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const topic = ((formData.get("topic") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();

  const errors: ContactFieldErrors = {};
  if (!name) errors.name = "Please share your name.";
  if (!email) errors.email = "Please share an email address.";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    errors.email = "That doesn't look like a valid email.";
  if (!topic || !TOPICS.includes(topic as (typeof TOPICS)[number]))
    errors.topic = "Please choose a topic.";
  if (!message || message.length < 10)
    errors.message = "Please write at least a sentence.";

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
      from: process.env.CONTACT_FROM ?? "Qeet Group <hello@qeet.in>",
      to: [process.env.CONTACT_TO ?? "hello@qeet.in"],
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
          "Something went wrong sending your message. Try again, or email hello@qeet.in directly.",
      },
      values: { name, email, topic, message },
    };
  }
}
