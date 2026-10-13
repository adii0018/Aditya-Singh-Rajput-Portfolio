"use client";

import { useEffect, useRef } from "react";

interface SectionMeta {
  emoji: string;
  title: string;
}

const SECTION_METAS: Record<string, SectionMeta> = {
  home: {
    emoji: "🚀",
    title: "Adii — AI/ML Engineer & Full-Stack Developer",
  },
  about: {
    emoji: "👨‍💻",
    title: "About Me | Aditya Singh Rajput",
  },
  skills: {
    emoji: "⚡",
    title: "Skills & Tech Stack | Adii",
  },
  features: {
    emoji: "✨",
    title: "Smart Engine & Highlights | Adii",
  },
  projects: {
    emoji: "💻",
    title: "Featured Projects | Adii",
  },
  experience: {
    emoji: "💼",
    title: "Experience & Journey | Adii",
  },
  certifications: {
    emoji: "📜",
    title: "Certifications | Adii",
  },
  github: {
    emoji: "🐙",
    title: "GitHub Activity | Adii",
  },
  contact: {
    emoji: "📬",
    title: "Get in Touch | Adii",
  },
};

// Check in reverse scroll order (bottom-up priority)
const SECTION_IDS = [
  "contact",
  "github",
  "certifications",
  "experience",
  "projects",
  "features",
  "skills",
  "about",
  "home",
];

function updateFavicon(emoji: string) {
  try {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
    const faviconUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    // Remove old favicon links so browser immediately re-renders
    const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
    existingLinks.forEach((el) => el.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = faviconUrl;
    document.head.appendChild(link);
  } catch {
    // Fail silently in environments where document head is not writable
  }
}

export default function DynamicFavicon() {
  const currentSectionRef = useRef<string>("home");
  const isWelcomingRef = useRef<boolean>(false);

  useEffect(() => {
    let welcomeTimeout: ReturnType<typeof setTimeout> | null = null;

    const applySectionMeta = (sectionId: string) => {
      const meta = SECTION_METAS[sectionId] || SECTION_METAS.home;
      updateFavicon(meta.emoji);
      document.title = meta.title;
    };

    const detectActiveSection = (): string => {
      if (window.scrollY < 120) return "home";

      // Check bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        return "contact";
      }

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if top is in upper-mid viewport and bottom has not left
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 120) {
            return id;
          }
        }
      }

      return "home";
    };

    const handleScroll = () => {
      if (document.hidden || isWelcomingRef.current) return;

      const activeId = detectActiveSection();
      if (activeId !== currentSectionRef.current) {
        currentSectionRef.current = activeId;
        applySectionMeta(activeId);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs (Option 1: Come back!)
        if (welcomeTimeout) clearTimeout(welcomeTimeout);
        isWelcomingRef.current = false;
        updateFavicon("👋");
        document.title = "👋 Hey, come back! | Adii";
      } else {
        // User returned to tab
        isWelcomingRef.current = true;
        updateFavicon("🎉");
        document.title = "🎉 Welcome back!";

        welcomeTimeout = setTimeout(() => {
          isWelcomingRef.current = false;
          const activeId = detectActiveSection();
          currentSectionRef.current = activeId;
          applySectionMeta(activeId);
        }, 1800);
      }
    };

    // Initial setup
    const initialSection = detectActiveSection();
    currentSectionRef.current = initialSection;
    applySectionMeta(initialSection);

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (welcomeTimeout) clearTimeout(welcomeTimeout);
    };
  }, []);

  return null;
}
