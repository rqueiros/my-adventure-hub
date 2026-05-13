import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { events, eventKindLabel, stats, fmtDate, type EventKind } from "@/data/activity";

export const Route = createFileRoute("/eventos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Events — Ricardo Queirós" },
    { name: "description", content: "Talks, seminars, workshops, conferences, podcasts, juries and hackathons." },
  ]}),
});

type Filter = "ALL" | EventKind;
const kindOrder: EventKind[] = ["talk", "seminar", "workshop", "conference", "podcast", "arguencia", "hackathon"];

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter === "ALL" ? sorted : sorted.filter((e) => e.kind === filter);
  const countOf = (k: EventKind) => events.filter((e) => e.kind === k).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">03 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Events</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.events.count}</span> delivered
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Active community participation through talks, seminars, hands-on workshops, conferences,
          podcasts, academic juries and hackathon panels.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px] uppercase tracking-widest">
          {(["ALL", ...kindOrder] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === "ALL" ? `All (${events.length})` : `${eventKindLabel[f]} (${countOf(f)})`;
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
                <th className="text-left px-4 py-3 w-28">Image</th>
                <th className="text-left px-4 py-3 w-28">Date</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-right px-4 py-3 w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <img src={e.image} alt={e.title} loading="lazy"
                      className="w-24 h-16 object-cover rounded ring-1 ring-white/10" />
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    {fmtDate(e.date)}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {e.title}
                    {e.subtitle && <div className="text-[10px] text-muted-foreground mt-0.5">{e.subtitle}{e.meta ? ` · ${e.meta}` : ""}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-[11px] uppercase tracking-widest">
                    {eventKindLabel[e.kind]}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a href={e.url} target="_blank" rel="noopener noreferrer"
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
