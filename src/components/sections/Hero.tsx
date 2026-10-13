"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
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
      }, 40);
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f3f9 0%, #ebeff5 50%, #e4eaf3 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(#24242210 1px, transparent 1px), linear-gradient(90deg, #24242210 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#d9ff5c] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-64 h-64 rounded-full bg-[#c0adff] opacity-15 blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center max-w-6xl mx-auto w-full px-6 pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center w-full">

          {/* Left — Text */}
          <motion.div style={{ y: textY, opacity }} className="flex flex-col gap-6 z-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start"
            >
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#d9ff5c] text-[#242426] font-semibold text-xs tracking-wider uppercase">
                <Sparkles size={12} />
                Available for opportunities
              </span>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TypewriterBadge text={personal.badge} />
            </motion.div>

            {/* Main heading */}
            <h1
              className="font-black leading-[1.0] tracking-tight text-[#242426]"
              style={{ fontSize: "clamp(44px, 6vw, 78px)" }}
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
              className="text-[#4d4f57] text-base md:text-lg leading-relaxed max-w-md"
            >
              {personal.subtitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-6 py-3 bg-[#d9ff5c] text-[#242426] font-bold rounded-full text-sm hover:shadow-lg hover:shadow-[#d9ff5c40] transition-all border-0 cursor-pointer"
              >
                <span>→</span> Explore My Work
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-6 py-3 bg-[#242426] text-white font-semibold rounded-full text-sm hover:bg-[#3a3a3c] transition-all border-0 cursor-pointer"
              >
                Let&apos;s Connect
              </motion.button>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-4 mt-2"
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#4d4f57] text-xs hover:text-[#242426] transition-colors"
              >
                <GithubIcon size={13} /> GitHub
              </a>
              <span className="text-[#24242230]">·</span>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#4d4f57] text-xs hover:text-[#242426] transition-colors"
              >
                <LinkedinIcon size={13} /> LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Photo / Developer Portrait Card */}
          <motion.div
            style={{ y: imageY }}
            className="relative flex justify-center lg:justify-end z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative"
            >
              {/* Profile Card Frame */}
              <div className="relative w-[300px] h-[380px] md:w-[360px] md:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#242426] via-[#2a2a2d] to-[#1c1c1e] border border-[#24242215] shadow-2xl p-6 flex flex-col justify-between select-none">
                {/* Ambient glow backgrounds */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#d9ff5c]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#c0adff]/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top card bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#d9ff5c] animate-pulse" />
                    SYSTEM ONLINE
                  </span>
                  <span className="text-[#ffffff40] font-mono text-xs">AI · 2024</span>
                </div>

                {/* Center visual avatar */}
                <div className="relative z-10 flex flex-col items-center justify-center py-6">
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#d9ff5c]/30 via-[#c0adff]/30 to-white/10 p-1 mb-4 flex items-center justify-center shadow-inner">
                    <div className="w-full h-full rounded-full bg-[#242426] border border-white/10 flex items-center justify-center">
                      <span className="text-3xl font-black tracking-tight text-white font-mono">
                        A<span className="text-[#d9ff5c]">/</span>
                      </span>
                    </div>
                    {/* Orbiting accent dot */}
                    <div className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#d9ff5c] border-2 border-[#242426]" />
                  </div>

                  <h3 className="text-white font-bold text-lg tracking-tight mb-1">
                    Aditya Singh Rajput
                  </h3>
                  <p className="text-[#ffffff60] text-xs font-mono tracking-wide">
                    AI/ML Engineer & Full-Stack
                  </p>
                </div>

                {/* Bottom card details */}
                <div className="relative z-10 bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#d9ff5c]" />
                    <span className="text-white/80 text-xs font-medium">Neural Networks & Web</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#d9ff5c] font-semibold">v1.0</span>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -left-10 top-16 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#24242210]"
              >
                <p className="text-xs text-[#4d4f57] font-mono">AI/ML Engineer</p>
                <p className="text-sm font-bold text-[#242426]">🤖 4 Projects</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 bottom-20 bg-[#242426] rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-xs text-[#ffffff80] font-mono">Open to work</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#d9ff5c] animate-pulse" />
                  <p className="text-sm font-bold text-white">Available ✓</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4d4f57] hover:text-[#242426] transition-colors border-0 bg-transparent cursor-pointer"
      >
        <span className="text-xs font-mono tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
