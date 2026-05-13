import { createFileRoute, Link } from "@tanstack/react-router";
import { events, eventKindLabel, stats, type EventKind } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/eventos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Eventos — Ricardo Queirós" },
    { name: "description", content: "Talks, seminários, workshops, conferências, podcasts, arguências e hackatons." },
  ]}),
});

const kindOrder: EventKind[] = ["talk", "seminar", "workshop", "conference", "podcast", "arguencia", "hackathon"];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">03 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Eventos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.events.count}</span> realizados
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-12 text-sm md:text-base leading-relaxed">
          Participação ativa na comunidade através de talks, seminários, workshops práticos, conferências,
          podcasts, arguências académicas e júris de concursos e hackatons. Organizados por tipologia.
        </p>

        <div className="space-y-14">
          {kindOrder.map((kind) => {
            const items = events.filter((e) => e.kind === kind).sort((a, b) => b.date.localeCompare(a.date));
            if (items.length === 0) return null;
            return (
              <section key={kind}>
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="text-xl font-bold uppercase tracking-widest border-l-2 border-primary pl-3">
                    {eventKindLabel[kind]}
                  </h2>
                  <span className="font-mono text-[10px] text-muted-foreground">{items.length} entradas</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((e) => <ItemCard key={e.id} {...e} />)}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
