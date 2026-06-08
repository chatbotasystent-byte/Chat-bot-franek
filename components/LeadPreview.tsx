"use client";

import { useMemo, useState } from "react";

type LeadPreviewState = {
  name: string;
  email: string;
  industry: string;
  message: string;
};

const initialLead: LeadPreviewState = {
  name: "Anna",
  email: "kontakt@example.pl",
  industry: "firma usługowa",
  message: "Proszę o kontakt w sprawie wyceny."
};

function openChatModal() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

export function LeadPreview() {
  const [lead, setLead] = useState(initialLead);
  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("pl-PL", {
        day: "2-digit",
        month: "2-digit"
      }).format(new Date()),
    []
  );

  function updateLead(field: keyof LeadPreviewState, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  const previewFields = [
    ["Data", today],
    ["Imię", lead.name || "imię"],
    ["Email", lead.email || "email"],
    ["Branża", lead.industry || "branża"],
    ["Wiadomość", lead.message || "wiadomość"]
  ];

  return (
    <section id="lead-preview" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            AI Automatyzacja
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Tak może wyglądać lead w Google Sheets
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            Wpisz przykładowe dane i zobacz, jak jeden lead może pojawić się w
            arkuszu. To wizualne demo, bez wysyłania danych do backendu.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            W prawdziwym wdrożeniu taki lead może automatycznie trafić do Google
            Sheets, CRM albo na email.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openChatModal}
              className="cta-shine inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.24)] transition hover:-translate-y-0.5"
            >
              Otwórz demo chatu
            </button>
            <a
              href="#kontakt"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/35 hover:bg-white/[0.08]"
            >
              Zamów audyt
            </a>
          </div>
        </div>

        <div className="glass-card gradient-border rounded-3xl p-5 shadow-[0_22px_70px_rgba(8,145,178,0.16)] sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">AI Automatyzacja</p>
              <p className="mt-1 text-sm text-slate-400">Dane aktualizują się na żywo.</p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              Demo arkusza
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="mt-5 block text-sm font-medium text-slate-100 md:mt-0">
              Imię
              <input
                value={lead.name}
                onChange={(event) => updateLead("name", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/35"
                placeholder="Anna"
              />
            </label>
            <label className="block text-sm font-medium text-slate-100">
              Email
              <input
                value={lead.email}
                onChange={(event) => updateLead("email", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/35"
                placeholder="kontakt@example.pl"
              />
            </label>
            <label className="block text-sm font-medium text-slate-100">
              Branża
              <input
                value={lead.industry}
                onChange={(event) => updateLead("industry", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/35"
                placeholder="firma usługowa"
              />
            </label>
            <label className="block text-sm font-medium text-slate-100">
              Wiadomość
              <input
                value={lead.message}
                onChange={(event) => updateLead("message", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/35"
                placeholder="Proszę o kontakt"
              />
            </label>
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 bg-slate-950/42 text-sm lg:block">
            <div className="grid grid-cols-[0.7fr_0.9fr_1.45fr_1.15fr_1.55fr_0.9fr] bg-emerald-300/12 text-emerald-100">
              {["Data", "Imię", "Email", "Branża", "Wiadomość", "Status"].map((column) => (
                <div key={column} className={`border-b border-white/10 px-3 py-3 font-semibold ${column === "Status" ? "text-center" : ""}`}>
                  {column}
                </div>
              ))}
            </div>
            <div className="grid min-h-16 grid-cols-[0.7fr_0.9fr_1.45fr_1.15fr_1.55fr_0.9fr] items-center text-slate-200">
              <div className="min-w-0 px-3 py-4">{today}</div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.name || "imię"}</span>
              </div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.email || "email"}</span>
              </div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.industry || "branża"}</span>
              </div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.message || "wiadomość"}</span>
              </div>
              <div className="flex min-w-0 items-center justify-center px-3 py-4">
                <span className="inline-flex rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
                  Nowy
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/42 p-4 lg:hidden">
            <div className="grid gap-3">
              {previewFields.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    {label}
                  </span>
                  <span className="break-words text-sm leading-6 text-slate-200">
                    {value}
                  </span>
                </div>
              ))}
              <div className="pt-1">
                <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
                  Nowy
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            To wizualne demo. W prawdziwym wdrożeniu lead może trafić do Google
            Sheets, CRM albo na email.
          </p>
        </div>
      </div>
    </section>
  );
}
