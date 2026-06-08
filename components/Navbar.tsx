const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Demo", href: "#demo" },
  { label: "Branże", href: "#branze" },
  { label: "Kontakt", href: "#kontakt" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8D7B9]/12 bg-[#171717]/86 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a href="#" className="flex items-center gap-3" aria-label="AI Automatyzacja - strona główna">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8D7B9]/30 bg-[#0F8A6C]/14 text-sm font-bold text-[#E8D7B9] shadow-[0_0_30px_rgba(15,138,108,0.2)]">
            AI
          </span>
          <span className="text-sm font-semibold text-white sm:text-base">
            AI Automatyzacja
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#kontakt"
          className="cta-shine rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#E8D7B9] px-4 py-2 text-sm font-semibold text-[#171717] shadow-[0_0_30px_rgba(15,138,108,0.24)] transition hover:scale-[1.02] hover:shadow-[0_0_42px_rgba(201,168,106,0.28)]"
        >
          Darmowy audyt
        </a>
      </nav>
    </header>
  );
}
