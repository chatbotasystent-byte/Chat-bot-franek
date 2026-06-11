"use client";

import { useMemo, useState } from "react";

type Answer = boolean | null;

const auditQuestions = [
  "Czy masz stronę internetową albo profil na Instagramie?",
  "Czy klienci często pytają o cenę, termin albo dostępność?",
  "Czy zdarza się, że odpowiadasz klientom z opóźnieniem?",
  "Czy zapisujesz zapytania ręcznie albo w wiadomościach?",
  "Czy chcesz dostawać leady w Google Sheets albo na email?",
  "Czy prowadzisz firmę, która obsługuje zapytania klientów?"
];

function getScoreLabel(score: number, answeredCount: number) {
  if (answeredCount === 0) {
    return {
      title: "Odpowiedz na pytania, aby zobaczyć rekomendację.",
      description: "Wynik pojawi się po pierwszej odpowiedzi. Audyt pokazuje, które mechanizmy AI mogą mieć największy sens.",
      mechanisms: ["formularz", "chatbot", "Google Sheets"]
    };
  }

  if (score <= 35) {
    return {
      title: "Niski potencjał",
      description: "Najlepszy pierwszy krok to prosty formularz kontaktowy i powiadomienie email dla zespołu.",
      mechanisms: ["formularz", "email"]
    };
  }

  if (score <= 70) {
    return {
      title: "Średni potencjał",
      description: "Warto połączyć formularz leadowy, Google Sheets i powiadomienia, żeby uporządkować zapytania.",
      mechanisms: ["formularz", "Google Sheets", "powiadomienia"]
    };
  }

  return {
    title: "Wysoki potencjał",
    description: "Największy sens ma zestaw: chatbot, popup leadowy, Google Sheets oraz email lub CRM.",
    mechanisms: ["chatbot", "popup", "Google Sheets", "email/CRM"]
  };
}

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function AIAuditScore() {
  const [answers, setAnswers] = useState<Answer[]>(Array(auditQuestions.length).fill(null));

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const positiveCount = answers.filter(Boolean).length;
  const score = useMemo(() => {
    if (answeredCount === 0) {
      return 0;
    }

    return Math.min(100, Math.round((positiveCount / auditQuestions.length) * 100));
  }, [answeredCount, positiveCount]);
  const result = getScoreLabel(score, answeredCount);

  function setAnswer(index: number, value: boolean) {
    setAnswers((current) => current.map((answer, itemIndex) => (
      itemIndex === index ? value : answer
    )));
  }

  return (
    <section className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-x-0 top-20 -z-10 h-80 bg-[radial-gradient(circle,rgba(201,168,106,0.13),transparent_38rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
                AI AUDIT SCORE
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
                Sprawdź potencjał automatyzacji swojej strony
              </h2>
            </div>
            <span className="w-fit rounded-full border border-[#E8D7B9]/25 bg-[#E8D7B9]/10 px-4 py-2 text-sm font-bold text-[#E8D7B9]">
              Odpowiedziano: {answeredCount}/{auditQuestions.length}
            </span>
          </div>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Wybierz „Tak” lub „Nie” przy każdym pytaniu. Wynik pokaże, od jakiego
            mechanizmu automatyzacji warto zacząć.
          </p>

          <div className="mt-7 grid gap-3">
            {auditQuestions.map((question, index) => (
              <div
                key={question}
                className="grid gap-3 rounded-2xl border border-white/10 bg-[#171717]/45 px-4 py-3 text-sm text-[#D6D3D1] transition hover:border-[#E8D7B9]/30 sm:grid-cols-[1fr_auto]"
              >
                <p className="font-semibold leading-6">{question}</p>
                <div className="grid grid-cols-2 gap-2 sm:w-36">
                  {[true, false].map((value) => {
                    const isSelected = answers[index] === value;

                    return (
                      <button
                        key={String(value)}
                        type="button"
                        onClick={() => setAnswer(index, value)}
                        className={`min-h-9 rounded-full border px-3 text-xs font-bold transition ${
                          isSelected
                            ? "border-[#E8D7B9]/55 bg-[#F7F2E8] text-[#171717]"
                            : "border-white/10 bg-white/[0.045] text-[#E8D7B9] hover:border-[#E8D7B9]/45"
                        }`}
                      >
                        {value ? "Tak" : "Nie"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="sticky top-24 rounded-3xl border border-[#E8D7B9]/20 bg-[#F7F2E8] p-5 text-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-6">
          <p className="text-sm font-bold text-[#0F8A6C]">Wynik audytu</p>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-semibold">{score}</span>
            <span className="pb-2 text-lg font-bold text-[#7FA99B]">/100</span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#0E2A24]/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#C9A86A] transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>
          <h3 className="mt-6 text-xl font-semibold">{result.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#0E2A24]/72">{result.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {result.mechanisms.map((item) => (
              <span key={item} className="rounded-full border border-[#0F8A6C]/15 bg-[#0F8A6C]/10 px-3 py-1 text-xs font-bold text-[#0F8A6C]">
                {item}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="mt-7 w-full rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-bold text-[#171717] transition hover:scale-[1.01]"
          >
            Zamów darmowy audyt
          </button>
        </aside>
      </div>
    </section>
  );
}
