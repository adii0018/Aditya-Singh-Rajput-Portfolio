"use client";

import { useRef } from "react";
import { useGSAP, gsap, isReducedMotion } from "@/lib/gsap";
import {
  LayoutGrid,
  BarChart3,
  Clock,
  Settings,
  Share2,
  Plus,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function DockingDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      // Scroll-driven docking animation
      // When approaching the viewport, Card 1 & Card 2 float above tilted
      // As the user scrolls into the section, they smoothly dock into their grid slots
      const mm = gsap.matchMedia();

      // Desktop & Tablet
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          card1Ref.current,
          {
            y: -140,
            rotate: -4,
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.35)",
          },
          {
            y: 0,
            rotate: 0,
            boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.06)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1.1,
            },
          }
        );

        gsap.fromTo(
          card2Ref.current,
          {
            y: -220,
            rotate: 6,
            boxShadow: "0 35px 70px -15px rgba(0, 0, 0, 0.35)",
          },
          {
            y: 0,
            rotate: 0,
            boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.06)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1.1,
            },
          }
        );
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          card1Ref.current,
          {
            y: -60,
            rotate: -2,
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25)",
          },
          {
            y: 0,
            rotate: 0,
            boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.06)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          card2Ref.current,
          {
            y: -100,
            rotate: 3,
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25)",
          },
          {
            y: 0,
            rotate: 0,
            boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.06)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  // Generate vertical lines under SVG chart wave
  // Wave path starts around y=70, dips to 76, then rises to y=20
  const hatchedLines = [
    { x: 14, y: 70 },
    { x: 24, y: 70 },
    { x: 34, y: 71 },
    { x: 44, y: 72 },
    { x: 54, y: 73 },
    { x: 64, y: 75 },
    { x: 74, y: 76 },
    { x: 84, y: 75 },
    { x: 94, y: 73 },
    { x: 104, y: 71 },
    { x: 114, y: 69 },
    { x: 124, y: 66 },
    { x: 134, y: 61 },
    { x: 144, y: 54 },
    { x: 154, y: 44 },
    { x: 164, y: 32 },
    { x: 174, y: 24 },
    { x: 184, y: 20 },
    { x: 194, y: 20 },
    { x: 204, y: 20 },
    { x: 214, y: 20 },
    { x: 224, y: 20 },
    { x: 234, y: 20 },
    { x: 244, y: 20 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto pt-16 md:pt-24 pb-8 select-none"
    >
      {/* Outer Dashboard Shell */}
      <div className="relative rounded-[24px] sm:rounded-[32px] bg-[#ecf0f5] border border-[#d2d9e4] shadow-2xl p-3 sm:p-6 lg:p-7 flex gap-4 sm:gap-6 overflow-visible">
        
        {/* LEFT SIDEBAR */}
        <aside className="hidden sm:flex flex-col items-center justify-between py-2 px-1 border-r border-[#24242610] pr-4">
          <div className="flex flex-col items-center gap-6">
            {/* Makro two-semicircle icon */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="w-4 h-6 rounded-l-full bg-[#8c929d] absolute left-0" />
              <div className="w-4 h-4 rounded-full bg-[#656c78] absolute right-0" />
            </div>

            {/* Nav icons */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#d9ff5c] text-[#242426] flex items-center justify-center shadow-xs transition-transform hover:scale-105"
                title="Dashboard"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl text-[#24242660] flex items-center justify-center hover:text-[#242426] hover:bg-white/50 transition-colors"
                title="Analytics"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl text-[#24242660] flex items-center justify-center hover:text-[#242426] hover:bg-white/50 transition-colors"
                title="History"
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl text-[#24242660] flex items-center justify-center hover:text-[#242426] hover:bg-white/50 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom user avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white shadow-xs">
            <Image
              src="/profile.jpg"
              alt="User"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <div className="flex-1 min-w-0">
          
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#242426] tracking-tight">
                Projected balance
              </h3>
              <p className="text-xs text-[#24242680] flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#8c929d]" />
                No negative cash days expected
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#24242615] text-[#242426] text-xs font-medium shadow-2xs hover:bg-[#fafbfc] transition-colors"
              >
                Next 30 days
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white border border-[#24242615] text-[#242426] flex items-center justify-center shadow-2xs hover:bg-[#fafbfc] transition-colors"
                title="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#242426] text-white flex items-center justify-center shadow-xs hover:bg-[#1a1a1c] transition-colors"
                title="Add new"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* COLUMN 1: Large Income Card with signature hatched wave chart */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#24242610] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#24242680] uppercase tracking-wider">
                    Income
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#242426] text-white text-[10px] font-bold">
                    +18%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#242426] tracking-tight">
                  $27,500
                </div>

                {/* Hatched Area Chart */}
                <div className="bg-[#f5f8fb] rounded-xl p-3 mt-4 border border-[#24242608]">
                  <svg
                    viewBox="0 0 260 120"
                    className="w-full h-28 sm:h-32 overflow-visible"
                    fill="none"
                  >
                    {/* Vertical hatched lines under the curve */}
                    {hatchedLines.map((line, idx) => (
                      <line
                        key={idx}
                        x1={line.x}
                        y1={line.y}
                        x2={line.x}
                        y2={110}
                        stroke="#242426"
                        strokeWidth="1"
                        strokeOpacity="0.35"
                      />
                    ))}

                    {/* Main smooth curve */}
                    <path
                      d="M 10 70 C 50 70, 70 76, 110 70 C 145 64, 155 24, 185 20 L 250 20"
                      stroke="#242426"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Bottom baseline */}
                    <line
                      x1="10"
                      y1="110"
                      x2="250"
                      y2="110"
                      stroke="#242426"
                      strokeWidth="1"
                      strokeOpacity="0.1"
                    />
                  </svg>

                  {/* Dates axis */}
                  <div className="flex justify-between text-[10px] font-medium text-[#24242660] mt-1 px-1">
                    <span>Dec 1</span>
                    <span>Dec 7</span>
                    <span>Dec 14</span>
                    <span>Dec 21</span>
                    <span>Dec 28</span>
                  </div>
                </div>
              </div>

              {/* Sub-stats row */}
              <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-[#24242608] text-left">
                <div>
                  <div className="text-[10px] text-[#24242660] uppercase tracking-wider font-mono">
                    Peak
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#242426]">
                    15:30
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#24242660] uppercase tracking-wider font-mono">
                    Safe buffer
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#242426]">
                    $7,200
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#24242660] uppercase tracking-wider font-mono">
                    At-risk
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#242426]">
                    $1,380
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2 & 3: Docking cards area + Income Sources */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Row for Card 1 & Card 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* SLOT 1 (Liquidity) */}
                <div className="relative min-h-[145px]">
                  {/* Dashed Ghost Outline (visible when card is floating above) */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#24242625] bg-[#24242605] flex flex-col justify-center items-center pointer-events-none p-4">
                    <span className="text-[11px] font-mono text-[#24242650] uppercase tracking-wider">
                      Liquidity Slot
                    </span>
                  </div>

                  {/* FLOATING & DOCKING CARD 1 */}
                  <div
                    ref={card1Ref}
                    className="relative z-20 bg-white rounded-2xl p-5 border border-[#24242615] shadow-lg flex flex-col justify-between h-full"
                    style={{ willChange: "transform, box-shadow" }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#242426]">
                          Liquidity
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#40c46318] text-[#22863a] text-[10px] font-bold">
                          +12%
                        </span>
                      </div>
                      <div className="text-xs text-[#24242660]">
                        Safe cash buffer
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mt-4">
                      <span className="text-3xl font-black text-[#242426] tracking-tight">
                        82<span className="text-xl font-bold text-[#24242680]">%</span>
                      </span>
                      <span className="text-[#40c463] text-sm font-bold flex items-center">
                        ▲
                      </span>
                    </div>
                  </div>
                </div>

                {/* SLOT 2 (Reduction) */}
                <div className="relative min-h-[145px]">
                  {/* Dashed Ghost Outline (visible when card is floating above) */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#24242625] bg-[#24242605] flex flex-col justify-center items-center pointer-events-none p-4">
                    <span className="text-[11px] font-mono text-[#24242650] uppercase tracking-wider">
                      Reduction Slot
                    </span>
                  </div>

                  {/* FLOATING & DOCKING CARD 2 */}
                  <div
                    ref={card2Ref}
                    className="relative z-20 bg-white rounded-2xl p-5 border border-[#24242615] shadow-lg flex flex-col justify-between h-full"
                    style={{ willChange: "transform, box-shadow" }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-[#242426]">
                          Reduction
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#2424260a] text-[#24242680] text-[10px] font-bold">
                          +6%
                        </span>
                      </div>

                      {/* Day pills */}
                      <div className="grid grid-cols-3 gap-1 bg-[#f4f6fa] p-1 rounded-lg">
                        <div className="bg-white rounded text-center py-1 shadow-2xs text-[10px] font-bold text-[#242426]">
                          1 Mon
                        </div>
                        <div className="text-center py-1 text-[10px] font-medium text-[#24242660]">
                          2 Tue
                        </div>
                        <div className="text-center py-1 text-[10px] font-medium text-[#24242660]">
                          3 Wed
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mt-3">
                      <span className="text-3xl font-black text-[#242426] tracking-tight">
                        96<span className="text-xl font-bold text-[#24242680]">%</span>
                      </span>
                      <span className="text-[#40c463] text-sm font-bold flex items-center">
                        ▲
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* INCOME SOURCES CARD */}
              <div className="bg-white rounded-2xl p-5 border border-[#24242610] shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#242426]">
                    Income Sources
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#242426] text-white text-[10px] font-bold">
                    Q4 2025
                  </span>
                </div>
                <div className="text-xs text-[#24242660] mb-3">
                  Overview
                </div>

                {/* Multi-segmented color bar matching reference */}
                <div className="h-2.5 w-full flex rounded-full overflow-hidden gap-1 mb-3">
                  <div className="h-full bg-[#8b7bf5] rounded-l-full" style={{ width: "48%" }} title="Retainers & Subscriptions (48%)" />
                  <div className="h-full bg-[#4d96f7]" style={{ width: "22%" }} title="Product Invoices (22%)" />
                  <div className="h-full bg-[#42b0a8]" style={{ width: "15%" }} title="Usage-based fees (15%)" />
                  <div className="h-full bg-[#88a83d]" style={{ width: "8%" }} title="Affiliate (8%)" />
                  <div className="h-full bg-[#f0a732]" style={{ width: "4%" }} title="Other (4%)" />
                  <div className="h-full bg-[#c45b43] rounded-r-full" style={{ width: "3%" }} title="Misc (3%)" />
                </div>

                {/* Breakdown items */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#242426]">
                    <span className="flex items-center gap-2 text-[#24242680]">
                      <span className="w-2 h-2 rounded-full bg-[#8b7bf5]" />
                      Retainers & subscriptions
                    </span>
                    <span className="font-mono text-[#24242660]">48%</span>
                    <span className="font-bold font-mono">$13,200</span>
                  </div>
                  <div className="flex items-center justify-between text-[#242426]">
                    <span className="flex items-center gap-2 text-[#24242680]">
                      <span className="w-2 h-2 rounded-full bg-[#4d96f7]" />
                      Product invoices
                    </span>
                    <span className="font-mono text-[#24242660]">22%</span>
                    <span className="font-bold font-mono">$6,050</span>
                  </div>
                  <div className="flex items-center justify-between text-[#242426]">
                    <span className="flex items-center gap-2 text-[#24242680]">
                      <span className="w-2 h-2 rounded-full bg-[#42b0a8]" />
                      Usage-based fees
                    </span>
                    <span className="font-mono text-[#24242660]">15%</span>
                    <span className="font-bold font-mono">$4,125</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
