import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Public reads — no auth required, uses admin client to bypass RLS noise.
// Returns plain DTOs. RLS already allows public select, but using admin keeps
// behaviour stable and lets us query upcoming/profile uniformly.

export type Facet =
  | "books" | "events" | "projects" | "travels" | "running"
  | "opinion" | "others" | "upcoming";

export const listFacet = createServerFn({ method: "GET" })
  .inputValidator((data: { facet: Facet }) => data)
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabaseAdmin
      .from(data.facet)
      .select("*")
      .order("date", { ascending: false })
      .limit(500);
    if (error) {
      console.error("[cms]", data.facet, error.message);
      return [] as Array<Record<string, unknown>>;
    }
    return (rows ?? []) as Array<Record<string, unknown>>;
  });

export const getProfile = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("[cms] profile", error.message);
    return null;
  }
  return data as Record<string, unknown> | null;
});

export const getOpinionById = createServerFn({ method: "GET" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("opinion").select("*").eq("id", data.id).maybeSingle();
    if (error) { console.error(error); return null; }
    return row as Record<string, unknown> | null;
  });
