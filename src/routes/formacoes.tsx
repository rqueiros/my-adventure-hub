import { createFileRoute } from "@tanstack/react-router";
import { Clock, GraduationCap } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { trainings, useContent } from "@/data/activity";

export const Route = createFileRoute("/formacoes")({
  component: FormacoesPage,
  head: () => ({
    meta: [
      { title: "Formações — Ricardo Queirós" },
      { name: "description", content: "Principais formações e workshops ministrados por Ricardo Queirós." },
    ],
  }),
});

function FormacoesPage() {
  useContent();
  return (
    <PageShell
      code="09"
      title="Formações"
      description="Principais formações e workshops que ministro, com os tópicos abordados em cada um."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trainings.map((t, i) => (
          <div
            key={t.id}
            className="animate-fade-up rounded-2xl border border-primary/40 bg-primary/10 p-6 flex flex-col"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <GraduationCap className="size-6 text-primary shrink-0" strokeWidth={1.5} />
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <Clock className="size-3" /> {t.hours}h
              </span>
            </div>
            <h2 className="text-lg font-bold leading-snug">{t.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.synopsis}</p>
            <ul className="mt-4 space-y-1.5">
              {t.topics.map((topic) => (
                <li key={topic} className="flex items-start gap-2 text-xs text-foreground/80">
                  <span className="mt-1.5 size-1 rounded-full bg-primary shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
