import { ArrowRight, Printer, Scissors } from "lucide-react";
import { finishingEquipment, printingEquipment } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="dot-grid-dark absolute inset-0" />
      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="capabilities-title"
              eyebrow="Printing & Finishing Capabilities"
              title="Technology Behind Every Print"
              intro="Our company profile identifies a range of printing and finishing equipment that lets us take jobs from press to finished product in-house."
              dark
            />
            <figure data-reveal className="mt-10">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Photo
                  name="heidelberg-gto-offset-press"
                  alt="A single-colour sheet-fed offset press of the Heidelberg GTO type (representative stock photo)"
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="aspect-[4/3] w-full object-cover object-[50%_60%]"
                />
              </div>
              <figcaption className="mt-3 text-sm text-[#aeb4cf]">
                Representative stock image of a sheet-fed offset press — not a photograph of Al-Saif&apos;s facility.
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col gap-6 lg:pt-4">
            <article data-reveal className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-navy-900">
                  <Printer className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="text-xl font-bold">Printing Equipment</h3>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {printingEquipment.map((m) => (
                  <li key={m.name} className="rounded-xl bg-white/[0.06] p-4">
                    <p className="font-semibold leading-snug">{m.name}</p>
                    <p className="mt-1 text-sm text-[#aeb4cf]">{m.note}</p>
                  </li>
                ))}
              </ul>
            </article>

            <article data-reveal className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-navy-900">
                  <Scissors className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="text-xl font-bold">Finishing Equipment</h3>
              </div>
              <ul className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {finishingEquipment.map((m) => (
                  <li key={m.name} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span>
                      <span className="block font-semibold">{m.name}</span>
                      <span className="block text-sm text-[#aeb4cf]">{m.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <div data-reveal className="flex flex-col items-start gap-4 rounded-2xl bg-royal-600 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <p className="text-lg font-semibold leading-snug">
                Not sure which process suits your job? Talk to our team.
              </p>
              <a href="#quote" className="btn btn-gold shrink-0">
                Discuss Your Printing Requirements
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
