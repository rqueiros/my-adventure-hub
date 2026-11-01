import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  events, stats, eventGroupOrder, eventGroupLabel, eventGroupOf, yearOf, yearsOf,
  type EventGroup,
} from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";
import { YearFilter, type YearValue } from "@/components/YearFilter";

export const Route = createFileRoute("/eventos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Eventos — Ricardo Queirós" },
    { name: "description", content: "Seminários, palestras, workshops, conferências, formações, podcasts e concursos." },
  ]}),
});

type Filter = "ALL" | EventGroup;

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [year, setYear] = useState<YearValue>(new Date().getFullYear());

  const years = Array.from(new Set([new Date().getFullYear(), ...yearsOf(events)])).sort((a, b) => b - a);
  const byYear = year === "ALL" ? events : events.filter((e) => yearOf(e.date) === year);
  const sorted = [...byYear].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter === "ALL" ? sorted : sorted.filter((e) => eventGroupOf(e.kind) === filter);
  const countOf = (g: EventGroup) => byYear.filter((e) => eventGroupOf(e.kind) === g).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Eventos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.events.count}</span> realizados
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Participação ativa na comunidade através de seminários, palestras, workshops práticos,
          conferências, formações, podcasts e concursos.
        </p>

        <div className="space-y-4 mb-10">
          <YearFilter years={years} value={year} onChange={setYear} />
          <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
            {(["ALL", ...eventGroupOrder] as Filter[]).map((f) => {
              const active = filter === f;
              const label = f === "ALL" ? `Todos (${byYear.length})` : `${eventGroupLabel[f]} (${countOf(f)})`;
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
              badge={{ label: eventGroupLabel[eventGroupOf(e.kind)], className: "text-fuchsia-300 border-fuchsia-400/40" }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-xs mt-8">
            Sem eventos {year === "ALL" ? "nesta categoria" : `em ${year}${filter !== "ALL" ? " nesta categoria" : ""}`}.
          </p>
        )}
      </div>
    </div>
  );
}
