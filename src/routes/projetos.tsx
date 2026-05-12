import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, fmtDate, stats } from "@/data/activity";

export const Route = createFileRoute("/projetos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Projetos — Ricardo Santos" },
    { name: "description", content: "Projetos pessoais e open source." },
  ]}),
});

function Page() {
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-12">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">04 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Projetos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.projects.count}</span> ativos · LVL {stats.projects.level}
            </div>
          </div>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">Software, ferramentas e experimentos em curso.</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          {sorted.map((p) => (
            <article key={p.id} className="bg-card/40 border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{fmtDate(p.date)}</span>
                <span className="font-mono text-[10px] text-primary">+{p.xp} XP</span>
              </div>
              <h2 className="text-xl font-bold">{p.title}</h2>
              {p.subtitle && <p className="text-sm text-muted-foreground mt-1">{p.subtitle}</p>}
              {p.meta && <p className="text-xs text-muted-foreground mt-3 font-mono">// {p.meta}</p>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
