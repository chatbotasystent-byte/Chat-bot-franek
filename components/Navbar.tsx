const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Demo", href: "#demo" },
  { label: "Branże", href: "#branze" },
  { label: "Kontakt", href: "#kontakt" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/78 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a href="#" className="flex items-center gap-3" aria-label="AI Growth Partners - strona główna">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.22)]">
            AI
          </span>
          <span className="text-sm font-semibold text-white sm:text-base">
            AI Growth Partners
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
          className="cta-shine rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_42px_rgba(34,211,238,0.38)]"
        >
          Darmowy audyt
        </a>
      </nav>
    </header>
  );
}
