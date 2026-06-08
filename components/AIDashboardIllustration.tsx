export function AIDashboardIllustration() {
  return (
    <div className="animate-fade-up animation-delay-450 relative">
      <div className="animate-soft-pulse absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle,rgba(34,211,238,0.28),transparent_58%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.2),transparent_42%)] blur-2xl" />
      <div className="glass-card relative overflow-hidden rounded-[2rem] p-4 shadow-2xl shadow-cyan-950/40">
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

          <rect x="34" y="30" width="492" height="360" rx="34" fill="url(#panelBg)" stroke="white" strokeOpacity="0.12" filter="url(#softGlow)" />
          <circle cx="78" cy="68" r="6" fill="#67e8f9" />
          <circle cx="100" cy="68" r="6" fill="#818cf8" />
          <circle cx="122" cy="68" r="6" fill="#34d399" />
          <text x="70" y="112" fill="#f8fafc" fontSize="24" fontWeight="700">System obsługi zapytań</text>
          <text x="70" y="140" fill="#94a3b8" fontSize="14">Rozmowa, kwalifikacja i lead w jednym przepływie</text>

          <path d="M164 230H270" stroke="url(#cardAccent)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.65" />
          <path d="M356 230H462" stroke="url(#cardAccent)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.65" />

          <g className="animate-float-slow">
            <rect x="64" y="176" width="140" height="122" rx="24" fill="white" fillOpacity="0.08" stroke="#67e8f9" strokeOpacity="0.28" />
            <circle cx="96" cy="214" r="18" fill="#67e8f9" fillOpacity="0.18" />
            <path d="M88 213h24M96 205v20" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
            <text x="88" y="252" fill="#f8fafc" fontSize="17" fontWeight="700">AI Chatbot</text>
            <text x="88" y="276" fill="#cbd5e1" fontSize="12">odpowiada 24/7</text>
          </g>

          <g className="animate-float-delay">
            <rect x="230" y="162" width="132" height="150" rx="24" fill="white" fillOpacity="0.1" stroke="#818cf8" strokeOpacity="0.32" />
            <text x="260" y="206" fill="#f8fafc" fontSize="17" fontWeight="700">Nowy lead</text>
            <rect x="260" y="226" width="72" height="8" rx="4" fill="#c4b5fd" fillOpacity="0.72" />
            <rect x="260" y="246" width="92" height="8" rx="4" fill="white" fillOpacity="0.22" />
            <rect x="260" y="266" width="62" height="8" rx="4" fill="white" fillOpacity="0.18" />
            <circle cx="296" cy="294" r="5" fill="#34d399" />
          </g>

          <g className="animate-float-slow">
            <rect x="392" y="176" width="142" height="122" rx="24" fill="white" fillOpacity="0.08" stroke="#34d399" strokeOpacity="0.32" />
            <text x="422" y="222" fill="#f8fafc" fontSize="16" fontWeight="700">Google Sheets</text>
            <text x="422" y="244" fill="#f8fafc" fontSize="16" fontWeight="700">/ CRM</text>
            <path d="M424 270h74M424 286h52" stroke="#34d399" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.68" />
          </g>

          <rect x="88" y="332" width="386" height="34" rx="17" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" />
          <circle cx="118" cy="349" r="3" fill="#67e8f9" fillOpacity="0.75" />
          <circle cx="234" cy="349" r="3" fill="#818cf8" fillOpacity="0.75" />
          <circle cx="350" cy="349" r="3" fill="#34d399" fillOpacity="0.75" />
          <text x="130" y="354" fill="#cbd5e1" fontSize="13">Klient pyta</text>
          <text x="246" y="354" fill="#cbd5e1" fontSize="13">AI odpowiada</text>
          <text x="362" y="354" fill="#cbd5e1" fontSize="13">lead trafia do zespołu</text>
        </svg>
      </div>
    </div>
  );
}
