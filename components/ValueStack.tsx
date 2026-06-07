const values = [
  "Strona demo z chatbotem AI",
  "Prompt i baza wiedzy dopasowana do firmy",
  "Formularz zbierania leadów",
  "Integracja z Google Sheets",
  "Scenariusz Make/Zapier",
  "Proste instrukcje obsługi",
  "Możliwość dalszej rozbudowy"
];

export function ValueStack() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_460px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Value stack
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Co możemy przygotować dla Twojej firmy?
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {values.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
          <h3 className="text-xl font-semibold text-white">Pakiet wdrożeniowy</h3>
          <div className="mt-6 space-y-4">
            {["Demo", "Baza wiedzy", "Leady", "Integracje"].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                style={{ marginLeft: `${index * 10}px` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{item}</span>
                  <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs text-emerald-200">
                    ready
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" style={{ width: `${70 + index * 7}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
