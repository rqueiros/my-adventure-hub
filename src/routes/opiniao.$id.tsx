import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { opinion, fmtDate, useContent } from "@/data/activity";

export const Route = createFileRoute("/opiniao/$id")({
  component: Page,
  head: ({ params }) => {
    const o = opinion.find((x) => x.id === params.id);
    return { meta: [
      { title: o ? `${o.title} — Ricardo Queirós` : "Opinion — Ricardo Queirós" },
      { name: "description", content: o?.subtitle ?? "Opinion piece by Ricardo Queirós." },
    ]};
  },
});

function Page() {
  const { id } = Route.useParams();
  const { ready } = useContent();
  const o = opinion.find((x) => x.id === id);
  // While content is still loading on a hard refresh, render nothing
  // instead of throwing notFound (which would flash a 404 page).
  if (!o) {
    if (!ready) return <div className="min-h-screen bg-background" />;
    throw notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <article className="max-w-3xl mx-auto animate-fade-up">
        <Link to="/opiniao" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← All Opinion</Link>

        <header className="mt-6 mb-10 border-b border-border pb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-400 mb-3">
            {o.magazine} · {fmtDate(o.date)}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">{o.title}</h1>
          {o.subtitle && <p className="mt-3 text-muted-foreground">{o.subtitle}</p>}
        </header>

        <img src={o.image} alt={o.title} className="w-full aspect-[16/9] object-cover rounded-xl ring-1 ring-white/10 mb-10" />

        <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed space-y-5 text-[15px] md:text-base">
          {(o.body ?? "").split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <a href={o.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-rose-400 hover:underline">
            Read on {o.magazine} <ExternalLink className="size-3.5" />
          </a>
        </div>
      </article>
    </div>
  );
}
