import { Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { business, fullAddress, links, whatsappGreeting } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const actions = [
    { label: "Call Now", href: links.tel, icon: Phone, external: false, className: "btn-royal" },
    {
      label: "WhatsApp Us",
      href: links.whatsappWithText(whatsappGreeting),
      icon: MessageCircle,
      external: true,
      className: "btn-whatsapp",
    },
    { label: "Send Email", href: links.mailto, icon: Mail, external: false, className: "btn-outline" },
    { label: "Get Directions", href: links.directions, icon: Navigation, external: true, className: "btn-outline" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's Talk About Your Next Print Project"
          intro="Reach our team by phone, WhatsApp or email. For a detailed quotation, the request form above is the quickest way to share your specifications."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <address
            data-reveal
            className="relative overflow-hidden rounded-2xl bg-navy-900 p-7 not-italic text-white sm:p-10"
          >
            <div aria-hidden="true" className="dot-grid-dark absolute inset-0" />
            <div className="relative">
              <p className="text-2xl font-extrabold">{business.name}</p>
              <p className="mt-1 text-sm font-medium text-gold-300">{business.footerStatement}</p>

              <dl className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Address</span>
                  </dt>
                  <dd className="pt-2 leading-relaxed text-[#d5d8e8]">{fullAddress}.</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Phone and WhatsApp</span>
                  </dt>
                  <dd className="pt-2">
                    <a href={links.tel} className="font-semibold text-white underline-offset-4 hover:underline">
                      {business.phoneDisplay}
                    </a>
                    <span className="block text-sm text-[#aeb4cf]">Telephone &amp; WhatsApp</span>
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Email</span>
                  </dt>
                  <dd className="min-w-0 pt-2">
                    <a
                      href={links.mailto}
                      className="break-all font-semibold text-white underline-offset-4 hover:underline"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </address>

          <div data-reveal className="flex flex-col rounded-2xl border border-line bg-paper p-7 sm:p-10">
            <h3 className="text-xl font-bold text-navy-900">Get in touch</h3>
            <p className="mt-2 leading-relaxed text-muted">
              Our company profile states round-the-clock service availability. For visits to our premises, please
              call ahead to arrange a suitable time.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {actions.map(({ label, href, icon: IconCmp, external, className }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={`btn w-full ${className}`}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <IconCmp className="h-4 w-4" aria-hidden="true" />
                    {label}
                    {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-xs leading-relaxed text-muted">
              “Get Directions” opens a Google Maps search for our address in a new tab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
