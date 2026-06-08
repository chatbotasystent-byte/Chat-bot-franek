"use client";

import { useState } from "react";

type IndustryDemo = {
  name: string;
  questions: string[];
  answer: string;
  data: string[];
  botMessage: string;
};

const demos: IndustryDemo[] = [
  {
    name: "Salon beauty",
    questions: ["Czy są wolne terminy?", "Ile kosztuje usługa?", "Jak długo trwa wizyta?"],
    answer: "Chatbot może wyjaśnić ofertę, zebrać preferowany termin i przekazać zapytanie do recepcji.",
    data: ["imię", "telefon", "usługa", "preferowany termin"],
    botMessage:
      "Mogę pomóc dobrać usługę i zebrać dane do rezerwacji. Napisz, jaka usługa Cię interesuje i jaki termin byłby wygodny."
  },
  {
    name: "Warsztat samochodowy",
    questions: ["Czy naprawicie ten problem?", "Kiedy jest wolny termin?", "Ile może kosztować wycena?"],
    answer: "Bot zbiera objawy auta, dane pojazdu i kontakt, żeby warsztat mógł szybciej oddzwonić.",
    data: ["marka auta", "model", "problem", "telefon"],
    botMessage:
      "Opisz krótko problem z autem, podaj markę i model oraz numer telefonu. Przekażę zgłoszenie do warsztatu."
  },
  {
    name: "Firma remontowa",
    questions: ["Ile kosztuje remont?", "Kiedy możecie zacząć?", "Czy robicie wyceny?"],
    answer: "Chatbot porządkuje pierwsze zapytanie: zakres prac, lokalizację i podstawowe dane do wyceny.",
    data: ["rodzaj prac", "metraż", "miasto", "telefon"],
    botMessage:
      "Napisz, jaki zakres prac Cię interesuje, w jakim mieście i jaki metraż obejmuje zlecenie. Firma wróci z konkretną odpowiedzią."
  },
  {
    name: "Gabinet / klinika",
    questions: ["Jakie usługi są dostępne?", "Czy są wolne terminy?", "Jak przygotować się do wizyty?"],
    answer: "Bot odpowiada na podstawowe pytania i zbiera dane do kontaktu z rejestracją.",
    data: ["usługa", "preferowany termin", "telefon/email"],
    botMessage:
      "Napisz, jaka usługa Cię interesuje i jaki termin byłby wygodny. Zostaw też telefon lub email do kontaktu."
  },
  {
    name: "Szkoła językowa",
    questions: ["Jaki kurs wybrać?", "Kiedy są zajęcia?", "Czy są grupy dla mojego poziomu?"],
    answer: "Chatbot pomaga wstępnie dobrać kurs i zebrać dane potrzebne do kontaktu z opiekunem.",
    data: ["język", "poziom", "wiek", "kontakt"],
    botMessage:
      "Napisz, jakiego języka chcesz się uczyć, jaki masz poziom i dla kogo jest kurs. Zostaw kontakt, a szkoła wróci z propozycją."
  },
  {
    name: "Biuro nieruchomości",
    questions: ["Czy oferta jest aktualna?", "Jaki budżet jest potrzebny?", "Czy można umówić prezentację?"],
    answer: "Bot zbiera preferencje klienta i przekazuje lead do agenta.",
    data: ["budżet", "miasto", "typ nieruchomości", "telefon"],
    botMessage:
      "Podaj miasto, budżet i typ nieruchomości, którego szukasz. Zostaw telefon, a agent wróci z dopasowaną ofertą."
  },
  {
    name: "Firma usługowa",
    questions: ["Czy realizujecie taką usługę?", "Jaki jest termin?", "Czy mogę dostać wycenę?"],
    answer: "Chatbot kwalifikuje zapytanie i zbiera podstawowe dane, zanim firma oddzwoni.",
    data: ["usługa", "termin", "miasto", "kontakt"],
    botMessage:
      "Napisz, jakiej usługi szukasz, w jakim mieście i kiedy chcesz ją zrealizować. Zostaw kontakt, a firma przygotuje odpowiedź."
  }
];

function openChatModal() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

export function IndustryDemoSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = demos[activeIndex];

  return (
    <section id="branzo-demo" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
            Branżowe demo
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Zobacz przykład dla swojej branży
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            Wybierz branżę i zobacz, jakie pytania może obsługiwać chatbot oraz
            jakie dane może zbierać.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-2">
          {demos.map((demo, index) => (
            <button
              key={demo.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeIndex === index
                  ? "border-[#E8D7B9] bg-[#0F8A6C]/18 text-[#F7F2E8] shadow-[0_0_24px_rgba(15,138,108,0.22)]"
                  : "border-white/10 bg-white/[0.045] text-slate-300 hover:border-[#E8D7B9]/35 hover:text-white"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>

        <div className="glass-card gradient-border mt-8 grid gap-6 rounded-3xl p-5 sm:p-7 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E8D7B9]">
              {active.name}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Co może zrobić chatbot?
            </h3>
            <p className="mt-4 leading-7 text-slate-300">{active.answer}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openChatModal}
                className="cta-shine inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-2.5 text-sm font-semibold text-[#171717] shadow-[0_0_26px_rgba(15,138,108,0.24)] transition hover:-translate-y-0.5"
              >
                Otwórz demo chatu
              </button>
              <a
                href="#kontakt"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E8D7B9]/18 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-[#E8D7B9]/40 hover:bg-white/[0.08]"
              >
                Zamów audyt
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#171717]/42 p-5">
              <h4 className="text-sm font-semibold text-white">Typowe pytania</h4>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                {active.questions.map((item) => (
                  <li key={item}>“{item}”</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#171717]/42 p-5">
              <h4 className="text-sm font-semibold text-white">Dane do zebrania</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.data.map((item) => (
                  <span key={item} className="rounded-full border border-[#0F8A6C]/25 bg-[#0F8A6C]/12 px-3 py-1 text-xs font-semibold text-[#A7F3D0]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#E8D7B9]/18 bg-[#E8D7B9]/[0.06] p-5">
              <h4 className="text-sm font-semibold text-white">Przykład odpowiedzi</h4>
              <p key={active.name} className="animate-fade-up mt-4 text-sm leading-6 text-slate-200">
                {active.botMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
