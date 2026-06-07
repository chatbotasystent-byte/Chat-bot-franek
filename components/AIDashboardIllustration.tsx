export function AIDashboardIllustration() {
  return (
    <div className="animate-fade-up animation-delay-450 relative">
      <div className="animate-pulse-glow absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-emerald-400/10 blur-2xl" />
      <div className="relative rounded-[2rem] border border-white/14 bg-white/[0.08] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
        <svg
          className="h-auto w-full"
          viewBox="0 0 560 460"
          fill="none"
          role="img"
          aria-label="Mockup dashboardu AI z chatem, leadami, wykresem i automatyzacją"
        >
          <defs>
            <linearGradient id="dashPanel" x1="40" y1="30" x2="520" y2="430">
              <stop stopColor="#111827" />
              <stop offset="1" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="dashAccent" x1="95" y1="72" x2="430" y2="376">
              <stop stopColor="#67e8f9" />
              <stop offset="0.52" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <filter id="dashGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#22d3ee" floodOpacity="0.2" />
            </filter>
          </defs>

          <rect x="34" y="34" width="492" height="356" rx="30" fill="url(#dashPanel)" stroke="white" strokeOpacity="0.14" filter="url(#dashGlow)" />
          <path d="M72 96h416M72 174h416M72 252h416M172 66v294M314 66v294M444 66v294" stroke="white" strokeOpacity="0.05" />
          <circle cx="76" cy="68" r="7" fill="#67e8f9" />
          <circle cx="100" cy="68" r="7" fill="#a78bfa" />
          <circle cx="124" cy="68" r="7" fill="#34d399" />

          <rect x="72" y="108" width="190" height="132" rx="22" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" />
          <text x="94" y="139" fill="#e2e8f0" fontSize="14" fontWeight="700">Mini chat AI</text>
          <rect x="94" y="158" width="118" height="20" rx="10" fill="#67e8f9" fillOpacity="0.18" />
          <rect x="126" y="188" width="106" height="20" rx="10" fill="#a78bfa" fillOpacity="0.2" />
          <rect x="94" y="214" width="132" height="14" rx="7" fill="white" fillOpacity="0.18" />

          <rect x="288" y="104" width="182" height="136" rx="22" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" />
          <text x="310" y="135" fill="#e2e8f0" fontSize="14" fontWeight="700">Leady</text>
          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(310 ${154 + row * 28})`}>
              <circle cx="8" cy="8" r="8" fill="#34d399" fillOpacity="0.8" />
              <rect x="26" y="2" width="94" height="6" rx="3" fill="white" fillOpacity="0.24" />
              <rect x="26" y="14" width="58" height="5" rx="2.5" fill="white" fillOpacity="0.14" />
            </g>
          ))}

          <rect x="76" y="268" width="194" height="80" rx="22" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" />
          <text x="98" y="298" fill="#e2e8f0" fontSize="14" fontWeight="700">Wzrost zapytań</text>
          <path d="M100 330c30-26 48-12 72-28 26-18 44-6 76-32" stroke="url(#dashAccent)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="248" cy="270" r="6" fill="#67e8f9" />

          <rect x="300" y="278" width="160" height="76" rx="22" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" />
          <text x="322" y="310" fill="#e2e8f0" fontSize="14" fontWeight="700">Google Sheets / CRM</text>
          <path d="M324 330h104M324 342h78" stroke="#34d399" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.65" />

          <path d="M262 175c22-12 35-12 57 0M378 240c0 24-3 32 0 56M270 308c20 0 35 0 52 0" stroke="url(#dashAccent)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 10" />
          <path d="M315 166l14 9-14 9M371 292l7 14 7-14M318 300l14 8-14 8" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          <g className="animate-float-slow">
            <g transform="translate(24 286)">
              <rect width="150" height="62" rx="18" fill="#0f172a" stroke="#67e8f9" strokeOpacity="0.35" />
              <text x="18" y="27" fill="#67e8f9" fontSize="12" fontWeight="700">Lead automation</text>
              <text x="18" y="45" fill="#cbd5e1" fontSize="11">Chatbot → Arkusz</text>
            </g>
          </g>
          <g className="animate-float-delay">
            <g transform="translate(360 40)">
              <rect width="154" height="58" rx="18" fill="#0f172a" stroke="#a78bfa" strokeOpacity="0.4" />
              <text x="18" y="26" fill="#c4b5fd" fontSize="12" fontWeight="700">Google Sheets ready</text>
              <text x="18" y="43" fill="#cbd5e1" fontSize="11">jeden panel leadów</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
