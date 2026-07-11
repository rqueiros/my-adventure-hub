import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Send } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Pedido — Ricardo Queirós" },
      { name: "description", content: "Pedir formação, workshops, seminários ou consultoria." },
    ],
  }),
});

const REQUEST_TYPES = [
  "Formação",
  "Workshop",
  "Seminário",
  "Consultoria",
  "Palestra",
  "Outro",
] as const;

const TO_EMAIL = "ricardo.queiros@gmail.com";
const SUBJECT = "PEDIDO RICARDOQUEIROS.COM";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<string>(REQUEST_TYPES[0]);
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() && email.trim() && message.trim();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const body = [
      `Nome: ${name}`,
      `Email: ${email}`,
      `Tipo de pedido: ${type}`,
      "",
      "Pedido:",
      message,
    ].join("\n");
    const href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pb-32">
      <div className="max-w-2xl mx-auto animate-fade-up">
        <Link to="/" className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary uppercase">← Dashboard</Link>
        <header className="mt-6 border-b border-border pb-8 mb-8">
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.3em]">09 // REQUEST</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase mt-3">Fazer um pedido</h1>
          <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
            Formação, workshops, seminários, consultoria ou outro tipo de colaboração — preencha o
            formulário e o pedido chegará diretamente ao meu email.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Nome</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
              className="mt-1.5 w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={200}
              className="mt-1.5 w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tipo de pedido</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm outline-none focus:border-primary/60"
            >
              {REQUEST_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Pedido</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={4000}
              rows={8}
              className="mt-1.5 w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm outline-none focus:border-primary/60 resize-y"
              placeholder="Descreva o pedido — contexto, objetivos, público-alvo, datas, local..."
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="size-4" /> Enviar pedido
          </button>
          <p className="font-mono text-[10px] text-muted-foreground">
            O pedido será enviado para {TO_EMAIL} com o assunto "{SUBJECT}".
          </p>
        </form>
      </div>
    </div>
  );
}
