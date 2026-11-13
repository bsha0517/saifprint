import { reasons } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading
            id="why-title"
            eyebrow="Why Al-Saif"
            title="Why Businesses Choose Us"
            intro="A production partner that takes responsibility for the whole job — and keeps you informed along the way."
          />
          <div data-reveal className="hidden overflow-hidden rounded-2xl lg:block">
            <Photo
              name="colour-swatch-fan-deck"
              alt="A fanned-out colour swatch guide used to match print colours (representative stock photo)"
              sizes="40vw"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }} className="bg-white p-7 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-200/40 text-gold-ink">
                  <Icon name={r.icon} className="h-6 w-6" />
                </span>
                <span aria-hidden="true" className="text-sm font-bold tracking-widest text-royal-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
