"use client";

import { useMemo, useState } from "react";

type LeadPreviewState = {
  name: string;
  email: string;
  industry: string;
  message: string;
};

const initialLead: LeadPreviewState = {
  name: "",
  email: "",
  industry: "",
  message: ""
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
    ["Imię", lead.name || "—"],
    ["Email", lead.email || "—"],
    ["Branża", lead.industry || "—"],
    ["Wiadomość", lead.message || "—"]
  ];

  return (
    <section id="lead-preview" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
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

        <div className="glass-card gradient-border rounded-3xl p-5 shadow-[0_22px_70px_rgba(8,145,178,0.16)] sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">AI Automatyzacja</p>
              <p className="mt-1 text-sm text-slate-400">Dane aktualizują się na żywo.</p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-[#E8D7B9]/25 bg-[#E8D7B9]/10 px-3 py-1 text-xs font-semibold text-[#E8D7B9]">
              Demo arkusza
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="mt-5 block text-sm font-medium text-slate-100 md:mt-0">
              Imię
              <input
                value={lead.name}
                onChange={(event) => updateLead("name", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-[#E8D7B9]/30 bg-[#FFF7ED] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/30"
                placeholder="np. Anna"
              />
            </label>
            <label className="block text-sm font-medium text-slate-100">
              Email
              <input
                value={lead.email}
                onChange={(event) => updateLead("email", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-[#E8D7B9]/30 bg-[#FFF7ED] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/30"
                placeholder="np. kontakt@example.pl"
              />
            </label>
            <label className="block text-sm font-medium text-slate-100">
              Branża
              <input
                value={lead.industry}
                onChange={(event) => updateLead("industry", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-[#E8D7B9]/30 bg-[#FFF7ED] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/30"
                placeholder="np. firma usługowa"
              />
            </label>
            <label className="block text-sm font-medium text-slate-100">
              Wiadomość
              <input
                value={lead.message}
                onChange={(event) => updateLead("message", event.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-[#E8D7B9]/30 bg-[#FFF7ED] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/30"
                placeholder="np. Proszę o kontakt w sprawie wyceny"
              />
            </label>
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 bg-[#171717]/42 text-sm lg:block">
            <div className="grid grid-cols-[0.7fr_0.9fr_1.45fr_1.15fr_1.55fr_0.9fr] bg-[#0F8A6C]/14 text-[#A7F3D0]">
              {["Data", "Imię", "Email", "Branża", "Wiadomość", "Status"].map((column) => (
                <div key={column} className={`border-b border-white/10 px-3 py-3 font-semibold ${column === "Status" ? "text-center" : ""}`}>
                  {column}
                </div>
              ))}
            </div>
            <div className="grid min-h-16 grid-cols-[0.7fr_0.9fr_1.45fr_1.15fr_1.55fr_0.9fr] items-center text-slate-200">
              <div className="min-w-0 px-3 py-4">{today}</div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.name || "—"}</span>
              </div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.email || "—"}</span>
              </div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.industry || "—"}</span>
              </div>
              <div className="min-w-0 px-3 py-4">
                <span className="block truncate">{lead.message || "—"}</span>
              </div>
              <div className="flex min-w-0 items-center justify-center px-3 py-4">
                <span className="inline-flex rounded-full bg-[#0F8A6C]/14 px-3 py-1 text-xs font-semibold text-[#A7F3D0] ring-1 ring-[#0F8A6C]/25">
                  Nowy
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#171717]/42 p-4 lg:hidden">
            <div className="grid gap-3">
              {previewFields.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A7F3D0]">
                    {label}
                  </span>
                  <span className="break-words text-sm leading-6 text-slate-200">
                    {value}
                  </span>
                </div>
              ))}
              <div className="pt-1">
                <span className="rounded-full bg-[#0F8A6C]/14 px-3 py-1 text-xs font-semibold text-[#A7F3D0] ring-1 ring-[#0F8A6C]/25">
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
