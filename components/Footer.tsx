export function Footer() {
  return (
    <footer className="border-t border-[#E8D7B9]/12 bg-[#171717] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-[#F7F2E8]">AI Automatyzacja</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#7FA99B]">
            Demo chatbota AI dla firm lokalnych, usługowych i internetowych,
            które chcą szybciej odpowiadać klientom i porządkować zapytania.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8D7B9]/70">
            by AI Growth Partners
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[#7FA99B]">
          <a href="#problem" className="transition hover:text-[#E8D7B9]">Problem</a>
          <a href="#demo" className="transition hover:text-[#E8D7B9]">Demo</a>
          <a href="#kontakt" className="transition hover:text-[#E8D7B9]">Kontakt</a>
          <a href="/polityka-prywatnosci" className="transition hover:text-[#E8D7B9]">Polityka prywatności</a>
        </div>
      </div>
    </footer>
  );
}
