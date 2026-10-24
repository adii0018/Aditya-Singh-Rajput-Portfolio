"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/GithubIcon";
import CodeLoader from "@/components/ui/CodeLoader";
import { ProjectCard } from "@/components/ui/ProjectCard";
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

      // Desktop & Tablet (min-width: 768px): Pinned horizontal scroll
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
              setActiveCardIndex((prev) => (prev === idx ? prev : idx));
            },
          },
        });

        return () => tween.revert();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Custom visual slots for data-rich architecture cards
  const getVisualSlot = (id: number) => {
    switch (id) {
      case 2:
        return (
          <div className="bg-[#18181f] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between min-h-[190px]">
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
        );

      case 3:
        return (
          <div className="bg-[#18181b] text-white rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl flex flex-col justify-between min-h-[190px]">
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
        );

      case 4:
        return (
          <div className="bg-[#18181f] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between min-h-[190px]">
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
              <span>ANALYTICS: ACTIVE</span>
            </div>
          </div>
        );

      default:
        return undefined;
    }
  };

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
            / projects // selected systems
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
              {projects.map((_, idx) => (
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
              {String(activeCardIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
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

      {/* HORIZONTAL CARDS TRACK */}
      <div className="w-full overflow-hidden flex-1 flex items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 px-6 sm:px-12 md:px-16 lg:px-20 shrink-0 select-none overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none"
          style={{ willChange: "transform" }}
        >
          {projects.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              index={idx}
              total={projects.length}
              isDark={idx % 2 !== 0}
              visualSlot={getVisualSlot(proj.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
