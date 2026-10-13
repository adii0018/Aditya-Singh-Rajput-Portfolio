"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { Code2, Brain, Rocket, MapPin } from "lucide-react";
import DockingDashboard from "@/components/ui/DockingDashboard";

const highlights = [
  {
    icon: <Brain size={16} />,
    label: "AI/ML Focus",
    desc: "Computer Vision, NLP & LLMs",
    color: "#d9ff5c",
  },
  {
    icon: <Code2 size={16} />,
    label: "Full-Stack",
    desc: "React, Next.js, Django, FastAPI",
    color: "#c0adff",
  },
  {
    icon: <Rocket size={16} />,
    label: "Builder",
    desc: "4+ AI-powered products shipped",
    color: "#b8deff",
  },
  {
    icon: <MapPin size={16} />,
    label: "Based in India",
    desc: "Open to remote opportunities",
    color: "#d9ff5c",
  },
];

function renderWords(
  text: string,
  options?: {
    boldWords?: string[];
    accentWords?: string[];
    accentColor?: string;
    targetColor?: string;
  }
) {
  const words = text.split(" ");
  return words.map((word, i) => {
    const clean = word.replace(/[^a-zA-Z0-9/—'-]/g, "");
    const isBold = options?.boldWords?.includes(clean);
    const isAccent = options?.accentWords?.includes(clean);
    const targetColor = isAccent
      ? options?.accentColor || "#d9ff5c"
      : options?.targetColor || "#ffffff";

    return (
      <span key={`${word}-${i}`}>
        <span
          className={`about-reveal-word inline-block ${isBold ? "font-bold text-white" : ""}`}
          data-target-color={targetColor}
          data-accent={isAccent ? targetColor : undefined}
          style={{
            opacity: 0.2,
            color: "rgba(255, 255, 255, 0.2)",
            willChange: "opacity, color",
          }}
        >
          {word}
        </span>
        {i < words.length - 1 ? " " : ""}
      </span>
    );
  });
}

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) {
        const words = textWrapRef.current?.querySelectorAll(".about-reveal-word");
        if (words) {
          gsap.set(words, {
            opacity: 1,
            color: (index, target) =>
              (target as HTMLElement).dataset.targetColor || "#ffffff",
          });
        }
        return;
      }

      const mm = gsap.matchMedia();

      // Static elements entrance from the left
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 78%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.from(".about-badge", {
          x: -35,
          opacity: 0,
          duration: 0.6,
        })
        .from(".about-tag", {
          x: -25,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
        }, "-=0.2")
        .from(".about-highlight-card", {
          x: -50,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75,
        }, "-=0.2")
        .from(".about-stat-item", {
          x: -35,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
        }, "-=0.3");
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.from(".about-badge", {
          x: -20,
          opacity: 0,
          duration: 0.5,
        })
        .from(".about-tag", {
          x: -15,
          opacity: 0,
          stagger: 0.04,
          duration: 0.45,
        }, "-=0.2")
        .from(".about-highlight-card", {
          x: -25,
          opacity: 0,
          stagger: 0.06,
          duration: 0.6,
        }, "-=0.2")
        .from(".about-stat-item", {
          x: -20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.6,
        }, "-=0.3");
      });

      // Premium scroll-linked word-by-word reveal (scrub synced with scroll)
      const words = textWrapRef.current?.querySelectorAll(".about-reveal-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0.2,
            color: "rgba(255, 255, 255, 0.2)",
          },
          {
            opacity: 1,
            color: (index, target) =>
              (target as HTMLElement).dataset.targetColor || "#ffffff",
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: textWrapRef.current,
              start: "top 80%",
              end: "bottom 48%",
              scrub: 0.3,
            },
          }
        );
      }
    },
    { scope: aboutRef }
  );

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative z-20 section-padding overflow-visible rounded-t-[32px] sm:rounded-t-[44px]"
      style={{ background: "#242426" }}
    >
      {/* Background accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 overflow-visible">
        
        {/* Top Header Section with Scroll-Linked Word Reveal */}
        <div ref={textWrapRef} className="text-center max-w-3xl mx-auto mb-6">
          <div className="about-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff60] text-xs font-mono tracking-wider uppercase mb-6">
            ✦ About Me
          </div>

          <h2
            className="about-heading font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
          >
            <span
              className="about-reveal-word inline-block"
              data-target-color="#ffffff"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              I
            </span>{" "}
            <span
              className="about-reveal-word inline-block"
              data-target-color="#ffffff"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              turn
            </span>{" "}
            <span
              className="about-reveal-word inline-block"
              data-target-color="#ffffff"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              complex
            </span>
            <br />
            <span
              className="about-reveal-word inline-block"
              data-target-color="#d9ff5c"
              data-accent="#d9ff5c"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              ideas
            </span>{" "}
            <span
              className="about-reveal-word inline-block"
              data-target-color="#d9ff5c"
              data-accent="#d9ff5c"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              into
            </span>
            <br />
            <span
              className="about-reveal-word inline-block"
              data-target-color="#ffffff"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              real
            </span>{" "}
            <span
              className="about-reveal-word inline-block"
              data-target-color="#ffffff"
              style={{ opacity: 0.2, color: "rgba(255, 255, 255, 0.2)", willChange: "opacity, color" }}
            >
              solutions.
            </span>
          </h2>

          <p className="about-paragraph text-[#ffffff85] text-base sm:text-lg leading-relaxed mb-4">
            {renderWords(
              "I'm Aditya Singh Rajput — an AI/ML Engineer and Full-Stack Developer passionate about building products that matter. I specialize in bridging the gap between cutting-edge AI research and real-world applications.",
              { boldWords: ["Aditya", "Singh", "Rajput"], targetColor: "#ffffff" }
            )}
          </p>

          <p className="about-paragraph text-[#ffffff60] text-sm sm:text-base leading-relaxed mb-6">
            {renderWords(
              "From AI exam proctoring systems to conversational government assistants, I thrive at the intersection of machine intelligence and human-centered design — creating products that are not just smart, but truly useful.",
              { targetColor: "rgba(255, 255, 255, 0.85)" }
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {["Problem Solver", "AI Enthusiast", "Open Source", "Hackathon Winner"].map(
              (tag) => (
                <span
                  key={tag}
                  className="about-tag px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff80] text-xs font-medium"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Centerpiece: The Makro Scroll-Docking Dashboard Component */}
        <DockingDashboard />

        {/* 4 Highlight Capability Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 mb-16">
          {highlights.map((item) => (
            <div key={item.label} className="about-highlight-card">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                className="p-5 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] backdrop-blur-sm cursor-default group h-full"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ background: item.color + "20", color: item.color }}
                >
                  {item.icon}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-[#ffffff50] text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#ffffff15] rounded-2xl overflow-hidden">
          {[
            { num: "4+", label: "AI Projects" },
            { num: "10+", label: "Technologies" },
            { num: "3+", label: "Hackathons" },
            { num: "∞", label: "Ideas to Build" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="about-stat-item bg-[#242426] px-8 py-6 text-center group hover:bg-[#2e2e30] transition-colors"
            >
              <p
                className="font-black text-[#d9ff5c] mb-1"
                style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
              >
                {stat.num}
              </p>
              <p className="text-[#ffffff50] text-xs font-mono uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
