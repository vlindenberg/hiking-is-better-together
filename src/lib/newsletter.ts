import { z } from "zod";

/**
 * Shared validation for the "join the crew" lead form.
 * Used by the browser form and by the server route so both agree on the rules.
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(3, { message: "Enter your email address." })
    .max(255, { message: "That email is too long." })
    .email({ message: "Enter a valid email address." })
    .transform((value) => value.toLowerCase()),
  source: z.string().trim().max(40).default("landing"),
  /** Honeypot: must stay empty. Bots fill it, people never see it. */
  website: z.string().max(0).optional(),
});

export type NewsletterInput = z.input<typeof newsletterSchema>;
export type NewsletterData = z.output<typeof newsletterSchema>;
