import { useSyncExternalStore } from "react";
import yaml from "js-yaml";

// =====================================================================
// Runtime content loader.
//
// Markdown lives in /public/content/*.md and is served as STATIC files.
// At app boot we `fetch()` each file in parallel and populate the mutable
// arrays/objects exported below. Nothing is bundled into the JS — to update
// the site, edit a markdown file under public/content and (in production)
// redeploy; in dev the files are served live and a reload picks them up.
//
// A tiny pub/sub + `useContent()` hook (useSyncExternalStore) lets any
// component re-render once content has been fetched. `initContent()` is
// awaited in main.tsx before first render, but the hook also lets us
// refresh data later (e.g. on window focus).
// =====================================================================

// Browser-safe YAML frontmatter parser.
const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
function matter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = raw.match(FM_RE);
  if (!m) return { data: {}, content: raw };
  try {
    const parsed = yaml.load(m[1]);
    return {
      data: parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {},
      content: m[2] ?? "",
    };
  } catch {
    return { data: {}, content: m[2] ?? "" };
  }
}

async function fetchMd(facet: string): Promise<{ data: Record<string, unknown>; content: string }> {
  // cache: "no-store" so editing an .md and refreshing always shows fresh data.
  const res = await fetch(`/content/${facet}.md?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return { data: {}, content: "" };
  const raw = await res.text();
  return matter(raw);
}

async function fetchFacet<T extends { date?: string }>(facet: string): Promise<T[]> {
  const { data } = await fetchMd(facet);
  const items = Array.isArray((data as any).items) ? ((data as any).items as T[]) : [];
  return items
    .slice()
    .sort((a, b) => String((b as any).date ?? "").localeCompare(String((a as any).date ?? "")));
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

export type Now = { updated: string; items: string[] };

// === Mutable, live-populated exports ===
// Arrays keep the same reference, so consumers that imported them at module
// load see the items as soon as initContent() finishes.
export const books: Book[] = [];
export const events: Event[] = [];
export const projects: Item[] = [];
export const travels: Travel[] = [];
export const running: Race[] = [];
export const opinion: Opinion[] = [];
export const others: Other[] = [];
export const upcoming: UpcomingItem[] = [];

export const profile: Profile = {
  name: "", title: "", bio: "", orcid: "", website: "", avatar: "",
  socials: { twitter: "", linkedin: "", github: "", youtube: "", email: "" },
};

export const now: Now = { updated: "", items: [] };

export const facetData: Record<Exclude<Facet, "articles">, Item[]> = {
  books, events, projects, travels, running, opinion, others,
};

function replaceArr<T>(target: T[], next: T[]) {
  target.length = 0;
  target.push(...next);
}

// === pub/sub for React reactivity =====================================
let version = 0;
let ready = false;
const listeners = new Set<() => void>();
function emit() {
  version += 1;
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
function getSnapshot() {
  return version;
}

/**
 * Re-render any component that calls this hook when content is (re)loaded.
 * Returns `{ ready, version }`. `ready` is true after the first successful
 * `initContent()` resolves; pages can guard expensive work behind it.
 */
export function useContent() {
  const v = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { ready, version: v };
}

export function isContentReady() {
  return ready;
}

// === Loader ===========================================================
let initPromise: Promise<void> | null = null;

async function loadAll() {
  const [
    bks, evs, prj, trv, run, opi, oth, upc, prof, nw,
  ] = await Promise.all([
    fetchFacet<Book>("books"),
    fetchFacet<Event>("events"),
    fetchFacet<Item>("projects"),
    fetchFacet<Travel>("travels"),
    fetchFacet<Race>("running"),
    fetchFacet<Opinion>("opinion"),
    fetchFacet<Other>("others"),
    fetchFacet<UpcomingItem>("upcoming"),
    fetchMd("profile").then((m) => m.data as unknown as Profile),
    fetchMd("now").then((m) => m.data as unknown as Now),
  ]);
  replaceArr(books, bks);
  replaceArr(events, evs);
  replaceArr(projects, prj);
  replaceArr(travels, trv);
  replaceArr(running, run);
  replaceArr(opinion, opi);
  replaceArr(others, oth);
  replaceArr(upcoming, upc);
  if (prof && typeof prof === "object") {
    Object.assign(profile, prof);
    if ((prof as any).socials) Object.assign(profile.socials, (prof as any).socials);
  }
  if (nw && typeof nw === "object") {
    Object.assign(now, nw);
    if (Array.isArray((nw as any).items)) now.items = (nw as any).items;
  }
  ready = true;
  emit();
}

export function initContent(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = loadAll().catch((err) => {
    // Even on failure, mark ready so the UI renders (with whatever was
    // loaded) instead of getting stuck on a blank screen.
    console.error("[content] init failed:", err);
    ready = true;
    emit();
  });
  return initPromise;
}

/** Force a refetch (e.g. on window focus). */
export function refreshContent(): Promise<void> {
  initPromise = loadAll().catch((err) => {
    console.error("[content] refresh failed:", err);
  });
  return initPromise;
}
