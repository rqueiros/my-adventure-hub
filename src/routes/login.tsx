import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — Admin" }] }),
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setBusy(true);
    try {
      const fn = mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
      const { error } = await fn;
      if (error) throw error;
      nav({ to: "/admin" });
    } catch (e: any) { setErr(e.message ?? String(e)); } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm border border-border rounded-xl p-6 space-y-4 bg-card/40">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">Admin {mode === "signin" ? "sign in" : "sign up"}</h1>
        <p className="text-xs text-muted-foreground">The first account created becomes admin automatically.</p>
        <input className="w-full bg-background border border-border rounded px-3 py-2 text-sm" type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full bg-background border border-border rounded px-3 py-2 text-sm" type="password" required minLength={6} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <div className="text-rose-400 text-xs">{err}</div>}
        <button disabled={busy} className="w-full bg-primary text-primary-foreground rounded py-2 text-sm font-bold uppercase tracking-widest disabled:opacity-50">
          {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-xs text-muted-foreground hover:text-primary">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
