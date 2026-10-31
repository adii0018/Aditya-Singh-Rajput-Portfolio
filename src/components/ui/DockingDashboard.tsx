"use client";

import { useCallback, useEffect, useRef } from "react";
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
  const dashboardBoardRef = useRef<HTMLDivElement>(null);
  const devPassRef = useRef<HTMLDivElement>(null);
  const devPassBerthRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isAboutActiveRef = useRef(false);
  const isBeyondVisibleRef = useRef(false);
  const isManuallyPausedRef = useRef(false);

  const syncBackgroundVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay =
      isBeyondVisibleRef.current &&
      !isAboutActiveRef.current &&
      !isManuallyPausedRef.current &&
      !isReducedMotion();

    if (shouldPlay && video.paused) {
      video.play().catch(() => {});
    } else if (!shouldPlay && !video.paused) {
      video.pause();
    }
  }, []);

  const toggleBackgroundVideo = () => {
    const video = videoRef.current;
    if (!video || !isBeyondVisibleRef.current || isAboutActiveRef.current) return;

    if (video.paused) {
      isManuallyPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      isManuallyPausedRef.current = true;
      video.pause();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;
    const beyondSection = document.getElementById("beyond-the-code") ?? container;

    // Start the clip when the Beyond the Code section enters, and pause after it leaves.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isBeyondVisibleRef.current = Boolean(entry?.isIntersecting);
        syncBackgroundVideo();
      },
      { threshold: 0.05 }
    );

    observer.observe(beyondSection);
    return () => {
      observer.disconnect();
      isBeyondVisibleRef.current = false;
      video.pause();
    };
  }, [syncBackgroundVideo]);

  useGSAP(() => {
    // Function to calculate exact coordinates for DevPass in container space
    const getCoordinates = () => {
      const heroAnchor = document.getElementById("hero-devpass-anchor");
      const heroSubtitle = document.getElementById("hero-subtitle");
      const berth = devPassBerthRef.current;
      const container = containerRef.current;
      const pass = devPassRef.current;

      if (!heroAnchor || !berth || !container || !pass) {
        return {
          heroX: 0,
          heroY: -750,
          dockedX: 0,
          dockedY: 0,
        };
      }

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollX = window.scrollX || window.pageXOffset || 0;

      const containerRect = container.getBoundingClientRect();
      const heroRect = heroAnchor.getBoundingClientRect();
      const berthRect = berth.getBoundingClientRect();

      const passWidth = pass.offsetWidth || 280;
      const passHeight = pass.offsetHeight || 420;

      const containerPageX = containerRect.left + scrollX;
      const containerPageY = containerRect.top + scrollY;

      const heroPageCenterX = heroRect.left + scrollX + heroRect.width / 2;
      
      // Calculate hero Y to be parallel with the subtitle
      let heroPageCenterY: number;
      if (heroSubtitle) {
        const subRect = heroSubtitle.getBoundingClientRect();
        // The user requested: DevPass parallel to "Final-year CS student..." subtitle
        heroPageCenterY = subRect.top + scrollY + passHeight / 2 - 12;
      } else {
        heroPageCenterY = heroRect.top + scrollY + heroRect.height / 2;
      }

      const berthPageCenterX = berthRect.left + scrollX + berthRect.width / 2;
      const berthPageCenterY = berthRect.top + scrollY + berthRect.height / 2;

      return {
        heroX: heroPageCenterX - containerPageX - passWidth / 2,
        heroY: heroPageCenterY - containerPageY - passHeight / 2,
        dockedX: berthPageCenterX - containerPageX - passWidth / 2,
        dockedY: berthPageCenterY - containerPageY - passHeight / 2,
      };
    };

    const heroEl = document.getElementById("home");
    const aboutEl = document.getElementById("about");
    const mm = gsap.matchMedia();
    if (aboutEl) {
      isAboutActiveRef.current =
        aboutEl.getBoundingClientRect().top <= window.innerHeight * 0.85;

      ScrollTrigger.create({
        trigger: aboutEl,
        start: "top 85%",
        onEnter: () => {
          isAboutActiveRef.current = true;
          syncBackgroundVideo();
        },
        onEnterBack: () => {
          isAboutActiveRef.current = true;
          syncBackgroundVideo();
        },
        onLeaveBack: () => {
          isAboutActiveRef.current = false;
          syncBackgroundVideo();
        },
      });
    }

    if (isReducedMotion()) return;

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

      // Desktop: Makro 3D Perspective Tilt on the Beyond the Code dashboard shell ONLY
      if (dashboardBoardRef.current) {
        tl.fromTo(
          dashboardBoardRef.current,
          {
            rotateX: 16,
            scale: 0.94,
            y: 24,
            transformOrigin: "center top",
            immediateRender: true,
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: "power1.inOut",
          },
          0
        );
      }

      // DevPassCard: Makro-inspired tilted rotation at initial point (-9.5deg), straightening into Berth
      tl.fromTo(
        devPassRef.current,
        {
          x: () => getCoordinates().heroX,
          y: () => getCoordinates().heroY,
          rotate: -9.5,
          rotateX: 4,
          rotateY: -5,
          scale: 0.95,
          transformOrigin: "center center",
          boxShadow:
            "0 35px 70px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(124, 58, 237, 0.45)",
          immediateRender: true,
        },
        {
          x: () => getCoordinates().dockedX,
          y: () => getCoordinates().dockedY,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
          ease: "power1.inOut",
        },
        0
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

      // Mobile: Makro 3D Perspective Tilt on dashboard shell
      if (dashboardBoardRef.current) {
        tl.fromTo(
          dashboardBoardRef.current,
          {
            rotateX: 10,
            scale: 0.96,
            y: 12,
            transformOrigin: "center top",
            immediateRender: true,
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: "power1.inOut",
          },
          0
        );
      }

      tl.fromTo(
        devPassRef.current,
        {
          x: () => getCoordinates().heroX,
          y: () => getCoordinates().heroY,
          rotate: -7,
          rotateX: 3,
          rotateY: -4,
          scale: 0.9,
          transformOrigin: "center center",
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
          immediateRender: true,
        },
        {
          x: () => getCoordinates().dockedX,
          y: () => getCoordinates().dockedY,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          ease: "power1.inOut",
        },
        0
      );
    });

    // Ensure coordinates refresh once layout and media settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      mm.revert();
      videoRef.current?.pause();
    };
  }, { dependencies: [syncBackgroundVideo], revertOnUpdate: true });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto pt-4 md:pt-6 pb-8 select-none overflow-visible"
    >
      {/* 3D Perspective Wrapper for the Beyond the Code dashboard shell ONLY */}
      <div style={{ perspective: "1200px" }} className="w-full overflow-visible">
        {/* Outer Dashboard Shell with Live Video Background */}
        <div
          ref={dashboardBoardRef}
          className="relative rounded-[24px] sm:rounded-[32px] border border-white/20 shadow-2xl p-3 sm:p-6 lg:p-7 flex gap-4 sm:gap-6 overflow-visible bg-black text-white min-h-[520px] sm:min-h-[560px]"
          style={{
            transformOrigin: "center top",
          }}
        >
          {/* FULL-DASHBOARD BACKGROUND VIDEO (Clipped strictly to shell corners) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden flex items-center justify-center pointer-events-auto cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Play or pause the dashboard background video"
            onClick={toggleBackgroundVideo}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleBackgroundVideo();
              }
            }}
            onContextMenu={(e) => e.preventDefault()}
            style={{ containerType: "size" } as React.CSSProperties}
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
              controlsList="nodownload nofullscreen nemoteplayback"
              onContextMenu={(e) => e.preventDefault()}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100cqh, 56.25cqw)",
                height: "max(100cqw, 177.78cqh)",
                transform: "translate(-50%, -50%) rotate(270deg)",
                objectFit: "cover",
              }}
              className="pointer-events-none"
            />
          </div>

          {/* LEFT SIDEBAR: Frosted Glass Tool Strip */}
          <aside className="relative z-10 w-12 sm:w-14 flex flex-col justify-between items-center py-2 sm:py-3 shrink-0">
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              {/* Top brand logo badge */}
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                <span className="text-[#d9ff5c] text-sm font-black">▲</span>
              </div>

              {/* Navigation icons */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <button
                  type="button"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#d9ff5c] text-[#242426] flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                  title="Dashboard"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                  title="Analytics"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                  title="Timeline"
                >
                  <Clock className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom user avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 shadow-xs">
              <Image
                src="/profile.jpg"
                alt="Portrait of Aditya Singh Rajput"
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
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Beyond the Code
                </h3>
                <p className="text-xs text-white/90 flex items-center gap-1.5 mt-0.5 font-mono tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  <span className="w-2 h-2 rounded-full bg-[#40c463] animate-pulse" />
                  NO LIMITS. JUST LOGIC.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white text-xs font-medium backdrop-blur-md transition-colors shadow-lg"
                >
                  Next 30 days
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow-lg"
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

            {/* GRID LAYOUT: Left open video view + Right DevPass Berth Target */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center min-h-[400px] sm:min-h-[440px]">
              {/* COLUMN 1: Open panoramic video viewing area */}
              <div className="hidden lg:flex lg:col-span-6 flex-col justify-end p-4 pointer-events-none">
                {/* Clean unobstructed video vista */}
              </div>

              {/* COLUMN 2: DEV PASS DOCKING BERTH TARGET */}
              <div
                ref={devPassBerthRef}
                className="lg:col-span-6 flex flex-col justify-center items-center relative min-h-[380px] p-2 overflow-visible"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating & Docking DevPassCard - Outside dashboardBoardRef so it NEVER tilts */}
      <div
        ref={devPassRef}
        className="absolute top-0 left-0 z-50 cursor-pointer pointer-events-auto"
        style={{ willChange: "transform, box-shadow" }}
      >
        <DevPassCard />
      </div>
    </div>
  );
}
