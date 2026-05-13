import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { facetMeta, facetData, stats, profile, upcoming, fmtDate, type Facet } from "@/data/activity";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Ricardo Queirós — Professor, Researcher, Writer & Runner" },
      { name: "description", content: "Painel pessoal com livros, artigos, eventos, projetos, viagens e corridas." },
    ],
  }),
});

const facetOrder: Facet[] = ["books", "articles", "events", "projects", "travels", "running"];

function latestPerFacet() {
  return facetOrder.map((f) => {
    const item = [...facetData[f]].sort((a, b) => b.date.localeCompare(a.date))[0];
    return { facet: f, item };
  });
}

function upcomingSorted() {
  const now = Date.now();
  return [...upcoming]
    .filter((u) => new Date(u.date).getTime() >= now - 1000 * 60 * 60 * 24)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-16 animate-fade-up">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 border-b border-border pb-12">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="size-32 md:size-40 rounded-2xl object-cover ring-1 ring-white/10"
          />
          <div className="flex-1 space-y-3 w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">{profile.name}</h1>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{profile.title}</p>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
            >
              www.ricardoqueiros.com <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-24">
        {/* Highlight: latest + next */}
        {(() => {
          const allLatest = facetOrder
            .map((f) => ({ facet: f, item: [...facetData[f]].sort((a, b) => b.date.localeCompare(a.date))[0] }))
            .sort((a, b) => b.item.date.localeCompare(a.item.date))[0];
          const nextUp = upcomingSorted()[0];
          return (
            <section className="grid lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
              {allLatest && (
                <a
                  href={allLatest.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-primary/40 bg-card/40 hover:border-primary transition-colors"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={allLatest.item.image} alt={allLatest.item.title} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded">
                    ▸ ÚLTIMA · {facetMeta[allLatest.facet].label}
                  </div>
                  <div className="p-6">
                    <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">{fmtDate(allLatest.item.date)}</div>
                    <h3 className="text-2xl font-bold">{allLatest.item.title}</h3>
                    {allLatest.item.subtitle && <p className="text-sm text-muted-foreground mt-1">{allLatest.item.subtitle}</p>}
                  </div>
                </a>
              )}
              {nextUp && (
                <a
                  href={nextUp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 hover:border-primary/60 transition-colors"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={nextUp.image} alt={nextUp.title} loading="lazy"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-white/10 backdrop-blur text-white border border-white/20 px-2 py-1 rounded">
                    ◇ PRÓXIMA · {facetMeta[nextUp.facet].label}
                  </div>
                  <div className="p-6">
                    <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">{fmtDate(nextUp.date)}</div>
                    <h3 className="text-2xl font-bold text-white/90">{nextUp.title}</h3>
                    {nextUp.meta && <p className="text-sm text-muted-foreground mt-1">{nextUp.meta}</p>}
                  </div>
                </a>
              )}
            </section>
          );
        })()}

        {/* Facet Tiles */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facetOrder.map((f, i) => {
            const m = facetMeta[f];
            const s = stats[f];
            return (
              <Link
                key={f}
                to={m.path}
                className="animate-fade-up group bg-card/40 border border-border p-6 rounded-xl hover:border-primary/60 transition-all"
                style={{ animationDelay: `${100 + i * 50}ms` }}
              >
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-4">
                  {m.code} // {m.label}
                </span>
                <div className="text-3xl font-bold mb-1 group-hover:text-primary transition-colors">{s.count}</div>
                <div className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{m.unit}</div>
              </Link>
            );
          })}
        </section>

        {/* Activity panels */}
        <section className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-up space-y-8" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center gap-4 border-l-2 border-primary pl-4">
              <h2 className="text-xl font-bold uppercase tracking-widest">Última Atividade</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="divide-y divide-border border-y border-border">
              {latestPerFacet().map(({ facet, item }) => {
                const m = facetMeta[facet];
                return (
                  <Link
                    key={facet}
                    to={m.path}
                    className="py-4 grid grid-cols-12 gap-3 items-center hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded"
                  >
                    <span className="col-span-3 font-mono text-[10px] text-muted-foreground tracking-widest">
                      [{m.label}]
                    </span>
                    <span className="col-span-7 font-bold truncate">{item.title}</span>
                    <span className="col-span-2 text-right font-mono text-[10px] text-muted-foreground">
                      {fmtDate(item.date)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="animate-fade-up space-y-8" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center gap-4 border-l-2 border-white/20 pl-4">
              <h2 className="text-xl font-bold uppercase tracking-widest text-muted-foreground">
                Próximas Atividades
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="divide-y divide-border border-y border-border">
              {upcomingSorted().map((u) => {
                const m = facetMeta[u.facet];
                return (
                  <Link
                    key={u.id}
                    to={m.path}
                    className="py-4 grid grid-cols-12 gap-3 items-center hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded"
                  >
                    <span className="col-span-3 font-mono text-[10px] text-muted-foreground tracking-widest">
                      [{m.label}]
                    </span>
                    <span className="col-span-7 font-bold text-white/80 truncate">{u.title}</span>
                    <span className="col-span-2 text-right font-mono text-[10px] text-muted-foreground">
                      {fmtDate(u.date)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
