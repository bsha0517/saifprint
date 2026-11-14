"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, Copy, Info, Mail, MessageCircle, RotateCcw } from "lucide-react";
import { business, quoteServiceOptions } from "@/config/site";
import {
  buildMailtoUrl,
  buildQuoteMessage,
  buildWhatsAppUrl,
  emptyQuote,
  fieldLimits,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteInput,
} from "@/lib/quote";
import { QUOTE_SERVICE_EVENT } from "@/components/QuoteLink";

const fieldOrder: QuoteField[] = [
  "fullName",
  "company",
  "phone",
  "email",
  "service",
  "quantity",
  "details",
  "deadline",
];

const fieldLabels: Record<QuoteField, string> = {
  fullName: "Full Name",
  company: "Company Name",
  phone: "Phone / WhatsApp Number",
  email: "Email Address",
  service: "Service Required",
  quantity: "Estimated Quantity",
  details: "Project Details",
  deadline: "Preferred Deadline",
  dimensions: "Packaging Dimensions",
  material: "Material Preference",
  additional: "Additional Requirements",
};

type Prepared = { whatsappUrl: string; mailtoUrl: string; message: string };

export function QuoteForm() {
  const uid = useId();
  const [values, setValues] = useState<QuoteInput>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [prepared, setPrepared] = useState<Prepared | null>(null);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const id = (f: QuoteField) => `${uid}-${f}`;

  // Pre-select a service when a "Request a Quote" link on a service card is used.
  useEffect(() => {
    const onService = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (quoteServiceOptions.includes(service)) {
        setValues((v) => ({ ...v, service }));
        setErrors((er) => ({ ...er, service: undefined }));
      }
    };
    window.addEventListener(QUOTE_SERVICE_EVENT, onService);
    return () => window.removeEventListener(QUOTE_SERVICE_EVENT, onService);
  }, []);

  const update = (field: QuoteField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setPrepared(null);
    if (errors[field]) {
      // Re-validate this field as the user corrects it.
      const next = validateQuote({ ...values, [field]: value }, quoteServiceOptions);
      setErrors((er) => ({ ...er, [field]: next[field] }));
    }
  };

  const onBlur = (field: QuoteField) => {
    if (!values[field] && !errors[field]) return; // don't nag on untouched empty fields
    const next = validateQuote(values, quoteServiceOptions);
    setErrors((er) => ({ ...er, [field]: next[field] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateQuote(values, quoteServiceOptions);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setPrepared(null);
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    const message = buildQuoteMessage(values, business.name);
    const result: Prepared = {
      message,
      whatsappUrl: buildWhatsAppUrl(business.whatsappNumber, message),
      mailtoUrl: buildMailtoUrl(business.email, `Quotation request — ${values.company.trim()}`, message),
    };
    setPrepared(result);
    setCopied(false);
    window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const reset = () => {
    setValues(emptyQuote);
    setErrors({});
    setPrepared(null);
    setShowSummary(false);
    document.getElementById(id("fullName"))?.focus();
  };

  const copyMessage = async () => {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const errorList = fieldOrder.filter((f) => errors[f]);

  const fieldProps = (f: QuoteField) => ({
    id: id(f),
    name: f,
    value: values[f],
    maxLength: fieldLimits[f],
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${id(f)}-error` : undefined,
    onBlur: () => onBlur(f),
  });

  return (
    <section id="quote" aria-labelledby="quote-title" className="relative bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div data-reveal className="lg:pt-2">
          <p className="eyebrow">Request a Quotation</p>
          <h2
            id="quote-title"
            className="mt-4 text-3xl font-extrabold leading-[1.15] text-navy-900 sm:text-4xl lg:text-[2.75rem]"
          >
            Let&apos;s Bring Your Next Project to Life
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Tell us what you need printed or packaged, and our team will help you discuss the right solution.
          </p>

          <ol className="mt-10 space-y-5">
            {[
              ["Fill in the form", "Share your requirements, quantity and any deadlines."],
              ["Review in WhatsApp", "We open WhatsApp with your request already written out."],
              ["Press Send", "Your request reaches our team once you send the message."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-300">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold text-navy-900">{t}</span>
                  <span className="block text-[0.95rem] text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-line bg-white p-5">
            <p className="text-sm font-semibold text-navy-900">Prefer to talk directly?</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              <li>
                Call or WhatsApp:{" "}
                <a
                  href={`tel:${business.phoneE164}`}
                  className="whitespace-nowrap font-semibold text-royal-600 underline-offset-2 hover:underline"
                >
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="min-w-0">
                Email:{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="font-semibold text-royal-600 [overflow-wrap:anywhere] underline-offset-2 hover:underline"
                >
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal className="rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-8 lg:p-10">
          <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-required-note`}>
            <p id={`${uid}-required-note`} className="mb-6 text-sm text-muted">
              Fields marked <span aria-hidden="true" className="font-bold text-[#b42318]">*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            {showSummary && errorList.length > 0 ? (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="mb-6 rounded-xl border border-[#f1b5ae] bg-[#fef3f2] p-4 text-[#7a271a]"
              >
                <p className="flex items-center gap-2 font-bold">
                  <CircleAlert className="h-5 w-5" aria-hidden="true" />
                  Please correct {errorList.length === 1 ? "1 field" : `${errorList.length} fields`} below:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-9 text-sm">
                  {errorList.map((f) => (
                    <li key={f}>
                      <a href={`#${id(f)}`} className="underline underline-offset-2">
                        {fieldLabels[f]}
                      </a>
                      : {errors[f]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={id("fullName")} label={fieldLabels.fullName} required error={errors.fullName}>
                <input {...fieldProps("fullName")} type="text" autoComplete="name" required className="field"
                  onChange={(e) => update("fullName", e.target.value)} />
              </Field>
              <Field id={id("company")} label={fieldLabels.company} required error={errors.company}>
                <input {...fieldProps("company")} type="text" autoComplete="organization" required className="field"
                  onChange={(e) => update("company", e.target.value)} />
              </Field>
              <Field id={id("phone")} label={fieldLabels.phone} required error={errors.phone}>
                <input {...fieldProps("phone")} type="tel" autoComplete="tel" inputMode="tel" required
                  placeholder="0300 1234567" className="field"
                  onChange={(e) => update("phone", e.target.value)} />
              </Field>
              <Field id={id("email")} label={fieldLabels.email} required error={errors.email}>
                <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required
                  placeholder="name@company.com" className="field"
                  onChange={(e) => update("email", e.target.value)} />
              </Field>
              <Field id={id("service")} label={fieldLabels.service} required error={errors.service}>
                <select {...fieldProps("service")} required className="field"
                  onChange={(e) => update("service", e.target.value)}>
                  <option value="">Select a service…</option>
                  {quoteServiceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={id("quantity")} label={fieldLabels.quantity} required error={errors.quantity}>
                <input {...fieldProps("quantity")} type="text" required placeholder="e.g. 5,000 cartons"
                  className="field" onChange={(e) => update("quantity", e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field id={id("details")} label={fieldLabels.details} required error={errors.details}
                  hint="Describe the item, size, colours, finishing and anything else we should know.">
                  <textarea {...fieldProps("details")} required rows={5}
                    aria-describedby={[`${id("details")}-hint`, errors.details ? `${id("details")}-error` : ""]
                      .filter(Boolean).join(" ")}
                    className="field min-h-[8.5rem] resize-y" onChange={(e) => update("details", e.target.value)} />
                </Field>
              </div>
            </div>

            <fieldset className="mt-8 border-t border-line pt-6">
              <legend className="text-sm font-bold uppercase tracking-[0.12em] text-navy-900">
                Optional details
              </legend>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field id={id("deadline")} label={fieldLabels.deadline} error={errors.deadline}>
                  <input {...fieldProps("deadline")} type="date" className="field"
                    onFocus={(e) => (e.currentTarget.min = todayIso())}
                    onChange={(e) => update("deadline", e.target.value)} />
                </Field>
                <Field id={id("dimensions")} label={fieldLabels.dimensions}>
                  <input {...fieldProps("dimensions")} type="text" placeholder="e.g. 120 × 60 × 30 mm"
                    className="field" onChange={(e) => update("dimensions", e.target.value)} />
                </Field>
                <Field id={id("material")} label={fieldLabels.material}>
                  <input {...fieldProps("material")} type="text" placeholder="e.g. art card, kraft"
                    className="field" onChange={(e) => update("material", e.target.value)} />
                </Field>
                <Field id={id("additional")} label={fieldLabels.additional}>
                  <input {...fieldProps("additional")} type="text" placeholder="e.g. lamination, embossing"
                    className="field" onChange={(e) => update("additional", e.target.value)} />
                </Field>
              </div>
            </fieldset>

            <div className="mt-8 flex gap-3 rounded-xl bg-royal-50 p-4 text-sm leading-relaxed text-navy-800">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-royal-600" aria-hidden="true" />
              <p>
                <strong>How this works:</strong> pressing the button below opens WhatsApp with your details
                written into a message to {business.name}. Nothing is sent until you press <em>Send</em> in
                WhatsApp. This website does not store your information; once sent, your message is handled by
                WhatsApp and our team.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-whatsapp w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Continue to WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </button>
              <button type="button" onClick={reset} className="btn btn-outline w-full sm:w-auto">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Clear form
              </button>
            </div>

            <div aria-live="polite">
              {prepared ? (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  className="mt-6 rounded-xl border border-[#a6d8bb] bg-[#effaf3] p-5 text-[#0b4a2a]"
                >
                  <p className="font-bold">Your message is ready in WhatsApp — please press Send to deliver it.</p>
                  <p className="mt-1.5 text-sm">
                    Your request has <strong>not</strong> been sent yet. If WhatsApp didn&apos;t open, use one of the
                    options below.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={prepared.whatsappUrl} target="_blank" rel="noopener noreferrer"
                      className="btn btn-whatsapp !min-h-11 !px-4 text-sm">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Open WhatsApp again
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <a href={prepared.mailtoUrl} className="btn btn-outline !min-h-11 !px-4 text-sm">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Send by email instead
                    </a>
                    <button type="button" onClick={copyMessage} className="btn btn-outline !min-h-11 !px-4 text-sm">
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      {copied ? "Message copied" : "Copy message"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-[#b42318]">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-medium text-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-0.5 mb-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-[#b42318]">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Today's date as yyyy-mm-dd in the visitor's timezone (earliest selectable deadline). */
function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
