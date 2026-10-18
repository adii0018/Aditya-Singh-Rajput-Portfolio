"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { certifications } from "@/lib/data";
import { Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

function CertIcon({ icon }: { icon: string }) {
  if (icon === "stanford") {
    return (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 18h6v4h4v-4h6L12 2z" fill="#d9ff5c" opacity="0.9" />
        <path d="M12 6l-3.5 9h7L12 6z" fill="#0d1117" />
      </svg>
    );
  }
  if (icon === "deeplearning") {
    return (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#c0adff" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="4" fill="#c0adff" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#c0adff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "aws") {
    return (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M4 15c0 2.5 3 4.5 8 4.5s8-2 8-4.5" stroke="#b8deff" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 13.5l2 1.5-2 1.5" stroke="#b8deff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12c-.5-1-1.5-1.5-2.5-1.5A3.5 3.5 0 0 0 0 14c0 2.5 2 3.5 4 3.5h14a3.5 3.5 0 0 0 0-7c-.5 0-1 0-1.5.3A4.5 4.5 0 0 0 6 12z" fill="#b8deff" opacity="0.35" />
      </svg>
    );
  }
  if (icon === "ibm") {
    return (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="#d9ff5c">
        <rect x="3" y="4" width="18" height="1.8" rx="0.5" />
        <rect x="3" y="7" width="18" height="1.8" rx="0.5" />
        <rect x="3" y="10" width="18" height="1.8" rx="0.5" />
        <rect x="3" y="13" width="18" height="1.8" rx="0.5" />
        <rect x="3" y="16" width="18" height="1.8" rx="0.5" />
        <rect x="3" y="19" width="18" height="1.8" rx="0.5" />
      </svg>
    );
  }
  return <Award size={22} className="text-[#d9ff5c]" />;
}

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

      tl.from(".cert-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".cert-heading", {
        y: 30,
        opacity: 0,
        duration: 0.75,
      }, "-=0.35")
      .from(".cert-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section id="certifications" ref={sectionRef} className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#0d1117] overflow-hidden">
      {/* Background Video - 100% Crystal Clear & Sharp */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        >
          <source src="/cash.mp4" type="video/mp4" />
        </video>
        {/* Minimal subtle vignette gradient for smooth text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="cert-badge mb-4">
              <Badge variant="outline" className="border-white/25 bg-black/60 backdrop-blur-md text-white shadow-lg">
                ✦ Verified Credentials
              </Badge>
            </div>
            <h2
              className="cert-heading font-black text-white leading-tight tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
              style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
            >
              What I&apos;ve
              <br />
              <span className="text-[#d9ff5c] drop-shadow-[0_2px_12px_rgba(217,255,92,0.4)]">earned & mastered</span>
            </h2>
          </div>
        </div>

        {/* Certs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="cert-card">
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative p-6 rounded-2xl border border-white/20 bg-[#0d1117]/85 backdrop-blur-md group overflow-hidden h-full flex flex-col justify-between hover:border-[#d9ff5c]/60 transition-all shadow-2xl shadow-black/40"
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none"
                  style={{ background: cert.color }}
                />

                <div>
                  {/* Icon & Year Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 drop-shadow-sm"
                      style={{ background: cert.color + "20" }}
                    >
                      <CertIcon icon={cert.icon} />
                    </div>
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: cert.color + "25", color: cert.color }}
                    >
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm leading-snug mb-1">{cert.name}</h3>
                  <p className="text-[#ffffff60] text-xs mb-4">{cert.issuer}</p>
                </div>

                {/* Clickable Verification Link */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                  <a
                    href={(cert as { credentialUrl?: string }).credentialUrl || "https://coursera.org"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-[#d9ff5c] transition-colors cursor-pointer group/link"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                  <Award
                    size={14}
                    className="text-[#ffffff30] group-hover:text-[#d9ff5c] transition-colors"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
