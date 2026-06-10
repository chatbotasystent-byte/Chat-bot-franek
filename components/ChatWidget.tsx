"use client";

import { FormEvent, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatWidgetProps = {
  suggestions?: string[];
};

type IndustryKey =
  | "automotiveWorkshop"
  | "carDealer"
  | "beauty"
  | "services"
  | "ecommerce"
  | "clinic"
  | "restaurant"
  | "realEstate"
  | "education";

type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  industry: string;
  message: string;
};

type FormState = "idle" | "loading" | "error";

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Cześć! Pomagam firmom sprawdzić, jak mogą wykorzystać AI do obsługi klientów, zbierania leadów i automatyzacji pracy. Napisz, czym zajmuje się Twoja firma, a podpowiem, jaki chatbot lub automatyzacja może mieć sens."
  }
];

const emptyLeadForm: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  website: "",
  companyName: "",
  industry: "",
  message: ""
};

const neutralQuestionSuggestions = [
  "Jak bot zbiera leady?",
  "Czy dane trafią do Google Sheets?",
  "Jak wygląda darmowy audyt?"
];

const industryQuestionSuggestions: Record<IndustryKey, string[]> = {
  automotiveWorkshop: [
    "Czy bot zbierze markę i model auta?",
    "Czy może zapisać preferowany termin?",
    "Czy lead trafi do Google Sheets?"
  ],
  carDealer: [
    "Czy bot zbierze budżet klienta?",
    "Czy może kwalifikować kupujących?",
    "Czy sprzedawca dostanie lead na email?"
  ],
  beauty: [
    "Czy bot może umawiać wizyty?",
    "Czy zbierze usługę i preferowany termin?",
    "Czy zapytanie trafi do recepcji?"
  ],
  services: [
    "Czy bot zbierze miasto i typ usługi?",
    "Czy może pomóc we wstępnej wycenie?",
    "Czy kontakt trafi do arkusza?"
  ],
  ecommerce: [
    "Czy bot odpowie na pytania o produkty?",
    "Czy może zbierać zapytania klientów?",
    "Czy przekaże dane do obsługi?"
  ],
  clinic: [
    "Czy bot zbierze temat wizyty?",
    "Czy może przekazać kontakt do recepcji?",
    "Czy dane trafią do arkusza?"
  ],
  restaurant: [
    "Czy bot może przyjmować rezerwacje?",
    "Czy zbierze datę i liczbę osób?",
    "Czy rezerwacja trafi do arkusza?"
  ],
  realEstate: [
    "Czy bot zbierze budżet klienta?",
    "Czy może kwalifikować kupujących?",
    "Czy lead trafi do agenta?"
  ],
  education: [
    "Czy bot zbierze poziom kursanta?",
    "Czy może dobrać kurs lub termin?",
    "Czy kontakt trafi do sekretariatu?"
  ]
};

const leadInputClass =
  "mt-1.5 min-h-10 w-full rounded-xl border border-[#E8D7B9]/70 bg-white px-3 py-2 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20";

function isContactIntent(text: string) {
  const normalizedText = text.toLowerCase();

  return (
    normalizedText.includes("chcę zostawić kontakt") ||
    normalizedText.includes("chce zostawic kontakt") ||
    normalizedText.includes("zostawiam kontakt") ||
    normalizedText.includes("proszę o kontakt") ||
    normalizedText.includes("prosze o kontakt") ||
    normalizedText.includes("jak się z wami skontaktować") ||
    normalizedText.includes("jak sie z wami skontaktowac") ||
    normalizedText.includes("chcę darmowy audyt") ||
    normalizedText.includes("chce darmowy audyt")
  );
}

function detectIndustry(text: string): IndustryKey | null {
  const normalizedText = text.toLowerCase();

  if (
    normalizedText.includes("warsztat") ||
    normalizedText.includes("mechanik") ||
    normalizedText.includes("auto serwis") ||
    normalizedText.includes("autoserwis")
  ) {
    return "automotiveWorkshop";
  }

  if (
    normalizedText.includes("komis") ||
    normalizedText.includes("sprzedaż aut") ||
    normalizedText.includes("sprzedaz aut") ||
    normalizedText.includes("samochody używane") ||
    normalizedText.includes("samochody uzywane")
  ) {
    return "carDealer";
  }

  if (
    normalizedText.includes("salon beauty") ||
    normalizedText.includes("beauty") ||
    normalizedText.includes("kosmetycz") ||
    normalizedText.includes("paznokcie") ||
    normalizedText.includes("fryzjer") ||
    normalizedText.includes("barber") ||
    normalizedText.includes("salon")
  ) {
    return "beauty";
  }

  if (normalizedText.includes("usług") || normalizedText.includes("uslug")) {
    return "services";
  }

  if (
    normalizedText.includes("sklep") ||
    normalizedText.includes("e-commerce") ||
    normalizedText.includes("ecommerce") ||
    normalizedText.includes("produkty")
  ) {
    return "ecommerce";
  }

  if (
    normalizedText.includes("gabinet") ||
    normalizedText.includes("klinika") ||
    normalizedText.includes("stomatolog") ||
    normalizedText.includes("lekarz")
  ) {
    return "clinic";
  }

  if (
    normalizedText.includes("restaurac") ||
    normalizedText.includes("rezerwacje") ||
    normalizedText.includes("stolik") ||
    normalizedText.includes("gastronomia")
  ) {
    return "restaurant";
  }

  if (
    normalizedText.includes("nieruchomości") ||
    normalizedText.includes("nieruchomosci") ||
    normalizedText.includes("mieszkania") ||
    normalizedText.includes("deweloper") ||
    normalizedText.includes("agent")
  ) {
    return "realEstate";
  }

  if (
    normalizedText.includes("kursy") ||
    normalizedText.includes("szkoła") ||
    normalizedText.includes("szkola") ||
    normalizedText.includes("szkolenia") ||
    normalizedText.includes("edukacja")
  ) {
    return "education";
  }

  return null;
}

export function ChatWidget({ suggestions = [] }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>(emptyLeadForm);
  const [leadFormState, setLeadFormState] = useState<FormState>("idle");
  const [leadFormMessage, setLeadFormMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const userMessages = messages.filter((message) => message.role === "user");
  const lastUserMessage = userMessages.at(-1)?.content ?? "";
  const detectedIndustry = detectIndustry(lastUserMessage);
  const dynamicSuggestionPool = detectedIndustry
    ? industryQuestionSuggestions[detectedIndustry]
    : neutralQuestionSuggestions;
  const usedMessages = new Set(messages.map((message) => message.content));
  const visibleDynamicSuggestions = dynamicSuggestionPool
    .filter((suggestion) => !usedMessages.has(suggestion))
    .slice(0, 3);
  const shouldShowStartSuggestions =
    !isLeadFormVisible && userMessages.length === 0 && suggestions.length > 0;
  const shouldShowDynamicSuggestions =
    !isLeadFormVisible && userMessages.length > 0 && !isLoading && visibleDynamicSuggestions.length > 0;
  const inputPlaceholder = isLeadFormVisible
    ? "Możesz wypełnić formularz albo kontynuować rozmowę..."
    : leadSubmitted || userMessages.length > 0
      ? "Napisz wiadomość..."
      : "Napisz, czym zajmuje się Twoja firma...";

  function showLeadForm(nextMessages: Message[]) {
    setIsLeadFormVisible(true);
    setLeadFormState("idle");
    setLeadFormMessage("");
    setMessages([
      ...nextMessages,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Jasne — możesz zostawić dane w krótkim formularzu poniżej. Jeśli wolisz, możesz też kontynuować rozmowę bez formularza."
      }
    ]);
  }

  function handleLeadFormChange(field: keyof LeadFormData, value: string) {
    setLeadForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function continueWithoutForm() {
    setIsLeadFormVisible(false);
    setLeadFormState("idle");
    setLeadFormMessage("");
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Jasne, możemy kontynuować rozmowę. Napisz, co chcesz sprawdzić w automatyzacji AI."
      }
    ]);
    inputRef.current?.focus();
  }

  async function handleLeadFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (leadFormState === "loading" || leadSubmitted) {
      return;
    }

    const payload = {
      name: leadForm.name.trim(),
      email: leadForm.email.trim(),
      phone: leadForm.phone.trim(),
      website: leadForm.website.trim(),
      companyName: leadForm.companyName.trim(),
      industry: leadForm.industry.trim(),
      message: leadForm.message.trim(),
      source: "chatbot-form"
    };

    if (!payload.name) {
      setLeadFormState("error");
      setLeadFormMessage("Podaj imię i nazwisko.");
      return;
    }

    if (!payload.email) {
      setLeadFormState("error");
      setLeadFormMessage("Podaj adres email.");
      return;
    }

    if (!payload.website) {
      setLeadFormState("error");
      setLeadFormMessage("Podaj stronę firmy lub Instagram.");
      return;
    }

    if (!payload.message) {
      setLeadFormState("error");
      setLeadFormMessage("Napisz krótko, czego dotyczy zgłoszenie.");
      return;
    }

    setLeadFormState("loading");
    setLeadFormMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      setIsLeadFormVisible(false);
      setLeadSubmitted(true);
      setLeadForm(emptyLeadForm);
      setLeadFormState("idle");
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Dziękuję! Zapisałem kontakt i przekazałem go do automatyzacji. Odezwiemy się z propozycją wdrożenia AI."
        }
      ]);
    } catch {
      setLeadFormState("error");
      setLeadFormMessage("Nie udało się zapisać kontaktu. Spróbuj ponownie albo użyj formularza na stronie.");
    }
  }

  async function sendMessage(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedText
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");

    if (isContactIntent(trimmedText)) {
      showLeadForm(nextMessages);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmedText,
          history: messages.map(({ role, content }) => ({ role, content }))
        })
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Nie udało się pobrać odpowiedzi.");
      }

      setMessages([
        ...nextMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply ?? "Przepraszam, nie mam teraz odpowiedzi."
        }
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Wystąpił błąd. Spróbuj ponownie za chwilę."
        }
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input);
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-[#E8D7B9]/80 bg-white shadow-[0_24px_80px_rgba(14,42,36,0.18)] ring-1 ring-[#E8D7B9]/60">
      <div className="flex items-start justify-between gap-4 border-b border-[#E8D7B9]/60 bg-gradient-to-r from-white to-[#F7F2E8] px-5 py-4 sm:px-6">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-[#0F8A6C]/10 px-3 py-1 text-xs font-semibold text-[#0F8A6C] ring-1 ring-[#0F8A6C]/15">
            Demo AI konsultanta
          </p>
          <h2 className="text-xl font-semibold text-[#171717]">
            Chat AI Automatyzacja
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Demo konsultanta AI dla różnych branż
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#171717] text-white shadow-[0_12px_30px_rgba(14,42,36,0.18)]">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7 9h10a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H9l-4 3v-3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h2ZM12 9V5M9 13h.01M15 13h.01"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="h-[430px] space-y-4 overflow-y-auto bg-gradient-to-b from-[#F7F2E8] via-white to-[#F7F2E8]/70 px-4 py-5 sm:px-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                message.role === "user"
                  ? "bg-[#171717] text-white shadow-[0_10px_28px_rgba(14,42,36,0.18)]"
                  : "border border-slate-200 bg-white text-[#171717]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLeadFormVisible ? (
          <div className="flex justify-start">
            <form
              onSubmit={handleLeadFormSubmit}
              noValidate
              className="w-full max-w-[92%] rounded-2xl border border-[#E8D7B9]/80 bg-[#FFF7ED] p-4 text-[#171717] shadow-[0_18px_45px_rgba(14,42,36,0.12)] sm:max-w-[84%]"
            >
              <div className="grid gap-3">
                <label className="text-xs font-semibold text-[#171717]">
                  Imię i nazwisko *
                  <input
                    value={leadForm.name}
                    onChange={(event) => handleLeadFormChange("name", event.target.value)}
                    className={leadInputClass}
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Email *
                  <input
                    value={leadForm.email}
                    onChange={(event) => handleLeadFormChange("email", event.target.value)}
                    className={leadInputClass}
                    type="email"
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Telefon (opcjonalnie)
                  <input
                    value={leadForm.phone}
                    onChange={(event) => handleLeadFormChange("phone", event.target.value)}
                    className={leadInputClass}
                    type="tel"
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Nazwa firmy (opcjonalnie)
                  <input
                    value={leadForm.companyName}
                    onChange={(event) => handleLeadFormChange("companyName", event.target.value)}
                    className={leadInputClass}
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Strona firmy lub Instagram *
                  <input
                    value={leadForm.website}
                    onChange={(event) => handleLeadFormChange("website", event.target.value)}
                    className={leadInputClass}
                    type="text"
                    placeholder="twojafirma.pl lub @profil"
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Branża (opcjonalnie)
                  <input
                    value={leadForm.industry}
                    onChange={(event) => handleLeadFormChange("industry", event.target.value)}
                    className={leadInputClass}
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Wiadomość *
                  <textarea
                    value={leadForm.message}
                    onChange={(event) => handleLeadFormChange("message", event.target.value)}
                    className={`${leadInputClass} min-h-20 resize-none`}
                    maxLength={1000}
                    placeholder="Krótko opisz firmę i co chcesz zautomatyzować"
                  />
                </label>
              </div>

              {leadFormMessage ? (
                <p className="mt-3 text-xs font-semibold text-red-600">
                  {leadFormMessage}
                </p>
              ) : null}

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={leadFormState === "loading" || leadSubmitted}
                  className="min-h-10 rounded-xl bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-4 py-2 text-xs font-bold text-[#171717] shadow-sm transition hover:shadow-[0_10px_24px_rgba(15,138,108,0.22)] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {leadFormState === "loading" ? "Wysyłanie..." : "Wyślij kontakt"}
                </button>
                <button
                  type="button"
                  onClick={continueWithoutForm}
                  disabled={leadFormState === "loading"}
                  className="min-h-10 rounded-xl border border-[#E8D7B9]/70 bg-white px-4 py-2 text-xs font-bold text-[#171717] transition hover:border-[#0F8A6C]/50 hover:text-[#0F8A6C] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  Kontynuuj bez formularza
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#171717] shadow-sm">
              Piszę odpowiedź...
            </div>
          </div>
        ) : null}
      </div>

      {shouldShowStartSuggestions || shouldShowDynamicSuggestions ? (
        <div className="border-t border-slate-200 bg-slate-50/90 px-4 py-3 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {shouldShowStartSuggestions ? "Przykładowe prompty" : "Możesz zapytać też o:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {(shouldShowStartSuggestions ? suggestions.slice(0, 5) : visibleDynamicSuggestions).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                disabled={isLoading}
                className="rounded-full border border-[#E8D7B9]/70 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F8A6C] hover:text-[#0F8A6C] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={inputPlaceholder}
          className="min-h-12 min-w-0 flex-1 rounded-xl border border-[#E8D7B9]/80 bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:bg-white focus:ring-2 focus:ring-[#0F8A6C]/35"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="min-h-12 rounded-xl bg-[#171717] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(14,42,36,0.18)] transition hover:bg-[#0E2A24] disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        >
          Wyślij
        </button>
      </form>
    </section>
  );
}
