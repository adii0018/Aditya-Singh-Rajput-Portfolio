"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { experience } from "@/lib/data";
import RevealWords from "@/components/ui/RevealWords";
import { ExperienceItem } from "@/types/portfolio";
import { Briefcase, Trophy, GraduationCap } from "lucide-react";
import PokeballLoader from "@/components/ui/PokeballLoader";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";

const typeIcon = {
  work: <Briefcase size={15} />,
  achievement: <Trophy size={15} />,
  education: <GraduationCap size={15} />,
};

const typeColor = {
  work: "#00AEBB",
  achievement: "#E8E4D3",
  education: "#2DD4BF",
};

// 28 radiating sunburst iris rays (precomputed with 2-decimal precision to avoid SSR float hydration discrepancies)
const EYE_RAYS = Array.from({ length: 28 }, (_, i) => {
  const angle = (i * 360) / 28;
  const rad = (angle * Math.PI) / 180;
  return {
    key: i,
    x1: Number((Math.cos(rad) * 20).toFixed(2)),
    y1: Number((Math.sin(rad) * 20).toFixed(2)),
    x2: Number((Math.cos(rad) * 44).toFixed(2)),
    y2: Number((Math.sin(rad) * 44).toFixed(2)),
  };
});

// Woodcut eyelash ticks along upper eyelid
const EYELASH_TICKS = [-44, -28, -12, 0, 12, 28, 44].map((deg, i) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    key: i,
    x1: Number((140 + Math.cos(rad) * 62).toFixed(2)),
    y1: Number((75 + Math.sin(rad) * 46).toFixed(2)),
    x2: Number((140 + Math.cos(rad) * 78).toFixed(2)),
    y2: Number((75 + Math.sin(rad) * 58).toFixed(2)),
  };
});

/**
 * LumoraSurrealEye
 * Hypnotic surrealist woodcut / stipple eye inspired by the LUMORA editorial artwork.
 * Features an organic pupil that smoothly gazes toward cursor coordinates (with ambient idle breathing),
 * 28 radiant sunburst iris rays in Electric Teal & Warm Ivory, and stippled woodcut ripples.
 */
function LumoraSurrealEye() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    let animFrame: number | null = null;
    let idleTimer: ReturnType<typeof setTimeout>;
    let isIdle = true;
    let isVisible = false;
    let t = 0;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateTransform = () => {
      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
    };

    const scheduleFrame = () => {
      if (isVisible && !motionPreference.matches && animFrame === null) {
        animFrame = requestAnimationFrame(loop);
      }
    };

    // The RAF loop exists only while the eye is visible in the viewport.
    const loop = () => {
      animFrame = null;
      if (!isVisible) {
        return;
      }

      if (isIdle) {
        t += 0.035;
        targetX = Math.sin(t) * 7;
        targetY = Math.cos(t * 0.75) * 3.5;
      }

      // Smooth interpolation without triggering React re-renders
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      updateTransform();

      scheduleFrame();
    };

    // Start and cancel RAF at the visibility boundary instead of polling offscreen.
    const observer = new IntersectionObserver(
      (entries) => {
        const nextVisible = entries[0]?.isIntersecting ?? false;
        if (nextVisible === isVisible) return;

        isVisible = nextVisible;
        if (isVisible) {
          scheduleFrame();
        } else if (animFrame !== null) {
          cancelAnimationFrame(animFrame);
          animFrame = null;
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible || !containerRef.current) return;
      isIdle = false;
      clearTimeout(idleTimer);

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      const maxDist = 17;
      const clampedDist = Math.min(dist / 15, maxDist);
      const angle = Math.atan2(dy, dx);

      targetX = Math.cos(angle) * clampedDist;
      targetY = Math.sin(angle) * clampedDist * 0.65;

      idleTimer = setTimeout(() => {
        isIdle = true;
      }, 2400);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        if (animFrame !== null) cancelAnimationFrame(animFrame);
        animFrame = null;
      } else {
        scheduleFrame();
      }
    };
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    return () => {
      if (animFrame !== null) cancelAnimationFrame(animFrame);
      clearTimeout(idleTimer);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center cursor-pointer select-none group"
      title="The Watching Eye of Lumora"
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[#00AEBB]/20 blur-3xl group-hover:bg-[#00AEBB]/40 transition-all duration-700 pointer-events-none" />

      <svg
        viewBox="0 0 280 170"
        className="w-[210px] sm:w-[260px] md:w-[280px] h-[130px] sm:h-[160px] md:h-[170px] overflow-visible drop-shadow-[0_12px_40px_rgba(0,174,187,0.35)] transition-transform duration-500 group-hover:scale-105"
      >
        <defs>
          <radialGradient id="irisTealGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00AEBB" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#00838D" stopOpacity="1" />
            <stop offset="100%" stopColor="#031211" stopOpacity="1" />
          </radialGradient>

          <clipPath id="almondClip">
            <path d="M 25 85 Q 140 12 255 85 Q 140 158 25 85 Z" />
          </clipPath>
        </defs>

        {/* Hypnotic woodcut ripples (concentric engraving curves) */}
        <path
          d="M 5 85 Q 140 -8 275 85"
          fill="none"
          stroke="#00AEBB"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
        />
        <path
          d="M 5 85 Q 140 178 275 85"
          fill="none"
          stroke="#00AEBB"
          strokeWidth="1.2"
          strokeOpacity="0.3"
          strokeDasharray="4 4"
        />
        <path
          d="M -15 85 Q 140 -26 295 85"
          fill="none"
          stroke="#E8E4D3"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />

        {/* Eyelid base contour (Ink Black with Electric Teal edge) */}
        <path
          d="M 25 85 Q 140 12 255 85 Q 140 158 25 85 Z"
          fill="#031211"
          stroke="#00AEBB"
          strokeWidth="2.5"
          strokeOpacity="0.85"
        />

        {/* Sclera & Iris inside almond clip */}
        <g clipPath="url(#almondClip)">
          {/* Warm Ivory Sclera */}
          <rect x="0" y="0" width="280" height="170" fill="#E8E4D3" />

          {/* Sclera Woodcut/Stipple corner shading */}
          <path
            d="M 25 85 Q 85 45 105 85 Q 85 125 25 85 Z"
            fill="#031211"
            opacity="0.14"
          />
          <path
            d="M 255 85 Q 195 45 175 85 Q 195 125 255 85 Z"
            fill="#031211"
            opacity="0.14"
          />

          {/* Tracking Iris & Pupil Group */}
          <g
            ref={pupilRef}
            className="will-change-transform"
          >
            {/* Iris Outer Border */}
            <circle cx="140" cy="85" r="48" fill="#031211" />

            {/* Iris Body in Electric Teal */}
            <circle cx="140" cy="85" r="45" fill="url(#irisTealGlow)" />

            {/* Concentric rings in iris */}
            <circle
              cx="140"
              cy="85"
              r="34"
              fill="none"
              stroke="#E8E4D3"
              strokeWidth="0.8"
              strokeOpacity="0.45"
            />
            <circle
              cx="140"
              cy="85"
              r="25"
              fill="none"
              stroke="#E8E4D3"
              strokeWidth="0.8"
              strokeOpacity="0.3"
              strokeDasharray="2 3"
            />

            {/* Radiating Sunburst Iris Rays */}
            <g transform="translate(140, 85)">
              {EYE_RAYS.map((r) => (
                <line
                  key={r.key}
                  x1={r.x1}
                  y1={r.y1}
                  x2={r.x2}
                  y2={r.y2}
                  stroke="#E8E4D3"
                  strokeWidth={r.key % 2 === 0 ? "1.2" : "0.75"}
                  strokeOpacity={r.key % 2 === 0 ? "0.9" : "0.6"}
                />
              ))}
            </g>

            {/* Pupil (Deep Ink Black) */}
            <circle cx="140" cy="85" r="19" fill="#031211" />

            {/* Warm Ivory Catchlight / Reflection */}
            <circle cx="132" cy="77" r="6.8" fill="#E8E4D3" />
            <circle cx="149" cy="92" r="2.8" fill="#FFFFFF" opacity="0.85" />
          </g>

          {/* Upper eyelid interior shadow */}
          <path
            d="M 25 85 Q 140 12 255 85"
            fill="none"
            stroke="#031211"
            strokeWidth="6"
            opacity="0.35"
          />
        </g>

        {/* Woodcut Eyelash ticks along upper eyelid */}
        {EYELASH_TICKS.map((t) => (
          <line
            key={t.key}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#00AEBB"
            strokeWidth="1.6"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * LumoraCard
 * Archival dossier card with mouse spotlight glow, large ghosted numerals,
 * architectural crosshairs, and editorial typography.
 */
function LumoraCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const statusTags: Record<string, string> = {
    work: index === 0 ? "LIVE DEPLOYMENT" : "CLIENT SOLUTIONS",
    achievement: "PODIUM FINISH",
    education: "CORE SPECIALIZATION",
  };

  const indexStr = `0${index + 1}`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#041615]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-[#00AEBB]/25 hover:border-[#00AEBB]/70 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_32px_rgba(0,174,187,0.18)] transition-all duration-300 overflow-hidden"
    >
      {/* Interactive mouse spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0, 174, 187, 0.16), transparent 70%)`,
        }}
      />

      {/* Large Ghosted Archival Index */}
      <span className="font-editorial text-6xl sm:text-7xl text-[#00AEBB]/10 group-hover:text-[#00AEBB]/22 font-normal select-none pointer-events-none absolute right-5 top-3 transition-colors leading-none">
        {indexStr}
      </span>

      {/* Architectural Corner Crosshairs */}
      <span className="absolute top-2.5 left-2.5 text-[#00AEBB]/30 text-xs font-mono select-none pointer-events-none">
        +
      </span>
      <span className="absolute bottom-2.5 right-2.5 text-[#00AEBB]/30 text-xs font-mono select-none pointer-events-none">
        +
      </span>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider text-[#00AEBB] bg-[#00AEBB]/10 border border-[#00AEBB]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00AEBB] animate-pulse" />
          {statusTags[item.type] || "ARCHIVE"}
        </span>

        <span className="text-xs font-mono text-[#E8E4D3]/75 bg-[#031211] border border-[#00AEBB]/20 px-3 py-1 rounded-full whitespace-nowrap">
          {item.period}
        </span>
      </div>

      {/* Title & Organization */}
      <div className="mb-3 relative z-10">
        <h3 className="font-editorial text-2xl sm:text-[27px] font-normal text-[#E8E4D3] group-hover:text-white transition-colors tracking-tight leading-snug">
          {item.title}
        </h3>
        <p className="text-sm font-mono text-[#00AEBB] tracking-wider uppercase font-medium mt-1">
          {item.company}
        </p>
      </div>

      {/* Description */}
      <p className="text-[#E8E4D3]/75 text-sm sm:text-[14.5px] leading-relaxed mb-5 relative z-10 font-light">
        {item.description}
      </p>

      {/* Tech Chips */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {item.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-md text-xs font-mono border border-[#00AEBB]/20 bg-[#020d0c] text-[#E8E4D3]/90 hover:border-[#00AEBB]/50 hover:text-[#00AEBB] hover:bg-[#00AEBB]/10 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(sectionRef);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet entrance timeline
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          cardRef.current,
          {
            y: 20,
            scale: 0.99,
            opacity: 0.2,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".exp-badge",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          ".exp-loader",
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.5)" },
          "-=0.2"
        )
        .fromTo(
          ".gsap-word-reveal",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.055, duration: 0.48, ease: "power3.out" },
          "-=0.25"
        );
      });

      // Mobile entrance timeline
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          cardRef.current,
          {
            y: 16,
            scale: 0.99,
            opacity: 0.3,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".exp-badge",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".exp-loader",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" },
          "-=0.15"
        )
        .fromTo(
          ".gsap-word-reveal",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.055, duration: 0.44, ease: "power3.out" },
          "-=0.2"
        );
      });

      // Animate vertical timeline progress line with scroll scrub
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 75%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          }
        );
      }

      // Staggered reveal for timeline entries alternating from left & right
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-entry-left").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 95%",
              once: true,
            },
            x: -30,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
          });
        });

        gsap.utils.toArray<HTMLElement>(".timeline-entry-right").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 95%",
              once: true,
            },
            x: 30,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-entry-left").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 95%",
              once: true,
            },
            x: -35,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        });

        gsap.utils.toArray<HTMLElement>(".timeline-entry-right").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 95%",
              once: true,
            },
            x: 35,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        });
      });

      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: "top 95%",
            once: true,
          },
          scale: 0.3,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        });
      });

      if (sectionRef.current?.querySelector(".pokeball-end")) {
        gsap.from(".pokeball-end", {
          scrollTrigger: {
            trigger: ".pokeball-end",
            start: "top 92%",
            once: true,
          },
          scale: 0.2,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(2)",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ zIndex: 50 }}
      className="relative w-full overflow-x-clip bg-[#031211] -mt-12 sm:-mt-16 pt-3"
    >
      <div
        ref={cardRef}
        style={{ willChange: "transform, opacity" }}
        className="w-full bg-[#031211] rounded-t-[36px] sm:rounded-t-[48px] border-t-2 border-l-2 border-[#00AEBB]/30 shadow-[-28px_28px_80px_rgba(0,0,0,0.85),0_-20px_50px_rgba(0,174,187,0.18)] section-padding relative overflow-hidden text-[#E8E4D3]"
      >
        {/* Hypnotic Woodcut Contour Waves in Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100 180 C 300 80, 600 380, 1400 180 C 1800 80, 2100 280, 2500 220"
            fill="none"
            stroke="#00AEBB"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M -100 420 C 400 320, 700 580, 1300 420 C 1900 280, 2200 520, 2500 460"
            fill="none"
            stroke="#E8E4D3"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d="M -100 750 C 200 650, 800 950, 1500 800 C 1900 700, 2200 900, 2500 850"
            fill="none"
            stroke="#00AEBB"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeDasharray="4 8"
          />
          <path
            d="M -100 1150 C 500 1050, 900 1350, 1600 1200 C 2000 1100, 2300 1300, 2500 1250"
            fill="none"
            stroke="#00AEBB"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
        </svg>

        {/* Ambient Lumora Editorial background glow & halftone texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#00AEBB_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-[#00AEBB]/12 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-12 left-1/4 w-96 h-96 bg-[#00AEBB]/08 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              {/* Badge & Editorial Meta Tag */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="exp-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00AEBB]/40 bg-[#00AEBB]/10 text-[#00AEBB] text-xs font-mono tracking-[0.2em] uppercase shadow-[0_0_18px_rgba(0,174,187,0.18)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00AEBB] animate-ping" />
                  / timeline // track record
                </div>
                <span className="hidden sm:inline-block font-mono text-[11px] text-[#E8E4D3]/50 tracking-[0.25em] uppercase">
                  IDEAS // CODE // IMPACT
                </span>
              </div>

              {/* Title with Luxury Editorial Typography */}
              <h2
                aria-label="Where I've Evolved."
                className="exp-heading font-editorial text-[#E8E4D3] leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(40px, 6.5vw, 80px)" }}
              >
                <RevealWords text="Where I've" />
                <br />
                <RevealWords
                  text="Evolved."
                  className="italic text-[#00AEBB] drop-shadow-[0_0_35px_rgba(0,174,187,0.45)]"
                />
              </h2>

              <p className="mt-4 text-[#E8E4D3]/75 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                A curated chronicle of engineering milestones, from production deep learning
                systems and high-scale full-stack applications to national podium finishes.
              </p>
            </div>

            {/* The Hypnotic Interactive Lumora Surreal Eye */}
            <div className="exp-loader shrink-0 flex items-center justify-center lg:justify-end">
              <LumoraSurrealEye />
            </div>
          </div>

          {/* Timeline */}
          <div className="timeline-container relative max-w-5xl mx-auto pb-16">
            {/* Timeline background track line */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-7 w-0.5 -translate-x-1/2 bg-[#00AEBB]/20" />

            {/* Vertical scrub line */}
            <div
              ref={lineRef}
              className="absolute left-6 md:left-1/2 top-4 bottom-7 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#00AEBB] via-[#00AEBB] to-[#E8E4D3] origin-top z-0 shadow-[0_0_15px_#00AEBB]"
            />

            <div className="space-y-10 md:space-y-14">
              {experience.map((item, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={i}
                    className={`timeline-entry ${
                      isLeft ? "timeline-entry-left" : "timeline-entry-right"
                    } relative flex flex-col md:flex-row items-start md:items-center w-full`}
                  >
                    {/* Center Aperture Iris Node */}
                    <div
                      className="timeline-dot absolute left-6 md:left-1/2 top-6 md:top-[38px] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#00AEBB] bg-[#031211] z-10 shadow-[0_0_22px_rgba(0,174,187,0.5)] group/node"
                      style={{
                        boxShadow: `0 0 25px ${typeColor[item.type as keyof typeof typeColor]}40`,
                      }}
                    >
                      {/* Rotating aperture dashed ring */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#00AEBB]/40 animate-[spin_12s_linear_infinite]" />
                      <span className="text-[#00AEBB] group-hover/node:scale-110 transition-transform">
                        {typeIcon[item.type as keyof typeof typeIcon]}
                      </span>
                    </div>

                    {/* Card wrapper */}
                    <div
                      className={`w-full pl-14 md:pl-0 md:w-[calc(50%-2.5rem)] relative ${
                        isLeft ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      {/* Horizontal connector line on desktop */}
                      <div
                        className={`hidden md:block absolute top-[38px] h-[2px] w-10 bg-gradient-to-r ${
                          isLeft
                            ? "from-transparent to-[#00AEBB]/40 right-[-2.5rem]"
                            : "from-[#00AEBB]/40 to-transparent left-[-2.5rem]"
                        }`}
                      />

                      {/* Dossier Card */}
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.25 }}
                      >
                        <LumoraCard item={item} index={i} />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ending Pokéball at the finish of the center line */}
            <div className="pokeball-end absolute left-6 md:left-1/2 bottom-0 -translate-x-1/2 z-20 flex flex-col items-center gap-3 drop-shadow-[0_0_25px_rgba(0,174,187,0.6)]">
              <div className="relative p-1 rounded-full border border-[#00AEBB]/40 bg-[#031211]/90 shadow-[0_0_20px_rgba(0,174,187,0.4)]">
                <PokeballLoader />
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#00AEBB] uppercase bg-[#031211]/80 px-3 py-1 rounded-full border border-[#00AEBB]/30">
                CHRONICLE 2022 — 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
