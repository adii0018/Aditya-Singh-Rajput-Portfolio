"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { scrollToTarget } from "@/lib/motion";
import { Menu, X, FileDown } from "lucide-react";

// Mapping of all page sections to their corresponding visible navbar item
const SECTION_TO_NAV_MAP: Record<string, string> = {
  home: "home",
  "beyond-the-code": "about",
  about: "about",
  skills: "skills",
  features: "skills",
  projects: "projects",
  experience: "experience",
  github: "experience",
  contact: "contact",
};

// Evaluated bottom-up for natural scroll flow
const TRACKED_SECTIONS = [
  "contact",
  "experience",
  "github",
  "projects",
  "features",
  "skills",
  "about",
  "beyond-the-code",
  "home",
];

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef("home");
  const scrolledRef = useRef(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    let frame = 0;
    const sections = TRACKED_SECTIONS.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });

    const applyActiveSection = (id: string) => {
      const nextSection = SECTION_TO_NAV_MAP[id] || id;
      if (activeSectionRef.current === nextSection) return;
      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);
    };

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const nextScrolled = scrollY > 20;
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (scrollY < 120) {
        applyActiveSection("home");
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        applyActiveSection("contact");
        return;
      }

      for (const { id, element } of sections) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
          applyActiveSection(id);
          return;
        }
      }

      applyActiveSection("home");
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const mappedId = SECTION_TO_NAV_MAP[id] || id;
    activeSectionRef.current = mappedId;
    setActiveSection(mappedId);

    scrollToTarget(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-[#ebeff5]/80 backdrop-blur-xl border border-[#24242215] shadow-lg shadow-[#24242208]"
              : "bg-transparent"
          }`}
          style={{ padding: scrolled ? "12px 24px" : "0 24px" }}
        >
          {/* Brand Logo */}
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-all shrink-0">
              {/* Default Floating Eye on Transparent BG with Rotating Center Ball */}
              <svg viewBox="0 0 32 32" className="w-8 h-8 transition-all duration-300 group-hover:opacity-0 absolute inset-0 drop-shadow-[0_1px_4px_rgba(0,174,187,0.3)]">
                <defs>
                  <radialGradient id="navEyeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00AEBB" />
                    <stop offset="70%" stopColor="#00838D" />
                    <stop offset="100%" stopColor="#031211" />
                  </radialGradient>
                  <clipPath id="navEyeClip">
                    <path d="M 2 16 Q 16 6 30 16 Q 16 26 2 16 Z" />
                  </clipPath>
                </defs>
                <path d="M 2 16 Q 16 6 30 16 Q 16 26 2 16 Z" fill="#031211" stroke="#00AEBB" strokeWidth="1.6" />
                <g clipPath="url(#navEyeClip)">
                  <rect x="0" y="0" width="32" height="32" fill="#E8E4D3" />
                  {/* Rotating Center Ball (Iris + Aperture Rays + Pupil) */}
                  <g>
                    <circle cx="16" cy="16" r="9" fill="url(#navEyeGrad)" />
                    {/* Sunburst Rays for visible spin */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <line
                        key={deg}
                        x1={16 + Math.cos((deg * Math.PI) / 180) * 4.2}
                        y1={16 + Math.sin((deg * Math.PI) / 180) * 4.2}
                        x2={16 + Math.cos((deg * Math.PI) / 180) * 8.2}
                        y2={16 + Math.sin((deg * Math.PI) / 180) * 8.2}
                        stroke="#E8E4D3"
                        strokeWidth="0.8"
                        strokeOpacity="0.7"
                      />
                    ))}
                    <circle cx="16" cy="16" r="5.8" fill="none" stroke="#D9FF5C" strokeWidth="0.6" strokeOpacity="0.65" />
                    <circle cx="16" cy="16" r="4.0" fill="#031211" />
                    <circle cx="14" cy="14" r="1.4" fill="#FFFFFF" />
                    <circle cx="18" cy="18" r="0.7" fill="#D9FF5C" />
                  </g>
                </g>
              </svg>

              {/* Hover Morphed Chevron Glyph "Λ" (no crossbar) */}
              <svg viewBox="0 0 32 32" className="w-8 h-8 transition-all duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 drop-shadow-[0_0_10px_rgba(0,174,187,0.8)]">
                <path d="M 8.5 26 L 16 5.5 L 23.5 26" fill="none" stroke="#00AEBB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="5.5" r="1.3" fill="#D9FF5C" />
                <circle cx="16" cy="5.5" r="0.7" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-[#242426] leading-none group-hover:text-black transition-colors">
                Aditya Singh Rajput
              </span>
              <span className="font-mono text-[10px] text-[#4d4f57] leading-none mt-1">
                AI/ML Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 select-none ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#242426]"
                    : "text-[#4d4f57] hover:text-[#242426]"
                }`}
              >
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#d9ff5c] rounded-full -z-0"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* CTA & Resume */}
          <div className="hidden md:flex items-center gap-2.5">
            <motion.a
              href="/Aditya_Singh_Rajput_Resume.pdf"
              download="Aditya_Singh_Rajput_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#242426] rounded-full border border-[#24242220] hover:border-[#242426] bg-white transition-all cursor-pointer shadow-2xs"
              title="Download Resume / CV"
            >
              <FileDown size={13} className="text-[#2da44e]" />
              <span>Resume</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => handleNavClick("#contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-4 py-2 bg-[#242426] text-white text-xs font-semibold rounded-full hover:bg-[#3a3a3c] transition-colors cursor-pointer border-0"
            >
              Get in touch →
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-[#242426] border-0 bg-transparent cursor-pointer hover:bg-[#24242210] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-[100] bg-[#ebeff5]/95 backdrop-blur-xl border border-[#24242215] rounded-2xl shadow-xl p-6"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-[#d9ff5c] text-[#242426]"
                      : "bg-transparent text-[#4d4f57] hover:bg-[#24242210]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-[#24242210]">
                <a
                  href="/Aditya_Singh_Rajput_Resume.pdf"
                  download="Aditya_Singh_Rajput_Resume.pdf"
                  className="flex-1 py-3 text-center bg-white border border-[#24242220] text-[#242426] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileDown size={14} className="text-[#2da44e]" />
                  <span>Resume</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleNavClick("#contact")}
                  className="flex-[2] py-3 bg-[#242426] text-white text-xs font-semibold rounded-xl text-center border-0 cursor-pointer"
                >
                  Get in touch →
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
