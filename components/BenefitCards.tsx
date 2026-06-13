const benefits = [
  {
    title: "Obsługa klienta 24/7",
    description:
      "Chatbot odpowiada na najczęstsze pytania klientów także poza godzinami pracy firmy.",
    icon: "clock"
  },
  {
    title: "Więcej leadów",
    description:
      "AI pomaga zebrać dane kontaktowe wtedy, gdy klient jest najbardziej zainteresowany ofertą.",
    icon: "lead"
  },
  {
    title: "Automatyczne zapisy do Google Sheets",
    description:
      "Formularze i rozmowy można połączyć z arkuszem, żeby zespół miał wszystkie zapytania w jednym miejscu.",
    icon: "sheet"
  },
  {
    title: "Personalizacja pod branżę",
    description:
      "Demo dopasowujemy do realnych pytań klientów, usług i sposobu działania Twojej firmy.",
    icon: "spark"
  }
];

function BenefitIcon({ name }: { name: string }) {
  if (name === "clock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "lead") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M5 19c1.2-3 3.5-4.5 7-4.5S17.8 16 19 19M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19 8h2M20 7v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "sheet") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M6 4h12v16H6V4ZM6 9h12M6 14h12M10 4v16M14 4v16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BenefitCards() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {benefits.map((benefit) => (
        <article
          key={benefit.title}
          className="rounded-lg border border-[#34D399]/18 bg-[#0B1F18] p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-soft"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-teal-50 to-rose-50 text-teal-700">
            <BenefitIcon name={benefit.icon} />
          </div>
          <h3 className="text-lg font-semibold text-ink">{benefit.title}</h3>
          <p className="mt-3 leading-7 text-[#9BB7AA]">{benefit.description}</p>
        </article>
      ))}
    </div>
  );
}

