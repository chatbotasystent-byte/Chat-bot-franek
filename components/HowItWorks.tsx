const steps = [
  {
    title: "Analizujemy firmę",
    description:
      "Sprawdzamy ofertę, pytania klientów, proces kontaktu i miejsca, gdzie firma traci czas."
  },
  {
    title: "Tworzymy demo AI",
    description:
      "Budujemy działający przykład chatbota lub automatyzacji dopasowany do branży."
  },
  {
    title: "Wdrażamy i optymalizujemy",
    description:
      "Podpinamy formularze, leady, Google Sheets i poprawiamy odpowiedzi bota."
  }
];

const flow = ["Analiza", "Chatbot", "Lead", "Google Sheets / CRM"];

export function HowItWorks() {
  return (
    <section id="jak-dzialamy" className="relative px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(15,138,108,0.12),transparent_34rem)]" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
            Proces
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Jak działamy?
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#86EFAC]/14 bg-[#0B1F18]/[0.055] p-6 shadow-xl shadow-emerald-950/20"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#86EFAC]/25 bg-[#0F8A6C]/12 text-sm font-bold text-[#86EFAC]">
                0{index + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-[#D6D3D1]">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#86EFAC]/14 bg-[#030705]/65 p-5 shadow-2xl shadow-emerald-950/20">
          <div className="grid gap-4 md:grid-cols-4">
            {flow.map((item, index) => (
              <div key={item} className="relative">
                <div className="rounded-2xl border border-[#86EFAC]/18 bg-[#86EFAC]/[0.06] p-5 text-center text-sm font-semibold text-[#F4FFF9]">
                  {item}
                </div>
                {index < flow.length - 1 ? (
                  <div className="absolute right-[-1.25rem] top-1/2 hidden -translate-y-1/2 text-[#86EFAC] md:block">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

