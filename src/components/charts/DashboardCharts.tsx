import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import {
  books, events, projects, travels, running, opinion, others,
} from "@/content/loader";

const FACETS = [
  { key: "books", label: "Books", color: "#fbbf24", data: books },
  { key: "events", label: "Events", color: "#e879f9", data: events },
  { key: "projects", label: "Projects", color: "#34d399", data: projects },
  { key: "travels", label: "Travels", color: "#38bdf8", data: travels },
  { key: "running", label: "Running", color: "hsl(var(--primary))", data: running },
  { key: "opinion", label: "Opinion", color: "#fb7185", data: opinion },
  { key: "others", label: "Others", color: "#a78bfa", data: others },
] as const;

function yearOf(d: string) {
  return d ? Number(d.slice(0, 4)) : 0;
}
function monthOf(d: string) {
  return d ? Number(d.slice(5, 7)) - 1 : 0;
}

export function TimelineChart() {
  const data = useMemo(() => {
    const years = new Set<number>();
    for (const f of FACETS) f.data.forEach((i: any) => i.date && years.add(yearOf(i.date)));
    const sorted = [...years].filter(Boolean).sort();
    return sorted.map((y) => {
      const row: Record<string, number | string> = { year: String(y) };
      for (const f of FACETS) row[f.key] = f.data.filter((i: any) => yearOf(i.date) === y).length;
      return row;
    });
  }, []);

  return (
    <div className="border border-border rounded-xl p-5 bg-card/40">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
        Activity by Year
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={11} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {FACETS.map((f) => (
            <Bar key={f.key} dataKey={f.key} name={f.label} stackId="a" fill={f.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FacetDonut() {
  const data = useMemo(
    () => FACETS.map((f) => ({ name: f.label, value: f.data.length, color: f.color })).filter((d) => d.value > 0),
    [],
  );
  return (
    <div className="border border-border rounded-xl p-5 bg-card/40">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
        Distribution
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 10 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyHeatmap() {
  const { years, matrix, max } = useMemo(() => {
    const all = FACETS.flatMap((f) => f.data as any[]);
    const yrs = Array.from(new Set(all.map((i) => yearOf(i.date)).filter(Boolean))).sort();
    const m: Record<number, number[]> = {};
    let mx = 0;
    for (const y of yrs) {
      m[y] = Array(12).fill(0);
      for (const it of all) {
        if (yearOf(it.date) === y) {
          m[y][monthOf(it.date)]++;
          if (m[y][monthOf(it.date)] > mx) mx = m[y][monthOf(it.date)];
        }
      }
    }
    return { years: yrs, matrix: m, max: mx };
  }, []);

  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="border border-border rounded-xl p-5 bg-card/40 lg:col-span-2">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
        Monthly Heatmap
      </h3>
      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(12, 1.4rem)` }}>
            <div />
            {months.map((m, i) => (
              <div key={i} className="text-center font-mono text-[9px] text-muted-foreground">{m}</div>
            ))}
            {years.map((y) => (
              <>
                <div key={`y${y}`} className="font-mono text-[10px] text-muted-foreground pr-2 self-center">{y}</div>
                {matrix[y].map((v, mi) => {
                  const intensity = max ? v / max : 0;
                  const bg = v === 0 ? "rgba(255,255,255,0.04)" : `hsl(var(--primary) / ${0.15 + intensity * 0.85})`;
                  return (
                    <div
                      key={`${y}-${mi}`}
                      className="aspect-square rounded-sm"
                      style={{ background: bg }}
                      title={`${months[mi]} ${y}: ${v} items`}
                    />
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
