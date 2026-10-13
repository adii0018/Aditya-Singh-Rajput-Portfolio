"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { Menu, X, FileDown } from "lucide-react";

// Mapping of all page sections to their corresponding visible navbar item
const SECTION_TO_NAV_MAP: Record<string, string> = {
  home: "home",
  about: "about",
  skills: "skills",
  features: "skills",
  projects: "projects",
  experience: "experience",
  certifications: "experience",
  github: "experience",
  contact: "contact",
};

// Evaluated bottom-up for natural scroll flow
const TRACKED_SECTIONS = [
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isClickingRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const detectActiveSection = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // If user recently clicked a nav item, hold active highlight during smooth scroll
      if (isClickingRef.current) return;

      // 1. Top of page: always home
      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // 2. Bottom of page: always contact
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("contact");
        return;
      }

      // 3. Viewport-based intersection check (immune to offsetParent or nested wrappers)
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // Active when section top enters upper 45% of viewport and bottom is still visible
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
          const targetNav = SECTION_TO_NAV_MAP[id] || id;
          setActiveSection(targetNav);
          return;
        }
      }

      setActiveSection("home");
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    detectActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const mappedId = SECTION_TO_NAV_MAP[id] || id;
    setActiveSection(mappedId);

    isClickingRef.current = true;
    setTimeout(() => {
      isClickingRef.current = false;
    }, 850);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
          {/* Logo */}
          <Link
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="font-black text-xl tracking-tight text-[#242426] hover:text-[#242426] transition-colors"
          >
            <span className="font-mono text-[#242426]">ꫝ 𝚂 𐍂</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-0 bg-transparent cursor-pointer select-none ${
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
              </button>
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
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border-0 cursor-pointer ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-[#d9ff5c] text-[#242426]"
                      : "bg-transparent text-[#4d4f57] hover:bg-[#24242210]"
                  }`}
                >
                  {link.label}
                </button>
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
