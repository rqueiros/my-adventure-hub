import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { books, stats } from "@/data/activity";

export const Route = createFileRoute("/livros")({
  component: Page,
  head: () => ({ meta: [
    { title: "Books — Ricardo Queirós" },
    { name: "description", content: "Catalogue of published books." },
  ]}),
});

function Page() {
  const sorted = [...books].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">01 // FACET</span>
          <div className="flex flex-wrap items-end justify-between gap-6 mt-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Books</h1>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">{stats.books.count}</span> published
            </div>
          </div>
        </header>

        <p className="text-muted-foreground max-w-3xl mb-10 text-sm md:text-base leading-relaxed">
          Original works between technical essay and scientific outreach. Each book is the result of years
          of research and practice, translated into language accessible to students, teachers and the curious.
        </p>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 w-20">Cover</th>
                <th className="text-left px-4 py-3 w-20">Year</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Publisher</th>
                <th className="text-right px-4 py-3 w-20">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <img src={b.image} alt={b.title} loading="lazy"
                      className="w-12 h-16 object-cover rounded ring-1 ring-white/10" />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-primary">{new Date(b.date).getFullYear()}</td>
                  <td className="px-4 py-3 font-medium">
                    {b.title}
                    {b.meta && <div className="text-[10px] text-muted-foreground mt-0.5">{b.meta}</div>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.publisher}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={b.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] uppercase tracking-widest">
                      Open <ExternalLink className="size-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
