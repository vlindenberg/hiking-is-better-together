import { createFileRoute } from "@tanstack/react-router";

import { newsletterSchema } from "@/lib/newsletter";

export const Route = createFileRoute("/api/public/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Send a JSON body." }, { status: 400 });
        }

        const parsed = newsletterSchema.safeParse(raw);
        if (!parsed.success) {
          const first = parsed.error.issues[0];
          return Response.json(
            { ok: false, error: first?.message ?? "Check your details and try again." },
            { status: 400 },
          );
        }

        const { email, source, website } = parsed.data;

        // Filled honeypot: pretend success, store nothing.
        if (website) return Response.json({ ok: true, already: false });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("newsletter_signups").insert({ email, source });

        if (error) {
          if (error.code === "23505") return Response.json({ ok: true, already: true });
          console.error("[newsletter] insert failed:", error.message);
          return Response.json(
            { ok: false, error: "Something went wrong on our side. Try again." },
            { status: 500 },
          );
        }

        return Response.json({ ok: true, already: false });
      },
    },
  },
});
