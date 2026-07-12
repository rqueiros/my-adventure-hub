import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { travels, stats, fmtDate } from "@/data/activity";

export const Route = createFileRoute("/viagens")({
  component: Page,
  head: () => ({ meta: [
    { title: "Viagens — Ricardo Queirós" },
    { name: "description", content: "Viagens filtráveis por ano, com um mapa-mundo dos países visitados." },
  ]}),
});

// Equirectangular projection helper
const MAP_W = 1000;
const MAP_H = 500;
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * MAP_W,
  y: ((90 - lat) / 180) * MAP_H,
});

function Page() {
  const years = Array.from(new Set(travels.map((t) => new Date(t.date).getFullYear()))).sort((a, b) => b - a);
  const [year, setYear] = useState<number | "ALL">("ALL");

  const filtered = travels
    .filter((t) => year === "ALL" || new Date(t.date).getFullYear() === year)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Map shows all visited countries (unique), highlighting the filtered year
  const filteredIds = new Set(filtered.map((t) => t.id));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
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

        {/* World map — smaller, with country outlines */}
        <section className="mb-10 flex justify-center">
          <div className="relative border border-border rounded-xl overflow-hidden bg-slate-950 w-full max-w-3xl">
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="relative w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
              {/* Ocean */}
              <rect x="0" y="0" width={MAP_W} height={MAP_H} className="fill-slate-900" />
              {/* Continent outlines (equirectangular) */}
              <image
                href="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
                x="0" y="0" width={MAP_W} height={MAP_H}
                preserveAspectRatio="none"
                opacity={0.35}
              />
              {/* Latitude / longitude grid */}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  x2={MAP_W}
                  y1={(i * MAP_H) / 10}
                  y2={(i * MAP_H) / 10}
                  className="stroke-slate-500/25"
                  strokeWidth={0.5}
                />
              ))}
              {Array.from({ length: 19 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  y1={0}
                  y2={MAP_H}
                  x1={(i * MAP_W) / 18}
                  x2={(i * MAP_W) / 18}
                  className="stroke-slate-500/25"
                  strokeWidth={0.5}
                />
              ))}
              {/* Equator */}
              <line x1={0} x2={MAP_W} y1={MAP_H / 2} y2={MAP_H / 2} className="stroke-slate-400/40" strokeWidth={0.8} />
              {/* Country dots */}
              {travels.map((t) => {
                const { x, y } = project(t.lat, t.lng);
                const active = filteredIds.has(t.id);
                return (
                  <g key={t.id} className={active ? "" : "opacity-40"}>
                    <circle cx={x} cy={y} r={active ? 11 : 6} className="fill-sky-400/25" />
                    <circle cx={x} cy={y} r={active ? 4.5 : 3} className="fill-sky-400" />
                    <text
                      x={x + 8}
                      y={y - 8}
                      className="fill-sky-100 font-mono"
                      style={{ fontSize: "10px", paintOrder: "stroke", stroke: "rgba(0,0,0,0.85)", strokeWidth: 3 }}
                    >
                      {t.country}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-background/60 px-2 py-1 rounded">
              {filtered.length}/{travels.length} destacadas
            </div>
          </div>
        </section>

        {/* Year filter */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Year:</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-widest">
            {(["ALL", ...years] as (number | "ALL")[]).map((y) => {
              const active = year === y;
              return (
                <button key={String(y)} onClick={() => setYear(y)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    active ? "bg-primary text-primary-foreground border-primary"
                           : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"}`}>
                  {y === "ALL" ? "All" : y}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-28">Photo</th>
                <th className="text-left px-4 py-3 w-28">Date</th>
                <th className="text-left px-4 py-3">Destination</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Continent</th>
                <th className="text-left px-4 py-3 hidden md:table-cell w-24">Duration</th>
                <th className="text-right px-4 py-3 w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <img src={t.image} alt={t.title} loading="lazy"
                      className="w-24 h-16 object-cover rounded ring-1 ring-white/10" />
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    {fmtDate(t.date)}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {t.country} — {t.title}
                    {t.subtitle && <div className="text-[10px] text-muted-foreground mt-0.5">{t.subtitle}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{t.continent}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell font-mono text-[11px]">{t.meta}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={t.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                      Open <ExternalLink className="size-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-xs mt-8">No travels this year.</p>
        )}
      </div>
    </div>
  );
}
