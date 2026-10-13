"use client";

import { useEffect, useState, useRef } from "react";

interface SectionMeta {
  icon: string;
  title: string;
}

const FAVICONS = {
  minimal: "/favicons/a-minimal.png", // Sleek modern black ribbon 'A'
  teal: "/favicons/a-teal.png",       // Cyan/teal bold modern 'A'
  pink: "/favicons/a-pink.png",       // Vibrant coral/pink pop sticker 'A'
  nature: "/favicons/a-nature.png",   // Dark plant vine & ladybug 'A'
  cute: "/favicons/a-cute.png",       // Friendly cute smiling 'A'
};

const SECTION_METAS: Record<string, SectionMeta> = {
  home: {
    icon: FAVICONS.minimal,
    title: "Adii — AI/ML Engineer & Full-Stack Developer",
  },
  about: {
    icon: FAVICONS.teal,
    title: "About Me | Aditya Singh Rajput",
  },
  skills: {
    icon: FAVICONS.pink,
    title: "Skills & Tech Stack | Adii",
  },
  features: {
    icon: FAVICONS.nature,
    title: "Smart Engine & Highlights | Adii",
  },
  projects: {
    icon: FAVICONS.pink,
    title: "Featured Projects | Adii",
  },
  experience: {
    icon: FAVICONS.teal,
    title: "Experience & Journey | Adii",
  },
  certifications: {
    icon: FAVICONS.minimal,
    title: "Certifications | Adii",
  },
  github: {
    icon: FAVICONS.nature,
    title: "GitHub Activity | Adii",
  },
  contact: {
    icon: FAVICONS.cute,
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

export default function DynamicFavicon() {
  const [currentIcon, setCurrentIcon] = useState<string>(FAVICONS.minimal);
  const [currentTitle, setCurrentTitle] = useState<string>(
    SECTION_METAS.home.title
  );

  const currentSectionRef = useRef<string>("home");
  const isWelcomingRef = useRef<boolean>(false);

  useEffect(() => {
    // Preload all 5 favicon images for instant tab switching
    Object.values(FAVICONS).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let welcomeTimeout: ReturnType<typeof setTimeout> | null = null;

    const applySectionMeta = (sectionId: string) => {
      const meta = SECTION_METAS[sectionId] || SECTION_METAS.home;
      setCurrentIcon(meta.icon);
      setCurrentTitle(meta.title);
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
        setCurrentIcon(FAVICONS.cute);
        const awayTitle = "👋 Hey, come back! | Adii";
        setCurrentTitle(awayTitle);
        document.title = awayTitle;
      } else {
        // User returned to tab
        isWelcomingRef.current = true;
        setCurrentIcon(FAVICONS.pink);
        const welcomeTitle = "🎉 Welcome back!";
        setCurrentTitle(welcomeTitle);
        document.title = welcomeTitle;

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

  return (
    <>
      <link rel="icon" href={currentIcon} type="image/png" />
      <link rel="shortcut icon" href={currentIcon} type="image/png" />
      <title>{currentTitle}</title>
    </>
  );
}
