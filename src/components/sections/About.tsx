"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Code2, Brain, Rocket, MapPin } from "lucide-react";

const highlights = [
  {
    icon: <Brain size={18} />,
    label: "AI/ML Focus",
    desc: "Computer Vision, NLP & LLMs",
    color: "#d9ff5c",
  },
  {
    icon: <Code2 size={18} />,
    label: "Full-Stack",
    desc: "React, Next.js, Django, FastAPI",
    color: "#c0adff",
  },
  {
    icon: <Rocket size={18} />,
    label: "Builder",
    desc: "4+ AI-powered products shipped",
    color: "#b8deff",
  },
  {
    icon: <MapPin size={18} />,
    label: "Based in India",
    desc: "Open to remote opportunities",
    color: "#d9ff5c",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative section-padding overflow-hidden"
      style={{ background: "#242426" }}
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <ScrollReveal delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff60] text-xs font-mono tracking-wider uppercase mb-6">
                ✦ About Me
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2
                className="font-black text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
              >
                I turn complex
                <br />
                <span className="text-[#d9ff5c]">ideas into</span>
                <br />
                real solutions.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-[#ffffff80] text-base leading-relaxed mb-5">
                I&apos;m <strong className="text-white">Aditya Singh Rajput</strong> — an AI/ML Engineer
                and Full-Stack Developer passionate about building products that matter. I specialize in
                bridging the gap between cutting-edge AI research and real-world applications.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-[#ffffff60] text-base leading-relaxed mb-8">
                From AI exam proctoring systems to conversational government assistants, I&apos;ve built
                products that impact real people. I thrive at the intersection of machine intelligence
                and human-centered design — creating things that are not just smart, but truly useful.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap gap-2">
                {["Problem Solver", "AI Enthusiast", "Open Source", "Hackathon Winner"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff80] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.label} delay={0.2 + i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-5 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] backdrop-blur-sm cursor-default group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: item.color + "20", color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-[#ffffff50] text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#ffffff15] rounded-2xl overflow-hidden mt-16">
            {[
              { num: "4+", label: "AI Projects" },
              { num: "10+", label: "Technologies" },
              { num: "3+", label: "Hackathons" },
              { num: "∞", label: "Ideas to Build" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#242426] px-8 py-6 text-center group hover:bg-[#2e2e30] transition-colors"
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
        </ScrollReveal>
      </div>
    </section>
  );
}
