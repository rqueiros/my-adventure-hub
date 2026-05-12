import { createFileRoute, Link } from "@tanstack/react-router";
import { books, fmtDate, stats } from "@/data/activity";

export const Route = createFileRoute("/livros")({
  component: Page,
  head: () => ({ meta: [
    { title: "Livros — Ricardo Santos" },
    { name: "description", content: "Catálogo de livros publicados." },
  ]}),
});

function Page() {
  const sorted = [...books].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-12">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">01 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Livros</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.books.count}</span> publicados · LVL {stats.books.level}
            </div>
          </div>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">Obras escritas, da ficção ao ensaio.</p>
        </header>

        <div className="divide-y divide-border border-y border-border">
          {sorted.map((b) => (
            <article key={b.id} className="py-6 grid grid-cols-12 gap-4 items-start">
              <span className="col-span-12 sm:col-span-2 font-mono text-[10px] text-muted-foreground tracking-widest pt-1">{fmtDate(b.date)}</span>
              <div className="col-span-12 sm:col-span-7">
                <h2 className="text-xl font-bold">{b.title}</h2>
                {b.subtitle && <p className="text-sm text-muted-foreground mt-1">{b.subtitle}</p>}
                {b.meta && <p className="text-xs text-muted-foreground mt-2 font-mono">{b.meta}</p>}
              </div>
              <span className="col-span-12 sm:col-span-3 sm:text-right font-mono text-[10px] text-primary">+{b.xp} XP</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
