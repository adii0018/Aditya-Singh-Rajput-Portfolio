"use client";

import { useRef } from "react";
import DockingDashboard from "@/components/ui/DockingDashboard";
import { Terminal } from "lucide-react";

export default function BeyondTheCode() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="beyond-the-code"
      ref={sectionRef}
      className="relative z-20 section-padding overflow-visible rounded-t-[32px] sm:rounded-t-[44px]"
      style={{ background: "#202022" }}
    >
      {/* Tech Dot Grid Pattern Background */}
      <div
        className="absolute inset-0 rounded-t-[32px] sm:rounded-t-[44px] pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: "radial-gradient(#d9ff5c 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-0" />

      {/* Background divider lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 overflow-visible">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/70 text-xs font-mono tracking-wider uppercase shadow-lg mb-3">
            <Terminal size={13} className="text-[#d9ff5c]" />
            / hub // beyond the code
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-mono">
            Beyond the Code
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-mono mt-1">
            Real-time interactive dashboard &amp; developer pass
          </p>
        </div>

        {/* Makro Scroll-Docking Dashboard Component */}
        <DockingDashboard />
      </div>
    </section>
  );
}
