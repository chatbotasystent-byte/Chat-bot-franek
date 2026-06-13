import { ChatWidget } from "@/components/ChatWidget";

const highlights = [
  "analiza branży",
  "pomysły na AI",
  "rekomendacja chatbota",
  "zachęta do zostawienia kontaktu"
];

const suggestions = [
  "Mam firmę usługową",
  "Mam salon beauty",
  "Mam warsztat samochodowy",
  "Mam komis samochodowy",
  "Chcę zostawić kontakt"
];

export function ChatDemoSection() {
  return (
    <section id="demo" className="relative px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_40%,rgba(15,138,108,0.16),transparent_30rem),radial-gradient(circle_at_80%_20%,rgba(134,239,172,0.12),transparent_30rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-3xl border border-[#86EFAC]/14 bg-[#0B1F18]/[0.06] p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur sm:p-8">
          <p className="inline-flex rounded-full border border-[#86EFAC]/25 bg-[#86EFAC]/10 px-3 py-1 text-sm font-semibold text-[#86EFAC]">
            Demo AI
          </p>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
            Przetestuj demo konsultanta AI
          </h2>
          <p className="mt-4 leading-7 text-[#D6D3D1]">
            Napisz, jaką prowadzisz firmę, a chatbot podpowie, jakie
            automatyzacje mogą mieć sens.
          </p>
          <div className="mt-7 space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[#D6D3D1]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#86EFAC] text-[#F4FFF9]">
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                    <path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <ChatWidget suggestions={suggestions} />
      </div>
    </section>
  );
}

