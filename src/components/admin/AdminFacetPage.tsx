import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createRow, updateRow, deleteRow } from "@/lib/admin.functions";
import { listFacet, getProfile } from "@/lib/cms.functions";
import { FACETS } from "@/lib/admin-config";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

export function AdminFacetPage({ facet }: { facet: string }) {
  const cfg = FACETS[facet];
  const qc = useQueryClient();
  const isProfile = !!cfg?.singleton;

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin-list", facet],
    queryFn: () => isProfile
      ? getProfile().then((r) => r ? [r] : [])
      : listFacet({ data: { facet: facet as any } }),
  });

  const create = useServerFn(createRow);
  const update = useServerFn(updateRow);
  const remove = useServerFn(deleteRow);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const mCreate = useMutation({
    mutationFn: (values: any) => create({ data: { facet, values } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-list", facet] }); qc.invalidateQueries({ queryKey: ["cms", facet] }); setOpen(false); },
  });
  const mUpdate = useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) => update({ data: { facet, id, values } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-list", facet] }); qc.invalidateQueries({ queryKey: ["cms", facet] }); setOpen(false); },
  });
  const mDelete = useMutation({
    mutationFn: (id: string) => remove({ data: { facet, id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-list", facet] }); qc.invalidateQueries({ queryKey: ["cms", facet] }); },
  });

  if (!cfg) return <div>Unknown facet</div>;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, any> = {};
    for (const f of cfg.fields) {
      const v = fd.get(f.name);
      if (v === null || v === "") { values[f.name] = null; continue; }
      if (f.type === "number") values[f.name] = Number(v);
      else if (f.type === "json") { try { values[f.name] = JSON.parse(String(v)); } catch { values[f.name] = {}; } }
      else values[f.name] = String(v);
    }
    if (editing?.id) mUpdate.mutate({ id: editing.id, values });
    else mCreate.mutate(values);
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">{cfg.label}</h1>
          <p className="text-xs text-muted-foreground font-mono mt-1">{rows.length} {rows.length === 1 ? "row" : "rows"}</p>
        </div>
        {(!isProfile || rows.length === 0) && (
          <button onClick={() => { setEditing(null); setOpen(true); }}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest">
            <Plus className="size-3" /> New
          </button>
        )}
      </div>

      {isLoading ? <Loader2 className="animate-spin" /> : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                {cfg.columns.map((c) => <th key={c.key} className="text-left px-3 py-2.5">{c.label}</th>)}
                <th className="px-3 py-2.5 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r: any) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  {cfg.columns.map((c) => (
                    <td key={c.key} className="px-3 py-2">
                      {c.image
                        ? r[c.key] ? <img src={r[c.key]} alt="" className="w-14 h-10 object-cover rounded" /> : <span className="text-muted-foreground text-xs">—</span>
                        : <span className="text-foreground/90">{String(r[c.key] ?? "")}</span>}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => { setEditing(r); setOpen(true); }} className="p-1 hover:text-primary" aria-label="Edit"><Pencil className="size-3.5" /></button>
                    {!isProfile && (
                      <button onClick={() => { if (confirm("Delete this row?")) mDelete.mutate(r.id); }} className="p-1 hover:text-rose-400" aria-label="Delete"><Trash2 className="size-3.5" /></button>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={cfg.columns.length + 1} className="text-center text-muted-foreground py-8 text-xs font-mono">No rows.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-3">
            <h2 className="text-lg font-bold uppercase tracking-tight">{editing ? "Edit" : "Create"} {cfg.label}</h2>
            {cfg.fields.map((f) => {
              const def = editing?.[f.name] ?? "";
              const val = typeof def === "object" && def !== null ? JSON.stringify(def, null, 2) : def;
              return (
                <label key={f.name} className="block">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block mb-1">{f.label}{f.required && " *"}</span>
                  {f.type === "textarea" || f.type === "json" ? (
                    <textarea name={f.name} required={f.required} defaultValue={val ?? ""}
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm min-h-32 font-mono" />
                  ) : f.type === "select" ? (
                    <select name={f.name} required={f.required} defaultValue={val ?? ""}
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm">
                      <option value="">—</option>
                      {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input name={f.name} required={f.required} type={f.type === "url" ? "url" : f.type === "date" ? "date" : f.type === "number" ? "number" : "text"}
                      defaultValue={val ?? ""}
                      className="w-full bg-background border border-border rounded px-3 py-2 text-sm" />
                  )}
                </label>
              );
            })}
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">Cancel</button>
              <button type="submit" disabled={mCreate.isPending || mUpdate.isPending}
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-bold uppercase tracking-widest disabled:opacity-50">
                {mCreate.isPending || mUpdate.isPending ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
