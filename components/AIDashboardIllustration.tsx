const leadEngineSteps = [
  {
    number: "01",
    title: "AI Chatbot",
    text: "Rozmawia z klientem i rozpoznaje temat sprawy.",
    status: "ONLINE"
  },
  {
    number: "02",
    title: "Lead captured",
    text: "Zbiera imię, kontakt, branżę i wiadomość.",
    status: "NOWY"
  },
  {
    number: "03",
    title: "Google Sheets",
    text: "Zapisuje zapytanie w arkuszu lub CRM.",
    status: "SYNCED"
  },
  {
    number: "04",
    title: "Email sent",
    text: "Wysyła powiadomienie do zespołu.",
    status: "SENT"
  }
] as const;

const leadFields = [
  ["Status", "Nowy"],
  ["Źródło", "Chatbot"],
  ["Kontakt", "anna@firma.pl"],
  ["Temat", "Wycena automatyzacji"]
] as const;

export function AIDashboardIllustration() {
  return (
    <div className="animate-fade-up animation-delay-450 relative min-w-0 max-w-full">
      <div className="pointer-events-none absolute inset-x-8 top-1/2 h-52 -translate-y-1/2 rounded-full bg-[#22C55E]/18 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full bg-[#86EFAC]/12 blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#34D399]/18 bg-gradient-to-br from-[#0B1F18]/92 via-[#06110D]/96 to-[#030705] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.42),0_0_70px_rgba(34,197,94,0.08)] backdrop-blur sm:rounded-[2rem] sm:p-6 lg:p-8">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-24" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-48 rounded-full bg-[#0F8A6C]/18 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-28 h-56 w-56 -translate-x-1/2 rounded-full bg-[#22C55E]/8 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#86EFAC]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_16px_rgba(34,197,94,0.85)]" />
              AI Lead Engine
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#F4FFF9] sm:text-4xl">
              Chatbot → lead → arkusz → e-mail
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#A7C8BA] sm:text-base">
              Jeden prosty przepływ pokazuje, jak zapytanie ze strony trafia do uporządkowanego procesu sprzedaży.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {leadEngineSteps.map((step, index) => (
              <article
                key={step.title}
                className="group relative min-w-0 overflow-hidden rounded-3xl border border-[#34D399]/18 bg-gradient-to-br from-[#0B1F18] via-[#071B14] to-[#030705] p-4 shadow-[0_18px_54px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(134,239,172,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/40 hover:shadow-[0_24px_68px_rgba(15,138,108,0.2)]"
              >
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#86EFAC]/45 to-transparent" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#22C55E]/10 blur-2xl transition duration-300 group-hover:bg-[#22C55E]/16" />
                <div className="pointer-events-none absolute bottom-3 left-4 right-4 h-16 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.09),transparent_70%)]" />
                {index < leadEngineSteps.length - 1 ? (
                  <span className="pointer-events-none absolute left-[calc(100%-0.2rem)] top-1/2 hidden h-px w-4 bg-gradient-to-r from-[#22C55E]/50 to-transparent lg:block" />
                ) : null}
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#34D399]/24 bg-[#0F8A6C]/24 text-sm font-black text-[#86EFAC] shadow-[0_0_24px_rgba(34,197,94,0.12)]">
                    {step.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/18 bg-[#06110D]/82 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#86EFAC]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.75)]" />
                    {step.status}
                  </span>
                </div>
                <h3 className="relative mt-5 text-lg font-black tracking-[-0.03em] text-[#F4FFF9]">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-[#A7C8BA]">{step.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-[#34D399]/16 bg-gradient-to-br from-[#0B1F18]/88 to-[#06110D]/88 p-4 shadow-[inset_0_1px_0_rgba(134,239,172,0.06)] sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-[#34D399]/12 pb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#86EFAC]">
                    Rozmowa na stronie
                  </p>
                  <p className="mt-1 text-sm text-[#A7C8BA]">Klient dostaje odpowiedź bez czekania.</p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_18px_rgba(34,197,94,0.8)]" />
              </div>

              <div className="mt-4 grid gap-3">
                <div className="max-w-[86%] rounded-2xl rounded-tl-md border border-[#34D399]/12 bg-[#0E2A24]/56 px-4 py-3 text-sm leading-6 text-[#DCEBDD]">
                  Czy możecie przygotować automatyzację dla salonu beauty?
                </div>
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-[#22C55E]/18 bg-[#22C55E]/12 px-4 py-3 text-sm leading-6 text-[#E9FFF0]">
                  Tak. Chatbot może odpowiadać o usługach, terminach i zebrać kontakt do rezerwacji.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#34D399]/16 bg-gradient-to-br from-[#0B1F18]/88 to-[#06110D]/88 p-4 shadow-[inset_0_1px_0_rgba(134,239,172,0.06)] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#86EFAC]">
                    Lead record
                  </p>
                  <h3 className="mt-1 text-xl font-black tracking-[-0.04em] text-[#F4FFF9]">
                    Gotowy wpis do arkusza
                  </h3>
                </div>
                <span className="rounded-full border border-[#22C55E]/18 bg-[#22C55E]/10 px-3 py-1.5 text-xs font-black text-[#86EFAC]">
                  Google Sheets
                </span>
              </div>

              <div className="mt-5 grid gap-2">
                {leadFields.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[0.82fr_1.18fr] items-center gap-3 rounded-2xl border border-[#34D399]/12 bg-[#0E2A24]/48 px-3 py-2.5 text-sm"
                  >
                    <span className="font-bold text-[#7FA99B]">{label}</span>
                    <span className="min-w-0 truncate font-semibold text-[#F4FFF9]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
