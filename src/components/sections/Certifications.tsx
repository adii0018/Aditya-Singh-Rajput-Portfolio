"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { certifications } from "@/lib/data";
import { Award } from "lucide-react";

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

        tl.from(".cert-badge", {
          x: -30,
          opacity: 0,
          duration: 0.6,
        })
        .from(".cert-heading", {
          x: -40,
          opacity: 0,
          duration: 0.75,
        }, "-=0.35")
        // Reveal cards from the right
        .from(".cert-card", {
          x: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.3");
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

        tl.from(".cert-badge", {
          x: -15,
          opacity: 0,
          duration: 0.5,
        })
        .from(".cert-heading", {
          x: -20,
          opacity: 0,
          duration: 0.6,
        }, "-=0.35")
        .from(".cert-card", {
          x: 25,
          opacity: 0,
          stagger: 0.08,
          duration: 0.65,
        }, "-=0.2");
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="certifications" ref={sectionRef} className="section-padding bg-[#242426] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="cert-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff60] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ Certifications
            </div>
            <h2
              className="cert-heading font-black text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
            >
              What I&apos;ve
              <br />
              <span className="text-[#d9ff5c]">earned</span>
            </h2>
          </div>
        </div>

        {/* Certs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="cert-card">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative p-6 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] group cursor-default overflow-hidden h-full"
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
                  <Award
                    size={14}
                    className="text-[#ffffff30] group-hover:text-[#ffffff60] transition-colors"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
