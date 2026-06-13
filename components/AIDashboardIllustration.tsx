const stats = [
  ["12", "nowych zapytań dzisiaj"],
  ["98%", "wysłanych na e-mail"],
  ["ON", "Google Sheets połączono"],
  ["312", "leadów w tym miesiącu"]
] as const;

const leadRows = [
  ["Nowe", "10.06.2026 15:25", "Klimatyzacja", "Marek", "marek@example.com", "Wycena montażu"],
  ["Nowe", "10.06.2026 16:10", "Beauty / zdrowie", "Anna", "123 456 789", "Termin na manicure"],
  ["Wysłane", "10.06.2026 16:42", "Fotowoltaika", "Piotr", "piotr@mail.pl", "Ile kosztuje instalacja"],
  ["Wysłane", "10.06.2026 17:03", "Usługi dla firm", "Katarzyna", "katarzyna@firma.pl", "Prośba o ofertę"]
] as const;

export function AIDashboardIllustration() {
  return (
    <div className="animate-fade-up animation-delay-450 relative">
      <div className="absolute -inset-5 rounded-[2.4rem] bg-[#22C55E]/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-[#22C55E]/18 bg-[#070A08]/92 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur sm:p-5 lg:p-6">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-18" />
        <div className="relative rounded-[1.6rem] border border-white/10 bg-[#050706]/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86EFAC]">
                Symulacja - leady na żywo
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                Nowe zapytania w jednym miejscu
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#7FA99B]">
                Po wysłaniu demo nowy lead pojawi się tutaj bez odświeżania strony.
              </p>
            </div>
            <span className="flex w-fit items-center gap-2 rounded-full border border-[#22C55E]/28 bg-[#22C55E]/10 px-3 py-1.5 text-xs font-bold text-[#86EFAC]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              system online
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([value, label]) => (
              <article
                key={label}
                className="rounded-3xl border border-white/10 bg-[#0B1F18]/[0.045] p-4 shadow-[0_12px_34px_rgba(0,0,0,0.18)]"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-white">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7FA99B]">
                  {label}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-[#0E2A24]/38">
            <div className="grid grid-cols-[0.75fr_1.15fr_1fr_0.85fr_1.25fr_1.35fr] gap-3 border-b border-white/10 bg-[#0B1F18]/[0.045] px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#86EFAC]">
              <span>Status</span>
              <span>Data</span>
              <span>Branża</span>
              <span>Imię</span>
              <span>Kontakt</span>
              <span>Wiadomość</span>
            </div>
            <div className="divide-y divide-white/8">
              {leadRows.map(([status, date, industry, name, contact, message]) => (
                <div
                  key={`${date}-${name}`}
                  className="grid grid-cols-[0.75fr_1.15fr_1fr_0.85fr_1.25fr_1.35fr] items-center gap-3 px-4 py-3 text-xs font-semibold text-[#D6D3D1]"
                >
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black ${
                      status === "Nowe"
                        ? "bg-[#22C55E]/14 text-[#86EFAC] ring-1 ring-[#22C55E]/22"
                        : "bg-[#0B1F18]/[0.07] text-[#7FA99B] ring-1 ring-white/10"
                    }`}
                  >
                    {status}
                  </span>
                  <span className="truncate text-[#7FA99B]">{date}</span>
                  <span className="truncate">{industry}</span>
                  <span className="truncate text-white">{name}</span>
                  <span className="truncate text-[#86EFAC]">{contact}</span>
                  <span className="truncate">{message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0B1F18]/[0.045] px-4 py-3 text-xs font-bold text-[#7FA99B]">
              Dane przesyłane są bezpiecznie i poufnie (SSL)
            </div>
            <div className="rounded-2xl border border-[#22C55E]/18 bg-[#22C55E]/10 px-4 py-3 text-xs font-bold text-[#86EFAC]">
              Integracje: Google Sheets, E-mail, CRM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

