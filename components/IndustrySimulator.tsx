"use client";

import { useEffect, useState } from "react";

const industries = [
  {
    name: "Firma usługowa",
    message: "Czy możecie wycenić usługę w moim mieście?",
    reply: "Jasne. Podaj proszę rodzaj usługi, lokalizację i preferowany termin kontaktu.",
    data: ["rodzaj usługi", "miasto", "termin", "imię", "email / telefon"],
    effect: "Firma dostaje uporządkowane zapytanie gotowe do wyceny.",
    system: "Chatbot + formularz + Google Sheets + email"
  },
  {
    name: "Salon beauty",
    message: "Czy macie wolny termin na paznokcie w piątek?",
    reply: "Mogę zebrać usługę, preferowany termin i kontakt, żeby salon mógł szybko potwierdzić wizytę.",
    data: ["usługa", "preferowany termin", "imię", "telefon", "dodatkowe uwagi"],
    effect: "Salon szybciej obsługuje zapytania o wizyty.",
    system: "Chatbot + rezerwacje wstępne + email notification"
  },
  {
    name: "Warsztat samochodowy",
    message: "Czy mogę umówić auto na diagnostykę?",
    reply: "Podaj proszę markę auta, model, objawy problemu i preferowany termin.",
    data: ["marka auta", "model", "opis problemu", "termin", "telefon"],
    effect: "Warsztat dostaje komplet informacji przed oddzwonieniem.",
    system: "Chatbot + formularz serwisowy + Google Sheets"
  },
  {
    name: "Komis samochodowy",
    message: "Szukam auta do 50 tys. zł. Możecie pomóc?",
    reply: "Jasne. Podaj budżet, typ auta i najważniejsze wymagania.",
    data: ["budżet", "typ auta", "preferencje", "finansowanie", "kontakt"],
    effect: "Sprzedawca dostaje zakwalifikowanego klienta z konkretnymi oczekiwaniami.",
    system: "Chatbot sprzedażowy + kwalifikacja leadów"
  },
  {
    name: "Firma remontowa",
    message: "Potrzebuję wyceny remontu łazienki.",
    reply: "Podaj proszę zakres prac, metraż, lokalizację i termin rozpoczęcia.",
    data: ["zakres prac", "metraż", "lokalizacja", "termin", "kontakt"],
    effect: "Firma może szybciej ocenić, czy zapytanie jest wartościowe.",
    system: "Formularz wyceny + chatbot + Google Sheets"
  },
  {
    name: "Klinika / gabinet",
    message: "Czy mogę umówić konsultację w tym tygodniu?",
    reply: "Mogę zebrać temat wizyty, preferowany dzień i dane kontaktowe dla recepcji.",
    data: ["temat wizyty", "preferowany termin", "imię", "telefon", "email"],
    effect: "Recepcja dostaje konkretne zgłoszenie bez długiej wymiany wiadomości.",
    system: "Chatbot informacyjny + lead capture + email"
  },
  {
    name: "Restauracja",
    message: "Czy można zarezerwować stolik na sobotę?",
    reply: "Podaj proszę godzinę, liczbę osób i numer telefonu do potwierdzenia.",
    data: ["data", "godzina", "liczba osób", "telefon", "uwagi"],
    effect: "Obsługa szybciej widzi zapytania o rezerwacje.",
    system: "Chatbot rezerwacyjny + powiadomienie email"
  },
  {
    name: "E-commerce",
    message: "Czy ten produkt jest dostępny i kiedy będzie wysyłka?",
    reply: "Mogę pomóc zebrać nazwę produktu, pytanie i kontakt, żeby obsługa wróciła z odpowiedzią.",
    data: ["produkt", "pytanie", "numer zamówienia, jeśli jest", "email", "telefon"],
    effect: "Obsługa klienta dostaje uporządkowane zgłoszenia zamiast chaotycznych wiadomości.",
    system: "Chatbot FAQ + formularz zgłoszeń + email"
  },
  {
    name: "Szkoła językowa",
    message: "Chcę zapisać się na angielski, ale nie wiem jaki poziom.",
    reply: "Mogę zebrać cel nauki, aktualny poziom i preferowany tryb zajęć.",
    data: ["język", "poziom", "cel nauki", "tryb zajęć", "kontakt"],
    effect: "Szkoła dostaje lepiej opisane zgłoszenie przed kontaktem.",
    system: "Chatbot kwalifikacyjny + formularz zapisów"
  },
  {
    name: "Biuro nieruchomości",
    message: "Szukam mieszkania do kupienia w dobrej lokalizacji.",
    reply: "Podaj proszę budżet, lokalizację, metraż i preferencje.",
    data: ["budżet", "lokalizacja", "metraż", "typ nieruchomości", "kontakt"],
    effect: "Agent dostaje klienta z jasnymi preferencjami.",
    system: "Chatbot kwalifikujący + CRM / Google Sheets"
  }
];

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function openChatModal() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

export function IndustrySimulator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const activeIndustry = industries[activeIndex];

  useEffect(() => {
    setIsChanging(true);
    const timeout = window.setTimeout(() => setIsChanging(false), 260);

    return () => window.clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <section id="branze" className="relative overflow-hidden px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(15,138,108,0.22),transparent_34rem),radial-gradient(circle_at_82%_36%,rgba(201,168,106,0.14),transparent_34rem),linear-gradient(180deg,#171717_0%,#0E2A24_48%,#171717_100%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
            INDUSTRY SIMULATOR
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
            Zobacz, jak AI działa w różnych branżach
          </h2>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Wybierz typ firmy i zobacz przykładowy scenariusz rozmowy, dane zbierane
            przez system oraz efekt automatyzacji.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#E8D7B9]/16 bg-white/[0.045] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[0.72fr_1.16fr_0.92fr]">
            <aside className="rounded-3xl border border-white/10 bg-[#171717]/55 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E8D7B9]">
                Wybierz branżę
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                {industries.map((industry, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={industry.name}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition hover:-translate-y-0.5 ${
                        isActive
                          ? "border-[#E8D7B9]/60 bg-[#E8D7B9] text-[#171717] shadow-[0_16px_35px_rgba(201,168,106,0.16)]"
                          : "border-white/10 bg-white/[0.045] text-[#D6D3D1] hover:border-[#E8D7B9]/35"
                      }`}
                    >
                      <span>{industry.name}</span>
                      <span className={isActive ? "text-[#0F8A6C]" : "text-[#E8D7B9]/70"}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className={`rounded-3xl border border-white/10 bg-[#0E2A24]/66 p-4 transition duration-300 sm:p-5 ${isChanging ? "scale-[0.99] opacity-80" : "scale-100 opacity-100"}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E8D7B9]">
                    Scenariusz rozmowy
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#F7F2E8]">
                    {activeIndustry.name}
                  </h3>
                </div>
                <span className="w-fit rounded-full border border-[#0F8A6C]/30 bg-[#0F8A6C]/12 px-3 py-1 text-xs font-bold text-[#A7F3D0]">
                  Scenariusz dopasowany
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <ScenarioCard
                  label="Wiadomość klienta"
                  title="Pytanie klienta"
                  value={activeIndustry.message}
                  tone="dark"
                />
                <div className="mx-auto h-8 w-px bg-gradient-to-b from-[#E8D7B9]/70 to-[#0F8A6C]/60" />
                <ScenarioCard
                  label="Odpowiedź AI"
                  title="AI"
                  value={activeIndustry.reply}
                  tone="light"
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Pytanie klienta", "AI", "Dane", "Efekt"].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-[#0F8A6C]/25 bg-[#0F8A6C]/10 px-3 py-3 text-center text-xs font-bold text-[#A7F3D0]"
                  >
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            </div>

            <aside className={`grid gap-4 transition duration-300 ${isChanging ? "opacity-80" : "opacity-100"}`}>
              <div className="rounded-3xl border border-[#E8D7B9]/18 bg-[#F7F2E8] p-5 text-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0F8A6C]">
                    System zbiera
                  </p>
                  <span className="rounded-full bg-[#0F8A6C]/10 px-3 py-1 text-xs font-bold text-[#0F8A6C]">
                    bez przepisywania
                  </span>
                </div>
                <div className="mt-4 grid gap-2">
                  {activeIndustry.data.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#E8D7B9]/70 bg-white px-3 py-2 text-sm font-semibold text-[#0E2A24]/78">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F8A6C]/10 text-xs font-bold text-[#0F8A6C]">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#171717]/70 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#E8D7B9]">
                  Efekt dla firmy
                </p>
                <p className="mt-3 text-sm leading-6 text-[#D6D3D1]">{activeIndustry.effect}</p>
                <div className="mt-5 rounded-2xl border border-[#E8D7B9]/18 bg-white/[0.055] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#E8D7B9]">
                    Rekomendowany zestaw automatyzacji
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#F7F2E8]">
                    {activeIndustry.system}
                  </p>
                </div>
                <p className="mt-4 rounded-full border border-[#0F8A6C]/30 bg-[#0F8A6C]/12 px-3 py-2 text-xs font-bold text-[#A7F3D0]">
                  Dopasowane do branży: {activeIndustry.name}
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-6 rounded-3xl border border-[#E8D7B9]/18 bg-[#F7F2E8] p-5 text-[#171717] shadow-[0_24px_70px_rgba(201,168,106,0.12)] sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="text-sm leading-6 text-[#0E2A24]/76">
              Nie widzisz swojej branży? Scenariusz można dopasować do praktycznie
              każdej firmy, która obsługuje zapytania klientów.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:flex-row">
              <button
                type="button"
                onClick={scrollToContact}
                className="min-h-11 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-2 text-sm font-bold text-[#171717] transition hover:scale-[1.01]"
              >
                Zamów darmowy audyt
              </button>
              <button
                type="button"
                onClick={openChatModal}
                className="min-h-11 rounded-full border border-[#0F8A6C]/25 bg-white px-5 py-2 text-sm font-bold text-[#0F8A6C] transition hover:border-[#0F8A6C]/45 hover:bg-[#0F8A6C]/10"
              >
                Otwórz chatbota
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenarioCard({
  label,
  title,
  value,
  tone
}: {
  label: string;
  title: string;
  value: string;
  tone: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <article
      className={`rounded-3xl border p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] ${
        isLight
          ? "border-[#E8D7B9]/60 bg-[#F7F2E8] text-[#171717]"
          : "border-white/10 bg-[#171717]/58 text-[#F7F2E8]"
      }`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.14em] ${isLight ? "text-[#0F8A6C]" : "text-[#E8D7B9]"}`}>
        {label}
      </p>
      <h4 className="mt-3 text-lg font-semibold">{title}</h4>
      <p className={`mt-3 text-sm leading-6 ${isLight ? "text-[#0E2A24]/74" : "text-[#D6D3D1]"}`}>
        {value}
      </p>
    </article>
  );
}
