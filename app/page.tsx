import { AIDashboardIllustration } from "@/components/AIDashboardIllustration";
import { AutomationControlRoom } from "@/components/AutomationControlRoom";
import { ChatModal } from "@/components/ChatModal";
import { LiveWebsiteSimulation } from "@/components/LiveWebsiteSimulation";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { IndustrySimulator } from "@/components/IndustrySimulator";
import { LeadMechanismsDemo } from "@/components/LeadMechanismsDemo";
import { Navbar } from "@/components/Navbar";
import { ProblemAutomationSection } from "@/components/ProblemAutomationSection";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";


const suggestions = [
  "Mam firmę usługową",
  "Mam salon beauty",
  "Mam warsztat samochodowy",
  "Mam komis samochodowy",
  "Chcę zostawić kontakt"
];

const included = [
  "Chatbot AI na stronę",
  "Mini formularz kontaktowy",
  "Scenariusz rozmowy pod branżę",
  "Google Sheets z leadami",
  "Email notification",
  "Testy i instrukcja obsługi"
];


const productStackSteps = ["Chatbot odpowiada", "Kontakt zebrany", "Lead w arkuszu"];

const implementationSteps = [
  "Analiza strony i zapytań klientów",
  "Scenariusz rozmowy AI",
  "Podłączenie formularzy i automatyzacji",
  "Integracja z Google Sheets / email",
  "Testy i przekazanie instrukcji"
];

const systemStatus = [
  "AI online",
  "Webhook active",
  "Sheets synced",
  "Email ready"
];

const heroBenefits = [
  "24/7 na stronie",
  "Leady na maila",
  "Google Sheets / CRM",
  "Bez przebudowy strony"
];

const faq = [
  ["Czy muszę znać się na AI?", "Nie. Przygotowujemy konfigurację, scenariusz rozmowy i wdrożenie techniczne."],
  ["Czy chatbot może działać w mojej branży?", "Tak, rozwiązanie można dopasować do wielu firm usługowych, lokalnych i B2B."],
  ["Czy dane mogą trafiać do Google Sheets?", "Tak. Lead może zawierać imię, email, telefon, branżę i wiadomość klienta."],
  ["Czy jest miesięczna opłata?", "Miesięczna opieka jest opcjonalna lub zależna od zakresu. Obejmuje wsparcie, poprawki i monitoring."],
  ["Czy można najpierw zobaczyć demo?", "Tak. Najlepiej zacząć od krótkiego demo lub audytu, żeby zobaczyć, jak chatbot może działać dla konkretnej firmy."]
];

function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "dark"
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${tone === "light" ? "text-[#0F8A6C]" : "text-[#86EFAC]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl ${tone === "light" ? "text-[#F4FFF9]" : "text-[#F4FFF9]"}`}>
        {title}
      </h2>
      <p className={`mt-4 leading-7 ${tone === "light" ? "text-[#7FA99B]" : "text-[#D6D3D1]"}`}>{description}</p>
    </div>
  );
}


function ProductStackVisual() {
  return (
    <div className="relative rounded-3xl">
      <div className="relative grid gap-5">
        <div className="glass-card gradient-border premium-lift rounded-3xl p-5 shadow-[0_28px_80px_rgba(15,138,108,0.16)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-white">Panel automatyzacji</p>
            <span className="rounded-full bg-[#86EFAC]/10 px-3 py-1 text-xs font-semibold text-[#86EFAC]">live</span>
          </div>
          <div className="mt-5 grid gap-3">
            {productStackSteps.map((item, index) => (
              <div key={item} className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1F18]/[0.04] px-4 py-3 transition duration-300 hover:border-[#86EFAC]/24 hover:bg-[#0B1F18]/[0.065]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0F8A6C]/16 text-xs font-bold text-[#A7F3D0]">
                  {index + 1}
                </span>
                <span className="min-w-0 text-sm font-medium leading-5 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card premium-lift rounded-3xl p-5 shadow-[0_28px_80px_rgba(34,197,94,0.16)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#86EFAC]">Google Sheets</p>
            <span className="rounded-full border border-[#86EFAC]/20 bg-[#86EFAC]/10 px-3 py-1 text-xs font-semibold text-[#86EFAC]">
              zapis leada
            </span>
          </div>
          <div className="mt-4 rounded-2xl bg-[#0B1F18] p-4">
            <div className="grid grid-cols-[0.9fr_1fr_0.8fr] gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F4FFF9]">
              <span>Imię</span>
              <span>Branża</span>
              <span>Status</span>
            </div>
            <div className="mt-3 grid grid-cols-[0.9fr_1fr_0.8fr] items-center gap-3 rounded-xl bg-[#0B1F18] px-3 py-3 text-xs font-semibold text-[#B7CFC3] shadow-sm">
              <span className="truncate">Anna</span>
              <span className="truncate">usługi</span>
              <span className="rounded-full bg-[#0F8A6C]/10 px-2.5 py-1 text-center text-[11px] text-[#0F8A6C] ring-1 ring-[#0F8A6C]/15">
                Nowy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImplementationProcess() {
  return (
    <section className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#86EFAC]/28 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="PROCES"
          title="Jak wygląda wdrożenie?"
          description="Krótki, uporządkowany proces: od analizy zapytań po gotowy system z arkuszem i powiadomieniami."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-5">
          {implementationSteps.map((step, index) => (
            <article
              key={step}
              className="glass-card premium-lift relative min-h-40 rounded-3xl p-5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#86EFAC]/18 bg-[#0F8A6C]/16 text-xs font-bold text-[#A7F3D0]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-sm font-bold leading-5 text-[#F4FFF9]">
                {step}
              </h3>
              {index < implementationSteps.length - 1 ? (
                <span className="pointer-events-none absolute right-[-0.45rem] top-1/2 hidden h-px w-4 bg-gradient-to-r from-[#86EFAC]/45 to-[#0F8A6C]/45 md:block" />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <ScrollToTopOnLoad />
      <main className="relative min-h-screen overflow-hidden bg-[#030705] text-white">
        <Navbar />

      <section className="relative px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#171717_0%,#0E2A24_56%,#171717_100%)]" />
        <div className="tech-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        <div className="pointer-events-none absolute left-[6%] top-28 hidden h-28 w-px bg-gradient-to-b from-transparent via-[#86EFAC]/35 to-transparent lg:block" />
        <div className="pointer-events-none absolute right-[10%] top-40 hidden h-px w-44 bg-gradient-to-r from-transparent via-[#0F8A6C]/45 to-transparent lg:block" />
        <span className="data-dot pointer-events-none absolute left-[9%] top-40 hidden h-2 w-2 rounded-full bg-[#86EFAC] lg:block" />
        <span className="data-dot pointer-events-none absolute right-[18%] top-32 hidden h-2 w-2 rounded-full bg-[#0F8A6C] lg:block" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#86EFAC]/18 bg-[#0B1F18]/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B7CFC3] shadow-[0_0_28px_rgba(34,197,94,0.12)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_14px_rgba(34,197,94,0.9)]" />
              Inteligentny asystent leadów AI
            </div>
            <h1 className="mt-9 max-w-4xl text-5xl font-black tracking-[-0.055em] text-[#F4FFF9] sm:text-6xl lg:text-7xl">
              Asystent AI, który pomaga zbierać kontakty i leady{" "}
              <span className="bg-gradient-to-r from-[#86EFAC] via-[#22C55E] to-[#0F8A6C] bg-clip-text text-transparent">
                od odwiedzających stronę
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#B7CFC3]">
              Rozmawia z klientem, zbiera najważniejsze dane i wysyła gotowe
              zapytania do <span className="font-semibold text-[#22C55E]">Google Sheets</span> oraz
              na <span className="font-semibold text-[#22C55E]">e-mail</span>.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#branze" className="cta-primary cta-shine rounded-2xl px-7 py-3 text-sm">
                Sprawdź demo dla swojej branży
              </a>
              <a href="#lead-preview" className="cta-secondary rounded-2xl px-7 py-3 text-sm">
                Zobacz, jak wygląda lead
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {heroBenefits.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-2xl border border-[#34D399]/14 bg-[#0B1F18]/74 px-4 py-3 text-center text-xs font-bold text-[#D6D3D1] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  {benefit}
                </span>
              ))}
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-2 rounded-3xl border border-[#86EFAC]/14 bg-[#030705]/52 p-3 shadow-[0_22px_70px_rgba(0,0,0,0.18)] backdrop-blur sm:grid-cols-4">
              {systemStatus.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-[#86EFAC]/12 bg-[#0B1F18]/[0.045] px-3 py-2 text-xs font-bold text-[#D6D3D1]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#0F8A6C] shadow-[0_0_14px_rgba(15,138,108,0.9)] animate-pulse" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <AIDashboardIllustration />
        </div>
      </section>

      <ChatModal suggestions={suggestions} />

      <AutomationControlRoom />
      <LiveWebsiteSimulation />
      <LeadMechanismsDemo />
      <IndustrySimulator />
      <ProblemAutomationSection />

      <section id="wdrozenie" className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#86EFAC]/24 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
              Wdrożenie
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Co dostajesz po wdrożeniu?
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              Nie dostajesz tylko chatbota. Dostajesz prosty system do zbierania
              i porządkowania zapytań klientów.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="grid gap-3">
              {included.map((item) => (
                <div key={item} className="glass-card premium-lift rounded-2xl px-4 py-4 text-sm font-medium text-[#D6D3D1]">
                  {item}
                </div>
              ))}
            </div>
            <ProductStackVisual />
          </div>
        </div>
      </section>

      <ImplementationProcess />

      <section id="faq" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Najczęstsze pytania"
            description="Krótko i konkretnie, bez technicznego żargonu."
          />
          <div className="mt-10 space-y-4">
            {faq.map(([question, answer]) => (
              <details key={question} className="glass-card premium-lift rounded-2xl p-5 open:border-[#86EFAC]/35">
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {question}
                </summary>
                <p className="mt-4 text-sm leading-6 text-[#D6D3D1]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#0F8A6C]/28 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="glass-card gradient-border premium-lift rounded-3xl p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
              Darmowy audyt
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Zamów darmowy audyt AI
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              Zostaw kontakt, a przygotujemy krótką propozycję, jak chatbot AI
              może działać w Twojej firmie.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Nie musisz znać szczegółów — wystarczy krótki opis firmy albo link do strony/Instagrama.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

        <Footer />
      </main>
    </>
  );
}








