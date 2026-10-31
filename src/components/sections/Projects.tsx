"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger, isReducedMotion } from "@/lib/gsap";
import { projects } from "@/lib/data";
import { scrollToTarget } from "@/lib/motion";
import RevealWords from "@/components/ui/RevealWords";
import SharinganLoader from "@/components/ui/SharinganLoader";
import TechIcon from "@/components/ui/TechIcon";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import {
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Eye,
  Layers,
  Gamepad2,
  Crosshair,
  Sprout,
  Zap,
} from "lucide-react";

// Unified Black (#07080a) & Green (#7ec8a7 / Emerald) Luxury Studio Theme for 3D Deck Cards
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
    metaStatus: string;
    statusColor: string;
    statusText: string;
    innerGlow: string;
  }
> = {
  0: {
    // 01 Alice Exam Proctor (AI Vision & Biometrics)
    bgGradient: "from-[#0c0e12] via-[#101418] to-[#07080a]",
    borderColor: "border-[#7ec8a7]/30 hover:border-[#7ec8a7]/60",
    glowShadow: "shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(126,200,167,0.12)]",
    accentColor: "text-[#7ec8a7]",
    accentBg: "bg-[#7ec8a7]/10",
    tagText: "01 // COMPUTER VISION & INTEGRITY",
    heroMetric: "99.2%",
    metricLabel: "Integrity Score Precision",
    metaStatus: "SECURE RUNTIME // BIOMETRIC_MATRIX",
    statusColor: "bg-[#7ec8a7]",
    statusText: "text-[#a7e4ca]",
    innerGlow: "bg-[radial-gradient(ellipse_at_top_right,rgba(126,200,167,0.14),transparent_70%)]",
  },
  1: {
    // 02 Alice Mandi (AgriTech & Predictive ML)
    bgGradient: "from-[#0c0e12] via-[#101418] to-[#07080a]",
    borderColor: "border-[#7ec8a7]/30 hover:border-[#7ec8a7]/60",
    glowShadow: "shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(126,200,167,0.12)]",
    accentColor: "text-[#7ec8a7]",
    accentBg: "bg-[#7ec8a7]/10",
    tagText: "02 // AGRITECH ML & LOGISTICS",
    heroMetric: "R²=0.94",
    metricLabel: "Price Prediction Accuracy",
    metaStatus: "MARKET PIPELINE // 24 MANDIS SYNC",
    statusColor: "bg-[#7ec8a7]",
    statusText: "text-[#a7e4ca]",
    innerGlow: "bg-[radial-gradient(ellipse_at_top_right,rgba(126,200,167,0.14),transparent_70%)]",
  },
  2: {
    // 03 JanSetu AI (GovTech & NLP)
    bgGradient: "from-[#0c0e12] via-[#101418] to-[#07080a]",
    borderColor: "border-[#7ec8a7]/30 hover:border-[#7ec8a7]/60",
    glowShadow: "shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(126,200,167,0.12)]",
    accentColor: "text-[#7ec8a7]",
    accentBg: "bg-[#7ec8a7]/10",
    tagText: "03 // MULTILINGUAL RAG PIPELINE",
    heroMetric: "12 Dialects",
    metricLabel: "180ms Voice Latency",
    metaStatus: "GOV CLOUD // CITIZEN_RAG_ACTIVE",
    statusColor: "bg-[#7ec8a7]",
    statusText: "text-[#a7e4ca]",
    innerGlow: "bg-[radial-gradient(ellipse_at_top_right,rgba(126,200,167,0.14),transparent_70%)]",
  },
  3: {
    // 04 FFZone (Esports Platform & WebSockets)
    bgGradient: "from-[#0c0e12] via-[#101418] to-[#07080a]",
    borderColor: "border-[#7ec8a7]/30 hover:border-[#7ec8a7]/60",
    glowShadow: "shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(126,200,167,0.12)]",
    accentColor: "text-[#7ec8a7]",
    accentBg: "bg-[#7ec8a7]/10",
    tagText: "04 // REAL-TIME DISTRIBUTED ENGINE",
    heroMetric: "12.4k CCU",
    metricLabel: "Sub-15ms WebSocket State Sync",
    metaStatus: "14ms PING · 128 TICKRATE · MATCHDAY LIVE",
    statusColor: "bg-[#7ec8a7]",
    statusText: "text-[#a7e4ca]",
    innerGlow: "bg-[radial-gradient(ellipse_at_top_right,rgba(126,200,167,0.14),transparent_70%)]",
  },
};

const projectJumpLabels: Record<number, string> = {
  1: "Proctor",
  2: "Mandi",
  3: "JanSetu",
  4: "FFZone",
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);
  const visualHudFrameClassName =
    "group/img relative flex h-full min-h-0 w-full flex-col justify-between overflow-hidden p-3.5 sm:p-5";
  usePauseOffscreenAnimation(sectionRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll<HTMLElement>(".deck-card-wrapper");
      if (!cards.length) return;

      const activeTriggers: ScrollTrigger[] = [];

      // Update the active indicator whenever the top of the next card approaches.
      cards.forEach((cardWrapper, i) => {
        const activeTrigger = ScrollTrigger.create({
          trigger: cardWrapper,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveCard(i),
          onEnterBack: () => setActiveCard(i),
        });
        activeTriggers.push(activeTrigger);
      });

      if (isReducedMotion()) {
        return () => activeTriggers.forEach((trigger) => trigger.kill());
      }

      const introReveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-section-header",
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      introReveal
        .from(".projects-section-header", { y: 42, autoAlpha: 0, duration: 0.76 })
        .from(
          ".gsap-word-reveal",
          { yPercent: 120, autoAlpha: 0, stagger: 0.085, duration: 0.72, ease: "power4.out" },
          "-=0.34"
        );

      // Reveal the scroll instruction at its own viewport entry
      gsap.from(".projects-deck-cue", {
        y: 28,
        autoAlpha: 0,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-deck-cue",
          start: "top 84%",
          once: true,
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((cardWrapper) => {
          const cardContent = cardWrapper.querySelector<HTMLElement>(".deck-card-content");
          if (!cardContent) return;

          gsap.from(cardContent, {
            y: 28,
            autoAlpha: 0,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardWrapper,
              start: "top 86%",
              once: true,
            },
          });
        });
      });

      return () => {
        activeTriggers.forEach((trigger) => trigger.kill());
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  const jumpToCard = (index: number) => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".deck-card-wrapper");
    const targetCard = cards?.[index];
    if (!targetCard) return;

    setActiveCard(index);
    scrollToTarget(targetCard);
  };

  // Render Live Interactive Architecture Simulation HUD for each card in Black & Green Theme
  const renderVisualHUD = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className={visualHudFrameClassName}>
            <Image
              src="/alice-proctor-bg.jpg"
              alt="Alice Exam Proctor Developer Environment"
              fill
              sizes="(max-width: 1023px) 90vw, 600px"
              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark green & obsidian gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/92 via-black/35 to-[#07080a]/40 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3.5">
              <div className="flex min-w-0 max-w-[72%] items-center gap-2 rounded-full border border-[#7ec8a7]/40 bg-black/75 px-3 py-1.5 font-mono text-[11px] text-[#c2f2dc] shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#7ec8a7] animate-pulse" />
                <span className="truncate">BIOMETRIC MATRIX // ACTIVE SCAN</span>
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-full border border-[#7ec8a7]/40 bg-[#7ec8a7]/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#c2f2dc] shadow-md backdrop-blur-md">
                60 FPS LIVE
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#7ec8a7]/35 bg-black/85 px-3 py-2.5 font-mono text-xs text-white shadow-lg sm:px-4">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Eye size={14} className="text-[#7ec8a7]" />
                  <span className="truncate font-medium text-white/90">MediaPipe 468-pt FaceMesh</span>
                </div>
                <span className="shrink-0 whitespace-nowrap font-bold text-[#7ec8a7]">99.2% PRECISION</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={visualHudFrameClassName}>
            <Image
              src="/alice-mandi-bg.jpg"
              alt="Alice Mandi Marketplace & Logistics"
              fill
              sizes="(max-width: 1023px) 90vw, 600px"
              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark green & obsidian gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/92 via-black/35 to-[#07080a]/40 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3.5">
              <div className="flex min-w-0 max-w-[72%] items-center gap-2 rounded-full border border-[#7ec8a7]/40 bg-black/75 px-3 py-1.5 font-mono text-[11px] text-[#c2f2dc] shadow-md backdrop-blur-md">
                <Sprout size={13} className="text-[#7ec8a7]" />
                <span className="truncate">ECO-BIO ML // HARVEST LOGISTICS</span>
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-full border border-[#7ec8a7]/40 bg-[#7ec8a7]/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#c2f2dc] shadow-md backdrop-blur-md">
                R²=0.94 ACCURACY
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#7ec8a7]/35 bg-black/85 px-3 py-2.5 font-mono text-xs text-white shadow-lg sm:px-4">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <TrendingUp size={14} className="text-[#7ec8a7]" />
                  <span className="truncate font-medium text-white/90">Regional Mandi Price Forecasting</span>
                </div>
                <span className="shrink-0 whitespace-nowrap font-bold text-[#7ec8a7]">24 MANDIS SYNC</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={visualHudFrameClassName}>
            <Image
              src="/jansetu-ai-bg.png"
              alt="JanSetu AI Multilingual Governance Portal"
              fill
              sizes="(max-width: 1023px) 90vw, 600px"
              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark green & obsidian gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/92 via-black/35 to-[#07080a]/40 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3.5">
              <div className="flex min-w-0 max-w-[72%] items-center gap-2 rounded-full border border-[#7ec8a7]/40 bg-black/75 px-3 py-1.5 font-mono text-[11px] text-[#c2f2dc] shadow-md backdrop-blur-md">
                <Zap size={13} className="text-[#7ec8a7]" />
                <span className="truncate">DIGITAL GOV // CITIZEN WELFARE RAG</span>
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-full border border-[#7ec8a7]/40 bg-[#7ec8a7]/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#c2f2dc] shadow-md backdrop-blur-md">
                12 DIALECTS · 180MS
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#7ec8a7]/35 bg-black/85 px-3 py-2.5 font-mono text-xs text-white shadow-lg sm:px-4">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <MessageSquare size={14} className="text-[#7ec8a7]" />
                  <span className="truncate font-medium text-white/90">IndicBERT Multilingual Speech Pipeline</span>
                </div>
                <span className="shrink-0 whitespace-nowrap font-bold text-[#7ec8a7]">FAISS + RAG ACTIVE</span>
              </div>
            </div>
          </div>
        );

      case 3:
      default:
        return (
          <div className={visualHudFrameClassName}>
            <Image
              src="/ffzone-bg.png"
              alt="FFZone Gaming Arena & Esports Platform"
              fill
              sizes="(max-width: 1023px) 90vw, 600px"
              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark green & obsidian gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/92 via-black/35 to-[#07080a]/40 pointer-events-none" />

            {/* Top Tag Floating Pill */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3.5">
              <div className="flex min-w-0 max-w-[72%] items-center gap-2 rounded-full border border-[#7ec8a7]/40 bg-black/75 px-3 py-1.5 font-mono text-[11px] text-[#c2f2dc] shadow-md backdrop-blur-md">
                <Gamepad2 size={13} className="text-[#7ec8a7] animate-pulse" />
                <span className="truncate">ESPORTS ARENA // LOBBY ACTIVE</span>
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-full border border-[#7ec8a7]/40 bg-[#7ec8a7]/15 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-[#c2f2dc] shadow-md backdrop-blur-md">
                128 TICKRATE LIVE
              </span>
            </div>

            {/* Bottom Telemetry Overlay */}
            <div className="relative z-10 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#7ec8a7]/35 bg-black/85 px-3 py-2.5 font-mono text-xs text-white shadow-lg sm:px-4">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Crosshair size={14} className="text-[#7ec8a7]" />
                  <span className="truncate font-medium text-white/90">Distributed Matchday Engine</span>
                </div>
                <span className="shrink-0 whitespace-nowrap font-bold tracking-tight text-[#7ec8a7]">&lt;14ms MULTIPLAYER SYNC</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full pt-12 sm:pt-16 pb-20 sm:pb-32 bg-[#000000] text-white overflow-x-clip overflow-y-visible"
    >
      {/* Ambient Porsche Studio Lighting Vignette (Black & Green / Emerald) */}
      <div className="absolute top-20 left-0 w-[550px] h-[550px] bg-[#7ec8a7]/[0.045] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-[#10b981]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ========================================================
            SECTION HEADER (Black & Green Luxury Studio Theme)
            ======================================================== */}
        <div className="projects-section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="shrink-0 flex items-center justify-center">
                <SharinganLoader />
              </div>

              <div>
                <h2
                  aria-label="Featured systems."
                  className="font-black leading-tight tracking-tight select-none text-white"
                  style={{ fontSize: "clamp(36px, 5.8vw, 68px)" }}
                >
                  <RevealWords text="Featured" className="text-[#7ec8a7] font-sans uppercase tracking-tighter" />{" "}
                  <RevealWords text="systems" className="italic text-white font-serif font-normal lowercase ml-3" />
                  <RevealWords text="." className="text-[#7ec8a7]" />
                </h2>
                <p className="text-xs sm:text-sm text-white/45 font-mono mt-1 tracking-wider uppercase">
                  Production-grade AI architectures · Scalable distributed systems
                </p>
              </div>
            </div>
          </div>

          {/* Quick Deck Jump Buttons in Dark Glass & Emerald */}
          <div className="flex flex-wrap items-center gap-2">
            {projects.map((proj, idx) => {
              const isSelected = activeCard === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => jumpToCard(idx)}
                  aria-pressed={isSelected}
                  aria-label={`Jump to ${proj.title}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white text-[#07080a] shadow-lg shadow-white/10 font-bold scale-105"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/10 hover:border-[#7ec8a7]/40"
                  }`}
                >
                  <span className="text-[#7ec8a7]">0{idx + 1}</span>
                  <span>{projectJumpLabels[proj.id] ?? proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deck Instruction Cue */}
        <div className="projects-deck-cue flex items-center justify-between pb-3 border-b border-white/10 mb-8 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <Layers size={13} className="text-[#7ec8a7]" />
            <span className="text-white/60">3D STACKING DECK // SCROLL DOWN TO LAYER CARDS</span>
          </div>
          <span className="hidden sm:inline text-white/50">
            CARD STACK PROGRESSION: 0{activeCard + 1} OF 04
          </span>
        </div>

        {/* ========================================================
            3D STACKING DECK CARDS (Unified Black & Green Theme)
            ======================================================== */}
        <div
          className="relative flex flex-col gap-10 sm:gap-14 pb-20 sm:pb-32"
          style={{ perspective: "1400px" }}
        >
          {projects.map((proj, idx) => {
            const theme = cardThemes[idx] || cardThemes[0];
            const stickyTop = 85 + idx * 28;

            return (
              <div
                key={proj.id}
                data-card-index={idx}
                className="deck-card-wrapper w-full"
                style={
                  {
                    "--deck-top": `${stickyTop}px`,
                    zIndex: 10 + idx,
                  } as React.CSSProperties
                }
              >
                {/* 3D Porsche Editorial Card Container with Unified Black & Green Theme */}
                <div
                  className={`relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-br ${theme.bgGradient} border ${theme.borderColor} ${theme.glowShadow} overflow-hidden transition-all duration-500 backdrop-blur-xl p-6 sm:p-8 md:p-10`}
                >
                  {/* Atmospheric Green Inner Glow */}
                  <div className={`absolute inset-0 pointer-events-none ${theme.innerGlow}`} />

                  {/* Brushed obsidian micro-texture */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Top Terminal Chrome / Status Bar */}
                  <div className="flex min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 pb-4 mb-6 sm:mb-8">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex shrink-0 items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="min-w-0 truncate font-mono text-xs font-bold tracking-wider text-white/80">
                        {theme.tagText}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${theme.statusColor} animate-pulse`} />
                      <span className={`max-w-[42vw] truncate whitespace-nowrap text-xs font-mono ${theme.statusText} font-semibold tracking-wide sm:max-w-none`}>
                        {theme.metaStatus}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Grid: 2 Columns */}
                  <div className="deck-card-content flex-1 grid min-h-0 grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch lg:items-center">
                    {/* Left Column: Case Study Narrative */}
                    <div className="min-w-0 lg:col-span-6 flex flex-col justify-between space-y-6">
                      <div>
                        {/* Title & Subtitle */}
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tight">
                            {proj.title}
                          </h3>
                          <span
                            className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${theme.accentBg} ${theme.accentColor} border ${theme.borderColor}`}
                          >
                            {proj.tag}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-white/70 mb-4 font-sans">
                          {proj.subtitle}
                        </p>

                        {/* Narrative */}
                        <p className="text-[13px] sm:text-sm md:text-base text-white/80 leading-relaxed font-sans mb-6">
                          {proj.description}
                        </p>

                        {/* Hero Metric Pill */}
                        <div className="inline-flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                          <div className={`font-mono text-lg sm:text-xl md:text-2xl font-black ${theme.accentColor}`}>
                            {theme.heroMetric}
                          </div>
                          <div className="text-[10px] sm:text-xs font-mono text-white/60 uppercase">
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
                                className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-[10px] sm:text-xs font-mono font-medium text-white shadow-2xs hover:bg-white/10 transition-colors"
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
                          <ShieldCheck size={13} className="text-[#7ec8a7]" />
                          <span>Production Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Visual HUD / Workstation Preview */}
                    <div className="relative h-[280px] w-full lg:col-span-6 rounded-2xl overflow-hidden border border-[#7ec8a7]/20 bg-black/60 shadow-2xl sm:h-[340px] lg:h-full lg:min-h-[420px] flex flex-col justify-between">
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
