import { ExternalLink } from "lucide-react";
import { fmtDate } from "@/data/activity";
import { ShareButtons } from "@/components/ShareButtons";

export function ItemCard({
  date,
  title,
  subtitle,
  meta,
  xp,
  image,
  url,
  badge,
  shareable,
  shareText,
}: {
  date: string;
  title: string;
  subtitle?: string;
  meta?: string;
  xp?: number;
  image: string;
  url: string;
  badge?: { label: string; className?: string };
  shareable?: boolean;
  shareText?: string;
}) {

  return (
    <article className="group bg-card/40 border border-border rounded-xl overflow-hidden hover:border-primary/60 transition-colors flex flex-col">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block aspect-[16/10] overflow-hidden bg-white/5">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </a>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{fmtDate(date)}</span>
          {badge ? (
            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 border rounded ${badge.className ?? "text-primary border-primary/40"}`}>
              {badge.label}
            </span>
          ) : xp ? (
            <span className="font-mono text-[10px] text-primary">+{xp} XP</span>
          ) : null}
        </div>
        <h2 className="text-lg font-bold leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        {meta && <p className="text-xs text-muted-foreground mt-3 font-mono">// {meta}</p>}
        <div className="mt-4 flex items-center justify-between gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary hover:underline"
          >
            Aceder <ExternalLink className="size-3" />
          </a>
          {shareable && (
            <ShareButtons
              title={title}
              image={image}
              defaultText={shareText ?? `${title}${subtitle ? ` — ${subtitle}` : ""}`}
            />
          )}

        </div>

      </div>
    </article>
  );
}
