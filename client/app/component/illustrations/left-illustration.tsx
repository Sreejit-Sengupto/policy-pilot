"use client";

export default function LeftIllustration() {
  return (
    <svg
      width="280"
      height="400"
      viewBox="0 0 280 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm"
    >
      {/* Gradients */}
      <defs>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a6b1e1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#424874" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffa726" stopOpacity="1" />
          <stop offset="100%" stopColor="#fb8c00" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Floating background circles */}
      <circle cx="40" cy="60" r="45" fill="none" stroke="#dcd6f7" strokeWidth="1.5" opacity="0.6" />
      <circle cx="240" cy="320" r="55" fill="none" stroke="#dcd6f7" strokeWidth="1.5" opacity="0.5" />

      {/* Geometric accents */}
      <g opacity="0.7">
        <rect x="20" y="40" width="35" height="35" fill="none" stroke="#424874" strokeWidth="2" rx="4" />
        <line x1="25" y1="45" x2="50" y2="70" stroke="#424874" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Head */}
      <circle cx="140" cy="85" r="22" fill="none" stroke="#424874" strokeWidth="2.5" />

      {/* Hair */}
      <path
        d="M 118 70 Q 110 50 125 40 Q 140 35 155 40 Q 170 50 162 70 Q 160 75 158 80"
        fill="none"
        stroke="#424874"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Face */}
      <circle cx="135" cy="82" r="2" fill="#424874" />
      <circle cx="145" cy="82" r="2" fill="#424874" />
      <path d="M 140 92 Q 138 95 140 97 Q 142 95 140 92" fill="#424874" />

      {/* Neck */}
      <line x1="140" y1="107" x2="140" y2="125" stroke="#424874" strokeWidth="2" />

      {/* Torso */}
      <path
        d="M 140 125 Q 125 145 120 170"
        stroke="#424874"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left arm */}
      <g>
        <path
          d="M 125 135 Q 100 120 90 100"
          stroke="#424874"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="88" cy="98" r="5" fill="none" stroke="#424874" strokeWidth="2" />
      </g>

      {/* Right arm with tablet */}
      <g>
        <path
          d="M 155 135 Q 180 130 195 140"
          stroke="#424874"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tablet */}
        <rect
          x="180"
          y="125"
          width="45"
          height="55"
          fill="none"
          stroke="url(#accentGrad)"
          strokeWidth="2.5"
          rx="6"
        />
        <rect x="185" y="130" width="35" height="35" fill="#ffa726" opacity="0.15" rx="3" />
        <line x1="187" y1="148" x2="218" y2="148" stroke="#ffa726" strokeWidth="1.5" opacity="0.6" />
        <line x1="187" y1="158" x2="218" y2="158" stroke="#ffa726" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* Legs */}
      <line x1="120" y1="170" x2="110" y2="230" stroke="#424874" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="140" y1="175" x2="135" y2="240" stroke="#424874" strokeWidth="2.5" strokeLinecap="round" />

      {/* Shoes */}
      <ellipse cx="110" cy="235" rx="8" ry="6" fill="#ffa726" opacity="0.7" />
      <ellipse cx="135" cy="245" rx="8" ry="6" fill="#ffa726" opacity="0.7" />

      {/* Data visualization bubbles */}
      <g opacity="0.8">
        <circle cx="60" cy="200" r="4" fill="#424874" />
        <circle cx="75" cy="220" r="5" fill="#ffa726" opacity="0.8" />
        <circle cx="90" cy="210" r="3.5" fill="#a6b1e1" />
        <line x1="60" y1="200" x2="75" y2="220" stroke="#dcd6f7" strokeWidth="1" opacity="0.5" />
        <line x1="75" y1="220" x2="90" y2="210" stroke="#dcd6f7" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Geometric floating bottom-right */}
      <g opacity="0.6">
        <path d="M 220 300 L 240 310 L 235 330 Z" fill="none" stroke="#424874" strokeWidth="2" />
        <circle cx="235" cy="315" r="12" fill="none" stroke="#ffa726" strokeWidth="1.5" opacity="0.8" />
      </g>

      {/* Progress line */}
      <g opacity="0.7">
        <line x1="30" y1="340" x2="80" y2="340" stroke="#dcd6f7" strokeWidth="2" />
        <line x1="30" y1="340" x2="55" y2="340" stroke="#ffa726" strokeWidth="2" />
      </g>

      {/* Bottom dots */}
      <g opacity="0.5">
        <circle cx="200" cy="370" r="2" fill="#424874" />
        <circle cx="220" cy="370" r="2" fill="#424874" />
        <circle cx="240" cy="370" r="2" fill="#424874" />
      </g>
    </svg>
  );
}
