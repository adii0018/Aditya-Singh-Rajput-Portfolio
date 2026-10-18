"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Sparkles, Activity, Layers, Terminal } from "lucide-react";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/GithubIcon";
import CodeLoader from "@/components/ui/CodeLoader";
import { projects } from "@/lib/data";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 768px): Pinned horizontal scroll matching reference photo
      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getScrollDistance(), 1800)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                Math.floor(self.progress * projects.length),
                projects.length - 1
              );
              setActiveCardIndex(idx);
            },
          },
        });

        return () => tween.revert();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#ebeff5] py-6 sm:py-8 lg:py-10 flex flex-col justify-between overflow-hidden"
    >
      {/* SECTION TOP HEADER */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-4 sm:mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="projects-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-3">
            ✦ Featured Projects
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="projects-code-loader shrink-0 flex items-center">
              <CodeLoader />
            </div>
            <h2
              className="projects-heading font-black text-[#242426] leading-tight tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Things I&apos;ve <span className="italic text-[#4d4f57]">built</span>
            </h2>
          </div>
        </div>

        {/* Status / Indicator */}
        <div className="hidden md:flex items-center gap-4">
          <div className="px-4 py-2 rounded-full bg-white border border-[#24242215] shadow-xs flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeCardIndex === idx
                      ? "w-6 bg-[#242426]"
                      : "w-1.5 bg-[#24242225]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-semibold text-[#242426]">
              {String(activeCardIndex + 1).padStart(2, "0")} / 04
            </span>
            <span className="text-xs text-[#4d4f57] font-mono">SCROLL TO SLIDE →</span>
          </div>
          <a
            href="https://github.com/adii0018"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#242426] text-white text-xs font-semibold hover:bg-black transition-all"
          >
            <GithubIcon size={14} /> All Repos
          </a>
        </div>
      </div>

      {/* HORIZONTAL CARDS TRACK (Jeremie Nallet style) */}
      <div className="w-full overflow-hidden flex-1 flex items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 md:px-16 lg:px-20 shrink-0 select-none overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none"
          style={{ willChange: "transform" }}
        >
          {/* ========================================================================= */}
          {/* CARD 1: ALICE EXAM PROCTOR (White Card, Matching Left Card in Reference) */}
          {/* ========================================================================= */}
          <div className="w-[88vw] sm:w-[82vw] lg:w-[76vw] max-w-[1040px] h-[480px] sm:h-[520px] lg:h-[550px] xl:h-[580px] rounded-[32px] sm:rounded-[44px] bg-white text-[#242426] border border-[#24242215] shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden">
            {/* Top Micro-Header */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#4d4f57] pb-4 border-b border-[#24242210]">
              <span className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                Computer Vision · AI
              </span>
              <span className="font-bold text-[#242426] text-sm">01 / 04</span>
              <span className="hidden sm:inline">Autonomous Proctoring</span>
            </div>

            {/* Middle Section: Giant Typography + AI Vision Showcase Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
              {/* Title & Pill */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#24242220] text-[#242426] text-[11px] font-mono font-medium self-start mb-3">
                  ✦ with real-time computer vision
                </div>
                <h3
                  className="font-black text-[#242426] tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
                >
                  Alice Exam
                  <br />
                  <span className="text-[#10b981]">Proctor</span>
                </h3>
                <p className="text-sm sm:text-base text-[#4d4f57] font-medium mt-2">
                  AI-Powered Real-Time Integrity & Autonomous Proctoring
                </p>
              </div>

              {/* Graphic/Visual Showcase: Real 16:9 Banner Image */}
              <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#24242215] shadow-xl group bg-[#0e0e11] aspect-[16/9] w-full">
                <img
                  src="/alice-exam-proctor.jpg"
                  alt="Alice Exam Proctor - AI-Powered Real-Time Integrity & Autonomous Proctoring"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE MONITORING
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
                  AI VISION // OPENCV
                </div>
              </div>
            </div>

            {/* Bottom Section: Action Button + Description */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-[#24242210]">
              <div className="flex items-center gap-3">
                {/* Reference circular indicator */}
                <div className="w-10 h-10 rounded-full border-2 border-[#10b981] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                </div>
                <a
                  href={projects[0]?.github || "https://github.com/adii0018/Alice-exam-proctor"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#242426] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
                >
                  <GithubIcon size={14} /> View Code <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="max-w-md text-right sm:text-right">
                <p className="text-xs sm:text-sm text-[#4d4f57] leading-relaxed mb-2 text-left sm:text-right">
                  Detects cheating in real-time with automated gaze tracking, face recognition, and audio monitoring.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                  {["Python", "OpenCV", "FastAPI", "React", "TensorFlow"].map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full bg-[#2424220a] text-[11px] font-mono text-[#242426]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: ALICE MANDI (Dark Card, Matching Right Card in Reference) */}
          {/* ========================================================================= */}
          <div className="w-[88vw] sm:w-[82vw] lg:w-[76vw] max-w-[1040px] h-[480px] sm:h-[520px] lg:h-[550px] xl:h-[580px] rounded-[32px] sm:rounded-[44px] bg-[#0e0e11] text-white border border-white/15 shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden">
            {/* Top Micro-Header */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/60 pb-4 border-b border-white/10">
              <span className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c0adff]" />
                Machine Learning · AgriTech
              </span>
              <span className="font-bold text-white text-sm">02 / 04</span>
              <span className="hidden sm:inline">Price Prediction Engine</span>
            </div>

            {/* Middle Section: Giant Typography + AgriTech HUD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[#c0adff] text-[11px] font-mono font-medium self-start mb-3">
                  ✦ with ML price forecasting
                </div>
                <h3
                  className="font-black text-white tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(34px, 5.5vw, 62px)" }}
                >
                  Alice
                  <br />
                  <span className="text-[#c0adff]">Mandi</span>
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-medium mt-2">
                  AI-Powered Agricultural Marketplace & Logistics Optimization
                </p>
              </div>

              {/* Graphic/Visual: Crop Price Predictor HUD */}
              <div className="lg:col-span-5 bg-[#18181f] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between min-h-[190px]">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-3 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-[#c0adff]">
                    <span className="w-2 h-2 rounded-full bg-[#c0adff] animate-pulse" />
                    MANDI TICKER // LIVE
                  </span>
                  <span>ACCURACY 94.8%</span>
                </div>
                <div className="space-y-2 py-1">
                  <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-lg">
                    <span className="text-white/80">🌾 Wheat (Indore)</span>
                    <span className="text-[#d9ff5c] font-bold">₹2,420/q (+4.2%)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-lg">
                    <span className="text-white/80">🌱 Soybean (Ujjain)</span>
                    <span className="text-[#c0adff] font-bold">₹4,850/q (+1.8%)</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 pt-2 border-t border-white/10 flex justify-between">
                  <span>LOGISTICS: OPTIMIZED</span>
                  <span>HARVEST: PEAK RATE</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#c0adff] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c0adff]" />
                </div>
                <a
                  href={projects[1]?.github || "https://github.com/adii0018/Alice-mandi"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#242426] text-xs font-semibold hover:bg-[#e0e0e0] transition-all cursor-pointer"
                >
                  <GithubIcon size={14} /> View Code <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="max-w-md text-right sm:text-right">
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-2 text-left sm:text-right">
                  Connecting farmers directly to buyers with ML price prediction and smart logistics optimization.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                  {["Python", "Django", "React", "ML", "PostgreSQL"].map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-mono text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: JANSETU AI (White Card, Matching Left Card in Reference) */}
          {/* ========================================================================= */}
          <div className="w-[88vw] sm:w-[82vw] lg:w-[76vw] max-w-[1040px] h-[480px] sm:h-[520px] lg:h-[550px] xl:h-[580px] rounded-[32px] sm:rounded-[44px] bg-white text-[#242426] border border-[#24242215] shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden">
            {/* Top Micro-Header */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#4d4f57] pb-4 border-b border-[#24242210]">
              <span className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                NLP · GovTech · Social Impact
              </span>
              <span className="font-bold text-[#242426] text-sm">03 / 04</span>
              <span className="hidden sm:inline">Hackathon Winner</span>
            </div>

            {/* Middle Section: Giant Typography + Voice HUD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#24242220] text-[#0284c7] text-[11px] font-mono font-medium self-start mb-3">
                  ✦ with 12 regional languages
                </div>
                <h3
                  className="font-black text-[#242426] tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(34px, 5.5vw, 62px)" }}
                >
                  JanSetu
                  <br />
                  <span className="text-[#0284c7]">AI</span>
                </h3>
                <p className="text-sm sm:text-base text-[#4d4f57] font-medium mt-2">
                  Multilingual Citizen Governance & Welfare Scheme Assistant
                </p>
              </div>

              {/* Graphic/Visual: Multilingual Voice Wave HUD */}
              <div className="lg:col-span-5 bg-[#18181b] text-white rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl flex flex-col justify-between min-h-[190px]">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-2 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    LLM PIPELINE // 180MS
                  </span>
                  <span>LANGCHAIN</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 my-2">
                  <p className="text-[11px] font-sans text-sky-200 italic mb-1">
                    &ldquo;किसान क्रेडिट कार्ड की पात्रता क्या है?&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-white/70">
                    ➔ Real-time automated lookup: 450+ schemes indexed.
                  </p>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/60 pt-2 border-t border-white/10">
                  <span>SPEECH-TO-TEXT: ACTIVE</span>
                  <span className="text-sky-400">12 DIALECTS</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-[#24242210]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#0284c7] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                </div>
                <a
                  href={projects[2]?.github || "https://github.com/adii0018/JanSetu-AI"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#242426] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
                >
                  <GithubIcon size={14} /> View Code <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="max-w-md text-right sm:text-right">
                <p className="text-xs sm:text-sm text-[#4d4f57] leading-relaxed mb-2 text-left sm:text-right">
                  Conversational AI assistant for rural citizens to access government schemes and file complaints in regional languages.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                  {["LangChain", "Hugging Face", "FastAPI", "NLP", "React"].map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full bg-[#2424220a] text-[11px] font-mono text-[#242426]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 4: FFZONE (Dark Card, Matching Right Card in Reference) */}
          {/* ========================================================================= */}
          <div className="w-[88vw] sm:w-[82vw] lg:w-[76vw] max-w-[1040px] h-[480px] sm:h-[520px] lg:h-[550px] xl:h-[580px] rounded-[32px] sm:rounded-[44px] bg-[#0e0e11] text-white border border-white/15 shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden">
            {/* Top Micro-Header */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/60 pb-4 border-b border-white/10">
              <span className="font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d9ff5c]" />
                Full-Stack · Real-Time AI
              </span>
              <span className="font-bold text-white text-sm">04 / 04</span>
              <span className="hidden sm:inline">Competitive Leagues</span>
            </div>

            {/* Middle Section: Giant Typography + Stadium Pitch HUD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[#d9ff5c] text-[11px] font-mono font-medium self-start mb-3">
                  ✦ with AI lineup suggestions
                </div>
                <h3
                  className="font-black text-white tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(34px, 5.5vw, 62px)" }}
                >
                  FFZone
                  <br />
                  <span className="text-[#d9ff5c]">Arena</span>
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-medium mt-2">
                  Full-Stack Fantasy Football with Live Analytics & AI Tactics
                </p>
              </div>

              {/* Graphic/Visual: Stadium Tactics HUD */}
              <div className="lg:col-span-5 bg-[#18181f] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between min-h-[190px]">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-3 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-[#d9ff5c]">
                    <span className="w-2 h-2 rounded-full bg-[#d9ff5c] animate-pulse" />
                    MATCHDAY 28 // LIVE
                  </span>
                  <span>AI OPTIMIZED</span>
                </div>
                <div className="space-y-2 py-1">
                  <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-lg">
                    <span className="text-white/80">⚽ AI Captain Pick</span>
                    <span className="text-[#d9ff5c] font-bold">E. Haaland (88.4 PTS)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-lg">
                    <span className="text-white/80">🏆 League Standing</span>
                    <span className="text-white font-bold">Tier 1 · Rank #1</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[#d9ff5c] pt-2 border-t border-white/10 flex justify-between">
                  <span>LIVE SCORING ENGINE</span>
                  <span>1.2K+ USERS</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#d9ff5c] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d9ff5c]" />
                </div>
                <a
                  href={projects[3]?.github || "https://github.com/adii0018/FFZONE"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d9ff5c] text-[#242426] text-xs font-bold hover:bg-[#cbf544] transition-all cursor-pointer"
                >
                  <GithubIcon size={14} /> View Code <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="max-w-md text-right sm:text-right">
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-2 text-left sm:text-right">
                  Full-stack fantasy platform with real-time match data, AI team suggestions, and competitive leagues with live scoring.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                  {["Next.js", "Node.js", "PostgreSQL", "AI", "TypeScript"].map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-mono text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
