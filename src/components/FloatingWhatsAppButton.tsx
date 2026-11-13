"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { links, whatsappGreeting } from "@/config/site";

/**
 * Floating WhatsApp shortcut. Appears after the hero and hides while the
 * quotation form or contact section is on screen, so it never covers form controls.
 */
export function FloatingWhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const blockers = ["quote", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const state = { pastHero: false, blocked: new Set<Element>() };
    const sync = () => setVisible(state.pastHero && state.blocked.size === 0);

    const heroIo = new IntersectionObserver(([e]) => {
      state.pastHero = !e.isIntersecting;
      sync();
    });
    const blockIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) state.blocked.add(e.target);
          else state.blocked.delete(e.target);
        }
        sync();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    if (hero) heroIo.observe(hero);
    blockers.forEach((b) => blockIo.observe(b));
    return () => {
      heroIo.disconnect();
      blockIo.disconnect();
    };
  }, []);

  return (
    <a
      href={links.whatsappWithText(whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-8px_rgb(15_122_65/0.6)] ring-4 ring-white transition-[opacity,transform] duration-300 hover:bg-whatsapp-dark sm:bottom-7 sm:right-7 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
