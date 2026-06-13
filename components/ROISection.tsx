const roiItems = [
  "Mniej powtarzalnych pytań",
  "Szybsza reakcja na zapytania",
  "Lepsze zbieranie kontaktów",
  "Jeden uporządkowany arkusz leadów",
  "Większa szansa na kontakt poza godzinami pracy",
  "Profesjonalniejszy wizerunek firmy"
];

export function ROISection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Wartość biznesowa
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Po co firmie taki chatbot?
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roiItems.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#0B1F18]/[0.055] p-5 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

