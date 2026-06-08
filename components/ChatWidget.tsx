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

export function ChatWidget({ suggestions = [] }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
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

  return (
    <section className="overflow-hidden rounded-3xl border border-[#E8D7B9]/80 bg-white shadow-[0_24px_80px_rgba(14,42,36,0.18)] ring-1 ring-[#E8D7B9]/60">
      <div className="flex items-start justify-between gap-4 border-b border-[#E8D7B9]/60 bg-gradient-to-r from-white to-[#F7F2E8] px-5 py-4 sm:px-6">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-[#0F8A6C]/10 px-3 py-1 text-xs font-semibold text-[#0F8A6C] ring-1 ring-[#0F8A6C]/15">
            Demo AI konsultanta
          </p>
          <h2 className="text-xl font-semibold text-[#171717]">
            Chat AI Growth Partners
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Demo konsultanta AI dla małych i średnich firm
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
              Piszę odpowiedź...
            </div>
          </div>
        ) : null}
      </div>

      {suggestions.length > 0 ? (
        <div className="border-t border-slate-200 bg-slate-50/90 px-4 py-3 sm:px-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Przykładowe prompty
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-[#E8D7B9]/70 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F8A6C] hover:text-[#0F8A6C]"
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
