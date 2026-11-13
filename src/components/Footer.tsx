import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, fullAddress, links, navLinks, services, whatsappGreeting } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  // Evaluated at build time for the static export; rebuilds keep it current.
  // A tiny inline script below also updates it in the browser.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pb-24 pt-16 text-[#c9cde0] sm:pb-10" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Footer
      </h2>
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.2fr]">
          <div>
            <div className="inline-block rounded-xl bg-white px-4 py-3">
              <Logo variant="full" className="h-auto w-56 sm:w-64" />
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">
              A complete printing house offering digital pre-press, offset printing, custom packaging and
              post-press finishing for businesses.
            </p>
            <p className="mt-4 text-sm font-semibold text-gold-300">{business.footerStatement}</p>
            <a
              href={links.whatsappWithText(whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-6"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Quick Links</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="rounded transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className="rounded transition-colors hover:text-white">
                  Request a Quote
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="rounded transition-colors hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                <span className="leading-relaxed">{fullAddress}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                <a href={links.tel} className="rounded hover:text-white">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex min-w-0 gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                <a href={links.mailto} className="min-w-0 break-all rounded hover:text-white">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-start sm:justify-between">
          <p>
            © <span data-year>{year}</span> {business.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-[#aeb4cf] sm:text-right">
            Photography: representative stock images from Unsplash — they do not depict Al-Saif&apos;s premises,
            staff, machinery or customer work.
          </p>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=String(new Date().getFullYear())})",
        }}
      />
    </footer>
  );
}
