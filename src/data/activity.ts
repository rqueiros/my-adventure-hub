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
  image: string;
  url: string;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const books: Item[] = [
  { id: "b3", title: "Sistemas que Aprendem", subtitle: "Editorial Presença", date: "2025-09-12", meta: "Ensaio · 280 pág.", xp: 1500,
    image: img("photo-1544947950-fa07a98d237f"), url: "https://www.presenca.pt/" },
  { id: "b2", title: "O Algoritmo Humano", subtitle: "LeYa", date: "2023-04-20", meta: "Não-ficção · 240 pág.", xp: 1200,
    image: img("photo-1512820790803-83ca734da794"), url: "https://www.leya.com/" },
  { id: "b1", title: "Cidades em Código", subtitle: "Tinta-da-China", date: "2021-10-05", meta: "Ensaio · 312 pág.", xp: 1100,
    image: img("photo-1519681393784-d120267933ba"), url: "https://www.tintadachina.pt/" },
];

export const articles: Item[] = [
  { id: "a3", title: "O Futuro do Design Generativo", subtitle: "Observador", date: "2026-04-18", meta: "Tecnologia", xp: 120,
    image: img("photo-1518770660439-4636190af475"), url: "https://observador.pt/" },
  { id: "a2", title: "Cidades como organismos digitais", subtitle: "Público", date: "2026-02-03", meta: "Urbanismo", xp: 150,
    image: img("photo-1477959858617-67f85cf4f1df"), url: "https://www.publico.pt/" },
  { id: "a1", title: "Notas sobre velocidade e foco", subtitle: "Substack", date: "2025-11-22", meta: "Pessoal", xp: 90,
    image: img("photo-1455390582262-044cdead277a"), url: "https://substack.com/" },
];

export const events: Item[] = [
  { id: "e3", title: "Workshop: UX Gamificado", subtitle: "Lisboa, FIL", date: "2026-05-22", meta: "Workshop · 4h", xp: 300,
    image: img("photo-1540575467063-178a50c2df87"), url: "https://www.fil.pt/" },
  { id: "e2", title: "Podcast 45g — convidado", subtitle: "Spotify", date: "2026-03-09", meta: "Podcast · 1h12", xp: 180,
    image: img("photo-1478737270239-2f02b77fc618"), url: "https://open.spotify.com/" },
  { id: "e1", title: "Seminário Web Summit", subtitle: "Altice Arena", date: "2025-11-14", meta: "Talk · 30min", xp: 250,
    image: img("photo-1505373877841-8d25f7d46678"), url: "https://websummit.com/" },
];

export const projects: Item[] = [
  { id: "p3", title: "Atlas — visualizador urbano", subtitle: "Open source", date: "2026-04-01", meta: "Em desenvolvimento", xp: 800,
    image: img("photo-1487958449943-2429e8be8625"), url: "https://github.com/" },
  { id: "p2", title: "Calado — leitor de longas leituras", subtitle: "iOS", date: "2025-08-15", meta: "Lançado", xp: 950,
    image: img("photo-1512820790803-83ca734da794"), url: "https://apps.apple.com/" },
  { id: "p1", title: "Notas Frias", subtitle: "Web app", date: "2024-06-10", meta: "Mantido", xp: 600,
    image: img("photo-1499951360447-b19be8fe80f5"), url: "https://github.com/" },
];

export const travels: Item[] = [
  { id: "t3", title: "Tóquio, Japão", subtitle: "Exploração urbana", date: "2026-03-21", meta: "12 dias", xp: 800,
    image: img("photo-1540959733332-eab4deabeeaf"), url: "https://www.gotokyo.org/" },
  { id: "t2", title: "Marrocos", subtitle: "Atlas e deserto", date: "2025-10-08", meta: "9 dias", xp: 600,
    image: img("photo-1489493512598-d08130f49bea"), url: "https://www.visitmorocco.com/" },
  { id: "t1", title: "Islândia", subtitle: "Ring Road", date: "2025-06-02", meta: "14 dias", xp: 700,
    image: img("photo-1500382017468-9049fed747ef"), url: "https://www.visiticeland.com/" },
];

export const running: Item[] = [
  { id: "r3", title: "Meia Maratona de Lisboa", subtitle: "21K · 1:38:42", date: "2026-03-15", meta: "21K", xp: 450,
    image: img("photo-1552674605-db6ffd4facb5"), url: "https://www.maratonaclubedeportugal.com/" },
  { id: "r2", title: "Maratona do Porto", subtitle: "42K · 3:42:11", date: "2025-11-02", meta: "42K", xp: 900,
    image: img("photo-1571008887538-b36bb32f4571"), url: "https://www.maratonadoporto.com/" },
  { id: "r1", title: "Corrida do Tejo", subtitle: "10K · 44:20", date: "2025-09-20", meta: "10K", xp: 200,
    image: img("photo-1486218119243-13883505764c"), url: "https://www.runportugal.com/" },
];

export type UpcomingItem = {
  id: string;
  facet: Facet;
  title: string;
  subtitle?: string;
  date: string;
  meta?: string;
  image: string;
  url: string;
};

export const upcoming: UpcomingItem[] = [
  { id: "u1", facet: "events",  title: "Workshop: UX Gamificado",      date: "2026-05-22", meta: "Lisboa",
    image: img("photo-1591115765373-5207764f72e7"), url: "https://www.fil.pt/" },
  { id: "u2", facet: "running", title: "Maratona de Valência (42K)",   date: "2026-12-07", meta: "Sub 3:30",
    image: img("photo-1530137073521-28cb334a37b2"), url: "https://www.valenciaciudaddelrunning.com/" },
  { id: "u3", facet: "books",   title: "Lançamento — Sistemas que Aprendem", date: "2026-06-04", meta: "FNAC Chiado",
    image: img("photo-1524995997946-a1c2e315a42f"), url: "https://www.fnac.pt/" },
  { id: "u4", facet: "travels", title: "Patagónia, Argentina",          date: "2026-11-10", meta: "21 dias",
    image: img("photo-1531168556467-80aace0d0144"), url: "https://www.argentina.travel/" },
  { id: "u5", facet: "projects",title: "Atlas v1.0",                    date: "2026-09-01", meta: "Release público",
    image: img("photo-1518770660439-4636190af475"), url: "https://github.com/" },
  { id: "u6", facet: "articles",title: "Ensaio — A geometria do foco", date: "2026-06-30", meta: "Granta PT",
    image: img("photo-1455390582262-044cdead277a"), url: "https://granta.com/" },
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
