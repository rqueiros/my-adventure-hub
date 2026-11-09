import { describe, expect, test } from "bun:test";
import { inquiryEndpoint, inquirySchema } from "./training-inquiry";

const valid = { name: "Visitante", email: "visitante@example.com", message: "Gostaria de saber mais.", training: "Gamificação no Moodle", subject: "PEDIDO RICARDOQUEIROS.COM" };
describe("training inquiry", () => {
  test("routes inquiries to Ricardo's requested mailbox", () => {
    expect(inquiryEndpoint).toBe("https://formsubmit.co/ajax/ricardo.queiros@gmail.com");
  });
  test("accepts a name, email, message and selected training", () => {
    expect(inquirySchema.parse(valid)).toEqual(valid);
  });
  test("rejects invalid email and empty personal fields", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, name: " " }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, message: " " }).success).toBe(false);
  });
});