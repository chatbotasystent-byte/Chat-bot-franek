"use client";

import { useEffect, useRef, useState } from "react";
import { ChatWidget, type ChatWidgetHandle } from "@/components/ChatWidget";

type ChatModalProps = {
  suggestions: string[];
};

export function ChatModal({ suggestions }: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const chatWidgetRef = useRef<ChatWidgetHandle>(null);

  useEffect(() => {
    function handleOpenChatModal() {
      setIsOpen(true);
    }

    function handleCloseChatModal() {
      setIsOpen(false);
    }

    window.addEventListener("open-chat-modal", handleOpenChatModal);
    window.addEventListener("close-chat-modal", handleCloseChatModal);

    return () => {
      window.removeEventListener("open-chat-modal", handleOpenChatModal);
      window.removeEventListener("close-chat-modal", handleCloseChatModal);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="glass-card gradient-border mx-auto max-w-4xl rounded-3xl p-6 text-center sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
          Demo chatu
        </p>
        <h3 className="mt-4 text-2xl font-semibold tracking-normal text-white sm:text-3xl">
          Przetestuj chatbota AI
        </h3>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
          Kliknij kafelek i zobacz, jak chatbot może odpowiadać klientom oraz
          zbierać zapytania.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cta-shine mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-7 py-3 text-sm font-semibold text-[#F4FFF9] shadow-[0_0_34px_rgba(15,138,108,0.24)] transition hover:scale-[1.02] hover:shadow-[0_0_44px_rgba(34,197,94,0.28)]"
        >
          Otwórz demo chatu
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`animate-float-subtle fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-4 py-2.5 text-sm font-semibold text-[#F4FFF9] shadow-[0_0_26px_rgba(15,138,108,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(34,197,94,0.3)] sm:bottom-6 sm:right-6 sm:min-h-12 sm:px-5 sm:py-3 ${
          isOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Otwórz demo chatu AI"
      >
        <span className="h-2 w-2 rounded-full bg-[#0B1F18] shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
        Chat AI
      </button>

      <div
        className={`fixed inset-x-3 bottom-3 top-3 z-50 flex max-h-[calc(100dvh-1.5rem)] flex-col transition duration-300 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-20 sm:max-h-[calc(100dvh-6.5rem)] sm:w-[520px] ${
          isOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
        }`}
        role="dialog"
        aria-modal="false"
        aria-hidden={!isOpen}
        aria-label="Demo chatbota AI"
      >
        <div
          className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-[#86EFAC]/14 bg-[#030705] shadow-2xl shadow-emerald-950/36"
        >
          <div className="flex flex-none items-start justify-between gap-3 border-b border-white/10 bg-[#0B1F18]/[0.06] px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Demo chatbota AI
              </h2>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
                Napisz, jaką prowadzisz firmę, a bot pokaże przykładowe zastosowania.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => chatWidgetRef.current?.reset()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0B1F18]/[0.06] text-lg font-semibold text-white transition hover:border-[#86EFAC]/40 hover:bg-[#0B1F18]/[0.1]"
                aria-label="Resetuj rozmowę"
                title="Resetuj rozmowę"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0B1F18]/[0.06] text-lg font-semibold text-white transition hover:border-[#86EFAC]/40 hover:bg-[#0B1F18]/[0.1]"
                aria-label="Zamknij chat"
                title="Zamknij chat"
              >
                X
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden bg-[#030705] p-3 sm:p-4">
            <ChatWidget ref={chatWidgetRef} suggestions={suggestions} />
          </div>
        </div>
      </div>
    </>
  );
}

