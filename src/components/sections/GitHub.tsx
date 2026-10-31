"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import { personal } from "@/lib/data";
import RevealWords from "@/components/ui/RevealWords";
import { Star, GitFork, ExternalLink, Copy, Check, Clock } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import WavingOctocat from "@/components/ui/WavingOctocat";
import GitHubContributionCalendar from "@/components/ui/GitHubContributionCalendar";

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  color?: string;
  html_url?: string;
}

interface LanguageShare {
  name: string;
  percentage: number;
  color: string;
}

interface LatestCommit {
  repo: string;
  message: string;
  timeAgo: string;
  url: string;
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
    color: "#3178c6",
    html_url: `${personal.github}/janSetu-ai`,
  },
  {
    name: "ffzone",
    description: "Full-stack fantasy football with AI team suggestions",
    stars: 7,
    forks: 1,
    language: "TypeScript",
    color: "#3178c6",
    html_url: `${personal.github}/ffzone`,
  },
];

const langColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  React: "#61dafb",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  Batchfile: "#C1F12E",
  Shell: "#89e051",
  Other: "#8b949e",
};

const defaultLanguages: LanguageShare[] = [
  { name: "Python", percentage: 42, color: "#3572A5" },
  { name: "JavaScript", percentage: 32, color: "#f1e05a" },
  { name: "TypeScript", percentage: 16, color: "#3178c6" },
  { name: "C++", percentage: 6, color: "#f34b7d" },
  { name: "Others", percentage: 4, color: "#8b949e" },
];

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
}

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(sectionRef);
  const [repos, setRepos] = useState<GitHubRepo[]>(defaultRepos);
  const [languages, setLanguages] = useState<LanguageShare[]>(defaultLanguages);
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);
  const [latestCommit, setLatestCommit] = useState<LatestCommit | null>({
    repo: "JanSetu-AI",
    message: "Conversational AI pipeline & multilingual backend sync",
    timeAgo: "recently",
    url: `${personal.github}/JanSetu-AI`,
  });
  const [stats, setStats] = useState({
    reposCount: 50,
    followers: 18,
    starsCount: 42,
    contributionsCount: 1080,
    isLive: false,
  });

  const handleTotalChange = useCallback((total: number) => {
    setStats((prev) => ({ ...prev, contributionsCount: total }));
  }, []);

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

    // 2. Fetch public repos & compute language stats
    fetch(
      `https://api.github.com/users/${personal.githubUsername}/repos?sort=updated&per_page=30`
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

        // Compute language distribution
        const counts: Record<string, number> = {};
        let total = 0;
        repoList.forEach((r: { language?: string }) => {
          if (r.language) {
            counts[r.language] = (counts[r.language] || 0) + 1;
            total++;
          }
        });

        if (total > 0) {
          const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
          const topLangs = sorted.slice(0, 4);
          const remainder = sorted.slice(4).reduce((sum, item) => sum + item[1], 0);

          const breakdown: LanguageShare[] = topLangs.map(([lang, count]) => ({
            name: lang,
            percentage: Math.max(1, Math.round((count / total) * 100)),
            color: langColors[lang] || "#8b949e",
          }));

          if (remainder > 0) {
            breakdown.push({
              name: "Others",
              percentage: Math.max(1, Math.round((remainder / total) * 100)),
              color: "#8b949e",
            });
          }
          setLanguages(breakdown);
        }
      })
      .catch(() => {});

    // 3. Fetch latest commit / shipping activity
    fetch(`https://api.github.com/users/${personal.githubUsername}/events`)
      .then((res) => (res.ok ? res.json() : null))
      .then((events) => {
        if (!Array.isArray(events) || events.length === 0) return;
        const push = events.find((e: { type?: string }) => e.type === "PushEvent") || events[0];
        if (push) {
          const repoRaw = push.repo?.name || `${personal.githubUsername}/JanSetu-AI`;
          const repoClean = repoRaw.replace(/^[^/]+\//, "");
          const rawMsg =
            push.payload?.commits?.[0]?.message ||
            (push.type === "PushEvent"
              ? "Pushed new updates & commits"
              : "Updated repository activity");
          const firstLine = rawMsg.split("\n")[0].trim().slice(0, 60);

          setLatestCommit({
            repo: repoClean,
            message: firstLine,
            timeAgo: getRelativeTime(push.created_at || new Date().toISOString()),
            url: `https://github.com/${repoRaw}`,
          });
        }
      })
      .catch(() => {});
  }, []);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".gh-badge", {
        y: -15,
        opacity: 0,
        duration: 0.22,
      })
      .from(".gh-loader", {
        scale: 0.8,
        opacity: 0,
        duration: 0.25,
        ease: "back.out(1.7)",
      }, "-=0.35")
      .from(".gsap-word-reveal", {
        yPercent: 110,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.58,
        ease: "power4.out",
      }, "-=0.5")
      .from(".gh-profile-btn", {
        y: 15,
        opacity: 0,
        duration: 0.22,
      }, "-=0.45")
      .from(".gh-ticker", {
        y: 20,
        opacity: 0,
        duration: 0.25,
      }, "-=0.35")
      .from(".gh-chart-card", {
        y: 10,
        opacity: 0,
        duration: 0.3,
      }, "-=0.3")
      .from(".gh-stat-card", {
        y: 8,
        opacity: 0,
        stagger: 0.055,
        duration: 0.25,
      }, "-=0.4")
      .from(".gh-repo-card", {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.28,
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="github"
      ref={sectionRef}
      style={{ zIndex: 45 }}
      className="relative w-full -mt-16 sm:-mt-24 md:-mt-32 text-[#1F3B2E]"
    >
      {/* Luxury Parabolic Curved Horizon Arch (Apple & Porsche Luxury Scoop) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 md:h-32 block drop-shadow-[0_-25px_40px_rgba(0,0,0,0.85)]"
        >
          <defs>
            <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8B3E8" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#C8B3E8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#C8B3E8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C8B3E8" stopOpacity="0.1" />
            </linearGradient>
            <filter id="neonBlur" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Oatmeal Body Fill forming the curved arch */}
          <path
            d="M0,120 L0,70 Q720,0 1440,70 L1440,120 Z"
            fill="#E8DCC6"
          />

          {/* Glowing Illuminated Laser Rim along the curve */}
          <path
            d="M0,70 Q720,0 1440,70"
            stroke="url(#horizonGlow)"
            strokeWidth="3.5"
            filter="url(#neonBlur)"
            fill="none"
          />
        </svg>

        {/* Apex Telemetry Emblem / Horizon Coordinate Pill at the crest */}
        <div className="relative -mt-8 sm:-mt-12 md:-mt-16 flex justify-center z-30">
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1F3B2E] border-2 border-[#C8B3E8] text-[#E8DCC6] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase shadow-[0_0_25px_rgba(200,179,232,0.6)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C8B3E8] animate-ping" />
            <span className="font-bold">✦ CONTINUOUS CADENCE // 37.77° N</span>
          </div>
        </div>
      </div>

      {/* Main Oatmeal Section Body (Seamlessly connects to the bottom of the SVG) */}
      <div className="relative w-full bg-[#E8DCC6] pt-4 sm:pt-8 pb-28 md:pb-36 -mt-1 overflow-hidden">
        {/* Ambient Botanical Luxury Glows (Pine Green + Soft Lilac Lotus Aura) */}
        <div className="absolute top-0 right-10 w-[550px] h-[550px] bg-[#C8B3E8]/35 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#1F3B2E]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
        {/* Header (Lotus / Pine Green & Soft Lilac Editorial Theme) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="gh-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F3B2E]/10 border border-[#1F3B2E]/20 text-[#1F3B2E] text-xs font-mono tracking-wider uppercase mb-4 font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C8B3E8]" />
              ✦ GitHub Activity // Continuous Delivery
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="gh-loader shrink-0 flex items-center justify-center">
                <WavingOctocat size={64} />
              </div>
              <h2
                aria-label="Code I've shipped."
                className="gh-heading font-black text-[#1F3B2E] leading-tight tracking-tight"
                style={{ fontSize: "clamp(34px, 5.5vw, 62px)" }}
              >
                <RevealWords text="Code I've" />
                <br />
                <RevealWords text="shipped" className="italic text-[#1F3B2E]/75 font-serif font-normal" />
                <RevealWords text="." className="text-[#C8B3E8]" />
              </h2>
            </div>
          </div>

          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            className="gh-profile-btn flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1F3B2E] text-[#E8DCC6] text-sm font-semibold hover:bg-[#15271F] transition-all cursor-pointer shadow-lg shadow-[#1F3B2E]/20 self-start md:self-auto border border-[#1F3B2E]"
          >
            <GithubIcon size={16} /> @{personal.githubUsername}
            <ExternalLink size={13} className="text-[#C8B3E8]" />
          </motion.a>
        </div>

        {/* Latest Commit Live Ticker */}
        {latestCommit && (
          <div className="gh-ticker mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#15271F] border border-[#1F3B2E] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm shadow-xl shadow-[#1F3B2E]/15">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8B3E8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8B3E8]"></span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#C8B3E8] bg-[#1F3B2E] border border-[#C8B3E8]/30 px-2.5 py-0.5 rounded-full shrink-0">
                Live Activity
              </span>
              <span className="text-[#E8DCC6] font-medium truncate">
                Pushed to{" "}
                <span className="font-semibold text-white underline decoration-[#C8B3E8] underline-offset-2">
                  {latestCommit.repo}
                </span>
                {latestCommit.message ? (
                  <span className="text-[#E8DCC6]/60 hidden sm:inline">
                    {" "}— &ldquo;{latestCommit.message}&rdquo;
                  </span>
                ) : null}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-[#E8DCC6]/70 text-xs font-mono ml-auto sm:ml-0">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#C8B3E8]" /> {latestCommit.timeAgo}
              </span>
              <a
                href={latestCommit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-sans text-xs text-[#C8B3E8] font-semibold hover:text-white transition-colors"
              >
                View <ExternalLink size={11} />
              </a>
            </div>
          </div>
        )}

        {/* GitHub Contribution Graph & Language Breakdown */}
        <div className="gh-chart-card bg-[#15271F] rounded-3xl border border-[#1F3B2E] p-6 md:p-8 mb-8 overflow-hidden shadow-2xl shadow-[#1F3B2E]/20 text-white">
          <GitHubContributionCalendar
            username={personal.githubUsername}
            onTotalChange={handleTotalChange}
          />

          {/* Languages Segmented Progress Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C8B3E8] font-semibold">
                Language Distribution
              </span>
              <span className="text-xs text-[#E8DCC6]/60 font-mono">
                {stats.reposCount} Repositories Analyzed
              </span>
            </div>

            {/* Segmented bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#0e1b15] border border-white/10 gap-0.5 p-0.5">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-85"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3.5">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5 text-xs text-[#E8DCC6]">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-[#C8B3E8]/80 font-mono text-[11px]">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="gh-stat-card bg-[#15271F] rounded-2xl border border-[#1F3B2E] p-6 text-center shadow-lg shadow-[#1F3B2E]/15">
            <p className="text-3xl font-black text-[#C8B3E8] mb-1">
              {stats.reposCount}
              <span className="text-xl text-[#E8DCC6]">+</span>
            </p>
            <p className="text-[#E8DCC6]/70 text-sm font-mono">Public Repositories</p>
          </div>
          <div className="gh-stat-card bg-[#15271F] rounded-2xl border border-[#1F3B2E] p-6 text-center shadow-lg shadow-[#1F3B2E]/15">
            <p className="text-3xl font-black text-[#C8B3E8] mb-1">
              {(stats.contributionsCount || 1080).toLocaleString()}
              <span className="text-xl text-[#E8DCC6]">+</span>
            </p>
            <p className="text-[#E8DCC6]/70 text-sm font-mono">Contributions in Last Year</p>
          </div>
          <div className="gh-stat-card bg-[#15271F] rounded-2xl border border-[#1F3B2E] p-6 text-center shadow-lg shadow-[#1F3B2E]/15">
            <p className="text-3xl font-black text-[#C8B3E8] mb-1">
              {stats.starsCount}
              <span className="text-xl text-[#E8DCC6]">+</span>
            </p>
            <p className="text-[#E8DCC6]/70 text-sm font-mono">Stars & Interactions</p>
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
                className="block bg-[#15271F] rounded-2xl border border-[#1F3B2E] p-6 hover:border-[#C8B3E8]/60 hover:shadow-xl hover:shadow-[#1F3B2E]/30 transition-all group h-full cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GithubIcon size={15} className="text-[#C8B3E8]" />
                    <span className="font-semibold text-white text-sm group-hover:text-[#C8B3E8] transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const cloneCmd = `git clone ${repo.html_url || `${personal.github}/${repo.name}`}.git`;
                        navigator.clipboard.writeText(cloneCmd);
                        setCopiedRepo(repo.name);
                        setTimeout(() => setCopiedRepo(null), 2000);
                      }}
                      title="Copy git clone command"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#1F3B2E] border border-white/10 hover:bg-[#1F3B2E]/80 text-[#E8DCC6]/70 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedRepo === repo.name ? (
                        <>
                          <Check size={11} className="text-[#C8B3E8]" />
                          <span className="text-[#C8B3E8] font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>clone</span>
                        </>
                      )}
                    </button>
                    <ExternalLink
                      size={13}
                      className="text-[#E8DCC6]/40 group-hover:text-white transition-colors"
                    />
                  </div>
                </div>

                <p className="text-[#E8DCC6]/70 text-xs leading-relaxed mb-4 font-sans">{repo.description}</p>

                <div className="flex items-center justify-between text-xs text-[#E8DCC6]/60 font-mono pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: repo.color || langColors[repo.language] || "#C8B3E8" }}
                    />
                    <span className="text-[#E8DCC6] font-medium">{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <Star size={11} className="text-[#C8B3E8]" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <GitFork size={11} className="text-[#E8DCC6]/60" /> {repo.forks}
                    </span>
                  </div>
                </div>
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}
