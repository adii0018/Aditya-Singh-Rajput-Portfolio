"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { personal } from "@/lib/data";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[680px] lg:min-h-[780px] xl:min-h-screen flex flex-col justify-between overflow-hidden bg-[#ebeff5]"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-1"
        style={{
          backgroundImage: `linear-gradient(#24242210 1px, transparent 1px), linear-gradient(90deg, #24242210 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main hero area */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between pt-24 lg:pt-0">
        
        {/* LEFT COLUMN: Hero content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 w-full lg:w-[48%] xl:w-[46%] flex flex-col justify-center px-6 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-6 py-12 lg:py-24"
        >
          {/* Badge: AI-Powered Badge matching Makro pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#24242215] shadow-xs self-start mb-6"
          >
            <span className="text-[12px] opacity-70">☷</span>
            <span className="text-[11px] font-mono font-medium text-[#242426] tracking-wider uppercase">
              AI-Powered Engineer · Full-Stack
            </span>
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

        {/* RIGHT COLUMN: Full bleed photo matching reference media_1791876714572.png */}
        <motion.div
          style={{ y: imageY }}
          className="w-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[55%] xl:w-[54%] h-[520px] sm:h-[640px] lg:h-full z-0 overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src="/profile.jpg"
              alt="Aditya Singh Rajput"
              priority
              fill
              className="object-cover object-top lg:object-[center_top]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
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
