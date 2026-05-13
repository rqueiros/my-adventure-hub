import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { articles, articleKindLabel, stats, fmtDate, type ArticleKind } from "@/data/activity";

export const Route = createFileRoute("/artigos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Articles — Ricardo Queirós" },
    { name: "description", content: "Scientific publications in conferences, journals, book chapters and theses." },
  ]}),
});

type Filter = "ALL" | ArticleKind;
const kindOrder: ArticleKind[] = ["conference", "journal", "bookchapter", "thesis"];

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter === "ALL" ? sorted : sorted.filter((a) => a.kind === filter);
  const countOf = (k: ArticleKind) => articles.filter((a) => a.kind === k).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">02 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Articles</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.articles.count}</span> published
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Scientific output organised by publication type: international conferences, indexed journals,
          book chapters and academic theses. Topics include gamification, learning environments,
          automatic assessment and domain-specific languages.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px] uppercase tracking-widest">
          {(["ALL", ...kindOrder] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === "ALL" ? `All (${articles.length})` : `${articleKindLabel[f]} (${countOf(f)})`;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-28">Date</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Venue</th>
                <th className="text-right px-4 py-3 w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    {fmtDate(a.date)}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {a.title}
                    <div className="text-[10px] text-muted-foreground mt-0.5 md:hidden">{a.venue}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.venue}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={a.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                      Open <ExternalLink className="size-3" />
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
