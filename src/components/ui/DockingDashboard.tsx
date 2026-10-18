"use client";

import { useRef, useState } from "react";
import { useGSAP, gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";
import {
  LayoutGrid,
  BarChart3,
  Clock,
  Settings,
  Share2,
  Plus,
  ChevronDown,
  Activity,
  Check,
  Cpu,
  Zap,
} from "lucide-react";
import Image from "next/image";
import DevPassCard from "@/components/ui/DevPassCard";
import { copyToClipboard } from "@/lib/clipboard";

const TIMEFRAMES = ["Next 30 days", "Current Sprint", "Q2 Roadmap", "All Time"];

export default function DockingDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const devPassRef = useRef<HTMLDivElement>(null);
  const devPassBerthRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeTab, setActiveTab] = useState<"dashboard" | "analytics" | "history">("dashboard");
  const [timeframe, setTimeframe] = useState("Next 30 days");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

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

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  });

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://adityasingh.dev";
    const ok = await copyToClipboard(url);
    if (ok) {
      triggerToast("Portfolio link copied to clipboard! 📋");
    } else {
      triggerToast("Share link ready!");
    }
  };

  const handleAddConnect = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    triggerToast("Routing to dispatch console... ✉️");
  };

  const handleSettings = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
    triggerToast("Launched ⌘K Terminal Console ⚡");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto pt-4 sm:pt-6 pb-6 select-none overflow-visible"
    >
      {/* Toast Notification */}
      {toast && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#242426]/95 border border-[#d9ff5c]/40 text-[#d9ff5c] text-xs font-mono shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d9ff5c] animate-ping" />
          <span>{toast}</span>
        </div>
      )}

      {/* Outer Dashboard Shell with Live Video Background */}
      <div className="relative rounded-[24px] sm:rounded-[32px] border border-white/20 shadow-2xl p-3 sm:p-6 lg:p-7 flex gap-4 sm:gap-6 overflow-visible bg-black text-white min-h-[520px] sm:min-h-[560px]">
        {/* FULL-DASHBOARD BACKGROUND VIDEO */}
        <div
          className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden flex items-center justify-center pointer-events-auto cursor-pointer"
          onClick={() => {
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play();
                triggerToast("Background video playing ▶");
              } else {
                videoRef.current.pause();
                triggerToast("Background video paused ⏸");
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

          {/* Dark Glass / Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* LEFT SIDEBAR (Interactive Navigation) */}
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
                onClick={() => {
                  setActiveTab("dashboard");
                  triggerToast("Active View: Main Dashboard");
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#d9ff5c] text-[#242426] scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title="Dashboard Overview"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("analytics");
                  triggerToast("Active View: Telemetry & Performance");
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  activeTab === "analytics"
                    ? "bg-[#d9ff5c] text-[#242426] scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title="Telemetry & Analytics"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("history");
                  triggerToast("Active View: Shipped Releases");
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  activeTab === "history"
                    ? "bg-[#d9ff5c] text-[#242426] scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title="Release History"
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleSettings}
                className="w-10 h-10 rounded-xl text-white/70 flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Open Terminal (Settings)"
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
                <span>NO LIMITS. JUST LOGIC.</span>
                <span className="text-white/40">·</span>
                <span className="text-[#d9ff5c] text-[11px] uppercase">{timeframe}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 relative">
              {/* Timeframe selector dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium backdrop-blur-md transition-colors cursor-pointer"
                >
                  {timeframe}
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-[#1c1d1f] border border-white/15 shadow-xl py-1 z-30 font-mono text-xs">
                    {TIMEFRAMES.map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => {
                          setTimeframe(tf);
                          setDropdownOpen(false);
                          triggerToast(`Filter: ${tf}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer ${
                          timeframe === tf ? "text-[#d9ff5c] font-bold" : "text-white/80"
                        }`}
                      >
                        <span>{tf}</span>
                        {timeframe === tf && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Share button */}
              <button
                type="button"
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                title="Share portfolio"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Add/Connect button */}
              <button
                type="button"
                onClick={handleAddConnect}
                className="w-8 h-8 rounded-full bg-[#d9ff5c] text-[#242426] flex items-center justify-center shadow-xs hover:bg-[#cbf544] transition-colors cursor-pointer"
                title="Direct Dispatch"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GRID LAYOUT: Left Interactive Panel + Right DevPass Berth */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[400px] sm:min-h-[440px]">
            {/* COLUMN 1: Dynamic Content depending on active tab */}
            <div className="lg:col-span-6 flex flex-col justify-end p-2 sm:p-4">
              {activeTab === "analytics" && (
                <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 space-y-3 font-mono text-xs animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-[#d9ff5c] font-bold">
                      <Activity size={14} /> LIVE TELEMETRY
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">ALL SYSTEMS GO</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-white/50 text-[10px]">INFERENCE SPEED</p>
                      <p className="text-white font-bold text-sm">48 FPS</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-white/50 text-[10px]">LLM LATENCY</p>
                      <p className="text-[#d9ff5c] font-bold text-sm">34 ms</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-white/50 text-[10px]">HARDWARE ACCEL</p>
                      <p className="text-white font-bold text-sm">CUDA RTX</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <p className="text-white/50 text-[10px]">ACCURACY RATE</p>
                      <p className="text-emerald-400 font-bold text-sm">94.8%</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 space-y-2.5 font-mono text-xs animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[#d9ff5c] font-bold flex items-center gap-1.5">
                      <Clock size={14} /> DEPLOYMENT LOGS
                    </span>
                    <span className="text-[10px] text-white/50">2024 — 2026</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-start gap-2 text-white/80">
                      <span className="text-[#d9ff5c]">✔</span>
                      <span>Alice Exam Proctor v1.2: FaceMesh & automated gaze tracking shipped</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/80">
                      <span className="text-[#d9ff5c]">✔</span>
                      <span>JanSetu AI: 12 regional languages NLP LLM pipeline</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/80">
                      <span className="text-[#d9ff5c]">✔</span>
                      <span>Alice Mandi: Real-time price forecasting engine</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "dashboard" && (
                <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-sm">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/80 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#d9ff5c] animate-pulse" />
                    <span className="font-bold">SYSTEM TELEMETRY READY</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Tap the left icons to view live AI benchmarks, deployment logs, or launch terminal.
                  </p>
                </div>
              )}
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
