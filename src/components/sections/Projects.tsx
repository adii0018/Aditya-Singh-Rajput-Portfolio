"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, isReducedMotion } from "@/lib/gsap";
import { projects } from "@/lib/data";
import SharinganLoader from "@/components/ui/SharinganLoader";
import TechIcon from "@/components/ui/TechIcon";
import { GithubIcon } from "@/components/ui/GithubIcon";
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  Trophy,
  ShieldCheck,
  Eye,
  Layers,
  Terminal,
} from "lucide-react";

// Theme configuration for each 3D deck card
const cardThemes: Record<
  number,
  {
    bgGradient: string;
    borderColor: string;
    glowShadow: string;
    accentColor: string;
    accentBg: string;
    tagText: string;
    heroMetric: string;
    metricLabel: string;
  }
> = {
  0: {
    // Alice Exam Proctor (AI Vision)
    bgGradient: "from-[#111317] via-[#14181c] to-[#0f1115]",
    borderColor: "border-emerald-500/25",
    glowShadow: "shadow-[0_25px_60px_rgba(16,185,129,0.12)]",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    tagText: "01 // COMPUTER VISION & INTEGRITY",
    heroMetric: "99.2%",
    metricLabel: "Integrity Score Precision",
  },
  1: {
    // Alice Mandi (AgriTech & ML)
    bgGradient: "from-[#15121e] via-[#1a1426] to-[#120f1b]",
    borderColor: "border-purple-500/25",
    glowShadow: "shadow-[0_25px_60px_rgba(168,85,247,0.12)]",
    accentColor: "text-purple-400",
    accentBg: "bg-purple-500/10",
    tagText: "02 // AGRITECH ML & LOGISTICS",
    heroMetric: "R²=0.94",
    metricLabel: "Price Prediction Accuracy",
  },
  2: {
    // JanSetu AI (GovTech & NLP)
    bgGradient: "from-[#101722] via-[#131d2c] to-[#0d131c]",
    borderColor: "border-sky-500/25",
    glowShadow: "shadow-[0_25px_60px_rgba(14,165,233,0.12)]",
    accentColor: "text-sky-400",
    accentBg: "bg-sky-500/10",
    tagText: "03 // MULTILINGUAL RAG PIPELINE",
    heroMetric: "12 Dialects",
    metricLabel: "180ms Voice Latency",
  },
  3: {
    // FFZone (Full-Stack & Real-time)
    bgGradient: "from-[#17150f] via-[#1f1a11] to-[#12110c]",
    borderColor: "border-amber-500/25",
    glowShadow: "shadow-[0_25px_60px_rgba(245,158,11,0.12)]",
    accentColor: "text-amber-400",
    accentBg: "bg-amber-500/10",
    tagText: "04 // REAL-TIME DISTRIBUTED ENGINE",
    heroMetric: "12.4k Sockets",
    metricLabel: "Sub-50ms Sync Rate",
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deckContainerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);

  // GSAP 3D ScrollTrigger Deck Animation: Option 3 (Tarot Fan Deck / 3D Angle Stacking)
  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>(".deck-card-wrapper");
      if (cards.length < 2) return;

      const fanAngles = [-2.0, 2.0, -1.2, 0];
      const fanOffsetsX = [-14, 14, -8, 0];

      cards.forEach((cardWrapper, i) => {
        const innerCard = cardWrapper.querySelector<HTMLElement>(".deck-card-inner");
        if (!innerCard) return;

        // When this card reaches top, mark it active
        ScrollTrigger.create({
          trigger: cardWrapper,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveCard(i),
          onEnterBack: () => setActiveCard(i),
        });

        // 1. Fan-out angle stacking: Card i tilts into the deck as next card stacks on top
        if (i < cards.length - 1) {
          const nextCardWrapper = cards[i + 1];

          gsap.to(innerCard, {
            scale: 0.93,
            rotateZ: fanAngles[i] ?? 0,
            x: fanOffsetsX[i] ?? 0,
            rotateX: 6,
            y: -18,
            filter: "brightness(0.72)",
            transformOrigin: "bottom center",
            ease: "power1.out",
            scrollTrigger: {
              trigger: nextCardWrapper,
              start: "top 80%",
              end: "top 25%",
              scrub: 0.5,
            },
          });
        }

        // 2. Incoming card elevation & focus reveal
        if (i > 0) {
          const content = cardWrapper.querySelector<HTMLElement>(".deck-card-content");
          if (content) {
            gsap.fromTo(
              content,
              { y: 28, opacity: 0.8 },
              {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: cardWrapper,
                  start: "top 92%",
                  end: "top 48%",
                  scrub: 0.4,
                },
              }
            );
          }
        }
      });
    },
    { scope: sectionRef }
  );

  const jumpToCard = (index: number) => {
    setActiveCard(index);
    const cards = document.querySelectorAll<HTMLElement>(".deck-card-wrapper");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Render Live Interactive Architecture Simulation HUD for each card
  const renderVisualHUD = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="relative w-full h-full min-h-[320px] lg:min-h-[380px] rounded-xl overflow-hidden group/img flex flex-col justify-between">
            <img
              src="/alice-proctor-bg.jpg"
              alt="Alice Exam Proctor Developer Environment"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle cinematic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex items-center justify-between p-3.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ALICE AI // ACTIVE RUNTIME</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30 font-semibold shadow-md">
                60 FPS LIVE
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white shadow-lg">
                <div className="flex items-center gap-2">
                  <Eye size={14} className="text-emerald-400" />
                  <span className="text-white/90 font-medium">MediaPipe FaceMesh Inference</span>
                </div>
                <span className="text-emerald-400 font-bold">99.2% ACCURACY</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="relative w-full h-full min-h-[320px] lg:min-h-[380px] rounded-xl overflow-hidden group/img flex flex-col justify-between">
            <img
              src="/alice-mandi-bg.jpg"
              alt="Alice Mandi Marketplace & Logistics"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle cinematic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex items-center justify-between p-3.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90 shadow-md">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>MANDI ML // SMART LOGISTICS</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-500/30 font-semibold shadow-md">
                R²=0.94 ACCURACY
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-purple-400" />
                  <span className="text-white/90 font-medium">Wheat & Soybean ML Forecast</span>
                </div>
                <span className="text-emerald-400 font-bold">+4.2% ▲</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="relative w-full h-full min-h-[320px] lg:min-h-[380px] rounded-xl overflow-hidden group/img flex flex-col justify-between">
            <img
              src="/jansetu-ai-bg.jpg"
              alt="JanSetu AI Multilingual Governance Portal"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle cinematic gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex items-center justify-between p-3.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90 shadow-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>JANSETU AI // RAG PLATFORM</span>
              </div>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-500/30 font-semibold shadow-md">
                12 DIALECTS · 180MS
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-white shadow-lg">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-sky-400" />
                  <span className="text-white/90 font-medium">Citizen Voice-to-Welfare RAG</span>
                </div>
                <span className="text-sky-400 font-bold">FAISS + IndicBERT</span>
              </div>
            </div>
          </div>
        );

      case 3:
      default:
        return (
          <div className="flex flex-col justify-between h-full space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="flex items-center gap-1.5 font-mono text-xs text-amber-400 font-bold">
                <Trophy size={13} />
                FANTASY SPORTS ENGINE // MATCHDAY
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                12.4k Sockets
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">⚽</span>
                  <div>
                    <div className="font-bold text-sm text-white">AI Captain Recommender</div>
                    <div className="text-[10px] font-mono text-white/50">E. Haaland (88.4 Projected)</div>
                  </div>
                </div>
                <span className="text-amber-400 font-mono font-bold text-xs bg-amber-500/10 px-2 py-1 rounded">
                  92% CONF
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🏆</span>
                  <div>
                    <div className="font-bold text-sm text-white">League Standings</div>
                    <div className="text-[10px] font-mono text-white/50">Tier 1 Elite Competitive</div>
                  </div>
                </div>
                <span className="text-white font-mono font-bold text-xs">RANK #1</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 text-xs font-mono text-amber-200 flex items-center justify-between">
              <span>LIVE DATA SYNC</span>
              <span className="font-bold">WEBSOCKET REALTIME</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full section-padding bg-[#07080a] overflow-visible rounded-t-[32px] sm:rounded-t-[44px] border-t border-white/10"
    >
      {/* Ambient Studio Lighting (Porsche Luxury Studio Vignette) */}
      <div className="absolute top-20 left-0 w-[550px] h-[550px] bg-[#7ec8a7]/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-[#38bdf8]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ========================================================
            SECTION HEADER (Luxury Editorial Porsche Theme)
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 shadow-xs text-white/90 mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-[#7ec8a7]" />
              <span className="font-mono text-xs text-white/80">/ engineering-showcase // 4 production systems</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="shrink-0 flex items-center justify-center">
                <SharinganLoader />
              </div>

              <div>
                <h2
                  className="font-black leading-tight tracking-tight select-none"
                  style={{ fontSize: "clamp(36px, 5.8vw, 68px)" }}
                >
                  <span className="text-[#7ec8a7] font-sans uppercase tracking-tighter">
                    Featured
                  </span>
                  <span className="italic text-white font-serif font-normal lowercase ml-3">
                    systems
                  </span>
                  <span className="text-[#7ec8a7]">.</span>
                </h2>
                <p className="text-xs sm:text-sm text-white/45 font-mono mt-1 tracking-wider uppercase">
                  Production-grade AI architectures · Scalable distributed systems
                </p>
              </div>
            </div>
          </div>

          {/* Quick Deck Jump Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {projects.map((proj, idx) => {
              const isSelected = activeCard === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => jumpToCard(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white text-[#07080a] shadow-lg shadow-white/10 font-bold scale-105"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/10"
                  }`}
                >
                  <span className="text-[#7ec8a7]">0{idx + 1}</span>
                  <span>{proj.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deck Instruction Cue */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-8 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <Layers size={13} className="text-[#7ec8a7]" />
            <span className="text-white/60">3D STACKING DECK // SCROLL DOWN TO LAYER CARDS</span>
          </div>
          <span className="hidden sm:inline">
            CARD STACK PROGRESSION: 0{activeCard + 1} OF 04
          </span>
        </div>

        {/* ========================================================
            3D STACKING DECK CARDS (Perspective Overlap)
            ======================================================== */}
        <div
          ref={deckContainerRef}
          className="relative flex flex-col gap-10 sm:gap-14 pb-20 sm:pb-32"
          style={{ perspective: "1400px" }}
        >
          {projects.map((proj, idx) => {
            const theme = cardThemes[idx] || cardThemes[0];
            const isLast = idx === projects.length - 1;

            return (
              <div
                key={proj.id}
                className="deck-card-wrapper w-full"
                style={{
                  position: "sticky",
                  // Each card sticks slightly lower, creating the layered deck tabs
                  top: `calc(85px + ${idx * 32}px)`,
                  zIndex: 10 + idx,
                }}
              >
                <div
                  className={`deck-card-inner rounded-[28px] sm:rounded-[36px] bg-gradient-to-br ${theme.bgGradient} border ${theme.borderColor} ${theme.glowShadow} shadow-[0_-30px_90px_rgba(0,0,0,0.92),0_-10px_35px_rgba(0,0,0,0.8)] p-6 sm:p-8 md:p-10 transition-shadow duration-300 text-white`}
                  style={{
                    willChange: "transform, filter",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Card Top Meta Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-white/70 tracking-wider">
                        {theme.tagText}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                        ONLINE RUNTIME
                      </span>
                    </div>
                  </div>

                  {/* Card Content Grid: 2 Columns */}
                  <div className="deck-card-content grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Case Study Narrative */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                      <div>
                        {/* Title & Subtitle */}
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                            {proj.title}
                          </h3>
                          <span
                            className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${theme.accentBg} ${theme.accentColor} border ${theme.borderColor}`}
                          >
                            {proj.tag}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white/70 mb-4 font-sans">
                          {proj.subtitle}
                        </p>

                        {/* Narrative */}
                        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans mb-6">
                          {proj.description}
                        </p>

                        {/* Hero Metric Pill */}
                        <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                          <div className={`font-mono text-xl sm:text-2xl font-black ${theme.accentColor}`}>
                            {theme.heroMetric}
                          </div>
                          <div className="text-xs font-mono text-white/60 uppercase">
                            {theme.metricLabel}
                          </div>
                        </div>

                        {/* Tech Stack Pills */}
                        <div>
                          <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block mb-2.5">
                            Architecture & Toolchain
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {proj.tech.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-mono font-medium text-white shadow-2xs hover:bg-white/10 transition-colors"
                              >
                                <TechIcon name={t} size={14} />
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111215] text-xs font-mono font-bold hover:bg-white/90 transition-all shadow-md"
                        >
                          <GithubIcon size={14} />
                          <span>View Codebase</span>
                          <ArrowUpRight size={13} className="opacity-70" />
                        </a>

                        <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/60">
                          <ShieldCheck size={13} className="text-emerald-400" />
                          <span>Production Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Visual HUD / Workstation Preview */}
                    <div
                      className={`lg:col-span-6 rounded-2xl bg-black/40 border border-white/10 ${
                        idx === 0 || idx === 1 || idx === 2 ? "p-2 sm:p-2.5 overflow-hidden" : "p-5 sm:p-6"
                      } shadow-inner min-h-[340px] flex flex-col justify-between`}
                    >
                      {renderVisualHUD(idx)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}