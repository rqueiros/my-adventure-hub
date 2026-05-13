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
  image: string;
  url: string;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const books: Item[] = [
  { id: "b3", title: "Sistemas que Aprendem", subtitle: "Editorial Presença", date: "2025-09-12", meta: "Ensaio · 280 pág.",
    image: img("photo-1544947950-fa07a98d237f"), url: "https://www.presenca.pt/" },
  { id: "b2", title: "O Algoritmo Humano", subtitle: "LeYa", date: "2023-04-20", meta: "Não-ficção · 240 pág.",
    image: img("photo-1512820790803-83ca734da794"), url: "https://www.leya.com/" },
  { id: "b1", title: "Cidades em Código", subtitle: "Tinta-da-China", date: "2021-10-05", meta: "Ensaio · 312 pág.",
    image: img("photo-1519681393784-d120267933ba"), url: "https://www.tintadachina.pt/" },
];

export type ArticleKind = "conference" | "journal" | "bookchapter" | "thesis";
export const articleKindLabel: Record<ArticleKind, string> = {
  conference: "Conferências",
  journal: "Revistas",
  bookchapter: "Capítulos de Livro",
  thesis: "Teses",
};

export type Article = Item & { kind: ArticleKind; venue: string };

export const articles: Article[] = [
  { id: "a1", kind: "conference", venue: "ICALT 2025", title: "Adaptive Gamification in Programming MOOCs",
    subtitle: "IEEE ICALT", date: "2025-07-09", image: img("photo-1518770660439-4636190af475"),
    url: "https://ieeexplore.ieee.org/" },
  { id: "a2", kind: "conference", venue: "SLATE 2024", title: "A DSL for Learning Path Generation",
    subtitle: "OASIcs", date: "2024-06-20", image: img("photo-1551288049-bebda4e38f71"),
    url: "https://drops.dagstuhl.de/" },
  { id: "a3", kind: "journal", venue: "Computers & Education", title: "Automated Assessment in CS1",
    subtitle: "Elsevier", date: "2024-02-14", image: img("photo-1455390582262-044cdead277a"),
    url: "https://www.sciencedirect.com/" },
  { id: "a4", kind: "journal", venue: "IEEE TLT", title: "Personalized Feedback in Programming Exercises",
    subtitle: "IEEE Transactions on Learning Technologies", date: "2023-11-03",
    image: img("photo-1432888622747-4eb9a8efeb07"), url: "https://www.computer.org/csdl/journal/lt" },
  { id: "a5", kind: "bookchapter", venue: "Springer LNCS", title: "Serious Games for Computer Science Education",
    subtitle: "Springer", date: "2023-05-18", image: img("photo-1519682337058-a94d519337bc"),
    url: "https://link.springer.com/" },
  { id: "a6", kind: "bookchapter", venue: "IGI Global", title: "Designing Authoring Tools for Educators",
    subtitle: "IGI Global", date: "2022-09-12", image: img("photo-1524995997946-a1c2e315a42f"),
    url: "https://www.igi-global.com/" },
  { id: "a7", kind: "thesis", venue: "Universidade do Porto", title: "PhD — Innovative Pedagogical Approaches for Programming",
    subtitle: "FCUP", date: "2016-12-15", image: img("photo-1523050854058-8df90110c9f1"),
    url: "https://repositorio-aberto.up.pt/" },
  { id: "a8", kind: "thesis", venue: "Universidade do Minho", title: "MSc — XML Languages for Educational Content",
    subtitle: "Universidade do Minho", date: "2007-07-10", image: img("photo-1532012197267-da84d127e765"),
    url: "https://repositorium.sdum.uminho.pt/" },
];

export type EventKind =
  | "talk" | "seminar" | "workshop" | "conference" | "podcast" | "arguencia" | "hackathon";

export const eventKindLabel: Record<EventKind, string> = {
  talk: "Talks",
  seminar: "Seminários",
  workshop: "Workshops",
  conference: "Conferências",
  podcast: "Podcasts",
  arguencia: "Arguências",
  hackathon: "Concursos / Hackatons",
};

export type Event = Item & { kind: EventKind };

export const events: Event[] = [
  { id: "e1", kind: "talk", title: "Programar para todos", subtitle: "TEDx Porto", date: "2025-04-22",
    meta: "30 min", image: img("photo-1505373877841-8d25f7d46678"), url: "https://www.ted.com/" },
  { id: "e2", kind: "seminar", title: "Educação Digital — caminhos possíveis", subtitle: "ESE-IPP", date: "2024-11-10",
    meta: "1h30", image: img("photo-1591115765373-5207764f72e7"), url: "https://www.ese.ipp.pt/" },
  { id: "e3", kind: "workshop", title: "UX Gamificado para Educadores", subtitle: "Lisboa, FIL", date: "2026-05-22",
    meta: "4h", image: img("photo-1540575467063-178a50c2df87"), url: "https://www.fil.pt/" },
  { id: "e4", kind: "conference", title: "Keynote — SLATE", subtitle: "Symposium on Languages, Apps & Tech", date: "2024-06-21",
    meta: "45 min", image: img("photo-1540304453527-62f979142a17"), url: "https://slate.dcc.fc.up.pt/" },
  { id: "e5", kind: "podcast", title: "45g — convidado", subtitle: "Spotify", date: "2026-03-09",
    meta: "1h12", image: img("photo-1478737270239-2f02b77fc618"), url: "https://open.spotify.com/" },
  { id: "e6", kind: "arguencia", title: "Arguência de Doutoramento — UAlg", subtitle: "Univ. do Algarve", date: "2025-02-18",
    image: img("photo-1523050854058-8df90110c9f1"), url: "https://www.ualg.pt/" },
  { id: "e7", kind: "arguencia", title: "Arguência de Mestrado — IPP", subtitle: "Politécnico do Porto", date: "2024-09-06",
    image: img("photo-1532012197267-da84d127e765"), url: "https://www.ipp.pt/" },
  { id: "e8", kind: "hackathon", title: "Júri — Poliempreende", subtitle: "Politécnico do Porto", date: "2025-05-30",
    image: img("photo-1556761175-5973dc0f32e7"), url: "https://www.poliempreende.com/" },
  { id: "e9", kind: "workshop", title: "Workshop de Markdown Educativo", subtitle: "INFORUM", date: "2023-09-12",
    meta: "3h", image: img("photo-1517048676732-d65bc937f952"), url: "https://inforum.org.pt/" },
];

export const projects: Item[] = [
  { id: "p3", title: "Atlas — visualizador urbano", subtitle: "Open source", date: "2026-04-01", meta: "Em desenvolvimento",
    image: img("photo-1487958449943-2429e8be8625"), url: "https://github.com/" },
  { id: "p2", title: "Calado — leitor de longas leituras", subtitle: "iOS", date: "2025-08-15", meta: "Lançado",
    image: img("photo-1512820790803-83ca734da794"), url: "https://apps.apple.com/" },
  { id: "p1", title: "Notas Frias", subtitle: "Web app", date: "2024-06-10", meta: "Mantido",
    image: img("photo-1499951360447-b19be8fe80f5"), url: "https://github.com/" },
];

export type Continent = "Europa" | "Ásia" | "África" | "América do Norte" | "América do Sul" | "Oceânia";
export type Travel = Item & { continent: Continent; country: string };

export const travels: Travel[] = [
  { id: "t1", continent: "Ásia", country: "Japão", title: "Tóquio", subtitle: "Exploração urbana", date: "2026-03-21", meta: "12 dias",
    image: img("photo-1540959733332-eab4deabeeaf"), url: "https://www.gotokyo.org/" },
  { id: "t2", continent: "África", country: "Marrocos", title: "Atlas e deserto", date: "2025-10-08", meta: "9 dias",
    image: img("photo-1489493512598-d08130f49bea"), url: "https://www.visitmorocco.com/" },
  { id: "t3", continent: "Europa", country: "Islândia", title: "Ring Road", date: "2025-06-02", meta: "14 dias",
    image: img("photo-1500382017468-9049fed747ef"), url: "https://www.visiticeland.com/" },
  { id: "t4", continent: "Europa", country: "Itália", title: "Sicília", date: "2024-09-10", meta: "10 dias",
    image: img("photo-1533104816931-20fa691ff6ca"), url: "https://www.italia.it/" },
  { id: "t5", continent: "América do Norte", country: "EUA", title: "Costa Oeste — SF a LA", date: "2024-05-12", meta: "16 dias",
    image: img("photo-1501594907352-04cda38ebc29"), url: "https://www.visittheusa.com/" },
  { id: "t6", continent: "América do Sul", country: "Peru", title: "Cusco e Machu Picchu", date: "2023-07-21", meta: "12 dias",
    image: img("photo-1526392060635-9d6019884377"), url: "https://www.peru.travel/" },
  { id: "t7", continent: "Oceânia", country: "Austrália", title: "Sydney e Grande Barreira", date: "2022-11-05", meta: "18 dias",
    image: img("photo-1506973035872-a4ec16b8e8d9"), url: "https://www.australia.com/" },
];

export type Distance = "10K" | "21K" | "42K";
export type Race = Item & { distance: Distance; year: number; time: string; raceName: string };

export const running: Race[] = [
  { id: "r1", raceName: "Meia Maratona de Lisboa", distance: "21K", year: 2026, time: "1:38:42",
    title: "Meia Maratona de Lisboa", subtitle: "21K · 1:38:42", date: "2026-03-15", meta: "21K",
    image: img("photo-1552674605-db6ffd4facb5"), url: "https://www.maratonaclubedeportugal.com/" },
  { id: "r2", raceName: "Maratona do Porto", distance: "42K", year: 2025, time: "3:42:11",
    title: "Maratona do Porto", subtitle: "42K · 3:42:11", date: "2025-11-02", meta: "42K",
    image: img("photo-1571008887538-b36bb32f4571"), url: "https://www.maratonadoporto.com/" },
  { id: "r3", raceName: "Corrida do Tejo", distance: "10K", year: 2025, time: "44:20",
    title: "Corrida do Tejo", subtitle: "10K · 44:20", date: "2025-09-20", meta: "10K",
    image: img("photo-1486218119243-13883505764c"), url: "https://www.runportugal.com/" },
  { id: "r4", raceName: "Meia Maratona de Lisboa", distance: "21K", year: 2025, time: "1:41:05",
    title: "Meia Maratona de Lisboa", subtitle: "21K · 1:41:05", date: "2025-03-16", meta: "21K",
    image: img("photo-1552674605-db6ffd4facb5"), url: "https://www.maratonaclubedeportugal.com/" },
  { id: "r5", raceName: "Corrida do Tejo", distance: "10K", year: 2024, time: "45:50",
    title: "Corrida do Tejo", subtitle: "10K · 45:50", date: "2024-09-21", meta: "10K",
    image: img("photo-1486218119243-13883505764c"), url: "https://www.runportugal.com/" },
  { id: "r6", raceName: "Maratona do Porto", distance: "42K", year: 2023, time: "3:55:00",
    title: "Maratona do Porto", subtitle: "42K · 3:55:00", date: "2023-11-05", meta: "42K",
    image: img("photo-1571008887538-b36bb32f4571"), url: "https://www.maratonadoporto.com/" },
  { id: "r7", raceName: "Meia Maratona do Porto", distance: "21K", year: 2024, time: "1:43:22",
    title: "Meia Maratona do Porto", subtitle: "21K · 1:43:22", date: "2024-09-08", meta: "21K",
    image: img("photo-1486218119243-13883505764c"), url: "https://www.maratonadoporto.com/" },
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

export const stats: Record<Facet, { count: number }> = {
  books:    { count: books.length },
  articles: { count: articles.length },
  events:   { count: events.length },
  projects: { count: projects.length },
  travels:  { count: new Set(travels.map((t) => t.country)).size },
  running:  { count: running.length },
};

export const profile = {
  name: "Ricardo Queirós",
  title: "Professor, Researcher, Writer and Runner",
  website: "https://www.ricardoqueiros.com",
  avatar: "https://www.ricardoqueiros.com/assets/images/profile.jpeg",
};

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
}
