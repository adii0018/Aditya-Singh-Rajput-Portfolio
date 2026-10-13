"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { experience } from "@/lib/data";
import { Briefcase, Trophy, GraduationCap } from "lucide-react";

const typeIcon = {
  work: <Briefcase size={14} />,
  achievement: <Trophy size={14} />,
  education: <GraduationCap size={14} />,
};

const typeColor = {
  work: "#d9ff5c",
  achievement: "#c0adff",
  education: "#b8deff",
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[#ebeff5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ Experience & Achievements
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="font-black text-[#242426] leading-tight tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
            >
              Where I&apos;ve
              <br />
              <span className="italic text-[#4d4f57]">been</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#d9ff5c] via-[#24242220] to-transparent" />

          <div className="space-y-8">
            {experience.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="relative flex gap-8 pl-14"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1.5 w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#ebeff5] z-10"
                    style={{ background: typeColor[item.type as keyof typeof typeColor] }}
                  >
                    <span className="text-[#242426]">
                      {typeIcon[item.type as keyof typeof typeIcon]}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border border-[#24242210] hover:border-[#24242225] hover:shadow-lg hover:shadow-[#24242208] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-[#242426] text-base">{item.title}</h3>
                        <p className="text-[#4d4f57] text-sm font-medium">{item.company}</p>
                      </div>
                      <span className="text-xs font-mono text-[#4d4f57] bg-[#24242208] px-3 py-1 rounded-full whitespace-nowrap self-start">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-[#4d4f57] text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: typeColor[item.type as keyof typeof typeColor] + "20",
                            color: item.type === "work" ? "#5a6e00" : typeColor[item.type as keyof typeof typeColor],
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
