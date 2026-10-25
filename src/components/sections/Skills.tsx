"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { skills } from "@/lib/data";
import AbstergoLoader from "@/components/ui/AbstergoLoader";
import TechIcon from "@/components/ui/TechIcon";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Cpu,
  Globe,
  Cloud,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { Skill } from "@/types/portfolio";

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

  // Staggered Waterfall Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035, // 35ms waterfall cascade between tools
        delayChildren: 0.06,    // quick delay to let pillar expansion begin
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

  const columns: AccordionColumn[] = [
    {
      id: "ai",
      num: "01",
      title: "AI & Machine Learning",
      subtitle: "Models, Computer Vision, Data Science & Deep Learning",
      tag: "CORE SPECIALTY",
      count: "9 TOOLS",
      icon: Cpu,
      accent: "#16a34a",
      primaryAura: "#16a34a",
      secondaryAura: "#06b6d4",
      telemetrySpec: "NEURAL_TENSOR_ENGINE // SPEC-01",
      telemetryDetails: "LAT 28.6139° N // CUDA_CORES: ACCELERATED // LOSS_CONV: 99.8%",
      lightBg: "bg-emerald-500/5",
      borderColor: "border-emerald-500/30",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      tools: skills.filter((s) => s.category === "AI / ML"),
    },
    {
      id: "web",
      num: "02",
      title: "Web & Backend Architecture",
      subtitle: "Full-Stack Frameworks, Reactive UIs & Scalable Databases",
      tag: "PRODUCTION WEB",
      count: "6 TOOLS",
      icon: Globe,
      accent: "#0284c7",
      primaryAura: "#0284c7",
      secondaryAura: "#6366f1",
      telemetrySpec: "DISTRIBUTED_WEB_SYSTEMS // SPEC-02",
      telemetryDetails: "EDGE_SSR: OPTIMIZED // HTTP3_QUIC // POSTGRES_POOL: ACTIVE",
      lightBg: "bg-sky-500/5",
      borderColor: "border-sky-500/30",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
      tools: skills.filter((s) => s.category === "Web & Backend"),
    },
    {
      id: "cloud",
      num: "03",
      title: "Cloud & Distributed Systems",
      subtitle: "Multi-Cloud Deployments, Infrastructure & Linux Servers",
      tag: "INFRASTRUCTURE",
      count: "4 TOOLS",
      icon: Cloud,
      accent: "#d97706",
      primaryAura: "#d97706",
      secondaryAura: "#ea580c",
      telemetrySpec: "MULTI_CLOUD_INFRA // SPEC-03",
      telemetryDetails: "REGION: ASIA-SOUTH1 // K8S_CONTAINERS: HEALTHY // UPTIME: 99.99%",
      lightBg: "bg-amber-500/5",
      borderColor: "border-amber-500/30",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      tools: skills.filter((s) => s.category === "Cloud & DevOps"),
    },
    {
      id: "core",
      num: "04",
      title: "Core Languages & Systems",
      subtitle: "Performance, Version Control & Containerization",
      tag: "LOW-LEVEL SYSTEMS",
      count: "3 TOOLS",
      icon: Layers,
      accent: "#7c3aed",
      primaryAura: "#7c3aed",
      secondaryAura: "#db2777",
      telemetrySpec: "LOW_LEVEL_KERNEL_COMPUTE // SPEC-04",
      telemetryDetails: "ARCH: X86_64 // COMPILER: CLANG_C++20 // MEM_MGMT: ZERO_LEAK",
      lightBg: "bg-purple-500/5",
      borderColor: "border-purple-500/30",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      tools: skills.filter((s) => s.category === "Core & Systems"),
    },
  ];

  const activeCol = columns.find((c) => c.id === activeColId) || columns[0];
  const activeAccent = activeCol.accent;

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".skills-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".skills-loader", {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, "-=0.35")
      .from(".skills-heading", {
        y: 30,
        opacity: 0,
        duration: 0.75,
      }, "-=0.5")
      .from(".accordion-deck", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-20 w-full section-padding bg-[#ebeff5] overflow-hidden rounded-t-[32px] sm:rounded-t-[44px]"
    >
      {/* ========================================================
          BACKGROUND: 2. DYNAMIC BREATHING COLOR AURA (Apple / macOS Mesh)
          ======================================================== */}
      {/* 1. Primary Breathing Orb (Top-Left / Header Aura) */}
      <motion.div
        className="absolute -top-32 -left-28 w-[580px] h-[580px] rounded-full blur-[115px] pointer-events-none"
        animate={{
          x: [-20, 25, -20],
          y: [-25, 20, -25],
          scale: [1, 1.15, 1],
          backgroundColor: activeCol.primaryAura,
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.9, ease: "easeInOut" },
        }}
      />

      {/* 2. Secondary Breathing Orb (Bottom-Right / Cards Aura) */}
      <motion.div
        className="absolute -bottom-36 -right-28 w-[540px] h-[540px] rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [25, -20, 25],
          y: [20, -25, 20],
          scale: [1.1, 0.95, 1.1],
          backgroundColor: activeCol.secondaryAura,
          opacity: [0.15, 0.24, 0.15],
        }}
        transition={{
          x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.9, ease: "easeInOut" },
        }}
      />

      {/* 3. Center Ambient Soft Breathing Aura */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full blur-[140px] pointer-events-none"
        animate={{
          scale: [0.95, 1.08, 0.95],
          backgroundColor: activeCol.primaryAura,
          opacity: [0.10, 0.18, 0.10],
        }}
        transition={{
          scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.9, ease: "easeInOut" },
        }}
      />

      {/* 4. Ultra-faint tactile texture for luxury matte finish */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#242426 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header (Original Loader & Tagline Strictly Preserved) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="skills-badge mb-3">
              <Badge
                variant="outline"
                className="bg-white/90 border-[#24242220] shadow-xs text-[#242426] px-3.5 py-1"
              >
                <Sparkles size={13} className="text-[#16a34a]" />
                <span className="font-mono text-xs">/ tech-stack // 22 engineering tools</span>
              </Badge>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="skills-loader shrink-0 flex items-center justify-center">
                <AbstergoLoader />
              </div>

              <h2
                className="skills-heading font-black text-[#242426] leading-tight tracking-tight select-none"
                style={{ fontSize: "clamp(34px, 5.5vw, 62px)" }}
              >
                Tools I work
                <br />
                <span className="italic text-[#4d4f57] font-serif font-normal">with</span>
              </h2>
            </div>
          </div>

          {/* Quick Pillar Jump Pills */}
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
                      ? "bg-[#242426] text-white shadow-md shadow-[#242426]/15 scale-105"
                      : "bg-white/80 hover:bg-white text-[#4d4f57] border border-[#24242215] hover:border-[#24242230]"
                  }`}
                >
                  <span style={{ color: col.accent }}>{col.num}</span>
                  {col.title.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🎹 THE 4-COLUMN INTERACTIVE ACCORDION DECK */}
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
                  // Only expand on hover on desktop
                  if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                    setActiveColId(col.id);
                  }
                }}
                className={`relative rounded-[32px] sm:rounded-[36px] transition-all duration-300 overflow-hidden cursor-pointer select-none ${
                  isExpanded
                    ? "lg:flex-[3.5] bg-white border border-[#24242218] shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                    : "lg:flex-[1] bg-white/70 hover:bg-white/95 border border-[#24242212] hover:border-[#24242225] shadow-xs hover:shadow-md"
                }`}
              >
                {/* Accent Top / Left Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
                  style={{ backgroundColor: col.accent }}
                />

                {/* Ambient Soft Glow for expanded state */}
                {isExpanded && (
                  <div
                    className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{ backgroundColor: col.accent }}
                  />
                )}

                {/* ========================================================
                    STATE A: EXPANDED VIEW (Full Feature Grid)
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
                              backgroundColor: `${col.accent}12`,
                              borderColor: `${col.accent}25`,
                              color: col.accent,
                            }}
                          >
                            <Icon size={22} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold" style={{ color: col.accent }}>
                                {col.num} //
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-[#242426] tracking-tight">
                                {col.title}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-[#4d4f57] font-sans mt-0.5">
                              {col.subtitle}
                            </p>
                          </div>
                        </div>

                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
                          style={{
                            backgroundColor: `${col.accent}12`,
                            color: col.accent,
                            borderColor: `${col.accent}30`,
                          }}
                        >
                          {col.count}
                        </span>
                      </motion.div>

                      {/* Tool Cards Grid - Staggered Waterfall Motion */}
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
                            className="p-3.5 rounded-2xl bg-white border border-[#24242212] hover:border-[#24242230] shadow-xs hover:shadow-md transition-colors transition-shadow flex flex-col justify-between group/tool"
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="w-8 h-8 rounded-xl bg-[#242426]/[0.03] flex items-center justify-center shrink-0 group-hover/tool:scale-110 transition-transform">
                                <TechIcon name={t.icon} size={22} className="object-contain" />
                              </div>
                              <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border"
                                style={{
                                  backgroundColor: `${col.accent}10`,
                                  color: col.accent,
                                  borderColor: `${col.accent}20`,
                                }}
                              >
                                {t.level}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm text-[#242426] group-hover/tool:text-emerald-700 transition-colors font-mono">
                                {t.name}
                              </h4>
                              <p className="text-[11px] text-[#4d4f57] leading-tight line-clamp-2 mt-0.5 font-sans">
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
                      className="mt-8 pt-4 border-t border-[#24242210] flex items-center justify-between text-xs font-mono text-[#4d4f57]"
                    >
                      <span className="flex items-center gap-1.5 font-semibold" style={{ color: col.accent }}>
                        <CheckCircle2 size={13} />
                        {col.tag}
                      </span>
                      <span>Verified Production Stack</span>
                    </motion.div>

                  </div>
                ) : (
                  /* ========================================================
                     STATE B: COLLAPSED PILLAR (Editorial Vertical Spine)
                     ======================================================== */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full p-6 flex flex-col items-center justify-between text-center min-h-[140px] lg:min-h-0"
                  >
                    
                    {/* Top Spine Number & Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-mono text-sm font-bold opacity-40">
                        {col.num}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${col.accent}12`,
                          color: col.accent,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    {/* Middle: Rotated Vertical Title on Desktop / Horizontal on Mobile */}
                    <div className="my-auto py-4">
                      <span className="hidden lg:block [writing-mode:vertical-rl] rotate-180 font-black text-sm font-mono tracking-wider uppercase text-[#242426]/75 hover:text-[#242426] transition-colors whitespace-nowrap">
                        {col.title}
                      </span>
                      <span className="block lg:hidden font-bold text-base text-[#242426] font-mono">
                        {col.title}
                      </span>
                    </div>

                    {/* Bottom: Pill Count */}
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${col.accent}10`,
                          color: col.accent,
                          borderColor: `${col.accent}20`,
                        }}
                      >
                        {col.count}
                      </span>
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
