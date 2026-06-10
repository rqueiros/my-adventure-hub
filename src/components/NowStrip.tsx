import { Activity } from "lucide-react";
import { now, fmtDate } from "@/data/activity";

export function NowStrip() {
  if (!now.items?.length) return null;
  return (
    <section className="animate-fade-up" style={{ animationDelay: "60ms" }}>
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.04] p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-2">
            <Activity className="size-3" /> Now
          </h2>
          {now.updated && (
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              {fmtDate(now.updated)}
            </span>
          )}
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {now.items.map((it, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground/85">
              <span className="text-emerald-400/70 mt-0.5">▸</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
