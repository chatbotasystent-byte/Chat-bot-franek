const useCases = [
  {
    title: "Restauracje",
    icon: "M6 19h12M7 19V9a5 5 0 0 1 10 0v10M9 10h6",
    examples: ["pytania o menu", "rezerwacje", "zbieranie numeru telefonu"]
  },
  {
    title: "Salony beauty",
    icon: "M12 4c2 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8ZM7 20h10",
    examples: ["cennik usług", "zapytania o terminy", "kwalifikacja wizyt"]
  },
  {
    title: "Firmy usługowe",
    icon: "M5 8h14M7 8V6h10v2M6 8v11h12V8M9 13h6",
    examples: ["kwalifikacja leadów", "opis potrzeb", "przekazanie do sprzedaży"]
  },
  {
    title: "Lokalne biznesy",
    icon: "M4 10 12 4l8 6v10H4V10ZM9 20v-6h6v6",
    examples: ["godziny otwarcia", "oferta", "prosty kontakt z klientem"]
  }
];

export function UseCases() {
  return (
    <section className="border-y border-white/70 bg-[#0B1F18]/70 px-5 py-16 backdrop-blur sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Branże
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            Use cases dla małych firm
          </h2>
          <p className="mt-3 text-[#B7CFC3]">
            Demo można szybko dopasować do branży, pytań klientów i sposobu
            zbierania zapytań.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-[#34D399]/18 bg-[#0B1F18] p-6 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-ink text-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d={item.icon}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <ul className="mt-4 space-y-2">
                {item.examples.map((example) => (
                  <li key={example} className="flex gap-2 text-sm text-[#9BB7AA]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

