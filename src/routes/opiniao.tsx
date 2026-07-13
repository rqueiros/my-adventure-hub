import { createFileRoute, Link } from "@tanstack/react-router";
import { opinion, stats } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/opiniao")({
  component: Page,
  head: () => ({ meta: [
    { title: "Opinião — Ricardo Queirós" },
    { name: "description", content: "Artigos de opinião, crónicas e ensaios na imprensa portuguesa." },
  ]}),
});

function Page() {
  const sorted = [...opinion].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">07 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Opinião</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.opinion.count}</span> artigos
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-12 text-sm md:text-base leading-relaxed">
          Artigos de opinião, crónicas e ensaios publicados em jornais e revistas portuguesas —
          educação digital, tecnologia, cultura e sociedade.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((o) => (
            <ItemCard
              key={o.id}
              date={o.date}
              title={o.title}
              subtitle={o.subtitle}
              image={o.image}
              url={o.url}
              badge={{ label: o.magazine, className: "text-rose-300 border-rose-400/40" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
