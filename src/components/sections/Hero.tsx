import { ArrowRight, Check } from "lucide-react";
import { finishingOptions } from "@/config/site";
import { Photo } from "@/components/ui/Photo";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-navy-900 pt-[4.5rem] text-white"
    >
      <div aria-hidden="true" className="dot-grid-dark absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-royal-600/25 blur-3xl"
      />
      <div className="container-site relative grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow eyebrow-on-dark">Printing &amp; Packaging · Lahore</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.35rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
          >
            Printing Excellence.{" "}
            <span className="text-gold-300">Packaging That Makes an Impression.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#c9cde0]">
            From precision offset printing to custom packaging and premium finishing, Al-Saif Print &amp;
            Pack helps businesses bring their ideas to life with professional printing solutions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className="btn btn-gold">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#services" className="btn btn-outline-light">
              Explore Our Services
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#c9cde0]">
            {["Pre-press", "Offset printing", "Post-press finishing"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative motion-safe:animate-fade-up [animation-delay:120ms]">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-gold-500 sm:-left-6 sm:-top-6"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-gold-500 sm:-bottom-6 sm:-right-6"
          />
          <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
            <Photo
              name="hero-offset-press-in-motion"
              alt="Printed sheets running at speed through an industrial printing press (representative stock photo)"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 92vw"
              priority
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-navy-950/85 to-transparent min-[420px]:block"
            />
            <div className="absolute inset-x-0 bottom-0 hidden p-5 min-[420px]:block sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Finishing options</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Available finishing options">
                {finishingOptions.slice(0, 5).map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
