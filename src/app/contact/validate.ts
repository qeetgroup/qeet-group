/**
 * Pure validation for the contact form. Split out from actions.ts so it can
 * be unit-tested without a Next.js runtime.
 */

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "topic" | "message" | "_global", string>
>;

export const CONTACT_TOPICS = [
  "Partnerships",
  "Press",
  "Hiring",
  "General",
  "Other",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactInput = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validateContactInput(input: ContactInput): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!input.name) errors.name = "Please share your name.";
  if (!input.email) errors.email = "Please share an email address.";
  else if (!EMAIL_RE.test(input.email))
    errors.email = "That doesn't look like a valid email.";
  if (
    !input.topic ||
    !CONTACT_TOPICS.includes(input.topic as ContactTopic)
  )
    errors.topic = "Please choose a topic.";
  if (!input.message || input.message.length < 10)
    errors.message = "Please write at least a sentence.";
  if (input.message.length > 5000)
    errors.message = "Please keep messages under 5000 characters.";

  return errors;
}
