import { clients } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Empty white cells that complete the last row of the grid at each breakpoint, so the
 * 1px "gap" background never shows through as grey blocks. Derived from the client count.
 * Columns: 1 (<340px), 2 (≥340px), 3 (≥768px), 4 (≥1024px).
 */
function fillerCells(count: number) {
  const cells: { key: string; className: string }[] = [];
  const add = (n: number, key: string, className: string) => {
    for (let i = 0; i < n; i++) cells.push({ key: `${key}-${i}`, className });
  };
  const missing = (cols: number) => (cols - (count % cols)) % cols;
  add(missing(2), "two", "hidden bg-white min-[340px]:block md:hidden");
  add(missing(3), "three", "hidden bg-white md:block lg:hidden");
  add(missing(4), "four", "hidden bg-white lg:block");
  return cells;
}

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
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-line [gap:1px] min-[340px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((c) => (
            <li
              key={c}
              className="flex min-h-[3.75rem] items-center gap-2.5 bg-white px-3.5 py-3 transition-colors hover:bg-royal-50/60 sm:min-h-[4.5rem] sm:gap-3 sm:px-5 sm:py-4"
            >
              <span aria-hidden="true" className="h-7 w-1 shrink-0 rounded-full bg-gold-500/80 sm:h-8" />
              <span className="min-w-0 text-[0.875rem] font-semibold leading-snug text-navy-900 [overflow-wrap:anywhere] sm:text-base">
                {c}
              </span>
            </li>
          ))}
          {fillerCells(clients.length).map((f) => (
            <li key={f.key} aria-hidden="true" className={f.className} />
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          Client names are shown as text for identification only. Trademarks belong to their respective owners.
        </p>
      </div>
    </section>
  );
}
