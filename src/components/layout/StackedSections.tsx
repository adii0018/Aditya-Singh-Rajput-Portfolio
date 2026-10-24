"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";

interface StackedSectionsProps {
  children: React.ReactNode;
}

interface CardConfig {
  bgColor: string;
  roundedTop: boolean;
  shadowClass: string;
  borderClass: string;
  overflowClass: string;
}

const cardConfigs: CardConfig[] = [
  // 0: Playground (Beyond The Code / DockingDashboard) - dark #242426
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.4)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
  // 1: About (About Me) - dark #242426, overflow-visible for floating DevPassCard
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.3)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
  // 2: Projects (Featured Projects) - light #f5f7fc, pins itself internally for horizontal scrolling
  {
    bgColor: "#f5f7fc",
    roundedTop: true,
    shadowClass: "shadow-[25px_0_60px_rgba(0,0,0,0.18),0_-15px_40px_rgba(0,0,0,0.08)]",
    borderClass: "border-t border-r border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 3: Skills (Tech Stack) - light #ebeff5
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 4: Experience (Journey & Achievements) - light #ebeff5
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-visible",
  },
  // 5: BentoFeatures (AI Dev Lab) - dark #242426
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.5)]",
    borderClass: "border-t border-[#ffffff20]",
    overflowClass: "overflow-hidden",
  },
  // 6: Certifications (What I've earned) - dark #0d1117 with cash video
  {
    bgColor: "#0d1117",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.4)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-hidden",
  },
  // 7: GitHubActivity (Code I've shipped) - light #ebeff5 with wave curve top
  {
    // The wave leaves transparent areas above the light content panel.
    bgColor: "#0d1117",
    roundedTop: false,
    shadowClass: "",
    borderClass: "",
    overflowClass: "overflow-visible",
  },
];

export default function StackedSections({ children }: StackedSectionsProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const childArray = React.Children.toArray(children);

  useGSAP(
    () => {
      if (isReducedMotion() || !stackRef.current) return;

      const hero = document.getElementById("home");
      const playground = stackRef.current.querySelector<HTMLElement>(
        ".stacked-section-panel"
      );
      if (!hero || !playground) return;

      const media = gsap.matchMedia();

      // Start with the requested Hero → Dev Playground transition. Later sections keep
      // their natural flow so their own scroll effects and Projects pin remain untouched.
      media.add("(min-width: 1024px)", () => {
        const outgoingSurface = getComputedStyle(hero).backgroundColor;
        const setOutgoingSurface = () => {
          if (stackRef.current) {
            stackRef.current.style.backgroundColor = outgoingSurface;
          }
        };
        const clearTransitionSurface = () => {
          stackRef.current?.style.removeProperty("background-color");
        };
        const transition = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => `+=${hero.offsetHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: setOutgoingSurface,
            onEnterBack: setOutgoingSurface,
            onLeave: clearTransitionSurface,
            onLeaveBack: clearTransitionSurface,
            onRefresh: (self) => {
              if (self.progress > 0 && self.progress < 1) {
                setOutgoingSurface();
              } else {
                clearTransitionSurface();
              }
            },
            onUpdate: (self) => {
              if (self.progress > 0 && self.progress < 1) {
                setOutgoingSurface();
              } else if (self.progress === 1) {
                clearTransitionSurface();
              }
            },
          },
        });

        transition.fromTo(
          playground,
          { yPercent: 100 },
          { yPercent: 0, duration: 1, ease: "none" }
        );

        return clearTransitionSurface;
      });

      return () => media.revert();
    },
    { scope: stackRef }
  );

  return (
    <div ref={stackRef} className="w-full overflow-x-clip">
      {childArray.map((child, index) => {
        const config = cardConfigs[index] || {
          bgColor: "#ebeff5",
          roundedTop: index > 0,
          shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
          borderClass: "border-t border-[#24242215]",
          overflowClass: "overflow-hidden",
        };

        return (
          <div
            key={index}
            className={`stacked-section-panel w-full ${config.overflowClass} ${
              config.roundedTop
                ? `rounded-t-[32px] sm:rounded-t-[44px] ${config.shadowClass} ${config.borderClass}`
                : ""
            }`}
            style={{
              position: "relative",
              zIndex: 10 + index,
              backgroundColor: config.bgColor,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
