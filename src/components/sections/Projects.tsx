"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/GithubIcon";
import CodeLoader from "@/components/ui/CodeLoader";
import { projects } from "@/lib/data";

function ProjectVisual({ project }: { project: (typeof projects)[0] }) {
  if (project.id === 1) {
    return (
      <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#24242215] shadow-xl group bg-[#0e0e11] aspect-[16/9] w-full">
        <img
          src="/alice-exam-proctor.jpg"
          alt="Alice Exam Proctor - AI-Powered Real-Time Integrity & Autonomous Proctoring"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Graceful fallback if image is missing
            const target = e.currentTarget;
            target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          PRODUCT PREVIEW
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
          AI VISION // OPENCV
        </div>
      </div>
    );
  }

  if (project.id === 2) {
    return (
      <div className="lg:col-span-5 bg-[#18181f] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between min-h-[190px]">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-3 border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5 text-[#c0adff]">
            <span className="w-2 h-2 rounded-full bg-[#c0adff] animate-pulse" />
            MODEL PREVIEW // SAMPLE DATA
          </span>
          <span>ILLUSTRATIVE OUTPUT</span>
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
          <span>LOGISTICS: DEMO</span>
          <span>HARVEST: SAMPLE</span>
        </div>
      </div>
    );
  }

  if (project.id === 3) {
    return (
      <div className="lg:col-span-5 bg-[#18181b] text-white rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl flex flex-col justify-between min-h-[190px]">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-2 border-b border-white/10 pb-2">
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            LLM DEMO // SAMPLE DATA
          </span>
          <span>LANGCHAIN</span>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 my-2">
          <p className="text-[11px] font-sans text-sky-200 italic mb-1">
            &ldquo;किसान क्रेडिट कार्ड की पात्रता क्या है?&rdquo;
          </p>
          <p className="text-[10px] font-mono text-white/70">
            ➔ Illustrative automated lookup response.
          </p>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/60 pt-2 border-t border-white/10">
          <span>SPEECH-TO-TEXT: DEMO</span>
          <span className="text-sky-400">SAMPLE: 12 DIALECTS</span>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 bg-[#18181f] text-white rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between min-h-[190px]">
      <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-3 border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-[#d9ff5c]">
          <span className="w-2 h-2 rounded-full bg-[#d9ff5c] animate-pulse" />
          SIMULATED MATCHDAY
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
        <span>SIMULATED SCORING</span>
        <span>SAMPLE: 1.2K+ USERS</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardIndexRef = useRef(0);

  const updateActiveCard = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, projects.length - 1));
    if (activeCardIndexRef.current === boundedIndex) return;

    activeCardIndexRef.current = boundedIndex;
    setActiveCardIndex(boundedIndex);
  };

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      if (isReducedMotion()) {
        const cards = Array.from(track.children) as HTMLElement[];
        const updateFromNativeScroll = () => {
          const trackBounds = track.getBoundingClientRect();
          const trackCenter = trackBounds.left + track.clientWidth / 2;
          let closestIndex = 0;
          let closestDistance = Number.POSITIVE_INFINITY;

          cards.forEach((card, index) => {
            const cardBounds = card.getBoundingClientRect();
            const cardCenter = cardBounds.left + cardBounds.width / 2;
            const distance = Math.abs(cardCenter - trackCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          updateActiveCard(closestIndex);
        };

        track.addEventListener("scroll", updateFromNativeScroll, { passive: true });
        updateFromNativeScroll();
        return () => track.removeEventListener("scroll", updateFromNativeScroll);
      }

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      intro.from(
        section.querySelectorAll(".projects-badge, .projects-heading"),
        { y: 16, opacity: 0, duration: 0.45, stagger: 0.08 }
      ).from(
        Array.from(track.children),
        {
          y: 18,
          opacity: 0,
          duration: 0.45,
          stagger: 0.1,
          clearProps: "transform,opacity",
        },
        "-=0.18"
      );

      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 768px): Pinned horizontal scroll matching reference photo
      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? window.innerWidth));

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getScrollDistance(), 1)}`,
            pin: true,
            // Keep the horizontal track locked to the page scroll position.
            // A timed scrub makes the cards and their active indicator lag
            // behind the user's scroll, which reads as a jump on fast wheels.
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.floor(self.progress * projects.length);
              updateActiveCard(idx);
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
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#242426] text-white text-xs font-semibold hover:bg-black transition-all cursor-pointer"
          >
            <GithubIcon size={14} /> All Repos
          </a>
        </div>
      </div>

      {/* HORIZONTAL CARDS TRACK */}
      <div className="w-full overflow-hidden flex-1 flex items-center">
        <div
          ref={trackRef}
          className="projects-track flex items-center gap-6 sm:gap-8 px-6 sm:px-12 md:px-16 lg:px-20 shrink-0 select-none overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none"
          style={{ willChange: "transform" }}
        >
          {projects.map((project, idx) => {
            const isDark = project.theme === "dark";
            const numFormatted = String(idx + 1).padStart(2, "0");
            const totalFormatted = String(projects.length).padStart(2, "0");

            return (
              <div
                key={project.id}
                className={`w-[88vw] sm:w-[82vw] lg:w-[76vw] max-w-[1040px] h-[480px] sm:h-[520px] lg:h-[550px] xl:h-[580px] rounded-[32px] sm:rounded-[44px] ${
                  isDark
                    ? "bg-[#0e0e11] text-white border-white/15"
                    : "bg-white text-[#242426] border-[#24242215]"
                } border shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden`}
              >
                {/* Top Micro-Header */}
                <div
                  className={`flex items-center justify-between text-xs font-mono uppercase tracking-wider pb-4 border-b ${
                    isDark ? "text-white/60 border-white/10" : "text-[#4d4f57] border-[#24242210]"
                  }`}
                >
                  <span className="font-semibold flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    {project.tag}
                  </span>
                  <span className={`font-bold text-sm ${isDark ? "text-white" : "text-[#242426]"}`}>
                    {numFormatted} / {totalFormatted}
                  </span>
                  <span className="hidden sm:inline">{project.headerMeta}</span>
                </div>

                {/* Middle Section: Typography + Visual */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
                  <div className={project.id === 1 ? "lg:col-span-6" : "lg:col-span-7"}>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono font-medium self-start mb-3 ${
                        isDark ? "border-white/20" : "border-[#24242220]"
                      }`}
                      style={{ color: project.color }}
                    >
                      ✦ {project.kicker}
                    </div>
                    <h3
                      className={`font-black tracking-tight leading-[1.05] ${
                        isDark ? "text-white" : "text-[#242426]"
                      }`}
                      style={{ fontSize: "clamp(32px, 5.2vw, 58px)" }}
                    >
                      {project.title}
                      <br />
                      <span style={{ color: project.color }}>{project.accentLine}</span>
                    </h3>
                    <p
                      className={`text-sm sm:text-base font-medium mt-2 ${
                        isDark ? "text-white/70" : "text-[#4d4f57]"
                      }`}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  <ProjectVisual project={project} />
                </div>

                {/* Bottom Section: Action Button + Description */}
                <div
                  className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t ${
                    isDark ? "border-white/10" : "border-[#24242210]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: project.color }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isDark
                          ? "bg-white text-[#242426] hover:bg-white/90"
                          : "bg-[#242426] text-white hover:bg-black"
                      }`}
                    >
                      <GithubIcon size={14} /> View Code <ArrowUpRight size={14} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          isDark
                            ? "border-white/20 text-white hover:bg-white/10"
                            : "border-[#24242620] text-[#242426] hover:bg-black/5"
                        }`}
                      >
                        Live Demo <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  <div className="max-w-md text-left sm:text-right">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-2 ${
                        isDark ? "text-white/70" : "text-[#4d4f57]"
                      }`}
                    >
                      {project.shortDescription || project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                            isDark
                              ? "bg-white/10 text-white/90"
                              : "bg-[#2424220a] text-[#242426]"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
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
