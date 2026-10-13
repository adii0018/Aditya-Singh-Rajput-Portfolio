"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { skillDomains, skillCategories, skills } from "@/lib/data";
import AbstergoLoader from "@/components/ui/AbstergoLoader";
import TechIcon from "@/components/ui/TechIcon";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const categories = ["All", ...skillCategories];

  const displayedDomains =
    activeCategory === "All"
      ? skillDomains
      : skillDomains.filter((d) => d.category === activeCategory);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        // Reveal content from the right
        tl.from(".skills-badge", {
          x: 40,
          opacity: 0,
          duration: 0.6,
          clearProps: "transform,opacity",
        })
        .from(".skills-loader", {
          scale: 0.8,
          opacity: 0,
          duration: 0.65,
          ease: "back.out(1.7)",
          clearProps: "transform,opacity",
        }, "-=0.35")
        .from(".skills-heading", {
          x: 50,
          opacity: 0,
          duration: 0.75,
          clearProps: "transform,opacity",
        }, "-=0.5")
        .from(".skills-filter-btn", {
          x: 35,
          opacity: 0,
          stagger: 0.04,
          duration: 0.5,
          clearProps: "transform,opacity",
        }, "-=0.45")
        .from(".skills-domains-wrapper", {
          x: 55,
          opacity: 0,
          duration: 0.75,
          clearProps: "transform,opacity",
        }, "-=0.2")
        .from(".skills-marquee", {
          opacity: 0,
          duration: 0.6,
          clearProps: "opacity",
        }, "-=0.2");
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.from(".skills-badge", {
          x: 20,
          opacity: 0,
          duration: 0.5,
          clearProps: "transform,opacity",
        })
        .from(".skills-heading", {
          x: 25,
          opacity: 0,
          duration: 0.6,
          clearProps: "transform,opacity",
        }, "-=0.4")
        .from(".skills-domains-wrapper", {
          x: 25,
          opacity: 0,
          duration: 0.65,
          clearProps: "transform,opacity",
        }, "-=0.2");
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-[#ebeff5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="skills-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ Tech Stack by Domain
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="skills-loader shrink-0 flex items-center justify-center">
                <AbstergoLoader />
              </div>
              <h2
                className="skills-heading font-black text-[#242426] leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Tools I work
                <br />
                <span className="italic text-[#4d4f57]">with</span>
              </h2>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2 max-w-xl">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`skills-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#242426] text-white border-0 shadow-md shadow-[#24242620]"
                    : "bg-white border border-[#24242220] text-[#4d4f57] hover:border-[#24242240] hover:text-[#242426]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Domain-separated groups */}
        <div className="skills-domains-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
            {displayedDomains.map((domain) => (
              <div
                key={domain.id}
                className="p-6 sm:p-7 rounded-3xl bg-white/75 backdrop-blur-md border border-[#24242212] shadow-xs space-y-5"
              >
                {/* Domain Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#24242210]">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#242426] text-white text-xs font-mono font-medium">
                      {domain.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight">
                      {domain.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4d4f57] font-mono sm:max-w-md sm:text-right">
                    {domain.description}
                  </p>
                </div>

                {/* Domain Tools Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {domain.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: i * 0.025,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="flex flex-col items-center gap-2 p-3.5 bg-white rounded-2xl border border-[#24242210] hover:border-[#242426] hover:shadow-lg hover:shadow-[#2424260a] transition-all cursor-default group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TechIcon name={skill.name} className="w-8 h-8" />
                      </div>
                      <span className="text-[#242426] font-semibold text-xs text-center truncate w-full">
                        {skill.name}
                      </span>
                      <span className="text-[#4d4f57] text-[10px] font-mono text-center px-1.5 py-0.5 rounded-md bg-[#ebeff5] w-full truncate">
                        {skill.role}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Marquee strip */}
        <div className="skills-marquee mt-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#ebeff5] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#ebeff5] to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            className="flex gap-4 w-max"
          >
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#24242210] text-[#4d4f57] text-xs font-medium whitespace-nowrap shadow-xs"
              >
                <TechIcon name={skill.name} className="w-4 h-4 shrink-0" />
                {skill.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
