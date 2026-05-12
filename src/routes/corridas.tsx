import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { running, stats } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/corridas")({
  component: Page,
  head: () => ({ meta: [
    { title: "Corridas — Ricardo Santos" },
    { name: "description", content: "Provas de running 10K, 21K e 42K." },
  ]}),
});

type Filter = "ALL" | "10K" | "21K" | "42K";

const distanceColor: Record<string, string> = {
  "10K": "text-cyan-400 border-cyan-400/40",
  "21K": "text-amber-400 border-amber-400/40",
  "42K": "text-primary border-primary/40",
};

function Page() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const sorted = [...running].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = filter === "ALL" ? sorted : sorted.filter((r) => r.meta === filter);
  const byDist = (d: string) => running.filter((r) => r.meta === d).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-12">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">06 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Corridas</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.running.count}</span> provas · LVL {stats.running.level}
            </div>
          </div>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">Provas oficiais de 10K, meia maratona e maratona.</p>
        </header>

        <section className="grid grid-cols-3 gap-4 mb-8">
          {(["10K", "21K", "42K"] as const).map((d) => (
            <div key={d} className={`bg-card/40 border ${distanceColor[d]} rounded-xl p-6 text-center`}>
              <div className={`font-mono text-3xl font-bold ${distanceColor[d].split(" ")[0]}`}>{byDist(d)}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{d}</div>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap gap-2 mb-8 font-mono text-[10px] uppercase tracking-widest">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <ItemCard
              key={r.id}
              {...r}
              badge={{ label: r.meta ?? "", className: distanceColor[r.meta ?? ""] }}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-xs mt-12">Nenhuma prova nesta distância.</p>
        )}
      </div>
    </div>
  );
}
