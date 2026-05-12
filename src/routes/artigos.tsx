import { createFileRoute, Link } from "@tanstack/react-router";
import { articles, fmtDate, stats } from "@/data/activity";

export const Route = createFileRoute("/artigos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Artigos — Ricardo Santos" },
    { name: "description", content: "Artigos e ensaios publicados." },
  ]}),
});

function Page() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-12">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">02 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Artigos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.articles.count}</span> publicados · LVL {stats.articles.level}
            </div>
          </div>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">Ensaios e colunas em jornais e plataformas independentes.</p>
        </header>

        <div className="divide-y divide-border border-y border-border">
          {sorted.map((a) => (
            <article key={a.id} className="py-6 grid grid-cols-12 gap-4 items-start">
              <span className="col-span-12 sm:col-span-2 font-mono text-[10px] text-muted-foreground tracking-widest pt-1">{fmtDate(a.date)}</span>
              <div className="col-span-12 sm:col-span-7">
                <h2 className="text-xl font-bold">{a.title}</h2>
                {a.subtitle && <p className="text-sm text-muted-foreground mt-1">{a.subtitle}</p>}
                {a.meta && <p className="text-xs text-muted-foreground mt-2 font-mono">{a.meta}</p>}
              </div>
              <span className="col-span-12 sm:col-span-3 sm:text-right font-mono text-[10px] text-primary">+{a.xp} XP</span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
