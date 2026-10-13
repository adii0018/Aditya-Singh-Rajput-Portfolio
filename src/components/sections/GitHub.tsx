"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { personal } from "@/lib/data";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

// Static top repos data — update with real repos
const topRepos = [
  {
    name: "alice-exam-proctor",
    description: "AI-powered exam proctoring with computer vision & NLP",
    stars: 12,
    forks: 4,
    language: "Python",
    color: "#3572A5",
  },
  {
    name: "alice-mandi",
    description: "Agricultural marketplace with ML price prediction",
    stars: 8,
    forks: 2,
    language: "Python",
    color: "#3572A5",
  },
  {
    name: "janSetu-ai",
    description: "Conversational AI for government scheme access",
    stars: 15,
    forks: 6,
    language: "TypeScript",
    color: "#2b7489",
  },
  {
    name: "ffzone",
    description: "Full-stack fantasy football with AI team suggestions",
    stars: 7,
    forks: 1,
    language: "TypeScript",
    color: "#2b7489",
  },
];

const langColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  React: "#61dafb",
};

export default function GitHubActivity() {
  return (
    <section id="github" className="section-padding bg-[#ebeff5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
                ✦ GitHub Activity
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="font-black text-[#242426] leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Code I&apos;ve
                <br />
                <span className="italic text-[#4d4f57]">shipped</span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#242426] text-white text-sm font-semibold hover:bg-[#3a3a3c] transition-all"
            >
              <GithubIcon size={15} /> @{personal.githubUsername}
              <ExternalLink size={12} />
            </motion.a>
          </ScrollReveal>
        </div>

        {/* GitHub Contribution Graph embed */}
        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-3xl border border-[#24242210] p-6 md:p-8 mb-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-[#242426] text-base">Contribution Activity</h3>
                <p className="text-[#4d4f57] text-sm">Last 12 months</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-[#4d4f57]">
                <span className="w-3 h-3 rounded-sm bg-[#40c463]" />
                More active
              </span>
            </div>

            {/* Contribution graph via GitHub chart embed */}
            <div className="w-full overflow-x-auto">
              <Image
                src={`https://ghchart.rshah.org/40c463/${personal.githubUsername}`}
                alt="GitHub Contribution Graph"
                width={850}
                height={125}
                unoptimized
                className="w-full min-w-[600px] h-auto rounded-lg"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* GitHub Stats Cards */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-[#24242210] p-6 text-center">
              <p className="text-3xl font-black text-[#2da44e] mb-1">50+</p>
              <p className="text-[#4d4f57] text-sm font-mono">Repositories</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#24242210] p-6 text-center">
              <p className="text-3xl font-black text-[#40c463] mb-1">500+</p>
              <p className="text-[#4d4f57] text-sm font-mono">Contributions</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#24242210] p-6 text-center">
              <p className="text-3xl font-black text-[#2da44e] mb-1">42+</p>
              <p className="text-[#4d4f57] text-sm font-mono">Stars Earned</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Top Repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topRepos.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={i * 0.1}>
              <motion.a
                href={`${personal.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="block bg-white rounded-2xl border border-[#24242210] p-6 hover:border-[#40c46360] hover:shadow-lg hover:shadow-[#40c46315] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GithubIcon size={15} className="text-[#4d4f57]" />
                    <span className="font-semibold text-[#242426] text-sm group-hover:text-[#242426]">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink
                    size={13}
                    className="text-[#24242240] group-hover:text-[#242426] transition-colors"
                  />
                </div>

                <p className="text-[#4d4f57] text-xs leading-relaxed mb-4">{repo.description}</p>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-[#4d4f57]">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: langColors[repo.language] || "#888" }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#4d4f57]">
                    <Star size={11} /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#4d4f57]">
                    <GitFork size={11} /> {repo.forks}
                  </span>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
