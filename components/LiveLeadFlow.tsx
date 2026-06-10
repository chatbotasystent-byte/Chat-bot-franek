"use client";

import { useEffect, useState } from "react";

const flowSteps = [
  {
    title: "Klient pyta",
    description: "Klient zadaje pytanie na stronie, np. o usługę, termin albo wycenę."
  },
  {
    title: "AI odpowiada",
    description: "Chatbot odpowiada od razu i prowadzi rozmowę."
  },
  {
    title: "AI zbiera dane",
    description: "System zbiera imię, email, telefon, branżę i wiadomość."
  },
  {
    title: "Google Sheets",
    description: "Lead trafia do arkusza jako nowy wiersz."
  },
  {
    title: "Email do firmy",
    description: "Firma dostaje powiadomienie z danymi kontaktowymi."
  }
];

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
    }, 800);

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

  const isComplete = activeStep === flowSteps.length - 1 && !isRunning;

  return (
    <section className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-x-0 top-16 -z-10 h-80 bg-[radial-gradient(circle,rgba(15,138,108,0.13),transparent_38rem)]" />
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
              LIVE LEAD FLOW
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
              Zobacz, jak lead przechodzi przez automatyzację
            </h2>
            <p className="mt-5 leading-7 text-[#D6D3D1]">
              Kliknij start i zobacz, co dzieje się od pierwszego pytania klienta
              do zapisu leada w arkuszu i powiadomienia email.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={startFlow}
                disabled={isRunning}
                className="min-h-11 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-6 py-2 text-sm font-bold text-[#171717] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-65"
              >
                Uruchom przepływ
              </button>
              <button
                type="button"
                onClick={resetFlow}
                className="min-h-11 rounded-full border border-[#E8D7B9]/25 bg-white/[0.055] px-6 py-2 text-sm font-bold text-[#F7F2E8] transition hover:border-[#E8D7B9]/50 hover:bg-white/[0.09]"
              >
                Reset
              </button>
            </div>
            {isComplete ? (
              <p className="mt-5 rounded-2xl border border-[#0F8A6C]/30 bg-[#0F8A6C]/12 px-4 py-3 text-sm font-semibold text-[#A7F3D0]">
                Gotowe — lead został zapisany i wysłany do firmy.
              </p>
            ) : null}
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {flowSteps.map((step, index) => {
              const isActive = index <= activeStep;

              return (
                <article
                  key={step.title}
                  className={`relative min-h-44 rounded-2xl border p-4 transition duration-300 ${
                    isActive
                      ? "border-[#E8D7B9]/55 bg-[#F7F2E8] text-[#171717] shadow-[0_18px_50px_rgba(15,138,108,0.22)]"
                      : "border-white/10 bg-[#171717]/45 text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                      isActive ? "bg-[#0F8A6C] text-white" : "bg-[#E8D7B9]/10 text-[#E8D7B9]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-sm font-bold">{step.title}</h3>
                  <p className={`mt-2 text-xs leading-5 ${isActive ? "text-[#0E2A24]/72" : "text-[#D6D3D1]"}`}>
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
