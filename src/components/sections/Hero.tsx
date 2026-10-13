"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { personal } from "@/lib/data";

// Typing cursor blink
function TypewriterBadge({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[idx]);
        setIdx((i) => i + 1);
      }, 35);
      return () => clearTimeout(t);
    }
  }, [idx, text]);

  return (
    <span className="font-mono text-xs tracking-widest text-[#4d4f57]">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block ml-0.5 w-0.5 h-3 bg-[#d9ff5c] align-middle"
      />
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#ebeff5]"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#24242210 1px, transparent 1px), linear-gradient(90deg, #24242210 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main hero grid: Split layout matching reference website */}
      <div className="relative flex-1 w-full grid grid-cols-1 lg:grid-cols-2 items-center pt-24 lg:pt-20">
        
        {/* LEFT COLUMN: Hero content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="flex flex-col justify-center px-6 sm:px-10 lg:pl-16 xl:pl-24 lg:pr-8 py-12 lg:py-16 z-10 max-w-2xl"
        >
          {/* Badge: AI-Powered Badge matching Makro pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#24242215] shadow-xs self-start mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#d9ff5c]" />
            <span className="text-[11px] font-mono font-medium text-[#242426] tracking-wider uppercase">
              AI/ML ENGINEER · FULL-STACK DEVELOPER
            </span>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-3"
          >
            <TypewriterBadge text="INNOVATOR · PROBLEM SOLVER" />
          </motion.div>

          {/* Main Heading: 2-line clean bold typography */}
          <h1
            className="font-black leading-[1.05] tracking-tight text-[#242426] mb-5"
            style={{ fontSize: "clamp(42px, 5.5vw, 76px)" }}
          >
            <div>
              <AnimatedHeading text={personal.heroLine1} />
            </div>
            <div>
              <AnimatedHeading text={personal.heroLine2} />
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-[#4d4f57] text-base sm:text-lg leading-relaxed max-w-lg mb-8"
          >
            {personal.subtitle}
          </motion.p>

          {/* CTA Buttons & Social proof row matching Makro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
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

            {/* Social avatar proof: Matching exact reference layout */}
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
          </motion.div>

          {/* Secondary links & Connect button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-4 text-xs"
          >
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
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Full Portrait Image with Floating Cards (Exact match to reference) */}
        <motion.div
          style={{ y: imageY }}
          className="relative w-full h-[540px] sm:h-[640px] lg:h-full min-h-[540px] lg:min-h-[720px] flex items-end justify-center lg:justify-end overflow-hidden"
        >
          {/* Portrait Photo: Clean, high-res bleed */}
          <div className="relative w-full h-full">
            <Image
              src="/profile.jpg"
              alt="Aditya Singh Rajput"
              priority
              fill
              className="object-cover object-top lg:object-[center_top]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Floating Card 1: Reduction +6% (Exact match to reference top card) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -6, scale: 1.03, rotate: 0 }}
            className="absolute bottom-28 right-6 sm:right-12 lg:right-16 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 w-44 sm:w-52 select-none"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#242426] font-bold text-xs tracking-tight">Reduction</span>
              <span className="text-[11px] font-mono font-semibold text-[#4d4f57] bg-[#24242208] px-2 py-0.5 rounded-full">
                +6%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 my-2 py-2 border-y border-[#24242208] text-center">
              <div>
                <p className="text-[10px] font-mono text-[#4d4f57]/60">1</p>
                <p className="text-[10px] font-semibold text-[#242426]">Mon</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#4d4f57]/60">2</p>
                <p className="text-[10px] font-semibold text-[#242426]">Tue</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#4d4f57]/60">3</p>
                <p className="text-[10px] font-semibold text-[#242426]">Wed</p>
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black text-[#242426] tracking-tight">
                96%
              </span>
              <span className="text-[#5a6e00] font-bold text-xs bg-[#d9ff5c] px-1.5 py-0.5 rounded-md">
                ▲
              </span>
            </div>
          </motion.div>

          {/* Floating Card 2: Liquidity +12% (Exact match to reference bottom-left card) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -6, scale: 1.03, rotate: 0 }}
            className="absolute bottom-6 left-6 sm:left-12 lg:left-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 w-44 sm:w-52 select-none"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#242426] font-bold text-xs tracking-tight">Liquidity</span>
              <span className="text-[11px] font-mono font-semibold text-[#4d4f57] bg-[#24242208] px-2 py-0.5 rounded-full">
                +12%
              </span>
            </div>
            <p className="text-[11px] text-[#4d4f57] mb-3">Safe cash buffer</p>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-[#242426] tracking-tight">
                82%
              </span>
              <span className="text-[#5a6e00] font-bold text-xs bg-[#d9ff5c] px-1.5 py-0.5 rounded-md">
                ▲
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-[#4d4f57] hover:text-[#242426] transition-colors border-0 bg-transparent cursor-pointer z-30"
      >
        <span className="text-[10px] font-mono tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
