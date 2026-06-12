"use client";

import { FormEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatWidgetProps = {
  suggestions?: string[];
};

export type ChatWidgetHandle = {
  reset: () => void;
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

const contactPrompt = "Chcę zostawić kontakt";
const nextContactPrompt = "Zostaw kolejny kontakt";

const startPromptSuggestions = [
  "Mam firmę usługową",
  "Mam salon beauty",
  "Mam warsztat samochodowy",
  "Mam komis samochodowy",
  contactPrompt
];

const generalPromptSuggestions = [
  "Jak bot zbiera leady?",
  "Czy lead trafia do Google Sheets?",
  "Jak wygląda darmowy audyt?",
  "Ile trwa wdrożenie?"
];

const industryPromptSuggestions: Record<IndustryKey, string[]> = {
  automotiveWorkshop: [
    "Czy bot umówi wizytę?",
    "Czy zbierze markę i model auta?",
    "Czy lead trafi do arkusza?",
    "Czy dostanę powiadomienie?"
  ],
  carDealer: [
    "Czy bot zbierze budżet klienta?",
    "Czy kwalifikuje kupujących?",
    "Czy sprzedawca dostanie lead?",
    "Czy można zbierać preferencje auta?"
  ],
  beauty: [
    "Czy bot może umawiać wizyty?",
    "Czy zbierze usługę i termin?",
    "Czy przypomni o kontakcie?",
    "Czy zapytanie trafi do arkusza?"
  ],
  services: [
    "Czy bot zbierze miasto i usługę?",
    "Czy pomoże we wstępnej wycenie?",
    "Czy lead trafi do Google Sheets?",
    "Czy dostanę maila z leadem?"
  ],
  ecommerce: [
    "Czy bot odpowie o produktach?",
    "Czy zbierze pytania klientów?",
    "Czy przekaże dane do obsługi?",
    "Czy działa poza godzinami?"
  ],
  clinic: [
    "Czy bot zbierze temat wizyty?",
    "Czy przekaże kontakt do recepcji?",
    "Czy może kwalifikować zapytania?",
    "Czy lead trafi do arkusza?"
  ],
  restaurant: [
    "Czy bot przyjmie rezerwację?",
    "Czy zbierze datę i liczbę osób?",
    "Czy powiadomi obsługę?",
    "Czy zapisze rezerwację?"
  ],
  realEstate: [
    "Czy bot zbierze budżet klienta?",
    "Czy kwalifikuje kupujących?",
    "Czy sprzedawca dostanie lead?",
    "Czy można zbierać preferencje auta?"
  ],
  education: [
    "Czy bot odpowie o kursach?",
    "Czy zbierze pytania klientów?",
    "Czy przekaże dane do obsługi?",
    "Czy działa poza godzinami?"
  ]
};

const leadInputClass =
  "mt-1 h-9 w-full rounded-lg border border-[#E8D7B9]/70 bg-white px-2.5 py-1.5 text-sm text-[#171717] outline-none transition placeholder:text-stone-500 focus:border-[#0F8A6C] focus:ring-2 focus:ring-[#0F8A6C]/20";

function isContactIntent(text: string) {
  const normalizedText = text.toLowerCase();
  const hasEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text);
  const hasPhone = (text.match(/(?:\+?\d[\d\s-]{5,}\d)/g) ?? []).some(
    (match) => match.replace(/\D/g, "").length >= 7
  );

  return (
    hasEmail ||
    hasPhone ||
    normalizedText.includes("@") ||
    normalizedText.includes("kontakt") ||
    normalizedText.includes("skontaktowa") ||
    normalizedText.includes("email") ||
    normalizedText.includes("mail") ||
    normalizedText.includes("telefon") ||
    normalizedText.includes("numer") ||
    normalizedText.includes("audyt") ||
    normalizedText.includes("oferta") ||
    normalizedText.includes("ofertę") ||
    normalizedText.includes("oferte") ||
    normalizedText.includes("wycena") ||
    normalizedText.includes("wycenę") ||
    normalizedText.includes("wycene") ||
    normalizedText.includes("odezwijcie") ||
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

function getEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
}

function getPhone(text: string) {
  return (text.match(/(?:\+?\d[\d\s-]{5,}\d)/g) ?? []).find(
    (match) => match.replace(/\D/g, "").length >= 7
  ) ?? "";
}

function getWebsite(text: string) {
  const withoutEmail = text.replace(getEmail(text), " ");
  const instagram = withoutEmail.match(/(?:instagram\.com\/[^\s,;]+|@[a-zA-Z0-9._]+)/i)?.[0];

  if (instagram) {
    return instagram;
  }

  return withoutEmail.match(/(?:https?:\/\/[^\s,;]+|www\.[^\s,;]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s,;]*)/)?.[0] ?? "";
}

function getExplicitContactName(text: string, email: string) {
  const explicitMatch =
    text.match(/(?:nazywam si[ęe]|imi[ęe] i nazwisko\s*:)\s*([\p{L}'-]+(?:\s+[\p{L}'-]+){1,2})/iu) ??
    text.match(/^\s*([\p{L}'-]+(?:\s+[\p{L}'-]+){1,2})\s*,\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/iu);

  if (!explicitMatch) {
    return "";
  }

  const name = explicitMatch[1].trim();
  const commonNonNames = /\b(mog[ęe]|chc[ęe]|mail|email|telefon|kontakt|prosz[ęe]|moj|mój|jak|si[ęe])\b/iu;

  if (commonNonNames.test(name) || name.includes(email)) {
    return "";
  }

  return name;
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

function getSuggestedPrompts({
  industry,
  messages,
  contactFormVisible,
  startPrompts,
  usedPromptChips,
  contactPromptLabel
}: {
  industry: IndustryKey | null;
  messages: Message[];
  contactFormVisible: boolean;
  startPrompts: string[];
  usedPromptChips: string[];
  contactPromptLabel: string;
}) {
  if (contactFormVisible) {
    return [];
  }

  const hasUserMessage = messages.some((message) => message.role === "user");
  const withContactPrompt = (prompts: string[]) => {
    const contentPrompts = prompts
      .filter((prompt) => prompt !== contactPrompt && prompt !== nextContactPrompt)
      .filter((prompt) => !usedPromptChips.includes(prompt));

    return [...contentPrompts, contactPromptLabel];
  };

  if (!hasUserMessage) {
    return withContactPrompt(startPrompts.length > 0 ? startPrompts : startPromptSuggestions)
      .slice(0, 5);
  }

  if (industry) {
    return withContactPrompt(industryPromptSuggestions[industry]).slice(0, 5);
  }

  return withContactPrompt(generalPromptSuggestions).slice(0, 5);
}

function getContactDraft(text: string): Partial<LeadFormData> {
  const email = getEmail(text);
  const phone = getPhone(text);
  const website = getWebsite(text);

  return {
    name: getExplicitContactName(text, email),
    email,
    phone,
    website
  };
}

export const ChatWidget = forwardRef<ChatWidgetHandle, ChatWidgetProps>(function ChatWidget(
  { suggestions = [] },
  ref
) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>(emptyLeadForm);
  const [leadFormState, setLeadFormState] = useState<FormState>("idle");
  const [leadFormMessage, setLeadFormMessage] = useState("");
  const [showOptionalLeadFields, setShowOptionalLeadFields] = useState(false);
  const [usedPromptChips, setUsedPromptChips] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const leadFormStartedAtRef = useRef(Date.now());
  const userMessages = messages.filter((message) => message.role === "user");
  const detectedIndustry =
    [...userMessages]
      .reverse()
      .map((message) => detectIndustry(message.content))
      .find((industry): industry is IndustryKey => industry !== null) ?? null;
  const contactPromptLabel = leadSubmitted ? nextContactPrompt : contactPrompt;
  const suggestedPrompts = getSuggestedPrompts({
    industry: detectedIndustry,
    messages,
    contactFormVisible: isLeadFormVisible,
    startPrompts: suggestions,
    usedPromptChips,
    contactPromptLabel
  });
  const shouldShowSuggestions = suggestedPrompts.length > 0;
  const inputPlaceholder = isLeadFormVisible
    ? "Możesz wypełnić formularz albo kontynuować rozmowę..."
    : leadSubmitted || userMessages.length > 0
      ? "Napisz wiadomość..."
      : "Napisz, czym zajmuje się Twoja firma...";

  useImperativeHandle(ref, () => ({
    reset() {
      setMessages(initialMessages);
      setInput("");
      setIsLoading(false);
      setIsLeadFormVisible(false);
      setLeadSubmitted(false);
      setLeadForm(emptyLeadForm);
      setLeadFormState("idle");
      setLeadFormMessage("");
      setShowOptionalLeadFields(false);
      setUsedPromptChips([]);
      leadFormStartedAtRef.current = Date.now();
      inputRef.current?.focus();
    }
  }));

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isLeadFormVisible, isLoading, showOptionalLeadFields, leadFormMessage]);

  function showLeadForm(nextMessages: Message[], draft: Partial<LeadFormData> = {}) {
    setIsLeadFormVisible(true);
    setShowOptionalLeadFields(false);
    setLeadSubmitted(false);
    setLeadForm({
      ...emptyLeadForm,
      ...Object.fromEntries(
        Object.entries(draft).filter(([, value]) => typeof value === "string" && value.trim())
      )
    });
    setLeadFormState("idle");
    setLeadFormMessage("");
    leadFormStartedAtRef.current = Date.now();
    setMessages([
      ...nextMessages,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Jasne — możesz zostawić dane w krótkim formularzu poniżej."
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
    setShowOptionalLeadFields(false);
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

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("companyWebsiteConfirm") ?? "").trim();

    if (honeypot) {
      setIsLeadFormVisible(false);
      setLeadSubmitted(true);
      setLeadForm(emptyLeadForm);
      setShowOptionalLeadFields(false);
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
      leadFormStartedAtRef.current = Date.now();
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
      source: "chatbot-form",
      elapsedMs: Date.now() - leadFormStartedAtRef.current
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

      if (response.status === 429) {
        setLeadFormState("error");
        setLeadFormMessage("Wysłano już zgłoszenie. Spróbuj ponownie za chwilę.");
        return;
      }

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      setIsLeadFormVisible(false);
      setLeadSubmitted(true);
      setLeadForm(emptyLeadForm);
      setShowOptionalLeadFields(false);
      setLeadFormState("idle");
      leadFormStartedAtRef.current = Date.now();
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
      showLeadForm(nextMessages, getContactDraft(trimmedText));
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

  async function handlePromptClick(prompt: string) {
    if (prompt === contactPrompt || prompt === nextContactPrompt) {
      showLeadForm(messages);
      return;
    }

    setUsedPromptChips((current) => (
      current.includes(prompt) ? current : [...current, prompt]
    ));
    await sendMessage(prompt);
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-[#E8D7B9]/80 bg-white shadow-[0_24px_80px_rgba(14,42,36,0.18)] ring-1 ring-[#E8D7B9]/60">
      <div className="flex flex-none items-start justify-between gap-4 border-b border-[#E8D7B9]/60 bg-gradient-to-r from-white to-[#F7F2E8] px-5 py-4 sm:px-6">
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

      <div
        ref={messagesContainerRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-[#F7F2E8] via-white to-[#F7F2E8]/70 px-4 py-5 sm:px-6"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm [overflow-wrap:anywhere] sm:max-w-[520px] ${
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
              className="w-full max-w-[420px] rounded-2xl border border-[#E8D7B9]/80 bg-[#FFF7ED] p-3 text-[#171717] shadow-[0_14px_34px_rgba(14,42,36,0.12)] sm:p-4"
            >
              <label className="sr-only" aria-hidden="true">
                Potwierdź stronę firmy
                <input
                  name="companyWebsiteConfirm"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
              </label>

              <div className="mb-3">
                <p className="text-sm font-bold text-[#171717]">Zostaw kontakt</p>
                <p className="mt-1 text-xs leading-5 text-stone-600">
                  Uzupełnij krótkie dane — odezwiemy się z propozycją.
                </p>
              </div>

              <div className="grid gap-2.5">
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
                  Strona / Instagram *
                  <input
                    value={leadForm.website}
                    onChange={(event) => handleLeadFormChange("website", event.target.value)}
                    className={leadInputClass}
                    type="text"
                    placeholder="twojafirma.pl lub @profil"
                  />
                </label>
                <label className="text-xs font-semibold text-[#171717]">
                  Wiadomość *
                  <textarea
                    value={leadForm.message}
                    onChange={(event) => handleLeadFormChange("message", event.target.value)}
                    className={`${leadInputClass} min-h-[72px] resize-none`}
                    maxLength={1000}
                    placeholder="Krótko opisz, czego potrzebujesz"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowOptionalLeadFields((current) => !current)}
                  className="w-fit text-xs font-semibold text-[#0F8A6C] underline-offset-4 transition hover:text-[#0E2A24] hover:underline"
                  aria-expanded={showOptionalLeadFields}
                >
                  {showOptionalLeadFields ? "Ukryj pola opcjonalne" : "Pokaż pola opcjonalne"}
                </button>

                {showOptionalLeadFields ? (
                  <div className="grid gap-2.5 rounded-xl border border-[#E8D7B9]/55 bg-white/50 p-2.5">
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
                      Branża (opcjonalnie)
                      <input
                        value={leadForm.industry}
                        onChange={(event) => handleLeadFormChange("industry", event.target.value)}
                        className={leadInputClass}
                      />
                    </label>
                  </div>
                ) : null}
              </div>

              {leadFormMessage ? (
                <p className="mt-3 text-xs font-semibold text-red-600">
                  {leadFormMessage}
                </p>
              ) : null}

              <div className="mt-3 grid gap-2 min-[420px]:grid-cols-2">
                <button
                  type="submit"
                  disabled={leadFormState === "loading" || leadSubmitted}
                  className="min-h-9 rounded-xl bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-3 py-2 text-xs font-bold text-[#171717] shadow-sm transition hover:shadow-[0_10px_24px_rgba(15,138,108,0.22)] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {leadFormState === "loading" ? "Wysyłanie..." : "Wyślij kontakt"}
                </button>
                <button
                  type="button"
                  onClick={continueWithoutForm}
                  disabled={leadFormState === "loading"}
                  className="min-h-9 rounded-xl border border-[#E8D7B9]/70 bg-white px-3 py-2 text-xs font-bold text-[#171717] transition hover:border-[#0F8A6C]/50 hover:text-[#0F8A6C] disabled:cursor-not-allowed disabled:opacity-65"
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

      {shouldShowSuggestions ? (
        <div className="flex-none border-t border-[#E8D7B9]/65 bg-[#FFF7ED] px-4 py-3 sm:px-6">
          <div className="rounded-2xl border border-[#E8D7B9]/70 bg-white/85 p-3 shadow-[0_12px_28px_rgba(14,42,36,0.08)]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F8A6C]">
              Możesz zapytać
            </p>
            <p className="mt-1 text-xs leading-5 text-stone-600">
              Wybierz temat albo wpisz własne pytanie.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedPrompts.map((suggestion) => {
                const isContactChip = suggestion === contactPrompt || suggestion === nextContactPrompt;

                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handlePromptClick(suggestion)}
                    disabled={isLoading}
                    className={`max-w-full rounded-full px-3 py-1.5 text-xs font-bold leading-5 shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55 ${
                      isContactChip
                        ? "border border-[#0F8A6C]/30 bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] text-[#171717] hover:shadow-[0_10px_24px_rgba(15,138,108,0.2)]"
                        : "border border-[#E8D7B9]/80 bg-[#FFF7ED] text-[#171717] hover:border-[#0F8A6C]/55 hover:bg-[#0F8A6C]/10 hover:text-[#0E2A24]"
                    }`}
                  >
                    {suggestion}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex flex-none flex-col gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row"
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
});

