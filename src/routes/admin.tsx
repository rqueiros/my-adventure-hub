import { useEffect, useState } from "react";
import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { checkAdmin } from "@/lib/admin.functions";
import { FACETS } from "@/lib/admin-config";
import { Loader2, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — Ricardo Queirós" }] }),
});

function AdminLayout() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((_e, s) => { setAuthed(!!s); setReady(true); });
    supabase.auth.getSession().then(({ data }) => { setAuthed(!!data.session); setReady(true); });
    return () => sub.data.subscription.unsubscribe();
  }, []);

  const adminCheck = useServerFn(checkAdmin);
  const { data: roleInfo, isLoading } = useQuery({
    queryKey: ["admin-check"], queryFn: () => adminCheck(), enabled: ready && authed,
  });

  if (!ready || (authed && isLoading)) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }
  if (!authed) { nav({ to: "/login" }); return null; }
  if (!roleInfo?.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground">You are signed in but not an admin.</p>
        <button onClick={() => supabase.auth.signOut()} className="text-xs font-mono uppercase tracking-widest text-primary hover:underline">Sign out</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <aside className="md:w-64 border-r border-border p-6 space-y-4">
        <Link to="/" className="block font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Site</Link>
        <h2 className="text-lg font-extrabold uppercase tracking-tight">Backoffice</h2>
        <nav className="flex flex-col gap-1 text-sm">
          {Object.entries(FACETS).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <Link key={key} to="/admin/$facet" params={{ facet: key }}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/[0.04]"
                activeProps={{ className: "bg-primary/10 text-primary" }}>
                <Icon className="size-4" /> {cfg.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => supabase.auth.signOut().then(() => nav({ to: "/" }))}
          className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary">
          <LogOut className="size-3" /> Sign out
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-10"><Outlet /></main>
    </div>
  );
}
