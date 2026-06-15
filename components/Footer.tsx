const footerLinks = [
  { label: "Jak działa", href: "#jak-dziala" },
  { label: "Zakres", href: "#zakres" },
  { label: "Dla kogo", href: "#branze" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" }
];

const footerStatuses = ["AI online", "Sheets synced", "Email ready"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#34D399]/14 bg-[#020403] px-5 py-12 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#86EFAC]/28 to-transparent" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#0F8A6C]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="dark-section-panel grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#86EFAC]/28 bg-[#0F8A6C]/14 text-sm font-bold text-[#86EFAC] shadow-[0_0_24px_rgba(34,197,94,0.14)]">
                AI
              </span>
              <div>
                <p className="text-lg font-semibold text-[#F4FFF9]">AI Automatyzacja</p>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7FA99B]">
                  by AI Growth Partners
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#D6D3D1]">
              Demo chatbota AI dla firm lokalnych, usługowych i internetowych,
              które chcą szybciej odpowiadać klientom i porządkować zapytania.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {footerStatuses.map((status) => (
                <span
                  key={status}
                  className="flex items-center gap-2 rounded-full border border-[#22C55E]/12 bg-[#0B1F18]/[0.045] px-3 py-1.5 text-xs font-bold text-[#D6D3D1]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.65)]" />
                  {status}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:items-end">
            <div className="flex flex-wrap gap-3 text-sm">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-[#22C55E]/12 bg-[#0B1F18]/[0.035] px-3 py-2 font-semibold text-[#7FA99B] transition duration-300 hover:-translate-y-0.5 hover:border-[#86EFAC]/35 hover:bg-[#0B1F18]/[0.07] hover:text-[#86EFAC]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-xs leading-5 text-[#7FA99B] md:text-right">
              © 2026 AI Growth Partners. Demo systemu AI dla automatyzacji obsługi zapytań.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
