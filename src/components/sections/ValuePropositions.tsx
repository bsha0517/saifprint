import { valuePropositions } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

export function ValuePropositions() {
  return (
    <section aria-labelledby="value-title" className="relative z-10 -mt-12 lg:-mt-16">
      <div className="container-site">
        <h2 id="value-title" className="sr-only">
          What we offer
        </h2>
        <ul className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-lift md:grid-cols-3">
          {valuePropositions.map((v, i) => (
            <li
              key={v.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="flex gap-4 p-6 sm:p-7 md:border-l md:border-line md:first:border-l-0 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-line md:[&:not(:first-child)]:border-t-0"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                <Icon name={v.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{v.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
