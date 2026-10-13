"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { certifications } from "@/lib/data";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-[#242426]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff60] text-xs font-mono tracking-wider uppercase mb-4">
                ✦ Certifications
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="font-black text-white leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                What I&apos;ve
                <br />
                <span className="text-[#d9ff5c]">earned</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Certs grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <StaggerItem key={cert.name}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative p-6 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] group cursor-default overflow-hidden"
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"
                  style={{ background: cert.color }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110"
                  style={{ background: cert.color + "20" }}
                >
                  {cert.icon}
                </div>

                <h3 className="font-bold text-white text-sm leading-snug mb-2">{cert.name}</h3>
                <p className="text-[#ffffff50] text-xs mb-3">{cert.issuer}</p>

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: cert.color + "25", color: cert.color }}
                  >
                    {cert.year}
                  </span>
                  <Award size={14} className="text-[#ffffff30] group-hover:text-[#ffffff60] transition-colors" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
