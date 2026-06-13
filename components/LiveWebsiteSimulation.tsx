"use client";

import { useEffect, useState } from "react";

type MechanismKey = "chatbot" | "popup" | "form" | "banner";

const mechanisms: Array<{
  key: MechanismKey;
  label: string;
  description: string;
  source: string;
}> = [
  {
    key: "chatbot",
    label: "Chatbot",
    description: "Rozmowa AI i zebranie danych kontaktowych",
    source: "chatbot"
  },
  {
    key: "popup",
    label: "Popup",
    description: "Boczny popup zachęcający do zostawienia kontaktu",
    source: "popup"
  },
  {
    key: "form",
    label: "Formularz",
    description: "Klasyczny formularz zgłoszeniowy",
    source: "formularz"
  },
  {
    key: "banner",
    label: "Banner",
    description: "Pasek CTA kierujący do kontaktu",
    source: "banner"
  }
];

const simulationSteps = [
  "Zbieranie danych...",
  "Zapis do Google Sheets...",
  "Wysyłanie emaila...",
  "Lead gotowy"
];

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function openChatModal() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

export function LiveWebsiteSimulation() {
  const [activeMechanism, setActiveMechanism] = useState<MechanismKey>("chatbot");
  const [simulationStep, setSimulationStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const mechanism = mechanisms.find((item) => item.key === activeMechanism) ?? mechanisms[0];

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (simulationStep >= simulationSteps.length - 1) {
      setIsRunning(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setSimulationStep((current) => current + 1);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [isRunning, simulationStep]);

  function startSimulation() {
    setSimulationStep(0);
    setIsRunning(true);
  }

  function resetSimulation() {
    setSimulationStep(-1);
    setIsRunning(false);
  }

  const isComplete = simulationStep === simulationSteps.length - 1 && !isRunning;

  return (
    <section className="relative overflow-hidden bg-[#0B1F18] px-5 py-14 text-[#F4FFF9] sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.16),transparent_32rem),linear-gradient(180deg,#06110D_0%,#0B1F18_100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F8A6C]">
            LIVE DEMO
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F4FFF9] sm:text-4xl">
            Przetestuj mechanizmy na przykładowej stronie
          </h2>
          <p className="mt-4 leading-7 text-[#7FA99B]">
            Zobacz, jak chatbot, popup, formularz i banner mogą zbierać leady
            na stronie klienta - bez ręcznego przepisywania danych.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#86EFAC]/80 bg-[#0B1F18] p-4 shadow-[0_22px_60px_rgba(14,42,36,0.10)] sm:p-6">
          <div className="grid gap-3 md:grid-cols-4">
            {mechanisms.map((item) => {
              const isActive = activeMechanism === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveMechanism(item.key);
                    resetSimulation();
                  }}
                  className={`min-h-24 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                    isActive
                      ? "border-[#0F8A6C]/45 bg-[#0F8A6C] text-white shadow-[0_18px_40px_rgba(15,138,108,0.22)]"
                      : "border-[#86EFAC]/80 bg-[#071B14] text-[#F4FFF9] hover:border-[#0F8A6C]/35 hover:shadow-[0_14px_34px_rgba(14,42,36,0.1)]"
                  }`}
                >
                  <span className="text-sm font-bold">{item.label}</span>
                  <span className={`mt-2 block text-xs leading-5 ${isActive ? "text-white/78" : "text-[#B7CFC3]"}`}>
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <BrowserMockup activeMechanism={activeMechanism} source={mechanism.source} />
            <LeadStatusPanel
              source={mechanism.source}
              simulationStep={simulationStep}
              isRunning={isRunning}
              isComplete={isComplete}
              onStart={startSimulation}
              onReset={resetSimulation}
            />
          </div>

          <div className="mt-6 rounded-3xl border border-[#86EFAC]/70 bg-[#030705] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="text-sm leading-6 text-[#D6D3D1]">
              Takie mechanizmy można wdrożyć na realnej stronie i połączyć z
              Google Sheets, emailem albo CRM.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:flex-row">
              <button
                type="button"
                onClick={scrollToContact}
                className="cta-primary cta-shine min-h-11 rounded-full px-5 py-2 text-sm"
              >
                Zamów darmowy audyt
              </button>
              <button
                type="button"
                onClick={openChatModal}
                className="cta-secondary min-h-11 rounded-full px-5 py-2 text-sm"
              >
                Otwórz chatbota
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserMockup({
  activeMechanism,
  source
}: {
  activeMechanism: MechanismKey;
  source: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#34D399]/10 bg-[#0B1F18] shadow-[0_20px_55px_rgba(14,42,36,0.12)]">
      <div className="flex items-center gap-3 border-b border-[#86EFAC]/70 bg-[#071B14] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#86EFAC]" />
        <span className="h-3 w-3 rounded-full bg-[#22C55E]" />
        <span className="h-3 w-3 rounded-full bg-[#0F8A6C]" />
        <div className="ml-2 min-w-0 flex-1 rounded-full border border-[#86EFAC]/80 bg-[#0B1F18] px-4 py-1 text-xs font-semibold text-[#B7CFC3]">
          twojafirma.pl
        </div>
      </div>

      <div className="relative min-h-[540px] overflow-hidden bg-[#0B1F18] p-4 text-[#F4FFF9] sm:p-6">
        {activeMechanism === "banner" ? <BannerOverlay /> : null}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold">Twoja Firma</p>
          <div className="hidden gap-3 text-xs font-semibold text-[#7FA99B] sm:flex">
            <span>Usługi</span>
            <span>Realizacje</span>
            <span>Kontakt</span>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#86EFAC]/80 bg-[#0B1F18] p-5 shadow-[0_12px_34px_rgba(14,42,36,0.07)]">
          <span className="rounded-full border border-[#0F8A6C]/20 bg-[#0F8A6C]/10 px-3 py-1 text-xs font-bold text-[#0F8A6C]">
            Firma usługowa
          </span>
          <h3 className="mt-4 max-w-lg text-3xl font-semibold tracking-normal">
            Nowoczesna firma usługowa
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#B7CFC3]">
            Szybkie odpowiedzi, wyceny i kontakt w jednym miejscu.
          </p>
          <button
            type="button"
            className="mt-5 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-5 py-2 text-sm font-bold text-[#F4FFF9]"
          >
            Zapytaj o wycenę
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Wyceny", "Terminy", "Kontakt"].map((item) => (
            <div key={item} className="rounded-2xl border border-[#86EFAC]/70 bg-[#0B1F18] px-4 py-4 text-sm font-bold">
              {item}
              <p className="mt-2 text-xs font-medium leading-5 text-[#7FA99B]">
                Krótki opis usługi i szybkie zgłoszenie.
              </p>
            </div>
          ))}
        </div>

        <InlineContactForm active={activeMechanism === "form"} />

        {activeMechanism === "chatbot" ? <ChatbotOverlay source={source} /> : null}
        {activeMechanism === "popup" ? <PopupOverlay source={source} /> : null}
      </div>
    </div>
  );
}

function ChatbotOverlay({ source }: { source: string }) {
  return (
    <div className="absolute bottom-5 right-5 w-[min(310px,calc(100%-40px))] rounded-3xl border border-[#0F8A6C]/25 bg-[#0B1F18] p-4 shadow-[0_18px_45px_rgba(14,42,36,0.18)] transition">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F8A6C]">
        AI Chat
      </p>
      <div className="mt-3 space-y-2">
        <p className="ml-auto max-w-[82%] rounded-2xl bg-[#030705] px-3 py-2 text-xs leading-5 text-white">
          Chcę zapytać o wycenę
        </p>
        <p className="max-w-[88%] rounded-2xl border border-[#86EFAC]/70 bg-[#071B14] px-3 py-2 text-xs leading-5 text-[#F4FFF9]">
          Jasne - zostaw kontakt, a firma wróci z propozycją.
        </p>
      </div>
      <SourceBadge source={source} />
    </div>
  );
}

function PopupOverlay({ source }: { source: string }) {
  return (
    <div className="absolute right-5 top-24 w-[min(300px,calc(100%-40px))] rounded-3xl border border-[#86EFAC]/80 bg-[#030705] p-4 text-white shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
      <p className="text-sm font-bold text-[#86EFAC]">
        Zostaw kontakt - przygotujemy propozycję automatyzacji
      </p>
      <div className="mt-4 grid gap-2">
        <div className="h-10 rounded-xl bg-[#0B1F18] text-xs font-semibold text-[#7FA99B] px-3 py-3">Imię</div>
        <div className="h-10 rounded-xl bg-[#0B1F18] text-xs font-semibold text-[#7FA99B] px-3 py-3">Email</div>
      </div>
      <SourceBadge source={source} />
    </div>
  );
}

function InlineContactForm({ active }: { active: boolean }) {
  return (
    <div className={`mt-4 rounded-3xl border bg-[#0B1F18] p-4 shadow-sm transition ${
      active ? "border-[#0F8A6C]/45 ring-4 ring-[#0F8A6C]/10" : "border-[#86EFAC]/70"
    }`}>
      <p className="text-sm font-bold text-[#F4FFF9]">Formularz zgłoszeniowy</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {["Imię", "Email", "Wiadomość"].map((item) => (
          <div key={item} className="h-10 rounded-xl border border-[#86EFAC]/70 bg-[#071B14] px-3 py-3 text-xs font-semibold text-[#7FA99B]">
            {item}
          </div>
        ))}
      </div>
      {active ? <SourceBadge source="formularz" /> : null}
    </div>
  );
}

function BannerOverlay() {
  return (
    <div className="absolute inset-x-4 bottom-5 z-10 rounded-2xl border border-[#86EFAC]/70 bg-[#030705] p-4 text-white shadow-[0_18px_55px_rgba(0,0,0,0.28)] sm:flex sm:items-center sm:justify-between sm:gap-4">
      <p className="text-sm font-semibold">
        Masz pytanie? AI może zebrać zgłoszenie w 30 sekund.
      </p>
      <button type="button" className="mt-3 rounded-full bg-[#86EFAC] px-4 py-2 text-xs font-bold text-[#F4FFF9] sm:mt-0">
        Zostaw kontakt
      </button>
      <div className="mt-3 sm:mt-0">
        <SourceBadge source="banner" />
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  return (
    <span className="mt-3 inline-flex rounded-full border border-[#0F8A6C]/20 bg-[#0F8A6C]/10 px-3 py-1 text-xs font-bold text-[#0F8A6C]">
      Źródło: {source}
    </span>
  );
}

function LeadStatusPanel({
  source,
  simulationStep,
  isRunning,
  isComplete,
  onStart,
  onReset
}: {
  source: string;
  simulationStep: number;
  isRunning: boolean;
  isComplete: boolean;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <aside className="rounded-3xl border border-[#86EFAC]/80 bg-[#030705] p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#86EFAC]">
        Co dzieje się z leadem?
      </p>
      <div className="mt-5 grid gap-2">
        {[
          ["Źródło", source],
          ["Imię", "Jan Kowalski"],
          ["Email", "jan@firma.pl"],
          ["Wiadomość", "Proszę o kontakt w sprawie automatyzacji"],
          ["Status", "Nowy"],
          ["Zapis", "Google Sheets"],
          ["Powiadomienie", "Email do firmy"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#0B1F18]/[0.05] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#86EFAC]">{label}</p>
            <p className="mt-1 text-sm font-semibold text-[#F4FFF9]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {["Dane zebrane", "Zapis do arkusza", "Email wysłany", "Lead gotowy do obsługi"].map((item, index) => {
          const active = index <= simulationStep;

          return (
            <div
              key={item}
              className={`rounded-2xl border px-3 py-3 text-xs font-bold transition ${
                active
                  ? "border-[#0F8A6C]/40 bg-[#0F8A6C]/12 text-[#A7F3D0]"
                  : "border-white/10 bg-[#0B1F18]/[0.035] text-[#D6D3D1]/60"
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0B1F18]/[0.045] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#86EFAC]">
          Symulacja zapisu
        </p>
        <div className="mt-3 grid gap-2">
          {simulationSteps.map((item, index) => {
            const active = index <= simulationStep;

            return (
              <div key={item} className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                active ? "bg-[#86EFAC] text-[#F4FFF9]" : "bg-[#0B1F18]/[0.06] text-[#D6D3D1]/62"
              }`}>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {isComplete ? (
        <p className="mt-4 rounded-2xl border border-[#0F8A6C]/30 bg-[#0F8A6C]/12 px-4 py-3 text-sm font-semibold text-[#A7F3D0]">
          Gotowe - lead został zapisany, a firma dostała powiadomienie.
        </p>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onStart}
          disabled={isRunning}
          className="min-h-11 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-4 py-2 text-sm font-bold text-[#F4FFF9] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isRunning ? "Symulacja trwa..." : "Symuluj zapis leada"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 rounded-full border border-[#86EFAC]/25 bg-[#0B1F18]/[0.06] px-4 py-2 text-sm font-bold text-[#F4FFF9] transition hover:border-[#86EFAC]/50"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}

