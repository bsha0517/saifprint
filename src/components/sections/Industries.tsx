import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  FlaskConical,
  Megaphone,
  ShoppingCart,
  Sparkles,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { clients, industries } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const industryIcons: Record<string, LucideIcon> = {
  pharmaceuticals: FlaskConical,
  "food-beverages": Utensils,
  cosmetics: Sparkles,
  "retail-consumer": ShoppingCart,
  corporate: Briefcase,
  "marketing-advertising": Megaphone,
};

const pharmaClients = clients.filter((c) => c.endsWith("Pharma"));

export function Industries() {
  const [pharma, ...rest] = industries;

  return (
    <section id="industries" aria-labelledby="industries-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries We Serve"
          title="Printing Solutions for Every Industry"
          intro="We work with businesses that need dependable, consistent print. Sectors marked “Listed clients” are those where our company profile names existing customers; the others are sectors our capabilities are suited to."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Featured: Pharmaceuticals */}
          <article
            data-reveal
            className="relative flex flex-col overflow-hidden rounded-2xl bg-navy-900 p-7 text-white sm:p-9 lg:col-span-2"
          >
            <div aria-hidden="true" className="dot-grid-dark absolute inset-0" />
            <FlaskConical
              aria-hidden="true"
              strokeWidth={1}
              className="absolute -right-8 -top-6 h-48 w-48 text-white/[0.06]"
            />
            <div className="relative flex flex-1 flex-col">
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-900">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Listed clients · Core sector
              </span>
              <h3 className="mt-6 flex items-center gap-3 text-2xl font-bold sm:text-[1.7rem]">
                <FlaskConical className="h-7 w-7 text-gold-300" aria-hidden="true" strokeWidth={1.75} />
                {pharma.title}
              </h3>
              <p className="mt-3 leading-relaxed text-[#d5d8e8]">{pharma.description}</p>
              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                  Pharmaceutical clients include
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {pharmaClients.slice(0, 12).map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-sm font-medium"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <a
                  href="#clients"
                  className="mt-4 inline-flex min-h-8 items-center gap-1.5 rounded-md py-1 text-sm font-bold text-gold-300 hover:text-white"
                >
                  View all listed clients
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {rest.map((ind, i) => {
              const IconCmp = industryIcons[ind.id];
              return (
                <li
                  key={ind.id}
                  data-reveal
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                      <IconCmp className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    {ind.establishedClients ? (
                      <span className="rounded-full bg-gold-200/70 px-2.5 py-1 text-xs font-bold text-gold-ink">
                        Listed clients
                      </span>
                    ) : (
                      <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-muted ring-1 ring-line">
                        We can support
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">{ind.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{ind.description}</p>
                </li>
              );
            })}
            <li
              data-reveal
              className="flex flex-col justify-between rounded-2xl border border-dashed border-royal-200 bg-royal-50/60 p-6"
            >
              <div>
                <h3 className="text-lg font-bold text-navy-900">Another industry?</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  Share your requirements and we will discuss whether our printing and finishing capabilities are a
                  good fit.
                </p>
              </div>
              <a href="#quote" className="btn btn-royal mt-5 !min-h-11 self-start !px-4 text-sm">
                Discuss Your Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
