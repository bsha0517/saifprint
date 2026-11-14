import { CheckCircle2, Compass, Target } from "lucide-react";
import { mission, strengths, vision } from "@/config/site";
import { Photo } from "@/components/ui/Photo";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-site grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="relative lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl">
            <Photo
              name="prepress-colour-control-loupe"
              alt="A printer's loupe resting on a CMYK colour control chart used for pre-press checks (representative stock photo)"
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-line bg-white p-5 shadow-lift sm:left-auto sm:right-8 sm:max-w-xs">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-ink">Under one roof</p>
            <p className="mt-2 text-[0.95rem] font-semibold leading-snug text-navy-900">
              Digital pre-press, offset printing and post-press finishing.
            </p>
          </div>
        </div>

        <div className="pt-6 lg:pt-0">
          <div data-reveal>
            <p className="eyebrow">About Al-Saif Print &amp; Pack</p>
            <h2
              id="about-title"
              className="mt-4 text-3xl font-extrabold leading-[1.15] text-navy-900 sm:text-4xl lg:text-[2.75rem]"
            >
              Your Partner in Print &amp; Packaging
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                At Al-Saif Print &amp; Pack, a printing and packaging company in Lahore, we bring together printing expertise, creative design support and
                finishing capabilities to deliver practical solutions for businesses across different industries.
              </p>
              <p>
                From the initial artwork and pre-press preparation to offset printing and final finishing, our
                team works to turn customer requirements into professionally produced printed materials and
                packaging.
              </p>
              <p>
                We value long-term business relationships. Every job starts with understanding what you need —
                specifications, quantities and timelines — and continues with careful attention to production
                detail until the order is ready.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <article data-reveal className="rounded-2xl bg-navy-900 p-6 text-white">
              <Compass className="h-7 w-7 text-gold-300" aria-hidden="true" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-bold">Our Vision</h3>
              <p className="mt-2 leading-relaxed text-[#c9cde0]">{vision}</p>
            </article>
            <article data-reveal className="rounded-2xl border border-line bg-paper p-6">
              <Target className="h-7 w-7 text-royal-600" aria-hidden="true" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-bold text-navy-900">Our Mission</h3>
              <p className="mt-2 leading-relaxed text-muted">{mission}</p>
            </article>
          </div>

          <div data-reveal className="mt-10">
            <h3 className="text-lg font-bold text-navy-900">Our strengths</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {strengths.map((s) => (
                <li key={s} className="flex gap-3 text-[0.975rem] leading-snug text-ink">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
