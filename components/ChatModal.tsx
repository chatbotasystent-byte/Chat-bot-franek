"use client";

import { useEffect, useState } from "react";
import { ChatWidget } from "@/components/ChatWidget";

type ChatModalProps = {
  suggestions: string[];
};

export function ChatModal({ suggestions }: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleOpenChatModal() {
      setIsOpen(true);
    }

    window.addEventListener("open-chat-modal", handleOpenChatModal);

    return () => {
      window.removeEventListener("open-chat-modal", handleOpenChatModal);
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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="glass-card gradient-border mx-auto max-w-4xl rounded-3xl p-6 text-center sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
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
          className="cta-shine mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.26)] transition hover:scale-[1.02] hover:shadow-[0_0_44px_rgba(34,211,238,0.38)]"
        >
          Otwórz demo chatu
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="animate-float-subtle fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(34,211,238,0.34)] sm:bottom-6 sm:right-6 sm:min-h-12 sm:px-5 sm:py-3"
        aria-label="Otwórz demo chatu AI"
      >
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
        Chat AI
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/78 px-3 py-4 backdrop-blur-xl sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Demo chatbota AI"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="animate-modal-in flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/12 bg-slate-950 shadow-2xl shadow-cyan-950/36">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.06] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Demo chatbota AI
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Napisz, jaką prowadzisz firmę, a bot pokaże przykładowe zastosowania.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-lg font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.1]"
                aria-label="Zamknij demo chatu"
              >
                X
              </button>
            </div>
            <div className="min-h-0 overflow-y-auto bg-slate-950 p-3 sm:p-4">
              <ChatWidget suggestions={suggestions} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
