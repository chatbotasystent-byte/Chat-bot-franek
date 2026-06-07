const plans = [
  {
    title: "Audyt AI",
    price: "od 0 zł / konsultacja startowa",
    description: "Krótka analiza, gdzie AI może pomóc w Twojej firmie.",
    cta: "Zapytaj o audyt"
  },
  {
    title: "Demo chatbota",
    price: "wycena indywidualna",
    description:
      "Przygotowanie działającego demo pod konkretną branżę i ofertę firmy.",
    cta: "Chcę demo",
    featured: true
  },
  {
    title: "Wdrożenie AI",
    price: "indywidualnie",
    description:
      "Chatbot, formularz leadów, integracje i automatyzacje dopasowane do procesu firmy.",
    cta: "Porozmawiajmy"
  }
];

export function PricingSection() {
  return (
    <section className="border-y border-white/10 bg-white/[0.035] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Oferta startowa
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Zacznij od demo, zanim zdecydujesz się na wdrożenie
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`relative rounded-3xl border p-6 shadow-xl transition duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-cyan-300/45 bg-cyan-300/[0.08] shadow-cyan-950/30 hover:shadow-[0_0_42px_rgba(34,211,238,0.22)]"
                  : "border-white/10 bg-white/[0.055] shadow-slate-950/20 hover:border-cyan-300/30 hover:shadow-[0_0_34px_rgba(34,211,238,0.14)]"
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-slate-950">
                  Najlepszy start
                </span>
              ) : null}
              <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
              <p className="mt-4 text-2xl font-semibold text-cyan-200">{plan.price}</p>
              <p className="mt-4 leading-7 text-slate-300">{plan.description}</p>
              <a href="#kontakt" className="cta-shine mt-6 inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/[0.06]">
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
