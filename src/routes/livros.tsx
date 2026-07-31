import { createFileRoute, Link } from "@tanstack/react-router";
import { books, stats } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/livros")({
  component: Page,
  head: () => ({ meta: [
    { title: "Livros — Ricardo Queirós" },
    { name: "description", content: "Catálogo de livros publicados." },
  ]}),
});

function Page() {
  const sorted = [...books].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">01 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Livros</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.books.count}</span> publicados
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-10 text-sm md:text-base leading-relaxed">
          Obras originais entre o ensaio técnico e a divulgação científica. Cada livro é o resultado de
          anos de investigação e prática, traduzidos numa linguagem acessível a estudantes, professores
          e curiosos.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((b) => (
            <ItemCard
              key={b.id}
              date={b.date}
              title={b.title}
              subtitle={b.subtitle}
              meta={b.meta}
              image={b.image}
              url={b.url}
              badge={b.publisher ? { label: b.publisher, className: "text-amber-300 border-amber-400/40" } : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
