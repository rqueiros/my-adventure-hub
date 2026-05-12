import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageShell({
  code,
  title,
  description,
  children,
}: {
  code: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">
          ← Voltar ao Dashboard
        </Link>
        <header className="mt-6 border-b border-border pb-8 mb-12">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">{code} // FACETA</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mt-3">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">{description}</p>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

export function ItemRow({
  tag,
  title,
  subtitle,
  meta,
  right,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  meta?: string;
  right?: ReactNode;
}) {
  return (
    <div className="py-5 grid grid-cols-12 gap-4 items-center">
      <span className="col-span-3 sm:col-span-2 font-mono text-[10px] text-muted-foreground tracking-widest">[{tag}]</span>
      <div className="col-span-9 sm:col-span-7">
        <div className="font-bold">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      </div>
      <div className="col-span-12 sm:col-span-3 text-left sm:text-right font-mono text-[10px] text-muted-foreground tracking-widest">
        {meta}
        {right}
      </div>
    </div>
  );
}
