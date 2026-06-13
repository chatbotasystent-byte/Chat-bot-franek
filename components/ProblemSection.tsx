const problems = [
  "Klienci pytają po godzinach pracy",
  "Wiadomości giną na Facebooku, mailu i formularzach",
  "Pracownicy odpowiadają ciągle na te same pytania",
  "Brak prostego systemu zbierania i kwalifikowania leadów"
];

const channels = ["Mail", "Formularz", "Social media", "Telefon"];

export function ProblemSection() {
  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_25%,rgba(134,239,172,0.12),transparent_28rem)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#86EFAC]">
            Problem
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Firmy tracą klientów, bo odpowiadają za wolno
          </h2>
          <div className="mt-8 grid gap-3">
            {problems.map((problem) => (
              <div key={problem} className="rounded-2xl border border-[#86EFAC]/14 bg-[#0B1F18]/[0.05] p-4 text-[#D6D3D1]">
                {problem}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#86EFAC]/14 bg-[#0B1F18]/[0.06] p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur">
          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map((channel, index) => (
              <div key={channel} className="rounded-2xl border border-[#86EFAC]/14 bg-[#030705]/55 p-4">
                <p className="text-sm font-semibold text-white">{channel}</p>
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-[#0B1F18]/18" />
                  <div className="h-2 w-2/3 rounded-full bg-[#0B1F18]/10" />
                </div>
                <span className="mt-4 inline-flex rounded-full bg-[#0F8A6C]/14 px-3 py-1 text-xs text-[#A7F3D0]">
                  {index + 2} nowe zapytania
                </span>
              </div>
            ))}
          </div>

          <div className="my-6 flex items-center justify-center gap-3 text-[#86EFAC]">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#86EFAC]/60" />
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#86EFAC]/60" />
          </div>

          <div className="rounded-2xl border border-[#86EFAC]/24 bg-[#86EFAC]/[0.08] p-5">
            <p className="text-sm font-semibold text-[#86EFAC]">Uporządkowany panel AI</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Nowy lead", "Branża", "Kontakt"].map((item) => (
                <div key={item} className="rounded-xl bg-[#030705]/50 p-3 text-xs text-[#D6D3D1]">
                  {item}
                  <div className="mt-2 h-2 rounded-full bg-[#0F8A6C]/35" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

