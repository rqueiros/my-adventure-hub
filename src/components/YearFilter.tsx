import type { ReactNode } from "react";
import { yearOf } from "@/data/activity";

export type YearValue = "ALL" | number;

/** Row of year buttons: "Todos" + each available year (newest first). */
export function YearFilter({
  years,
  value,
  onChange,
}: {
  years: number[];
  value: YearValue;
  onChange: (v: YearValue) => void;
}) {
  const opts: YearValue[] = ["ALL", ...years];
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
      <span className="text-muted-foreground mr-1">Ano:</span>
      {opts.map((y) => {
        const active = value === y;
        return (
          <button
            key={String(y)}
            onClick={() => onChange(y)}
            className={`px-2.5 py-1 rounded border transition-colors ${
              active
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
            }`}
          >
            {y === "ALL" ? "Todos" : y}
          </button>
        );
      })}
    </div>
  );
}

/** Groups items by year (newest first) and renders a heading per year. */
export function YearGroups<T extends { date: string }>({
  items,
  render,
  gridClassName = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
}: {
  items: T[];
  render: (item: T) => ReactNode;
  gridClassName?: string;
}) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const groups = new Map<string, T[]>();
  for (const it of sorted) {
    const k = String(yearOf(it.date) ?? "—");
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(it);
  }
  return (
    <div className="space-y-12">
      {[...groups.entries()].map(([year, list]) => (
        <section key={year}>
          <div className="flex items-center gap-4 mb-5">
            <h2 className="font-mono text-sm font-bold tracking-[0.3em] text-primary">{year}</h2>
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] text-muted-foreground">{list.length}</span>
          </div>
          <div className={gridClassName}>{list.map(render)}</div>
        </section>
      ))}
    </div>
  );
}
