export function AIDashboardIllustration() {
  return (
    <div className="animate-fade-up animation-delay-450 relative">
      <div className="animate-soft-pulse absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_58%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.14),transparent_42%)] blur-2xl" />
      <div className="glass-card relative overflow-hidden rounded-[2rem] p-5 shadow-2xl shadow-cyan-950/30 sm:p-6">
        <svg
          className="h-auto w-full"
          viewBox="0 0 560 430"
          fill="none"
          role="img"
          aria-label="Mockup procesu: AI Chatbot zbiera lead i przekazuje go do Google Sheets lub CRM"
        >
          <defs>
            <linearGradient id="panelBg" x1="42" y1="34" x2="516" y2="398">
              <stop stopColor="#0f172a" />
              <stop offset="1" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="cardAccent" x1="92" y1="88" x2="438" y2="324">
              <stop stopColor="#67e8f9" />
              <stop offset="0.52" stopColor="#818cf8" />
              <stop offset="1" stopColor="#34d399" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#22d3ee" floodOpacity="0.16" />
            </filter>
          </defs>

          <rect x="42" y="34" width="476" height="354" rx="34" fill="url(#panelBg)" stroke="white" strokeOpacity="0.12" filter="url(#softGlow)" />
          <circle cx="78" cy="68" r="6" fill="#67e8f9" />
          <circle cx="100" cy="68" r="6" fill="#818cf8" />
          <circle cx="122" cy="68" r="6" fill="#34d399" />
          <text x="280" y="112" textAnchor="middle" fill="#f8fafc" fontSize="24" fontWeight="700">System obsługi zapytań</text>
          <text x="280" y="140" textAnchor="middle" fill="#94a3b8" fontSize="14">Rozmowa, kwalifikacja i lead w jednym przepływie</text>

          <path d="M192 236H222" stroke="url(#cardAccent)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.36" />
          <path d="M338 236H368" stroke="url(#cardAccent)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.36" />

          <g className="animate-float-slow">
            <rect x="76" y="180" width="116" height="116" rx="20" fill="white" fillOpacity="0.08" stroke="#67e8f9" strokeOpacity="0.26" />
            <circle cx="134" cy="212" r="15" fill="#67e8f9" fillOpacity="0.18" />
            <path d="M127 211h14M134 204v14" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
            <text x="134" y="253" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700">AI Chatbot</text>
            <text x="134" y="276" textAnchor="middle" fill="#cbd5e1" fontSize="11">odpowiada 24/7</text>
          </g>

          <g className="animate-float-delay">
            <rect x="222" y="180" width="116" height="116" rx="20" fill="white" fillOpacity="0.1" stroke="#818cf8" strokeOpacity="0.3" />
            <text x="280" y="218" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="700">Nowy lead</text>
            <rect x="250" y="238" width="60" height="8" rx="4" fill="#c4b5fd" fillOpacity="0.72" />
            <rect x="240" y="258" width="80" height="8" rx="4" fill="white" fillOpacity="0.22" />
            <rect x="256" y="278" width="48" height="8" rx="4" fill="white" fillOpacity="0.18" />
            <circle cx="280" cy="202" r="5" fill="#34d399" />
          </g>

          <g className="animate-float-slow">
            <rect x="368" y="180" width="116" height="116" rx="20" fill="white" fillOpacity="0.08" stroke="#34d399" strokeOpacity="0.3" />
            <text x="426" y="219" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700">Google Sheets</text>
            <text x="426" y="240" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="700">/ CRM</text>
            <path d="M398 267h56M408 283h36" stroke="#34d399" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.64" />
          </g>

          <rect x="72" y="330" width="416" height="42" rx="21" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" />
          <circle cx="104" cy="351" r="3" fill="#67e8f9" fillOpacity="0.75" />
          <circle cx="230" cy="351" r="3" fill="#818cf8" fillOpacity="0.75" />
          <circle cx="356" cy="351" r="3" fill="#34d399" fillOpacity="0.75" />
          <text x="116" y="356" fill="#cbd5e1" fontSize="11.5">Klient pyta</text>
          <text x="242" y="356" fill="#cbd5e1" fontSize="11.5">AI odpowiada</text>
          <text x="368" y="356" fill="#cbd5e1" fontSize="11.5">lead do zespołu</text>
        </svg>
      </div>
    </div>
  );
}
