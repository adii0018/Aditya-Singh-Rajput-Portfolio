"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import { personal } from "@/lib/data";
import RevealWords from "@/components/ui/RevealWords";
import { validateContactForm, sanitizeInput } from "@/lib/validation";
import { Mail, Send, ArrowUpRight, Copy, Check, User, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/GithubIcon";
import { Badge } from "@/components/ui/Badge";

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

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", hp: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot bot protection: if hidden field is filled, silently discard
    if (formData.hp) { setStatus("success"); return; }

    const validation = validateContactForm(formData);
    if (!validation.valid) {
      const firstError = Object.values(validation.errors)[0] || "Please check your inputs.";
      setErrorMessage(firstError);
      return;
    }
    setErrorMessage("");
    setStatus("submitting");

    try {
      // Direct Formspree / mail fallback
      const response = await fetch("https://formspree.io/f/mqaebrvl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email),
          message: sanitizeInput(formData.message),
          _subject: `New Portfolio Inquiry from ${sanitizeInput(formData.name)}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Your message could not be sent. Please try again or email me directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection failed, so your message was not sent. Please try again or email me directly.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-[#ffffff08] border border-[#ffffff15] backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d9ff5c] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-white/80 font-bold">
            Direct Dispatch Console
          </span>
        </div>
        <span className="text-[11px] font-mono text-white/50">Response time ~ 2-4 hrs</span>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-8 text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#d9ff5c]/20 border border-[#d9ff5c]/40 flex items-center justify-center mx-auto text-[#d9ff5c]">
              <Sparkles size={28} />
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              Message Transmitted! 🚀
            </h4>
            <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
              Thanks <span className="text-[#d9ff5c] font-semibold">{formData.name}</span>, your
              message has been recorded. Aditya will reply to{" "}
              <span className="text-white font-mono">{formData.email}</span> shortly.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: "", email: "", message: "", hp: "" });
                  setStatus("idle");
                }}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all cursor-pointer"
              >
                ← Send Another Message
              </button>
            </div>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field hidden from users for bot protection [S02] */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={formData.hp}
              onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
              className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
                <User size={12} className="text-[#d9ff5c]" /> YOUR NAME
              </label>
              <input
                id="contact-name" maxLength={100}
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (status === "error") setStatus("idle");
                  setErrorMessage("");
                }}
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#d9ff5c] focus:ring-1 focus:ring-[#d9ff5c] transition-all font-sans"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
                <Mail size={12} className="text-[#b8deff]" /> EMAIL ADDRESS
              </label>
              <input
                id="contact-email" maxLength={120}
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (status === "error") setStatus("idle");
                  setErrorMessage("");
                }}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#b8deff] focus:ring-1 focus:ring-[#b8deff] transition-all font-sans"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1.5">
                <MessageSquare size={12} className="text-[#c0adff]" /> MESSAGE / PROJECT DETAILS
              </label>
              <textarea
                id="contact-message" maxLength={2000}
                required
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (status === "error") setStatus("idle");
                  setErrorMessage("");
                }}
                placeholder="Hi Aditya, we are building an AI project and would love to collaborate..."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c0adff] focus:ring-1 focus:ring-[#c0adff] transition-all font-sans resize-none"
              />
            </div>

            {errorMessage && (
              <p role="alert" className="text-rose-400 text-xs font-mono">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 px-6 rounded-xl bg-[#d9ff5c] hover:bg-[#cbf544] text-[#242426] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#d9ff5c]/20 hover:shadow-xl hover:shadow-[#d9ff5c]/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Dispatch Message</span>
                  <ArrowUpRight size={15} />
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(sectionRef);

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
      .from(".gsap-word-reveal", {
        yPercent: 110,
        autoAlpha: 0,
        stagger: 0.055,
        duration: 0.62,
        ease: "power4.out",
      }, "-=0.35")
      .from(".contact-sub", {
        y: 20,
        opacity: 0,
        duration: 0.75,
      }, "-=0.55")
      .from(".contact-form-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.4")
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
        <div className="relative text-center mb-10">
          {/* Badge at the very top above Ready to build */}
          <div className="w-full flex justify-center mb-6">
            <div className="contact-badge">
              <Badge variant="outline" className="border-white/20 bg-white/5 text-white/90">
                / contact // direct line
              </Badge>
            </div>
          </div>

          <div className="relative inline-block">
            {/* Anchor marker for baby astronaut: parallel to 'Ready to build' on left, completely clear of 'Get In Touch' */}
            <div
              id="contact-astronaut-anchor"
              className="absolute -left-28 sm:-left-36 md:-left-44 lg:-left-52 top-1/2 -translate-y-1/2 w-[140px] sm:w-[150px] h-[150px] sm:h-[170px] pointer-events-none opacity-0"
            />

            <h2
              aria-label="Ready to build something great?"
              className="contact-title font-black text-white leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
            >
              <RevealWords text="Ready to build" />
              <br />
              <RevealWords text="something great?" className="text-[#d9ff5c]" />
            </h2>
          </div>

          <p className="contact-sub text-[#ffffff60] text-lg leading-relaxed max-w-lg mx-auto mb-6">
            Whether you have a project in mind, a job opportunity, or just want to talk AI —
            I&apos;m always open to a conversation.
          </p>
        </div>

        {/* Dedicated Direct Message Form */}
        <div className="contact-form-container">
          <ContactForm />
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Email */}
          <div className="contact-card p-6 rounded-2xl border border-[#ffffff15] bg-[#ffffff08] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d9ff5c20] flex items-center justify-center">
              <Mail size={16} className="text-[#d9ff5c]" />
            </div>
            <div>
              <p className="text-[#ffffff60] text-xs font-mono mb-1">DIRECT EMAIL</p>
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
          <Badge variant="lime" className="px-5 py-3 rounded-full flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#242426] animate-pulse" />
            <span>Currently available for full-time roles & freelance projects</span>
          </Badge>
        </div>
      </div>
    </section>
  );
}
