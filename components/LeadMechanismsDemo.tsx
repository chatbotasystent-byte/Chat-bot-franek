"use client";

import { useEffect, useState } from "react";

type MechanismKey = "chat" | "form" | "lead-popup" | "exit-popup" | "banner";

const mechanisms: Array<{
  key: MechanismKey;
  number: string;
  title: string;
  description: string;
  collects: string;
  bestFor: string;
  button: string;
}> = [
  {
    key: "chat",
    number: "01",
    title: "Chatbot AI",
    description: "Prowadzi rozmowę i zbiera dane kontaktowe.",
    collects: "imię, email, telefon, wiadomość, branżę",
    bestFor: "firm usługowych, warsztatów, beauty, B2B",
    button: "Otwórz chat"
  },
  {
    key: "form",
    number: "02",
    title: "Formularz",
    description: "Klasyczne zgłoszenie dla osób gotowych do kontaktu.",
    collects: "imię, email, strona/Instagram, wiadomość",
    bestFor: "każdej strony firmowej",
    button: "Przejdź do formularza"
  },
  {
    key: "lead-popup",
    number: "03",
    title: "Popup leadowy",
    description: "Zachęca do zostawienia kontaktu w odpowiednim momencie.",
    collects: "imię, email, potrzeba klienta",
    bestFor: "landing page, usług, ofert specjalnych",
    button: "Pokaż popup"
  },
  {
    key: "exit-popup",
    number: "04",
    title: "Popup przy wyjściu",
    description: "Ratuje część użytkowników, którzy chcą opuścić stronę.",
    collects: "email, krótka wiadomość",
    bestFor: "stron z ruchem, kampanii, reklam",
    button: "Pokaż exit popup"
  },
  {
    key: "banner",
    number: "05",
    title: "Banner CTA",
    description: "Delikatnie prowadzi użytkownika do kontaktu bez zasłaniania strony.",
    collects: "kliknięcie do formularza albo chatu",
    bestFor: "stron z dłuższą treścią",
    button: "Pokaż banner"
  }
];

function scrollToContact() {
  document.querySelector("#kontakt")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

export function LeadMechanismsDemo() {
  const [activeKey, setActiveKey] = useState<MechanismKey>("chat");
  const [showLeadSidePopup, setShowLeadSidePopup] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const activeMechanism = mechanisms.find((item) => item.key === activeKey) ?? mechanisms[0];

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

  function handleAction(action: MechanismKey) {
    setActiveKey(action);

    if (action === "chat") {
      setShowLeadSidePopup(false);
      setShowExitPopup(false);
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

    setShowLeadSidePopup(false);
    setShowExitPopup(true);
  }

  return (
    <section className="relative overflow-hidden bg-[#0E2A24] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0E2A24_0%,#171717_100%)]" />
      <div className="tech-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
              Mechanizmy
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#F4FFF9] sm:text-5xl">
              Wybierz, jak strona ma zbierać zapytania
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-[#D6D3D1] lg:justify-self-end">
            Chatbot, popup, formularz i banner mogą działać razem jako jeden
            system pozyskiwania leadów.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-3">
            {mechanisms.map((item) => {
              const isActive = activeKey === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveKey(item.key)}
                  className={`group flex min-h-24 items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                    isActive
                      ? "border-[#86EFAC]/60 bg-[#0B1F18] text-[#F4FFF9] shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
                      : "border-white/10 bg-[#0B1F18]/[0.055] text-[#F4FFF9] backdrop-blur hover:border-[#86EFAC]/35 hover:bg-[#0B1F18]/[0.085]"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                      isActive
                        ? "bg-[#0F8A6C] text-white"
                        : "bg-[#86EFAC]/10 text-[#86EFAC] group-hover:bg-[#86EFAC]/15"
                    }`}
                  >
                    {item.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-black">{item.title}</span>
                    <span className={`mt-1 block text-sm leading-5 ${isActive ? "text-[#B7CFC3]" : "text-[#D6D3D1]"}`}>
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="glass-card gradient-border overflow-hidden rounded-[2rem] p-4 sm:p-5 lg:p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
              <MechanismPreview activeKey={activeKey} />

              <aside className="rounded-3xl border border-[#86EFAC]/14 bg-[#030705]/58 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86EFAC]">
                  Aktywny mechanizm
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#F4FFF9]">
                  {activeMechanism.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#D6D3D1]">
                  {activeMechanism.description}
                </p>

                <div className="mt-6 grid gap-3">
                  <InfoBlock label="Zbiera" value={activeMechanism.collects} />
                  <InfoBlock label="Najlepszy dla" value={activeMechanism.bestFor} />
                  <InfoBlock label="Lead trafia do" value="Google Sheets / email / CRM" />
                </div>

                <button
                  type="button"
                  onClick={() => handleAction(activeMechanism.key)}
                  className="cta-primary cta-shine mt-6 w-full rounded-full px-5 py-3 text-sm"
                >
                  {activeMechanism.button}
                </button>
              </aside>
            </div>

            {showBanner ? (
              <div className="mt-5 rounded-3xl border border-[#86EFAC]/28 bg-[#0B1F18] p-4 text-[#F4FFF9] shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#0F8A6C]">Demo bannera CTA</p>
                    <p className="mt-1 text-base font-semibold">
                      Sprawdź, czy Twoja strona może zbierać więcej leadów.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="min-h-10 rounded-full bg-[#0F8A6C] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#0E2A24]"
                    >
                      Zamów audyt
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBanner(false)}
                      className="min-h-10 rounded-full border border-[#34D399]/20 px-4 py-2 text-sm font-bold text-[#F4FFF9] transition hover:bg-[#0F8A6C]/18"
                      aria-label="Zamknij banner demo"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showLeadSidePopup ? (
        <div
          className="fixed inset-x-3 bottom-3 top-3 z-50 flex max-h-[calc(100dvh-1.5rem)] flex-col transition duration-300 sm:inset-x-auto sm:right-6 sm:top-24 sm:max-h-[calc(100dvh-7.5rem)] sm:w-[420px]"
          role="dialog"
          aria-modal="false"
          aria-label="Demo popupu leadowego"
        >
          <div className="max-h-full overflow-y-auto rounded-3xl border border-[#86EFAC]/35 bg-[#0B1F18] p-5 text-[#F4FFF9] shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
                  Demo popupu
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Zbierz zapytanie bez opuszczania strony
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#B7CFC3]">
                  Przykład mechanizmu, który może pojawić się po czasie, scrollu
                  lub kliknięciu CTA.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLeadSidePopup(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#34D399]/10 bg-[#0B1F18] text-sm font-bold"
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
                  className="min-h-11 rounded-xl border border-[#86EFAC]/80 bg-[#0B1F18] px-3 text-base text-[#F4FFF9] outline-none placeholder:text-[#9BB7AA] focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20 sm:text-sm"
                />
              ))}
              <textarea
                placeholder="Wiadomość"
                className="min-h-[88px] resize-none rounded-xl border border-[#86EFAC]/80 bg-[#0B1F18] px-3 py-2 text-base text-[#F4FFF9] outline-none placeholder:text-[#9BB7AA] focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20 sm:min-h-[76px] sm:text-sm"
              />
              <button
                type="button"
                className="cta-primary cta-shine min-h-10 rounded-xl px-4 py-2 text-sm"
              >
                Wyślij zgłoszenie
              </button>
              <p className="text-xs leading-5 text-[#B7CFC3]">
                To wizualne demo. W realnym wdrożeniu popup może wysyłać dane
                do Google Sheets, CRM lub emaila.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {showExitPopup ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#030705]/72 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Demo popupu przy wyjściu"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowExitPopup(false);
            }
          }}
        >
          <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#86EFAC]/35 bg-[#030705] p-5 text-white shadow-2xl shadow-black/30 sm:p-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowExitPopup(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#0B1F18]/[0.06] text-sm font-bold"
                aria-label="Zamknij popup przy wyjściu"
              >
                X
              </button>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#86EFAC]">
              Exit intent demo
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#F4FFF9]">
              Zanim wyjdziesz, sprawdź ile zapytań może zbierać Twoja strona
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
                className="cta-primary cta-shine min-h-11 rounded-full px-5 py-2 text-sm"
              >
                Zostaw kontakt
              </button>
              <button
                type="button"
                onClick={() => setShowExitPopup(false)}
                className="cta-secondary min-h-11 rounded-full px-5 py-2 text-sm"
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

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#86EFAC]/12 bg-[#0B1F18]/[0.045] p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#86EFAC]">
        {label}
      </p>
      <p className="mt-1 text-sm leading-5 text-[#D6D3D1]">{value}</p>
    </div>
  );
}

function MechanismPreview({ activeKey }: { activeKey: MechanismKey }) {
  if (activeKey === "form") {
    return (
      <div className="rounded-3xl border border-[#86EFAC]/14 bg-[#0B1F18] p-5 text-[#F4FFF9]">
        <PreviewHeader title="Formularz kontaktowy" status="ready" />
        <div className="mt-5 grid gap-3">
          {["Imię i nazwisko", "Email", "Strona lub Instagram"].map((item) => (
            <div key={item} className="h-11 rounded-xl bg-[#0B1F18] px-4 py-3 text-sm font-semibold text-[#B7CFC3] shadow-sm">
              {item}
            </div>
          ))}
          <div className="min-h-20 rounded-xl bg-[#0B1F18] px-4 py-3 text-sm font-semibold text-[#B7CFC3] shadow-sm">
            Wiadomość
          </div>
        </div>
      </div>
    );
  }

  if (activeKey === "lead-popup" || activeKey === "exit-popup") {
    return (
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-[#86EFAC]/14 bg-[#030705] p-5">
        <PreviewHeader title={activeKey === "lead-popup" ? "Popup leadowy" : "Popup przy wyjściu"} status="triggered" />
        <div className="mt-6 rounded-3xl border border-[#86EFAC]/24 bg-[#0B1F18] p-5 text-[#F4FFF9] shadow-[0_28px_70px_rgba(0,0,0,0.24)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
            {activeKey === "lead-popup" ? "po 8 sekundach" : "exit intent"}
          </p>
          <h4 className="mt-3 text-2xl font-bold tracking-[-0.03em]">
            Zostaw kontakt, przygotujemy szybki przykład automatyzacji
          </h4>
          <div className="mt-5 grid gap-2">
            <span className="h-10 rounded-xl bg-[#0B1F18]" />
            <span className="h-10 rounded-xl bg-[#0B1F18]" />
            <span className="h-10 rounded-xl bg-[#0F8A6C]" />
          </div>
        </div>
      </div>
    );
  }

  if (activeKey === "banner") {
    return (
      <div className="rounded-3xl border border-[#86EFAC]/14 bg-[#030705] p-5">
        <PreviewHeader title="Banner CTA" status="visible" />
        <div className="mt-20 rounded-3xl border border-[#86EFAC]/28 bg-[#0B1F18] p-5 text-[#F4FFF9] shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
          <p className="text-sm font-bold text-[#0F8A6C]">Darmowy audyt AI</p>
          <p className="mt-2 text-xl font-bold tracking-[-0.03em]">
            Sprawdź, ile leadów może zbierać Twoja strona.
          </p>
          <span className="mt-4 inline-flex rounded-full bg-[#0F8A6C] px-4 py-2 text-xs font-bold text-white">
            Zamów audyt
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#86EFAC]/14 bg-[#030705] p-5">
      <PreviewHeader title="Chatbot AI" status="online" />
      <div className="mt-5 grid gap-3">
        <div className="w-4/5 rounded-2xl border border-[#86EFAC]/14 bg-[#0B1F18]/[0.06] px-4 py-3 text-sm text-[#D6D3D1]">
          Dzień dobry, w czym mogę pomóc?
        </div>
        <div className="ml-auto w-4/5 rounded-2xl bg-[#0B1F18] px-4 py-3 text-sm font-semibold text-[#F4FFF9]">
          Chcę wycenę usługi.
        </div>
        <div className="w-[88%] rounded-2xl border border-[#0F8A6C]/28 bg-[#0F8A6C]/12 px-4 py-3 text-sm text-[#A7F3D0]">
          Jasne. Zbiorę kontakt i przekażę zgłoszenie do firmy.
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-[#86EFAC]/12 bg-[#0E2A24]/70 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#86EFAC]">
          Lead packet
        </p>
        <div className="mt-3 grid gap-2 text-xs font-semibold text-[#D6D3D1]">
          <span>imię: Anna</span>
          <span>branża: beauty</span>
          <span>status: Nowy</span>
        </div>
      </div>
    </div>
  );
}

function PreviewHeader({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#F4FFF9]">
        {title}
      </h3>
      <span className="flex items-center gap-2 rounded-full border border-[#0F8A6C]/28 bg-[#0F8A6C]/12 px-3 py-1 text-xs font-bold text-[#A7F3D0]">
        <span className="h-2 w-2 rounded-full bg-[#0F8A6C] shadow-[0_0_14px_rgba(15,138,108,0.85)] animate-pulse" />
        {status}
      </span>
    </div>
  );
}

