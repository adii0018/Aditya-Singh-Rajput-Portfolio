"use client";

import { useState, useRef } from "react";
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
  const categories = ["All", ...skillCategories];

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
      .from(".skills-domain-card", {
        y: 14,
        opacity: 0,
        stagger: 0.08,
        duration: 0.42,
        clearProps: "transform,opacity",
      }, "-=0.25")
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
                <span>Tech Stack · {skills.length} Technologies</span>
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

        </div>

        <div className="skills-grid-wrapper mt-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-5">
            <div>
              <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.24em] uppercase text-[#69717d]">
                Capability index <span className="text-[#16a34a]">/ 01</span>
              </p>
              <p className="mt-2 text-sm text-[#4d4f57]">
                A practical toolkit for turning ideas into shipped products.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter technologies by category">
              {categories.map((cat) => {
                const count = cat === "All" ? skills.length : skills.filter((skill) => skill.category === cat).length;
                const isSelected = activeTab === cat;
                const accent = cat === "All" ? "#d9ff5c" : CATEGORY_META[cat]?.accent || "#d9ff5c";

                return (
                  <motion.button
                    key={cat}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveTab(cat)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`skills-filter-btn inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] sm:text-xs font-mono transition-colors ${
                      isSelected
                        ? "border-[#242426] bg-[#242426] text-white shadow-md shadow-[#242426]/10"
                        : "border-[#24242618] bg-white/80 text-[#4d4f57] hover:border-[#24242640] hover:bg-white"
                    }`}
                  >
                    {cat !== "All" && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />}
                    <span>{cat}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${isSelected ? "bg-white/15 text-white/80" : "bg-[#24242608] text-[#4d4f57]/70"}`}>
                      {String(count).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[34px] border border-[#ffffff12] bg-[#17181b] p-4 sm:p-6 lg:p-8 text-white shadow-[0_28px_70px_rgba(20,22,28,0.18)]">
            <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#d9ff5c]/[0.07] blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:34px_34px]" />

            <div className="relative z-10 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-white/45">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9ff5c] opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d9ff5c]" />
                  </span>
                  Stack telemetry
                </div>
                <h3 className="mt-2 text-lg sm:text-xl font-semibold tracking-tight text-white">
                  {activeTab === "All" ? "Systems I build with" : CATEGORY_META[activeTab]?.title || activeTab}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-white/45">
                  {activeTab === "All"
                    ? "Four specialties. One end-to-end workflow."
                    : CATEGORY_META[activeTab]?.subtitle || "Specialized tools and technologies"}
                </p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#d9ff5c]">
                  {String(activeTab === "All" ? skills.length : skills.filter((skill) => skill.category === activeTab).length).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-mono leading-relaxed tracking-[0.15em] uppercase text-white/45">
                  tools<br />mapped
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`relative z-10 grid grid-cols-1 ${activeTab === "All" ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-4`}
              >
                {(activeTab === "All" ? skillCategories : [activeTab]).map((cat) => {
                  const meta = CATEGORY_META[cat] || {
                    title: cat,
                    subtitle: "Technologies and tools",
                    icon: Terminal,
                    accent: "#d9ff5c",
                    badgeBg: "bg-gray-100 text-gray-700 border-gray-200",
                  };
                  const CategoryIcon = meta.icon;
                  const categorySkills = skills.filter((skill) => skill.category === cat);

                  return (
                    <section
                      key={cat}
                      className="skills-domain-card group/domain relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#202125]/90 p-4 sm:p-5"
                    >
                      <div className="absolute left-0 top-0 h-px w-24 opacity-80" style={{ background: `linear-gradient(90deg, ${meta.accent}, transparent)` }} />
                      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]" style={{ color: meta.accent }}>
                            <CategoryIcon size={18} strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="truncate text-sm sm:text-base font-semibold tracking-tight text-white">{meta.title}</h4>
                            <p className="mt-0.5 truncate text-[10px] sm:text-[11px] font-mono text-white/40">{meta.subtitle}</p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-mono tracking-wider text-white/45">
                          {String(categorySkills.length).padStart(2, "0")} MODS
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {categorySkills.map((skill, index) => {
                          const score = skill.level === "Expert" ? 4 : skill.level === "Advanced" ? 3 : skill.level === "Intermediate" ? 2 : 1;

                          return (
                            <motion.article
                              key={skill.name}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22, delay: Math.min(index * 0.025, 0.18) }}
                              whileHover={{ y: -2 }}
                              className="group/skill flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.07] bg-[#141518]/80 p-3 transition-colors hover:border-white/20 hover:bg-[#292a2e]"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.055] p-2 transition-transform group-hover/skill:scale-105">
                                <TechIcon name={skill.name} size={25} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <h5 className="truncate text-xs sm:text-[13px] font-semibold text-white/90">{skill.name}</h5>
                                  <span className="shrink-0 text-[8px] font-mono uppercase tracking-wider text-white/35">{skill.level}</span>
                                </div>
                                <p className="mt-1 truncate text-[10px] font-mono text-white/40">{skill.desc || skill.category}</p>
                                <div className="mt-2 flex gap-1" aria-label={`${skill.level} proficiency`}>
                                  {Array.from({ length: 4 }, (_, dot) => (
                                    <span key={dot} className="h-0.5 flex-1 rounded-full" style={{ backgroundColor: dot < score ? meta.accent : "rgba(255,255,255,0.12)" }} />
                                  ))}
                                </div>
                              </div>
                            </motion.article>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-[9px] font-mono tracking-[0.14em] uppercase text-white/35">
              <span>Aditya Singh Rajput <span className="text-white/20">/</span> engineering toolkit</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#d9ff5c]" /> all systems operational</span>
            </div>
          </div>

          <div className="skills-marquee mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#24242612] bg-white/75 px-4 py-3">
            <span className="text-[9px] font-mono font-semibold tracking-[0.18em] uppercase text-[#7b818a]">Stack signal</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.slice(0, 5).map((skill) => (
                <span key={skill.name} className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#4d4f57]">
                  <TechIcon name={skill.name} size={15} /> {skill.name}
                </span>
              ))}
              <span className="text-[10px] font-mono font-semibold text-[#16a34a]">+ {skills.length - 5} more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
