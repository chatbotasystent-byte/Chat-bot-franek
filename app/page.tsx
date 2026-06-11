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
import { ScenarioGenerator } from "@/components/ScenarioGenerator";
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
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${tone === "light" ? "text-[#0F8A6C]" : "text-[#E8D7B9]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-semibold tracking-normal sm:text-4xl ${tone === "light" ? "text-[#171717]" : "text-[#F7F2E8]"}`}>
        {title}
      </h2>
      <p className={`mt-4 leading-7 ${tone === "light" ? "text-[#7FA99B]" : "text-[#D6D3D1]"}`}>{description}</p>
    </div>
  );
}


function ProductStackVisual() {
  return (
    <div className="relative rounded-3xl">
      <div className="animate-soft-pulse pointer-events-none absolute inset-8 rounded-full bg-[#0F8A6C]/14 blur-3xl" />
      <div className="relative grid gap-5">
        <div className="glass-card gradient-border rounded-3xl p-5 shadow-[0_28px_80px_rgba(15,138,108,0.16)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-white">Panel automatyzacji</p>
            <span className="rounded-full bg-[#E8D7B9]/10 px-3 py-1 text-xs font-semibold text-[#E8D7B9]">live</span>
          </div>
          <div className="mt-5 grid gap-3">
            {productStackSteps.map((item, index) => (
              <div key={item} className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0F8A6C]/16 text-xs font-bold text-[#A7F3D0]">
                  {index + 1}
                </span>
                <span className="min-w-0 text-sm font-medium leading-5 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 shadow-[0_28px_80px_rgba(201,168,106,0.16)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#E8D7B9]">Google Sheets</p>
            <span className="rounded-full border border-[#E8D7B9]/20 bg-[#E8D7B9]/10 px-3 py-1 text-xs font-semibold text-[#E8D7B9]">
              zapis leada
            </span>
          </div>
          <div className="mt-4 rounded-2xl bg-[#F7F2E8] p-4">
            <div className="grid grid-cols-[0.9fr_1fr_0.8fr] gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0E2A24]">
              <span>Imię</span>
              <span>Branża</span>
              <span>Status</span>
            </div>
            <div className="mt-3 grid grid-cols-[0.9fr_1fr_0.8fr] items-center gap-3 rounded-xl bg-white px-3 py-3 text-xs font-semibold text-slate-700 shadow-sm">
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

export default function Home() {
  return (
    <>
      <ScrollToTopOnLoad />
      <main className="min-h-screen overflow-hidden bg-[#171717] text-white">
        <Navbar />

      <section className="relative px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(15,138,108,0.22),transparent_30rem),radial-gradient(circle_at_84%_16%,rgba(201,168,106,0.16),transparent_34rem),radial-gradient(circle_at_50%_100%,rgba(14,42,36,0.28),transparent_30rem)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up">
            <div className="inline-flex rounded-full border border-[#E8D7B9]/25 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-[#E8D7B9] shadow-[0_0_28px_rgba(232,215,185,0.14)] backdrop-blur">
              Chatbot AI dla firm, które obsługują zapytania klientów
            </div>
            <h1 className="mt-9 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Chatbot AI, który odpowiada klientom i zbiera leady za Ciebie
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Demo automatyzacji AI dla małych i średnich firm. Bot odpowiada
              klientom 24/7, zbiera dane kontaktowe i zapisuje zapytania w
              Google Sheets.
            </p>
            <p className="mt-5 inline-flex rounded-full border border-[#0F8A6C]/25 bg-[#0F8A6C]/12 px-4 py-2 text-sm font-semibold text-[#A7F3D0]">
              Bez wiedzy technicznej po stronie firmy
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#control-room" className="cta-shine inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-7 py-3 text-sm font-semibold text-[#171717] shadow-[0_0_36px_rgba(15,138,108,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(201,168,106,0.24)]">
                Zobacz demo
              </a>
              <a href="#kontakt" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E8D7B9]/22 bg-white/[0.045] px-7 py-3 text-sm font-semibold text-[#F7F2E8] backdrop-blur transition hover:border-[#E8D7B9]/45 hover:bg-white/[0.08]">
                Zamów darmowy audyt
              </a>
            </div>
          </div>

          <AIDashboardIllustration />
        </div>
      </section>

      <ChatModal suggestions={suggestions} />

      <AutomationControlRoom />
      <LiveWebsiteSimulation />
      <ScenarioGenerator />
      <ProblemAutomationSection />
      <LeadMechanismsDemo />


      <IndustrySimulator />

      <section id="wdrozenie" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
              Wdrożenie
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
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
                <div key={item} className="glass-card rounded-2xl px-4 py-4 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-[#E8D7B9]/30">
                  {item}
                </div>
              ))}
            </div>
            <ProductStackVisual />
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Najczęstsze pytania"
            description="Krótko i konkretnie, bez technicznego żargonu."
          />
          <div className="mt-10 space-y-4">
            {faq.map(([question, answer]) => (
              <details key={question} className="glass-card rounded-2xl p-5 transition open:border-[#E8D7B9]/35">
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {question}
                </summary>
                <p className="mt-4 text-sm leading-6 text-slate-300">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="glass-card gradient-border rounded-3xl p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
              Darmowy audyt
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
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







