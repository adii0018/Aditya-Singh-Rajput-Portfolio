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
  // 1: Skills (Tech Stack) - light #ebeff5, slides over About
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 2: BentoFeatures (Smart Engine) - dark #242426, slides over Skills
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.5)]",
    borderClass: "border-t border-[#ffffff20]",
    overflowClass: "overflow-hidden",
  },
  // 3: Projects (Featured Projects) - light #f5f7fc, slides over Skills
  {
    bgColor: "#f5f7fc",
    roundedTop: true,
    shadowClass: "shadow-[0_-15px_40px_rgba(0,0,0,0.08)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 4: Experience (Experience & Achievements) - light #ebeff5, slides over Projects
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-15px_40px_rgba(0,0,0,0.08)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 5: Certifications - dark #242426, slides over Experience
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.35)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-hidden",
  },
  // 6: GitHubActivity - light #ebeff5, slides over Certifications
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.12)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
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

        // Pin each section (except the last one) so the next section slides over it
        for (let i = 0; i < cards.length - 1; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          const isTall = (el: HTMLElement) => el.offsetHeight > window.innerHeight;

          const st = ScrollTrigger.create({
            trigger: currentCard,
            start: () => (isTall(currentCard) ? "bottom bottom" : "top top"),
            endTrigger: nextCard,
            end: () => (isTall(nextCard) ? "bottom bottom" : "top top"),
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
    <div ref={containerRef} className="relative w-full">
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
