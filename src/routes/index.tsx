import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Facebook, Instagram, Linkedin, Github, Mail, Rss, Send } from "lucide-react";
import { facetMeta, stats, profile, upcoming, opinion, events, fmtDate, type Facet } from "@/data/activity";
import { fetchOrcidWorks } from "@/lib/orcid";


export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Ricardo Queirós — Professor, Investigador, Escritor & Corredor" },
      { name: "description", content: "Painel pessoal de livros, artigos, opinião, eventos, projetos, viagens, corridas e serviço académico." },
    ],
  }),
});

// Alphabetical, "others" pinned last
const facetOrder: Facet[] = (
  ["books", "articles", "events", "opinion", "projects", "running", "travels"] as Facet[]
).sort((a, b) => facetMeta[a].label.localeCompare(facetMeta[b].label)).concat("others");

const CONTACT_EMAIL = "ricardo.queiros@gmail.com";

const socialLinks = [
  { href: "https://www.facebook.com/rapqueiros", Icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/rqueiros09/", Icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/in/rqueiros/", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/rqueiros", Icon: Github, label: "GitHub" },
  { href: `mailto:${CONTACT_EMAIL}`, Icon: Mail, label: "Email" },
  { href: "/feed.xml", Icon: Rss, label: "RSS — Opinion" },
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
  const lastEvents = [...events].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const eMeta = facetMeta.events;
  const oMeta = facetMeta.opinion;

  type FeatCard = {
    key: string;
    kind: "opinion" | "event";
    title: string;
    subtitle?: string;
    image: string;
    date: string;
    label: string;
    to?: string;
    params?: Record<string, string>;
    href?: string;
    border: string;
    bg: string;
    color: string;
  };

  const featureCards: FeatCard[] = [];
  if (latestOpinion) {
    featureCards.push({
      key: "op-" + latestOpinion.id,
      kind: "opinion",
      title: latestOpinion.title,
      subtitle: latestOpinion.subtitle,
      image: latestOpinion.image,
      date: latestOpinion.date,
      label: `Último artigo · ${latestOpinion.magazine}`,
      to: "/opiniao/$id",
      params: { id: latestOpinion.id },
      border: oMeta.border,
      bg: oMeta.bg,
      color: oMeta.color,
    });
  }
  for (const ev of lastEvents) {
    featureCards.push({
      key: "ev-" + ev.id,
      kind: "event",
      title: ev.title,
      subtitle: ev.subtitle,
      image: ev.image,
      date: ev.date,
      label: `Evento · ${ev.kind}`,
      href: ev.url,
      border: eMeta.border,
      bg: eMeta.bg,
      color: eMeta.color,
    });
  }

  const upcomingList = upcomingSorted();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 pb-32">
      {/* Top bar with social icons */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-end gap-2 mb-6">
        {socialLinks.map(({ href, Icon, label }) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={label}
            className="size-9 rounded-full border border-border bg-card/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors">
            <Icon className="size-4" />
          </a>
        ))}
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 animate-fade-up">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 pb-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="size-24 sm:size-32 md:size-40 rounded-2xl object-cover ring-1 ring-white/10 shrink-0"
          />
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight uppercase break-words">{profile.name}</h1>
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">{profile.title}</p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {profile.bio}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline break-all"
                >
                  <Mail className="size-3 shrink-0" /> {CONTACT_EMAIL}
                </a>
              </div>
              <Link
                to="/contacto"
                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Send className="size-3.5" /> Pedir formação/workshop
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-16">
        {/* Overview (moved up) */}
        <section className="animate-fade-up">
          <div className="flex items-center gap-4 border-l-2 border-primary pl-4 mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">Visão geral</h2>
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
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`size-6 ${m.color}`} strokeWidth={1.5} />
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

        

        {/* Featured: latest op-ed + 3 last events, 2 per row */}
        {featureCards.length > 0 && (
          <section className="animate-fade-up">
            <div className="flex items-center gap-4 border-l-2 border-rose-400 pl-4 mb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">Destaques</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featureCards.map((c) => {
                const inner = (
                  <>
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="w-full aspect-[16/9] object-cover"
                    />
                    <div className="p-5">
                      <div className={`font-mono text-[10px] uppercase tracking-[0.3em] ${c.color} mb-2`}>
                        {c.label} · {fmtDate(c.date)}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight">
                        {c.title}
                      </h3>
                      {c.subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">{c.subtitle}</p>
                      )}
                      <span className={`inline-flex items-center gap-1 mt-3 font-mono text-[10px] uppercase tracking-widest ${c.color} group-hover:underline`}>
                        {c.kind === "opinion" ? "Ler artigo →" : "Aceder →"}
                      </span>
                    </div>
                  </>
                );
                const cls = `group flex flex-col rounded-2xl border ${c.border} ${c.bg} hover:bg-opacity-30 transition-colors overflow-hidden`;
                return c.to ? (
                  <Link key={c.key} to={c.to} params={c.params as any} className={cls}>{inner}</Link>
                ) : (
                  <a key={c.key} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                );
              })}
            </div>
          </section>
        )}

        {/* Upcoming activity with image column */}
        <section className="animate-fade-up">
          <div className="flex items-center gap-4 border-l-2 border-white/20 pl-4 mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-muted-foreground">
              Próxima atividade
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 w-24">Imagem</th>
                  <th className="text-left px-4 py-3 w-28">Data</th>
                  <th className="text-left px-4 py-3 w-32">Facet</th>
                  <th className="text-left px-4 py-3">Título</th>
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
                          Aceder <ExternalLink className="size-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
                {upcomingList.length === 0 && (
                  <tr><td colSpan={5} className="text-center text-muted-foreground py-8 font-mono text-xs">Nada agendado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
