import { createFileRoute, Link } from "@tanstack/react-router";
import { FACETS } from "@/lib/admin-config";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Backoffice</h1>
        <p className="text-sm text-muted-foreground mt-2">Pick a section from the sidebar or below.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(FACETS).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <Link key={key} to="/admin/$facet" params={{ facet: key }}
              className="border border-border rounded-xl p-4 hover:bg-white/[0.03] flex items-center gap-3">
              <Icon className="size-5 text-primary" />
              <span className="font-bold uppercase text-sm tracking-wide">{cfg.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
