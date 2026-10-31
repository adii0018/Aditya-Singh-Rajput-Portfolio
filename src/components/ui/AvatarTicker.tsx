"use client";

import React from "react";
import Image from "next/image";
import "./avatar-ticker.css";

interface AvatarTickerProps {
  label?: string;
  className?: string;
}

const AVATARS = [
  { src: "/avatars/avatar-1.jpg", alt: "Collaborator 1" },
  { src: "/avatars/avatar-2.jpg", alt: "Collaborator 2" },
  { src: "/avatars/avatar-3.jpg", alt: "Collaborator 3" },
  { src: "/avatars/avatar-4.jpg", alt: "Aditya Singh Rajput" },
  { src: "/avatars/avatar-5.jpg", alt: "Collaborator 5" },
  { src: "/avatars/avatar-6.jpg", alt: "Collaborator 6" },
];

export default function AvatarTicker({
  label = "Trusted by solopreneurs",
  className = "",
}: AvatarTickerProps) {
  return (
    <div className={`avatar-ticker-wrap flex flex-col gap-1 select-none ${className}`}>
      {/* Self-contained keyframe styles to guarantee 0-dependency instant animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes avatarTickerScroll {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .avatar-ticker-track {
              display: flex !important;
              width: max-content !important;
              animation: avatarTickerScroll 8s linear infinite !important;
              will-change: transform;
            }
            .avatar-ticker-wrap:hover .avatar-ticker-track {
              animation-play-state: paused !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .avatar-ticker-track {
                animation: none !important;
              }
            }
          `,
        }}
      />

      {/* Ticker viewport with Makro-style gradient edge fade */}
      <div
        className="relative w-[140px] sm:w-[150px] h-7 sm:h-8 overflow-hidden pointer-events-auto"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
        title="Trusted by solopreneurs"
      >
        {/* Infinite scrolling track */}
        <div className="avatar-ticker-track">
          {/* Track 1 */}
          <div className="flex items-center gap-1 sm:gap-1.5 pr-1 sm:pr-1.5 shrink-0">
            {AVATARS.map((avatar, idx) => (
              <div
                key={`track-1-${idx}`}
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-[1.5px] border-white shadow-xs shrink-0 overflow-hidden bg-[#e5e7eb]"
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Track 2 (duplicate for seamless mathematical loop) */}
          <div
            className="flex items-center gap-1 sm:gap-1.5 pr-1 sm:pr-1.5 shrink-0"
            aria-hidden="true"
          >
            {AVATARS.map((avatar, idx) => (
              <div
                key={`track-2-${idx}`}
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-[1.5px] border-white shadow-xs shrink-0 overflow-hidden bg-[#e5e7eb]"
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caption matching Makro editorial typography */}
      <span className="text-xs sm:text-[12px] text-[#71747d] font-normal tracking-tight">
        {label}
      </span>
    </div>
  );
}
