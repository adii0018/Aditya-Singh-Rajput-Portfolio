"use client";

import { useRef } from "react";
import DockingDashboard from "@/components/ui/DockingDashboard";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";

export default function BeyondTheCode() {
  const sectionRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(sectionRef);

  return (
    <section
      id="beyond-the-code"
      ref={sectionRef}
      className="relative pt-4 sm:pt-8 pb-20 sm:pb-28 overflow-visible bg-[#ebeff5]"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 overflow-visible">
        {/* Makro Scroll-Docking Dashboard Component */}
        <DockingDashboard />
      </div>
    </section>
  );
}
