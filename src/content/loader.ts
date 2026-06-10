import yaml from "js-yaml";

// Raw markdown files loaded eagerly at build time via Vite's import.meta.glob.
// Add a new .md under content/<facet>/ and it shows up after rebuild.
const RAW_FILES = import.meta.glob("/content/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

type RawItem = { id: string; [k: string]: unknown };

function slugFromPath(path: string): string {
  const name = path.split("/").pop() ?? "";
  return name.replace(/\.md$/, "");
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

function parseFolder<T extends RawItem>(folder: string): T[] {
  const prefix = `/content/${folder}/`;
  const items: T[] = [];
  for (const [path, raw] of Object.entries(RAW_FILES)) {
    if (!path.startsWith(prefix)) continue;
    const { data, content } = matter(raw);
    const id = (data.id as string) || slugFromPath(path);
    items.push({ ...data, id, body: content.trim() } as unknown as T);
  }
  return items.sort((a, b) =>
    String((b as any).date ?? "").localeCompare(String((a as any).date ?? "")),
  );
}

function parseSingle(path: string): Record<string, unknown> | null {
  const raw = RAW_FILES[path];
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
export const books = parseFolder<Book>("books");
export const events = parseFolder<Event>("events");
export const projects = parseFolder<Item>("projects");
export const travels = parseFolder<Travel>("travels");
export const running = parseFolder<Race>("running");
export const opinion = parseFolder<Opinion>("opinion");
export const others = parseFolder<Other>("others");
export const upcoming = parseFolder<UpcomingItem>("upcoming");

export const profile = (parseSingle("/content/profile.md") as unknown as Profile) ?? {
  name: "", title: "", bio: "", orcid: "", website: "", avatar: "",
  socials: { twitter: "", linkedin: "", github: "", youtube: "", email: "" },
};

export type Now = { updated: string; items: string[] };
export const now = (parseSingle("/content/now.md") as unknown as Now) ?? { updated: "", items: [] };

export const facetData: Record<Exclude<Facet, "articles">, Item[]> = {
  books, events, projects, travels, running, opinion, others,
};

