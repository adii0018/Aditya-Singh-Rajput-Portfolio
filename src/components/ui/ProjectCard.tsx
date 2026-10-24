"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  total?: number;
  isDark?: boolean;
  visualSlot?: React.ReactNode;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total = 4,
  isDark = false,
  visualSlot,
}) => {
  const formattedIndex = String(index + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");
  const accentColor = project.color || (isDark ? "#d9ff5c" : "#10b981");

  return (
    <div
      className={`w-[88vw] sm:w-[82vw] lg:w-[76vw] max-w-[1040px] h-[480px] sm:h-[520px] lg:h-[550px] xl:h-[580px] rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 snap-center relative overflow-hidden shadow-2xl ${
        isDark
          ? "bg-[#0e0e11] text-white border border-white/15"
          : "bg-white text-[#242426] border border-[#24242215]"
      }`}
    >
      {/* Top Micro-Header */}
      <div
        className={`flex items-center justify-between text-xs font-mono uppercase tracking-wider pb-4 border-b ${
          isDark
            ? "text-white/60 border-white/10"
            : "text-[#4d4f57] border-[#24242210]"
        }`}
      >
        <span className="font-semibold flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          {project.tag}
        </span>
        <span className={`font-bold text-sm ${isDark ? "text-white" : "text-[#242426]"}`}>
          {formattedIndex} / {formattedTotal}
        </span>
        <span className="hidden sm:inline">{project.subtitle}</span>
      </div>

      {/* Middle Section: Typography + Visual HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        {/* Title column */}
        <div className={visualSlot || project.image ? "lg:col-span-6" : "lg:col-span-12"}>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium self-start mb-3 border ${
              isDark
                ? "border-white/20 text-white/90"
                : "border-[#24242220] text-[#242426]"
            }`}
          >
            ✦ {project.subtitle}
          </div>
          <h3
            className={`font-black tracking-tight leading-[1.05] ${
              isDark ? "text-white" : "text-[#242426]"
            }`}
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm sm:text-base font-medium mt-2 max-w-md ${
              isDark ? "text-white/70" : "text-[#4d4f57]"
            }`}
          >
            {project.description}
          </p>
        </div>

        {/* Visual Showcase slot */}
        {(visualSlot || project.image) && (
          <div className="lg:col-span-6 w-full">
            {visualSlot ? (
              visualSlot
            ) : project.image ? (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#24242215] shadow-xl group bg-[#0e0e11] aspect-[16/9] w-full">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.subtitle}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FEATURED
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Bottom Section: Action Links & Tech List */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t ${
          isDark ? "border-white/10" : "border-[#24242210]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: accentColor }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isDark
                ? "bg-white text-[#242426] hover:bg-[#e0e0e0]"
                : "bg-[#242426] text-white hover:bg-black"
            }`}
          >
            <GithubIcon size={14} /> View Code <ArrowUpRight size={14} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border border-current transition-all"
            >
              Live Demo <ArrowUpRight size={12} />
            </a>
          )}
        </div>

        <div className="max-w-md text-left sm:text-right">
          <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                  isDark
                    ? "bg-white/10 text-white/90"
                    : "bg-[#2424220a] text-[#242426]"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
