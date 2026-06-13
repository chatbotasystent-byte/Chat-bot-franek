import { AIDashboardIllustration } from "@/components/AIDashboardIllustration";

export function Hero() {
  return (
    <section className="relative px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_16%,rgba(15,138,108,0.22),transparent_34rem),radial-gradient(circle_at_82%_12%,rgba(134,239,172,0.14),transparent_32rem),radial-gradient(circle_at_50%_100%,rgba(14,42,36,0.24),transparent_26rem)]" />
      <div className="animate-float-slow animate-pulse-glow absolute left-[-8rem] top-20 -z-10 h-80 w-80 rounded-full bg-[#0F8A6C]/16 blur-3xl" />
      <div className="animate-float-delay animate-pulse-glow absolute right-[-6rem] top-10 -z-10 h-96 w-96 rounded-full bg-[#86EFAC]/14 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_560px] lg:items-center">
        <div>
          <div className="animate-fade-up inline-flex rounded-full border border-[#86EFAC]/25 bg-[#0B1F18]/[0.06] px-4 py-2 text-sm font-semibold text-[#86EFAC] shadow-[0_0_28px_rgba(134,239,172,0.14)] backdrop-blur">
            AI dla firm, które chcą działać szybciej
          </div>

          <h1 className="animate-fade-up animation-delay-150 mt-7 max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
            Wdrażamy chatboty AI i automatyzacje, które zamieniają
            odwiedzających w klientów
          </h1>

          <p className="animate-fade-up animation-delay-300 mt-6 max-w-2xl text-lg leading-8 text-[#D6D3D1]">
            Tworzymy spersonalizowane chatboty, formularze i automatyzacje,
            które odpowiadają klientom 24/7, zbierają leady i przekazują dane
            do Google Sheets, CRM lub Make.
          </p>

          <div className="animate-fade-up animation-delay-450 mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="cta-shine rounded-full bg-gradient-to-r from-[#0F8A6C] to-[#86EFAC] px-6 py-3 text-sm font-semibold text-[#F4FFF9] shadow-[0_0_36px_rgba(15,138,108,0.28)] transition hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(34,197,94,0.26)]"
            >
              Zamów demo AI
            </a>
            <a
              href="#jak-dzialamy"
              className="rounded-full border border-[#86EFAC]/18 bg-[#0B1F18]/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-[#86EFAC]/45 hover:bg-[#0B1F18]/[0.1]"
            >
              Zobacz jak to działa
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-2 text-sm text-[#D6D3D1]">
            {["Demo w 24-72h", "Bez kodowania po stronie klienta", "Integracje z Google Sheets"].map((item) => (
              <span key={item} className="rounded-full border border-[#86EFAC]/12 bg-[#0B1F18]/[0.05] px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>

        <AIDashboardIllustration />
      </div>
    </section>
  );
}

