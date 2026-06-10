"use client";

import { useMemo, useState } from "react";

const auditQuestions = [
  "Czy masz stronę internetową albo profil na Instagramie?",
  "Czy klienci często pytają o cenę, termin albo dostępność?",
  "Czy zdarza się, że odpowiadasz klientom z opóźnieniem?",
  "Czy zapisujesz zapytania ręcznie albo w wiadomościach?",
  "Czy chcesz dostawać leady w Google Sheets albo na email?",
  "Czy prowadzisz firmę, która obsługuje zapytania klientów?"
];

function getScoreLabel(score: number) {
  if (score <= 35) {
    return {
      title: "Niski potencjał",
      description: "Na razie wystarczy prosty formularz i podstawowe uporządkowanie zapytań.",
      mechanisms: ["formularz", "email notification"]
    };
  }

  if (score <= 70) {
    return {
      title: "Średni potencjał",
      description: "Warto wdrożyć formularz leadowy, zapis do Google Sheets i powiadomienia email.",
      mechanisms: ["formularz", "Google Sheets", "email notification"]
    };
  }

  return {
    title: "Wysoki potencjał",
    description: "Chatbot AI, popup leadowy i automatyzacja Google Sheets mogą realnie skrócić czas reakcji i uporządkować zapytania.",
    mechanisms: ["chatbot", "popup", "Google Sheets", "email notification"]
  };
}

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function AIAuditScore() {
  const [answers, setAnswers] = useState<boolean[]>(Array(auditQuestions.length).fill(false));

  const score = useMemo(() => Math.min(100, 10 + answers.filter(Boolean).length * 15), [answers]);
  const result = getScoreLabel(score);

  function toggleAnswer(index: number) {
    setAnswers((current) => current.map((answer, itemIndex) => (
      itemIndex === index ? !answer : answer
    )));
  }

  return (
    <section className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-x-0 top-20 -z-10 h-80 bg-[radial-gradient(circle,rgba(201,168,106,0.13),transparent_38rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
            AI AUDIT SCORE
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
            Sprawdź potencjał automatyzacji swojej strony
          </h2>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Odpowiedz na kilka pytań i zobacz, czy Twoja strona może lepiej zbierać zapytania.
          </p>

          <div className="mt-7 grid gap-3">
            {auditQuestions.map((question, index) => (
              <button
                key={question}
                type="button"
                onClick={() => toggleAnswer(index)}
                className={`flex min-h-14 items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  answers[index]
                    ? "border-[#E8D7B9]/50 bg-[#F7F2E8] text-[#171717]"
                    : "border-white/10 bg-[#171717]/45 text-[#D6D3D1] hover:border-[#E8D7B9]/35"
                }`}
              >
                <span>{question}</span>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                  answers[index] ? "bg-[#0F8A6C] text-white" : "bg-white/[0.06] text-[#E8D7B9]"
                }`}>
                  {answers[index] ? "Tak" : "Nie"}
                </span>
              </button>
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
