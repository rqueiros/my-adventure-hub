import { useState } from "react";
import { Share2, Download, Copy, Check, Image as ImageIcon } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

async function fetchImageFile(src: string, name: string) {
  const res = await fetch(src, { mode: "cors" });
  const blob = await res.blob();
  const ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  return new File([blob], `${name}.${ext}`, { type: blob.type || "image/jpeg" });
}

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "partilha";
}

export function ShareButtons({
  title,
  image,
  defaultText,
}: {
  title: string;
  image?: string;
  defaultText?: string;
}) {
  const [text, setText] = useState(defaultText ?? title);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setNote("Não foi possível copiar automaticamente.");
    }
  };

  const downloadImage = async () => {
    if (!image) return;
    setBusy(true);
    setNote(null);
    try {
      const file = await fetchImageFile(image, slugify(title));
      const href = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = href;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(href);
    } catch {
      setNote("Imagem indisponível para download direto — abre-a e guarda manualmente.");
    }
    setBusy(false);
  };

  const nativeShare = async () => {
    setBusy(true);
    setNote(null);
    try {
      if (image && typeof navigator.canShare === "function") {
        const file = await fetchImageFile(image, slugify(title));
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ text, files: [file] });
          setBusy(false);
          return;
        }
      }
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await copyText();
        setNote("Texto copiado. Guarda a imagem e cola na publicação.");
      }
    } catch {
      /* cancelado */
    }
    setBusy(false);
  };

  const btn =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-primary/60 hover:text-primary transition-colors disabled:opacity-50";

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

        {image && (
          <img
            src={image}
            alt={title}
            className="w-full aspect-[16/10] object-cover rounded-lg border border-border"
          />
        )}

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

        <div className="grid grid-cols-2 gap-2 mt-1">
          <button className={btn} onClick={nativeShare} disabled={busy}>
            <Share2 className="size-3.5" /> Partilhar imagem
          </button>
          <button className={btn} onClick={downloadImage} disabled={busy || !image}>
            <Download className="size-3.5" /> Guardar imagem
          </button>
          <button className={`${btn} col-span-2`} onClick={copyText}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Texto copiado" : "Copiar texto"}
          </button>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground leading-relaxed flex gap-2">
          <ImageIcon className="size-3.5 shrink-0 mt-0.5" />
          A partilha leva imagem + texto, sem link. No computador: guarda a imagem, copia o texto
          e cola na publicação do Facebook, Instagram ou LinkedIn.
        </p>
        {note && <p className="font-mono text-[10px] text-primary">{note}</p>}
      </DialogContent>
    </Dialog>
  );
}
