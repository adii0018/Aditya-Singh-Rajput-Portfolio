"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, FileDown, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { personal } from "@/lib/data";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      // Check if hero intro already played in this session to respect user time [A03]
      const hasPlayed = typeof window !== "undefined" && sessionStorage.getItem("hero-intro-played");
      if (hasPlayed) {
        gsap.set([".hero-badge", ".hero-title-word", ".hero-subtitle", ".hero-cta-wrap", ".hero-social-row", ".hero-scroll-btn"], {
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
        y: "115%",
        opacity: 0,
        duration: DURATION.slow,
        stagger: 0.05,
        ease: EASE.outExtreme,
      }, "-=0.35")
      // 3. Subtitle: smooth rise
      .from(".hero-subtitle", {
        y: 22,
        opacity: 0,
        duration: 0.75,
      }, "-=0.55")
      // 4. CTA buttons & avatars row
      .from(".hero-cta-wrap", {
        y: 20,
        opacity: 0,
        duration: DURATION.base,
      }, "-=0.45")
      // 5. Social proof links
      .from(".hero-social-row", {
        y: 12,
        opacity: 0,
        duration: 0.5,
      }, "-=0.35")
      // 6. Right photo entrance: subtle scale from 1.05 to 1 & fade in
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
    (document.getElementById("beyond-the-code") || document.getElementById("about"))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[680px] lg:min-h-[780px] xl:min-h-svh flex flex-col justify-between overflow-hidden bg-[#ebeff5]"
    >

      {/* Main hero area */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between pt-24 lg:pt-0">
        
        {/* LEFT COLUMN: Hero content */}
        <div className="relative z-10 w-full lg:w-[48%] xl:w-[46%] flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-6 py-12 lg:py-24">
          
          {/* Badge & Live Availability */}
          <div className="flex flex-wrap items-center gap-3 self-start mb-6">
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#24242215] shadow-xs">
              <span className="text-[12px] opacity-70">☷</span>
              <span className="text-[11px] font-mono font-medium text-[#242426] tracking-wider uppercase">
                ADITYA SINGH RAJPUT · AI & ML Engineer
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#24242215] text-[#242426] text-[11px] font-mono shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2da44e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2da44e]"></span>
              </span>
              <span>Available for Roles</span>
            </div>
          </div>

          {/* Main Heading: 2-line clean refined typography matching Makro reference */}
          <h1
            className="font-medium tracking-[-0.035em] leading-[1.08] text-[#1f2022] mb-6"
            style={{ fontSize: "clamp(44px, 5.8vw, 80px)" }}
            aria-label={`${personal.name}, ${personal.role}`}
          >
            {/* Server-rendered accessible identity heading for search engines and crawlers */}
            <span className="sr-only">
              {personal.name}, {personal.role}
            </span>
            <span aria-hidden="true" className="block">
              <div className="overflow-hidden">
                <AnimatedHeading text={personal.heroLine1} />
              </div>
              <div className="overflow-hidden">
                <AnimatedHeading text={personal.heroLine2} />
              </div>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-[#4d4f57] text-base sm:text-lg leading-relaxed max-w-lg mb-8">
            {personal.subtitle}
          </p>

          {/* CTA Buttons & Social proof row matching Makro */}
          <div className="hero-cta-wrap flex flex-wrap items-center gap-4 mb-6">
            {/* Primary button: Dark pill with inner green arrow circle (Exact Makro signature button) */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-3 pl-2 pr-6 py-2 bg-[#242426] text-white rounded-full text-sm font-semibold hover:bg-[#333336] transition-all shadow-lg shadow-[#242426]/10 cursor-pointer border-0"
            >
              <span className="w-8 h-8 rounded-full bg-[#d9ff5c] text-[#242426] flex items-center justify-center font-bold text-sm">
                →
              </span>
              <span>Explore My Work</span>
            </motion.button>

            {/* Download CV Button */}
            <motion.a
              href="/Aditya_Singh_Rajput_Resume.pdf"
              download="Aditya_Singh_Rajput_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#242426] bg-white border border-[#24242220] hover:border-[#242426] hover:shadow-xs transition-all cursor-pointer"
            >
              <FileDown size={16} className="text-[#2da44e]" />
              <span>Download Resume</span>
            </motion.a>

            {/* Terminal quick-launch pill */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.dispatchEvent(new CustomEvent("open-terminal"))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-mono text-[#4d4f57] bg-[#242426]/5 hover:bg-[#242426]/10 transition-all cursor-pointer border border-[#24242210]"
              title="Open Developer Terminal (Ctrl+K)"
            >
              <Terminal size={13} className="text-[#242426]" />
              <span className="hidden sm:inline">⌘K Terminal</span>
            </motion.button>
          </div>

          {/* Secondary links & Connect button */}
          <div className="hero-social-row flex items-center gap-4 text-xs">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-4 py-2 rounded-full font-semibold text-[#242426] bg-white border border-[#24242215] hover:border-[#242426] transition-all cursor-pointer"
            >
              Let&apos;s Connect
            </motion.button>
            <span className="text-[#24242230]">·</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4d4f57] hover:text-[#242426] transition-colors"
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <span className="text-[#24242230]">·</span>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4d4f57] hover:text-[#242426] transition-colors"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Full bleed photo matching reference media_1791876714572.png */}
        <div
          ref={imageWrapRef}
          className="w-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[55%] xl:w-[54%] h-[520px] sm:h-[640px] lg:h-full z-0 overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src="/profile.jpg"
              alt="Portrait of Aditya Singh Rajput"
              priority
              fill
              className="object-cover object-top lg:object-[center_top]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      {/* Anchor marker for DevPassCard initial position in Hero (Bottom Center to avoid face) */}
      <div
        id="hero-devpass-anchor"
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[220px] h-[330px] pointer-events-none opacity-0 z-30"
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
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </button>
    </section>
  );
}
