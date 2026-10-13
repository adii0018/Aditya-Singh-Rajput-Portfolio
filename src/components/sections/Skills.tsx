"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { skills, skillCategories } from "@/lib/data";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...skillCategories];

  const filtered =
    activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-[#ebeff5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
                ✦ Tech Stack
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="font-black text-[#242426] leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Tools I work
                <br />
                <span className="italic text-[#4d4f57]">with</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Category filter */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#242426] text-white border-0"
                      : "bg-white border border-[#24242220] text-[#4d4f57] hover:border-[#24242240]"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-[#24242210] hover:border-[#d9ff5c] hover:shadow-md hover:shadow-[#d9ff5c20] transition-all cursor-default group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                <span className="text-[#242426] font-semibold text-xs text-center">{skill.name}</span>
                <span className="text-[#4d4f57] text-[10px] font-mono opacity-60">{skill.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee strip */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#ebeff5] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#ebeff5] to-transparent z-10" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-4 w-max"
            >
              {[...skills, ...skills].map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#24242210] text-[#4d4f57] text-xs font-medium whitespace-nowrap"
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
