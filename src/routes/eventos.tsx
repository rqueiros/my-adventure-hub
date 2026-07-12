import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { events, eventKindLabel, stats, type EventKind } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/eventos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Eventos — Ricardo Queirós" },
    { name: "description", content: "Palestras, seminários, workshops, conferências, podcasts, arguências e hackathons." },
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
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Eventos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.events.count}</span> realizados
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Participação ativa na comunidade através de palestras, seminários, workshops práticos,
          conferências, podcasts, arguências académicas e painéis de hackathons.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 font-mono text-[10px] uppercase tracking-widest">
          {(["ALL", ...kindOrder] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === "ALL" ? `Todos (${events.length})` : `${eventKindLabel[f]} (${countOf(f)})`;
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <ItemCard
              key={e.id}
              date={e.date}
              title={e.title}
              subtitle={e.subtitle}
              meta={e.meta}
              image={e.image}
              url={e.url}
              badge={{ label: eventKindLabel[e.kind] ?? e.kind, className: "text-fuchsia-300 border-fuchsia-400/40" }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-xs mt-8">Sem eventos nesta categoria.</p>
        )}
      </div>
    </div>
  );
}
