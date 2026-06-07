import { ChatWidget } from "@/components/ChatWidget";
import { ContactForm } from "@/components/ContactForm";

const benefits = [
  {
    title: "Szybkie odpowiedzi",
    description:
      "Chatbot odpowiada na pytania o usługi, ceny, lokalizację i godziny otwarcia bez czekania na telefon."
  },
  {
    title: "Wieksza liczba zapytan",
    description:
      "Klient może zostawić numer telefonu od razu po rozmowie, gdy jest gotowy na rezerwację."
  },
  {
    title: "Profesjonalne demo",
    description:
      "Prosty landing pokazuje, jak AI może wspierać małą firmę w codziennej obsłudze klienta."
  }
];

export default function Home() {
  return (
    <main>
      <section className="px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_480px] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-rosewood/20 bg-white/70 px-4 py-2 text-sm font-medium text-rosewood">
              Demo dla małej firmy beauty
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-ink sm:text-5xl lg:text-6xl">
              AI Chatbot dla salonu Beauty Lux
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Nowoczesna strona z chatbotem, który pomaga klientkom poznać
              ofertę salonu, godziny otwarcia i zostawić dane do kontaktu w
              sprawie rezerwacji.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#chat"
                className="rounded-md bg-rosewood px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#763346]"
              >
                Przetestuj chat
              </a>
              <a
                href="#kontakt"
                className="rounded-md border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:border-rosewood/50"
              >
                Formularz kontaktowy
              </a>
            </div>
          </div>

          <div id="chat" className="scroll-mt-8">
            <ChatWidget />
          </div>
        </div>
      </section>

      <section className="border-y border-white/70 bg-white/60 px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ink">
              Korzyści dla salonu kosmetycznego
            </h2>
            <p className="mt-3 text-slate-700">
              Beauty Lux może pokazać klientom najważniejsze informacje bez
              rozbudowanego systemu rezerwacji juz na pierwszej wersji strony.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold text-ink">
              Zostaw dane do kontaktu
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-700">
              Formularz wysyła dane do endpointu aplikacji. W tej wersji lead
              pojawia się w konsoli serwera, a kod jest przygotowany do późniejszego
              podpięcia Make albo Google Sheets.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
