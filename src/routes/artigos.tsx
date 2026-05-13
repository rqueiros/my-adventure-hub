import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { articles, articleKindLabel, stats, fmtDate, type ArticleKind } from "@/data/activity";

export const Route = createFileRoute("/artigos")({
  component: Page,
  head: () => ({ meta: [
    { title: "Artigos — Ricardo Queirós" },
    { name: "description", content: "Publicações científicas em conferências, revistas, capítulos de livro e teses." },
  ]}),
});

const kindOrder: ArticleKind[] = ["conference", "journal", "bookchapter", "thesis"];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">02 // FACETA</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Artigos</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.articles.count}</span> publicados
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-12 text-sm md:text-base leading-relaxed">
          Produção científica organizada por tipo de publicação: conferências internacionais, revistas indexadas,
          capítulos de livro e teses académicas. Cobre temas como gamificação, ambientes de aprendizagem,
          assessment automático e linguagens específicas de domínio.
        </p>

        <div className="space-y-12">
          {kindOrder.map((kind) => {
            const items = articles.filter((a) => a.kind === kind).sort((a, b) => b.date.localeCompare(a.date));
            if (items.length === 0) return null;
            return (
              <section key={kind}>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-xl font-bold uppercase tracking-widest border-l-2 border-primary pl-3">
                    {articleKindLabel[kind]}
                  </h2>
                  <span className="font-mono text-[10px] text-muted-foreground">{items.length} entradas</span>
                </div>
                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <tr>
                        <th className="text-left px-4 py-3 w-28">Data</th>
                        <th className="text-left px-4 py-3">Título</th>
                        <th className="text-left px-4 py-3 hidden md:table-cell">Veículo</th>
                        <th className="text-right px-4 py-3 w-20">Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {items.map((a) => (
                        <tr key={a.id} className="hover:bg-white/[0.02]">
                          <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                            {fmtDate(a.date)}
                          </td>
                          <td className="px-4 py-3 font-medium">{a.title}</td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.venue}</td>
                          <td className="px-4 py-3 text-right">
                            <a href={a.url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                              Abrir <ExternalLink className="size-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
