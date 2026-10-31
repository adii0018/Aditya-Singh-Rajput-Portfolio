"use client";

import { useEffect, useRef } from "react";

const SECTION_TITLES: Record<string, string> = {
  home: "Aditya Singh Rajput | AI/ML Engineer and Full-Stack Developer",
  "beyond-the-code": "Beyond the Code | Aditya Singh Rajput",
  about: "About Me | Aditya Singh Rajput",
  skills: "Skills & Tech Stack | Aditya Singh Rajput",
  features: "AI Dev Lab & Features | Aditya Singh Rajput",
  projects: "Featured Projects | Aditya Singh Rajput",
  experience: "Experience & Journey | Aditya Singh Rajput",
  certifications: "Certifications | Aditya Singh Rajput",
  github: "GitHub Activity | Aditya Singh Rajput",
  contact: "Get in Touch | Aditya Singh Rajput",
};

// Check in reverse scroll order (bottom-up priority)
const SECTION_IDS = [
  "contact",
  "github",
  "experience",
  "projects",
  "features",
  "skills",
  "about",
  "beyond-the-code",
  "home",
];

export default function DynamicFavicon() {
  const currentSectionRef = useRef<string>("home");
  const isWelcomingRef = useRef<boolean>(false);

  useEffect(() => {
    // Keep eye favicon permanently locked to /favicon.svg?v=8
    const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
    existingLinks.forEach((link) => {
      link.type = "image/svg+xml";
      link.href = "/favicon.svg?v=8";
    });

    let welcomeTimeout: ReturnType<typeof setTimeout> | null = null;
    let scrollFrame: number | null = null;

    const applySectionTitle = (sectionId: string) => {
      const title = SECTION_TITLES[sectionId] || SECTION_TITLES.home;
      document.title = title;
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
      if (document.hidden || isWelcomingRef.current || scrollFrame !== null) return;

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = null;
        if (document.hidden || isWelcomingRef.current) return;

        const activeId = detectActiveSection();
        if (activeId !== currentSectionRef.current) {
          currentSectionRef.current = activeId;
          applySectionTitle(activeId);
        }
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (welcomeTimeout) clearTimeout(welcomeTimeout);
        isWelcomingRef.current = false;
        document.title = "👋 Hey, come back! | Adii";
      } else {
        isWelcomingRef.current = true;
        document.title = "Welcome back 🤍";

        welcomeTimeout = setTimeout(() => {
          isWelcomingRef.current = false;
          const activeId = detectActiveSection();
          currentSectionRef.current = activeId;
          applySectionTitle(activeId);
        }, 1800);
      }
    };

    // Initial setup
    const initialSection = detectActiveSection();
    currentSectionRef.current = initialSection;
    applySectionTitle(initialSection);

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      if (welcomeTimeout) clearTimeout(welcomeTimeout);
    };
  }, []);

  return null;
}
