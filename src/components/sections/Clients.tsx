import { clients } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading
          id="clients-title"
          eyebrow="Our Clients"
          title="Businesses That Have Chosen Al-Saif"
          intro="We are proud to have worked with the following organisations, as listed in our company profile."
        />
        <ul
          data-reveal
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-line [gap:1px] min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((c) => (
            <li
              key={c}
              className="flex min-h-[5.25rem] items-center gap-3 bg-white px-5 py-4 transition-colors hover:bg-royal-50/60"
            >
              <span aria-hidden="true" className="h-8 w-1 shrink-0 rounded-full bg-gold-500/80" />
              <span className="font-semibold leading-snug text-navy-900">{c}</span>
            </li>
          ))}
          {/* Fill remaining cells so the grid edge stays clean on 4-column layouts */}
          <li aria-hidden="true" className="hidden bg-white min-[400px]:block md:hidden" />
          <li aria-hidden="true" className="hidden bg-white lg:col-span-3 lg:block" />
        </ul>
        <p className="mt-5 text-sm text-muted">
          Client names are shown as text for identification only. Trademarks belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
