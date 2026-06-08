import { AIDashboardIllustration } from "@/components/AIDashboardIllustration";
import { ChatModal } from "@/components/ChatModal";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const problems = [
  {
    title: "Pytania po godzinach",
    description: "Klienci piszą wtedy, gdy zespół już nie pracuje."
  },
  {
    title: "Rozproszone wiadomości",
    description: "Mail, formularz i social media nie tworzą jednego widoku."
  },
  {
    title: "Utracone leady",
    description: "Zbyt późna odpowiedź często oznacza utracony kontakt."
  },
  {
    title: "Brak jednego miejsca",
    description: "Trudno szybko sprawdzić, komu trzeba oddzwonić."
  }
];

const benefits = [
  "AI odpowiada na najczęstsze pytania.",
  "Bot zbiera dane kontaktowe klienta.",
  "Lead trafia do arkusza Google Sheets.",
  "Firma widzi, do kogo warto oddzwonić."
];

const suggestions = [
  "Mam firmę usługową",
  "Mam salon beauty",
  "Chcę zbierać leady",
  "Mam warsztat samochodowy"
];

const industries = [
  ["Firmy usługowe", "kwalifikacja zapytań", "kontakt zwrotny"],
  ["Salony beauty", "cennik i terminy", "zapisy"],
  ["Warsztaty samochodowe", "dane auta", "wycena"],
  ["Firmy remontowe", "zakres prac", "lokalizacja"],
  ["Gabinety i kliniki", "pytania o usługi", "kontakt"],
  ["Szkoły językowe", "poziom kursu", "grupy"],
  ["Biura nieruchomości", "preferencje", "kontakt do agenta"],
  ["Lokalne biznesy", "FAQ klientów", "leady"]
];

const included = [
  "Chatbot AI na stronę firmy",
  "Scenariusz rozmowy dopasowany do firmy",
  "Zbieranie leadów",
  "Integracja z Google Sheets",
  "Konfiguracja i testy",
  "Miesięczna opieka techniczna"
];

const process = [
  ["Robimy krótki audyt", "Sprawdzamy stronę, ofertę i typowe pytania klientów."],
  ["Przygotowujemy demo", "Pokazujemy, jak chatbot mógłby działać dla Twojej firmy."],
  ["Wdrażamy chatbota", "Konfigurujemy odpowiedzi, formularz leadowy i wygląd."],
  ["Podłączamy Google Sheets", "Zapytania klientów mogą trafiać do jednego arkusza."],
  ["Monitorujemy i poprawiamy", "Po wdrożeniu można rozwijać odpowiedzi i scenariusze."]
];

const faq = [
  ["Czy muszę znać się na AI?", "Nie. Przygotowujemy konfigurację, scenariusz rozmowy i wdrożenie techniczne."],
  ["Czy chatbot może działać w mojej branży?", "Tak, rozwiązanie można dopasować do wielu firm usługowych, lokalnych i B2B."],
  ["Czy dane mogą trafiać do Google Sheets?", "Tak. Lead może zawierać imię, email, telefon, branżę i wiadomość klienta."],
  ["Czy jest miesięczna opłata?", "Tak, miesięczna opieka jest opcjonalna lub zależna od zakresu. Obejmuje wsparcie, poprawki i monitoring."],
  ["Czy można najpierw zobaczyć demo?", "Tak. Najlepiej zacząć od krótkiego demo lub audytu, żeby zobaczyć, jak chatbot może działać dla konkretnej firmy."]
];

function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function IconMark() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function DemoConversation() {
  const messages = [
    ["Klient", "Dzień dobry, chciałbym zapytać o dostępność usługi i orientacyjną cenę."],
    ["Bot", "Chętnie pomogę. Napisz proszę, jakiej usługi szukasz, w jakim mieście i zostaw numer telefonu lub email, żeby firma mogła wrócić z konkretną odpowiedzią."],
    ["Klient", "Interesuje mnie usługa dla firmy. Mój email to kontakt@example.pl."],
    ["Bot", "Dziękuję. Przekażę zapytanie do firmy. Dane mogą zostać zapisane w arkuszu Google Sheets, żeby zespół mógł szybko odpowiedzieć."]
  ];

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <p className="text-sm font-semibold text-cyan-100">Przykładowa rozmowa</p>
      <div className="mt-5 space-y-4">
        {messages.map(([role, text]) => (
          <div key={text} className={`flex ${role === "Klient" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
              role === "Klient"
                ? "bg-cyan-300 text-slate-950"
                : "border border-white/10 bg-slate-950/60 text-slate-100"
            }`}>
              <span className="mb-1 block text-xs font-semibold opacity-70">{role}</span>
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SheetsMockup() {
  const columns = ["Data", "Imię", "Email", "Telefon", "Branża", "Wiadomość", "Status"];
  const row = ["08.06", "Anna", "kontakt@example.pl", "+48...", "usługi", "prośba o kontakt", "Nowy lead"];

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6">
      <p className="text-sm font-semibold text-emerald-200">Mockup Google Sheets</p>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead className="bg-emerald-300/12 text-emerald-100">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border-b border-white/10 px-5 py-4 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-200">
            <tr>
              {row.map((cell) => (
                <td key={cell} className="border-b border-white/5 px-5 py-5">
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        To wizualny przykład. Integrację można później podłączyć przez Google Sheets, Make, Zapier albo webhook.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />

      <section className="relative px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_30rem),radial-gradient(circle_at_84%_16%,rgba(129,140,248,0.14),transparent_34rem)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up">
            <div className="inline-flex rounded-full border border-cyan-300/25 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.14)] backdrop-blur">
              Chatbot AI dla firm usługowych
            </div>
            <h1 className="mt-9 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Chatbot AI, który odpowiada klientom i zbiera leady za Ciebie
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Wdrażamy chatboty AI dla firm usługowych. Bot odpowiada na pytania
              klientów 24/7, zbiera dane kontaktowe i zapisuje zapytania w
              Google Sheets.
            </p>
            <p className="mt-5 inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
              Bez wiedzy technicznej po stronie firmy
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#demo" className="cta-shine inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(34,211,238,0.4)]">
                Zobacz demo
              </a>
              <a href="#kontakt" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-7 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-cyan-300/35 hover:bg-white/[0.08]">
                Zamów darmowy audyt
              </a>
            </div>
          </div>

          <AIDashboardIllustration />
        </div>
      </section>

      <section id="problem" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Problem"
            title="Firmy tracą zapytania, bo odpowiadają za wolno"
            description="Klient oczekuje szybkiej odpowiedzi. Chatbot pomaga uporządkować pierwszą rozmowę, zanim zespół wróci do pracy."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {problems.map((item) => (
              <article key={item.title} className="glass-card min-h-48 rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                <IconMark />
                <h3 className="mt-6 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rozwiazanie" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Rozwiązanie
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Chatbot AI porządkuje obsługę zapytań
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              Nie musisz budować platformy ani uczyć się technicznej konfiguracji.
              Przygotowujemy chatbota, który odpowiada na typowe pytania i
              zbiera dane potrzebne do kontaktu.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="glass-card min-h-24 rounded-2xl p-5 text-sm font-semibold leading-6 text-slate-100 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/28">
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Demo działania"
            title="Zobacz, jak działa chatbot AI"
            description="Poniżej masz przykład rozmowy, wizualny zapis leada w arkuszu oraz kafelek, który otwiera działające demo chatu."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <DemoConversation />
            <SheetsMockup />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <ChatModal suggestions={suggestions} />
            <aside className="glass-card gradient-border rounded-3xl p-6 sm:p-8">
              <p className="text-base font-semibold text-cyan-100">Co testujesz?</p>
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
                <p>Wpisz, jaką prowadzisz firmę. Bot odpowie po polsku, podpowie zastosowania AI i może zachęcić do zostawienia kontaktu.</p>
                <p>W realnym wdrożeniu podobne zapytania mogą trafiać do Google Sheets, Make, Zapier albo CRM.</p>
                <p>To demo pokazuje kierunek rozmowy, nie wymaga logowania ani panelu klienta.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="branze" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Branże"
            title="Dla jakich firm sprawdzi się chatbot AI?"
            description="Rozwiązanie jest ogólne i można je dopasować do wielu firm usługowych, lokalnych i B2B."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map(([name, first, second]) => (
              <article key={name} className="glass-card min-h-40 rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                <h3 className="text-base font-semibold text-white">{name}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{first}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{second}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="wdrozenie" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Wdrożenie
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Co otrzymujesz we wdrożeniu?
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              Nie musisz znać się na AI ani technicznej konfiguracji.
              Przygotowujemy rozwiązanie, testujemy je i pomagamy w dalszym
              utrzymaniu.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <div key={item} className="glass-card rounded-2xl px-4 py-4 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proces" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Proces"
            title="Jak wygląda wdrożenie?"
            description="Prosty proces od audytu do działającego chatbota i uporządkowanych zapytań."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {process.map(([title, description], index) => (
              <article key={title} className="glass-card relative min-h-44 rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                {index < process.length - 1 ? (
                  <span className="absolute -right-4 top-1/2 z-10 hidden h-px w-8 bg-gradient-to-r from-cyan-300/70 to-transparent lg:block" />
                ) : null}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-400 text-sm font-bold text-slate-950">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Darmowy audyt
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Zamów darmowy audyt AI
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-300">
              Zostaw dane, a przygotujemy krótką propozycję, jak chatbot AI
              może działać w Twojej firmie.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Zostaw kontakt, a przygotujemy propozycję po krótkim audycie.
            </p>
          </div>

          <ContactForm />
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
              <details key={question} className="glass-card rounded-2xl p-5 open:border-cyan-300/35">
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
  );
}
