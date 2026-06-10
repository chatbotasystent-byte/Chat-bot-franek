"use client";

import { FormEvent, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Cześć! Pomagam firmom sprawdzić, jak mogą wykorzystać AI do obsługi klientów, zbierania leadów i automatyzacji pracy. Napisz, czym zajmuje się Twoja firma, a podpowiem, jaki chatbot lub automatyzacja może mieć sens."
  }
];

type ChatWidgetProps = {
  suggestions?: string[];
};

type ChatLeadPayload = {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  industry: string;
  message: string;
  source: "chatbot";
};

type IndustryKey =
  | "automotiveWorkshop"
  | "carDealer"
  | "beauty"
  | "services"
  | "ecommerce"
  | "clinic"
  | "restaurant";

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
  ]
};

const industryLabels: Record<IndustryKey, string> = {
  automotiveWorkshop: "warsztat samochodowy",
  carDealer: "komis samochodowy",
  beauty: "salon beauty",
  services: "firma usługowa",
  ecommerce: "e-commerce",
  clinic: "klinika / gabinet",
  restaurant: "restauracja"
};

function isContactIntent(text: string) {
  const normalizedText = text.toLowerCase();

  return (
    normalizedText.includes("chcę zostawić kontakt") ||
    normalizedText.includes("chce zostawic kontakt") ||
    normalizedText.includes("zostawiam kontakt") ||
    normalizedText.includes("proszę o kontakt") ||
    normalizedText.includes("prosze o kontakt") ||
    normalizedText.includes("chcę darmowy audyt") ||
    normalizedText.includes("chce darmowy audyt")
  );
}

function detectIndustry(text: string): IndustryKey | null {
  const normalizedText = text.toLowerCase();

  if (normalizedText.includes("warsztat")) {
    return "automotiveWorkshop";
  }

  if (normalizedText.includes("komis")) {
    return "carDealer";
  }

  if (
    normalizedText.includes("salon beauty") ||
    normalizedText.includes("beauty") ||
    normalizedText.includes("kosmetycz") ||
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
    normalizedText.includes("ecommerce")
  ) {
    return "ecommerce";
  }

  if (normalizedText.includes("gabinet") || normalizedText.includes("klinika")) {
    return "clinic";
  }

  if (normalizedText.includes("restaurac")) {
    return "restaurant";
  }

  return null;
}

function getPhone(text: string) {
  const matches = text.match(/(?:\+?\d[\d\s-]{5,}\d)/g) ?? [];

  return matches.find((match) => match.replace(/\D/g, "").length >= 7)?.trim() ?? "";
}

function getWebsite(text: string) {
  const instagram = text.match(/(?:instagram\.com\/[^\s,;]+|@[a-zA-Z0-9._]+)/i)?.[0];

  if (instagram) {
    return instagram.trim();
  }

  return text.match(/(?:https?:\/\/[^\s,;]+|www\.[^\s,;]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s,;]*)/)?.[0]?.trim() ?? "";
}

function getName(text: string, email: string, phone: string, website: string, industry: string) {
  const cleanedText = text
    .replace(email, " ")
    .replace(phone, " ")
    .replace(website, " ")
    .replace(industry, " ")
    .replace(/[,;|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const blockedWords = new Set([
    "warsztat",
    "samochodowy",
    "komis",
    "salon",
    "beauty",
    "firma",
    "usługowa",
    "uslugowa",
    "klinika",
    "gabinet",
    "restauracja",
    "ecommerce",
    "e-commerce"
  ]);

  return cleanedText
    .split(" ")
    .filter((word) => !blockedWords.has(word.toLowerCase()) && !/\d/.test(word))
    .slice(0, 3)
    .join(" ");
}

function parseContactLead(text: string): ChatLeadPayload {
  const email = text.match(/[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/)?.[0]?.trim() ?? "";
  const phone = getPhone(text);
  const textWithoutEmail = email ? text.replace(email, " ") : text;
  const website = getWebsite(textWithoutEmail);
  const industryKey = detectIndustry(text);
  const industry = industryKey ? industryLabels[industryKey] : "";
  const name = getName(text, email, phone, website, industry);

  return {
    name,
    email,
    phone,
    website,
    companyName: "",
    industry,
    message: text.slice(0, 1000),
    source: "chatbot"
  };
}

export function ChatWidget({ suggestions = [] }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [isContactMode, setIsContactMode] = useState(false);
  const [hasSubmittedChatLead, setHasSubmittedChatLead] = useState(false);
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
  const shouldShowStartSuggestions = userMessages.length === 0 && suggestions.length > 0;
  const shouldShowDynamicSuggestions =
    userMessages.length > 0 && !isLoading && visibleDynamicSuggestions.length > 0;

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
    setIsLoading(true);

    try {
      if (isContactIntent(trimmedText) && !hasSubmittedChatLead) {
        setIsContactMode(true);
        setMessages([
          ...nextMessages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Jasne — podaj proszę imię oraz email lub telefon. Możesz też dopisać branżę albo stronę/Instagram."
          }
        ]);
        return;
      }

      if (isContactMode && !hasSubmittedChatLead) {
        const leadPayload = parseContactLead(trimmedText);

        if (!leadPayload.email && !leadPayload.phone) {
          setMessages([
            ...nextMessages,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content:
                "Podaj proszę email albo numer telefonu, żebym mógł przekazać kontakt."
            }
          ]);
          return;
        }

        setIsSavingLead(true);

        const leadResponse = await fetch("/api/lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(leadPayload)
        });

        if (!leadResponse.ok) {
          throw new Error("Nie udało się przekazać kontaktu. Spróbuj jeszcze raz albo użyj formularza na stronie.");
        }

        setHasSubmittedChatLead(true);
        setIsContactMode(false);
        setMessages([
          ...nextMessages,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Dziękuję! Przekazałem kontakt — odezwiemy się z propozycją automatyzacji AI."
          }
        ]);
        return;
      }

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
      setIsSavingLead(false);
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
        {isLoading ? (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#171717] shadow-sm">
              {isSavingLead ? "Przekazuję kontakt..." : "Piszę odpowiedź..."}
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
          placeholder="Napisz, czym zajmuje się Twoja firma..."
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
