"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { BentoCard } from "@/components/ui/BentoCard";
import CodeLoader from "@/components/ui/CodeLoader";
import { projects } from "@/lib/data";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isLarge = project.size === "large";

  return (
    <div className={`project-card ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}`}>
      <BentoCard
        color={project.color}
        delay={0}
        className="h-full"
      >
        {/* Card content */}
        <div className={`p-7 flex flex-col flex-1 ${isLarge ? "p-9" : ""}`}>
          {/* Tag */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
              style={{
                background: project.color + "20",
                color: project.color === "#d9ff5c" ? "#5a6e00" : project.color,
              }}
            >
              {project.tag}
            </span>
            <span className="text-[#24242230] font-mono text-xs">0{index + 1}</span>
          </div>

          {/* Image placeholder */}
          <div
            className={`project-thumb rounded-2xl mb-6 overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] ${
              isLarge ? "h-48" : "h-36"
            }`}
            style={{
              background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}08 100%)`,
              border: `1px solid ${project.color}30`,
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">
                {index === 0 ? "👁️" : index === 1 ? "🌾" : index === 2 ? "🏛️" : "⚽"}
              </div>
              <p className="text-[#24242240] text-xs font-mono">Interactive Architecture</p>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-black text-[#242426] tracking-tight mb-2 ${
              isLarge ? "text-2xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <p className="text-[#4d4f57] text-sm font-medium mb-3">{project.subtitle}</p>
          <p
            className={`text-[#4d4f57] text-sm leading-relaxed mb-6 flex-1 ${
              isLarge ? "text-base" : ""
            }`}
          >
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full bg-[#24242208] text-[#4d4f57] text-xs font-medium border border-[#24242212]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#242426] text-white text-xs font-semibold hover:bg-[#3a3a3c] transition-colors cursor-pointer"
            >
              <GithubIcon size={13} /> View Code
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#24242220] text-[#242426] text-xs font-semibold hover:border-[#242426] transition-colors cursor-pointer"
              >
                <ExternalLink size={13} /> Live Demo
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={18} className="text-[#24242240]" />
        </div>
      </BentoCard>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".projects-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".projects-heading", {
        y: 35,
        opacity: 0,
        duration: 0.8,
      }, "-=0.35")
      .from(".projects-code-loader", {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, "-=0.5")
      .from(".projects-all-btn", {
        y: 15,
        opacity: 0,
        duration: 0.6,
      }, "-=0.45")
      .from(".project-card", {
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-[#f5f7fc]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="projects-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ Featured Projects
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <h2
                className="projects-heading font-black text-[#242426] leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Things I&apos;ve
                <br />
                <span className="italic text-[#4d4f57]">built</span>
              </h2>
              <div className="projects-code-loader flex items-center">
                <CodeLoader />
              </div>
            </div>
          </div>

          <motion.a
            href="https://github.com/adii0018"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            className="projects-all-btn flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#24242220] text-[#242426] text-sm font-semibold hover:border-[#242426] transition-all cursor-pointer self-start md:self-auto"
          >
            <GithubIcon size={15} /> All Projects
          </motion.a>
        </div>

        {/* Bento grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
