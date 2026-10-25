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
  // 0: BeyondTheCode (Tech Dashboard Hub) - dark #202022 (Frequency Pulse Line)
  {
    bgColor: "#202022",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.5)]",
    borderClass: "border-t border-[#ffffff15]",
    overflowClass: "overflow-visible",
  },
  // 1: About (Cosmic Guns.lol) - dark #0a0a0c, slides over BeyondTheCode
  {
    bgColor: "#0a0a0c",
    roundedTop: true,
    shadowClass: "shadow-[0_-30px_70px_rgba(0,0,0,0.8)]",
    borderClass: "border-t border-[#ffffff20]",
    overflowClass: "overflow-visible",
  },
  // 2: Skills (Tech Stack) - light #ebeff5, slides over About
  {
    bgColor: "#ebeff5",
    roundedTop: true,
    shadowClass: "shadow-[0_-25px_60px_rgba(0,0,0,0.18)]",
    borderClass: "border-t border-[#24242215]",
    overflowClass: "overflow-hidden",
  },
  // 3: Projects (Featured Projects) - luxury dark #07080a, slides over Skills
  {
    bgColor: "#07080a",
    roundedTop: true,
    shadowClass: "shadow-[0_-30px_80px_rgba(0,0,0,0.8)]",
    borderClass: "border-t border-[#ffffff15]",
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
          // Card 3 (Projects) pins itself internally for horizontal scrolling
          if (i === cards.length - 1) continue;

          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          const isTall = (el: HTMLElement) => el.offsetHeight > window.innerHeight;

          // BentoFeatures (i === 2) unpins when Projects hits top top
          const endValue = i === cards.length - 2 ? "top top" : (isTall(nextCard) ? "bottom bottom" : "top top");

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

        // Smart Video Lifecycle: plays ONLY when visible, pauses immediately when covered by next card
        cards.forEach((card, idx) => {
          const video = card.querySelector<HTMLVideoElement>("video");
          if (!video) return;

          video.pause();

          const nextCard = cards[idx + 1];

          const vTrigger = ScrollTrigger.create({
            trigger: card,
            start: "top 95%",
            endTrigger: nextCard || card,
            end: nextCard ? "top 5%" : "bottom 5%",
            onEnter: () => {
              video.play().catch(() => {});
            },
            onLeave: () => {
              video.pause();
            },
            onEnterBack: () => {
              video.play().catch(() => {});
            },
            onLeaveBack: () => {
              video.pause();
            },
          });
          triggers.push(vTrigger);
        });

        // Refresh triggers once fonts are fully rendered to avoid CLS
        if (typeof document !== "undefined" && "fonts" in document) {
          document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
          });
        }

        return () => {
          triggers.forEach((st) => st.kill());
        };
      });

      // Mobile: Pause offscreen videos during normal vertical scrolling
      mm.add("(max-width: 767px)", () => {
        const triggers: ScrollTrigger[] = [];
        cards.forEach((card) => {
          const video = card.querySelector<HTMLVideoElement>("video");
          if (!video) return;

          video.pause();

          const st = ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
              video.play().catch(() => {});
            },
            onLeave: () => {
              video.pause();
            },
            onEnterBack: () => {
              video.play().catch(() => {});
            },
            onLeaveBack: () => {
              video.pause();
            },
          });
          triggers.push(st);
        });

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
