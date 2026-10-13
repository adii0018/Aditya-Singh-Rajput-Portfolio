"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { personal } from "@/lib/data";
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
      .from(".gh-ticker", {
        y: 20,
        opacity: 0,
        duration: 0.65,
      }, "-=0.35")
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
    <section id="github" ref={sectionRef} className="relative w-full bg-[#ebeff5]">
      {/* Wave Curve Top Transition */}
      <div className="w-full overflow-hidden leading-none block -mb-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-20 md:h-28 block pointer-events-none"
        >
          {/* Dark background from Certifications (#242426) above */}
          <rect width="1440" height="120" fill="#242426" />

          {/* Flowing Wave Curve filled with GitHub background (#ebeff5) */}
          <path
            d="M0,45 C320,110 500,10 740,55 C980,100 1180,15 1440,60 L1440,120 L0,120 Z"
            fill="#ebeff5"
          />

          {/* Crisp, elegant wave stroke border */}
          <path
            d="M0,45 C320,110 500,10 740,55 C980,100 1180,15 1440,60"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 sm:pt-10 pb-28 md:pb-36">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="gh-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24242220] text-[#4d4f57] text-xs font-mono tracking-wider uppercase mb-4">
              ✦ GitHub Activity
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="gh-loader shrink-0 flex items-center justify-center">
                <WavingOctocat size={64} />
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

        {/* Latest Commit Live Ticker */}
        {latestCommit && (
          <div className="gh-ticker mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm shadow-xl shadow-black/20">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39d353] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39d353]"></span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#7d8590] bg-[#161b22] border border-[#30363d] px-2.5 py-0.5 rounded-full shrink-0">
                Live Activity
              </span>
              <span className="text-[#e6edf3] font-medium truncate">
                Pushed to{" "}
                <span className="font-semibold text-white underline decoration-[#39d353] underline-offset-2">
                  {latestCommit.repo}
                </span>
                {latestCommit.message ? (
                  <span className="text-[#7d8590] hidden sm:inline">
                    {" "}— &ldquo;{latestCommit.message}&rdquo;
                  </span>
                ) : null}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-[#7d8590] text-xs font-mono ml-auto sm:ml-0">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {latestCommit.timeAgo}
              </span>
              <a
                href={latestCommit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-sans text-xs text-[#e6edf3] font-semibold hover:text-[#39d353] transition-colors"
              >
                View <ExternalLink size={11} />
              </a>
            </div>
          </div>
        )}

        {/* GitHub Contribution Graph & Language Breakdown */}
        <div className="gh-chart-card bg-[#0d1117] rounded-3xl border border-[#30363d] p-6 md:p-8 mb-8 overflow-hidden shadow-2xl shadow-black/30">
          <GitHubContributionCalendar
            username={personal.githubUsername}
            onTotalChange={(total) =>
              setStats((prev) => ({ ...prev, contributionsCount: total }))
            }
          />

          {/* Languages Segmented Progress Bar */}
          <div className="mt-8 pt-6 border-t border-[#30363d]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7d8590] font-semibold">
                Language Distribution
              </span>
              <span className="text-xs text-[#7d8590] font-mono">
                {stats.reposCount} Repositories Analyzed
              </span>
            </div>

            {/* Segmented bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#161b22] border border-[#30363d]/60 gap-0.5 p-0.5">
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
                <div key={lang.name} className="flex items-center gap-1.5 text-xs text-[#e6edf3]">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-[#7d8590] font-mono text-[11px]">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="gh-stat-card bg-[#0d1117] rounded-2xl border border-[#30363d] p-6 text-center shadow-lg shadow-black/20">
            <p className="text-3xl font-black text-[#39d353] mb-1">
              {stats.reposCount}
              <span className="text-xl">+</span>
            </p>
            <p className="text-[#7d8590] text-sm font-mono">Public Repositories</p>
          </div>
          <div className="gh-stat-card bg-[#0d1117] rounded-2xl border border-[#30363d] p-6 text-center shadow-lg shadow-black/20">
            <p className="text-3xl font-black text-[#39d353] mb-1">
              {(stats.contributionsCount || 1080).toLocaleString()}
              <span className="text-xl">+</span>
            </p>
            <p className="text-[#7d8590] text-sm font-mono">Contributions in Last Year</p>
          </div>
          <div className="gh-stat-card bg-[#0d1117] rounded-2xl border border-[#30363d] p-6 text-center shadow-lg shadow-black/20">
            <p className="text-3xl font-black text-[#39d353] mb-1">
              {stats.starsCount}
              <span className="text-xl">+</span>
            </p>
            <p className="text-[#7d8590] text-sm font-mono">Stars & Interactions</p>
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
                className="block bg-[#0d1117] rounded-2xl border border-[#30363d] p-6 hover:border-[#39d35380] hover:shadow-xl hover:shadow-[#39d35315] transition-all group h-full cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GithubIcon size={15} className="text-[#7d8590]" />
                    <span className="font-semibold text-[#e6edf3] text-sm group-hover:text-white transition-colors">
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
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] text-[#7d8590] hover:text-[#e6edf3] transition-all cursor-pointer"
                    >
                      {copiedRepo === repo.name ? (
                        <>
                          <Check size={11} className="text-[#39d353]" />
                          <span className="text-[#39d353] font-semibold">Copied!</span>
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
                      className="text-[#7d8590] group-hover:text-white transition-colors"
                    />
                  </div>
                </div>

                <p className="text-[#7d8590] text-xs leading-relaxed mb-4">{repo.description}</p>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-[#7d8590]">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: repo.color || langColors[repo.language] || "#888" }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#7d8590]">
                    <Star size={11} /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#7d8590]">
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
