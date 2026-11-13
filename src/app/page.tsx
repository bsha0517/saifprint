import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { RevealObserver } from "@/components/RevealObserver";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/sections/Hero";
import { ValuePropositions } from "@/components/sections/ValuePropositions";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { Clients } from "@/components/sections/Clients";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ValuePropositions />
        <About />
        <Services />
        <Industries />
        <Capabilities />
        <Process />
        <Clients />
        <WhyChooseUs />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <RevealObserver />
    </>
  );
}
