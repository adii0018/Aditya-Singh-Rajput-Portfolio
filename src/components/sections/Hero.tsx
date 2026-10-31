"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import { DURATION, EASE, scrollToTarget } from "@/lib/motion";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import AiDecryptHeading from "@/components/ui/AiDecryptHeading";
import AvatarTicker from "@/components/ui/AvatarTicker";
import { personal } from "@/lib/data";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(heroRef);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      // Check if hero intro already played in this session to respect user time [A03]
      const hasPlayed = typeof window !== "undefined" && sessionStorage.getItem("hero-intro-played");
      if (hasPlayed) {
        gsap.set([".hero-badge", ".hero-title-word", ".hero-subtitle", ".hero-cta-wrap", ".hero-scroll-btn"], {
          opacity: 1,
          y: 0,
        });
        if (imageWrapRef.current) {
          gsap.set(imageWrapRef.current, { opacity: 1, scale: 1 });
        }
      } else {
        sessionStorage.setItem("hero-intro-played", "true");
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
      });

      // 1. Badge entrance
      tl.from(".hero-badge", {
        y: -18,
        opacity: 0,
        duration: DURATION.base,
      })
      // 2. Heading: Cinematic word mask reveal
      .from(".hero-title-word", {
        y: "40%",
        opacity: 0,
        duration: DURATION.slow,
        stagger: 0.02,
        ease: EASE.outExtreme,
      }, "-=0.35")
      // 3. Subtitle: smooth rise
      .from(".hero-subtitle", {
        y: 8,
        opacity: 0,
        duration: 0.3,
      }, "-=0.55")
      // 4. CTA buttons & avatars row
      .from(".hero-cta-wrap", {
        y: 8,
        opacity: 0,
        duration: DURATION.base,
      }, "-=0.45")
      // 5. Right photo entrance: subtle scale from 1.05 to 1 & fade in
      .from(imageWrapRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: DURATION.cinematic,
        ease: "power2.out",
      }, 0.15)
      // 7. Scroll indicator
      .from(".hero-scroll-btn", {
        opacity: 0,
        y: 12,
        duration: 0.6,
      }, "-=0.2");

      // Subtle scroll parallax on hero photo
      if (imageWrapRef.current) {
        gsap.to(imageWrapRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: heroRef }
  );

  const scrollToAbout = () => {
    scrollToTarget(document.getElementById("beyond-the-code") || document.getElementById("about"));
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[640px] lg:min-h-[700px] xl:min-h-[740px] flex flex-col justify-between overflow-visible bg-[#ebeff5]"
    >

      {/* Main hero area */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between pt-24 lg:pt-0">
        
        {/* LEFT COLUMN: Hero content */}
        <div className="relative z-10 w-full lg:w-[52%] xl:w-[50%] flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-20 lg:pr-4 py-8 lg:py-14 shrink-0">
          
          {/* Makro-Style Single Live Availability Badge */}
          <div className="flex items-center self-start mb-5">
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#24242215] text-[#242426] text-[12px] font-mono shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2da44e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2da44e]"></span>
              </span>
              <span>Available for Roles</span>
            </div>
          </div>

          {/* Main Heading: Makro 1:1 display scale (matching 'Know your cash. Plan with AI.') */}
          <h1
            className="font-medium tracking-[-0.04em] leading-[1.04] text-[#141416] mb-5 max-w-3xl"
            style={{ fontSize: "clamp(44px, 5.4vw, 76px)" }}
            aria-label={`${personal.name}, ${personal.role}`}
          >
            {/* Server-rendered accessible identity heading for search engines and crawlers */}
            <span className="sr-only">
              {personal.name}, {personal.role}
            </span>
            <span aria-hidden="true" className="block">
              <div className="overflow-hidden whitespace-nowrap">
                <AiDecryptHeading
                  text={personal.heroLine1}
                  accentWords={["code."]}
                  autoDecrypt={false}
                  showCursor={false}
                  className="flex-nowrap whitespace-nowrap"
                />
              </div>
              <div className="overflow-hidden whitespace-nowrap">
                <AiDecryptHeading
                  text={personal.heroLine2}
                  accentWords={["AI."]}
                  autoDecrypt={false}
                  showCursor={false}
                  className="flex-nowrap whitespace-nowrap"
                />
              </div>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            className="hero-subtitle text-[#4d4f57] text-sm sm:text-base leading-relaxed max-w-lg mb-6"
          >
            {personal.subtitle}
          </p>

          {/* Makro 1:1 Primary CTA & Social Proof (Single Clean Action) */}
          <div className="hero-cta-wrap flex flex-wrap items-center gap-5 sm:gap-6 mb-5">
            {/* Primary button: Exact Makro-style dark pill with lime icon square */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const targetId = personal.ctaExplore?.targetId || "projects";
                scrollToTarget(targetId);
              }}
              className="group inline-flex items-center gap-3.5 p-1.5 pr-6 sm:pr-7 bg-[#242426] hover:bg-[#1b1b1d] text-white rounded-[20px] transition-all shadow-xl shadow-black/10 cursor-pointer border-0"
            >
              {/* Lime rounded icon box with clean arrow */}
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-[15px] bg-[#d9ff5c] text-[#141416] flex items-center justify-center font-bold text-lg shrink-0 transition-transform duration-300 group-hover:scale-105">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>

              {/* Button text */}
              <span className="font-medium text-base sm:text-[17px] tracking-[-0.01em]">
                Explore My Work
              </span>
            </motion.button>

            {/* Social Proof: Makro Avatar Infinite Ticker + Trusted by Solopreneurs caption */}
            <AvatarTicker />
          </div>
        </div>

        {/* RIGHT COLUMN: Makro-inspired Editorial Studio Portrait */}
        <div
          ref={imageWrapRef}
          className="w-full lg:absolute lg:right-0 lg:bottom-0 lg:w-[48%] xl:w-[50%] flex justify-center lg:justify-end items-end select-none pointer-events-none z-10 translate-y-8 sm:translate-y-10 lg:translate-y-12"
        >
          <div className="relative w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] xl:w-[530px] 2xl:w-[580px] aspect-[1700/2048] flex items-end">
            <Image
              src="/profile-editorial.webp"
              alt="Portrait of Aditya Singh Rajput"
              priority
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 52vw, 800px"
            />
          </div>
        </div>
      </div>

      {/* Anchor marker for DevPassCard initial position in Hero (lifted up into clean hero viewport) */}
      <div
        id="hero-devpass-anchor"
        className="absolute bottom-16 sm:bottom-24 md:bottom-28 lg:bottom-24 xl:bottom-28 left-1/2 -translate-x-1/2 w-[220px] h-[330px] pointer-events-none opacity-0 z-30"
      />

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToAbout}
        className="hero-scroll-btn absolute bottom-4 left-6 sm:left-12 lg:left-16 hidden md:flex items-center gap-1.5 text-[#4d4f57] hover:text-[#242426] transition-colors border-0 bg-transparent cursor-pointer z-30"
      >
        <span className="text-[10px] font-mono tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 0.75 }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </button>
    </section>
  );
}
