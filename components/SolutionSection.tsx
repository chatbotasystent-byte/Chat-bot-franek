const solutions = [
  {
    title: "AI Chatbot na stronę",
    description:
      "Bot odpowiada na najczęstsze pytania klientów, wyjaśnia ofertę i zachęca do kontaktu.",
    icon: "chat"
  },
  {
    title: "Lead capture + Google Sheets",
    description:
      "Każde zapytanie może automatycznie trafiać do arkusza, CRM lub systemu sprzedażowego.",
    icon: "sheet"
  },
  {
    title: "Audyt automatyzacji",
    description:
      "Sprawdzamy, które powtarzalne procesy w firmie można uprościć za pomocą AI.",
    icon: "audit"
  },
  {
    title: "Personalizowane demo",
    description:
      "Przygotowujemy demo dopasowane do konkretnej branży, żeby właściciel firmy zobaczył realną wartość.",
    icon: "demo"
  }
];

function SolutionIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    chat: "M7 8h10a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H9l-5 3v-3a3 3 0 0 1-2-3v-3a3 3 0 0 1 3-3h2ZM9 12h6",
    sheet: "M6 4h12v16H6V4ZM6 9h12M6 14h12M10 4v16M14 4v16",
    audit: "M5 5h14M7 9h10M7 13h6M5 19l3-3 3 3 5-6 3 3",
    demo: "m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d={paths[icon]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SolutionSection() {
  return (
    <section id="uslugi" className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Rozwiązanie
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Zamieniamy chaos w prosty system AI
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.08] hover:shadow-cyan-950/30"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-slate-950 shadow-[0_0_26px_rgba(34,211,238,0.22)]">
                <SolutionIcon icon={solution.icon} />
              </div>
              <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{solution.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
