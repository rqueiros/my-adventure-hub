import { createFileRoute, Link } from "@tanstack/react-router";
import { travels, stats } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/viagens")({
  component: Page,
  head: () => ({ meta: [
    { title: "Viagens — Ricardo Queirós" },
    { name: "description", content: "Viagens organizadas por ano e por continente." },
  ]}),
});

function Page() {
  // Group by year (desc), then by continent
  const years = Array.from(new Set(travels.map((t) => new Date(t.date).getFullYear())))
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">05 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Viagens</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.travels.count}</span> países
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-12 text-sm md:text-base leading-relaxed">
          Cada viagem é um capítulo. Organizadas por ano e agrupadas por continente, refletem o gosto
          pela exploração urbana, pela natureza extrema e pelo encontro com culturas diferentes.
        </p>

        <div className="space-y-16">
          {years.map((year) => {
            const yearItems = travels.filter((t) => new Date(t.date).getFullYear() === year);
            const continents = Array.from(new Set(yearItems.map((t) => t.continent)));
            return (
              <section key={year}>
                <h2 className="text-3xl font-extrabold tracking-tight mb-6 border-b border-border pb-3 font-mono">
                  {year}
                </h2>
                <div className="space-y-10">
                  {continents.map((c) => {
                    const items = yearItems.filter((t) => t.continent === c)
                      .sort((a, b) => b.date.localeCompare(a.date));
                    return (
                      <div key={c}>
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
                          ▸ {c}
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {items.map((t) => (
                            <ItemCard key={t.id} {...t} title={`${t.country} — ${t.title}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
