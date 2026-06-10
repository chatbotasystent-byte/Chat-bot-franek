"use client";

import { useState } from "react";

type IndustryDemo = {
  name: string;
  question: string;
  answer: string;
  data: string[];
  result: string;
};

const demos: IndustryDemo[] = [
  {
    name: "Firma usługowa",
    question: "Czy możecie wycenić usługę w moim mieście?",
    answer:
      "Jasne. Podaj mi proszę miasto, typ usługi i kontakt, a przekażę zapytanie do zespołu.",
    data: ["imię", "telefon", "miasto", "typ usługi", "opis problemu"],
    result: "Lead trafia do Google Sheets i firma może oddzwonić."
  },
  {
    name: "Salon beauty",
    question: "Czy macie wolny termin na paznokcie w piątek?",
    answer:
      "Mogę sprawdzić zapytanie i zebrać dane do kontaktu. Podaj proszę usługę, preferowany termin i telefon.",
    data: ["imię", "telefon", "usługa", "preferowany termin"],
    result: "Zapytanie trafia do arkusza lub recepcji."
  },
  {
    name: "Warsztat samochodowy",
    question: "Czy mogę umówić auto na diagnostykę?",
    answer:
      "Jasne. Podaj markę auta, opis problemu, preferowany termin i telefon, a przekażę zgłoszenie do warsztatu.",
    data: ["imię", "telefon", "marka auta", "problem", "termin"],
    result: "Lead trafia do Google Sheets."
  },
  {
    name: "Komis samochodowy",
    question: "Interesuje mnie auto do 50 tys. zł.",
    answer:
      "Mogę zebrać preferencje i przekazać je sprzedawcy. Podaj budżet, typ auta i kontakt.",
    data: ["imię", "telefon", "budżet", "typ auta", "preferencje"],
    result: "Sprzedawca dostaje gotowy lead."
  },
  {
    name: "Klinika / gabinet",
    question: "Czy mogę umówić konsultację?",
    answer:
      "Mogę zebrać temat wizyty, preferowany termin oraz kontakt i przekazać zgłoszenie do recepcji.",
    data: ["imię", "telefon", "temat wizyty", "preferowany termin"],
    result: "Kontakt trafia do arkusza lub recepcji."
  },
  {
    name: "Restauracja",
    question: "Czy można zarezerwować stolik na sobotę?",
    answer:
      "Jasne. Podaj proszę godzinę, liczbę osób i telefon kontaktowy.",
    data: ["imię", "telefon", "data", "godzina", "liczba osób"],
    result: "Rezerwacja trafia do arkusza."
  },
  {
    name: "E-commerce",
    question: "Czy ten produkt jest dostępny?",
    answer:
      "Mogę zebrać pytanie o produkt i przekazać je obsłudze. Podaj nazwę produktu i email.",
    data: ["imię", "email", "produkt", "pytanie", "numer zamówienia"],
    result: "Zapytanie trafia do obsługi lub Google Sheets."
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
            Wybierz branżę i sprawdź, jakie pytania może obsłużyć chatbot oraz
            jakie dane może przekazać do arkusza.
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

        <div className="glass-card gradient-border mt-8 grid gap-6 rounded-3xl p-5 sm:p-7 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E8D7B9]">
              {active.name}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Jak może wyglądać rozmowa?
            </h3>
            <p className="mt-4 leading-7 text-slate-300">
              To wizualny przykład. W prawdziwym wdrożeniu odpowiedzi, pytania i
              formularz można dopasować do oferty firmy.
            </p>

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

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#171717]/42 p-5">
              <h4 className="text-sm font-semibold text-white">Pytanie klienta</h4>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                &ldquo;{active.question}&rdquo;
              </p>
            </div>
            <div className="rounded-2xl border border-[#E8D7B9]/18 bg-[#E8D7B9]/[0.06] p-5">
              <h4 className="text-sm font-semibold text-white">Odpowiedź AI</h4>
              <p key={active.name} className="animate-fade-up mt-4 text-sm leading-6 text-slate-200">
                {active.answer}
              </p>
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
            <div className="rounded-2xl border border-white/10 bg-[#171717]/42 p-5">
              <h4 className="text-sm font-semibold text-white">Efekt końcowy</h4>
              <p className="mt-4 text-sm leading-6 text-slate-300">{active.result}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#E8D7B9]">
                Google Sheets / CRM / email
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
