"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { personal } from "@/lib/data";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // 1. Text enters from the left
        tl.from(".hero-badge", {
          x: -40,
          opacity: 0,
          duration: 0.65,
        })
        .from(".hero-title-word", {
          x: -50,
          y: "30%",
          opacity: 0,
          duration: 0.85,
          stagger: 0.04,
          ease: "power4.out",
        }, "-=0.35")
        .from(".hero-subtitle", {
          x: -35,
          opacity: 0,
          duration: 0.7,
        }, "-=0.55")
        .from(".hero-cta-wrap", {
          x: -30,
          opacity: 0,
          duration: 0.65,
        }, "-=0.45")
        .from(".hero-social-row", {
          x: -25,
          opacity: 0,
          duration: 0.5,
        }, "-=0.35")
        // 2. Right photo enters from the right
        .from(imageWrapRef.current, {
          x: 70,
          scale: 1.04,
          opacity: 0,
          duration: 1.15,
          ease: "power3.out",
        }, 0.15)
        .from(".hero-scroll-btn", {
          opacity: 0,
          y: 12,
          duration: 0.6,
        }, "-=0.2");
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.from(".hero-badge", {
          x: -20,
          opacity: 0,
          duration: 0.6,
        })
        .from(".hero-title-word", {
          x: -25,
          opacity: 0,
          duration: 0.75,
          stagger: 0.03,
        }, "-=0.3")
        .from(".hero-subtitle", {
          x: -20,
          opacity: 0,
          duration: 0.6,
        }, "-=0.45")
        .from(".hero-cta-wrap", {
          x: -15,
          opacity: 0,
          duration: 0.6,
        }, "-=0.4")
        .from(imageWrapRef.current, {
          x: 35,
          opacity: 0,
          duration: 0.9,
        }, 0.2);
      });

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
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[680px] lg:min-h-[780px] xl:min-h-screen flex flex-col justify-between overflow-hidden bg-[#ebeff5]"
    >

      {/* Main hero area */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between pt-24 lg:pt-0">
        
        {/* LEFT COLUMN: Hero content */}
        <div className="relative z-10 w-full lg:w-[48%] xl:w-[46%] flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-6 py-12 lg:py-24">
          
          {/* Badge: AI-Powered Badge matching Makro pill */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#24242215] shadow-xs self-start mb-6">
            <span className="text-[12px] opacity-70">☷</span>
            <span className="text-[11px] font-mono font-medium text-[#242426] tracking-wider uppercase">
              ADITYA SINGH RAJPUT· AI & ML Engineer
            </span>
          </div>

          {/* Main Heading: 2-line clean refined typography matching Makro reference */}
          <h1
            className="font-medium tracking-[-0.035em] leading-[1.08] text-[#1f2022] mb-6"
            style={{ fontSize: "clamp(44px, 5.8vw, 80px)" }}
          >
            <div className="overflow-hidden">
              <AnimatedHeading text={personal.heroLine1} />
            </div>
            <div className="overflow-hidden">
              <AnimatedHeading text={personal.heroLine2} />
            </div>
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

            {/* Social avatar proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#c0adff] to-[#d9ff5c] flex items-center justify-center text-[10px] font-bold text-[#242426]">
                  AI
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#242426] text-white flex items-center justify-center text-[10px] font-bold">
                  ML
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#d9ff5c] text-[#242426] flex items-center justify-center text-[10px] font-bold">
                  TS
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#b8deff] text-[#242426] flex items-center justify-center text-[10px] font-bold">
                  PY
                </div>
              </div>
              <span className="text-xs text-[#4d4f57] font-medium">
                Trusted by solopreneurs
              </span>
            </div>
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
              alt="Aditya Singh Rajput"
              priority
              fill
              unoptimized
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
