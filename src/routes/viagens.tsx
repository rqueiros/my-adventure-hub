import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { travels, stats } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

const CONTINENT_LABEL: Record<string, string> = {
  Africa: "África",
  Asia: "Ásia",
  Europe: "Europa",
  "North America": "América do Norte",
  "South America": "América do Sul",
  Oceania: "Oceania",
};


export const Route = createFileRoute("/viagens")({
  component: Page,
  head: () => ({ meta: [
    { title: "Viagens — Ricardo Queirós" },
    { name: "description", content: "Viagens filtráveis por ano, com estatísticas por continente." },
  ]}),
});

function Page() {
  const years = Array.from(new Set(travels.map((t) => new Date(t.date).getFullYear()))).sort((a, b) => b - a);
  const [year, setYear] = useState<number | "ALL">("ALL");

  const filtered = travels
    .filter((t) => year === "ALL" || new Date(t.date).getFullYear() === year)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Estatística por continente
  const byContinent = new Map<string, Set<string>>();
  travels.forEach((t) => {
    if (!byContinent.has(t.continent)) byContinent.set(t.continent, new Set());
    byContinent.get(t.continent)!.add(t.country);
  });
  const continentStats = Array.from(byContinent.entries())
    .map(([continent, set]) => ({ continent, countries: Array.from(set).sort() }))
    .sort((a, b) => b.countries.length - a.countries.length);
  const maxCountries = Math.max(1, ...continentStats.map((c) => c.countries.length));

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">05 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Viagens</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.travels.count}</span> países
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Cada viagem é um capítulo — um registo de exploração urbana, natureza extrema e encontros
          com diferentes culturas.
        </p>

        {/* Estatística por continente */}
        <section className="mb-10 border border-border rounded-xl p-5 bg-card/40">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
            Por continente
          </h2>
          <div className="space-y-4">
            {continentStats.map((c) => (
              <div key={c.continent}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-bold">{c.continent}</span>
                  <span className="font-mono text-[10px] text-primary">{c.countries.length} país(es)</span>
                </div>
                <div className="h-2 mt-1.5 rounded bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded"
                    style={{ width: `${(c.countries.length / maxCountries) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5 font-mono">
                  {c.countries.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Year filter */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Ano:</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-widest">
            {(["ALL", ...years] as (number | "ALL")[]).map((y) => {
              const active = year === y;
              return (
                <button key={String(y)} onClick={() => setYear(y)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    active ? "bg-primary text-primary-foreground border-primary"
                           : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"}`}>
                  {y === "ALL" ? "Todos" : y}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <ItemCard
              key={t.id}
              date={t.date}
              title={`${t.country} — ${t.title}`}
              subtitle={t.subtitle}
              meta={t.meta}
              image={t.image}
              url={t.url}
              badge={{ label: t.continent, className: "text-sky-300 border-sky-400/40" }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-xs mt-8">Sem viagens neste ano.</p>
        )}
      </div>
    </div>
  );
}
