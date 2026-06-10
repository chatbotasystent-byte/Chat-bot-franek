"use client";

import { useEffect, useState } from "react";

const mechanisms = [
  {
    number: "01",
    title: "Chatbot",
    description: "Odpowiada na pytania i zbiera kontakt w rozmowie.",
    button: "Pokaż chatbota",
    action: "chat",
    recommended: true
  },
  {
    number: "02",
    title: "Formularz",
    description: "Dla osób, które wolą od razu zostawić dane.",
    button: "Przejdź do formularza",
    action: "form"
  },
  {
    number: "03",
    title: "Popup leadowy",
    description: "Zachęca do kontaktu lub wyceny w odpowiednim momencie.",
    button: "Pokaż popup",
    action: "lead-popup"
  },
  {
    number: "04",
    title: "Popup przy wyjściu",
    description: "Pomaga przechwycić osoby, które chcą wyjść bez kontaktu.",
    button: "Pokaż popup przy wyjściu",
    action: "exit-popup"
  },
  {
    number: "05",
    title: "Banner",
    description: "Promuje analizę, ofertę lub darmową wycenę.",
    button: "Pokaż banner",
    action: "banner"
  }
];

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function LeadMechanismsDemo() {
  const [showLeadSidePopup, setShowLeadSidePopup] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!showLeadSidePopup && !showExitPopup) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowLeadSidePopup(false);
        setShowExitPopup(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLeadSidePopup, showExitPopup]);

  useEffect(() => {
    if (!showExitPopup) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showExitPopup]);

  function handleAction(action: string) {
    if (action === "chat") {
      setShowLeadSidePopup(false);
      window.dispatchEvent(new Event("open-chat-modal"));
      return;
    }

    if (action === "form") {
      scrollToContact();
      return;
    }

    if (action === "banner") {
      setShowBanner(true);
      return;
    }

    if (action === "lead-popup") {
      window.dispatchEvent(new Event("close-chat-modal"));
      setShowExitPopup(false);
      setShowLeadSidePopup(true);
      return;
    }

    if (action === "exit-popup") {
      setShowLeadSidePopup(false);
      setShowExitPopup(true);
    }
  }

  return (
    <section className="relative bg-[#0E2A24] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,138,108,0.22),transparent_32rem),radial-gradient(circle_at_84%_78%,rgba(201,168,106,0.14),transparent_34rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
            MODUŁOWY SYSTEM
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
            Jakie mechanizmy możemy wdrożyć na stronie?
          </h2>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Nie tylko chatbot. Dobieramy sposób przechwytywania leadów do strony,
            branży i celu klienta.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {mechanisms.map((item) => (
            <article
              key={item.title}
              className={`flex min-h-64 flex-col rounded-3xl border p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 ${
                item.recommended
                  ? "border-[#E8D7B9]/45 bg-[#F7F2E8] text-[#171717]"
                  : "border-white/10 bg-white/[0.055] text-white backdrop-blur"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-2xl ${
                  item.recommended
                    ? "bg-[#0F8A6C]/12 text-[#0F8A6C]"
                    : "bg-[#E8D7B9]/10 text-[#E8D7B9]"
                }`}
              >
                <span className="flex h-full w-full items-center justify-center text-sm font-bold">
                  {item.number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p
                className={`mt-3 flex-1 text-sm leading-6 ${
                  item.recommended ? "text-[#0E2A24]/72" : "text-[#D6D3D1]"
                }`}
              >
                {item.description}
              </p>
              <button
                type="button"
                onClick={() => handleAction(item.action)}
                className={`mt-5 inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-xs font-bold transition ${
                  item.recommended
                    ? "bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] text-[#171717] shadow-[0_10px_26px_rgba(15,138,108,0.18)] hover:scale-[1.02]"
                    : "border border-[#E8D7B9]/30 bg-white/[0.06] text-[#F7F2E8] hover:border-[#E8D7B9]/55 hover:bg-white/[0.1]"
                }`}
              >
                {item.button}
              </button>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-[#D6D3D1]">
          Każdy mechanizm można połączyć z Google Sheets, emailem, CRM lub inną automatyzacją.
        </p>

        {showBanner ? (
          <div className="mt-8 rounded-3xl border border-[#E8D7B9]/25 bg-[#F7F2E8] p-4 text-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[#0F8A6C]">Demo bannera CTA</p>
                <p className="mt-1 text-base font-semibold">
                  Chcesz sprawdzić, czy Twoja strona może zbierać więcej leadów?
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="min-h-10 rounded-full bg-[#0F8A6C] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#0E2A24]"
                >
                  Zamów darmowy audyt
                </button>
                <button
                  type="button"
                  onClick={() => setShowBanner(false)}
                  className="min-h-10 rounded-full border border-[#0E2A24]/15 px-4 py-2 text-sm font-bold text-[#0E2A24] transition hover:bg-white"
                  aria-label="Zamknij banner demo"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {showLeadSidePopup ? (
        <div
          className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col transition duration-300 sm:inset-x-auto sm:right-6 sm:top-24 sm:w-[420px]"
          role="dialog"
          aria-modal="false"
          aria-label="Demo popupu leadowego"
        >
          <div className="max-h-full overflow-y-auto rounded-3xl border border-[#E8D7B9]/35 bg-[#F7F2E8] p-5 text-[#171717] shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
                  Demo popupu
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Zbierz zapytanie bez opuszczania strony
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#0E2A24]/72">
                  Przykład mechanizmu, który może pojawić się po czasie, scrollu
                  lub kliknięciu CTA.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLeadSidePopup(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0E2A24]/10 bg-white text-sm font-bold"
                aria-label="Zamknij popup"
              >
                X
              </button>
            </div>
            <div className="mt-5 grid gap-3">
              {["Nazwa firmy / imię", "Strona / Instagram", "Email lub telefon"].map((placeholder) => (
                <input
                  key={placeholder}
                  placeholder={placeholder}
                  className="h-10 rounded-xl border border-[#E8D7B9]/80 bg-white px-3 text-sm text-[#171717] outline-none placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20"
                />
              ))}
              <textarea
                placeholder="Wiadomość"
                className="min-h-[76px] resize-none rounded-xl border border-[#E8D7B9]/80 bg-white px-3 py-2 text-sm text-[#171717] outline-none placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20"
              />
              <button
                type="button"
                className="min-h-10 rounded-xl bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-4 py-2 text-sm font-bold text-[#171717]"
              >
                Wyślij zgłoszenie
              </button>
              <p className="text-xs leading-5 text-[#0E2A24]/62">
                To wizualne demo. W realnym wdrożeniu popup może wysyłać dane
                do Google Sheets, CRM lub emaila.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {showExitPopup ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#171717]/72 px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Demo popupu przy wyjściu"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowExitPopup(false);
            }
          }}
        >
          <div className="w-full max-w-lg rounded-3xl border border-[#E8D7B9]/35 bg-[#171717] p-6 text-white shadow-2xl shadow-black/30">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowExitPopup(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-bold"
                aria-label="Zamknij popup przy wyjściu"
              >
                X
              </button>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E8D7B9]">
              Exit intent demo
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#F7F2E8]">
              Zanim wyjdziesz — sprawdź, ile zapytań może zbierać Twoja strona
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#D6D3D1]">
              Taki popup może ratować część ruchu, który normalnie znika bez kontaktu.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setShowExitPopup(false);
                  scrollToContact();
                }}
                className="min-h-11 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-2 text-sm font-bold text-[#171717]"
              >
                Zostaw kontakt
              </button>
              <button
                type="button"
                onClick={() => setShowExitPopup(false)}
                className="min-h-11 rounded-full border border-white/12 bg-white/[0.06] px-5 py-2 text-sm font-bold text-[#F7F2E8]"
              >
                Nie teraz
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
