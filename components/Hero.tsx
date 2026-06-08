import { AIDashboardIllustration } from "@/components/AIDashboardIllustration";

export function Hero() {
  return (
    <section className="relative px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_16%,rgba(34,211,238,0.18),transparent_34rem),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.22),transparent_32rem),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_26rem)]" />
      <div className="animate-float-slow animate-pulse-glow absolute left-[-8rem] top-20 -z-10 h-80 w-80 rounded-full bg-cyan-400/16 blur-3xl" />
      <div className="animate-float-delay animate-pulse-glow absolute right-[-6rem] top-10 -z-10 h-96 w-96 rounded-full bg-violet-500/18 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_560px] lg:items-center">
        <div>
          <div className="animate-fade-up inline-flex rounded-full border border-cyan-300/25 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.16)] backdrop-blur">
            AI dla firm, które chcą działać szybciej
          </div>

          <h1 className="animate-fade-up animation-delay-150 mt-7 max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
            Wdrażamy chatboty AI i automatyzacje, które zamieniają
            odwiedzających w klientów
          </h1>

          <p className="animate-fade-up animation-delay-300 mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Tworzymy spersonalizowane chatboty, formularze i automatyzacje,
            które odpowiadają klientom 24/7, zbierają leady i przekazują dane
            do Google Sheets, CRM lub Make.
          </p>

          <div className="animate-fade-up animation-delay-450 mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="cta-shine rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.32)] transition hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(34,211,238,0.44)]"
            >
              Zamów demo AI
            </a>
            <a
              href="#jak-dzialamy"
              className="rounded-full border border-white/14 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/45 hover:bg-white/[0.1]"
            >
              Zobacz jak to działa
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-2 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
              Demo w 24-72h
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
              Bez kodowania po stronie klienta
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
              Integracje z Google Sheets
            </span>
          </div>
        </div>

        <AIDashboardIllustration />
      </div>
    </section>
  );
}
