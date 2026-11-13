/**
 * Quotation request: validation, sanitisation and WhatsApp/e-mail message building.
 * Dependency-free so it can be unit-tested with `node --test`.
 */

export interface QuoteInput {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  quantity: string;
  details: string;
  deadline: string; // yyyy-mm-dd from <input type="date">, optional
  dimensions: string; // optional
  material: string; // optional
  additional: string; // optional
}

export type QuoteField = keyof QuoteInput;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const emptyQuote: QuoteInput = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  service: "",
  quantity: "",
  details: "",
  deadline: "",
  dimensions: "",
  material: "",
  additional: "",
};

export const fieldLimits: Record<QuoteField, number> = {
  fullName: 80,
  company: 120,
  phone: 20,
  email: 254,
  service: 80,
  quantity: 80,
  details: 1200,
  deadline: 10,
  dimensions: 120,
  material: 120,
  additional: 600,
};

const multiline: ReadonlySet<QuoteField> = new Set<QuoteField>(["details", "additional"]);

/**
 * Removes control / invisible formatting characters, normalises whitespace and
 * enforces a maximum length. Newlines are kept only for multi-line fields.
 */
export function sanitize(value: string, field: QuoteField): string {
  let v = (value ?? "").normalize("NFC");
  // Strip C0/C1 control chars (except \n), zero-width & bidi override characters.
  v = v.replace(/\r\n?/g, "\n");
  v = v.replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F​-‏‪-‮⁠-⁩﻿]/g, "");
  if (multiline.has(field)) {
    v = v
      .split("\n")
      .map((line) => line.replace(/[ \t]+/g, " ").trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  } else {
    v = v.replace(/\s+/g, " ");
  }
  return v.trim().slice(0, fieldLimits[field]);
}

export function sanitizeAll(input: QuoteInput): QuoteInput {
  const out = { ...emptyQuote };
  for (const key of Object.keys(emptyQuote) as QuoteField[]) {
    out[key] = sanitize(input[key] ?? "", key);
  }
  return out;
}

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

/** Accepts local (03xx xxxxxxx) and international (+92 3xx …) formats: 10–15 digits. */
export function isValidPhone(phone: string): boolean {
  const compact = phone.replace(/[\s\-().]/g, "");
  return /^\+?\d{10,15}$/.test(compact);
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function validateQuote(raw: QuoteInput, allowedServices: readonly string[]): QuoteErrors {
  const q = sanitizeAll(raw);
  const errors: QuoteErrors = {};

  if (q.fullName.length < 2) errors.fullName = "Please enter your full name.";
  if (q.company.length < 2) errors.company = "Please enter your company name.";

  if (!q.phone) errors.phone = "Please enter a phone or WhatsApp number.";
  else if (!isValidPhone(q.phone))
    errors.phone = "Please enter a valid number, e.g. 0300 1234567 or +92 300 1234567.";

  if (!q.email) errors.email = "Please enter your email address.";
  else if (!isValidEmail(q.email)) errors.email = "Please enter a valid email address, e.g. name@company.com.";

  if (!q.service) errors.service = "Please choose the service you need.";
  else if (!allowedServices.includes(q.service)) errors.service = "Please choose a service from the list.";

  if (!q.quantity) errors.quantity = "Please give an estimated quantity, e.g. 5,000 cartons.";

  if (q.details.length < 10)
    errors.details = "Please describe your project in a little more detail (at least 10 characters).";

  if (q.deadline && !isValidDate(q.deadline)) errors.deadline = "Please enter a valid date.";

  return errors;
}

function formatDate(value: string): string {
  if (!isValidDate(value)) return value;
  const [y, m, d] = value.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}

/** Builds the plain-text quotation message from *sanitised* input. */
export function buildQuoteMessage(raw: QuoteInput, businessName: string): string {
  const q = sanitizeAll(raw);
  const lines: string[] = [
    `Hello ${businessName},`,
    "I would like to request a quotation.",
    "",
    `Name: ${q.fullName}`,
    `Company: ${q.company}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email}`,
    `Service: ${q.service}`,
    `Quantity: ${q.quantity}`,
    `Deadline: ${q.deadline ? formatDate(q.deadline) : "Not specified"}`,
  ];
  if (q.dimensions) lines.push(`Packaging Dimensions: ${q.dimensions}`);
  if (q.material) lines.push(`Material Preference: ${q.material}`);
  lines.push("", "Project Details:", q.details);
  if (q.additional) lines.push("", "Additional Requirements:", q.additional);
  lines.push("", "Please contact me to discuss the requirements.");
  return lines.join("\n");
}

/** wa.me deep link. The number must be digits only (country code, no +). */
export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
