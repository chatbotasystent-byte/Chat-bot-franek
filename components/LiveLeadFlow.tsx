"use client";

import { useEffect, useState } from "react";

const flowSteps = [
  {
    title: "Pytanie klienta",
    description: "Klient pyta na stronie o usługę, termin lub wycenę.",
    previewTitle: "Wiadomość klienta",
    preview: "Czy możecie przygotować wycenę i oddzwonić dzisiaj?"
  },
  {
    title: "Odpowiedź AI",
    description: "Chatbot odpowiada od razu i prowadzi rozmowę dalej.",
    previewTitle: "Odpowiedź AI",
    preview: "Jasne. Zbiorę kilka danych i przekażę zapytanie do zespołu."
  },
  {
    title: "Dane kontaktowe",
    description: "System porządkuje dane potrzebne do kontaktu zwrotnego.",
    previewTitle: "Dane zebrane przez AI",
    fields: ["Imię: Anna", "Email: kontakt@firma.pl", "Telefon: 500 000 000", "Branża: usługi"]
  },
  {
    title: "Google Sheets",
    description: "Lead trafia do arkusza jako czytelny nowy wiersz.",
    previewTitle: "Wiersz arkusza",
    row: ["08.06", "Anna", "usługi", "Nowy"]
  },
  {
    title: "Email / CRM",
    description: "Firma dostaje powiadomienie i może szybko oddzwonić.",
    previewTitle: "Powiadomienie",
    preview: "Nowe zapytanie: Anna, firma usługowa, prośba o wycenę."
  }
];

function openChatModal() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

export function LiveLeadFlow() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (activeStep >= flowSteps.length - 1) {
      setIsRunning(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveStep((current) => current + 1);
    }, 850);

    return () => window.clearTimeout(timeout);
  }, [activeStep, isRunning]);

  function startFlow() {
    setActiveStep(0);
    setIsRunning(true);
  }

  function resetFlow() {
    setActiveStep(-1);
    setIsRunning(false);
  }

  const activePreviewStep = flowSteps[Math.max(activeStep, 0)];
  const isComplete = activeStep === flowSteps.length - 1 && !isRunning;

  return (
    <section className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-x-0 top-16 -z-10 h-96 bg-[radial-gradient(circle,rgba(15,138,108,0.16),transparent_38rem)]" />
      <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl border border-white/10 bg-[#0B1F18]/[0.045] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
            LIVE LEAD FLOW
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F4FFF9] sm:text-4xl">
            Zobacz, jak lead przechodzi przez automatyzację
          </h2>
          <p className="mt-5 leading-7 text-[#D6D3D1]">
            Uruchom symulację i zobacz drogę od pierwszego pytania klienta do
            arkusza Google Sheets oraz powiadomienia dla firmy.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={startFlow}
              disabled={isRunning}
              className="min-h-11 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-6 py-2 text-sm font-bold text-[#F4FFF9] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isRunning ? "Trwa symulacja..." : "Uruchom przepływ"}
            </button>
            <button
              type="button"
              onClick={openChatModal}
              className="min-h-11 rounded-full border border-[#86EFAC]/35 bg-[#0B1F18]/[0.055] px-6 py-2 text-sm font-bold text-[#F4FFF9] transition hover:border-[#86EFAC]/60 hover:bg-[#0B1F18]/[0.09]"
            >
              Zobacz chatbota
            </button>
            <button
              type="button"
              onClick={resetFlow}
              className="min-h-11 rounded-full border border-white/10 bg-[#0B1F18]/[0.035] px-6 py-2 text-sm font-bold text-[#D6D3D1] transition hover:border-[#86EFAC]/35"
            >
              Reset
            </button>
          </div>

          {isComplete ? (
            <p className="mt-5 rounded-2xl border border-[#0F8A6C]/35 bg-[#0F8A6C]/12 px-4 py-3 text-sm font-semibold text-[#A7F3D0]">
              Gotowe - lead został zapisany i firma dostała powiadomienie.
            </p>
          ) : null}
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-5">
            {flowSteps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <article
                  key={step.title}
                  className={`relative min-h-36 rounded-2xl border p-4 transition duration-300 ${
                    isActive
                      ? "border-[#86EFAC]/55 bg-[#0B1F18] text-[#F4FFF9] shadow-[0_18px_50px_rgba(15,138,108,0.22)]"
                      : "border-white/10 bg-[#030705]/45 text-white"
                  } ${isCurrent ? "ring-2 ring-[#86EFAC]/35" : ""}`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                      isActive ? "bg-[#0F8A6C] text-white" : "bg-[#86EFAC]/10 text-[#86EFAC]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-sm font-bold">{step.title}</h3>
                  <p className={`mt-2 text-xs leading-5 ${isActive ? "text-[#B7CFC3]" : "text-[#D6D3D1]"}`}>
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="rounded-3xl border border-[#86EFAC]/18 bg-[#0E2A24]/70 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#86EFAC]">
                {activeStep < 0 ? "Podgląd aktywnego kroku" : activePreviewStep.previewTitle}
              </p>
              <span className="rounded-full border border-[#86EFAC]/20 bg-[#86EFAC]/10 px-3 py-1 text-xs font-bold text-[#86EFAC]">
                live demo
              </span>
            </div>

            {activeStep < 0 ? (
              <p className="mt-4 text-sm leading-6 text-[#D6D3D1]">
                Kliknij „Uruchom przepływ”, aby zobaczyć, jak dane przechodzą przez system.
              </p>
            ) : activePreviewStep.fields ? (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {activePreviewStep.fields.map((field) => (
                  <span key={field} className="rounded-2xl border border-white/10 bg-[#0B1F18]/[0.06] px-3 py-2 text-sm text-[#F4FFF9]">
                    {field}
                  </span>
                ))}
              </div>
            ) : activePreviewStep.row ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F18] text-[#F4FFF9]">
                <div className="grid grid-cols-4 bg-[#0F8A6C]/12 px-3 py-2 text-xs font-bold text-[#F4FFF9]">
                  <span>Data</span>
                  <span>Imię</span>
                  <span>Branża</span>
                  <span>Status</span>
                </div>
                <div className="grid grid-cols-4 items-center px-3 py-3 text-sm font-semibold">
                  {activePreviewStep.row.map((item) => (
                    <span key={item} className="truncate">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-2xl border border-white/10 bg-[#0B1F18]/[0.06] px-4 py-3 text-sm leading-6 text-[#F4FFF9]">
                {activePreviewStep.preview}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

