"use client";

import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";
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
import DevPassCard from "@/components/ui/DevPassCard";

export default function DockingDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const devPassRef = useRef<HTMLDivElement>(null);
  const devPassBerthRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (isReducedMotion()) return;

    // Function to calculate exact vector from target berth back up to the Hero anchor
    const getDelta = () => {
      const heroAnchor = document.getElementById("hero-devpass-anchor");
      const berth = devPassBerthRef.current;
      if (!heroAnchor || !berth) return { deltaX: 0, deltaY: -750 };

      const anchorRect = heroAnchor.getBoundingClientRect();
      const berthRect = berth.getBoundingClientRect();

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollX = window.scrollX || window.pageXOffset || 0;

      const anchorCenterX = anchorRect.left + scrollX + anchorRect.width / 2;
      const anchorCenterY = anchorRect.top + scrollY + anchorRect.height / 2;

      const berthCenterX = berthRect.left + scrollX + berthRect.width / 2;
      const berthCenterY = berthRect.top + scrollY + berthRect.height / 2;

      return {
        deltaX: anchorCenterX - berthCenterX,
        deltaY: anchorCenterY - berthCenterY,
      };
    };

    const heroEl = document.getElementById("home");
    const mm = gsap.matchMedia();

    // Desktop & Tablet: starts in Hero section, travels down on scroll into the dashboard slot
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl || "#home",
          start: "top top",
          endTrigger: devPassBerthRef.current,
          end: "center 55%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        devPassRef.current,
        {
          x: () => getDelta().deltaX,
          y: () => getDelta().deltaY,
          rotate: 7,
          scale: 0.95,
          boxShadow:
            "0 35px 70px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(124, 58, 237, 0.45)",
          immediateRender: true,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
          ease: "power1.inOut",
        }
      );
    });

    // Mobile: responsive scroll docking
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl || "#home",
          start: "top top",
          endTrigger: devPassBerthRef.current,
          end: "center 60%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        devPassRef.current,
        {
          x: () => getDelta().deltaX,
          y: () => getDelta().deltaY,
          rotate: 3,
          scale: 0.9,
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
          immediateRender: true,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          ease: "power1.inOut",
        }
      );
    });

    // Ensure coordinates refresh once layout and media settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  });



  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto pt-4 sm:pt-6 pb-6 select-none overflow-visible"
    >
      {/* Outer Dashboard Shell with Live Video Background (overflow-visible so card can travel to Hero) */}
      <div className="relative rounded-[24px] sm:rounded-[32px] border border-white/20 shadow-2xl p-3 sm:p-6 lg:p-7 flex gap-4 sm:gap-6 overflow-visible bg-black text-white min-h-[520px] sm:min-h-[560px]">
        {/* FULL-DASHBOARD BACKGROUND VIDEO (Clipped strictly to shell corners) */}
        <div
          className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden flex items-center justify-center pointer-events-auto cursor-pointer"
          onClick={() => {
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play();
              } else {
                videoRef.current.pause();
              }
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <video
            ref={videoRef}
            src="/about-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "180%",
              height: "180%",
              transform: "translate(-50%, -50%) rotate(270deg)",
              objectFit: "cover",
            }}
            className="pointer-events-none"
          />

          {/* Dark Glass / Vignette Overlay for Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* LEFT SIDEBAR (Frosted Glass) */}
        <aside className="relative z-10 hidden sm:flex flex-col items-center justify-between py-2 px-1 border-r border-white/15 pr-4 pointer-events-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Makro two-semicircle icon */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="w-4 h-6 rounded-l-full bg-white/70 absolute left-0" />
              <div className="w-4 h-4 rounded-full bg-white/40 absolute right-0" />
            </div>

            {/* Nav icons */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#d9ff5c] text-[#242426] flex items-center justify-center shadow-md transition-transform hover:scale-105"
                title="Dashboard"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl text-white/70 flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
                title="Analytics"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl text-white/70 flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
                title="History"
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl text-white/70 flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom user avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 shadow-xs">
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
        <div className="relative z-10 flex-1 min-w-0">
          
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Beyond the Code
              </h3>
              <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5 font-mono tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#40c463] animate-pulse" />
                NO LIMITS. JUST LOGIC.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium backdrop-blur-md transition-colors"
              >
                Next 30 days
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                title="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#d9ff5c] text-[#242426] flex items-center justify-center shadow-xs hover:bg-[#cbf544] transition-colors"
                title="Add new"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GRID LAYOUT: Left open video view + Right DevPass Berth */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[400px] sm:min-h-[440px]">
            
            {/* COLUMN 1: Open panoramic video viewing area */}
            <div className="hidden lg:flex lg:col-span-6 flex-col justify-end p-4 pointer-events-none">
              {/* Clean unobstructed video vista */}
            </div>

            {/* COLUMN 2: DEV PASS DOCKING BERTH */}
            <div
              ref={devPassBerthRef}
              className="lg:col-span-6 flex flex-col justify-center items-center relative min-h-[380px] p-2 overflow-visible"
            >


              {/* The Floating and Docking DevPassCard */}
              <div
                ref={devPassRef}
                className="relative z-50 cursor-pointer"
                style={{ willChange: "transform, box-shadow" }}
              >
                <DevPassCard />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
