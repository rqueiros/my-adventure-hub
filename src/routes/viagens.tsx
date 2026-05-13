import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { travels, stats, fmtDate, type Continent } from "@/data/activity";

export const Route = createFileRoute("/viagens")({
  component: Page,
  head: () => ({ meta: [
    { title: "Travels — Ricardo Queirós" },
    { name: "description", content: "Travels filterable by year and continent." },
  ]}),
});

function Page() {
  const years = Array.from(new Set(travels.map((t) => new Date(t.date).getFullYear()))).sort((a, b) => b - a);
  const continents = Array.from(new Set(travels.map((t) => t.continent))) as Continent[];

  const [year, setYear] = useState<number | "ALL">("ALL");
  const [continent, setContinent] = useState<Continent | "ALL">("ALL");

  const filtered = travels
    .filter((t) => (year === "ALL" || new Date(t.date).getFullYear() === year))
    .filter((t) => (continent === "ALL" || t.continent === continent))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">05 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Travels</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.travels.count}</span> countries
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-8 text-sm md:text-base leading-relaxed">
          Each trip is a chapter. Filter by year and continent — a record of urban exploration,
          extreme nature and encounters with different cultures.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-6 font-mono text-[10px] uppercase tracking-widest">
          <div>
            <span className="text-muted-foreground mr-2">Year:</span>
            <div className="inline-flex flex-wrap gap-1.5">
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
          <div>
            <span className="text-muted-foreground mr-2">Continent:</span>
            <div className="inline-flex flex-wrap gap-1.5">
              {(["ALL", ...continents] as (Continent | "ALL")[]).map((c) => {
                const active = continent === c;
                return (
                  <button key={c} onClick={() => setContinent(c)}
                    className={`px-2.5 py-1 rounded border transition-colors ${
                      active ? "bg-primary text-primary-foreground border-primary"
                             : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"}`}>
                    {c === "ALL" ? "All" : c}
                  </button>
                );
              })}
            </div>
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
          <p className="text-center text-muted-foreground font-mono text-xs mt-8">No travels match the filters.</p>
        )}
      </div>
    </div>
  );
}
