import { ChatWidget } from "@/components/ChatWidget";

const highlights = [
  "analiza branży",
  "pomysły na AI",
  "rekomendacja chatbota",
  "zachęta do zostawienia kontaktu"
];

const suggestions = [
  "Mam restaurację",
  "Mam salon beauty",
  "Mam firmę usługową",
  "Chcę zbierać leady"
];

export function ChatDemoSection() {
  return (
    <section id="demo" className="relative px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_40%,rgba(34,211,238,0.14),transparent_30rem),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_30rem)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-8">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-200">
            Demo AI
          </p>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
            Przetestuj demo konsultanta AI
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            Napisz, jaką prowadzisz firmę, a chatbot podpowie, jakie
            automatyzacje mogą mieć sens.
          </p>
          <div className="mt-7 space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300 text-slate-950">
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
