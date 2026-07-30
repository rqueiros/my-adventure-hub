import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { travels, stats, fmtDate } from "@/data/activity";

export const Route = createFileRoute("/viagens")({
  component: Page,
  head: () => ({ meta: [
    { title: "Viagens — Ricardo Queirós" },
    { name: "description", content: "Viagens filtráveis por ano, com destaque para as últimas viagens realizadas." },
  ]}),
});

function Page() {
  const years = Array.from(new Set(travels.map((t) => new Date(t.date).getFullYear()))).sort((a, b) => b - a);
  const [year, setYear] = useState<number | "ALL">("ALL");

  const filtered = travels
    .filter((t) => year === "ALL" || new Date(t.date).getFullYear() === year)
    .sort((a, b) => b.date.localeCompare(a.date));

  const latest = [...travels].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);


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
          com diferentes culturas. Filtre por ano para focar uma temporada.
        </p>

        {/* Últimas 3 viagens em destaque */}
        <section className="mb-10">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Últimas viagens
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {latest.map((t) => (
              <a
                key={t.id}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border rounded-xl overflow-hidden bg-card/40 hover:border-primary/60 transition-colors flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-white/5">
                  <img src={t.image} alt={t.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{fmtDate(t.date)}</span>
                  <h3 className="text-base font-bold leading-tight mt-1">{t.country} — {t.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{t.continent}{t.meta ? ` // ${t.meta}` : ""}</p>
                </div>
              </a>
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

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-3 sm:px-4 py-3 w-20 sm:w-28 hidden sm:table-cell">Foto</th>
                <th className="text-left px-3 sm:px-4 py-3 w-24 sm:w-28">Data</th>
                <th className="text-left px-3 sm:px-4 py-3">Destino</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Continente</th>
                <th className="text-left px-4 py-3 hidden md:table-cell w-24">Duração</th>
                <th className="text-right px-3 sm:px-4 py-3 w-16 sm:w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                    <img src={t.image} alt={t.title} loading="lazy"
                      className="w-24 h-16 object-cover rounded ring-1 ring-white/10" />
                  </td>
                  <td className="px-3 sm:px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    {fmtDate(t.date)}
                  </td>
                  <td className="px-3 sm:px-4 py-3 font-medium">
                    {t.country} — {t.title}
                    {t.subtitle && <div className="text-[10px] text-muted-foreground mt-0.5">{t.subtitle}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{t.continent}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell font-mono text-[11px]">{t.meta}</td>
                  <td className="px-3 sm:px-4 py-3 text-right">
                    <a href={t.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                      <span className="hidden sm:inline">Aceder</span> <ExternalLink className="size-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-xs mt-8">Sem viagens neste ano.</p>
        )}
      </div>
    </div>
  );
}
