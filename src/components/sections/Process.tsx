import { processSteps } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <SectionHeading
          id="process-title"
          eyebrow="How We Work"
          title="From Concept to Finished Print"
          intro="A typical workflow for a print or packaging order. Every job is different, so the exact steps depend on what your project needs."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-5 md:gap-5">
          {/* connecting line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 md:block"
          />
          {/* connecting line (mobile) */}
          <span aria-hidden="true" className="absolute bottom-8 left-7 top-8 w-px bg-gold-500/40 md:hidden" />
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-white text-lg font-extrabold text-navy-900 shadow-card">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 md:pt-6">
                <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
