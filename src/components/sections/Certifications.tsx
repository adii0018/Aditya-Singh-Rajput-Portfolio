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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".cert-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".cert-heading", {
        y: 30,
        opacity: 0,
        duration: 0.75,
      }, "-=0.35")
      .from(".cert-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section id="certifications" ref={sectionRef} className="relative section-padding bg-[#242426] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
        >
          <source src="/cash.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#242426]/85 via-[#242426]/60 to-[#242426]/90 pointer-events-none" />
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(36,36,38,0.75)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="cert-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff80] bg-black/40 backdrop-blur-md text-xs font-mono tracking-wider uppercase mb-4">
              ✦ Certifications
            </div>
            <h2
              className="cert-heading font-black text-white leading-tight tracking-tight drop-shadow-sm"
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
                className="relative p-6 rounded-2xl border border-[#ffffff18] bg-[#242426]/70 backdrop-blur-md group cursor-default overflow-hidden h-full hover:border-[#ffffff35] transition-all shadow-xl shadow-black/25"
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
