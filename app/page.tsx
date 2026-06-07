import { ChatDemoSection } from "@/components/ChatDemoSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { IndustryUseCases } from "@/components/IndustryUseCases";
import { MetricsStrip } from "@/components/MetricsStrip";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ROISection } from "@/components/ROISection";
import { SolutionSection } from "@/components/SolutionSection";
import { ValueStack } from "@/components/ValueStack";
import { ContactForm } from "@/components/ContactForm";

const contactBenefits = [
  "krótka analiza",
  "pomysł na chatbota",
  "propozycja automatyzacji",
  "możliwość przygotowania demo"
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <MetricsStrip />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <IndustryUseCases />
      <ValueStack />
      <ChatDemoSection />
      <ROISection />
      <PricingSection />
      <FAQSection />

      <section
        id="kontakt"
        className="relative px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.16),transparent_32rem),radial-gradient(circle_at_80%_35%,rgba(168,85,247,0.16),transparent_30rem)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Kontakt
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Chcesz zobaczyć, jak AI mogłoby działać w Twojej firmie?
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              Zostaw kontakt i napisz, czym zajmuje się Twoja firma.
              Przygotujemy pomysł na chatbota lub automatyzację.
            </p>

            <div className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
              <h3 className="font-semibold text-white">Co dostaniesz?</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {contactBenefits.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.75)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
