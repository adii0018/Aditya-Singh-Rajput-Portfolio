"use client";

import React, { useState } from "react";

interface WavingOctocatProps {
  size?: number;
  className?: string;
}

export default function WavingOctocat({ size = 70, className = "" }: WavingOctocatProps) {
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
        className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#242426] text-white text-[11px] font-mono rounded-full border border-white/10 shadow-lg pointer-events-none transition-all duration-300 whitespace-nowrap flex items-center gap-1 z-20 ${
          isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-90"
        }`}
      >
        <span>👋</span>
        <span>Hi, visitor!</span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#242426] rotate-45 border-r border-b border-white/10" />
      </div>

      {/* Card Container */}
      <div className="relative p-2.5 sm:p-3 rounded-2xl bg-white border border-[#24242215] shadow-sm hover:shadow-md hover:border-[#40c46360] transition-all flex items-center justify-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#40c46308] to-transparent pointer-events-none" />

        {/* Pulsing online status indicator */}
        <span className="absolute top-2 right-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40c463] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#40c463]"></span>
        </span>

        {/* GitHub Octocat SVG */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 overflow-visible transition-transform duration-300 group-hover:scale-105"
        >
          <style>{`
            .octo-arm {
              transform-origin: 66px 62px;
              animation: octoWave 1.6s ease-in-out infinite;
            }
            .group:hover .octo-arm {
              animation: octoWaveFast 0.8s ease-in-out infinite;
            }
            .octo-tail {
              transform-origin: 68px 84px;
              animation: octoTail 2.4s ease-in-out infinite;
            }
            .octo-eye {
              animation: octoBlink 4s infinite;
            }

            @keyframes octoWave {
              0%, 100% {
                transform: rotate(0deg);
              }
              20% {
                transform: rotate(-28deg);
              }
              40% {
                transform: rotate(16deg);
              }
              60% {
                transform: rotate(-22deg);
              }
              80% {
                transform: rotate(10deg);
              }
            }

            @keyframes octoWaveFast {
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

            @keyframes octoTail {
              0%, 100% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(-12deg);
              }
            }

            @keyframes octoBlink {
              0%, 96%, 100% {
                transform: scaleY(1);
              }
              98% {
                transform: scaleY(0.1);
              }
            }
          `}</style>

          {/* Tail (swaying) */}
          <g className="octo-tail">
            <path
              d="M 68 82 C 78 82 88 76 86 64 C 85 58 78 60 79 65 C 80 70 74 76 66 78 Z"
              fill="#242426"
            />
          </g>

          {/* Body */}
          <path
            d="M 33 66 C 29 82 32 93 50 93 C 68 93 71 82 67 66 Z"
            fill="#242426"
          />

          {/* Belly Patch */}
          <path
            d="M 40 70 C 37 82 38 89 50 89 C 62 89 63 82 60 70 Z"
            fill="#ebeff5"
          />

          {/* Left Paw (resting on chest) */}
          <path
            d="M 34 73 C 34 78 42 80 43 75 C 44 71 37 68 34 73 Z"
            fill="#242426"
          />
          <circle cx="39" cy="74" r="1.5" fill="#f87171" opacity="0.4" />

          {/* Head */}
          <ellipse cx="50" cy="45" rx="25" ry="22" fill="#242426" />

          {/* Ears */}
          {/* Left Ear */}
          <path d="M 28 34 L 18 10 L 41 24 Z" fill="#242426" />
          <path d="M 29 30 L 22 15 L 37 24 Z" fill="#f87171" opacity="0.45" />

          {/* Right Ear */}
          <path d="M 72 34 L 82 10 L 59 24 Z" fill="#242426" />
          <path d="M 71 30 L 78 15 L 63 24 Z" fill="#f87171" opacity="0.45" />

          {/* Face Area (Mona Octocat subtle lighter mask) */}
          <ellipse cx="50" cy="48" rx="19" ry="14" fill="#303136" />

          {/* Eyes (with blink animation) */}
          <g className="octo-eye" style={{ transformOrigin: "50% 46%" }}>
            {/* Left Eye */}
            <circle cx="42" cy="46" r="4" fill="#ffffff" />
            <circle cx="43" cy="46" r="2.2" fill="#0d1117" />
            <circle cx="44" cy="45" r="0.9" fill="#ffffff" />

            {/* Right Eye */}
            <circle cx="58" cy="46" r="4" fill="#ffffff" />
            <circle cx="57" cy="46" r="2.2" fill="#0d1117" />
            <circle cx="58" cy="45" r="0.9" fill="#ffffff" />
          </g>

          {/* Cute Nose */}
          <path d="M 48.5 51.5 L 51.5 51.5 L 50 53.5 Z" fill="#f87171" />

          {/* Cat Smile / Mouth */}
          <path
            d="M 46.5 53.5 Q 50 56.5 50 54 Q 50 56.5 53.5 53.5"
            stroke="#ebeff5"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Whiskers */}
          {/* Left Whiskers */}
          <line x1="22" y1="48" x2="34" y2="49.5" stroke="#7d8590" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="23" y1="53" x2="34" y2="52" stroke="#7d8590" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Right Whiskers */}
          <line x1="78" y1="48" x2="66" y2="49.5" stroke="#7d8590" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="77" y1="53" x2="66" y2="52" stroke="#7d8590" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Waving Arm & Paw (Foreground, smoothly animated) */}
          <g className="octo-arm">
            {/* Arm */}
            <path
              d="M 64 64 C 71 58 79 46 81 33 C 81 28 73 28 71 33 C 68 41 62 52 58 64 Z"
              fill="#242426"
            />
            {/* Paw rounded top */}
            <ellipse cx="76" cy="31" rx="5" ry="4.5" fill="#242426" />
            {/* Cute Paw Pad (Pink) */}
            <ellipse cx="76" cy="31" rx="3" ry="2.5" fill="#f87171" opacity="0.8" />
            {/* Little finger pads */}
            <circle cx="73" cy="28" r="1.1" fill="#f87171" opacity="0.8" />
            <circle cx="76" cy="27" r="1.1" fill="#f87171" opacity="0.8" />
            <circle cx="79" cy="28" r="1.1" fill="#f87171" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
