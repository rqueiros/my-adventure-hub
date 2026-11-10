import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { inquiryEndpoint, inquirySchema } from "./training-inquiry";

const valid = { name: "Visitante", email: "visitante@example.com", message: "Gostaria de saber mais.", training: "Gamificação no Moodle", subject: "PEDIDO RICARDOQUEIROS.COM" };
describe("training inquiry", () => {
  test("routes inquiries to Ricardo's requested mailbox", () => {
    assert.equal(inquiryEndpoint, "https://formsubmit.co/ajax/ricardo.queiros@gmail.com");
  });
  test("accepts a name, email, message and selected training", () => {
    assert.deepEqual(inquirySchema.parse(valid), valid);
  });
  test("rejects invalid email and empty personal fields", () => {
    assert.equal(inquirySchema.safeParse({ ...valid, email: "invalid" }).success, false);
    assert.equal(inquirySchema.safeParse({ ...valid, name: " " }).success, false);
    assert.equal(inquirySchema.safeParse({ ...valid, message: " " }).success, false);
  });
});