import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { opinion, stats, fmtDate } from "@/data/activity";

export const Route = createFileRoute("/opiniao")({
  component: Page,
  head: () => ({ meta: [
    { title: "Opinion — Ricardo Queirós" },
    { name: "description", content: "Op-eds, columns and essays in the Portuguese press." },
  ]}),
});

function Page() {
  const sorted = [...opinion].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">07 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Opinion</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.opinion.count}</span> op-eds
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Op-eds, columns and essays published in Portuguese newspapers and magazines —
          digital education, technology, culture and society.
        </p>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-28">Image</th>
                <th className="text-left px-4 py-3 w-28">Date</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3 hidden md:table-cell w-40">Magazine</th>
                <th className="text-right px-4 py-3 w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <img src={o.image} alt={o.title} loading="lazy"
                      className="w-24 h-16 object-cover rounded ring-1 ring-white/10" />
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{fmtDate(o.date)}</td>
                  <td className="px-4 py-3 font-medium">
                    {o.title}
                    {o.subtitle && <div className="text-[10px] text-muted-foreground mt-0.5">{o.subtitle}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-[11px] uppercase tracking-widest">
                    {o.magazine}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href={o.url} target="_blank" rel="noopener noreferrer"
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
