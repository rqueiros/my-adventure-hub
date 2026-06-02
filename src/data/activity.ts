// Public types + UI metadata. Actual content lives in `/content/**/*.md` and is
// loaded by src/content/loader.ts. This file is just types + helpers + the
// facet metadata table (icons, colors, paths) which is UI-only.
import {
  BookOpen, FileText, Mic, Boxes, Plane, Footprints, PenSquare, Sparkles,
  type LucideIcon,
} from "lucide-react";

export {
  books, events, projects, travels, running, opinion, others, upcoming,
  profile, facetData,
} from "@/content/loader";
export type {
  Facet, Item, Book, Event, EventKind, Travel, Continent, Race, Distance,
  Opinion, Other, OtherKind, UpcomingItem, Profile,
} from "@/content/loader";

import type { Facet } from "@/content/loader";
import {
  books, events, projects, travels, running, opinion, others,
} from "@/content/loader";

export const facetMeta: Record<Facet, {
  code: string; label: string; path: string; unit: string;
  icon: LucideIcon; color: string; bg: string; border: string;
}> = {
  books:    { code: "01", label: "BOOKS",    path: "/livros",   unit: "Published",
              icon: BookOpen,   color: "text-amber-400",  bg: "bg-amber-400/10",  border: "border-amber-400/40" },
  articles: { code: "02", label: "ARTICLES", path: "/artigos",  unit: "Published",
              icon: FileText,   color: "text-cyan-400",   bg: "bg-cyan-400/10",   border: "border-cyan-400/40" },
  events:   { code: "03", label: "EVENTS",   path: "/eventos",  unit: "Delivered",
              icon: Mic,        color: "text-fuchsia-400",bg: "bg-fuchsia-400/10",border: "border-fuchsia-400/40" },
  projects: { code: "04", label: "PROJECTS", path: "/projetos", unit: "Active",
              icon: Boxes,      color: "text-emerald-400",bg: "bg-emerald-400/10",border: "border-emerald-400/40" },
  travels:  { code: "05", label: "TRAVELS",  path: "/viagens",  unit: "Countries",
              icon: Plane,      color: "text-sky-400",    bg: "bg-sky-400/10",    border: "border-sky-400/40" },
  running:  { code: "06", label: "RUNNING",  path: "/corridas", unit: "Races",
              icon: Footprints, color: "text-primary",    bg: "bg-primary/10",    border: "border-primary/40" },
  opinion:  { code: "07", label: "OPINION",  path: "/opiniao",  unit: "Op-eds",
              icon: PenSquare,  color: "text-rose-400",   bg: "bg-rose-400/10",   border: "border-rose-400/40" },
  others:   { code: "08", label: "OTHERS",   path: "/outros",   unit: "Activities",
              icon: Sparkles,   color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/40" },
};

export const eventKindLabel: Record<string, string> = {
  talk: "Talks", seminar: "Seminars", workshop: "Workshops",
  conference: "Conferences", podcast: "Podcasts",
  arguencia: "Thesis Juries", hackathon: "Contests / Hackathons",
};

export const otherKindLabel: Record<string, string> = {
  supervision: "Supervisions", committee: "Program Committees",
  editorial: "Editorial Boards", service: "Scientific Service",
};

export type ArticleKind = "conference" | "journal" | "bookchapter" | "thesis";
export const articleKindLabel: Record<ArticleKind, string> = {
  conference: "Conferences", journal: "Journals",
  bookchapter: "Book Chapters", thesis: "Theses",
};

// Live counts from loaded markdown. Articles count is filled live via ORCID
// on the dashboard; here we fall back to 0 (no markdown files for articles).
export const stats: Record<Facet, { count: number }> = {
  books:    { count: books.length },
  articles: { count: 0 },
  events:   { count: events.length },
  projects: { count: projects.length },
  travels:  { count: new Set(travels.map((t) => t.country)).size },
  running:  { count: running.length },
  opinion:  { count: opinion.length },
  others:   { count: others.length },
};

export function fmtDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
