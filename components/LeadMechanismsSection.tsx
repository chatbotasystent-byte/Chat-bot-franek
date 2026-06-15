"use client";

import { useState } from "react";

type MechanismAction = "chat" | "popup" | "exit" | "form" | "banner";

const mechanisms = [
  {
    action: "chat",
    number: "01",
    title: "Chatbot AI",
    description: "Odpowiada na pytania i zbiera dane kontaktowe.",
    button: "Otwórz chatbota"
  },
  {
    action: "popup",
    number: "02",
    title: "Popup leadowy",
    description: "Zachęca użytkownika do zostawienia kontaktu w odpowiednim momencie.",
    button: "Zobacz popup"
  },
  {
    action: "exit",
    number: "03",
    title: "Exit popup",
    description: "Pojawia się, gdy użytkownik chce opuścić stronę.",
    button: "Zobacz exit popup"
  },
  {
    action: "form",
    number: "04",
    title: "Formularz kontaktowy",
    description: "Klasyczny formularz dla osób gotowych do rozmowy.",
    button: "Przejdź do formularza"
  },
  {
    action: "banner",
    number: "05",
    title: "Banner CTA",
    description: "Delikatny pasek zachęcający do kontaktu bez zasłaniania strony.",
    button: "Zobacz banner"
  }
] as const;

function openExistingChat() {
  window.dispatchEvent(new Event("open-chat-modal"));
}

function scrollToContact() {
  document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DemoField({ label }: { label: string }) {
  return (
    <div className="min-h-11 rounded-xl border border-[#34D399]/16 bg-[#0B1F18]/88 px-3 py-3 text-base font-semibold text-[#9BB7AA]">
      {label}
    </div>
  );
}

function ModalShell({
  children,
  label,
  onClose
}: {
  children: React.ReactNode;
  label: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020403]/72 px-3 py-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="dark-green-card max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl p-5 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#34D399]/18 bg-[#06110D]/86 text-sm font-black text-[#F4FFF9] transition hover:border-[#86EFAC]/45 hover:bg-[#0E2A24]"
          aria-label="Zamknij"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export function LeadMechanismsSection() {
  const [activeModal, setActiveModal] = useState<"popup" | "exit" | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  function handleAction(action: MechanismAction) {
    if (action === "chat") {
      openExistingChat();
      return;
    }

    if (action === "popup" || action === "exit") {
      setActiveModal(action);
      return;
    }

    if (action === "form") {
      scrollToContact();
      return;
    }

    setIsBannerVisible(true);
  }

  return (
    <section id="demo" className="relative overflow-hidden px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="dark-section-panel emerald-glow mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#86EFAC]">
            MECHANIZMY
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-[#F4FFF9] sm:text-5xl">
            Zobacz, jak strona może zbierać leady
          </h2>
          <p className="mt-4 text-base leading-7 text-[#9BB7AA] sm:text-lg">
            Wybierz mechanizm i sprawdź, jak może działać na Twojej stronie.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {mechanisms.map((mechanism) => (
            <article
              key={mechanism.action}
              className="dark-green-card premium-lift flex min-h-full flex-col rounded-3xl p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#34D399]/24 bg-[#0F8A6C]/22 text-sm font-black text-[#86EFAC]">
                {mechanism.number}
              </span>
              <h3 className="mt-5 text-lg font-black tracking-[-0.03em] text-[#F4FFF9]">
                {mechanism.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#9BB7AA]">
                {mechanism.description}
              </p>
              <button
                type="button"
                onClick={() => handleAction(mechanism.action)}
                className="mt-5 min-h-11 rounded-2xl border border-[#34D399]/18 bg-[#0B1F18]/86 px-4 py-3 text-sm font-black text-[#F4FFF9] transition hover:-translate-y-0.5 hover:border-[#22C55E]/45 hover:bg-[#0F8A6C]/22 hover:text-[#86EFAC]"
              >
                {mechanism.button}
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeModal === "popup" ? (
        <ModalShell label="Popup leadowy" onClose={() => setActiveModal(null)}>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#86EFAC]">
            Popup leadowy
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#F4FFF9]">
            Zostaw kontakt
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#9BB7AA]">
            Wrócimy z propozycją automatyzacji dopasowaną do Twojej strony.
          </p>
          <div className="mt-5 grid gap-3">
            <DemoField label="Imię" />
            <DemoField label="Email" />
            <button type="button" className="min-h-11 rounded-2xl bg-gradient-to-r from-[#0F8A6C] to-[#22C55E] px-4 py-3 text-sm font-black text-[#F4FFF9]">
              Wyślij zapytanie
            </button>
          </div>
        </ModalShell>
      ) : null}

      {activeModal === "exit" ? (
        <ModalShell label="Exit popup" onClose={() => setActiveModal(null)}>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#86EFAC]">
            Exit popup
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#F4FFF9]">
            Zanim wyjdziesz
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#9BB7AA]">
            Zostaw kontakt, a przygotujemy propozycję automatyzacji.
          </p>
          <div className="mt-5 grid gap-3">
            <DemoField label="Email" />
            <button type="button" className="min-h-11 rounded-2xl bg-gradient-to-r from-[#0F8A6C] to-[#22C55E] px-4 py-3 text-sm font-black text-[#F4FFF9]">
              Wyślij zapytanie
            </button>
          </div>
        </ModalShell>
      ) : null}

      {isBannerVisible ? (
        <div className="fixed inset-x-3 bottom-3 z-[60] rounded-3xl border border-[#34D399]/24 bg-gradient-to-r from-[#0B1F18] via-[#0E2A24] to-[#06110D] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.36),0_0_44px_rgba(34,197,94,0.14)] sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-[min(44rem,calc(100%-2rem))] sm:-translate-x-1/2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-black leading-6 text-[#F4FFF9]">
              Masz pytanie? Chatbot może zebrać zgłoszenie w 30 sekund.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openExistingChat}
                className="min-h-10 flex-1 rounded-2xl bg-[#22C55E] px-4 py-2.5 text-sm font-black text-[#03120D] sm:flex-none"
              >
                Otwórz chatbota
              </button>
              <button
                type="button"
                onClick={() => setIsBannerVisible(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#34D399]/18 bg-[#06110D]/86 text-sm font-black text-[#F4FFF9]"
                aria-label="Zamknij banner"
              >
                X
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
