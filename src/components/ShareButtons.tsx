import { useState } from "react";
import { Share2, Facebook, Linkedin, Instagram, Copy, Check } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

export function ShareButtons({
  title,
  url,
  defaultText,
}: {
  title: string;
  url: string;
  defaultText?: string;
}) {
  const [text, setText] = useState(defaultText ?? `${title} — via ricardoqueiros.com`);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encUrl = encodeURIComponent(shareUrl);
  const encText = encodeURIComponent(text.slice(0, 600));

  const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=640,height=640");

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível */
    }
  };

  const btn =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-primary/60 hover:text-primary transition-colors";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Partilhar: ${title}`}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <Share2 className="size-3" /> Partilhar
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Partilhar “{title}”</DialogTitle>
        </DialogHeader>

        <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Texto a acompanhar
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          maxLength={600}
          className="w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm outline-none focus:border-primary/60 resize-y"
        />
        <p className="font-mono text-[10px] text-muted-foreground break-all">{shareUrl}</p>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            className={btn}
            onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encUrl}&quote=${encText}`)}
          >
            <Facebook className="size-3.5" /> Facebook
          </button>
          <button
            className={btn}
            onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`)}
          >
            <Linkedin className="size-3.5" /> LinkedIn
          </button>
          <button className={btn} onClick={copyAll}>
            <Instagram className="size-3.5" /> Instagram
          </button>
          <button className={btn} onClick={copyAll}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copiado" : "Copiar texto"}
          </button>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
          O Instagram não permite partilha direta a partir do browser — o texto e o link são
          copiados para colares na publicação ou story.
        </p>
      </DialogContent>
    </Dialog>
  );
}
