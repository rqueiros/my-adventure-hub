import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Loader2 } from "lucide-react";
import { articleKindLabel, profile, fmtDate, type ArticleKind } from "@/data/activity";
import { fetchOrcidWorks, type OrcidWork } from "@/lib/orcid";

export const Route = createFileRoute("/artigos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Artigos — Ricardo Queirós" },
    { name: "description", content: "Publicações científicas do ORCID: conferências, revistas, capítulos de livro e teses." },
  ]}),
});

type Filter = "ALL" | ArticleKind;
const kindOrder: ArticleKind[] = ["conference", "journal", "bookchapter", "thesis"];

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const { data: works = [], isLoading, error } = useQuery({
    queryKey: ["orcid-works", profile.orcid],
    queryFn: () => fetchOrcidWorks(profile.orcid),
    staleTime: 1000 * 60 * 60, // 1h
  });

  const sorted: OrcidWork[] = [...works].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter === "ALL" ? sorted : sorted.filter((a) => a.kind === filter);
  const countOf = (k: ArticleKind) => works.filter((a) => a.kind === k).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">02 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Artigos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{works.length}</span> do ORCID
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-4 text-sm md:text-base leading-relaxed">
          Produção científica obtida em tempo real a partir do{" "}
          <a href={`https://orcid.org/${profile.orcid}`} target="_blank" rel="noopener noreferrer"
             className="text-primary hover:underline font-mono">ORCID {profile.orcid}</a>.
          Organizada por tipo de publicação: conferências internacionais, revistas indexadas, capítulos de livro e teses.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 mt-6 font-mono text-[10px] uppercase tracking-widest">
          {(["ALL", ...kindOrder] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === "ALL" ? `Todos (${works.length})` : `${articleKindLabel[f]} (${countOf(f)})`;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  active ? "bg-primary text-primary-foreground border-primary"
                         : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                }`}>{label}</button>
            );
          })}
        </div>

        {isLoading && (
          <div className="flex items-center gap-3 text-muted-foreground py-12 justify-center">
            <Loader2 className="size-4 animate-spin" /> <span className="font-mono text-xs uppercase tracking-widest">A carregar ORCID…</span>
          </div>
        )}
        {error && (
          <div className="text-rose-400 font-mono text-xs py-6">Falha ao carregar dados do ORCID. Tente mais tarde.</div>
        )}

        {!isLoading && !error && (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 w-24">Data</th>
                  <th className="text-left px-4 py-3">Título</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell w-48">Local</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell w-32">Tipo</th>
                  <th className="text-right px-4 py-3 w-20">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                      {a.date ? fmtDate(a.date) : "—"}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {a.title}
                      {a.venue && <div className="text-[10px] text-muted-foreground mt-0.5 md:hidden">{a.venue}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-[12px]">{a.venue || "—"}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">{articleKindLabel[a.kind]}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a href={a.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                        Open <ExternalLink className="size-3" />
                      </a>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center text-muted-foreground py-8 font-mono text-xs">No works in this category.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
