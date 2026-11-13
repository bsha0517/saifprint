// Run with: npm test   (uses Node's built-in test runner with TypeScript type stripping)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildMailtoUrl,
  buildQuoteMessage,
  buildWhatsAppUrl,
  emptyQuote,
  isValidEmail,
  isValidPhone,
  sanitize,
  validateQuote,
  type QuoteInput,
} from "./quote.ts";

const services = ["Offset Printing", "Custom Packaging"];

const valid: QuoteInput = {
  ...emptyQuote,
  fullName: "Ayesha Khan",
  company: "Example Foods (Pvt) Ltd",
  phone: "0300 1234567",
  email: "ayesha@example.com",
  service: "Custom Packaging",
  quantity: "5,000 boxes",
  details: "Printed folding cartons with spot UV on the logo.",
};

test("valid input has no errors", () => {
  assert.deepEqual(validateQuote(valid, services), {});
});

test("all required fields are reported when empty", () => {
  const errors = validateQuote(emptyQuote, services);
  for (const f of ["fullName", "company", "phone", "email", "service", "quantity", "details"]) {
    assert.ok(errors[f as keyof typeof errors], `expected error for ${f}`);
  }
  assert.equal(errors.deadline, undefined);
});

test("whitespace-only values count as empty", () => {
  const errors = validateQuote({ ...valid, fullName: "   ", details: " \n\n " }, services);
  assert.ok(errors.fullName);
  assert.ok(errors.details);
});

test("email validation", () => {
  assert.ok(isValidEmail("a.b@company.com.pk"));
  assert.ok(!isValidEmail("no-at-sign.com"));
  assert.ok(!isValidEmail("a@b"));
  assert.ok(!isValidEmail("a b@c.com"));
});

test("phone validation accepts local and international formats", () => {
  assert.ok(isValidPhone("0300 1234567"));
  assert.ok(isValidPhone("+92 300 1234567"));
  assert.ok(isValidPhone("(042) 3512-3456"));
  assert.ok(!isValidPhone("12345"));
  assert.ok(!isValidPhone("+92 300 abc4567"));
});

test("service must come from the allowed list", () => {
  assert.ok(validateQuote({ ...valid, service: "Something else" }, services).service);
});

test("invalid deadline is rejected, valid deadline accepted", () => {
  assert.ok(validateQuote({ ...valid, deadline: "2026-02-30" }, services).deadline);
  assert.equal(validateQuote({ ...valid, deadline: "2026-12-15" }, services).deadline, undefined);
});

test("sanitize strips control and bidi characters and enforces limits", () => {
  assert.equal(sanitize("Ali\u0000‮ Raza​", "fullName"), "Ali Raza");
  assert.equal(sanitize("a\n\n\n\nb", "details"), "a\n\nb");
  assert.equal(sanitize("line1\nline2", "company"), "line1 line2");
  assert.equal(sanitize("x".repeat(500), "fullName").length, 80);
});

test("message contains the supplied details in the expected format", () => {
  const msg = buildQuoteMessage({ ...valid, deadline: "2026-12-15", material: "Art card" }, "Al-Saif Print & Pack");
  assert.match(msg, /^Hello Al-Saif Print & Pack,\nI would like to request a quotation\./);
  assert.match(msg, /Name: Ayesha Khan/);
  assert.match(msg, /Service: Custom Packaging/);
  assert.match(msg, /Deadline: 15 Dec 2026/);
  assert.match(msg, /Material Preference: Art card/);
  assert.doesNotMatch(msg, /Packaging Dimensions/);
  assert.match(msg, /Please contact me to discuss the requirements\.$/);
});

test("WhatsApp URL is correctly encoded and cannot be hijacked by input", () => {
  const msg = buildQuoteMessage({ ...valid, details: "Need 100 & more? #urgent https://evil.example/?a=b" }, "Al-Saif");
  const url = buildWhatsAppUrl("923006591090", msg);
  const parsed = new URL(url);
  assert.equal(parsed.origin, "https://wa.me");
  assert.equal(parsed.pathname, "/923006591090");
  assert.equal(parsed.hash, "");
  assert.equal([...parsed.searchParams.keys()].join(","), "text");
  assert.equal(parsed.searchParams.get("text"), msg);
});

test("mailto URL encodes subject and body", () => {
  const url = buildMailtoUrl("info@example.com", "Quote & request", "Line 1\nLine 2");
  assert.equal(url, "mailto:info@example.com?subject=Quote%20%26%20request&body=Line%201%0ALine%202");
});
