import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { running, stats, fmtDate, type Distance } from "@/data/activity";

export const Route = createFileRoute("/corridas")({
  component: Page,
  head: () => ({ meta: [
    { title: "Corridas — Ricardo Queirós" },
    { name: "description", content: "Resultados de corridas de 10K, 21K e 42K desde 2016." },
  ]}),
});

type Filter = "ALL" | Distance;

const distanceColor: Record<Distance, string> = {
  "10K": "text-cyan-400 border-cyan-400/40",
  "21K": "text-amber-400 border-amber-400/40",
  "42K": "text-primary border-primary/40",
};

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [showDetails, setShowDetails] = useState(false);

  const sorted = [...running].sort((a, b) => b.date.localeCompare(a.date));
  const filteredDetail = filter === "ALL" ? sorted : sorted.filter((r) => r.distance === filter);
  const byDist = (d: Distance) => running.filter((r) => r.distance === d).length;

  // Aggregated table: rows = race name, cols = year, cells = time. Filtered by distance.
  const matrixSource = filter === "ALL" ? running : running.filter((r) => r.distance === filter);
  const raceNames = Array.from(new Set(matrixSource.map((r) => r.title))).sort();
  const years = Array.from(new Set(matrixSource.map((r) => r.year))).sort((a, b) => b - a);
  const cell = (race: string, year: number) => {
    const matches = matrixSource.filter((r) => r.title === race && r.year === year);
    if (matches.length === 0) return null;
    return matches.map((m) => m.time).join(" · ");
  };
  const distanceForRace = (race: string): Distance =>
    matrixSource.find((r) => r.title === race)!.distance;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">06 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Corridas</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.running.count}</span> corridas
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Histórico oficial de corridas de 10K, meia maratona (21K) e maratona (42K) desde 2016. Correr como
          disciplina paralela à escrita: foco, ritmo e progressão mensurável ano após ano.
        </p>

        <section className="grid grid-cols-3 gap-4 mb-8">
          {(["10K", "21K", "42K"] as const).map((d) => (
            <div key={d} className={`bg-card/40 border ${distanceColor[d]} rounded-xl p-6 text-center`}>
              <div className={`font-mono text-3xl font-bold ${distanceColor[d].split(" ")[0]}`}>{byDist(d)}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{d}</div>
            </div>
          ))}
        </section>

        {/* Distance filter — promoted to top, controls both tables */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Distância:</span>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
            {(["ALL", "10K", "21K", "42K"] as Filter[]).map((f) => {
              const active = filter === f;
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
                  {f === "ALL" ? "Todas" : f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Aggregated matrix — primary view */}
        <section className="mb-10">
          <h2 className="text-xl font-bold uppercase tracking-widest border-l-2 border-primary pl-3 mb-5">
            Tempos por corrida / ano
          </h2>
          <div className="border border-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Race</th>
                  <th className="text-center px-3 py-3 w-16">Dist.</th>
                  {years.map((y) => (
                    <th key={y} className="text-center px-4 py-3">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {raceNames.map((race) => {
                  const d = distanceForRace(race);
                  return (
                    <tr key={race} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium">{race}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border rounded ${distanceColor[d]}`}>{d}</span>
                      </td>
                      {years.map((y) => {
                        const c = cell(race, y);
                        return (
                          <td key={y} className="px-4 py-3 text-center font-mono text-xs">
                            {c ? <span className="text-primary">{c}</span> : <span className="text-muted-foreground/40">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed table — collapsed by default */}
        <section>
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-xl font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <span>Detailed log ({filteredDetail.length} races)</span>
            <span>{showDetails ? "− Hide" : "+ Show"}</span>
          </button>

          {showDetails && (
            <div className="mt-4 border border-border rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="text-left px-4 py-3 w-28">Date</th>
                    <th className="text-left px-4 py-3">Race</th>
                    <th className="text-center px-3 py-3 w-16">Dist.</th>
                    <th className="text-right px-4 py-3 w-24">Time</th>
                    <th className="text-right px-4 py-3 w-20">Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDetail.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">{fmtDate(r.date)}</td>
                      <td className="px-4 py-3 font-medium">{r.title}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border rounded ${distanceColor[r.distance]}`}>
                          {r.distance}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-primary">{r.time}</td>
                      <td className="px-4 py-3 text-right">
                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                          Open <ExternalLink className="size-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
