import { describe, expect, it } from "vitest";
import { validateContactInput } from "./validate";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  topic: "Partnerships",
  message: "Hello — would love to chat about an idea we're exploring.",
};

describe("validateContactInput", () => {
  it("accepts a well-formed submission", () => {
    expect(validateContactInput(valid)).toEqual({});
  });

  it("flags missing fields with field-specific messages", () => {
    const errors = validateContactInput({ name: "", email: "", topic: "", message: "" });
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.topic).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  it("rejects malformed emails", () => {
    expect(validateContactInput({ ...valid, email: "ada" }).email).toBeTruthy();
    expect(validateContactInput({ ...valid, email: "ada@" }).email).toBeTruthy();
    expect(validateContactInput({ ...valid, email: "ada@x" }).email).toBeTruthy();
    expect(validateContactInput({ ...valid, email: "ada @x.com" }).email).toBeTruthy();
  });

  it("rejects topics outside the allowlist", () => {
    expect(
      validateContactInput({ ...valid, topic: "Bogus" }).topic,
    ).toBeTruthy();
  });

  it("requires at least a sentence", () => {
    expect(validateContactInput({ ...valid, message: "hi" }).message).toBeTruthy();
  });

  it("rejects messages longer than 5000 chars", () => {
    expect(
      validateContactInput({ ...valid, message: "a".repeat(5001) }).message,
    ).toBeTruthy();
  });

  it("accepts each topic in the allowlist", () => {
    for (const t of ["Partnerships", "Press", "Hiring", "General", "Other"]) {
      expect(
        validateContactInput({ ...valid, topic: t }),
      ).toEqual({});
    }
  });
});
