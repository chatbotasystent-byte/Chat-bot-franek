const metrics = [
  { value: "24/7", label: "Obsługa zapytań" },
  { value: "3-5", label: "Procesów do automatyzacji po audycie" },
  { value: "1", label: "Miejsce na wszystkie leady" },
  { value: "72h", label: "Czas przygotowania demo" }
];

export function MetricsStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[0.04] px-5 py-8 backdrop-blur sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-lg shadow-slate-950/20"
            >
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Przykładowe wartości dla podstawowego wdrożenia/demo.
        </p>
      </div>
    </section>
  );
}
