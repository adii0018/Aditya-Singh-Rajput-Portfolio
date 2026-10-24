"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { experience } from "@/lib/data";
import { Briefcase, Trophy, GraduationCap } from "lucide-react";
import SharinganLoader from "@/components/ui/SharinganLoader";
import PokeballLoader from "@/components/ui/PokeballLoader";

const typeIcon = {
  work: <Briefcase size={14} />,
  achievement: <Trophy size={14} />,
  education: <GraduationCap size={14} />,
};

const typeColor = {
  work: "#d9ff5c",
  achievement: "#c0adff",
  education: "#b8deff",
};

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet entrance timeline: dynamic slide-in from bottom-left
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          cardRef.current,
          {
            x: 0,
            y: 20,
            rotate: 0,
            scale: 1,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        )
        .fromTo(
          ".exp-badge",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
          "-=0.25"
        )
        .fromTo(
          ".exp-loader",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.18"
        )
        .fromTo(
          ".exp-heading",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.18"
        );
      });

      // Mobile entrance timeline
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        });

        tl.fromTo(
          cardRef.current,
          {
            x: 0,
            y: 18,
            rotate: 0,
            scale: 1,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        )
        .fromTo(
          ".exp-badge",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
          "-=0.25"
        )
        .fromTo(
          ".exp-loader",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.18"
        )
        .fromTo(
          ".exp-heading",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.18"
        );
      });

      // Animate vertical timeline progress line with scroll scrub
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 75%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      // Staggered reveal for timeline entries alternating from left & right
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-entry-left").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              once: true,
            },
            y: 14,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        });

        gsap.utils.toArray<HTMLElement>(".timeline-entry-right").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              once: true,
            },
            y: 14,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-entry-left").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              once: true,
            },
            y: 14,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        });

        gsap.utils.toArray<HTMLElement>(".timeline-entry-right").forEach((entry) => {
          gsap.from(entry, {
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              once: true,
            },
            y: 14,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity",
          });
        });
      });

      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: "top 85%",
            once: true,
          },
          scale: 0.3,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
          clearProps: "transform,opacity",
        });
      });

      if (sectionRef.current?.querySelector(".pokeball-end")) {
        gsap.from(".pokeball-end", {
          scrollTrigger: {
            trigger: ".pokeball-end",
            start: "top 92%",
            once: true,
          },
          scale: 0.2,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          clearProps: "transform,opacity",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-gradient-to-b from-[#dde4ee] via-[#e6ebf3] to-[#ebeff5] z-20"
    >
      <div
        ref={cardRef}
        className="w-full bg-[#ebeff5] rounded-t-[36px] sm:rounded-t-[48px] border-t-2 border-l-2 border-white/90 shadow-[-28px_28px_70px_rgba(20,24,35,0.14),0_-20px_45px_rgba(20,24,35,0.06)] section-padding"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="exp-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ Experience & Achievements
            </div>
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="exp-loader shrink-0 flex items-center justify-center">
                <SharinganLoader />
              </div>
              <h2
                className="exp-heading font-black text-[#242426] leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Where I&apos;ve
                <br />
                <span className="italic text-[#4d4f57]">been</span>
              </h2>
            </div>
          </div>

        {/* Timeline */}
        <div className="timeline-container relative max-w-5xl mx-auto pb-16">
          {/* Timeline background track line */}
          <div
            className="absolute left-6 md:left-1/2 top-4 bottom-7 w-0.5 -translate-x-1/2 bg-[#24242215]"
          />

          {/* Vertical scrub line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-4 bottom-7 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#d9ff5c] via-[#242426] to-[#24242690] origin-top z-0"
          />

          <div className="space-y-8 md:space-y-12">
            {experience.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`timeline-entry ${
                    isLeft ? "timeline-entry-left" : "timeline-entry-right"
                  } relative flex flex-col md:flex-row items-start md:items-center w-full`}
                >
                  {/* Center Dot Node */}
                  <div
                    className="timeline-dot absolute left-6 md:left-1/2 top-6 md:top-[36px] -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border-4 border-[#ebeff5] z-10 shadow-sm"
                    style={{ background: typeColor[item.type as keyof typeof typeColor] }}
                  >
                    <span className="text-[#242426]">
                      {typeIcon[item.type as keyof typeof typeIcon]}
                    </span>
                  </div>

                  {/* Card wrapper */}
                  <div
                    className={`w-full pl-14 md:pl-0 md:w-[calc(50%-2.5rem)] relative ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    {/* Horizontal connector line on desktop */}
                    <div
                      className={`hidden md:block absolute top-[35px] h-[2px] w-10 bg-[#24242220] ${
                        isLeft ? "right-[-2.5rem]" : "left-[-2.5rem]"
                      }`}
                    />

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="bg-white rounded-2xl p-6 border border-[#24242210] hover:border-[#24242225] hover:shadow-lg hover:shadow-[#24242208] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-bold text-[#242426] text-base">{item.title}</h3>
                          <p className="text-[#4d4f57] text-sm font-medium">{item.company}</p>
                        </div>
                        <span className="text-xs font-mono text-[#4d4f57] bg-[#24242208] px-3 py-1 rounded-full whitespace-nowrap self-start">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-[#4d4f57] text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: typeColor[item.type as keyof typeof typeColor] + "20",
                              color:
                                item.type === "work"
                                  ? "#5a6e00"
                                  : typeColor[item.type as keyof typeof typeColor],
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ending Pokéball at the finish of the center line */}
          <div className="pokeball-end absolute left-6 md:left-1/2 bottom-0 -translate-x-1/2 z-20 flex flex-col items-center">
            <PokeballLoader />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
