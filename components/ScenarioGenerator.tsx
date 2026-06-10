"use client";

import { useMemo, useState } from "react";

const industries = [
  "Firma usługowa",
  "Salon beauty",
  "Warsztat samochodowy",
  "Komis samochodowy",
  "Klinika / gabinet",
  "Restauracja",
  "E-commerce",
  "Inna branża"
];

const goals = [
  "Zbieranie leadów",
  "Umawianie wizyt",
  "Wstępna wycena",
  "Obsługa pytań klientów",
  "Przekazanie danych do Google Sheets",
  "Powiadomienie email"
];

const scenarioByIndustry: Record<string, {
  question: string;
  reply: string;
  data: string;
  destination: string;
  mechanism: string;
}> = {
  "Firma usługowa": {
    question: "Czy możecie wycenić usługę w moim mieście?",
    reply: "Jasne. Podaj proszę miasto, typ usługi, krótki opis problemu i kontakt, a przekażemy kompletne zapytanie do firmy.",
    data: "Miasto, typ usługi, opis problemu, kontakt",
    destination: "Google Sheets + powiadomienie email",
    mechanism: "Chatbot + formularz + Google Sheets"
  },
  "Salon beauty": {
    question: "Czy macie wolny termin na paznokcie w piątek?",
    reply: "Mogę pomóc sprawdzić zapytanie. Podaj proszę usługę, preferowany termin, imię i numer telefonu.",
    data: "Imię, telefon, usługa, preferowany termin",
    destination: "Google Sheets + wiadomość do recepcji",
    mechanism: "Chatbot + popup rezerwacyjny"
  },
  "Warsztat samochodowy": {
    question: "Czy mogę umówić auto na diagnostykę w tym tygodniu?",
    reply: "Jasne. Podaj proszę markę auta, opis problemu, preferowany termin i telefon kontaktowy.",
    data: "Imię, telefon, marka auta, problem, preferowany termin",
    destination: "Google Sheets + powiadomienie email do obsługi",
    mechanism: "Chatbot + formularz kontaktowy"
  },
  "Komis samochodowy": {
    question: "Szukam auta do 60 tysięcy, czy macie coś dostępnego?",
    reply: "Mogę zebrać preferencje i przekazać je sprzedawcy. Podaj budżet, typ auta, finansowanie i kontakt.",
    data: "Budżet, typ auta, finansowanie, preferencje, telefon",
    destination: "CRM lub Google Sheets + email do sprzedawcy",
    mechanism: "Chatbot kwalifikujący + CRM"
  },
  "Klinika / gabinet": {
    question: "Czy mogę umówić konsultację w przyszłym tygodniu?",
    reply: "Tak. Podaj temat wizyty, preferowany termin oraz email lub telefon, a zgłoszenie trafi do recepcji.",
    data: "Temat wizyty, preferowany termin, kontakt",
    destination: "Google Sheets + recepcja email",
    mechanism: "Chatbot + formularz wizyty"
  },
  Restauracja: {
    question: "Czy mogę zarezerwować stolik dla 4 osób na sobotę?",
    reply: "Jasne. Podaj godzinę, liczbę osób, imię i telefon, a obsługa potwierdzi rezerwację.",
    data: "Data, godzina, liczba osób, imię, telefon",
    destination: "Arkusz rezerwacji + email do obsługi",
    mechanism: "Chatbot rezerwacyjny + powiadomienie"
  },
  "E-commerce": {
    question: "Czy ten produkt jest dostępny?",
    reply: "Mogę sprawdzić kontekst zapytania i przekazać je do obsługi. Podaj produkt, email i numer zamówienia, jeśli go masz.",
    data: "Produkt, email, pytanie klienta, numer zamówienia jeśli jest",
    destination: "Google Sheets + przekazanie do obsługi",
    mechanism: "Chatbot FAQ + przekazanie do obsługi"
  },
  "Inna branża": {
    question: "Czy możecie pomóc mi szybciej odpowiadać klientom?",
    reply: "Tak. Chatbot może zebrać opis zapytania, dane kontaktowe i przekazać je do arkusza lub zespołu.",
    data: "Imię, email, telefon, branża, opis zapytania",
    destination: "Google Sheets + email lub CRM",
    mechanism: "Chatbot + formularz leadowy"
  }
};

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function ScenarioGenerator() {
  const [industry, setIndustry] = useState("Firma usługowa");
  const [goal, setGoal] = useState("Zbieranie leadów");

  const scenario = useMemo(() => {
    const base = scenarioByIndustry[industry];

    return {
      ...base,
      destination: goal === "Powiadomienie email"
        ? `${base.destination} + natychmiastowe powiadomienie`
        : goal === "Przekazanie danych do Google Sheets"
          ? "Google Sheets jako główne miejsce zapisu"
          : base.destination,
      mechanism: goal === "Umawianie wizyt"
        ? `${base.mechanism} + kalendarz/terminy`
        : goal === "Wstępna wycena"
          ? `${base.mechanism} + pytania kwalifikujące`
          : base.mechanism
    };
  }, [goal, industry]);

  return (
    <section className="bg-[#F7F2E8] px-5 py-14 text-[#171717] sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F8A6C]">
            GENERATOR SCENARIUSZA
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            Wygeneruj przykładowy scenariusz dla swojej firmy
          </h2>
          <p className="mt-4 leading-7 text-[#7FA99B]">
            Wybierz branżę i cel, a zobaczysz, jak chatbot AI może prowadzić rozmowę
            i jakie dane może przekazać do arkusza.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-3xl border border-[#E8D7B9]/70 bg-white p-5 shadow-[0_18px_50px_rgba(14,42,36,0.08)] sm:p-6">
            <label className="text-sm font-bold text-[#171717]">
              Branża
              <select
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#E8D7B9]/80 bg-white px-3 text-sm outline-none focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20"
              >
                {industries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="mt-5 block text-sm font-bold text-[#171717]">
              Cel
              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#E8D7B9]/80 bg-white px-3 text-sm outline-none focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20"
              >
                {goals.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={scrollToContact}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-bold text-[#171717] transition hover:scale-[1.01]"
            >
              Chcesz taki scenariusz dla swojej firmy? Zamów darmowy audyt
            </button>
          </div>

          <div className="rounded-3xl border border-[#0F8A6C]/20 bg-[#171717] p-5 text-white shadow-[0_24px_70px_rgba(14,42,36,0.18)] sm:p-6">
            <p className="text-sm font-semibold text-[#E8D7B9]">Przykładowy scenariusz</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Pytanie klienta", scenario.question],
                ["Odpowiedź AI", scenario.reply],
                ["Dane, które AI zbiera", scenario.data],
                ["Gdzie trafia lead", scenario.destination],
                ["Rekomendowany mechanizm", scenario.mechanism]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#E8D7B9]">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#D6D3D1]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
