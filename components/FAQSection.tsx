const faqs = [
  ["Czy chatbot może działać na mojej stronie?", "Tak. Możemy przygotować demo i dobrać sposób osadzenia do Twojej strony."],
  ["Czy potrzebuję wiedzy technicznej?", "Nie. Prowadzimy Cię przez proces i tłumaczymy wszystko prostym językiem."],
  ["Czy bot może odpowiadać na pytania o moją ofertę?", "Tak. Wykorzystujemy informacje o Twojej firmie, usługach i typowych pytaniach klientów."],
  ["Czy można zbierać leady do Google Sheets?", "Tak. Lead może trafiać do arkusza, CRM albo narzędzi takich jak Make i Zapier."],
  ["Ile trwa przygotowanie demo?", "Podstawowe demo zwykle można przygotować w 24-72h po zebraniu informacji."],
  ["Czy AI zastąpi pracowników?", "Celem jest odciążenie zespołu z powtarzalnych pytań, a nie obiecywanie zastąpienia ludzi."],
  ["Czy można później rozbudować system?", "Tak. Demo może być pierwszym krokiem do większej automatyzacji obsługi klienta i sprzedaży."]
];

export function FAQSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
          FAQ
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Najczęstsze pytania
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-[#86EFAC]/14 bg-[#0B1F18]/[0.055] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#86EFAC]/32 hover:bg-[#0B1F18]/[0.08]">
              <summary className="cursor-pointer list-none font-semibold text-white">
                {question}
              </summary>
              <p className="mt-3 leading-7 text-[#D6D3D1]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

