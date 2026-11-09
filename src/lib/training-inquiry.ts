import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(4000),
  training: z.string().trim().min(1).max(300),
  subject: z.string().trim().min(1).max(200),
});

export const inquiryEndpoint = "https://formsubmit.co/ajax/ricardo.queiros@gmail.com";

export async function sendTrainingInquiry(input: unknown) {
  const data = inquirySchema.parse(input);
  const response = await fetch(inquiryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      "Formação": data.training,
      _subject: data.subject,
      _replyto: data.email,
      _template: "table",
    }),
  });
  if (!response.ok) throw new Error("Submission rejected");
  const result: unknown = await response.json();
  const parsed = z.object({ success: z.union([z.literal(true), z.literal("true")]) }).safeParse(result);
  if (!parsed.success) throw new Error("Submission not accepted");
}