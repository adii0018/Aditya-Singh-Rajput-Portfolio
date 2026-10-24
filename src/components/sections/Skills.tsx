"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { skills, skillCategories } from "@/lib/data";
import AbstergoLoader from "@/components/ui/AbstergoLoader";
import TechIcon from "@/components/ui/TechIcon";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Terminal, Cpu, Globe, Cloud, Layers } from "lucide-react";

interface CategoryMeta {
  title: string;
  subtitle: string;
  icon: typeof Cpu;
  accent: string;
  badgeBg: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "AI / ML": {
    title: "AI & Machine Learning",
    subtitle: "Models, Computer Vision, Data Science & Deep Learning",
    icon: Cpu,
    accent: "#16a34a",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "Web & Backend": {
    title: "Web & Backend Architecture",
    subtitle: "Full-Stack Frameworks, Reactive UIs & Scalable Databases",
    icon: Globe,
    accent: "#0284c7",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
  },
  "Cloud & DevOps": {
    title: "Cloud & Distributed Systems",
    subtitle: "Multi-Cloud Deployments, Infrastructure & Linux Servers",
    icon: Cloud,
    accent: "#d97706",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "Core & Systems": {
    title: "Core Languages & Systems",
    subtitle: "Algorithmic Performance, Version Control & Containerization",
    icon: Layers,
    accent: "#7c3aed",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMarqueeInView, setIsMarqueeInView] = useState(true);
  const categories = ["All", ...skillCategories];
  // Pause marquee when offscreen to preserve GPU/battery [P02]
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsMarqueeInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".skills-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".skills-loader", {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, "-=0.35")
      .from(".skills-heading", {
        y: 30,
        opacity: 0,
        duration: 0.75,
      }, "-=0.5")
      .from(".skills-filter-btn", {
        y: 15,
        opacity: 0,
        stagger: 0.04,
        duration: 0.5,
      }, "-=0.45")
      .from(".skills-grid-wrapper", {
        y: 25,
        opacity: 0,
        duration: 0.7,
      }, "-=0.3")
      .from(".skills-marquee", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, "-=0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-[#ebeff5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="skills-badge mb-4">
              <Badge variant="outline" className="bg-white/80 border-[#24242220] shadow-xs text-[#242426]">
                <Sparkles size={13} className="text-[#16a34a]" />
                <span>/ tech-stack // 22 tools</span>
              </Badge>
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
                <span className="italic text-[#4d4f57] font-serif font-normal">with</span>
              </h2>
            </div>
          </div>

          {/* Clean Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? skills.length
                  : skills.filter((s) => s.category === cat).length;
              const isSelected = activeTab === cat;

              return (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`skills-filter-btn px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#242426] text-white shadow-md shadow-[#242426]/10 border border-transparent font-medium"
                      : "bg-white/80 hover:bg-white border border-[#24242215] text-[#4d4f57] hover:border-[#24242230]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#242426]/5 text-[#4d4f57]/80"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ================= LIGHTWEIGHT TECH STACK SHOWCASE ================= */}
        <div className="skills-grid-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* If "All" is active, display in clean categorized domain sections */}
              {activeTab === "All" ? (
                skillCategories.map((cat) => {
                  const meta = CATEGORY_META[cat] || {
                    title: cat,
                    subtitle: "Technologies & tools",
                    icon: Terminal,
                    accent: "#242426",
                    badgeBg: "bg-gray-100 text-gray-700 border-gray-200",
                  };
                  const CatIcon = meta.icon;
                  const catSkills = skills.filter((s) => s.category === cat);

                  return (
                    <div key={cat} className="space-y-3.5">
                      {/* Domain Section Header */}
                      <div className="flex items-center justify-between pb-1 border-b border-[#24242210]">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: meta.accent }}
                          >
                            <CatIcon size={15} />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm sm:text-base text-[#242426] tracking-tight">
                              {meta.title}
                            </h3>
                            <p className="text-[11px] text-[#4d4f57]/80 font-mono hidden sm:block">
                              {meta.subtitle}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${meta.badgeBg}`}
                        >
                          {catSkills.length} tools
                        </span>
                      </div>

                      {/* Tool Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {catSkills.map((skill, idx) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.025 }}
                            whileHover={{ y: -3, scale: 1.015 }}
                            className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#24242212] hover:border-[#24242630] hover:shadow-md hover:shadow-[#242426]/5 transition-all cursor-default"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Real Brand Icon */}
                              <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f4f6fa] border border-[#24242208] flex items-center justify-center p-2 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all">
                                <TechIcon name={skill.name} size={28} />
                              </div>

                              {/* Tool Info */}
                              <div className="min-w-0">
                                <h4 className="font-bold text-sm text-[#242426] group-hover:text-black tracking-tight truncate">
                                  {skill.name}
                                </h4>
                                <p className="text-[11px] text-[#4d4f57]/80 font-mono truncate">
                                  {skill.desc || skill.category}
                                </p>
                              </div>
                            </div>

                            {/* Level Pill */}
                            <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#242426]/5 text-[#4d4f57] border border-[#24242210] group-hover:border-[#242426]/20 transition-colors">
                              {skill.level}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Filtered view for a single domain */
                <div className="space-y-4">
                  {(() => {
                    const meta = CATEGORY_META[activeTab] || {
                      title: activeTab,
                      subtitle: "Specialized tools",
                      icon: Terminal,
                      accent: "#242426",
                      badgeBg: "bg-gray-100 text-gray-700 border-gray-200",
                    };
                    const CatIcon = meta.icon;
                    const catSkills = skills.filter((s) => s.category === activeTab);

                    return (
                      <>
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#24242210]">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: meta.accent }}
                          >
                            <CatIcon size={16} />
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-[#242426]">
                              {meta.title}
                            </h3>
                            <p className="text-xs text-[#4d4f57]/80 font-mono">
                              {meta.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {catSkills.map((skill, idx) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: idx * 0.03 }}
                              whileHover={{ y: -3, scale: 1.015 }}
                              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#24242212] hover:border-[#24242630] hover:shadow-md hover:shadow-[#242426]/5 transition-all cursor-default"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f4f6fa] border border-[#24242208] flex items-center justify-center p-2 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all">
                                  <TechIcon name={skill.name} size={28} />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-sm text-[#242426] group-hover:text-black tracking-tight truncate">
                                    {skill.name}
                                  </h4>
                                  <p className="text-[11px] text-[#4d4f57]/80 font-mono truncate">
                                    {skill.desc || skill.category}
                                  </p>
                                </div>
                              </div>

                              <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#242426]/5 text-[#4d4f57] border border-[#24242210]">
                                {skill.level}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Marquee strip */}
        <div ref={marqueeRef} className="skills-marquee mt-14 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#ebeff5] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#ebeff5] to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={isMarqueeInView ? { x: ["0%", "-50%"] } : undefined}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            className="flex gap-3.5 w-max"
          >
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#24242210] text-[#4d4f57] text-xs font-medium whitespace-nowrap shadow-sm hover:border-[#24242630] transition-colors"
              >
                <TechIcon name={skill.name} size={18} />
                <span className="font-mono text-xs text-[#242426] font-semibold">{skill.name}</span>
                <span className="text-[10px] text-[#8b949e] font-mono">· {skill.category}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
