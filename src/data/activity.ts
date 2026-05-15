import {
  BookOpen, FileText, Mic, Boxes, Plane, Footprints, PenSquare, Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Facet = "books" | "articles" | "events" | "projects" | "travels" | "running" | "opinion" | "others";

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

export type Book = Item & { publisher: string };

export const books: Book[] = [
  { id: "b3", title: "Systems That Learn", publisher: "Presença", date: "2025-09-12",
    subtitle: "Essay · 280 pp.", meta: "Essay · 280 pp.",
    image: img("photo-1544947950-fa07a98d237f"), url: "https://www.presenca.pt/" },
  { id: "b2", title: "The Human Algorithm", publisher: "LeYa", date: "2023-04-20",
    subtitle: "Non-fiction · 240 pp.", meta: "Non-fiction · 240 pp.",
    image: img("photo-1512820790803-83ca734da794"), url: "https://www.leya.com/" },
  { id: "b1", title: "Cities in Code", publisher: "Tinta-da-China", date: "2021-10-05",
    subtitle: "Essay · 312 pp.", meta: "Essay · 312 pp.",
    image: img("photo-1519681393784-d120267933ba"), url: "https://www.tintadachina.pt/" },
];

export type ArticleKind = "conference" | "journal" | "bookchapter" | "thesis";
export const articleKindLabel: Record<ArticleKind, string> = {
  conference: "Conferences",
  journal: "Journals",
  bookchapter: "Book Chapters",
  thesis: "Theses",
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
  { id: "a7", kind: "thesis", venue: "University of Porto", title: "PhD — Innovative Pedagogical Approaches for Programming",
    subtitle: "FCUP", date: "2016-12-15", image: img("photo-1523050854058-8df90110c9f1"),
    url: "https://repositorio-aberto.up.pt/" },
  { id: "a8", kind: "thesis", venue: "University of Minho", title: "MSc — XML Languages for Educational Content",
    subtitle: "University of Minho", date: "2007-07-10", image: img("photo-1532012197267-da84d127e765"),
    url: "https://repositorium.sdum.uminho.pt/" },
];

export type EventKind =
  | "talk" | "seminar" | "workshop" | "conference" | "podcast" | "arguencia" | "hackathon";

export const eventKindLabel: Record<EventKind, string> = {
  talk: "Talks",
  seminar: "Seminars",
  workshop: "Workshops",
  conference: "Conferences",
  podcast: "Podcasts",
  arguencia: "Thesis Juries",
  hackathon: "Contests / Hackathons",
};

export type Event = Item & { kind: EventKind };

export const events: Event[] = [
  { id: "e1", kind: "talk", title: "Programming for Everyone", subtitle: "TEDx Porto", date: "2025-04-22",
    meta: "30 min", image: img("photo-1505373877841-8d25f7d46678"), url: "https://www.ted.com/" },
  { id: "e2", kind: "seminar", title: "Digital Education — possible paths", subtitle: "ESE-IPP", date: "2024-11-10",
    meta: "1h30", image: img("photo-1591115765373-5207764f72e7"), url: "https://www.ese.ipp.pt/" },
  { id: "e3", kind: "workshop", title: "Gamified UX for Educators", subtitle: "Lisbon, FIL", date: "2026-05-22",
    meta: "4h", image: img("photo-1540575467063-178a50c2df87"), url: "https://www.fil.pt/" },
  { id: "e4", kind: "conference", title: "Keynote — SLATE", subtitle: "Symposium on Languages, Apps & Tech", date: "2024-06-21",
    meta: "45 min", image: img("photo-1540304453527-62f979142a17"), url: "https://slate.dcc.fc.up.pt/" },
  { id: "e5", kind: "podcast", title: "45g — guest", subtitle: "Spotify", date: "2026-03-09",
    meta: "1h12", image: img("photo-1478737270239-2f02b77fc618"), url: "https://open.spotify.com/" },
  { id: "e6", kind: "arguencia", title: "PhD Jury — UAlg", subtitle: "Univ. of Algarve", date: "2025-02-18",
    image: img("photo-1523050854058-8df90110c9f1"), url: "https://www.ualg.pt/" },
  { id: "e7", kind: "arguencia", title: "MSc Jury — IPP", subtitle: "Polytechnic of Porto", date: "2024-09-06",
    image: img("photo-1532012197267-da84d127e765"), url: "https://www.ipp.pt/" },
  { id: "e8", kind: "hackathon", title: "Jury — Poliempreende", subtitle: "Polytechnic of Porto", date: "2025-05-30",
    image: img("photo-1556761175-5973dc0f32e7"), url: "https://www.poliempreende.com/" },
  { id: "e9", kind: "workshop", title: "Educational Markdown Workshop", subtitle: "INFORUM", date: "2023-09-12",
    meta: "3h", image: img("photo-1517048676732-d65bc937f952"), url: "https://inforum.org.pt/" },
];

export const projects: Item[] = [
  { id: "p3", title: "Atlas — Urban Visualizer", subtitle: "Open source", date: "2026-04-01", meta: "In development",
    image: img("photo-1487958449943-2429e8be8625"), url: "https://github.com/" },
  { id: "p2", title: "Calado — Long-form Reader", subtitle: "iOS", date: "2025-08-15", meta: "Released",
    image: img("photo-1512820790803-83ca734da794"), url: "https://apps.apple.com/" },
  { id: "p1", title: "Cold Notes", subtitle: "Web app", date: "2024-06-10", meta: "Maintained",
    image: img("photo-1499951360447-b19be8fe80f5"), url: "https://github.com/" },
];

export type Continent = "Europe" | "Asia" | "Africa" | "North America" | "South America" | "Oceania";
export type Travel = Item & { continent: Continent; country: string; lat: number; lng: number };

export const travels: Travel[] = [
  { id: "t1",  continent: "Asia",          country: "Japan",   title: "Tokyo",                  subtitle: "Urban exploration", date: "2026-03-21", meta: "12 days", lat: 35.68, lng: 139.69, image: img("photo-1540959733332-eab4deabeeaf"), url: "https://www.gotokyo.org/" },
  { id: "t2",  continent: "Africa",        country: "Morocco", title: "Atlas & Desert",         date: "2025-10-08", meta: "9 days",  lat: 31.79, lng: -7.09,   image: img("photo-1489493512598-d08130f49bea"), url: "https://www.visitmorocco.com/" },
  { id: "t3",  continent: "Europe",        country: "Iceland", title: "Ring Road",              date: "2025-06-02", meta: "14 days", lat: 64.96, lng: -19.02,  image: img("photo-1500382017468-9049fed747ef"), url: "https://www.visiticeland.com/" },
  { id: "t4",  continent: "Europe",        country: "Italy",   title: "Sicily",                 date: "2024-09-10", meta: "10 days", lat: 37.60, lng: 14.02,   image: img("photo-1533104816931-20fa691ff6ca"), url: "https://www.italia.it/" },
  { id: "t5",  continent: "North America", country: "USA",     title: "West Coast — SF to LA",  date: "2024-05-12", meta: "16 days", lat: 36.78, lng: -119.42, image: img("photo-1501594907352-04cda38ebc29"), url: "https://www.visittheusa.com/" },
  { id: "t6",  continent: "South America", country: "Peru",    title: "Cusco & Machu Picchu",   date: "2023-07-21", meta: "12 days", lat: -13.53, lng: -71.97, image: img("photo-1526392060635-9d6019884377"), url: "https://www.peru.travel/" },
  { id: "t7",  continent: "Oceania",       country: "Australia", title: "Sydney & Reef",        date: "2022-11-05", meta: "18 days", lat: -25.27, lng: 133.77,  image: img("photo-1506973035872-a4ec16b8e8d9"), url: "https://www.australia.com/" },
  { id: "t8",  continent: "Europe",        country: "Spain",   title: "Andalusia",              date: "2021-07-15", meta: "10 days", lat: 37.39, lng: -5.99,   image: img("photo-1509840841025-9088ba78a826"), url: "https://www.spain.info/" },
  { id: "t9",  continent: "Europe",        country: "France",  title: "Paris & Provence",       date: "2019-08-12", meta: "12 days", lat: 46.60, lng: 1.88,    image: img("photo-1502602898657-3e91760cbb34"), url: "https://www.france.fr/" },
  { id: "t10", continent: "Europe",        country: "Greece",  title: "Cyclades islands",       date: "2018-07-04", meta: "11 days", lat: 39.07, lng: 21.82,   image: img("photo-1533105079780-92b9be482077"), url: "https://www.visitgreece.gr/" },
  { id: "t11", continent: "Asia",          country: "Thailand",title: "Bangkok & Islands",      date: "2017-02-10", meta: "15 days", lat: 15.87, lng: 100.99,  image: img("photo-1528181304800-259b08848526"), url: "https://www.tourismthailand.org/" },
  { id: "t12", continent: "Europe",        country: "United Kingdom", title: "London & Edinburgh", date: "2016-04-02", meta: "8 days", lat: 55.37, lng: -3.43, image: img("photo-1513635269975-59663e0ac1ad"), url: "https://www.visitbritain.com/" },
  { id: "t13", continent: "Europe",        country: "Germany", title: "Berlin",                 date: "2014-09-20", meta: "7 days",  lat: 52.52, lng: 13.40,   image: img("photo-1528728329032-2972f65dfb3f"), url: "https://www.germany.travel/" },
  { id: "t14", continent: "Europe",        country: "Netherlands", title: "Amsterdam",          date: "2012-05-18", meta: "6 days",  lat: 52.13, lng: 5.29,    image: img("photo-1512470876302-972faa2aa9a4"), url: "https://www.holland.com/" },
  { id: "t15", continent: "Africa",        country: "Egypt",   title: "Cairo & Luxor",          date: "2011-03-20", meta: "9 days",  lat: 26.82, lng: 30.80,   image: img("photo-1539650116574-75c0c6d73a0e"), url: "https://www.egypt.travel/" },
  { id: "t16", continent: "Europe",        country: "Czech Republic", title: "Prague",          date: "2010-10-08", meta: "5 days",  lat: 49.82, lng: 15.47,   image: img("photo-1519677100203-a0e668c92439"), url: "https://www.visitczechia.com/" },
];

export type Distance = "10K" | "21K" | "42K";
export type Race = Item & { distance: Distance; year: number; time: string; raceName: string };

const race = (id: string, raceName: string, distance: Distance, year: number, month: string, time: string, url: string, imageId: string): Race => ({
  id, raceName, distance, year, time,
  title: raceName, subtitle: `${distance} · ${time}`,
  date: `${year}-${month}-15`, meta: distance,
  image: img(imageId), url,
});

export const running: Race[] = [
  race("r1",  "Lisbon Half Marathon",     "21K", 2026, "03", "1:38:42", "https://www.maratonaclubedeportugal.com/", "photo-1552674605-db6ffd4facb5"),
  race("r2",  "Porto Marathon",            "42K", 2025, "11", "3:42:11", "https://www.maratonadoporto.com/",         "photo-1571008887538-b36bb32f4571"),
  race("r3",  "Tagus Run",                 "10K", 2025, "09", "44:20",   "https://www.runportugal.com/",             "photo-1486218119243-13883505764c"),
  race("r4",  "Lisbon Half Marathon",     "21K", 2025, "03", "1:41:05", "https://www.maratonaclubedeportugal.com/", "photo-1552674605-db6ffd4facb5"),
  race("r5",  "Tagus Run",                 "10K", 2024, "09", "45:50",   "https://www.runportugal.com/",             "photo-1486218119243-13883505764c"),
  race("r7",  "Porto Half Marathon",       "21K", 2024, "09", "1:43:22", "https://www.maratonadoporto.com/",         "photo-1486218119243-13883505764c"),
  race("r6",  "Porto Marathon",            "42K", 2023, "11", "3:55:00", "https://www.maratonadoporto.com/",         "photo-1571008887538-b36bb32f4571"),
  race("r8",  "Lisbon Half Marathon",     "21K", 2023, "03", "1:45:30", "https://www.maratonaclubedeportugal.com/", "photo-1552674605-db6ffd4facb5"),
  race("r9",  "Tagus Run",                 "10K", 2022, "09", "46:40",   "https://www.runportugal.com/",             "photo-1486218119243-13883505764c"),
  race("r10", "Porto Half Marathon",       "21K", 2022, "09", "1:47:10", "https://www.maratonadoporto.com/",         "photo-1486218119243-13883505764c"),
  race("r11", "Lisbon Half Marathon",     "21K", 2021, "10", "1:49:55", "https://www.maratonaclubedeportugal.com/", "photo-1552674605-db6ffd4facb5"),
  race("r12", "Tagus Run",                 "10K", 2020, "10", "47:30",   "https://www.runportugal.com/",             "photo-1486218119243-13883505764c"),
  race("r13", "Porto Marathon",            "42K", 2019, "11", "4:05:20", "https://www.maratonadoporto.com/",         "photo-1571008887538-b36bb32f4571"),
  race("r14", "Lisbon Half Marathon",     "21K", 2019, "03", "1:51:00", "https://www.maratonaclubedeportugal.com/", "photo-1552674605-db6ffd4facb5"),
  race("r15", "Porto Half Marathon",       "21K", 2018, "09", "1:53:40", "https://www.maratonadoporto.com/",         "photo-1486218119243-13883505764c"),
  race("r16", "Tagus Run",                 "10K", 2018, "09", "48:55",   "https://www.runportugal.com/",             "photo-1486218119243-13883505764c"),
  race("r17", "Lisbon Half Marathon",     "21K", 2017, "03", "1:55:15", "https://www.maratonaclubedeportugal.com/", "photo-1552674605-db6ffd4facb5"),
  race("r18", "Porto Marathon",            "42K", 2016, "11", "4:18:42", "https://www.maratonadoporto.com/",         "photo-1571008887538-b36bb32f4571"),
  race("r19", "Tagus Run",                 "10K", 2016, "09", "50:10",   "https://www.runportugal.com/",             "photo-1486218119243-13883505764c"),
];

// Opinion articles (op-eds, columns, magazine essays)
export type Opinion = Item & { magazine: string; body: string };

const lorem = (intro: string) =>
  `${intro}\n\nIn a world where attention is the new currency, the way we frame technology in education determines whether students become creators or consumers. The classroom can no longer be a place where information is transferred — it must become a workshop where ideas are stress-tested, remixed and shared.\n\nThis is not about replacing teachers with screens, nor about banning devices in the name of focus. It is about designing intentional friction — small obstacles that force thinking — and intentional fluency — tools that disappear when the task demands flow. Both can coexist; both must.\n\nAfter two decades teaching programming and designing learning environments, I am convinced of one thing: the schools that thrive in the next decade will be the ones that treat curiosity as infrastructure. Everything else — content, platforms, even assessment — follows.`;

export const opinion: Opinion[] = [
  { id: "o1", magazine: "Público",      title: "The new digital literacy starts at school",
    subtitle: "Op-ed", date: "2026-02-18", image: img("photo-1504711434969-e33886168f5c"),
    url: "https://www.publico.pt/",
    body: lorem("Digital literacy is no longer a chapter in the curriculum — it is the spine that holds every other subject upright.") },
  { id: "o2", magazine: "Observador",   title: "AI in classrooms: from fear to fluency",
    subtitle: "Column", date: "2025-11-04", image: img("photo-1620712943543-bcc4688e7485"),
    url: "https://observador.pt/",
    body: lorem("Generative AI in the classroom is neither an apocalypse nor a panacea. It is a mirror that reflects back the assumptions we make about learning.") },
  { id: "o3", magazine: "Visão",        title: "Why we still need to teach reading",
    subtitle: "Essay",  date: "2025-05-22", image: img("photo-1455390582262-044cdead277a"),
    url: "https://visao.pt/",
    body: lorem("Long-form reading is the original immersive technology — and the one our students are losing fastest.") },
  { id: "o4", magazine: "Expresso",     title: "Polytechnics and the missing innovation engine",
    subtitle: "Op-ed",  date: "2024-09-30", image: img("photo-1499209974431-9dddcece7f88"),
    url: "https://expresso.pt/",
    body: lorem("Portuguese polytechnics sit on top of an enormous underused asset: applied research that is one decision away from becoming product.") },
  { id: "o5", magazine: "Jornal de Notícias", title: "Slow code, slow thought",
    subtitle: "Column", date: "2024-04-12", image: img("photo-1532153975070-2e9ab71f1b14"),
    url: "https://www.jn.pt/",
    body: lorem("Programming taught well is a school of patience. The compiler is the most honest teacher a student will ever have.") },
];

// Others — supervisions, program committees, editorial, scientific service
export type OtherKind = "supervision" | "committee" | "editorial" | "service";

export const otherKindLabel: Record<OtherKind, string> = {
  supervision: "Supervisions",
  committee:   "Program Committees",
  editorial:   "Editorial Boards",
  service:     "Scientific Service",
};

export type Other = Item & { kind: OtherKind; role?: string };

export const others: Other[] = [
  { id: "x1", kind: "supervision", role: "PhD co-supervisor",
    title: "Adaptive learning paths for programming MOOCs",
    subtitle: "PhD candidate · UPorto", date: "2025-09-01",
    image: img("photo-1523050854058-8df90110c9f1"), url: "https://sigarra.up.pt/" },
  { id: "x2", kind: "supervision", role: "MSc supervisor",
    title: "Gamified authoring tool for K-12 CS teachers",
    subtitle: "MSc thesis · IPP", date: "2024-07-12",
    image: img("photo-1532012197267-da84d127e765"), url: "https://www.ipp.pt/" },
  { id: "x3", kind: "committee", role: "PC member",
    title: "ICALT — IEEE Int. Conf. on Advanced Learning Technologies",
    subtitle: "2023 — present", date: "2025-01-15",
    image: img("photo-1518770660439-4636190af475"), url: "https://www.ask4research.info/icalt/" },
  { id: "x4", kind: "committee", role: "PC member",
    title: "SLATE — Symposium on Languages, Applications and Technologies",
    subtitle: "2018 — present", date: "2024-04-10",
    image: img("photo-1551288049-bebda4e38f71"), url: "https://slate.dcc.fc.up.pt/" },
  { id: "x5", kind: "editorial", role: "Associate Editor",
    title: "OpenAccess Series in Informatics (OASIcs)",
    subtitle: "Schloss Dagstuhl", date: "2023-03-01",
    image: img("photo-1455390582262-044cdead277a"), url: "https://www.dagstuhl.de/oasics/" },
  { id: "x6", kind: "service", role: "Coordinator",
    title: "Distance Learning Coordination — Polytechnic of Porto (CIP)",
    subtitle: "Institutional role", date: "2022-09-01",
    image: img("photo-1517245386807-bb43f82c33c4"), url: "https://www.ipp.pt/" },
  { id: "x7", kind: "service", role: "Reviewer",
    title: "Computers & Education — Elsevier",
    subtitle: "Regular reviewer", date: "2021-06-01",
    image: img("photo-1432888622747-4eb9a8efeb07"), url: "https://www.sciencedirect.com/journal/computers-and-education" },
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
  { id: "u1", facet: "events",  title: "Workshop: Gamified UX",         date: "2026-05-22", meta: "Lisbon",
    image: img("photo-1591115765373-5207764f72e7"), url: "https://www.fil.pt/" },
  { id: "u2", facet: "running", title: "Valencia Marathon (42K)",       date: "2026-12-07", meta: "Sub 3:30",
    image: img("photo-1530137073521-28cb334a37b2"), url: "https://www.valenciaciudaddelrunning.com/" },
  { id: "u3", facet: "books",   title: "Launch — Systems That Learn",   date: "2026-06-04", meta: "FNAC Chiado",
    image: img("photo-1524995997946-a1c2e315a42f"), url: "https://www.fnac.pt/" },
  { id: "u4", facet: "travels", title: "Patagonia, Argentina",          date: "2026-11-10", meta: "21 days",
    image: img("photo-1531168556467-80aace0d0144"), url: "https://www.argentina.travel/" },
  { id: "u5", facet: "projects",title: "Atlas v1.0",                    date: "2026-09-01", meta: "Public release",
    image: img("photo-1518770660439-4636190af475"), url: "https://github.com/" },
  { id: "u6", facet: "articles",title: "Essay — The Geometry of Focus", date: "2026-06-30", meta: "Granta PT",
    image: img("photo-1455390582262-044cdead277a"), url: "https://granta.com/" },
];

export const facetData: Record<Facet, Item[]> = { books, articles, events, projects, travels, running, opinion, others };

export const stats: Record<Facet, { count: number }> = {
  books:    { count: books.length },
  articles: { count: articles.length },
  events:   { count: events.length },
  projects: { count: projects.length },
  travels:  { count: new Set(travels.map((t) => t.country)).size },
  running:  { count: running.length },
  opinion:  { count: opinion.length },
  others:   { count: others.length },
};

export const profile = {
  name: "Ricardo Queirós",
  title: "Professor, Researcher, Writer and Runner",
  bio: "Adjunct Professor at ESMAD — School of Media Arts and Design of the Polytechnic of Porto, where I teach in the Web & Mobile Development and Multimedia programmes. I'm an integrated researcher at CRACS / INESC TEC, working on programming education, gamification and language engineering. I also coordinate the Distance Learning unit at CIP (Polytechnic of Porto), and serve on program committees, editorial boards and academic juries across Portugal and abroad.",
  website: "https://www.ricardoqueiros.com",
  avatar: "https://www.ricardoqueiros.com/assets/images/profile.jpeg",
  socials: {
    twitter:  "https://twitter.com/ricardoqueiros",
    linkedin: "https://www.linkedin.com/in/ricardoqueiros/",
    github:   "https://github.com/rqueiros",
    youtube:  "https://www.youtube.com/@ricardoqueiros",
    email:    "mailto:ricardo@ricardoqueiros.com",
  },
};

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
