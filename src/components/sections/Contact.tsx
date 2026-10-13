"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { personal } from "@/lib/data";
import { Mail, Send, ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-5 py-3 bg-[#ffffff15] hover:bg-[#ffffff20] rounded-xl border border-[#ffffff20] text-white text-sm transition-all group cursor-pointer w-full"
    >
      <Mail size={15} className="text-[#ffffff80]" />
      <span className="font-mono text-[#ffffff90] text-xs sm:text-sm">{email}</span>
      <span className="ml-auto text-[#ffffff50] group-hover:text-white transition-colors">
        {copied ? <Check size={14} className="text-[#d9ff5c]" /> : <Copy size={14} />}
      </span>
    </motion.button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".contact-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".contact-title", {
        y: 40,
        opacity: 0,
        duration: 0.85,
      }, "-=0.35")
      .from(".contact-sub", {
        y: 20,
        opacity: 0,
        duration: 0.75,
      }, "-=0.55")
      .from(".contact-cta-btn", {
        y: 20,
        scale: 0.96,
        opacity: 0,
        duration: 0.7,
      }, "-=0.45")
      .from(".contact-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      }, "-=0.3")
      .from(".contact-status-pill", {
        y: 15,
        opacity: 0,
        duration: 0.6,
      }, "-=0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-[#242426] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d9ff5c] opacity-[0.04] blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="contact-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff60] text-xs font-mono tracking-wider uppercase mb-6">
            ✦ Get In Touch
          </div>

          <h2
            className="contact-title font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
          >
            Ready to build
            <br />
            <span className="text-[#d9ff5c]">something great?</span>
          </h2>

          <p className="contact-sub text-[#ffffff60] text-lg leading-relaxed max-w-lg mx-auto mb-10">
            Whether you have a project in mind, a job opportunity, or just want to talk AI —
            I&apos;m always open to a conversation.
          </p>

          <div className="contact-cta-btn inline-block">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#d9ff5c] text-[#242426] font-bold text-base rounded-full hover:shadow-xl hover:shadow-[#d9ff5c30] transition-all cursor-pointer"
            >
              <Send size={16} />
              Send me an email
              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Email */}
          <div className="contact-card p-6 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d9ff5c20] flex items-center justify-center">
              <Mail size={16} className="text-[#d9ff5c]" />
            </div>
            <div>
              <p className="text-[#ffffff60] text-xs font-mono mb-1">EMAIL</p>
              <p className="text-white text-xs font-medium break-all">{personal.email}</p>
            </div>
            <CopyEmail email={personal.email} />
          </div>

          {/* LinkedIn */}
          <div className="contact-card">
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="block p-6 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] hover:border-[#c0adff60] hover:bg-[#c0adff08] transition-all group h-full cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c0adff20] flex items-center justify-center mb-3">
                <LinkedinIcon size={16} className="text-[#c0adff]" />
              </div>
              <p className="text-[#ffffff60] text-xs font-mono mb-1">LINKEDIN</p>
              <p className="text-white text-xs font-medium mb-3">in/adii001n</p>
              <div className="flex items-center gap-1 text-[#c0adff] text-xs font-medium">
                Connect <ArrowUpRight size={12} />
              </div>
            </motion.a>
          </div>

          {/* GitHub */}
          <div className="contact-card">
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="block p-6 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] hover:border-[#b8deff60] hover:bg-[#b8deff08] transition-all group h-full cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#b8deff20] flex items-center justify-center mb-3">
                <GithubIcon size={16} className="text-[#b8deff]" />
              </div>
              <p className="text-[#ffffff60] text-xs font-mono mb-1">GITHUB</p>
              <p className="text-white text-xs font-medium mb-3">@adii0018</p>
              <div className="flex items-center gap-1 text-[#b8deff] text-xs font-medium">
                View code <ArrowUpRight size={12} />
              </div>
            </motion.a>
          </div>
        </div>

        {/* Availability badge */}
        <div className="contact-status-pill flex justify-center">
          <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-[#ffffff15] bg-[#ffffff08]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d9ff5c] animate-pulse" />
            <span className="text-white text-sm font-medium">
              Currently available for full-time roles & freelance projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
