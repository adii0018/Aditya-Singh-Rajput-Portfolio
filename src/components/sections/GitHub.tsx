"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { personal } from "@/lib/data";
import { Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import GridCardLoader from "@/components/ui/GridCardLoader";

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  color?: string;
  html_url?: string;
}

const defaultRepos: GitHubRepo[] = [
  {
    name: "alice-exam-proctor",
    description: "AI-powered exam proctoring with computer vision & NLP",
    stars: 12,
    forks: 4,
    language: "Python",
    color: "#3572A5",
    html_url: `${personal.github}/alice-exam-proctor`,
  },
  {
    name: "alice-mandi",
    description: "Agricultural marketplace with ML price prediction",
    stars: 8,
    forks: 2,
    language: "Python",
    color: "#3572A5",
    html_url: `${personal.github}/alice-mandi`,
  },
  {
    name: "janSetu-ai",
    description: "Conversational AI for government scheme access",
    stars: 15,
    forks: 6,
    language: "TypeScript",
    color: "#2b7489",
    html_url: `${personal.github}/janSetu-ai`,
  },
  {
    name: "ffzone",
    description: "Full-stack fantasy football with AI team suggestions",
    stars: 7,
    forks: 1,
    language: "TypeScript",
    color: "#2b7489",
    html_url: `${personal.github}/ffzone`,
  },
];

const langColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  React: "#61dafb",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>(defaultRepos);
  const [stats, setStats] = useState({
    reposCount: 50,
    followers: 18,
    starsCount: 42,
    isLive: false,
  });

  useEffect(() => {
    // 1. Fetch user public profile
    fetch(`https://api.github.com/users/${personal.githubUsername}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((userData) => {
        if (!userData) return;
        setStats((prev) => ({
          ...prev,
          reposCount: userData.public_repos || prev.reposCount,
          followers: userData.followers || prev.followers,
          isLive: true,
        }));
      })
      .catch(() => {});

    // 2. Fetch public repos
    fetch(
      `https://api.github.com/users/${personal.githubUsername}/repos?sort=updated&per_page=6`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((repoList) => {
        if (!Array.isArray(repoList) || repoList.length === 0) return;
        const totalStars = repoList.reduce(
          (acc: number, r: { stargazers_count?: number }) =>
            acc + (r.stargazers_count || 0),
          0
        );
        const mappedRepos: GitHubRepo[] = repoList.slice(0, 4).map((r) => ({
          name: r.name,
          description: r.description || "Open source software project",
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          language: r.language || "TypeScript",
          html_url: r.html_url,
          color: langColors[r.language] || "#3572A5",
        }));
        setRepos(mappedRepos);
        setStats((prev) => ({
          ...prev,
          starsCount: totalStars > 0 ? totalStars : prev.starsCount,
          isLive: true,
        }));
      })
      .catch(() => {});
  }, []);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".gh-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".gh-loader", {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      }, "-=0.35")
      .from(".gh-heading", {
        y: 30,
        opacity: 0,
        duration: 0.75,
      }, "-=0.5")
      .from(".gh-profile-btn", {
        y: 15,
        opacity: 0,
        duration: 0.6,
      }, "-=0.45")
      .from(".gh-chart-card", {
        y: 35,
        opacity: 0,
        duration: 0.8,
      }, "-=0.3")
      .from(".gh-stat-card", {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
      }, "-=0.4")
      .from(".gh-repo-card", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section id="github" ref={sectionRef} className="section-padding bg-[#ebeff5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="gh-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ GitHub Activity
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="gh-loader shrink-0 flex items-center justify-center">
                <GridCardLoader />
              </div>
              <h2
                className="gh-heading font-black text-[#242426] leading-tight tracking-tight"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Code I&apos;ve
                <br />
                <span className="italic text-[#4d4f57]">shipped</span>
              </h2>
            </div>
          </div>

          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            className="gh-profile-btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#242426] text-white text-sm font-semibold hover:bg-[#3a3a3c] transition-all cursor-pointer self-start md:self-auto"
          >
            <GithubIcon size={15} /> @{personal.githubUsername}
            <ExternalLink size={12} />
          </motion.a>
        </div>

        {/* GitHub Contribution Graph embed */}
        <div className="gh-chart-card bg-white rounded-3xl border border-[#24242210] p-6 md:p-8 mb-8 overflow-hidden">
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

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="gh-stat-card bg-white rounded-2xl border border-[#24242210] p-6 text-center">
            <p className="text-3xl font-black text-[#2da44e] mb-1">
              {stats.reposCount}
              <span className="text-xl">+</span>
            </p>
            <p className="text-[#4d4f57] text-sm font-mono">Public Repositories</p>
          </div>
          <div className="gh-stat-card bg-white rounded-2xl border border-[#24242210] p-6 text-center">
            <p className="text-3xl font-black text-[#40c463] mb-1">
              500<span className="text-xl">+</span>
            </p>
            <p className="text-[#4d4f57] text-sm font-mono">Contributions & Commits</p>
          </div>
          <div className="gh-stat-card bg-white rounded-2xl border border-[#24242210] p-6 text-center">
            <p className="text-3xl font-black text-[#2da44e] mb-1">
              {stats.starsCount}
              <span className="text-xl">+</span>
            </p>
            <p className="text-[#4d4f57] text-sm font-mono">Stars & Interactions</p>
          </div>
        </div>

        {/* Top Repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <div key={repo.name} className="gh-repo-card">
              <motion.a
                href={repo.html_url || `${personal.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="block bg-white rounded-2xl border border-[#24242210] p-6 hover:border-[#40c46360] hover:shadow-lg hover:shadow-[#40c46315] transition-all group h-full cursor-pointer"
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
                      style={{ background: repo.color || langColors[repo.language] || "#888" }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
