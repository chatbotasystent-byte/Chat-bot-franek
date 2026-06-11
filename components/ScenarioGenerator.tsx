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
  "Google Sheets",
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
    reply: "Jasne. Podaj miasto, typ usługi, krótki opis problemu i kontakt, a przekażemy kompletne zapytanie do firmy.",
    data: "Miasto, typ usługi, opis problemu, imię, email lub telefon",
    destination: "Google Sheets + powiadomienie email",
    mechanism: "Chatbot + formularz + Google Sheets"
  },
  "Salon beauty": {
    question: "Czy macie wolny termin na paznokcie w piątek?",
    reply: "Mogę zebrać dane do rezerwacji. Podaj usługę, preferowany termin, imię i telefon.",
    data: "Imię, telefon, usługa, preferowany termin",
    destination: "Google Sheets + wiadomość do recepcji",
    mechanism: "Chatbot + popup rezerwacyjny"
  },
  "Warsztat samochodowy": {
    question: "Czy mogę umówić auto na diagnostykę w tym tygodniu?",
    reply: "Jasne. Podaj markę auta, opis problemu, preferowany termin i telefon kontaktowy.",
    data: "Imię, telefon, marka auta, problem, preferowany termin",
    destination: "Google Sheets + powiadomienie email do obsługi",
    mechanism: "Chatbot + formularz kontaktowy"
  },
  "Komis samochodowy": {
    question: "Szukam auta do 60 tysięcy. Czy macie coś dostępnego?",
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
    question: "Czy ten produkt jest dostępny i kiedy może dotrzeć?",
    reply: "Mogę zebrać szczegóły i przekazać pytanie do obsługi. Podaj produkt, email i numer zamówienia, jeśli go masz.",
    data: "Produkt, email, pytanie klienta, numer zamówienia jeśli jest",
    destination: "Google Sheets + przekazanie do obsługi",
    mechanism: "Chatbot FAQ + przekazanie do obsługi"
  },
  "Inna branża": {
    question: "Czy możecie pomóc mi szybciej odpowiadać klientom?",
    reply: "Tak. Chatbot może odpowiadać na pytania, zebrać kontakt i przekazać lead do arkusza lub zespołu.",
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

function getGoalAdjustedScenario(base: (typeof scenarioByIndustry)[string], goal: string) {
  if (goal === "Umawianie wizyt") {
    return {
      ...base,
      data: `${base.data}, preferowany termin`,
      mechanism: `${base.mechanism} + scenariusz umawiania wizyt`
    };
  }

  if (goal === "Wstępna wycena") {
    return {
      ...base,
      data: `${base.data}, zakres prac lub budżet`,
      mechanism: `${base.mechanism} + pytania kwalifikujące`
    };
  }

  if (goal === "Obsługa pytań klientów") {
    return {
      ...base,
      reply: `${base.reply} Dodatkowo AI może odpowiadać na najczęstsze pytania o ofertę, terminy i proces.`,
      mechanism: `${base.mechanism} + baza odpowiedzi FAQ`
    };
  }

  if (goal === "Google Sheets") {
    return {
      ...base,
      destination: "Google Sheets jako główne miejsce zapisu",
      mechanism: `${base.mechanism} + uporządkowany arkusz leadów`
    };
  }

  if (goal === "Powiadomienie email") {
    return {
      ...base,
      destination: `${base.destination} + natychmiastowe powiadomienie email`,
      mechanism: `${base.mechanism} + alert dla zespołu`
    };
  }

  return base;
}

export function ScenarioGenerator() {
  const [industry, setIndustry] = useState("Firma usługowa");
  const [goal, setGoal] = useState("Zbieranie leadów");

  const scenario = useMemo(() => {
    return getGoalAdjustedScenario(scenarioByIndustry[industry], goal);
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
            Wybierz branżę i cel, a zobaczysz przykładową rozmowę, dane zbierane
            przez system oraz rekomendowany mechanizm automatyzacji.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5 rounded-3xl border border-[#E8D7B9]/70 bg-white p-5 shadow-[0_18px_50px_rgba(14,42,36,0.08)] sm:p-6">
            <div>
              <p className="text-sm font-bold text-[#171717]">1. Wybierz branżę</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {industries.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setIndustry(item)}
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                      industry === item
                        ? "border-[#0F8A6C]/35 bg-[#0F8A6C] text-white shadow-[0_10px_24px_rgba(15,138,108,0.2)]"
                        : "border-[#E8D7B9]/80 bg-[#FFF7ED] text-[#171717] hover:border-[#0F8A6C]/45"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-[#171717]">2. Wybierz cel</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {goals.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGoal(item)}
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                      goal === item
                        ? "border-[#C9A86A]/45 bg-[#E8D7B9] text-[#171717]"
                        : "border-[#E8D7B9]/80 bg-[#FFF7ED] text-[#171717] hover:border-[#C9A86A]/60"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToContact}
              className="mt-2 w-full rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-bold text-[#171717] transition hover:scale-[1.01]"
            >
              Zamów taki scenariusz dla swojej firmy
            </button>
          </div>

          <div className="rounded-3xl border border-[#0F8A6C]/20 bg-[#171717] p-5 text-white shadow-[0_24px_70px_rgba(14,42,36,0.18)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#E8D7B9]">Scenariusz automatyzacji</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#F7F2E8]">
                  {industry} - {goal}
                </h3>
              </div>
              <span className="w-fit rounded-full border border-[#E8D7B9]/25 bg-[#E8D7B9]/10 px-3 py-1 text-xs font-bold text-[#E8D7B9]">
                Scenariusz demo
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Przykładowe pytanie klienta", scenario.question],
                ["Odpowiedź AI", scenario.reply],
                ["Dane zbierane przez system", scenario.data],
                ["Gdzie trafia lead", scenario.destination],
                ["Rekomendowany mechanizm", scenario.mechanism]
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`rounded-2xl border border-white/10 bg-white/[0.055] p-4 ${
                    index === 4 ? "sm:col-span-2" : ""
                  }`}
                >
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
