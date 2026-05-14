import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Twitter, Linkedin, Github, Youtube, Mail } from "lucide-react";
import { facetMeta, facetData, stats, profile, upcoming, opinion, fmtDate, type Facet } from "@/data/activity";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Ricardo Queirós — Professor, Researcher, Writer & Runner" },
      { name: "description", content: "Personal dashboard of books, articles, opinion, events, projects, travels, running and academic service." },
    ],
  }),
});

const facetOrder: Facet[] = ["books", "articles", "opinion", "events", "projects", "travels", "running", "others"];

const socialLinks = [
  { href: profile.socials.twitter,  Icon: Twitter,  label: "Twitter" },
  { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: profile.socials.github,   Icon: Github,   label: "GitHub" },
  { href: profile.socials.youtube,  Icon: Youtube,  label: "YouTube" },
  { href: profile.socials.email,    Icon: Mail,     label: "Email" },
];

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
  const latestOpinion = [...opinion].sort((a, b) => b.date.localeCompare(a.date))[0];
  const nextUp = upcomingSorted()[0];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      {/* Top bar with social icons */}
      <div className="max-w-7xl mx-auto flex justify-end gap-2 mb-6">
        {socialLinks.map(({ href, Icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="size-9 rounded-full border border-border bg-card/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors">
            <Icon className="size-4" />
          </a>
        ))}
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 animate-fade-up">
        <div className="flex flex-col md:flex-row items-start gap-8 border-b border-border pb-12">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="size-32 md:size-40 rounded-2xl object-cover ring-1 ring-white/10 shrink-0"
          />
          <div className="flex-1 space-y-4 w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">{profile.name}</h1>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{profile.title}</p>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-3xl">
              {profile.bio}
            </p>
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

      <main className="max-w-7xl mx-auto space-y-20">
        {/* Aggregated Facet Tiles */}
        <section>
          <div className="flex items-center gap-4 border-l-2 border-primary pl-4 mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">Overview</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {facetOrder.map((f, i) => {
              const m = facetMeta[f];
              const s = stats[f];
              const Icon = m.icon;
              return (
                <Link
                  key={f}
                  to={m.path}
                  className={`animate-fade-up group relative overflow-hidden border ${m.border} ${m.bg} hover:bg-opacity-30 p-5 rounded-xl transition-all hover:scale-[1.02]`}
                  style={{ animationDelay: `${100 + i * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`size-6 ${m.color}`} strokeWidth={1.5} />
                    <span className="font-mono text-[9px] text-muted-foreground tracking-widest">
                      {m.code}
                    </span>
                  </div>
                  <div className={`text-4xl font-extrabold mb-1 ${m.color}`}>{s.count}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">{m.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{m.unit}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Highlight: latest opinion + next event */}
        <section className="grid lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: "400ms" }}>
          {latestOpinion && (
            <a
              href={latestOpinion.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-rose-400/40 bg-card/40 hover:border-rose-400 transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={latestOpinion.image} alt={latestOpinion.title} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-rose-400 text-rose-950 px-2 py-1 rounded">
                ▸ LATEST OP-ED · {latestOpinion.magazine}
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">{fmtDate(latestOpinion.date)}</div>
                <h3 className="text-2xl font-bold">{latestOpinion.title}</h3>
                {latestOpinion.subtitle && <p className="text-sm text-muted-foreground mt-1">{latestOpinion.subtitle}</p>}
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
                ◇ NEXT · {facetMeta[nextUp.facet].label}
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">{fmtDate(nextUp.date)}</div>
                <h3 className="text-2xl font-bold text-white/90">{nextUp.title}</h3>
                {nextUp.meta && <p className="text-sm text-muted-foreground mt-1">{nextUp.meta}</p>}
              </div>
            </a>
          )}
        </section>

        {/* Activity panels */}
        <section className="grid lg:grid-cols-2 gap-12">
          <div className="animate-fade-up space-y-6" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center gap-4 border-l-2 border-primary pl-4">
              <h2 className="text-xl font-bold uppercase tracking-widest">Latest per Facet</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="divide-y divide-border border-y border-border">
              {latestPerFacet().map(({ facet, item }) => {
                const m = facetMeta[facet];
                const Icon = m.icon;
                return (
                  <Link
                    key={facet}
                    to={m.path}
                    className="py-3 grid grid-cols-12 gap-3 items-center hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded"
                  >
                    <span className={`col-span-3 flex items-center gap-2 font-mono text-[10px] tracking-widest ${m.color}`}>
                      <Icon className="size-3.5" /> {m.label}
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

          <div className="animate-fade-up space-y-6" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center gap-4 border-l-2 border-white/20 pl-4">
              <h2 className="text-xl font-bold uppercase tracking-widest text-muted-foreground">
                Upcoming Activity
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="divide-y divide-border border-y border-border">
              {upcomingSorted().map((u) => {
                const m = facetMeta[u.facet];
                const Icon = m.icon;
                return (
                  <Link
                    key={u.id}
                    to={m.path}
                    className="py-3 grid grid-cols-12 gap-3 items-center hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded"
                  >
                    <span className={`col-span-3 flex items-center gap-2 font-mono text-[10px] tracking-widest ${m.color}`}>
                      <Icon className="size-3.5" /> {m.label}
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
