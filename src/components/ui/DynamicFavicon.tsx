"use client";

import { useEffect, useRef } from "react";

interface SectionMeta {
  icon: string;
  title: string;
}

// Generate crisp, themed SVG favicons on the fly as Data URIs
const createSvgFavicon = (borderColor: string, text: string, isEmoji = false): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="9" fill="#0d1117"/>
  <rect x="2" y="2" width="28" height="28" rx="8" fill="none" stroke="${borderColor}" stroke-width="2.5"/>
  <text x="16" y="${isEmoji ? "22" : "21"}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${isEmoji ? "16" : "15"}" font-weight="900" fill="${borderColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const FAVICONS = {
  home: "/favicon.svg",
  about: createSvgFavicon("#14b8a6", "ℹ"),
  skills: createSvgFavicon("#c0adff", "⚡", true),
  features: createSvgFavicon("#d9ff5c", "✦"),
  projects: createSvgFavicon("#a855f7", "◈"),
  experience: createSvgFavicon("#38bdf8", "💼", true),
  certifications: createSvgFavicon("#f59e0b", "★"),
  github: createSvgFavicon("#10b981", "🐙", true),
  contact: createSvgFavicon("#ec4899", "✉"),
  away: createSvgFavicon("#f43f5e", "👋", true),
  welcome: createSvgFavicon("#c0adff", "🤍", true),
};

const SECTION_METAS: Record<string, SectionMeta> = {
  home: {
    icon: FAVICONS.home,
    title: "Aditya Singh Rajput | AI/ML Engineer and Full-Stack Developer",
  },
  about: {
    icon: FAVICONS.about,
    title: "About Me | Aditya Singh Rajput",
  },
  skills: {
    icon: FAVICONS.skills,
    title: "Skills & Tech Stack | Aditya Singh Rajput",
  },
  features: {
    icon: FAVICONS.features,
    title: "AI Dev Lab & Features | Aditya Singh Rajput",
  },
  projects: {
    icon: FAVICONS.projects,
    title: "Featured Projects | Aditya Singh Rajput",
  },
  experience: {
    icon: FAVICONS.experience,
    title: "Experience & Journey | Aditya Singh Rajput",
  },
  certifications: {
    icon: FAVICONS.certifications,
    title: "Certifications | Aditya Singh Rajput",
  },
  github: {
    icon: FAVICONS.github,
    title: "GitHub Activity | Aditya Singh Rajput",
  },
  contact: {
    icon: FAVICONS.contact,
    title: "Get in Touch | Aditya Singh Rajput",
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

// Helper to update both existing links and dynamically inject if missing
function setDocumentFavicon(iconUrl: string) {
  if (typeof document === "undefined") return;

  const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
  if (existingLinks.length > 0) {
    existingLinks.forEach((link) => {
      if (iconUrl.endsWith(".svg") || iconUrl.startsWith("data:image/svg+xml")) {
        link.type = "image/svg+xml";
      }
      link.href = iconUrl;
    });
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.type = iconUrl.endsWith(".svg") ? "image/svg+xml" : "image/png";
    newLink.href = iconUrl;
    document.head.appendChild(newLink);
  }
}

export default function DynamicFavicon() {
  const currentSectionRef = useRef<string>("home");
  const isWelcomingRef = useRef<boolean>(false);

  useEffect(() => {
    let welcomeTimeout: ReturnType<typeof setTimeout> | null = null;

    const applySectionMeta = (sectionId: string) => {
      const meta = SECTION_METAS[sectionId] || SECTION_METAS.home;
      document.title = meta.title;
      setDocumentFavicon(meta.icon);
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
        if (welcomeTimeout) clearTimeout(welcomeTimeout);
        isWelcomingRef.current = false;
        const awayTitle = "👋 Hey, come back! | Adii";
        document.title = awayTitle;
        setDocumentFavicon(FAVICONS.away);
      } else {
        isWelcomingRef.current = true;
        const welcomeTitle = "Welcome back 🤍";
        document.title = welcomeTitle;
        setDocumentFavicon(FAVICONS.welcome);

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
