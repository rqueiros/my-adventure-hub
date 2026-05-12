import { createFileRoute, Link } from "@tanstack/react-router";
import { facetMeta, facetData, stats, profile, upcoming, fmtDate, type Facet } from "@/data/activity";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Ricardo Santos" },
      { name: "description", content: "HUD pessoal: livros, artigos, eventos, projetos, viagens e corridas num só painel." },
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
  const xpPct = Math.round((profile.xp / profile.xpNext) * 100);
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-16 animate-fade-up">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 border-b border-border pb-12">
          <div className="relative">
            <div className="size-32 md:size-40 bg-card rounded-2xl ring-1 ring-white/10 grid place-items-center">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Avatar</span>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground font-mono font-bold px-3 py-1 rounded text-sm shadow-xl">
              LVL {profile.level}
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">{profile.name}</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-border">
                <div className="size-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-tighter uppercase">
                  🔥 {profile.streakDays} dias streak
                </span>
              </div>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{profile.title}</p>
            <div className="w-full max-w-2xl">
              <div className="flex justify-between font-mono text-xs uppercase mb-2 tracking-widest">
                <span className="text-muted-foreground">XP Progress</span>
                <span className="text-primary font-bold">
                  {profile.xp.toLocaleString("pt-PT")} / {profile.xpNext.toLocaleString("pt-PT")} XP
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-bar" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-24">
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
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                    {m.code} // {m.label}
                  </span>
                  <span className="font-mono text-[10px] text-primary">L{s.level}</span>
                </div>
                <div className="text-3xl font-bold mb-1 group-hover:text-primary transition-colors">{s.count}</div>
                <div className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mb-3">{m.unit}</div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/70" style={{ width: `${s.progress}%` }} />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Activity panels */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Latest */}
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
                    <span className="col-span-2 text-right font-mono text-[10px] text-primary">
                      {item.xp ? `+${item.xp} XP` : fmtDate(item.date)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Upcoming */}
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

        {/* Achievements */}
        <section className="pb-12">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center">
            Conquistas Desbloqueadas
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "42K", unlocked: true },
              { label: "AUTOR", unlocked: true },
              { label: "GLOBO", unlocked: true },
              { label: "PROJ", unlocked: false },
              { label: "100D", unlocked: true },
              { label: "TALK", unlocked: false },
            ].map((b) => (
              <div
                key={b.label}
                className={`size-16 rounded-full border flex items-center justify-center transition-all ${
                  b.unlocked
                    ? "border-primary/40 bg-primary/5 text-primary"
                    : "border-border text-muted-foreground opacity-40"
                }`}
              >
                <span className="font-bold text-xs tracking-tighter">{b.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
