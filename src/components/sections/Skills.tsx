"use client";

import React, { useState, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { skills } from "@/lib/data";
import RevealWords from "@/components/ui/RevealWords";
import AbstergoLoader from "@/components/ui/AbstergoLoader";
import TechIcon from "@/components/ui/TechIcon";
import {
  Cpu,
  Globe,
  Cloud,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Skill } from "@/types/portfolio";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";

interface AccordionColumn {
  id: "ai" | "web" | "cloud" | "core";
  num: string;
  title: string;
  subtitle: string;
  tag: string;
  count: string;
  icon: typeof Cpu;
  accent: string;
  primaryAura: string;
  secondaryAura: string;
  telemetrySpec: string;
  telemetryDetails: string;
  lightBg: string;
  borderColor: string;
  badgeBg: string;
  tools: Skill[];
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeColId, setActiveColId] = useState<string>("ai");
  usePauseOffscreenAnimation(sectionRef);

  // Staggered Waterfall Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 340,
        damping: 24,
      },
    },
  };

  // Velara Theme: Deep Black (#000000) + Cobalt Blue Deep (#2C3480) + Crisp White (#FFFFFF)
  const columns: AccordionColumn[] = [
    {
      id: "ai",
      num: "01",
      title: "AI & Machine Learning",
      subtitle: "Neural Models, Computer Vision, Deep Learning & Tensor Ops",
      tag: "CORE SPECIALTY",
      count: "9 TOOLS",
      icon: Cpu,
      accent: "#4E60E6",
      primaryAura: "#2C3480",
      secondaryAura: "#1e255f",
      telemetrySpec: "NEURAL_TENSOR_ENGINE // SPEC-01",
      telemetryDetails: "LAT 28.6139° N // CUDA_CORES: ACCELERATED // LOSS_CONV: 99.8%",
      lightBg: "bg-[#2C3480]/15",
      borderColor: "border-[#2C3480]/40",
      badgeBg: "bg-[#2C3480]/20 text-[#a4b1fc] border-[#2C3480]/40",
      tools: skills.filter((s) => s.category === "AI / ML"),
    },
    {
      id: "web",
      num: "02",
      title: "Web & Backend Architecture",
      subtitle: "Full-Stack Frameworks, Reactive UIs & Distributed Systems",
      tag: "PRODUCTION WEB",
      count: "6 TOOLS",
      icon: Globe,
      accent: "#3B4BBF",
      primaryAura: "#2C3480",
      secondaryAura: "#192050",
      telemetrySpec: "DISTRIBUTED_WEB_SYSTEMS // SPEC-02",
      telemetryDetails: "EDGE_SSR: OPTIMIZED // HTTP3_QUIC // POSTGRES_POOL: ACTIVE",
      lightBg: "bg-[#2C3480]/15",
      borderColor: "border-[#2C3480]/40",
      badgeBg: "bg-[#2C3480]/20 text-[#a4b1fc] border-[#2C3480]/40",
      tools: skills.filter((s) => s.category === "Web & Backend"),
    },
    {
      id: "cloud",
      num: "03",
      title: "Cloud & Distributed Systems",
      subtitle: "Multi-Cloud Deployments, Linux Containers & High Availability",
      tag: "INFRASTRUCTURE",
      count: "4 TOOLS",
      icon: Cloud,
      accent: "#5D70F5",
      primaryAura: "#2C3480",
      secondaryAura: "#272f6b",
      telemetrySpec: "MULTI_CLOUD_INFRA // SPEC-03",
      telemetryDetails: "REGION: ASIA-SOUTH1 // K8S_CONTAINERS: HEALTHY // UPTIME: 99.99%",
      lightBg: "bg-[#2C3480]/15",
      borderColor: "border-[#2C3480]/40",
      badgeBg: "bg-[#2C3480]/20 text-[#a4b1fc] border-[#2C3480]/40",
      tools: skills.filter((s) => s.category === "Cloud & DevOps"),
    },
    {
      id: "core",
      num: "04",
      title: "Core Languages & Systems",
      subtitle: "Low-Level Performance, Microarchitectures & Toolchains",
      tag: "LOW-LEVEL SYSTEMS",
      count: "3 TOOLS",
      icon: Layers,
      accent: "#7080FF",
      primaryAura: "#2C3480",
      secondaryAura: "#4E60E6",
      telemetrySpec: "LOW_LEVEL_KERNEL_COMPUTE // SPEC-04",
      telemetryDetails: "ARCH: X86_64 // COMPILER: CLANG_C++20 // MEM_MGMT: ZERO_LEAK",
      lightBg: "bg-[#2C3480]/15",
      borderColor: "border-[#2C3480]/40",
      badgeBg: "bg-[#2C3480]/20 text-[#a4b1fc] border-[#2C3480]/40",
      tools: skills.filter((s) => s.category === "Core & Systems"),
    },
  ];

  const activeCol = columns.find((c) => c.id === activeColId) || columns[0];

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skills-section-header",
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".skills-loader", {
        y: 24,
        scale: 0.88,
        autoAlpha: 0,
        duration: 0.62,
        ease: "back.out(1.7)",
      })
      .from(".gsap-word-reveal", {
        yPercent: 120,
        autoAlpha: 0,
        stagger: 0.085,
        duration: 0.72,
        ease: "power4.out",
      }, "-=0.52");

      gsap.from(".accordion-deck", {
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".accordion-deck",
          start: "top 85%",
          once: true,
        },
      });

      // Ambient breathing aura pulsation
      gsap.to(".skills-aura-primary", {
        scale: 1.15,
        opacity: 0.85,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".skills-aura-secondary", {
        scale: 1.2,
        opacity: 0.75,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full pt-20 sm:pt-28 pb-12 sm:pb-16 bg-[#000000] text-white overflow-hidden rounded-t-[32px] sm:rounded-t-[44px]"
    >
      {/* ========================================================
          BACKGROUND: VELARA LUXURY SAPPHIRE & COBALT AURA ATMOSPHERE
          ======================================================== */}
      {/* 1. Primary Top-Center Cobalt Blue Deep (#2C3480) Glow */}
      <div
        className="skills-aura-primary absolute -top-44 left-1/2 -translate-x-1/2 w-[920px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(44, 52, 128, 0.48) 0%, rgba(44, 52, 128, 0.16) 45%, transparent 70%)",
        }}
      />

      {/* 2. Left Lateral Sapphire Atmospheric Glow */}
      <div
        className="skills-aura-secondary absolute top-1/4 -left-36 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(44, 52, 128, 0.32) 0%, rgba(30, 37, 95, 0.12) 45%, transparent 68%)",
        }}
      />

      {/* 3. Bottom-Right Deep Cobalt Accent Glow */}
      <div
        className="skills-aura-center absolute -bottom-36 -right-32 w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(44, 52, 128, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* 4. Ultra-faint tactile texture for luxury matte finish */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header (Velara High-Contrast Luxury Theme) */}
        <div className="skills-section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Cobalt-themed Abstergo Loader */}
              <div className="skills-loader shrink-0 flex items-center justify-center">
                <AbstergoLoader
                  primary="#4E60E6"
                  secondary="rgba(78, 96, 230, 0.9)"
                />
              </div>

              {/* Velara "A STORY IN EVERY PIECE" inspired typography */}
              <h2
                aria-label="Tools I work with"
                className="skills-heading font-black text-white leading-tight tracking-tight select-none"
                style={{ fontSize: "clamp(34px, 5.5vw, 62px)" }}
              >
                <RevealWords text="Tools I work" className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]" />
                <br />
                <RevealWords
                  text="with"
                  className="italic text-[#4e60e6] font-serif font-normal drop-shadow-[0_0_24px_rgba(44,52,128,0.9)]"
                />
              </h2>
            </div>
          </div>

          {/* Quick Pillar Jump Pills in Velara Dark Glass & Cobalt */}
          <div className="flex flex-wrap items-center gap-2">
            {columns.map((col) => {
              const isSelected = activeColId === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setActiveColId(col.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#2C3480] text-white border border-[#4E60E6]/70 shadow-[0_0_20px_rgba(44,52,128,0.7)] scale-105"
                      : "bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 hover:border-[#2C3480]/60 backdrop-blur-md"
                  }`}
                >
                  <span className={isSelected ? "text-[#c2cbff]" : "text-[#7080FF]"}>
                    {col.num}
                  </span>
                  {col.title.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 📚 THE 4-COLUMN INTERACTIVE ACCORDION DECK (Closed State: Luxury Hardcover Book Spines) */}
        <div className="accordion-deck flex flex-col lg:flex-row gap-4 lg:gap-5 w-full min-h-[580px] lg:h-[620px] items-stretch">
          {columns.map((col) => {
            const isExpanded = activeColId === col.id;
            const Icon = col.icon;

            return (
              <motion.div
                key={col.id}
                layout
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                onClick={() => setActiveColId(col.id)}
                onMouseEnter={() => {
                  if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                    setActiveColId(col.id);
                  }
                }}
                className={`relative rounded-[32px] sm:rounded-[36px] transition-all duration-300 overflow-hidden cursor-pointer select-none group/spine ${
                  isExpanded
                    ? "lg:flex-[3.5] bg-gradient-to-b from-[#0a0f28] via-[#050716] to-[#010206] border border-[#2C3480]/70 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(44,52,128,0.3)]"
                    : "lg:flex-[1] bg-gradient-to-r from-[#02030a] via-[#0d1436] to-[#020308] border border-[#2C3480]/40 hover:border-[#4E60E6]/75 shadow-[0_14px_40px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_50px_rgba(44,52,128,0.35)] backdrop-blur-md"
                }`}
              >
                {/* Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{
                    backgroundColor: isExpanded ? col.accent : "#2C3480",
                    boxShadow: isExpanded ? `0 0 14px ${col.accent}` : "none",
                  }}
                />

                {/* Ambient Soft Glow for expanded state */}
                {isExpanded && (
                  <div
                    className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30"
                    style={{ backgroundColor: "#2C3480" }}
                  />
                )}

                {/* ========================================================
                    STATE A: EXPANDED VIEW (Open Book Spread / Feature Grid)
                    ======================================================== */}
                {isExpanded ? (
                  <div className="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar">
                    
                    {/* Expanded Header */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-wrap items-center justify-between gap-3 mb-6"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                            style={{
                              backgroundColor: "rgba(44, 52, 128, 0.35)",
                              borderColor: "rgba(78, 96, 230, 0.5)",
                              color: "#8897f2",
                              boxShadow: "0 0 18px rgba(44, 52, 128, 0.4)",
                            }}
                          >
                            <Icon size={22} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#8897f2]">
                                {col.num} {"//"}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                {col.title}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-white/60 font-sans mt-0.5">
                              {col.subtitle}
                            </p>
                          </div>
                        </div>

                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                          style={{
                            backgroundColor: "rgba(44, 52, 128, 0.35)",
                            color: "#ffffff",
                            borderColor: "rgba(78, 96, 230, 0.6)",
                            boxShadow: "0 0 12px rgba(44, 52, 128, 0.3)",
                          }}
                        >
                          {col.count}
                        </span>
                      </motion.div>

                      {/* Tool Cards Grid - Staggered Waterfall Motion in Velara Luxury Glass */}
                      <motion.div
                        key={`grid-${col.id}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={`grid gap-3 ${
                          col.tools.length > 6
                            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                            : "grid-cols-1 sm:grid-cols-2"
                        }`}
                      >
                        {col.tools.map((t) => (
                          <motion.div
                            key={t.name}
                            variants={itemVariants}
                            whileHover={{ y: -3, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 350, damping: 22 }}
                            className="p-3.5 rounded-2xl bg-[#0b1026]/75 hover:bg-[#12193b] border border-white/[0.08] hover:border-[#4E60E6]/70 shadow-md hover:shadow-[0_10px_30px_rgba(44,52,128,0.35)] transition-all flex flex-col justify-between group/tool backdrop-blur-xs"
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover/tool:scale-110 group-hover/tool:border-[#4E60E6]/80 transition-all">
                                <TechIcon name={t.icon} size={22} className="object-contain" />
                              </div>
                              <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border"
                                style={{
                                  backgroundColor: "rgba(44, 52, 128, 0.3)",
                                  color: "#c2cbff",
                                  borderColor: "rgba(78, 96, 230, 0.4)",
                                }}
                              >
                                {t.level}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm text-white group-hover/tool:text-[#8897f2] transition-colors font-mono">
                                {t.name}
                              </h4>
                              <p className="text-[11px] text-white/55 group-hover/tool:text-white/80 leading-tight line-clamp-2 mt-0.5 font-sans">
                                {t.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Expanded Bottom Footer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50"
                    >
                      <span className="flex items-center gap-1.5 font-semibold text-[#8897f2]">
                        <CheckCircle2 size={13} className="text-[#4E60E6]" />
                        {col.tag}
                      </span>
                      <span className="text-white/40">Verified Production Stack</span>
                    </motion.div>

                  </div>
                ) : (
                  /* ========================================================
                     STATE B: COLLAPSED PILLAR (Luxury Hardcover Book Spine)
                     ======================================================== */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full p-4 sm:p-5 flex flex-col items-center justify-between text-center min-h-[160px] lg:min-h-0 overflow-hidden"
                  >
                    {/* 1. Spine 3D Curvature Highlight down the center */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                    {/* 2. Inner Gilded Filigree Frame (Thin border inset like luxury leather book cover) */}
                    <div className="absolute inset-2 sm:inset-2.5 rounded-[22px] sm:rounded-[26px] border border-[#2C3480]/30 pointer-events-none group-hover/spine:border-[#4E60E6]/50 transition-colors" />

                    {/* 3. Right edge Gilded Pages Hint (Sliver of gold/cobalt pages) */}
                    <div className="hidden lg:block absolute right-[3px] top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-transparent via-[#8897f2]/30 to-transparent pointer-events-none" />

                    {/* 4. Left hinge crease line */}
                    <div className="hidden lg:block absolute left-[4px] top-4 bottom-4 w-[1px] bg-black/60 pointer-events-none shadow-[1px_0_0_rgba(255,255,255,0.05)]" />

                    {/* ==================== TOP HEADBAND ==================== */}
                    <div className="relative z-10 flex flex-col items-center gap-2 pt-2">
                      {/* Raised Spine Binding Rib (Double Embossed Bands) */}
                      <div className="flex flex-col gap-0.5 items-center opacity-70 mb-1">
                        <div className="w-10 h-[1.5px] bg-[#4E60E6]/50 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                        <div className="w-8 h-[1px] bg-[#2C3480]/60 rounded-full" />
                      </div>

                      {/* Volume Stamp */}
                      <span className="font-mono text-[10px] tracking-[0.25em] font-bold text-[#8897f2] uppercase">
                        VOL. {col.num}
                      </span>

                      {/* Royal Bookmaker Emblem Seal */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover/spine:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(44, 52, 128, 0.45) 0%, rgba(10, 14, 38, 0.9) 100%)",
                          borderColor: "rgba(78, 96, 230, 0.5)",
                          color: "#c2cbff",
                          boxShadow:
                            "0 4px 14px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <Icon size={19} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                      </div>
                    </div>

                    {/* ==================== MIDDLE SPINE TITLE ==================== */}
                    {/* Vertical foiled book spine typography with gold/cobalt sheen */}
                    <div className="relative z-10 my-auto py-6 flex items-center justify-center">
                      <span className="hidden lg:block [writing-mode:vertical-rl] rotate-180 font-mono font-bold text-[13px] tracking-[0.22em] uppercase text-white/75 group-hover/spine:text-white transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {col.title}
                      </span>
                      <span className="block lg:hidden font-mono font-bold text-sm tracking-wide text-white">
                        {col.title}
                      </span>
                    </div>

                    {/* ==================== BOTTOM TAILBAND ==================== */}
                    <div className="relative z-10 flex flex-col items-center gap-2 pb-2">
                      {/* Silk Bookmark Ribbon detail */}
                      <div className="w-2.5 h-3.5 -mt-1 bg-gradient-to-b from-[#2C3480] to-[#4E60E6] rounded-b-xs shadow-[0_2px_5px_rgba(0,0,0,0.7)]" />

                      {/* Debossed leather tool count badge */}
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border bg-[#060919]/90 text-[#a4b1fc] border-[#2C3480]/50 shadow-inner group-hover/spine:border-[#4E60E6]/70 transition-colors">
                        {col.count}
                      </span>

                      {/* Raised Spine Binding Rib (Bottom Tailband) */}
                      <div className="flex flex-col gap-0.5 items-center opacity-70 mt-1">
                        <div className="w-8 h-[1px] bg-[#2C3480]/60 rounded-full" />
                        <div className="w-10 h-[1.5px] bg-[#4E60E6]/50 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
