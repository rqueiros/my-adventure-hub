import yaml from "js-yaml";

// One markdown file per facet. Add a new item by appending to the `items:`
// array in content/<facet>.md and rebuild — no new files needed.
// Eager + ?raw glob: Vite watches these files and HMR-invalidates this module
// (and every importer) whenever any content/*.md changes, so the site updates
// live without a manual restart.
const RAW_FILES = import.meta.glob("/content/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Force-accept HMR so edits to this loader (or any glob-matched md) trigger
// a fast refresh instead of a full page reload-loop.
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Browser-safe frontmatter parser (gray-matter requires Node's Buffer).
const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
function matter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = raw.match(FM_RE);
  if (!m) return { data: {}, content: raw };
  let data: Record<string, unknown> = {};
  try {
    const parsed = yaml.load(m[1]);
    if (parsed && typeof parsed === "object") data = parsed as Record<string, unknown>;
  } catch {
    data = {};
  }
  return { data, content: m[2] ?? "" };
}

type RawItem = { id: string; [k: string]: unknown };

function parseFacet<T extends RawItem>(facet: string): T[] {
  const path = `/content/${facet}.md`;
  const raw = RAW_FILES[path];
  if (!raw) return [];
  const { data } = matter(raw);
  const items = Array.isArray((data as any).items) ? ((data as any).items as RawItem[]) : [];
  return (items as T[]).slice().sort((a, b) =>
    String((b as any).date ?? "").localeCompare(String((a as any).date ?? "")),
  );
}

function parseSingle(facet: string): Record<string, unknown> | null {
  const raw = RAW_FILES[`/content/${facet}.md`];
  if (!raw) return null;
  return matter(raw).data;
}

// === Types ===
export type Facet =
  | "books" | "articles" | "events" | "projects" | "travels"
  | "running" | "opinion" | "others";

export type Item = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  meta?: string;
  image: string;
  url: string;
  body?: string;
};

export type Book = Item & { publisher?: string };
export type EventKind = "talk" | "seminar" | "workshop" | "conference" | "podcast" | "arguencia" | "hackathon";
export type Event = Item & { kind: EventKind };
export type Continent = "Europe" | "Asia" | "Africa" | "North America" | "South America" | "Oceania";
export type Travel = Item & { continent: Continent; country: string; lat: number; lng: number };
export type Distance = "10K" | "21K" | "42K";
export type Race = Item & { distance: Distance; year: number; time: string };
export type Opinion = Item & { magazine: string };
export type OtherKind = "supervision" | "committee" | "editorial" | "service";
export type Other = Item & { kind: OtherKind; role?: string };
export type UpcomingItem = Item & { facet: Facet };

export type Profile = {
  name: string;
  title: string;
  bio: string;
  orcid: string;
  website: string;
  avatar: string;
  socials: { twitter: string; linkedin: string; github: string; youtube: string; email: string };
};

// === Loaded content ===
export const books = parseFacet<Book>("books");
export const events = parseFacet<Event>("events");
export const projects = parseFacet<Item>("projects");
export const travels = parseFacet<Travel>("travels");
export const running = parseFacet<Race>("running");
export const opinion = parseFacet<Opinion>("opinion");
export const others = parseFacet<Other>("others");
export const upcoming = parseFacet<UpcomingItem>("upcoming");

export const profile = (parseSingle("profile") as unknown as Profile) ?? {
  name: "", title: "", bio: "", orcid: "", website: "", avatar: "",
  socials: { twitter: "", linkedin: "", github: "", youtube: "", email: "" },
};

export type Now = { updated: string; items: string[] };
export const now = (parseSingle("now") as unknown as Now) ?? { updated: "", items: [] };

export const facetData: Record<Exclude<Facet, "articles">, Item[]> = {
  books, events, projects, travels, running, opinion, others,
};
