// Public types + UI metadata. Actual content lives in `/content/**/*.md` and is
// loaded by src/content/loader.ts. This file is just types + helpers + the
// facet metadata table (icons, colors, paths) which is UI-only.
import {
  BookOpen, FileText, Mic, Boxes, Plane, Footprints, PenSquare, Sparkles,
  type LucideIcon,
} from "lucide-react";

export {
  books, events, projects, travels, running, opinion, others, upcoming,
  profile, now, facetData, useContent, refreshContent, isContentReady,
} from "@/content/loader";
export type {
  Facet, Item, Book, Event, EventKind, Travel, Continent, Race, Distance,
  Opinion, Other, OtherKind, UpcomingItem, Profile, Now,
} from "@/content/loader";

import type { Facet } from "@/content/loader";
import {
  books, events, projects, travels, running, opinion, others,
} from "@/content/loader";

export const facetMeta: Record<Facet, {
  code: string; label: string; path: string; unit: string;
  icon: LucideIcon; color: string; bg: string; border: string;
}> = {
  books:    { code: "01", label: "LIVROS",   path: "/livros",   unit: "Publicados",
              icon: BookOpen,   color: "text-amber-400",  bg: "bg-amber-400/10",  border: "border-amber-400/40" },
  articles: { code: "02", label: "ARTIGOS",  path: "/artigos",  unit: "Publicados",
              icon: FileText,   color: "text-cyan-400",   bg: "bg-cyan-400/10",   border: "border-cyan-400/40" },
  events:   { code: "03", label: "EVENTOS",  path: "/eventos",  unit: "Realizados",
              icon: Mic,        color: "text-fuchsia-400",bg: "bg-fuchsia-400/10",border: "border-fuchsia-400/40" },
  projects: { code: "04", label: "PROJETOS", path: "/projetos", unit: "Ativos",
              icon: Boxes,      color: "text-emerald-400",bg: "bg-emerald-400/10",border: "border-emerald-400/40" },
  travels:  { code: "05", label: "VIAGENS",  path: "/viagens",  unit: "Países",
              icon: Plane,      color: "text-sky-400",    bg: "bg-sky-400/10",    border: "border-sky-400/40" },
  running:  { code: "06", label: "CORRIDAS", path: "/corridas", unit: "Corridas",
              icon: Footprints, color: "text-primary",    bg: "bg-primary/10",    border: "border-primary/40" },
  opinion:  { code: "07", label: "OPINIÃO",  path: "/opiniao",  unit: "Artigos",
              icon: PenSquare,  color: "text-rose-400",   bg: "bg-rose-400/10",   border: "border-rose-400/40" },
  others:   { code: "08", label: "OUTROS",   path: "/outros",   unit: "Atividades",
              icon: Sparkles,   color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/40" },
};

export const eventKindLabel: Record<string, string> = {
  talk: "Palestras", seminar: "Seminários", workshop: "Workshops",
  conference: "Conferências", podcast: "Podcasts",
  arguencia: "Arguências", hackathon: "Concursos / Hackathons",
};

export const otherKindLabel: Record<string, string> = {
  supervision: "Orientações", committee: "Comissões de Programa",
  editorial: "Conselhos Editoriais", service: "Serviço Científico",
};

export type ArticleKind = "conference" | "journal" | "bookchapter" | "thesis";
export const articleKindLabel: Record<ArticleKind, string> = {
  conference: "Conferências", journal: "Revistas",
  bookchapter: "Capítulos de Livro", thesis: "Teses",
};

// Live counts from loaded markdown. Defined via getters so reading
// `stats.books.count` always reflects the current array length (arrays are
// populated asynchronously by the content loader after the app boots).
// Articles count comes live from ORCID on the dashboard; default to 0 here.
export const stats: Record<Facet, { readonly count: number }> = {
  books:    { get count() { return books.length; } },
  articles: { get count() { return 0; } },
  events:   { get count() { return events.length; } },
  projects: { get count() { return projects.length; } },
  travels:  { get count() { return new Set(travels.map((t) => t.country)).size; } },
  running:  { get count() { return running.length; } },
  opinion:  { get count() { return opinion.length; } },
  others:   { get count() { return others.length; } },
};

export function fmtDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
}
