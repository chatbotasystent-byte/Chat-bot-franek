"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ai-growth-partners-demo-guide-closed";

const steps = [
  "Napisz, jaką prowadzisz firmę",
  "Zapytaj o automatyzację leadów",
  "Sprawdź, jak bot zbiera kontakt",
  "Zobacz, jak lead trafia do arkusza"
];

export function DemoGuide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(sessionStorage.getItem(STORAGE_KEY) !== "true");
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  function closeGuide() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  }

  function openChat() {
    window.dispatchEvent(new Event("open-chat-modal"));
  }

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="gradient-border animate-fade-up fixed bottom-10 left-8 z-50 hidden w-[22rem] rounded-3xl bg-[#171717]/92 p-6 shadow-[0_24px_80px_rgba(14,42,36,0.36)] ring-1 ring-[#E8D7B9]/12 backdrop-blur-xl md:block lg:w-[23.5rem]"
      aria-label="Jak przetestować demo chatbota"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-[#F7F2E8]">
            Jak przetestować demo?
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            Krótka ścieżka testu chatbota AI.
          </p>
        </div>
        <button
          type="button"
          onClick={closeGuide}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white transition hover:border-[#E8D7B9]/45 hover:bg-white/[0.1]"
          aria-label="Zamknij Demo Guide"
        >
          X
        </button>
      </div>

      <ol className="mt-5 space-y-3.5">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-5 text-slate-200">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F8A6C]/18 text-xs font-bold text-[#E8D7B9] ring-1 ring-[#E8D7B9]/25">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={openChat}
        className="cta-shine mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-5 py-3 text-sm font-semibold text-[#171717] shadow-[0_0_28px_rgba(15,138,108,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(201,168,106,0.28)]"
      >
        Otwórz chat
      </button>
    </aside>
  );
}
