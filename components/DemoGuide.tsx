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
    setIsVisible(sessionStorage.getItem(STORAGE_KEY) !== "true");
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
      className="gradient-border animate-fade-up fixed bottom-6 left-6 z-30 hidden w-[20rem] rounded-3xl bg-slate-950/82 p-5 shadow-[0_22px_70px_rgba(8,145,178,0.2)] backdrop-blur-xl lg:block"
      aria-label="Jak przetestować demo chatbota"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-100">
            Jak przetestować demo?
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Krótka ścieżka testu chatbota AI.
          </p>
        </div>
        <button
          type="button"
          onClick={closeGuide}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.1]"
          aria-label="Zamknij Demo Guide"
        >
          X
        </button>
      </div>

      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-5 text-slate-300">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/12 text-xs font-bold text-cyan-200 ring-1 ring-cyan-300/24">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={openChat}
        className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(34,211,238,0.32)]"
      >
        Otwórz chat
      </button>
    </aside>
  );
}
