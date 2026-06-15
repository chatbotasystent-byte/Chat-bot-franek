import { AIDashboardIllustration } from "@/components/AIDashboardIllustration";
import { ChatModal } from "@/components/ChatModal";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { LeadMechanismsSection } from "@/components/LeadMechanismsSection";
import { Navbar } from "@/components/Navbar";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";

const suggestions = [
  "Mam firmę usługową",
  "Mam salon beauty",
  "Mam warsztat samochodowy",
  "Mam komis samochodowy",
  "Chcę zostawić kontakt",
];

const heroPills = [
  "24/7 na stronie",
  "Leady na maila",
  "Google Sheets",
  "Bez przebudowy strony",
];

const howItWorks = [
  {
    title: "Klient zadaje pytanie",
    description: "Chatbot pojawia się na stronie i prowadzi rozmowę.",
  },
  {
    title: "AI zbiera dane",
    description: "System dopytuje o kontakt, usługę, termin lub szczegóły zapytania.",
  },
  {
    title: "Lead trafia do firmy",
    description: "Dane zapisują się w Google Sheets i trafiają na e-mail.",
  },
];

const collectedData = [
  ["Imię i kontakt", "Dane potrzebne do oddzwonienia lub odpowiedzi mailowej."],
  ["Branża lub typ firmy", "Kontekst, który pomaga dopasować scenariusz rozmowy."],
  ["Opis potrzeby", "Krótka wiadomość klienta i temat zapytania."],
  ["Termin lub lokalizacja", "Miasto, preferowany termin albo miejsce realizacji."],
  ["Strona / Instagram", "Źródło informacji o firmie albo profilu klienta."],
  ["Źródło zgłoszenia", "Chatbot, formularz, popup, banner lub kampania."],
];

const industries = [
  "Firmy usługowe",
  "Salony beauty",
  "Warsztaty samochodowe",
  "Firmy remontowe",
  "Kliniki i gabinety",
  "Szkoły językowe",
  "Biura nieruchomości",
  "Lokalne biznesy",
];

const included = [
  "Chatbot AI na stronę",
  "Mini formularz kontaktowy",
  "Scenariusz rozmowy pod branżę",
  "Zapis leadów do Google Sheets",
  "Powiadomienia email",
  "Testy i instrukcja obsługi",
];

const process = [
  "Analiza strony i zapytań",
  "Scenariusz rozmowy AI",
  "Podłączenie formularzy i automatyzacji",
  "Testy i publikacja",
];

const faq = [
  ["Czy muszę znać się na AI?", "Nie. Przygotowujemy konfigurację, scenariusz rozmowy i wdrożenie techniczne."],
  ["Czy chatbot może działać w mojej branży?", "Tak. Scenariusz można dopasować do firm usługowych, lokalnych, internetowych i B2B."],
  ["Czy dane mogą trafiać do Google Sheets?", "Tak. Lead może zawierać imię, email, telefon, stronę, branżę i wiadomość klienta."],
  ["Czy jest miesięczna opłata?", "Opieka miesięczna jest opcjonalna i zależy od zakresu wsparcia po wdrożeniu."],
  ["Czy można dodać popup albo formularz?", "Tak. Chatbot, popup, formularz i banner mogą działać razem jako jeden system lead capture."],
  ["Ile trwa wdrożenie?", "Proste demo można przygotować szybko, a pełne wdrożenie zależy od zakresu automatyzacji."],
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#86EFAC]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-[#F4FFF9] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#9BB7AA] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section id="jak-dziala" className="relative px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Jak działa"
          title="Jak działa asystent AI?"
          description="Trzy proste kroki: rozmowa, zebranie danych i przekazanie gotowego leada do firmy."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <article key={step.title} className="glass-card premium-lift rounded-3xl p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#34D399]/18 bg-[#0F8A6C]/16 text-sm font-black text-[#86EFAC]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-bold text-[#F4FFF9]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#9BB7AA]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataCollectionSection() {
  return (
    <section id="zakres" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Zakres"
          title="Jakie dane może zebrać AI?"
          description="Chatbot porządkuje zapytania tak, żeby firma dostała komplet informacji do kontaktu."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectedData.map(([title, description]) => (
            <article key={title} className="glass-card premium-lift rounded-3xl p-5">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#22C55E] to-[#86EFAC]" />
              <h3 className="mt-5 text-lg font-bold text-[#F4FFF9]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#9BB7AA]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="branze" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-6xl p-5 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Dla kogo"
          title="Dla jakich firm?"
          description="Scenariusz rozmowy można dopasować do praktycznie każdej firmy, która obsługuje zapytania klientów."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-2xl border border-[#34D399]/16 bg-[#0B1F18]/74 px-4 py-3 text-sm font-bold text-[#DCEBE4] transition hover:-translate-y-0.5 hover:border-[#86EFAC]/38 hover:text-[#86EFAC]"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function IncludedSection() {
  return (
    <section id="wdrozenie" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Wdrożenie"
          title="Co dostajesz po wdrożeniu?"
          description="Konkretny zestaw elementów potrzebnych do zbierania leadów ze strony."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item) => (
            <article key={item} className="glass-card premium-lift flex items-center gap-4 rounded-3xl p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]/14 text-sm font-black text-[#86EFAC] ring-1 ring-[#34D399]/18">
                ✓
              </span>
              <h3 className="text-base font-bold leading-6 text-[#F4FFF9]">{item}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Proces"
          title="Wdrożenie bez komplikacji"
          description="Krótko, technicznie po naszej stronie i z czytelnym efektem dla Twojej firmy."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {process.map((step, index) => (
            <article key={step} className="glass-card premium-lift rounded-3xl p-5">
              <span className="text-3xl font-black text-[#22C55E]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-base font-bold leading-6 text-[#F4FFF9]">{step}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-5xl p-5 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="FAQ"
          title="Najczęstsze pytania"
          description="Krótko i konkretnie, bez technicznego żargonu."
        />
        <div className="mt-10 space-y-4">
          {faq.map(([question, answer]) => (
            <details key={question} className="dark-green-card premium-lift rounded-2xl p-5 open:border-[#86EFAC]/35">
              <summary className="cursor-pointer text-base font-semibold text-white">
                {question}
              </summary>
              <p className="mt-4 text-sm leading-6 text-[#D6D3D1]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="kontakt" className="relative px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#0F8A6C]/28 to-transparent" />
      <div className="dark-section-panel emerald-glow mx-auto grid max-w-7xl gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:p-10">
        <div className="dark-green-card gradient-border premium-lift rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#86EFAC]">
            Darmowy audyt
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
            Zamów darmowy audyt AI
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-[#B7CFC3]">
            Napisz, jaką firmę prowadzisz. Przygotujemy propozycję automatyzacji
            chatbota i zbierania leadów.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <ScrollToTopOnLoad />
      <main className="relative min-h-screen overflow-hidden bg-[#020403] text-white">
        <Navbar />

        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="tech-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
          <div className="pointer-events-none absolute left-1/2 top-16 h-[28rem] w-[min(44rem,90vw)] -translate-x-1/2 rounded-full bg-[#0F8A6C]/18 blur-3xl" />
          <div className="dark-section-panel emerald-glow mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-5xl text-center">
              <p className="inline-flex items-center gap-3 rounded-full border border-[#34D399]/18 bg-[#0B1F18]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#B7CFC3] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_14px_rgba(34,197,94,0.9)]" />
                Asystent leadowy AI
              </p>
              <h1 className="mt-8 text-[2.8rem] font-black leading-[1.02] tracking-[-0.06em] text-[#F4FFF9] min-[390px]:text-5xl sm:text-7xl lg:text-8xl">
                Chatbot AI, który zbiera{" "}
                <span className="bg-gradient-to-r from-[#86EFAC] via-[#22C55E] to-[#0F8A6C] bg-clip-text text-transparent">
                  kontakty i leady
                </span>{" "}
                z Twojej strony
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#B7CFC3] sm:text-lg">
                Rozmawia z odwiedzającymi, zbiera najważniejsze dane i wysyła
                gotowe zapytania do Google Sheets oraz na e-mail.
              </p>
              <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
                <a href="#demo" className="cta-primary cta-shine w-full rounded-2xl px-6 py-3 text-center text-sm sm:w-auto">
                  Zobacz demo
                </a>
                <a href="#kontakt" className="cta-secondary w-full rounded-2xl px-6 py-3 text-center text-sm sm:w-auto">
                  Zamów darmowy audyt
                </a>
              </div>
              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {heroPills.map((pill) => (
                  <span key={pill} className="rounded-2xl border border-[#34D399]/14 bg-[#0B1F18]/72 px-3 py-3 text-xs font-bold text-[#DCEBE4]">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <AIDashboardIllustration />
            </div>
          </div>
        </section>

        <HowItWorksSection />
        <LeadMechanismsSection />
        <DataCollectionSection />
        <IndustriesSection />
        <IncludedSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <ChatModal suggestions={suggestions} showIntro={false} />
      </main>
    </>
  );
}
