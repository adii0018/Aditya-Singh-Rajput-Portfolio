"use client";

import React, { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

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
  // 0: About (About Me) - dark #242426, slides over Hero, overflow-visible for floating DevPassCard
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.4)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
  // 1: Playground (Beyond The Code / DockingDashboard) - dark #242426, overflow-visible
  {
    bgColor: "#242426",
    roundedTop: false,
    shadowClass: "",
    borderClass: "border-t border-[#ffffff10]",
    overflowClass: "overflow-visible",
  },
  // 2: Skills (Tech Stack) - light #ebeff5, slides over Playground
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 3: Projects (Featured Projects) - light #f5f7fc, pins itself internally for horizontal scrolling
  {
    bgColor: "#f5f7fc",
    roundedTop: true,
    shadowClass: "shadow-[25px_0_60px_rgba(0,0,0,0.18),0_-15px_40px_rgba(0,0,0,0.08)]",
    borderClass: "border-t border-r border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 4: Experience (Journey & Achievements) - light #ebeff5, slides over Projects
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-visible",
  },
  // 5: BentoFeatures (AI Dev Lab) - dark #242426, slides over Experience
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.5)]",
    borderClass: "border-t border-[#ffffff20]",
    overflowClass: "overflow-hidden",
  },
  // 6: Certifications (What I've earned) - dark #0d1117 with cash video, slides over BentoFeatures
  {
    bgColor: "#0d1117",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.4)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-hidden",
  },
  // 7: GitHubActivity (Code I've shipped) - light #ebeff5, slides over Certifications with wave curve top
  {
    bgColor: "transparent",
    roundedTop: false,
    shadowClass: "",
    borderClass: "",
    overflowClass: "overflow-visible",
  },
];

export default function StackedSections({ children }: StackedSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childArray = React.Children.toArray(children);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>(".stacked-card-wrapper");
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 768px): enable smooth GSAP ScrollTrigger stacking
      mm.add("(min-width: 768px)", () => {
        const triggers: ScrollTrigger[] = [];

        // Pin each section so the next section slides over it
        for (let i = 0; i < cards.length - 1; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          // Skip pinning if current card contains Projects (which pins itself internally for horizontal scrolling)
          const isProjects = currentCard.querySelector("#projects") !== null;
          if (isProjects) continue;

          const isTall = (el: HTMLElement) => el.offsetHeight > window.innerHeight;

          // If the next card is Projects, unpin when Projects hits top top so horizontal scroll takes over smoothly
          const nextIsProjects = nextCard.querySelector("#projects") !== null;
          const endValue = nextIsProjects ? "top top" : (isTall(nextCard) ? "bottom bottom" : "top top");

          const st = ScrollTrigger.create({
            trigger: currentCard,
            start: () => (isTall(currentCard) ? "bottom bottom" : "top top"),
            endTrigger: nextCard,
            end: () => endValue,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          triggers.push(st);
        }

        return () => {
          triggers.forEach((st) => st.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-x-clip">
      {childArray.map((child, index) => {
        const config = cardConfigs[index] || {
          bgColor: "#ebeff5",
          roundedTop: index > 0,
          shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
          borderClass: "border-t border-[#24242215]",
          overflowClass: "overflow-hidden",
        };

        const zIndex = 10 + index * 10;

        return (
          <div
            key={index}
            className={`stacked-card-wrapper relative w-full ${config.overflowClass} ${
              config.roundedTop
                ? `rounded-t-[32px] sm:rounded-t-[44px] ${config.shadowClass} ${config.borderClass}`
                : ""
            }`}
            style={{
              zIndex,
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
