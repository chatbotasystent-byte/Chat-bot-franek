export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-teal-200/45 via-white/30 to-rose-200/45 blur-2xl" />
      <div className="rounded-2xl border border-white/80 bg-white/82 p-4 shadow-soft backdrop-blur">
        <svg
          className="h-auto w-full"
          viewBox="0 0 520 430"
          fill="none"
          role="img"
          aria-label="Ilustracja pokazująca chatbota AI, przepływ wiadomości i automatyzację leadów"
        >
          <defs>
            <linearGradient id="panel" x1="64" x2="456" y1="36" y2="392">
              <stop stopColor="#0f172a" />
              <stop offset="1" stopColor="#1f2933" />
            </linearGradient>
            <linearGradient id="accent" x1="142" x2="365" y1="96" y2="316">
              <stop stopColor="#14b8a6" />
              <stop offset="1" stopColor="#8f3f54" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="20"
                stdDeviation="18"
                floodColor="#0f172a"
                floodOpacity="0.18"
              />
            </filter>
          </defs>

          <rect
            x="38"
            y="34"
            width="444"
            height="344"
            rx="28"
            fill="url(#panel)"
            filter="url(#softShadow)"
          />
          <path
            d="M72 104h376M72 184h376M72 264h376M152 66v286M270 66v286M388 66v286"
            stroke="white"
            strokeOpacity="0.06"
          />
          <circle cx="90" cy="72" r="7" fill="#14b8a6" />
          <circle cx="114" cy="72" r="7" fill="#fde68a" />
          <circle cx="138" cy="72" r="7" fill="#fb7185" />

          <rect x="78" y="112" width="178" height="72" rx="18" fill="white" />
          <rect x="100" y="132" width="98" height="8" rx="4" fill="#cbd5e1" />
          <rect x="100" y="150" width="128" height="8" rx="4" fill="#e2e8f0" />
          <circle cx="226" cy="148" r="16" fill="#ccfbf1" />
          <path
            d="M219 148h14M226 141v14"
            stroke="#0f766e"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <rect x="278" y="94" width="150" height="92" rx="20" fill="#f8fafc" />
          <path
            d="M310 130h68M310 150h46"
            stroke="#94a3b8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="392" cy="140" r="18" fill="#fce7f3" />
          <path
            d="M385 140h14"
            stroke="#be185d"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <rect x="102" y="226" width="134" height="74" rx="18" fill="#ecfeff" />
          <path
            d="M128 250h80M128 270h54"
            stroke="#0891b2"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect x="286" y="232" width="128" height="76" rx="18" fill="#f0fdf4" />
          <path
            d="M314 254h72M314 274h42"
            stroke="#16a34a"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M238 146c34-20 58-19 84 2M238 264c36 20 67 20 100 0"
            stroke="url(#accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 10"
          />
          <path
            d="M329 139l13 7-13 7M328 257l14 7-14 7"
            stroke="#14b8a6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g transform="translate(176 302)">
            <rect width="170" height="86" rx="24" fill="url(#accent)" />
            <circle cx="50" cy="43" r="21" fill="white" fillOpacity="0.92" />
            <path
              d="M43 44h14M50 37v14"
              stroke="#0f172a"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M86 33h48M86 53h30"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeOpacity="0.86"
            />
          </g>

          <circle cx="438" cy="316" r="34" fill="#ffffff" fillOpacity="0.92" />
          <path
            d="M423 317h30M423 304h30M423 330h20"
            stroke="#16a34a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M417 298v38M433 298v38M449 298v38"
            stroke="#16a34a"
            strokeWidth="2"
            strokeOpacity="0.45"
          />
        </svg>
      </div>
    </div>
  );
}
