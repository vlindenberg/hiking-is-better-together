import { describe, expect, it } from "vitest";

import { newsletterSchema } from "@/lib/newsletter";

describe("Newsletter lead form validation", () => {
  it("accepts an email and stores it lowercased with the landing source", () => {
    const result = newsletterSchema.safeParse({ email: "  Victoria@Example.COM " });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("victoria@example.com");
      expect(result.data.source).toBe("landing");
    }
  });

  it("rejects a missing email", () => {
    const result = newsletterSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = newsletterSchema.safeParse({ email: "not-an-email" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter a valid email address.");
    }
  });

  it("rejects an email over 255 characters", () => {
    const result = newsletterSchema.safeParse({ email: `${"a".repeat(250)}@example.com` });

    expect(result.success).toBe(false);
  });

  it("rejects a submission that filled the honeypot field", () => {
    const result = newsletterSchema.safeParse({
      email: "victoria@example.com",
      website: "http://spam.example.com",
    });

    expect(result.success).toBe(false);
  });
});
