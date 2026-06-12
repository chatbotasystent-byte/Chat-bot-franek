"use client";

import { useEffect, useMemo, useState } from "react";

type IndustryKey =
  | "services"
  | "beauty"
  | "workshop"
  | "dealer"
  | "clinic"
  | "restaurant"
  | "ecommerce";

type GoalKey =
  | "leadCapture"
  | "appointments"
  | "estimate"
  | "faq"
  | "sheets"
  | "email";

const industries: Array<{
  key: IndustryKey;
  label: string;
  message: string;
  aiReply: string;
  leadSummary: string;
}> = [
  {
    key: "services",
    label: "Firma usługowa",
    message: "Czy możecie wycenić usługę w moim mieście?",
    aiReply: "Jasne. Napisz proszę, jakiej usługi potrzebujesz, w jakim mieście i jaki termin byłby wygodny.",
    leadSummary: "Zapytanie o usługę i wycenę w konkretnym mieście."
  },
  {
    key: "beauty",
    label: "Salon beauty",
    message: "Czy macie wolny termin na paznokcie w piątek?",
    aiReply: "Mogę zebrać usługę, preferowany termin i kontakt, żeby recepcja mogła szybko potwierdzić wizytę.",
    leadSummary: "Rezerwacja usługi beauty z preferowanym terminem."
  },
  {
    key: "workshop",
    label: "Warsztat samochodowy",
    message: "Czy mogę umówić auto na diagnostykę?",
    aiReply: "Podaj markę auta, opis problemu i preferowany termin - przekażę zgłoszenie do warsztatu.",
    leadSummary: "Diagnostyka auta i prośba o termin wizyty."
  },
  {
    key: "dealer",
    label: "Komis samochodowy",
    message: "Szukam auta do 50 tys. zł. Możecie pomóc?",
    aiReply: "Jasne. Zbiorę budżet, typ auta, preferencje i kontakt, a sprzedawca wróci z propozycjami.",
    leadSummary: "Zakup auta z budżetem i preferencjami klienta."
  },
  {
    key: "clinic",
    label: "Klinika / gabinet",
    message: "Czy mogę umówić konsultację w tym tygodniu?",
    aiReply: "Mogę zebrać temat wizyty, preferowany termin oraz kontakt, żeby recepcja mogła potwierdzić konsultację.",
    leadSummary: "Konsultacja w gabinecie z preferowanym terminem."
  },
  {
    key: "restaurant",
    label: "Restauracja",
    message: "Czy można zarezerwować stolik na sobotę?",
    aiReply: "Jasne. Podaj godzinę, liczbę osób, imię i telefon, a obsługa potwierdzi rezerwację.",
    leadSummary: "Rezerwacja stolika z datą i liczbą osób."
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    message: "Czy ten produkt jest dostępny i kiedy będzie wysyłka?",
    aiReply: "Sprawdzę kontekst zapytania. Podaj produkt, email i ewentualnie numer zamówienia, a obsługa wróci z odpowiedzią.",
    leadSummary: "Pytanie o dostępność produktu i termin wysyłki."
  }
];

const goals: Array<{
  key: GoalKey;
  label: string;
  message: string;
  focus: string;
}> = [
  {
    key: "leadCapture",
    label: "Zbieranie leadów",
    message: "System zbiera dane kontaktowe i kwalifikuje zapytanie.",
    focus: "rekomendacja: chatbot + lead capture"
  },
  {
    key: "appointments",
    label: "Umawianie wizyt",
    message: "System podkreśla termin, usługę i dane kontaktowe.",
    focus: "rekomendacja: chatbot + scenariusz rezerwacji"
  },
  {
    key: "estimate",
    label: "Wstępna wycena",
    message: "System dopytuje o zakres, lokalizację i opis problemu.",
    focus: "rekomendacja: pytania kwalifikujące + arkusz"
  },
  {
    key: "faq",
    label: "Obsługa pytań",
    message: "System odpowiada na powtarzalne pytania i kieruje do kontaktu.",
    focus: "rekomendacja: chatbot FAQ + lead capture"
  },
  {
    key: "sheets",
    label: "Google Sheets",
    message: "System mocniej eksponuje automatyczny zapis danych do arkusza.",
    focus: "rekomendacja: Make + Google Sheets"
  },
  {
    key: "email",
    label: "Email notification",
    message: "System mocniej eksponuje natychmiastowe powiadomienie do firmy.",
    focus: "rekomendacja: email alert + status leada"
  }
];

const modules = [
  ["01", "Klient", "Zadaje pytanie na stronie"],
  ["02", "AI Chatbot", "Odpowiada i prowadzi rozmowę"],
  ["03", "Kwalifikacja", "Dopytuje o szczegóły"],
  ["04", "Lead Capture", "Zbiera dane kontaktowe"],
  ["05", "Google Sheets", "Zapisuje nowy wiersz"],
  ["06", "Email", "Wysyła powiadomienie"],
  ["07", "Status", "Nowy lead do obsługi"]
] as const;

const timeline = [
  "00:01 Klient wysłał pytanie",
  "00:02 AI odpowiedziało",
  "00:03 Zapytanie zakwalifikowane",
  "00:04 Dane kontaktowe zebrane",
  "00:05 Lead zapisany w Google Sheets",
  "00:06 Email wysłany do firmy",
  "00:07 Status ustawiony jako „Nowy”"
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

export function AutomationControlRoom() {
  const [industryKey, setIndustryKey] = useState<IndustryKey>("services");
  const [goalKey, setGoalKey] = useState<GoalKey>("leadCapture");
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const industry = useMemo(
    () => industries.find((item) => item.key === industryKey) ?? industries[0],
    [industryKey]
  );
  const goal = useMemo(
    () => goals.find((item) => item.key === goalKey) ?? goals[0],
    [goalKey]
  );

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (activeStep >= modules.length - 1) {
      setIsRunning(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveStep((current) => current + 1);
    }, 780);

    return () => window.clearTimeout(timeout);
  }, [activeStep, isRunning]);

  function startSimulation() {
    setActiveStep(0);
    setIsRunning(true);
  }

  function resetSimulation() {
    setActiveStep(-1);
    setIsRunning(false);
  }

  const isComplete = activeStep === modules.length - 1 && !isRunning;
  const leadMessage = goalKey === "appointments"
    ? "Termin, usługa i dane do potwierdzenia wizyty."
    : goalKey === "estimate"
      ? "Zakres, lokalizacja i opis potrzebny do wstępnej wyceny."
      : industry.leadSummary;

  return (
    <section id="demo" className="relative px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(15,138,108,0.24),transparent_34rem),radial-gradient(circle_at_82%_24%,rgba(201,168,106,0.16),transparent_36rem),linear-gradient(180deg,#171717_0%,#0E2A24_52%,#171717_100%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8D7B9]">
            CONTROL ROOM
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[#F7F2E8] sm:text-4xl">
            Zobacz automatyzację AI w akcji
          </h2>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Wybierz branżę i cel, a system pokaże, jak zapytanie klienta przechodzi
            od rozmowy z AI do Google Sheets i powiadomienia email.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#E8D7B9]/16 bg-white/[0.045] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6 lg:p-7">
          <div className="grid gap-6 xl:grid-cols-[0.78fr_1.18fr_0.9fr]">
            <aside className="rounded-3xl border border-white/10 bg-[#171717]/55 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E8D7B9]">
                Konfiguracja
              </p>
              <div className="mt-5">
                <p className="text-sm font-bold text-[#F7F2E8]">Branża</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {industries.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={industryKey === item.key}
                      onClick={() => setIndustryKey(item.key)}
                      className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                        industryKey === item.key
                          ? "border-[#E8D7B9]/55 bg-[#E8D7B9] text-[#171717]"
                          : "border-white/10 bg-white/[0.05] text-[#D6D3D1] hover:border-[#E8D7B9]/35"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-bold text-[#F7F2E8]">Cel automatyzacji</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {goals.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-pressed={goalKey === item.key}
                      onClick={() => setGoalKey(item.key)}
                      className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                        goalKey === item.key
                          ? "border-[#0F8A6C]/55 bg-[#0F8A6C] text-white shadow-[0_10px_24px_rgba(15,138,108,0.25)]"
                          : "border-white/10 bg-white/[0.05] text-[#D6D3D1] hover:border-[#0F8A6C]/45"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={startSimulation}
                  disabled={isRunning}
                  className="min-h-12 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-bold text-[#171717] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isRunning ? "Symulacja trwa..." : "Uruchom symulację"}
                </button>
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="min-h-11 rounded-full border border-[#E8D7B9]/22 bg-white/[0.045] px-5 py-2 text-sm font-bold text-[#F7F2E8] transition hover:border-[#E8D7B9]/45 hover:bg-white/[0.08]"
                >
                  Reset
                </button>
              </div>
            </aside>

            <div className="rounded-3xl border border-white/10 bg-[#0E2A24]/64 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E8D7B9]">
                  Automatyzacja
                </p>
                <span className="rounded-full border border-[#0F8A6C]/30 bg-[#0F8A6C]/12 px-3 py-1 text-xs font-bold text-[#A7F3D0]">
                  {activeStep < 0 ? "ready" : isComplete ? "complete" : "live"}
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {modules.map(([number, title, description], index) => {
                  const isDone = index < activeStep || isComplete;
                  const isActive = index === activeStep;
                  const isVisible = index <= activeStep;

                  return (
                    <div key={title} className="relative">
                      <article
                        className={`min-h-32 rounded-2xl border p-4 transition duration-300 ${
                          isActive
                            ? "scale-[1.01] border-[#E8D7B9]/65 bg-[#F7F2E8] text-[#171717] shadow-[0_0_42px_rgba(15,138,108,0.28)]"
                            : isVisible
                              ? "border-[#0F8A6C]/35 bg-[#0F8A6C]/12 text-[#F7F2E8]"
                              : "border-white/10 bg-[#171717]/42 text-[#D6D3D1]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                              isActive
                                ? "bg-[#0F8A6C] text-white"
                                : "bg-[#E8D7B9]/10 text-[#E8D7B9]"
                            }`}
                          >
                            {isDone ? "✓" : number}
                          </span>
                          {isActive ? (
                            <span className="h-2.5 w-2.5 rounded-full bg-[#0F8A6C] shadow-[0_0_20px_rgba(15,138,108,0.9)] animate-pulse" />
                          ) : null}
                        </div>
                        <h3 className="mt-4 text-sm font-bold">{title}</h3>
                        <p className={`mt-2 text-xs leading-5 ${isActive ? "text-[#0E2A24]/75" : "text-current opacity-75"}`}>
                          {description}
                        </p>
                      </article>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#171717]/45 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#E8D7B9]">
                    Data packet
                  </span>
                  <span className="text-xs font-semibold text-[#D6D3D1]">
                    lead data
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0F8A6C] via-[#E8D7B9] to-[#C9A86A] transition-all duration-500"
                    style={{ width: `${activeStep < 0 ? 0 : ((activeStep + 1) / modules.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-[#E8D7B9]/18 bg-[#F7F2E8] p-4 text-[#171717] shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-5">
              <LivePreview
                activeStep={activeStep}
                industryLabel={industry.label}
                message={industry.message}
                aiReply={industry.aiReply}
                leadMessage={leadMessage}
                goalMessage={goal.message}
                goalFocus={goal.focus}
              />
            </aside>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-[#171717]/45 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E8D7B9]">
              Timeline zdarzeń
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-7">
              {timeline.map((event, index) => {
                const isDone = index <= activeStep;
                const isActive = index === activeStep;

                return (
                  <div
                    key={event}
                    className={`rounded-2xl border px-3 py-3 text-xs leading-5 transition ${
                      isActive
                        ? "border-[#E8D7B9]/65 bg-[#E8D7B9]/12 text-[#F7F2E8]"
                        : isDone
                          ? "border-[#0F8A6C]/35 bg-[#0F8A6C]/10 text-[#A7F3D0]"
                          : "border-white/10 bg-white/[0.035] text-[#D6D3D1]/55"
                    }`}
                  >
                    {event}
                  </div>
                );
              })}
            </div>
          </div>

          {isComplete ? (
            <div className="mt-6 rounded-3xl border border-[#E8D7B9]/28 bg-[#F7F2E8] p-5 text-[#171717] shadow-[0_24px_70px_rgba(201,168,106,0.12)] sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-lg font-semibold">Chcesz taki system na swojej stronie?</p>
                <p className="mt-2 text-sm leading-6 text-[#0E2A24]/70">
                  Gotowe - lead został zapisany i firma dostała powiadomienie.
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="min-h-11 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-2 text-sm font-bold text-[#171717] transition hover:scale-[1.01]"
                >
                  Zamów darmowy audyt
                </button>
                <button
                  type="button"
                  onClick={openChatModal}
                  className="min-h-11 rounded-full border border-[#0F8A6C]/25 bg-white px-5 py-2 text-sm font-bold text-[#0F8A6C] transition hover:border-[#0F8A6C]/45 hover:bg-[#0F8A6C]/10"
                >
                  Otwórz chatbota
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LivePreview({
  activeStep,
  industryLabel,
  message,
  aiReply,
  leadMessage,
  goalMessage,
  goalFocus
}: {
  activeStep: number;
  industryLabel: string;
  message: string;
  aiReply: string;
  leadMessage: string;
  goalMessage: string;
  goalFocus: string;
}) {
  if (activeStep < 0) {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
          Live preview
        </p>
        <h3 className="mt-3 text-2xl font-semibold">Gotowy do symulacji</h3>
        <p className="mt-4 text-sm leading-6 text-[#0E2A24]/72">
          Wybierz branżę i cel, a potem uruchom symulację. Podgląd pokaże dane,
          które przechodzą przez system.
        </p>
        <p className="mt-4 rounded-2xl border border-[#E8D7B9]/70 bg-white px-4 py-3 text-sm font-semibold text-[#0F8A6C]">
          {goalFocus}
        </p>
      </div>
    );
  }

  if (activeStep === 0) {
    return <PreviewText title="Wiadomość klienta" value={message} meta={industryLabel} />;
  }

  if (activeStep === 1) {
    return <PreviewText title="Odpowiedź AI" value={aiReply} meta={goalMessage} />;
  }

  if (activeStep === 2) {
    return (
      <PreviewText
        title="Dopytanie AI"
        value="System dopytuje o szczegóły potrzebne do obsługi zapytania."
        meta={goalFocus}
      />
    );
  }

  if (activeStep === 3) {
    return (
      <div>
        <PreviewHeader title="Zebrane dane" />
        <div className="mt-4 grid gap-2">
          {[
            ["Imię", "Jan Kowalski"],
            ["Email", "jan@firma.pl"],
            ["Telefon", "500 000 000"],
            ["Branża", industryLabel],
            ["Wiadomość", leadMessage]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#E8D7B9]/70 bg-white px-3 py-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0F8A6C]">{label}</p>
              <p className="mt-1 text-sm font-semibold text-[#171717]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeStep === 4) {
    return (
      <div>
        <PreviewHeader title="Nowy wiersz w arkuszu" />
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#E8D7B9]/70 bg-white">
          <div className="grid grid-cols-4 bg-[#0F8A6C]/10 px-3 py-2 text-xs font-bold text-[#0E2A24]">
            <span>Data</span>
            <span>Imię</span>
            <span>Branża</span>
            <span>Status</span>
          </div>
          <div className="grid grid-cols-4 items-center px-3 py-3 text-xs font-semibold text-[#171717]">
            <span>Dzisiaj</span>
            <span>Jan</span>
            <span className="truncate">{industryLabel}</span>
            <span className="rounded-full bg-[#0F8A6C]/10 px-2 py-1 text-center text-[#0F8A6C]">Nowy</span>
          </div>
        </div>
      </div>
    );
  }

  if (activeStep === 5) {
    return (
      <div>
        <PreviewHeader title="Email do firmy" />
        <div className="mt-4 rounded-2xl border border-[#E8D7B9]/70 bg-white p-4">
          <p className="text-sm font-bold text-[#171717]">Nowy lead z AI Automatyzacja</p>
          <p className="mt-3 text-sm leading-6 text-[#0E2A24]/72">
            Klient zostawił kontakt i wiadomość.
          </p>
          <p className="mt-3 rounded-xl bg-[#F7F2E8] px-3 py-2 text-xs font-bold text-[#0F8A6C]">
            Źródło: chatbot / formularz
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PreviewHeader title="Lead gotowy do kontaktu" />
      <div className="mt-4 grid gap-2">
        {["Nowy lead", "Źródło: chatbot", "Reakcja: natychmiast"].map((item) => (
          <span key={item} className="rounded-2xl border border-[#0F8A6C]/18 bg-[#0F8A6C]/10 px-4 py-3 text-sm font-bold text-[#0F8A6C]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function PreviewHeader({ title }: { title: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F8A6C]">
        Live preview
      </p>
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
    </div>
  );
}

function PreviewText({ title, value, meta }: { title: string; value: string; meta: string }) {
  return (
    <div>
      <PreviewHeader title={title} />
      <p className="mt-4 rounded-2xl border border-[#E8D7B9]/70 bg-white px-4 py-4 text-sm leading-6 text-[#0E2A24]/78">
        {value}
      </p>
      <p className="mt-3 rounded-2xl bg-[#0F8A6C]/10 px-4 py-3 text-xs font-bold text-[#0F8A6C]">
        {meta}
      </p>
    </div>
  );
}
