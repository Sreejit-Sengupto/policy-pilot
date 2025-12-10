"use client";

export default function RightIllustration() {
  return (
    <svg
      width="250"
      height="350"
      viewBox="0 0 250 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs"
    >
      {/* Tall rectangle - yellow accent */}
      <rect
        x="30"
        y="100"
        width="50"
        height="180"
        fill="none"
        stroke="#424874"
        strokeWidth="2"
      />
      <rect
        x="35"
        y="110"
        width="40"
        height="160"
        fill="#FFF176"
        stroke="#424874"
        strokeWidth="1.5"
      />

      {/* Tall rectangle - white */}
      <rect
        x="120"
        y="80"
        width="50"
        height="200"
        fill="none"
        stroke="#424874"
        strokeWidth="2"
      />
      <rect
        x="125"
        y="90"
        width="40"
        height="180"
        fill="white"
        stroke="#424874"
        strokeWidth="1.5"
      />

      {/* Cloud shapes - left */}
      <path
        d="M 50 60 Q 40 50 35 60 Q 25 55 30 70 Q 35 75 50 75 Q 55 65 50 60 Z"
        fill="none"
        stroke="#424874"
        strokeWidth="2"
      />

      {/* Cloud shapes - right */}
      <path
        d="M 180 120 Q 170 110 165 120 Q 155 115 160 130 Q 165 135 180 135 Q 185 125 180 120 Z"
        fill="none"
        stroke="#424874"
        strokeWidth="2"
      />

      {/* Wavy line decoration */}
      <path
        d="M 20 200 Q 30 190 40 200 T 60 200 T 80 200 T 100 200 T 120 200 T 140 200 T 160 200 T 180 200 T 200 200 T 220 200"
        stroke="#A6B1E1"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Ground line */}
      <line
        x1="20"
        y1="320"
        x2="220"
        y2="320"
        stroke="#424874"
        strokeWidth="2"
      />
    </svg>
  );
}
