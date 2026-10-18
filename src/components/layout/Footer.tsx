"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import AstronautSocialCard from "@/components/ui/AstronautSocialCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { personal } from "@/lib/data";

export default function Footer() {
  const footerLinks = {
    Index: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
    ],
    Connect: [
      { label: "GitHub", href: personal.github, external: true },
      { label: "LinkedIn", href: personal.linkedin, external: true },
      { label: "Email", href: `mailto:${personal.email}`, external: true },
    ],
    Work: [
      { label: "Experience", href: "#experience" },
      { label: "Certifications", href: "#certifications" },
      { label: "Contact", href: "#contact" },
    ],
  };

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#242426] text-white pt-20 pb-0 relative overflow-visible">
      <div className="max-w-6xl mx-auto px-6 overflow-visible">
        {/* Links grid */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 overflow-visible">
          {/* Brand & Social Card */}
          <div className="col-span-2 md:col-span-1 overflow-visible">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <span className="font-mono font-black text-xs text-[#d9ff5c]">ASR</span>
              </div>
              <span className="font-bold text-lg text-white">Aditya Singh Rajput</span>
            </div>
            <p className="text-[#ffffff80] text-sm leading-relaxed mb-6">
              Building intelligence.<br />Shaping tomorrow.
            </p>
            
            {/* Astronaut Social Media Card */}
            <AstronautSocialCard />
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-[#ffffff60] uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffffff80] text-sm hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => scrollTo(link.href)}
                        className="text-[#ffffff80] text-sm hover:text-white transition-colors text-left border-0 bg-transparent cursor-pointer p-0"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollReveal>

        {/* Divider */}
        <div className="border-t border-[#ffffff15] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#ffffff40] text-xs">
            Crafted with curiosity. Engineered with intelligence🤍 
          </p>
          <p className="text-[#ffffff40] text-xs">
            Code » Learn » Innovate » Repeat  © 2026 
          </p>
        </div>

        {/* Giant name — same as Makro footer */}
        <div className="overflow-hidden -mx-6">
          <motion.div
            initial={{ y: 80 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center"
            style={{
              fontSize: "clamp(80px, 18vw, 220px)",
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: "#ffffff08",
              userSelect: "none",
              paddingBottom: "0",
            }}
          >
            A D I T Y A
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
