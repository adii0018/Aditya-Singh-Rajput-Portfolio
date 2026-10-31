"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";
import "./devpass.css";

interface DevPassCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export const DevPassCard = forwardRef<HTMLDivElement, DevPassCardProps>(
  ({ className = "", style }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = (e: React.MouseEvent) => {
      // Allow clicking links without flipping
      if ((e.target as HTMLElement).closest("a")) return;
      setIsFlipped((prev) => !prev);
    };

    return (
      <div
        ref={ref}
        style={style}
        className={`devpass-wrapper ${className}`}
        onClick={toggleFlip}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? "Flip to pass front" : "Flip to developer credentials back"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
      >
        <div className={`ticket-flipper ${isFlipped ? "is-flipped" : ""}`}>
          
          {/* Flip Hint Pill */}
          <div className="t-flip-hint">
            <span>{isFlipped ? "VIEW FRONT" : "CLICK TO FLIP"}</span>
            <span>↺</span>
          </div>

          {/* ========================================================
              FACE 1: FRONT VIP CONFERENCE PASS
              ======================================================== */}
          <div className="ticket-face ticket-front">
            <div className="ticket">
              {/* Top Main Section */}
              <div className="t-main">
                <div className="t-content">
                  <div className="t-header">
                    <div className="t-logo">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      A L I C E
                    </div>
                    <div className="t-type">Dev Pass</div>
                  </div>

                  <div className="t-title">
                    Syntax<br />Error &apos;18
                  </div>
                  <div className="t-subtitle">Global Developer Conference</div>

                  <div className="t-details">
                    <div className="t-detail-item">
                      <span className="t-label">Name</span>
                      <span className="t-value">Aditya Singh Rajput</span>
                    </div>
                    <div className="t-detail-item">
                      <span className="t-label">Date</span>
                      <span className="t-value">May 08, 2026</span>
                    </div>
                    <div className="t-detail-item">
                      <span className="t-label">Venue</span>
                      <span className="t-value">Indore Nexus Arena</span>
                    </div>
                    <div className="t-detail-item">
                      <span className="t-label">Gateway</span>
                      <span className="t-value">Sector OG</span>
                    </div>
                  </div>
                </div>

                {/* Perforation Cut / Notch */}
                <div
                  className="t-perforation"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    transform: "translateY(50%)",
                  }}
                >
                  <div className="t-perf-line" />
                </div>
              </div>

              {/* Bottom Stub / Barcode Section */}
              <div className="t-stub">
                <div className="t-barcode-container">
                  <div className="t-barcode" />
                  <div className="t-barcode-id">ASR-18-OG-DEV</div>
                </div>
                <div className="t-admit">
                  <div className="t-admit-text">Seat</div>
                  <div className="t-admit-num">!8</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              FACE 2: BACK DEVELOPER CREDENTIALS & NFC HUD
              ======================================================== */}
          <div className="ticket-face ticket-back">
            <div className="ticket">
              <div className="t-back-main min-h-[310px]">
                <div className="t-content">
                  
                  {/* Security Clearance Header */}
                  <div className="t-back-header">
                    <div className="t-back-badge">
                      <span className="t-back-led" />
                      <span>CLEARANCE // LVL-05 ROOT</span>
                    </div>
                    <span className="font-mono text-[9px] text-white/50 tracking-wider">
                      SPEC-HUD v2.6
                    </span>
                  </div>

                  {/* Simulated Contactless NFC Chip */}
                  <div className="t-nfc-chip">
                    <div className="t-chip-graphic">
                      <div className="t-chip-line h" />
                      <div className="t-chip-line v1" />
                      <div className="t-chip-line v2" />
                    </div>
                    <div className="t-nfc-info">
                      <span className="t-nfc-title">SMARTPASS NFC // 13.56 MHz</span>
                      <span className="t-nfc-sub">ISO/IEC 14443-A ENCRYPTED</span>
                    </div>
                  </div>

                  {/* Developer System Specs */}
                  <div className="t-back-specs">
                    <div className="t-spec-row">
                      <span className="t-spec-key">PRIMARY ROLE</span>
                      <span className="t-spec-val text-[#d9ff5c]">AI / ML Engineer</span>
                    </div>
                    <div className="t-spec-row">
                      <span className="t-spec-key">CODENAME</span>
                      <span className="t-spec-val">Adii // ASR-18</span>
                    </div>
                    <div className="t-spec-row">
                      <span className="t-spec-key">CORE TOOLCHAIN</span>
                      <span className="t-spec-val">PyTorch · LangChain · Next.js</span>
                    </div>
                    <div className="t-spec-row">
                      <span className="t-spec-key">DOMAIN</span>
                      <span className="t-spec-val">Vision · LLM · RAG Agents</span>
                    </div>
                    <div className="t-spec-row">
                      <span className="t-spec-key">STATUS</span>
                      <span className="t-spec-val text-[#40c463]">● ACTIVE PRODUCTION</span>
                    </div>
                  </div>

                  {/* Companion Mascot Cyber Avatar */}
                  <div className="t-mascot-container mt-3 flex items-center justify-center">
                    <div className="relative group/cat flex items-center justify-center">
                      {/* Ambient Cyber Aura Glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed]/25 via-[#ff70a6]/25 to-[#d9ff5c]/20 blur-md pointer-events-none scale-90 group-hover/cat:scale-115 transition-transform duration-300" />
                      
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                        <Image
                          src="/devpass-cat.png"
                          alt="DevPass Companion Mascot"
                          width={120}
                          height={120}
                          className="object-contain w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] drop-shadow-[0_4px_16px_rgba(124,58,237,0.35)] transition-transform duration-300 group-hover/cat:scale-105"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Perforation Cut / Notch */}
                <div
                  className="t-perforation"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    transform: "translateY(50%)",
                  }}
                >
                  <div className="t-perf-line" />
                </div>
              </div>

              {/* Bottom Stub with Scannable GitHub QR Code */}
              <div className="t-back-stub">
                <a
                  href="https://github.com/adii0018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-qr-box group/qr hover:scale-105 transition-transform"
                  title="Open GitHub Profile"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top-Left Finder */}
                    <rect x="0" y="0" width="7" height="7" fill="#111" />
                    <rect x="1" y="1" width="5" height="5" fill="#fff" />
                    <rect x="2" y="2" width="3" height="3" fill="#111" />

                    {/* Top-Right Finder */}
                    <rect x="22" y="0" width="7" height="7" fill="#111" />
                    <rect x="23" y="1" width="5" height="5" fill="#fff" />
                    <rect x="24" y="2" width="3" height="3" fill="#111" />

                    {/* Bottom-Left Finder */}
                    <rect x="0" y="22" width="7" height="7" fill="#111" />
                    <rect x="1" y="23" width="5" height="5" fill="#fff" />
                    <rect x="2" y="24" width="3" height="3" fill="#111" />

                    {/* Timing Tracks */}
                    <path d="M6 8v2M6 12v2M6 16v2M6 20v2M8 6h2M12 6h2M16 6h2M20 6h2" stroke="#111" strokeWidth="1" />

                    {/* Alignment Pattern */}
                    <rect x="18" y="18" width="5" height="5" fill="#111" />
                    <rect x="19" y="19" width="3" height="3" fill="#fff" />
                    <rect x="20" y="20" width="1" height="1" fill="#111" />

                    {/* Matrix Data Modules */}
                    <path
                      d="M9 1h1v1H9zM11 1h2v1h-2zM15 1h1v1h-1zM18 1h2v1h-2zM8 3h1v1H8zM12 3h1v1h-1zM16 3h2v1h-2zM9 8h1v1H9zM11 8h2v2h-1v-1h-1zM14 8h2v1h-2zM18 8h1v2h1v1h-2zM21 8h2v1h-2zM25 8h2v1h-2zM8 10h1v1H8zM10 10h2v1h-2zM16 10h1v1h-1zM23 10h1v1h-1zM8 12h2v1H8zM11 12h1v1h-1zM14 12h2v1h-2zM18 12h1v2h1v-1h2v1h-1v1h-2v-1h-1zM24 12h1v1h-1zM26 12h2v1h-2zM9 14h1v1H9zM12 14h2v1h-2zM16 14h1v1h-1zM27 14h1v1h-1zM8 16h2v1H8zM11 16h1v2h-1zM13 16h2v1h-2zM16 16h2v1h-2zM23 16h2v1h-2zM26 16h1v1h-1zM8 18h2v1H8zM11 18h1v1h-1zM14 18h1v1h-1zM16 18h1v1h-1zM25 18h2v1h-2zM9 20h1v1H9zM12 20h2v1h-2zM15 20h1v1h-1zM8 22h1v2h1v-1h2v1h-1v1H9v-1H8zM13 22h2v1h-2zM16 22h1v1h-1zM24 22h2v1h-2zM10 24h2v1h-2zM14 24h1v2h1v-1h1v2h-2v-1h-1zM18 24h2v1h-2zM22 24h1v1h-1zM25 24h2v1h-2zM8 26h2v1H8zM12 26h1v1h-1zM19 26h2v1h-2zM23 26h1v1h-1zM26 26h2v1h-2z"
                      fill="#111"
                    />

                    {/* Center Tech Node */}
                    <circle cx="14.5" cy="14.5" r="2.2" fill="#7c3aed" />
                    <circle cx="14.5" cy="14.5" r="1.1" fill="#fff" />
                  </svg>
                </a>

                <div className="t-qr-meta">
                  <span className="t-qr-title">SCAN CREDENTIALS</span>
                  <span className="t-qr-desc">
                    Verified GitHub repository &amp; code integrity
                  </span>
                  <span className="t-qr-hash">
                    HASH: 0x8F9A·ASR·18
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
);

DevPassCard.displayName = "DevPassCard";

export default DevPassCard;
