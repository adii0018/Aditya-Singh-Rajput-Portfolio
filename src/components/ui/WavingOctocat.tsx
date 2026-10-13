"use client";

import React, { useState } from "react";

interface WavingOctocatProps {
  size?: number;
  className?: string;
}

export default function WavingOctocat({ size = 72, className = "" }: WavingOctocatProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center group cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="GitHub Octocat waving at you!"
    >
      {/* Speech Bubble on Hover */}
      <div
        className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#0d1117] text-[#e6edf3] text-[11px] font-mono rounded-full border border-[#30363d] shadow-xl pointer-events-none transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 z-30 ${
          isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-90"
        }`}
      >
        <span>👋</span>
        <span className="font-semibold text-white">Hi, dev!</span>
        <span className="text-[#39d353] text-[10px]">●</span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0d1117] rotate-45 border-r border-b border-[#30363d]" />
      </div>

      {/* Card Container (Dark GitHub Theme matching screenshot background) */}
      <div className="relative p-2 rounded-2xl bg-[#0d1117] border border-[#30363d] shadow-lg shadow-black/25 hover:shadow-xl hover:border-[#39d35380] transition-all flex items-center justify-center overflow-hidden">
        {/* Subtle green ambient glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#39d35310] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Pulsing online status indicator */}
        <span className="absolute top-2 right-2 flex h-2 w-2 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39d353] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39d353]"></span>
        </span>

        {/* Exact GitHub Invertocat Badge SVG */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 overflow-visible transition-transform duration-300 group-hover:scale-105"
        >
          <style>{`
            .gh-octo-arm {
              transform-origin: 59px 63px;
              animation: ghOctoWave 1.6s ease-in-out infinite;
            }
            .group:hover .gh-octo-arm {
              animation: ghOctoWaveFast 0.75s ease-in-out infinite;
            }
            .gh-octo-tail {
              transform-origin: 41px 75px;
              animation: ghOctoTail 2.4s ease-in-out infinite;
            }
            .gh-octo-head {
              transform-origin: 50px 56px;
              animation: ghOctoHead 3.2s ease-in-out infinite;
            }

            @keyframes ghOctoWave {
              0%, 100% {
                transform: rotate(0deg);
              }
              20% {
                transform: rotate(-26deg);
              }
              40% {
                transform: rotate(14deg);
              }
              60% {
                transform: rotate(-20deg);
              }
              80% {
                transform: rotate(8deg);
              }
            }

            @keyframes ghOctoWaveFast {
              0%, 100% {
                transform: rotate(0deg);
              }
              25% {
                transform: rotate(-32deg);
              }
              50% {
                transform: rotate(20deg);
              }
              75% {
                transform: rotate(-28deg);
              }
            }

            @keyframes ghOctoTail {
              0%, 100% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(-9deg);
              }
            }

            @keyframes ghOctoHead {
              0%, 100% {
                transform: rotate(0deg);
              }
              30% {
                transform: rotate(2deg);
              }
              70% {
                transform: rotate(-2deg);
              }
            }
          `}</style>

          {/* Slate Disc (Matching the user screenshot circle #737b86) */}
          <circle cx="50" cy="50" r="44" fill="#768390" />

          {/* Mask to clip bottom of body neatly within circle */}
          <defs>
            <clipPath id="octoDiscClip">
              <circle cx="50" cy="50" r="44" />
            </clipPath>
          </defs>

          <g clipPath="url(#octoDiscClip)">
            {/* Tail on Bottom-Left (Exact GitHub Cat Tail) */}
            <g className="gh-octo-tail">
              <path
                d="M 42 74 C 32 76 25 73 21 67 C 19 64 21 62 23 64 C 27 69 32 71 42 69 Z"
                fill="#0d1117"
              />
              <path
                d="M 42 72 C 30 76 23 72 20 66 C 18 62 21 61 23 63 C 27 68 33 70 42 67 Z"
                fill="#0d1117"
              />
            </g>

            {/* Torso & Neck */}
            <path
              d="M 42 56 C 41 68 39 80 38 95 L 62 95 C 61 80 59 68 58 56 Z"
              fill="#0d1117"
            />

            {/* Cat Head (The iconic silhouette with pointy ears) */}
            <g className="gh-octo-head">
              {/* Outer Silhouette of Head + Ears */}
              <path
                d="
                  M 33 34
                  C 31 29 29 22 28 17
                  C 28 16 30 16 31 17
                  C 36 21 40 25 43 27
                  C 45 28 47 28.5 50 28.5
                  C 53 28.5 55 28 57 27
                  C 60 25 64 21 69 17
                  C 70 16 72 16 72 17
                  C 71 22 69 29 67 34
                  C 72 40 73 48 70 54
                  C 67 59 62 62 50 62
                  C 38 62 33 59 30 54
                  C 27 48 28 40 33 34
                  Z
                "
                fill="#0d1117"
              />
            </g>

            {/* Waving Arm / Paw on the Right (Silhouette style matching the cat) */}
            <g className="gh-octo-arm">
              {/* Forearm extending out from shoulder */}
              <path
                d="
                  M 58 61
                  C 64 58 72 48 75 36
                  C 76 32 79 32 80 34
                  C 82 38 80 43 76 50
                  C 71 58 64 64 59 67
                  Z
                "
                fill="#0d1117"
              />
              {/* Waving Paw Top with cute silhouette fingers */}
              <ellipse cx="78" cy="34" rx="4.5" ry="4" fill="#0d1117" />
              <circle cx="75" cy="31" r="1.3" fill="#0d1117" />
              <circle cx="78" cy="30" r="1.3" fill="#0d1117" />
              <circle cx="81" cy="31" r="1.3" fill="#0d1117" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
