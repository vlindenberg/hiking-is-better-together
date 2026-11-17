import { useState, type FormEvent } from "react";

import { newsletterSchema } from "@/lib/newsletter";

type Status = "idle" | "sending" | "done";

export function LeadForm() {
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [already, setAlready] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsed = newsletterSchema.safeParse({ email, source: "landing", website: botField });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email, source: "landing" }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; already?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Something went wrong. Try again.");
        setStatus("idle");
        return;
      }

      setAlready(Boolean(data.already));
      setStatus("done");
      setEmail("");
    } catch {
      setError("We couldn't reach the server. Try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] bg-lime p-8 text-ink md:p-10">
        <p className="display text-4xl italic md:text-5xl">You're in the crew.</p>
        <p className="mt-4 text-base font-semibold">
          {already
            ? "You're already on the list — nothing to do, we'll be in touch."
            : "You're on the list. Trail ideas and early access land in your inbox."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[2rem] bg-lime p-6 text-ink md:p-8">
      <label htmlFor="crew-email" className="label text-ink/60">
        Email address
      </label>
      <input
        id="crew-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@trail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby="crew-email-hint"
        className="mt-3 w-full rounded-full border-2 border-ink/15 bg-cloud px-6 py-4 text-lg font-semibold outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
      />
      {/* Honeypot: hidden from people, filled by bots. */}
      <input
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={botField}
        onChange={(e) => setBotField(e.target.value)}
        className="absolute h-0 w-0 -translate-x-[9999px] opacity-0"
      />
      {error && (
        <p id="crew-email-hint" role="alert" className="label mt-3 text-violet">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="label mt-5 w-full rounded-full bg-ink px-8 py-5 text-cloud transition-all duration-300 hover:scale-[1.02] hover:bg-violet disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Join the crew"}
      </button>
      <p className="mt-4 text-center text-xs font-medium text-ink/50">
        One email a month. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
