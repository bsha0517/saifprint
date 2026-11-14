import { ArrowRight, ArrowUpRight } from "lucide-react";
import { finishingOptions, services } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteLink } from "@/components/QuoteLink";

export function Services() {
  const featured = services.filter((s) => s.image);
  const finishing = services.find((s) => s.id === "print-finishing")!;
  const standard = services.filter((s) => !s.image && s.id !== "print-finishing");

  return (
    <section id="services" aria-labelledby="services-title" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Our Printing & Packaging Services"
            title="Complete Printing & Packaging Solutions"
            intro="From everyday business essentials to specialised packaging, we provide printing solutions tailored to your requirements."
          />
          <div data-reveal className="shrink-0">
            <QuoteLink className="btn btn-royal">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </QuoteLink>
          </div>
        </div>

        {/* Featured services with photography */}
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift ${
                i === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <Photo
                  name={s.image!.src}
                  alt={s.image!.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-royal-600 shadow-card">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2.5 flex-1 leading-relaxed text-muted">{s.description}</p>
                <QuoteLink
                  service={s.title}
                  label={`Request a quote for ${s.title}`}
                  className="mt-4 inline-flex min-h-8 items-center gap-1.5 self-start rounded-md py-1 text-[0.95rem] font-bold text-royal-600 hover:text-royal-700"
                >
                  Request a Quote
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </QuoteLink>
              </div>
            </li>
          ))}
        </ul>

        {/* Remaining services */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {standard.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-royal-200 hover:shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 transition-colors group-hover:bg-royal-600 group-hover:text-white">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[1.05rem] font-bold leading-snug text-navy-900">{s.title}</h3>
              <p className="mt-2 flex-1 text-[0.94rem] leading-relaxed text-muted">{s.description}</p>
              <QuoteLink
                service={s.title}
                label={`Request a quote for ${s.title}`}
                className="mt-3 inline-flex min-h-8 items-center gap-1.5 self-start rounded-md py-1 text-sm font-bold text-royal-600 hover:text-royal-700"
              >
                Request a Quote
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </QuoteLink>
            </li>
          ))}
          <li
            data-reveal
            className="flex flex-col justify-between rounded-2xl border border-dashed border-royal-200 bg-royal-50/60 p-6"
          >
            <div>
              <h3 className="text-[1.05rem] font-bold leading-snug text-navy-900">Need something else?</h3>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">
                Tell us about your item and quantity — we will let you know how we can help.
              </p>
            </div>
            <QuoteLink service="Other / Not sure yet" className="btn btn-royal mt-5 !min-h-11 self-start !px-4 text-sm">
              Ask Our Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </QuoteLink>
          </li>
        </ul>

        {/* Finishing */}
        <div
          data-reveal
          className="relative mt-6 overflow-hidden rounded-2xl bg-navy-900 p-7 text-white sm:p-10"
        >
          <div aria-hidden="true" className="dot-grid-dark absolute inset-0" />
          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:items-center">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-navy-900">
                <Icon name={finishing.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl font-bold">{finishing.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#c9cde0]">{finishing.description}</p>
              <QuoteLink service={finishing.title} className="btn btn-gold mt-6">
                Discuss Finishing Options
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </QuoteLink>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Finishing options">
              {finishingOptions.map((f) => (
                <li key={f.title} className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5">
                  <span aria-hidden="true" className="mb-2 block h-0.5 w-6 bg-gold-500" />
                  <h4 className="text-[0.95rem] font-semibold">{f.title}</h4>
                  <p className="mt-1 text-sm leading-snug text-[#aeb4cf]">{f.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
