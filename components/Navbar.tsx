const navItems = [
  { label: "Jak działa", href: "#jak-dziala" },
  { label: "Zakres", href: "#zakres" },
  { label: "Dla kogo", href: "#branze" },
  { label: "Kontakt", href: "#kontakt" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#34D399]/14 bg-[#020403]/88 px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#" className="group flex min-w-0 items-center gap-3" aria-label="AI Automatyzacja - strona główna">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#34D399]/30 bg-gradient-to-br from-[#22C55E] to-[#0F8A6C] text-[#F4FFF9] shadow-[0_0_28px_rgba(34,197,94,0.24)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#86EFAC]/55 group-hover:shadow-[0_0_34px_rgba(34,197,94,0.28)]">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" fill="currentColor" />
              <path d="M18.5 13l.9 2.5L22 16.5l-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-1 .9-2.5Z" fill="currentColor" opacity="0.8" />
            </svg>
          </span>
          <span className="grid min-w-0 gap-0.5">
            <span className="truncate text-sm font-semibold text-[#F4FFF9] sm:text-base">AI Automatyzacja</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#7FA99B] sm:block">
              Asystent dla firm
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#D6D3D1] transition hover:text-[#86EFAC]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#kontakt" className="cta-primary cta-shine shrink-0 rounded-full px-4 py-2 text-sm">
          Kontakt
        </a>
      </nav>
    </header>
  );
}
