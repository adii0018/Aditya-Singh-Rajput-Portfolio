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
  // 3: Projects (Featured Projects) - light #f5f7fc, slides over Smart Engine
  {
    bgColor: "#f5f7fc",
    roundedTop: true,
    shadowClass: "shadow-[0_-20px_50px_rgba(0,0,0,0.15)]",
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
  // 7: Contact - dark #242426, slides over GitHubActivity
  {
    bgColor: "#242426",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.45)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-hidden",
  },
];

export default function StackedSections({ children }: StackedSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childArray = React.Children.toArray(children);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 768px): Smooth layered stacking with depth perspective
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stacked-card-wrapper");
        if (!cards.length) return;

        // For each card before the next card slides over it:
        // Scale down subtly to 0.95 and dim to create the depth perspective of receding into the stack
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const nextCard = cards[i + 1];
          if (!nextCard) return;

          gsap.to(card, {
            scale: 0.95,
            opacity: 0.75,
            filter: "brightness(0.85)",
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      // Mobile (max-width: 767px): Simple natural overlap and reveal without complex pinning
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stacked-card-wrapper");
        cards.forEach((card, i) => {
          if (i === 0) return;
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
            y: 18,
            opacity: 0.9,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "transform,opacity",
          });
        });
      });
    },
    { scope: containerRef }
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
            className={`stacked-card-wrapper relative md:sticky w-full ${config.overflowClass} ${
              config.roundedTop
                ? `rounded-t-[32px] sm:rounded-t-[44px] ${config.shadowClass} ${config.borderClass}`
                : ""
            }`}
            style={{
              zIndex,
              backgroundColor: config.bgColor,
              top: "min(0px, calc(100vh - 100%))",
              willChange: "transform, opacity, filter",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
