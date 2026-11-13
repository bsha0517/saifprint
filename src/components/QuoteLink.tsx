"use client";

import type { ReactNode } from "react";

export const QUOTE_SERVICE_EVENT = "alsaif:quote-service";

/**
 * Anchor to the quotation form that also pre-selects a service in the form.
 * Works as a plain link if JavaScript is unavailable.
 */
export function QuoteLink({
  service,
  className,
  children,
  label,
}: {
  service?: string;
  className?: string;
  children: ReactNode;
  /** Accessible name when the visible text is generic (e.g. "Request a Quote"). */
  label?: string;
}) {
  return (
    <a
      href="#quote"
      className={className}
      aria-label={label}
      onClick={() => {
        if (service) window.dispatchEvent(new CustomEvent(QUOTE_SERVICE_EVENT, { detail: service }));
      }}
    >
      {children}
    </a>
  );
}
