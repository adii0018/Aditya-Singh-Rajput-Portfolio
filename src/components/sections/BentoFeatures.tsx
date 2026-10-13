"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP, gsap, isReducedMotion } from "@/lib/gsap";
import {
  ListFilter,
  RefreshCw,
  Sliders,
  Asterisk,
  Search,
  Shield,
  AlertCircle,
  Check,
  Target,
  DollarSign,
  Building,
  Sun,
  Cpu,
  Receipt,
  Coffee,
  Bell,
  Truck,
  TrendingUp,
  Sparkles,
  FolderTree,
  Music,
} from "lucide-react";
import FileTreeCard from "@/components/ui/FileTreeCard";
import SpotifyCard from "@/components/ui/SpotifyCard";

export default function BentoFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Card 3 toggle: 16 Actions Found <-> $1,240 Potential Savings (matches reference screenshots)
  const [insightMode, setInsightMode] = useState<"actions" | "savings">("actions");

  // Card 4 active bill carousel index
  const [billIndex, setBillIndex] = useState(1);
  const bills = [
    { name: "Cloud Server", amount: "$140", type: "Hosting", logo: "AWS" },
    { name: "Design Tool", amount: "$320", type: "Design Tool", logo: "FG" },
    { name: "AI Inference", amount: "$450", type: "LLM API", logo: "OAI" },
  ];

  // Card 6 anomaly resolved state
  const [anomalyResolved, setAnomalyResolved] = useState(false);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".bento-header-badge", { y: -15, opacity: 0, duration: 0.6 })
        .from(".bento-header-title", { y: 30, opacity: 0, duration: 0.75 }, "-=0.35")
        .from(".bento-header-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".bento-grid-card", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
        }, "-=0.3")
        .from(".bento-pill-drop", {
          y: -30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
        }, "-=0.4");
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "#242426" }}
    >
      {/* Background soft glow accents */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#58728d] opacity-[0.06] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d9ff5c] opacity-[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER matching Makro template architecture */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="bento-header-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff60] text-xs font-mono tracking-wider uppercase mb-6">
            ✦ Smart Engine
          </div>

          <h2
            className="bento-header-title font-black text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(34px, 5vw, 56px)" }}
          >
            Intelligent by design.
            <br />
            <span className="text-[#d9ff5c]">Built for precision.</span>
          </h2>

          <p className="bento-header-sub text-[#ffffff70] text-base leading-relaxed">
            AI automatically categorizes, tracks, forecasts, and highlights anomalies in real time.
          </p>
        </div>

        {/* 6-CARD BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* ======================================================== */}
          {/* CARD 1: NOW PLAYING / SPOTIFY WIDGET */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-[#f6f8fb]">
            {/* Top Info */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1db95418] border border-[#1db95430] text-[#1db954] text-[11px] font-semibold mb-3">
                <Music className="w-3.5 h-3.5" />
                Vibes & Audio
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-1">
                Currently Playing
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Click any track to switch songs and live equalizer
              </p>
            </div>

            {/* Spotify Widget */}
            <div className="w-full flex justify-center pb-1">
              <SpotifyCard />
            </div>
          </div>


          {/* ======================================================== */}
          {/* CARD 2: CODEBASE ARCHITECTURE (Interactive File Tree) */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-[#f6f8fb]">
            {/* Top Info */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2424260a] border border-[#24242615] text-[#242426] text-[11px] font-medium mb-3">
                <FolderTree className="w-3.5 h-3.5 opacity-70" />
                Architecture
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-1">
                Project Structure
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Click folders to expand and explore the codebase
              </p>
            </div>

            {/* Interactive File Tree */}
            <div className="w-full flex justify-center pb-1">
              <FileTreeCard />
            </div>
          </div>


          {/* ======================================================== */}
          {/* CARD 3: DAILY AI INSIGHTS (Arc Dial Gauge) */}
          {/* ======================================================== */}
          <div
            onClick={() => setInsightMode(insightMode === "actions" ? "savings" : "actions")}
            className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#4b6075] via-[#a2b5c7] to-[#f4f7fa] cursor-pointer group"
          >
            {/* Top Info */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff20] backdrop-blur-md border border-[#ffffff25] text-white text-[11px] font-medium mb-5">
                <Sliders className="w-3.5 h-3.5 opacity-80" />
                Control
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Daily AI Insights
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Get a brief AI summary of your top financial changes
              </p>
            </div>

            {/* Arc Gauge at Bottom */}
            <div className="relative w-full h-44 flex flex-col items-center justify-end pb-2">
              
              {/* Semi-circular dashed arc SVG */}
              <svg viewBox="0 0 240 120" className="w-full max-w-[240px] h-28 overflow-visible">
                <path
                  d="M 20 110 A 100 100 0 0 1 220 110"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  strokeOpacity="0.7"
                />
              </svg>

              {/* 5 Floating Bubble Icons along the Arc */}
              <div className="absolute inset-0 max-w-[240px] mx-auto pointer-events-none">
                {/* Node 1: Left */}
                <div className="absolute top-[88px] left-[6px] w-8 h-8 rounded-full bg-white shadow-md border border-white flex items-center justify-center text-[#242426]">
                  <Coffee className="w-4 h-4 text-[#8b7bf5]" />
                </div>
                {/* Node 2: Top-Left */}
                <div className="absolute top-[32px] left-[38px] w-8 h-8 rounded-full bg-white shadow-md border border-white flex items-center justify-center text-[#242426]">
                  <Bell className="w-4 h-4 text-[#4d96f7]" />
                </div>
                {/* Node 3: Top Center Peak */}
                <div className="absolute top-[2px] left-[104px] w-9 h-9 rounded-full bg-white shadow-lg border border-white flex items-center justify-center text-[#242426]">
                  <TrendingUp className="w-4.5 h-4.5 text-[#22863a]" />
                </div>
                {/* Node 4: Top-Right */}
                <div className="absolute top-[32px] right-[38px] w-8 h-8 rounded-full bg-white shadow-md border border-white flex items-center justify-center text-[#242426]">
                  <Truck className="w-4 h-4 text-[#f0a732]" />
                </div>
                {/* Node 5: Right */}
                <div className="absolute top-[88px] right-[6px] w-8 h-8 rounded-full bg-white shadow-md border border-white flex items-center justify-center text-[#242426]">
                  <Receipt className="w-4 h-4 text-[#ef476f]" />
                </div>
              </div>

              {/* Center Value */}
              <div className="relative z-10 text-center -mt-6">
                <AnimatePresence mode="wait">
                  {insightMode === "actions" ? (
                    <motion.div
                      key="actions"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <div className="text-3xl sm:text-4xl font-black text-[#242426] tracking-tight">
                        16
                      </div>
                      <div className="text-xs font-semibold text-[#24242680] uppercase tracking-wider">
                        Actions Found
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="savings"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <div className="text-3xl sm:text-4xl font-black text-[#242426] tracking-tight">
                        $1,240
                      </div>
                      <div className="text-xs font-semibold text-[#24242680] uppercase tracking-wider">
                        Potential Savings
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="text-[10px] text-[#24242650] mt-0.5 group-hover:text-[#242426]">
                  Click to switch view ⟳
                </div>
              </div>

            </div>
          </div>


          {/* ======================================================== */}
          {/* CARD 4: UPCOMING BILLS (Perspective Carousel) */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#55697d] to-[#eef2f7]">
            {/* Top Info */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff20] backdrop-blur-md border border-[#ffffff25] text-white text-[11px] font-medium mb-5">
                <Asterisk className="w-3.5 h-3.5 opacity-80" />
                Plan
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Upcoming Bills
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Identified from recurring tools
              </p>
            </div>

            {/* Carousel in perspective */}
            <div className="relative h-44 flex items-center justify-center overflow-visible">
              {/* Left peeking card */}
              <div
                onClick={() => setBillIndex((billIndex + 2) % 3)}
                className="absolute left-0 w-28 h-28 bg-white/60 rounded-2xl border border-white shadow-md -translate-x-6 scale-80 opacity-50 cursor-pointer transition-transform hover:scale-85 flex flex-col items-center justify-center p-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#24242610] mb-2" />
                <div className="h-3 w-12 bg-[#24242620] rounded" />
              </div>

              {/* Center In-Focus Card */}
              <motion.div
                key={billIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ y: -4 }}
                className="relative z-10 bg-white rounded-2xl p-5 shadow-2xl border-2 border-white/90 text-center flex flex-col items-center justify-center w-48 cursor-pointer"
                onClick={() => setBillIndex((billIndex + 1) % 3)}
              >
                <div className="w-10 h-10 rounded-xl bg-[#ecf1f7] text-[#242426] flex items-center justify-center font-black text-xs tracking-wider mb-2 border border-[#24242610]">
                  {bills[billIndex].logo}
                </div>
                <div className="text-xl font-black text-[#242426]">
                  {bills[billIndex].amount}
                </div>
                <div className="text-[11px] font-medium text-[#24242670]">
                  {bills[billIndex].type}
                </div>
                <div className="text-[9px] font-mono text-[#24242640] mt-1">
                  Next due in 4 days
                </div>
              </motion.div>

              {/* Right peeking card */}
              <div
                onClick={() => setBillIndex((billIndex + 1) % 3)}
                className="absolute right-0 w-28 h-28 bg-white/60 rounded-2xl border border-white shadow-md translate-x-6 scale-80 opacity-50 cursor-pointer transition-transform hover:scale-85 flex flex-col items-center justify-center p-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#24242610] mb-2" />
                <div className="h-3 w-12 bg-[#24242620] rounded" />
              </div>
            </div>
          </div>


          {/* ======================================================== */}
          {/* CARD 5: INVOICE STATUS (Stacked Invoices) */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-[#f6f8fb]">
            {/* Top Info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2424260a] border border-[#24242615] text-[#242426] text-[11px] font-medium mb-5">
                <Search className="w-3.5 h-3.5 opacity-70" />
                Track
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-2">
                Invoice Status
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Track paid, pending, and overdue invoices in one clean view
              </p>
            </div>

            {/* Invoices List */}
            <div className="space-y-3 mt-4">
              {/* Invoice 1: Mira Studio */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white rounded-2xl p-4 border border-[#24242610] shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#24242660]">#002-12</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#40c46320] text-[#22863a] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#40c463]" />
                    Paid
                  </span>
                </div>
                <div className="text-base font-bold text-[#242426]">Mira Studio</div>
                <div className="flex items-center justify-between text-xs text-[#24242670] mt-1">
                  <span>Monthly retainer</span>
                  <span className="font-bold text-[#242426]">$1,200</span>
                </div>
              </motion.div>

              {/* Invoice 2: Silver Desk */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white rounded-2xl p-4 border border-[#24242610] shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#24242660]">#003-12</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e2845220] text-[#c05621] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c05621]" />
                    Overdue
                  </span>
                </div>
                <div className="text-base font-bold text-[#242426]">Silver Desk</div>
                <div className="flex items-center justify-between text-xs text-[#24242670] mt-1">
                  <span>Brand identity package</span>
                  <span className="font-bold text-[#242426]">$550</span>
                </div>
              </motion.div>
            </div>
          </div>


          {/* ======================================================== */}
          {/* CARD 6: ANOMALY DETECTION (Interactive Alert Card) */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#ffffff] to-[#f4f7fb]">
            {/* Top Info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2424260a] border border-[#24242615] text-[#242426] text-[11px] font-medium mb-5">
                <Shield className="w-3.5 h-3.5 opacity-70" />
                Protect
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-2">
                Anomaly Detection
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Unusual charge caught early
              </p>
            </div>

            {/* Actionable Alert Card */}
            <div className="mt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-[#24242615] shadow-xl bg-white"
              >
                {/* White Top Info Box */}
                <div className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#242426]">
                      Stripe fee spike
                    </div>
                    <div className="text-xs text-[#24242670] mt-0.5">
                      Now: <strong className="text-[#ef476f] font-mono">$486</strong> · Avg: <span className="font-mono text-[#24242650]">$120</span>
                    </div>
                  </div>
                </div>

                {/* Dark Bottom Action Bar */}
                <div className="bg-[#242426] text-white p-3 flex items-center justify-between border-t border-[#242426]">
                  <span className="text-xs font-medium text-white/90">
                    {anomalyResolved ? "Marked as resolved" : "Mark as expected"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAnomalyResolved(!anomalyResolved)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      anomalyResolved
                        ? "bg-[#40c463] text-white"
                        : "bg-[#d9ff5c] text-[#242426] hover:scale-105"
                    }`}
                    title={anomalyResolved ? "Resolved" : "Click to mark as expected"}
                  >
                    <Check className="w-4 h-4 font-bold" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
