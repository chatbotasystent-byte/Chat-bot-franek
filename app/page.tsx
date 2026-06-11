import { AIDashboardIllustration } from "@/components/AIDashboardIllustration";
import { ChatModal } from "@/components/ChatModal";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { IndustryDemoSwitcher } from "@/components/IndustryDemoSwitcher";
import { IndustriesSection } from "@/components/IndustriesSection";
import { LeadMechanismsDemo } from "@/components/LeadMechanismsDemo";
import { LiveLeadFlow } from "@/components/LiveLeadFlow";
import { Navbar } from "@/components/Navbar";
import { ProblemAutomationSection } from "@/components/ProblemAutomationSection";
import { ScenarioGenerator } from "@/components/ScenarioGenerator";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";

const problems = [
  {
    title: "Pytania po godzinach",
    description: "Klienci piszÄ… wtedy, gdy zespĂłĹ‚ juĹĽ nie pracuje."
  },
  {
    title: "Rozproszone wiadomoĹ›ci",
    description: "Mail, formularz i social media nie tworzÄ… jednego widoku."
  },
  {
    title: "Utracone leady",
    description: "Zbyt pĂłĹşna odpowiedĹş czÄ™sto oznacza utracony kontakt."
  },
  {
    title: "Brak jednego miejsca",
    description: "Trudno szybko sprawdziÄ‡, komu trzeba oddzwoniÄ‡."
  }
];

const benefits = [
  ["Odpowiedzi 24/7", "AI przejmuje pierwsze pytania o ofertÄ™, terminy i proces."],
  ["Zbieranie kontaktĂłw", "Bot prosi o dane, ktĂłre pomagajÄ… szybko wrĂłciÄ‡ do klienta."],
  ["Lead w arkuszu", "Zapytanie moĹĽe trafiÄ‡ do Google Sheets, CRM albo na email."],
  ["Jasny priorytet", "ZespĂłĹ‚ widzi, ktĂłre rozmowy wymagajÄ… kontaktu zwrotnego."]
];

const suggestions = [
  "Mam firmÄ™ usĹ‚ugowÄ…",
  "Mam salon beauty",
  "Mam warsztat samochodowy",
  "Mam komis samochodowy",
  "ChcÄ™ zostawiÄ‡ kontakt"
];

const included = [
  "Chatbot AI na stronÄ™ firmy",
  "Scenariusz rozmowy dopasowany do oferty",
  "Zbieranie i kwalifikacja leadĂłw",
  "Integracja z Google Sheets",
  "Konfiguracja, testy i publikacja",
  "Opcjonalna opieka techniczna"
];

const process = [
  ["Audyt", "Sprawdzamy stronÄ™, ofertÄ™ i typowe pytania klientĂłw."],
  ["Demo", "Pokazujemy, jak chatbot mĂłgĹ‚by dziaĹ‚aÄ‡ dla Twojej firmy."],
  ["Konfiguracja", "Ustawiamy odpowiedzi, formularz leadowy i wyglÄ…d."],
  ["Integracja", "Zapytania klientĂłw mogÄ… trafiaÄ‡ do jednego arkusza lub CRM."],
  ["Optymalizacja", "Po wdroĹĽeniu rozwijamy odpowiedzi i scenariusze."]
];

const productStackSteps = ["Chatbot odpowiada", "Kontakt zebrany", "Lead w arkuszu"];

const faq = [
  ["Czy muszÄ™ znaÄ‡ siÄ™ na AI?", "Nie. Przygotowujemy konfiguracjÄ™, scenariusz rozmowy i wdroĹĽenie techniczne."],
  ["Czy chatbot moĹĽe dziaĹ‚aÄ‡ w mojej branĹĽy?", "Tak, rozwiÄ…zanie moĹĽna dopasowaÄ‡ do wielu firm usĹ‚ugowych, lokalnych i B2B."],
  ["Czy dane mogÄ… trafiaÄ‡ do Google Sheets?", "Tak. Lead moĹĽe zawieraÄ‡ imiÄ™, email, telefon, branĹĽÄ™ i wiadomoĹ›Ä‡ klienta."],
  ["Czy jest miesiÄ™czna opĹ‚ata?", "MiesiÄ™czna opieka jest opcjonalna lub zaleĹĽna od zakresu. Obejmuje wsparcie, poprawki i monitoring."],
  ["Czy moĹĽna najpierw zobaczyÄ‡ demo?", "Tak. Najlepiej zaczÄ…Ä‡ od krĂłtkiego demo lub audytu, ĹĽeby zobaczyÄ‡, jak chatbot moĹĽe dziaĹ‚aÄ‡ dla konkretnej firmy."]
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

function IconMark() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F8A6C]/10 text-[#0F8A6C] ring-1 ring-[#0F8A6C]/15">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function DemoConversation() {
  const messages = [
    ["Klient", "DzieĹ„ dobry, czy mogÄ™ zapytaÄ‡ o dostÄ™pnoĹ›Ä‡ usĹ‚ugi i orientacyjny termin?"],
    ["Bot", "Jasne. Napisz proszÄ™, jakiej usĹ‚ugi szukasz, w jakim mieĹ›cie i jaki termin byĹ‚by wygodny."],
    ["Klient", "Interesuje mnie usĹ‚uga dla firmy. MĂłj email to kontakt@example.pl."],
    ["Bot", "DziÄ™kujÄ™. ZapisaĹ‚em zapytanie i przekaĹĽÄ™ je zespoĹ‚owi. Firma moĹĽe wrĂłciÄ‡ z konkretnÄ… odpowiedziÄ…."]
  ];

  return (
    <div className="glass-card gradient-border rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-semibold text-[#E8D7B9]">Demo rozmowy</p>
          <p className="mt-1 text-xs text-slate-400">AI konsultant obsĹ‚ugi klienta</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-200">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
          online
        </span>
      </div>
      <div className="mt-5 space-y-4">
        {messages.map(([role, text]) => (
          <div key={text} className={`flex ${role === "Klient" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
              role === "Klient"
                ? "bg-[#E8D7B9] text-[#171717]"
                : "border border-white/10 bg-[#171717]/70 text-slate-100"
            }`}>
              <span className="mb-1 block text-xs font-semibold opacity-70">{role}</span>
              {text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#171717]/55 px-4 py-3 text-sm text-slate-400">
        Bot moĹĽe zakoĹ„czyÄ‡ rozmowÄ™ zebraniem kontaktu i przekazaniem leadu do arkusza.
      </div>
    </div>
  );
}

function SheetsMockup() {
  const columns = ["Data", "ImiÄ™", "Email", "BranĹĽa", "WiadomoĹ›Ä‡", "Status"];
  const row = ["08.06", "Anna", "kontakt@example.pl", "usĹ‚ugi", "proĹ›ba o kontakt", "Nowy"];

  return (
    <div className="glass-card gradient-border rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-semibold text-[#A7F3D0]">Efekt biznesowy</p>
          <p className="mt-1 text-xs text-slate-400">PodglÄ…d zapytania w arkuszu</p>
        </div>
        <span className="rounded-full border border-[#E8D7B9]/25 bg-[#E8D7B9]/10 px-3 py-1 text-xs font-semibold text-[#E8D7B9]">
          Google Sheets
        </span>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#171717]/45 text-sm">
        <div className="grid grid-cols-[0.72fr_0.8fr_1.45fr_1fr_1.45fr_0.76fr] bg-[#0F8A6C]/14 text-[#A7F3D0]">
          {columns.map((column) => (
            <div key={column} className={`border-b border-white/10 px-3 py-3 font-semibold ${column === "Status" ? "text-center" : ""}`}>
              {column}
            </div>
          ))}
        </div>
        <div className="grid min-h-16 grid-cols-[0.72fr_0.8fr_1.45fr_1fr_1.45fr_0.76fr] items-center text-slate-200">
          {row.map((cell, index) => (
            <div key={`${cell}-${index}`} className={`min-w-0 px-3 py-4 ${index === row.length - 1 ? "flex justify-center" : ""}`}>
              {index === row.length - 1 ? (
                <span className="rounded-full bg-[#0F8A6C]/14 px-3 py-1 text-xs font-semibold text-[#A7F3D0] ring-1 ring-[#0F8A6C]/25">
                  {cell}
                </span>
              ) : (
                <span className="block truncate">{cell}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {["Nowy lead", "Kontakt zapisany", "ZespĂłĹ‚ oddzwania"].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-300">
            {item}
          </div>
        ))}
      </div>
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
              <span>ImiÄ™</span>
              <span>BranĹĽa</span>
              <span>Status</span>
            </div>
            <div className="mt-3 grid grid-cols-[0.9fr_1fr_0.8fr] items-center gap-3 rounded-xl bg-white px-3 py-3 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="truncate">Anna</span>
              <span className="truncate">usĹ‚ugi</span>
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
              Chatbot AI dla firm, ktĂłre obsĹ‚ugujÄ… zapytania klientĂłw
            </div>
            <h1 className="mt-9 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Chatbot AI, ktĂłry odpowiada klientom i zbiera leady za Ciebie
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Demo automatyzacji AI dla maĹ‚ych i Ĺ›rednich firm. Bot odpowiada
              klientom 24/7, zbiera dane kontaktowe i zapisuje zapytania w
              Google Sheets.
            </p>
            <p className="mt-5 inline-flex rounded-full border border-[#0F8A6C]/25 bg-[#0F8A6C]/12 px-4 py-2 text-sm font-semibold text-[#A7F3D0]">
              Bez wiedzy technicznej po stronie firmy
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#demo" className="cta-shine inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-7 py-3 text-sm font-semibold text-[#171717] shadow-[0_0_36px_rgba(15,138,108,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(201,168,106,0.24)]">
                Zobacz demo
              </a>
              <a href="#kontakt" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E8D7B9]/22 bg-white/[0.045] px-7 py-3 text-sm font-semibold text-[#F7F2E8] backdrop-blur transition hover:border-[#E8D7B9]/45 hover:bg-white/[0.08]">
                ZamĂłw darmowy audyt
              </a>
            </div>
          </div>

          <AIDashboardIllustration />
        </div>
      </section>

      <section id="problem" className="bg-[#F7F2E8] px-5 py-14 text-[#171717] sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Problem"
            title="Firmy tracÄ… zapytania, bo odpowiadajÄ… za wolno"
            description="Klient oczekuje szybkiej odpowiedzi. Chatbot pomaga uporzÄ…dkowaÄ‡ pierwszÄ… rozmowÄ™, zanim zespĂłĹ‚ wrĂłci do pracy."
            tone="light"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {problems.map((item) => (
              <article key={item.title} className="min-h-48 rounded-2xl border border-[#E8D7B9]/70 bg-white p-6 shadow-[0_18px_45px_rgba(14,42,36,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#0F8A6C]/40 hover:shadow-[0_24px_60px_rgba(14,42,36,0.12)]">
                <IconMark />
                <h3 className="mt-6 text-lg font-semibold text-[#171717]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#7FA99B]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rozwiazanie" className="bg-[#FFF7ED] px-5 py-14 text-[#171717] sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F8A6C]">
              RozwiÄ…zanie
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#171717] sm:text-4xl">
              Chatbot AI porzÄ…dkuje obsĹ‚ugÄ™ zapytaĹ„
            </h2>
            <p className="mt-5 leading-7 text-[#7FA99B]">
              Nie musisz budowaÄ‡ platformy ani uczyÄ‡ siÄ™ technicznej konfiguracji.
              Przygotowujemy chatbota, ktĂłry odpowiada na typowe pytania i
              zbiera dane potrzebne do kontaktu.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(([title, description], index) => (
              <div key={title} className="min-h-36 rounded-2xl border border-[#E8D7B9]/70 bg-white p-5 shadow-[0_16px_40px_rgba(14,42,36,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0F8A6C]/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F8A6C]/10 text-sm font-bold text-[#0F8A6C] ring-1 ring-[#0F8A6C]/15">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#171717]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#7FA99B]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="absolute inset-x-0 top-24 -z-10 h-72 bg-[radial-gradient(circle,rgba(15,138,108,0.12),transparent_36rem)]" />
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Demo dziaĹ‚ania"
            title="Zobacz, jak dziaĹ‚a chatbot AI"
            description="PoniĹĽej masz przykĹ‚ad rozmowy, wizualny zapis zapytania w arkuszu oraz kafelek, ktĂłry otwiera dziaĹ‚ajÄ…ce demo chatu."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <DemoConversation />
            <SheetsMockup />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <ChatModal suggestions={suggestions} />
            <aside className="glass-card gradient-border rounded-3xl p-6 sm:p-8">
              <p className="text-base font-semibold text-[#E8D7B9]">Co testujesz?</p>
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
                <p>Wpisz, jakÄ… prowadzisz firmÄ™. Bot odpowie po polsku, podpowie zastosowania AI i moĹĽe zachÄ™ciÄ‡ do zostawienia kontaktu.</p>
                <p>W realnym wdroĹĽeniu podobne zapytania mogÄ… trafiaÄ‡ do Google Sheets, Make, Zapier albo CRM.</p>
                <p>To demo pokazuje kierunek rozmowy, nie wymaga logowania ani panelu klienta.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <LiveLeadFlow />
      <ScenarioGenerator />
      <ProblemAutomationSection />
      <LeadMechanismsDemo />

      <IndustryDemoSwitcher />

      <IndustriesSection />

      <section id="wdrozenie" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
              WdroĹĽenie
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Co otrzymujesz we wdroĹĽeniu?
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              Nie musisz znaÄ‡ siÄ™ na AI ani technicznej konfiguracji.
              Przygotowujemy rozwiÄ…zanie, testujemy je i pomagamy w dalszym
              utrzymaniu.
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

      <section id="proces" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Proces"
            title="Jak wyglÄ…da wdroĹĽenie?"
            description="Prosty proces od audytu do dziaĹ‚ajÄ…cego chatbota i uporzÄ…dkowanych zapytaĹ„."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {process.map(([title, description], index) => (
              <article key={title} className="glass-card gradient-border relative min-h-48 rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-[#E8D7B9]/30">
                {index < process.length - 1 ? (
                  <span className="absolute -right-4 top-1/2 z-10 hidden h-px w-8 bg-gradient-to-r from-[#E8D7B9]/70 to-transparent lg:block" />
                ) : null}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F8A6C] to-[#E8D7B9] text-sm font-bold text-[#171717] shadow-[0_0_24px_rgba(15,138,108,0.24)]">
                  {index + 1}
                </span>
                <h3 className="mt-6 text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </article>
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
              ZamĂłw darmowy audyt AI
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              Zostaw kontakt, a przygotujemy krĂłtkÄ… propozycjÄ™, jak chatbot AI
              moĹĽe dziaĹ‚aÄ‡ w Twojej firmie.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Nie musisz znaÄ‡ szczegĂłĹ‚Ăłw â€” wystarczy krĂłtki opis firmy albo link do strony/Instagrama.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section id="faq" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="FAQ"
            title="NajczÄ™stsze pytania"
            description="KrĂłtko i konkretnie, bez technicznego ĹĽargonu."
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

        <Footer />
      </main>
    </>
  );
}

