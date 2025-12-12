"use client";

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full max-w-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Hero illustration"
    >
    
      <rect x="150" y="150" width="200" height="250" rx="12" fill="#DCD6F7" />
      <rect x="165" y="135" width="200" height="250" rx="12" fill="#A6B1E1" />
      <rect
        x="180"
        y="120"
        width="200"
        height="250"
        rx="12"
        fill="#FFFFFF"
        stroke="#424874"
        strokeWidth="2"
      />

      <line
        x1="210"
        y1="160"
        x2="350"
        y2="160"
        stroke="#CACFD6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="210"
        y1="190"
        x2="330"
        y2="190"
        stroke="#CACFD6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="210"
        y1="220"
        x2="350"
        y2="220"
        stroke="#CACFD6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="210"
        y1="250"
        x2="310"
        y2="250"
        stroke="#CACFD6"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="280" cy="310" r="40" fill="#FFA726" />
      <path
        d="M260 310 L275 325 L300 295"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <circle cx="100" cy="100" r="20" fill="#A6B1E1" opacity="0.5" />
      <circle cx="420" cy="120" r="15" fill="#FFA726" opacity="0.5" />
      <circle cx="90" cy="400" r="25" fill="#DCD6F7" opacity="0.5" />
      <circle cx="430" cy="380" r="18" fill="#A6B1E1" opacity="0.5" />
    </svg>
  );
}
