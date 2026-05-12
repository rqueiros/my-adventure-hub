export type Facet = "books" | "articles" | "events" | "projects" | "travels" | "running";

export const facetMeta: Record<Facet, { code: string; label: string; path: string; unit: string }> = {
  books:    { code: "01", label: "LIVROS",    path: "/livros",    unit: "Publicados" },
  articles: { code: "02", label: "ARTIGOS",   path: "/artigos",   unit: "Publicados" },
  events:   { code: "03", label: "EVENTOS",   path: "/eventos",   unit: "Realizados" },
  projects: { code: "04", label: "PROJETOS",  path: "/projetos",  unit: "Ativos" },
  travels:  { code: "05", label: "VIAGENS",   path: "/viagens",   unit: "Países" },
  running:  { code: "06", label: "CORRIDAS",  path: "/corridas",  unit: "Provas" },
};

export type Item = {
  id: string;
  title: string;
  subtitle?: string;
  date: string; // ISO
  meta?: string;
  xp?: number;
};

export const books: Item[] = [
  { id: "b3", title: "Sistemas que Aprendem", subtitle: "Editorial Presença", date: "2025-09-12", meta: "Ensaio · 280 pág.", xp: 1500 },
  { id: "b2", title: "O Algoritmo Humano", subtitle: "LeYa", date: "2023-04-20", meta: "Não-ficção · 240 pág.", xp: 1200 },
  { id: "b1", title: "Cidades em Código", subtitle: "Tinta-da-China", date: "2021-10-05", meta: "Ensaio · 312 pág.", xp: 1100 },
];

export const articles: Item[] = [
  { id: "a3", title: "O Futuro do Design Generativo", subtitle: "Observador", date: "2026-04-18", meta: "Tecnologia", xp: 120 },
  { id: "a2", title: "Cidades como organismos digitais", subtitle: "Público", date: "2026-02-03", meta: "Urbanismo", xp: 150 },
  { id: "a1", title: "Notas sobre velocidade e foco", subtitle: "Substack", date: "2025-11-22", meta: "Pessoal", xp: 90 },
];

export const events: Item[] = [
  { id: "e3", title: "Workshop: UX Gamificado", subtitle: "Lisboa, FIL", date: "2026-05-22", meta: "Workshop · 4h", xp: 300 },
  { id: "e2", title: "Podcast 45g — convidado", subtitle: "Spotify", date: "2026-03-09", meta: "Podcast · 1h12", xp: 180 },
  { id: "e1", title: "Seminário Web Summit", subtitle: "Altice Arena", date: "2025-11-14", meta: "Talk · 30min", xp: 250 },
];

export const projects: Item[] = [
  { id: "p3", title: "Atlas — visualizador urbano", subtitle: "Open source", date: "2026-04-01", meta: "Em desenvolvimento", xp: 800 },
  { id: "p2", title: "Calado — leitor de longas leituras", subtitle: "iOS", date: "2025-08-15", meta: "Lançado", xp: 950 },
  { id: "p1", title: "Notas Frias", subtitle: "Web app", date: "2024-06-10", meta: "Mantido", xp: 600 },
];

export const travels: Item[] = [
  { id: "t3", title: "Tóquio, Japão", subtitle: "Exploração urbana", date: "2026-03-21", meta: "12 dias", xp: 800 },
  { id: "t2", title: "Marrocos", subtitle: "Atlas e deserto", date: "2025-10-08", meta: "9 dias", xp: 600 },
  { id: "t1", title: "Islândia", subtitle: "Ring Road", date: "2025-06-02", meta: "14 dias", xp: 700 },
];

export const running: Item[] = [
  { id: "r3", title: "Meia Maratona de Lisboa", subtitle: "21K · 1:38:42", date: "2026-03-15", meta: "21K", xp: 450 },
  { id: "r2", title: "Maratona do Porto", subtitle: "42K · 3:42:11", date: "2025-11-02", meta: "42K", xp: 900 },
  { id: "r1", title: "Corrida do Tejo", subtitle: "10K · 44:20", date: "2025-09-20", meta: "10K", xp: 200 },
];

export const upcoming: Array<Item & { facet: Facet }> = [
  { id: "u1", facet: "events",  title: "Workshop: UX Gamificado",      date: "2026-05-22", meta: "Lisboa" },
  { id: "u2", facet: "running", title: "Maratona de Valência (42K)",   date: "2026-12-07", meta: "Sub 3:30" },
  { id: "u3", facet: "books",   title: "Lançamento — Sistemas que Aprendem", date: "2026-06-04", meta: "FNAC Chiado" },
  { id: "u4", facet: "travels", title: "Patagónia, Argentina",          date: "2026-11-10", meta: "21 dias" },
  { id: "u5", facet: "projects",title: "Atlas v1.0",                    date: "2026-09-01", meta: "Release público" },
  { id: "u6", facet: "articles",title: "Ensaio — A geometria do foco", date: "2026-06-30", meta: "Granta PT" },
];

export const facetData: Record<Facet, Item[]> = { books, articles, events, projects, travels, running };

export const stats: Record<Facet, { count: number; level: number; progress: number }> = {
  books:    { count: 14, level: 12, progress: 85 },
  articles: { count: 32, level: 8,  progress: 40 },
  events:   { count: 8,  level: 15, progress: 65 },
  projects: { count: 5,  level: 21, progress: 92 },
  travels:  { count: 21, level: 5,  progress: 30 },
  running:  { count: 12, level: 9,  progress: 55 },
};

export const profile = {
  name: "Ricardo Santos",
  level: 42,
  xp: 12450,
  xpNext: 15000,
  streakDays: 128,
  title: "Polímata Digital",
};

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
}
