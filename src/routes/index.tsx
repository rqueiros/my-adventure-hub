import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Twitter, Linkedin, Github, Youtube, Mail } from "lucide-react";
import { facetMeta, stats, profile, upcoming, opinion, fmtDate, type Facet } from "@/data/activity";
import { fetchOrcidWorks } from "@/lib/orcid";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Ricardo Queirós — Professor, Researcher, Writer & Runner" },
      { name: "description", content: "Personal dashboard of books, articles, opinion, events, projects, travels, running and academic service." },
    ],
  }),
});

// Alphabetical, "others" pinned last
const facetOrder: Facet[] = (
  ["books", "articles", "events", "opinion", "projects", "running", "travels"] as Facet[]
).sort((a, b) => facetMeta[a].label.localeCompare(facetMeta[b].label)).concat("others");

const socialLinks = [
  { href: profile.socials.twitter,  Icon: Twitter,  label: "Twitter" },
  { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: profile.socials.github,   Icon: Github,   label: "GitHub" },
  { href: profile.socials.youtube,  Icon: Youtube,  label: "YouTube" },
  { href: profile.socials.email,    Icon: Mail,     label: "Email" },
];

function upcomingSorted() {
  const now = Date.now();
  return [...upcoming]
    .filter((u) => new Date(u.date).getTime() >= now - 1000 * 60 * 60 * 24)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function ArticlesCount({ fallback }: { fallback: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orcid-works", profile.orcid],
    queryFn: () => fetchOrcidWorks(profile.orcid),
    staleTime: 60 * 60 * 1000,
  });
  if (isLoading) return <>…</>;
  if (isError || !data) return <>{fallback}</>;
  return <>{data.length}</>;
}

function Dashboard() {
  const latestOpinion = [...opinion].sort((a, b) => b.date.localeCompare(a.date))[0];
  const upcomingList = upcomingSorted();

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

      <main className="max-w-7xl mx-auto space-y-16">
        {/* Featured Op-Ed (above the count tiles) */}
        {latestOpinion && (
          <section className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-4 border-l-2 border-rose-400 pl-4 mb-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">Latest Op-Ed</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Link
              to="/opiniao/$id"
              params={{ id: latestOpinion.id }}
              className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-rose-400/30 bg-rose-400/[0.04] hover:bg-rose-400/[0.08] hover:border-rose-400/60 transition-colors"
            >
              <img
                src={latestOpinion.image}
                alt={latestOpinion.title}
                loading="lazy"
                className="w-full sm:w-44 h-32 sm:h-28 object-cover rounded-lg ring-1 ring-white/10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-400 mb-2">
                  {latestOpinion.magazine} · {fmtDate(latestOpinion.date)}
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-rose-200 transition-colors">
                  {latestOpinion.title}
                </h3>
                {latestOpinion.subtitle && (
                  <p className="text-sm text-muted-foreground mt-1">{latestOpinion.subtitle}</p>
                )}
                <span className="inline-flex items-center gap-1 mt-3 font-mono text-[10px] uppercase tracking-widest text-rose-400 group-hover:underline">
                  Read full piece →
                </span>
              </div>
            </Link>
          </section>
        )}

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
                  style={{ animationDelay: `${200 + i * 40}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`size-6 ${m.color}`} strokeWidth={1.5} />
                    <span className="font-mono text-[9px] text-muted-foreground tracking-widest">
                      {m.code}
                    </span>
                  </div>
                  <div className={`text-4xl font-extrabold mb-1 ${m.color}`}>
                    {f === "articles" ? <ArticlesCount fallback={s.count} /> : s.count}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">{m.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{m.unit}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Charts */}
        <section className="animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center gap-4 border-l-2 border-primary/60 pl-4 mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">Insights</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TimelineChart />
            <FacetDonut />
            <MonthlyHeatmap />
          </div>
        </section>


        {/* Upcoming activity with image column */}
        <section className="animate-fade-up" style={{ animationDelay: "500ms" }}>
          <div className="flex items-center gap-4 border-l-2 border-white/20 pl-4 mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-muted-foreground">
              Upcoming Activity
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 w-24">Image</th>
                  <th className="text-left px-4 py-3 w-28">Date</th>
                  <th className="text-left px-4 py-3 w-32">Facet</th>
                  <th className="text-left px-4 py-3">Title</th>
                  <th className="text-right px-4 py-3 w-20">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {upcomingList.map((u) => {
                  const m = facetMeta[u.facet];
                  const Icon = m.icon;
                  return (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <img src={u.image} alt={u.title} loading="lazy"
                          className="w-20 h-14 object-cover rounded ring-1 ring-white/10" />
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                        {fmtDate(u.date)}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={m.path} className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest ${m.color} hover:underline`}>
                          <Icon className="size-3" /> {m.label}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium text-white/90">
                        {u.title}
                        {u.meta && <div className="text-[10px] text-muted-foreground mt-0.5">{u.meta}</div>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a href={u.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                          Open <ExternalLink className="size-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
                {upcomingList.length === 0 && (
                  <tr><td colSpan={5} className="text-center text-muted-foreground py-8 font-mono text-xs">Nothing scheduled.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
