"use client";

import { useRef } from "react";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import DockingDashboard from "@/components/ui/DockingDashboard";

export default function Playground() {
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

      tl.from(".playground-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".playground-heading", {
        y: 25,
        opacity: 0,
        duration: 0.7,
      }, "-=0.35")
      .from(".playground-desc", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="playground"
      ref={sectionRef}
      className="relative z-20 section-padding overflow-visible"
      style={{ background: "#242426" }}
    >
      {/* Background accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff15] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 overflow-visible">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="playground-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff70] text-xs font-mono tracking-wider uppercase mb-4 bg-white/5">
            ✦ Dev Playground // Interactive Console
          </div>
          <h2
            className="playground-heading font-black text-white leading-tight tracking-tight mb-3"
            style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
          >
            Beyond The <span className="text-[#d9ff5c]">Code</span>
          </h2>
          <p className="playground-desc text-[#ffffff70] text-sm sm:text-base leading-relaxed">
            Live interactive environment with telemetry, system controls, and digital developer access pass.
          </p>
        </div>

        {/* Centerpiece: The Makro Scroll-Docking Dashboard Component */}
        <DockingDashboard />
      </div>
    </section>
  );
}
