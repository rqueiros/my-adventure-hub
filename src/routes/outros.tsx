import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { others, otherKindLabel, stats, fmtDate, type OtherKind } from "@/data/activity";

export const Route = createFileRoute("/outros")({
  component: Page,
  head: () => ({ meta: [
    { title: "Outros — Ricardo Queirós" },
    { name: "description", content: "Orientações, comissões de programa, conselhos editoriais e serviço científico." },
  ]}),
});

type Filter = "ALL" | OtherKind;
const kindOrder: OtherKind[] = ["supervision", "committee", "editorial", "service"];

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const sorted = [...others].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter === "ALL" ? sorted : sorted.filter((o) => o.kind === filter);
  const countOf = (k: OtherKind) => others.filter((o) => o.kind === k).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">08 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Outros</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.others.count}</span> atividades
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Orientações académicas, comissões de programa, conselhos editoriais e serviço científico —
          contributos para a comunidade científica em geral.
        </p>

        <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px] uppercase tracking-widest">
          {(["ALL", ...kindOrder] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === "ALL" ? `Todos (${others.length})` : `${otherKindLabel[f]} (${countOf(f)})`;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  active ? "bg-primary text-primary-foreground border-primary"
                         : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"}`}>
                {label}
              </button>
            );
          })}
        </div>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-28">Imagem</th>
                <th className="text-left px-4 py-3 w-28">Desde</th>
                <th className="text-left px-4 py-3">Título</th>
                <th className="text-left px-4 py-3 hidden md:table-cell w-44">Tipo</th>
                <th className="text-right px-4 py-3 w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <img src={o.image} alt={o.title} loading="lazy"
                      className="w-24 h-16 object-cover rounded ring-1 ring-white/10" />
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{fmtDate(o.date)}</td>
                  <td className="px-4 py-3 font-medium">
                    {o.title}
                    {(o.subtitle || o.role) && (
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {o.role}{o.role && o.subtitle ? " · " : ""}{o.subtitle}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-[11px] uppercase tracking-widest">
                    {otherKindLabel[o.kind]}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href={o.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                      Aceder <ExternalLink className="size-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
