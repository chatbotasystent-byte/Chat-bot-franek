export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">AI Growth Partners</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Wdrażamy praktyczne AI dla firm, które chcą oszczędzać czas i
            lepiej obsługiwać klientów.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <a href="#uslugi" className="transition hover:text-white">Usługi</a>
          <a href="#demo" className="transition hover:text-white">Demo</a>
          <a href="#kontakt" className="transition hover:text-white">Kontakt</a>
          <span>Polityka prywatności</span>
        </div>
      </div>
    </footer>
  );
}
