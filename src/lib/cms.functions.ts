import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type Facet =
  | "books" | "events" | "projects" | "travels" | "running"
  | "opinion" | "others" | "upcoming";

// Returns rows as JSON-serialized via JSON.parse(JSON.stringify(...)) to satisfy
// TanStack's serializable map check.
function serial<T>(x: T): T {
  return JSON.parse(JSON.stringify(x ?? null)) as T;
}

export const listFacet = createServerFn({ method: "GET" })
  .inputValidator((data: { facet: Facet }) => data)
  .handler(async ({ data }) => {
    const { data: rows, error } = await supabaseAdmin
      .from(data.facet).select("*").order("date", { ascending: false }).limit(500);
    if (error) { console.error("[cms]", data.facet, error.message); return [] as any[]; }
    return serial(rows ?? []) as any[];
  });

export const getProfile = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("profile").select("*").limit(1).maybeSingle();
  if (error) { console.error("[cms] profile", error.message); return null as any; }
  return serial(data) as any;
});

export const getOpinionById = createServerFn({ method: "GET" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("opinion").select("*").eq("id", data.id).maybeSingle();
    if (error) { console.error(error); return null as any; }
    return serial(row) as any;
  });
