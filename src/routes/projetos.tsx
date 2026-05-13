import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, stats } from "@/data/activity";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/projetos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Projects — Ricardo Queirós" },
    { name: "description", content: "Personal and open-source projects." },
  ]}),
});

function Page() {
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">04 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Projects</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.projects.count}</span> active
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-12 text-sm md:text-base leading-relaxed">
          Software, tools and ongoing experiments — some open source, others in incubation. A space
          where research ideas take product shape.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((p) => <ItemCard key={p.id} {...p} />)}
        </div>
      </div>
    </div>
  );
}
