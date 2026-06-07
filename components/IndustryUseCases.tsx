const industries = [
  {
    title: "Restauracje",
    points: ["rezerwacje", "pytania o menu", "godziny otwarcia"]
  },
  {
    title: "Salony beauty",
    points: ["cennik", "terminy", "usługi"]
  },
  {
    title: "Firmy usługowe",
    points: ["kwalifikacja leadów", "wyceny", "kontakt"]
  },
  {
    title: "Stomatolodzy i medycyna prywatna",
    points: ["pytania pacjentów", "rejestracja", "informacje o usługach"]
  },
  {
    title: "Mechanicy i detailing",
    points: ["pytania o usługi", "formularze wyceny", "umawianie kontaktu"]
  },
  {
    title: "Nieruchomości",
    points: ["kwalifikacja klientów", "prezentacje ofert", "zbieranie danych"]
  }
];

export function IndustryUseCases() {
  return (
    <section id="branze" className="border-y border-white/10 bg-white/[0.035] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Branże
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            AI dopasowane do konkretnej branży
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <article
              key={industry.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.08]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/14 text-violet-200">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path d="M4 10 12 4l8 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9ZM9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">{industry.title}</h3>
              <ul className="mt-4 space-y-2">
                {industry.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo" className="mt-5 inline-flex text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
                Zobacz demo dla tej branży
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
