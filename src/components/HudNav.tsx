import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  { to: "/",         label: "DASHBOARD" },
  { to: "/livros",   label: "BOOKS" },
  { to: "/artigos",  label: "ARTICLES" },
  { to: "/eventos",  label: "EVENTS" },
  { to: "/projetos", label: "PROJECTS" },
  { to: "/viagens",  label: "TRAVELS" },
  { to: "/corridas", label: "RUNNING" },
] as const;

export function HudNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card/90 backdrop-blur border border-border rounded-full px-4 py-3 flex flex-wrap justify-center gap-2 sm:gap-5 items-center shadow-2xl max-w-[95vw]">
      {items.map((it) => {
        const active = it.to === "/" ? path === "/" : path.startsWith(it.to);
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest transition-colors ${
              active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
