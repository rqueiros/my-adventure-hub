import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const FACETS = [
  "profile", "books", "events", "projects", "travels", "running",
  "opinion", "others", "upcoming",
] as const;
type Table = (typeof FACETS)[number];

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

const facetSchema = z.enum(FACETS);

// CHECK ROLE - call from admin gate
export const checkAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles").select("role")
      .eq("user_id", context.userId).eq("role", "admin").maybeSingle();
    return { isAdmin: !!data, userId: context.userId };
  });

// CREATE
export const createRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { facet: Table; values: Record<string, unknown> }) => ({
    facet: facetSchema.parse(d.facet),
    values: d.values,
  }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { data: row, error } = await supabaseAdmin
      .from(data.facet).insert(data.values).select().single();
    if (error) throw new Error(error.message);
    return row as Record<string, unknown>;
  });

// UPDATE
export const updateRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { facet: Table; id: string; values: Record<string, unknown> }) => ({
    facet: facetSchema.parse(d.facet),
    id: z.string().uuid().parse(d.id),
    values: d.values,
  }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { data: row, error } = await supabaseAdmin
      .from(data.facet).update(data.values).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return row as Record<string, unknown>;
  });

// DELETE
export const deleteRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { facet: Table; id: string }) => ({
    facet: facetSchema.parse(d.facet),
    id: z.string().uuid().parse(d.id),
  }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from(data.facet).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
