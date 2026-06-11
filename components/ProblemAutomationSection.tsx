"use client";

import { useState } from "react";

const problemAutomations = [
  {
    title: "Klienci pytają po godzinach",
    problem: "Klienci piszą wieczorem lub w weekend, a firma odpowiada dopiero później.",
    solution: "Chatbot AI odpowiada od razu, zbiera temat sprawy i dane kontaktowe.",
    effect: "Firma może wrócić do klienta z gotowym kontekstem.",
    mechanism: "Chatbot + Google Sheets + email notification"
  },
  {
    title: "Wiadomości giną w DM-ach",
    problem: "Zapytania z Instagrama, formularza i strony trafiają w różne miejsca.",
    solution: "Formularz lub chatbot zbiera dane i zapisuje je w jednym arkuszu.",
    effect: "Każdy lead ma status i nie ginie w wiadomościach.",
    mechanism: "Formularz + Google Sheets"
  },
  {
    title: "Chcę więcej leadów",
    problem: "Użytkownicy odwiedzają stronę, ale nie zostawiają kontaktu.",
    solution: "Popup, banner albo chatbot zachęca do zostawienia zapytania.",
    effect: "Więcej osób przechodzi z oglądania strony do kontaktu.",
    mechanism: "Chatbot + popup leadowy + banner CTA"
  },
  {
    title: "Chcę zapisywać dane do Google Sheets",
    problem: "Dane klientów są rozproszone i trzeba je przepisywać ręcznie.",
    solution: "Każde zgłoszenie automatycznie trafia do Google Sheets.",
    effect: "Masz prosty mini CRM z datą, kontaktem, wiadomością, źródłem i statusem.",
    mechanism: "Formularz / chatbot + Make + Google Sheets"
  },
  {
    title: "Za dużo pytań się powtarza",
    problem: "Klienci ciągle pytają o cenę, terminy, dostępność albo ofertę.",
    solution: "Chatbot odpowiada na najczęstsze pytania i kieruje do kontaktu.",
    effect: "Mniej ręcznego odpisywania i szybsza obsługa.",
    mechanism: "Chatbot FAQ + lead capture"
  },
  {
    title: "Chcę szybciej oddzwaniać",
    problem: "Firma dowiaduje się o leadzie za późno.",
    solution: "Po zgłoszeniu przychodzi email z danymi klienta.",
    effect: "Możesz oddzwonić szybciej, gdy klient jest jeszcze zainteresowany.",
    mechanism: "Google Sheets + email notification"
  }
];

const resultRows = [
  ["Problem", "problem"],
  ["Rozwiązanie", "solution"],
  ["Efekt", "effect"],
  ["Rekomendowany mechanizm", "mechanism"]
] as const;

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function ProblemAutomationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProblem = problemAutomations[activeIndex];

  return (
    <section className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-x-0 top-20 -z-10 h-96 bg-[radial-gradient(circle,rgba(201,168,106,0.12),transparent_38rem)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
            PROBLEM → AUTOMATYZACJA
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
            Z jakim problemem ma pomóc AI?
          </h2>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Wybierz najbliższy problem i zobacz, jaki mechanizm może go rozwiązać.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {problemAutomations.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#E8D7B9]/55 bg-[#F7F2E8] text-[#171717] shadow-[0_18px_50px_rgba(15,138,108,0.2)]"
                        : "border-white/10 bg-[#171717]/45 text-[#D6D3D1] hover:border-[#E8D7B9]/35 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        isActive
                          ? "bg-[#0F8A6C] text-white"
                          : "bg-[#E8D7B9]/10 text-[#E8D7B9] group-hover:bg-[#E8D7B9]/15"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold leading-5">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="rounded-3xl border border-[#E8D7B9]/22 bg-[#F7F2E8] p-5 text-[#171717] shadow-[0_28px_80px_rgba(0,0,0,0.2)] sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
                  Wybrany problem
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-normal sm:text-3xl">
                  {activeProblem.title}
                </h3>
              </div>
              <span className="w-fit rounded-full border border-[#0F8A6C]/20 bg-[#0F8A6C]/10 px-3 py-1 text-xs font-bold text-[#0F8A6C]">
                automatyzacja AI
              </span>
            </div>

            <div className="mt-7 grid gap-3">
              {resultRows.map(([label, key]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#E8D7B9]/70 bg-white px-4 py-4 shadow-[0_14px_34px_rgba(14,42,36,0.06)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F8A6C]">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#0E2A24]/78">
                    {activeProblem[key]}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToContact}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-6 py-3 text-sm font-bold text-[#171717] shadow-[0_16px_38px_rgba(15,138,108,0.18)] transition hover:scale-[1.01] sm:w-auto"
            >
              Zamów darmowy audyt
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
