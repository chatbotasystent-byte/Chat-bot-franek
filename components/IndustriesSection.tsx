"use client";

import { useState } from "react";

const industries = [
  {
    number: "01",
    name: "Firmy usługowe",
    description: "Bot zbiera typ usługi, miasto i dane kontaktowe.",
    tags: ["wycena", "kontakt", "Google Sheets"],
    exampleTitle: "Przykład: firma usługowa",
    example:
      "Klient pyta o wycenę usługi. Bot dopytuje o miasto, zakres prac, preferowany termin i dane kontaktowe. Lead trafia do Google Sheets i na email zespołu.",
    data: ["imię", "telefon/email", "typ usługi", "miasto", "opis sprawy"]
  },
  {
    number: "02",
    name: "Salony beauty",
    description: "Bot może zbierać usługę, termin i dane klienta.",
    tags: ["terminy", "usługi", "rezerwacje"],
    exampleTitle: "Przykład: salon beauty",
    example:
      "Klient pyta o wolny termin. Bot zbiera usługę, preferowaną datę, imię i kontakt, a zgłoszenie trafia do osoby obsługującej zapisy.",
    data: ["imię", "telefon/email", "usługa", "preferowany termin", "uwagi"]
  },
  {
    number: "03",
    name: "Warsztaty samochodowe",
    description: "Bot zbiera markę auta, problem i preferowany termin.",
    tags: ["auto", "diagnostyka", "termin"],
    exampleTitle: "Przykład: warsztat samochodowy",
    example:
      "Klient pyta o diagnostykę auta. Bot dopytuje o markę, model, objawy problemu i preferowany termin. Lead trafia do Google Sheets i na email obsługi.",
    data: ["imię", "telefon/email", "marka auta", "opis problemu", "termin"]
  },
  {
    number: "04",
    name: "Firmy remontowe",
    description: "Bot porządkuje zapytania o zakres prac i lokalizację.",
    tags: ["zakres", "lokalizacja", "wycena"],
    exampleTitle: "Przykład: firma remontowa",
    example:
      "Klient opisuje remont. Bot zbiera typ prac, metraż, lokalizację, zdjęcia lub opis i dane kontaktowe do wstępnej wyceny.",
    data: ["imię", "telefon/email", "zakres prac", "metraż", "lokalizacja"]
  },
  {
    number: "05",
    name: "Gabinety i kliniki",
    description: "Bot zbiera temat wizyty i przekazuje kontakt do recepcji.",
    tags: ["wizyta", "kontakt", "recepcja"],
    exampleTitle: "Przykład: gabinet lub klinika",
    example:
      "Pacjent pyta o konsultację. Bot zbiera temat wizyty, preferowany termin i kontakt, a recepcja dostaje komplet informacji do oddzwonienia.",
    data: ["imię", "telefon/email", "temat wizyty", "preferowany termin", "kanał kontaktu"]
  },
  {
    number: "06",
    name: "Szkoły językowe",
    description: "Bot zbiera poziom, cel nauki i preferowaną grupę.",
    tags: ["poziom", "grupy", "zapisy"],
    exampleTitle: "Przykład: szkoła językowa",
    example:
      "Klient pyta o kurs. Bot dopytuje o język, poziom, wiek, cel nauki i preferowane godziny, po czym przekazuje zgłoszenie do biura.",
    data: ["imię", "telefon/email", "język", "poziom", "preferowany grafik"]
  },
  {
    number: "07",
    name: "Biura nieruchomości",
    description: "Bot kwalifikuje kupujących i zbiera preferencje.",
    tags: ["budżet", "preferencje", "agent"],
    exampleTitle: "Przykład: biuro nieruchomości",
    example:
      "Klient szuka mieszkania. Bot zbiera budżet, lokalizację, typ nieruchomości i kontakt, a agent dostaje wstępnie zakwalifikowany lead.",
    data: ["imię", "telefon/email", "budżet", "lokalizacja", "typ nieruchomości"]
  },
  {
    number: "08",
    name: "Lokalne biznesy",
    description: "Bot odpowiada na FAQ i przekazuje zapytania do firmy.",
    tags: ["FAQ", "leady", "kontakt"],
    exampleTitle: "Przykład: lokalny biznes",
    example:
      "Klient pyta o godziny, ofertę lub dostępność. Bot odpowiada na podstawowe pytania i zbiera kontakt, jeśli sprawa wymaga oddzwonienia.",
    data: ["imię", "telefon/email", "temat sprawy", "wiadomość", "źródło zgłoszenia"]
  }
];

function openChatModal() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

export function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeIndustry = industries[activeIndex];

  return (
    <section id="branze" className="relative bg-[#0B1F18] px-5 py-14 text-[#F4FFF9] sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(15,138,108,0.11),transparent_30rem),radial-gradient(circle_at_86%_34%,rgba(34,197,94,0.16),transparent_32rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F8A6C]">
            BRANŻE
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F4FFF9] sm:text-4xl">
            Dla jakich firm sprawdzi się automatyzacja AI?
          </h2>
          <p className="mt-4 leading-7 text-[#7FA99B]">
            To demo można dopasować do firm usługowych, lokalnych, internetowych i B2B.
            Różni się tylko scenariusz rozmowy i dane, które zbiera system.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={industry.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group flex min-h-[250px] flex-col rounded-3xl border p-5 text-left shadow-[0_18px_45px_rgba(14,42,36,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#0F8A6C]/45 hover:shadow-[0_24px_60px_rgba(14,42,36,0.13)] ${
                  isActive
                    ? "border-[#0F8A6C]/45 bg-[#0B1F18] shadow-[0_26px_70px_rgba(15,138,108,0.16)] ring-2 ring-[#0F8A6C]/10"
                    : "border-[#86EFAC]/80 bg-[#0B1F18]/82"
                }`}
              >
                <div className="h-1 w-14 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#22C55E] transition group-hover:w-20" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xs font-bold ${
                      isActive
                        ? "bg-[#0F8A6C] text-white"
                        : "bg-[#86EFAC]/35 text-[#F4FFF9]"
                    }`}
                  >
                    {industry.number}
                  </span>
                  <span className="rounded-full border border-[#86EFAC]/70 bg-[#071B14] px-2.5 py-1 text-[11px] font-bold text-[#7FA99B]">
                    demo
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#F4FFF9]">{industry.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#B7CFC3]">{industry.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {industry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#86EFAC]/70 bg-[#071B14] px-3 py-1 text-xs font-bold text-[#0F8A6C]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-7 rounded-3xl border border-[#86EFAC]/80 bg-[#0B1F18] p-5 shadow-[0_24px_70px_rgba(14,42,36,0.1)] sm:p-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
              Przykład automatyzacji dla tej branży
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-normal text-[#F4FFF9]">
              {activeIndustry.exampleTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#B7CFC3]">
              {activeIndustry.example}
            </p>
            <button
              type="button"
              onClick={openChatModal}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-6 py-3 text-sm font-bold text-[#F4FFF9] shadow-[0_16px_38px_rgba(15,138,108,0.18)] transition hover:scale-[1.01] sm:w-auto"
            >
              Zobacz, jak działa chatbot
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-[#86EFAC]/70 bg-[#071B14] p-4 lg:mt-0">
            <p className="text-sm font-bold text-[#F4FFF9]">Dane zbierane przez system</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {activeIndustry.data.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-[#86EFAC]/70 bg-[#0B1F18] px-3 py-2 text-sm font-semibold text-[#B7CFC3]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-[#7FA99B]">
          Każdy przykład można połączyć z chatbotem, formularzem, popupem, Google Sheets i powiadomieniem email.
        </p>
      </div>
    </section>
  );
}

