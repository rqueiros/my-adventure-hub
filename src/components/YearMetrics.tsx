import { BookOpen, PenSquare, Footprints, Trophy } from "lucide-react";
import { books, opinion, running } from "@/data/activity";

const KM: Record<string, number> = { "10K": 10, "21K": 21, "42K": 42 };

export function YearMetrics() {
  const year = new Date().getFullYear();
  const byYear = (iso: string) => new Date(iso).getFullYear() === year;

  const booksY = books.filter((b) => byYear(b.date)).length;
  const opedsY = opinion.filter((o) => byYear(o.date)).length;
  const racesY = running.filter((r) => byYear(r.date));
  const km = racesY.reduce((acc, r) => acc + (KM[r.distance] ?? 0), 0);

  const tiles = [
    { Icon: BookOpen,    label: "Books published",   value: booksY, color: "text-amber-400",   border: "border-amber-400/30",   bg: "bg-amber-400/[0.05]" },
    { Icon: PenSquare,   label: "Op-eds written",    value: opedsY, color: "text-rose-400",    border: "border-rose-400/30",    bg: "bg-rose-400/[0.05]" },
    { Icon: Footprints,  label: "Races run",         value: racesY.length, color: "text-primary", border: "border-primary/30",  bg: "bg-primary/[0.05]" },
    { Icon: Trophy,      label: "Kilometres raced",  value: km,     color: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/[0.05]" },
  ];

  return (
    <section className="animate-fade-up" style={{ animationDelay: "350ms" }}>
      <div className="flex items-center gap-4 border-l-2 border-primary/60 pl-4 mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest">{year} in numbers</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map(({ Icon, label, value, color, border, bg }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} p-5`}>
            <Icon className={`size-5 ${color} mb-3`} strokeWidth={1.5} />
            <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/70 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
