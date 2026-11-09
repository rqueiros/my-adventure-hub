import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trainingInquiry, type Training } from "@/content/loader";
import { inquirySchema, sendTrainingInquiry } from "@/lib/training-inquiry";

export function TrainingInquiryDialog({ training, onClose }: { training: Training; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const copy = trainingInquiry;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending" || honeypot) return;
    const result = inquirySchema.safeParse({ name, email, message, training: training.title, subject: copy.subject });
    if (!result.success) { setError(copy.invalid); return; }
    setStatus("sending");
    setError("");
    try {
      await sendTrainingInquiry(result.data);
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
      setError(copy.error);
    }
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open && status !== "sending") onClose(); }}>
      <DialogContent className="w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto rounded-lg" closeLabel={copy.close}>
        <DialogHeader>
          <DialogTitle className="pr-6 leading-snug tracking-normal">{copy.title}</DialogTitle>
          <DialogDescription>{training.title}</DialogDescription>
        </DialogHeader>
        {status === "success" ? (
          <div className="space-y-5 py-3">
            <p role="status" className="flex items-center gap-3 text-primary"><CheckCircle2 className="size-6 shrink-0" />{copy.success}</p>
            <Button className="w-full" onClick={onClose}>{copy.close}</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <fieldset disabled={status === "sending"} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="inquiry-name">{copy.name}</Label><Input id="inquiry-name" name="name" autoComplete="name" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="inquiry-email">{copy.email}</Label><Input id="inquiry-email" name="email" type="email" autoComplete="email" required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="inquiry-message">{copy.message}</Label><Textarea id="inquiry-message" name="message" required maxLength={4000} rows={5} placeholder={copy.placeholder} value={message} onChange={(e) => setMessage(e.target.value)} /></div>
              <input className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" name="_honey" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </fieldset>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-muted-foreground leading-relaxed">{copy.privacy}</p>
            <Button type="submit" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? <Loader2 className="animate-spin motion-reduce:animate-none" /> : <Send />}
              {status === "sending" ? copy.sending : copy.send}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}