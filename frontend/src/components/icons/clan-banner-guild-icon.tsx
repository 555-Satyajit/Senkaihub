interface ClanBannerGuildIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  active?: boolean;
}

export function ClanBannerGuildIcon({ className, active = false, ...props }: ClanBannerGuildIconProps) {
  if (active) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 64 64" 
        width="64" 
        height="64" 
        fill="none"
        className={className}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        <defs>
          <linearGradient id="bannerVelvet" x1="16" y1="8" x2="48" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff5722"/>
            <stop offset="40%" stopColor="#e11d48"/>
            <stop offset="100%" stopColor="#991b1b"/>
          </linearGradient>
          <linearGradient id="goldTrim" x1="16" y1="8" x2="48" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a"/>
            <stop offset="40%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#b45309"/>
          </linearGradient>
          <linearGradient id="flameBladeGrad" x1="32" y1="20" x2="32" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffbeb"/>
            <stop offset="25%" stopColor="#fef08a"/>
            <stop offset="60%" stopColor="#ff3b20"/>
            <stop offset="100%" stopColor="#991b1b"/>
          </linearGradient>
          <filter id="bannerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#ff3b20" floodOpacity="0.5"/>
          </filter>
        </defs>

        <g filter="url(#bannerGlow)">
          <rect x="12" y="9" width="40" height="3" rx="1.5" fill="#1c1917" stroke="url(#goldTrim)" strokeWidth="0.75"/>
          <circle cx="11.5" cy="10.5" r="2.5" fill="url(#goldTrim)"/>
          <circle cx="11.5" cy="10.5" r="1.2" fill="#fffbeb"/>
          <circle cx="52.5" cy="10.5" r="2.5" fill="url(#goldTrim)"/>
          <circle cx="52.5" cy="10.5" r="1.2" fill="#fffbeb"/>

          <rect x="18" y="7.5" width="2.5" height="4.5" rx="1" fill="url(#goldTrim)"/>
          <rect x="43.5" y="7.5" width="2.5" height="4.5" rx="1" fill="url(#goldTrim)"/>

          <path 
            d="M15 12 L49 12 L49 44 L32 55 L15 44 Z" 
            fill="url(#bannerVelvet)" 
            stroke="url(#goldTrim)" 
            strokeWidth="1.3" 
            strokeLinejoin="round"
          />

          <path 
            d="M18 15 L46 15 L46 42 L32 51.5 L18 42 Z" 
            stroke="#ffe4e6" 
            strokeWidth="0.8" 
            strokeOpacity="0.35" 
            fill="none"
          />

          <path d="M15 12 L32 12 L32 55 L15 44 Z" fill="#000000" fillOpacity="0.18"/>

          <g>
            <polygon points="21,19 23,17 44,38 42,40" fill="#f8fafc"/>
            <line x1="22" y1="18" x2="43" y2="39" stroke="#cbd5e1" strokeWidth="0.6"/>
            <polygon points="40,36 44,34 46,38 42,40" fill="url(#goldTrim)"/>
            <line x1="43" y1="39" x2="47" y2="43" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="43" y1="39" x2="47" y2="43" stroke="url(#goldTrim)" strokeWidth="1.8" strokeDasharray="1 1" strokeLinecap="round"/>
          </g>

          <g>
            <polygon points="41,17 43,19 22,40 20,38" fill="#e2e8f0"/>
            <line x1="42" y1="18" x2="21" y2="39" stroke="#ffffff" strokeWidth="0.6"/>
            <polygon points="24,36 20,34 18,38 22,40" fill="url(#goldTrim)"/>
            <line x1="21" y1="39" x2="17" y2="43" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="21" y1="39" x2="17" y2="43" stroke="url(#goldTrim)" strokeWidth="1.8" strokeDasharray="1 1" strokeLinecap="round"/>
          </g>

          <polygon 
            points="32,20 40,29 32,38 24,29" 
            fill="#090a0f" 
            stroke="url(#goldTrim)" 
            strokeWidth="1.2" 
            strokeLinejoin="round"
          />

          <path 
            d="M32 23 C34.5 26, 36.5 28, 35.5 31.5 C34.8 34, 32.5 35.5 32 35.8 C31.5 35.5, 29.2 34, 28.5 31.5 C27.5 28, 29.5 26, 32 23 Z" 
            fill="url(#flameBladeGrad)"
          />
          <polygon points="32,28.5 33.8,31.5 32,34 30.2,31.5" fill="#ffffff"/>

          <circle cx="32" cy="18.5" r="1" fill="#fef08a"/>
          <circle cx="32" cy="39.5" r="1" fill="#fef08a"/>
          <circle cx="22.5" cy="29" r="1" fill="#fef08a"/>
          <circle cx="41.5" cy="29" r="1" fill="#fef08a"/>

          <polygon points="32,55 29.5,59 34.5,59" fill="url(#goldTrim)"/>
          <circle cx="32" cy="60.5" r="1.3" fill="url(#goldTrim)"/>
        </g>

        <circle cx="12" cy="36" r="0.9" fill="#fef08a" opacity="0.85"/>
        <circle cx="52" cy="36" r="0.9" fill="#fef08a" opacity="0.85"/>
      </svg>
    );
  }

  // Unselected State: Clean monochrome white / stroke matching other icons
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="64" 
      height="64" 
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Top Crossbar */}
      <line x1="12" y1="10" x2="52" y2="10" strokeWidth="2.8" />
      <circle cx="11" cy="10" r="2" fill="currentColor" stroke="none" />
      <circle cx="53" cy="10" r="2" fill="currentColor" stroke="none" />

      {/* Hanging Loops */}
      <rect x="18" y="7" width="3" height="4" rx="1" fill="currentColor" stroke="none" />
      <rect x="43" y="7" width="3" height="4" rx="1" fill="currentColor" stroke="none" />

      {/* Banner Outline */}
      <path d="M15 12 L49 12 L49 44 L32 55 L15 44 Z" />

      {/* Crossed Blades */}
      <line x1="23" y1="20" x2="41" y2="38" strokeWidth="2" />
      <line x1="41" y1="20" x2="23" y2="38" strokeWidth="2" />

      {/* Center Crest Diamond */}
      <polygon points="32,23 38,29 32,35 26,29" strokeWidth="1.8" />

      {/* Center Emblem Core */}
      <circle cx="32" cy="29" r="1.5" fill="currentColor" stroke="none" />

      {/* Bottom Tassel Finial */}
      <polyline points="30,55 32,59 34,55" strokeWidth="2" />
    </svg>
  );
}
