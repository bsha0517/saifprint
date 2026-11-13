"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { business, links, navLinks, whatsappGreeting } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Elevated header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: Escape to close, focus trap, scroll lock, close on desktop resize.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = [
        toggleRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button"),
      ].filter((el): el is HTMLElement => Boolean(el));
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-white/95 shadow-[0_6px_24px_-16px_rgb(23_29_61/0.35)] backdrop-blur"
          : "border-b border-transparent bg-white"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#home" className="rounded-md">
          <Logo />
          <span className="sr-only"> — back to top</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "location" : undefined}
                  className={`relative rounded-md px-2.5 py-2 text-[0.9rem] font-semibold transition-colors xl:px-3 ${
                    active === l.href ? "text-royal-600" : "text-navy-900 hover:text-royal-600"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-500 transition-opacity ${
                      active === l.href ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={links.whatsappWithText(whatsappGreeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline hidden !min-h-11 !px-4 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4 text-whatsapp" aria-hidden="true" />
            WhatsApp Us
            <span className="sr-only">(opens WhatsApp in a new tab)</span>
          </a>
          <a href="#quote" className="btn btn-royal hidden !min-h-11 !px-4 sm:inline-flex">
            Get a Quote
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-4">
          <ul className="divide-y divide-line">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => close()}
                  aria-current={active === l.href ? "location" : undefined}
                  className="flex min-h-12 items-center justify-between py-3 text-base font-semibold text-navy-900"
                >
                  {l.label}
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3 pb-2 sm:grid-cols-3">
            <a href="#quote" onClick={() => close()} className="btn btn-royal">
              Get a Quote
            </a>
            <a
              href={links.whatsappWithText(whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
            <a href={links.tel} className="btn btn-outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
