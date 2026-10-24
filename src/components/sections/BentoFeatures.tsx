"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP, gsap, isReducedMotion } from "@/lib/gsap";
import {
  Sliders,
  Sparkles,
  Shield,
  AlertCircle,
  Check,
  FolderTree,
  Music,
  CreditCard as CreditCardIcon,
  Cpu,
  Zap,
  Terminal,
  Play,
  RotateCcw,
} from "lucide-react";
import FileTreeCard from "@/components/ui/FileTreeCard";
import SpotifyCard from "@/components/ui/SpotifyCard";
import CreditCard from "@/components/ui/CreditCard";

interface PromptPreset {
  id: string;
  name: string;
  query: string;
  response: string;
  latency: string;
}

const AI_PRESETS: PromptPreset[] = [
  {
    id: "proctor",
    name: "Alice Proctor",
    query: "Evaluate frame #1402 gaze angle",
    response: "FaceMesh verified. Gaze deviation detected at +34.2°. Cheating probability: 0.89.",
    latency: "28ms",
  },
  {
    id: "mandi",
    name: "Agri ML",
    query: "Forecast crop price for next 30 days",
    response: "Model R²=0.94. Wheat forecast: ₹2,420/qtl (+3.8%). Demand surplus projected.",
    latency: "34ms",
  },
  {
    id: "jansetu",
    name: "JanSetu LLM",
    query: "Translate scheme criteria to regional context",
    response: "पीएम-किसान योजना: ₹6,000 वार्षिक सहायता। प्रत्यक्ष डीबीटी ट्रांसफर स्वीकृत।",
    latency: "45ms",
  },
];

export default function BentoFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Card 3: AI Inference Metric Mode
  const [metricMode, setMetricMode] = useState<"vision" | "nlp">("vision");

  // Card 4: Interactive Token Streamer
  const [selectedPrompt, setSelectedPrompt] = useState<PromptPreset>(AI_PRESETS[0]);
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    let index = 0;
    setStreamedText("");
    setIsStreaming(true);

    const fullText = selectedPrompt.response;
    const interval = setInterval(() => {
      index++;
      setStreamedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [selectedPrompt]);

  // Card 6: AI Proctoring Alert state
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
        }, "-=0.3");
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
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="bento-header-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ffffff20] text-[#ffffff80] text-xs font-mono tracking-wider uppercase mb-6 bg-white/5">
            ✦ AI Dev Lab & Systems
          </div>

          <h2
            className="bento-header-title font-black text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(34px, 5vw, 56px)" }}
          >
            Engineered for intelligence.
            <br />
            <span className="text-[#d9ff5c]">Built for real-world scale.</span>
          </h2>

          <p className="bento-header-sub text-[#ffffff70] text-base leading-relaxed">
            Real-time inference pipelines, interactive token streaming, and production-grade architectures.
          </p>
        </div>

        {/* 6-CARD BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* ======================================================== */}
          {/* CARD 1: NOW PLAYING / SPOTIFY WIDGET */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#4b6075] to-[#2c333d]">
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff15] backdrop-blur-md border border-[#ffffff20] text-white text-[11px] font-semibold mb-3">
                <Music className="w-3.5 h-3.5 text-[#d9ff5c]" />
                Audio & Focus
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                Currently Playing
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Click any track to switch songs and live equalizer
              </p>
            </div>

            <div className="w-full flex justify-center pb-1">
              <SpotifyCard />
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 2: CODEBASE ARCHITECTURE (Interactive File Tree) */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-[#f6f8fb]">
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2424260a] border border-[#24242615] text-[#242426] text-[11px] font-medium mb-3">
                <FolderTree className="w-3.5 h-3.5 opacity-70" />
                Architecture
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-1">
                Clean System Layout
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Modular React components, GSAP timeline hooks & clean abstractions
              </p>
            </div>

            <div className="w-full flex justify-center pb-1">
              <FileTreeCard />
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 3: AI MODEL LATENCY & FPS BENCHMARK (Arc Dial) */}
          {/* ======================================================== */}
          <div
            onClick={() => setMetricMode(metricMode === "vision" ? "nlp" : "vision")}
            className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#4b6075] via-[#a2b5c7] to-[#f4f7fa] cursor-pointer group"
          >
            <div className="relative z-10 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff20] backdrop-blur-md border border-[#ffffff25] text-white text-[11px] font-medium">
                  <Cpu className="w-3.5 h-3.5 text-[#d9ff5c]" />
                  Inference Benchmarks
                </div>
                {/* Visual Mode Pill Switcher */}
                <div className="flex items-center bg-black/25 backdrop-blur-md p-0.5 rounded-full border border-white/20">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setMetricMode("vision"); }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                      metricMode === "vision"
                        ? "bg-[#d9ff5c] text-[#242426] shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    VISION
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setMetricMode("nlp"); }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                      metricMode === "nlp"
                        ? "bg-[#d9ff5c] text-[#242426] shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    NLP
                  </button>
                </div>
              </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                AI Benchmark Preview
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Illustrative throughput and latency for computer vision and NLP
              </p>
            </div>

            <div className="relative w-full h-44 flex flex-col items-center justify-end pb-2">
              {/* Semi-circular dashed arc */}
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

              {/* Floating Benchmark Badges along Arc */}
              <div className="absolute inset-0 max-w-[240px] mx-auto pointer-events-none">
                <div className="absolute top-[88px] left-[6px] px-1.5 py-0.5 rounded-full bg-white shadow-md border border-white text-[9px] font-mono font-bold text-[#242426]">
                  YOLO
                </div>
                <div className="absolute top-[32px] left-[38px] px-1.5 py-0.5 rounded-full bg-white shadow-md border border-white text-[9px] font-mono font-bold text-[#242426]">
                  OpenCV
                </div>
                <div className="absolute top-[2px] left-[104px] px-2 py-0.5 rounded-full bg-[#d9ff5c] shadow-lg border border-white text-[10px] font-mono font-bold text-[#242426]">
                  RTX
                </div>
                <div className="absolute top-[32px] right-[38px] px-1.5 py-0.5 rounded-full bg-white shadow-md border border-white text-[9px] font-mono font-bold text-[#242426]">
                  FastAPI
                </div>
                <div className="absolute top-[88px] right-[6px] px-1.5 py-0.5 rounded-full bg-white shadow-md border border-white text-[9px] font-mono font-bold text-[#242426]">
                  INT8
                </div>
              </div>

              {/* Center Metric Display */}
              <div className="relative z-10 text-center -mt-6">
                <AnimatePresence mode="wait">
                  {metricMode === "vision" ? (
                    <motion.div
                      key="vision"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <div className="text-3xl sm:text-4xl font-black text-[#242426] tracking-tight">
                        48 FPS
                      </div>
                      <div className="text-xs font-semibold text-[#24242680] uppercase tracking-wider">
                        Sample: Face Mesh
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="nlp"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <div className="text-3xl sm:text-4xl font-black text-[#242426] tracking-tight">
                        42 ms
                      </div>
                      <div className="text-xs font-semibold text-[#24242680] uppercase tracking-wider">
                        Sample: LLM Query Latency
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMetricMode(metricMode === "vision" ? "nlp" : "vision");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 mt-2.5 rounded-full bg-white/90 hover:bg-[#d9ff5c] text-[#242426] text-[11px] font-bold font-sans shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-[#242426]" />
                  <span>Switch to {metricMode === "vision" ? "NLP (ms)" : "Vision (FPS)"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 4: INTERACTIVE TOKEN STREAMER / PROMPT PLAYGROUND */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#3a4754] to-[#1c2128]">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff15] backdrop-blur-md border border-[#ffffff20] text-white text-[11px] font-medium mb-4">
                <Zap className="w-3.5 h-3.5 text-[#d9ff5c]" />
                Token Streamer
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                Prompt Simulator
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                Select an AI project pipeline to simulate output stream:
              </p>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {AI_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPrompt(p)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer border ${
                      selectedPrompt.id === p.id
                        ? "bg-[#d9ff5c] text-[#242426] font-bold border-[#d9ff5c]"
                        : "bg-white/10 text-white/80 border-white/10 hover:bg-white/20"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Output Window */}
            <div className="p-3.5 rounded-2xl bg-[#0f1216] border border-white/10 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-[10px] text-white/40 pb-1 border-b border-white/5">
                <span className="flex items-center gap-1">
                  <Terminal size={10} className="text-[#d9ff5c]" /> prompt
                </span>
                <span className="text-[#d9ff5c]">{selectedPrompt.latency}</span>
              </div>
              <div className="text-white/60 text-[11px] truncate">
                &gt; {selectedPrompt.query}
              </div>
              <div className="text-[#d9ff5c] leading-relaxed min-h-[48px]">
                {streamedText}
                {isStreaming && (
                  <span className="inline-block w-1.5 h-3.5 bg-[#d9ff5c] ml-1 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 5: DEVELOPER IDENTITY / DEV PASS */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-[#f6f8fb]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2424260a] border border-[#24242615] text-[#242426] text-[11px] font-medium mb-3">
                <CreditCardIcon className="w-3.5 h-3.5 opacity-70" />
                Security & Pass
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-1">
                Developer Credentials
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Digital verified badge · Tap or hover to flip card
              </p>
            </div>

            {/* 3D Flip Card */}
            <div className="my-auto py-2 flex flex-col items-center justify-center">
              <CreditCard name="ADITYA SINGH RAJPUT" />
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#24242670] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#40c463] animate-pulse" />
                <span>Level: AI/ML Core Engineer</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 6: AI GUARDRAILS & ANOMALY DETECTION */}
          {/* ======================================================== */}
          <div className="bento-grid-card relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-[#ffffff15] shadow-xl min-h-[380px] bg-gradient-to-b from-[#ffffff] to-[#f4f7fb]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2424260a] border border-[#24242615] text-[#242426] text-[11px] font-medium mb-4">
                <Shield className="w-3.5 h-3.5 text-[#2da44e]" />
                Guardrails & Integrity
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#242426] tracking-tight mb-1.5">
                Anomaly Guard
              </h3>
              <p className="text-[#24242680] text-xs sm:text-sm leading-relaxed">
                Computer Vision event flagged in real-time proctoring session
              </p>
            </div>

            {/* Actionable Alert Card */}
            <div className="mt-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-[#24242615] shadow-xl bg-white"
              >
                <div className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#242426]">
                      Suspicious Gaze Angle
                    </div>
                    <div className="text-xs text-[#24242670] mt-0.5">
                      Frame: <strong className="text-[#ef476f] font-mono">34.2° off-center</strong> · Threshold: <span className="font-mono text-[#24242650]">20.0°</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#242426] text-white p-3 flex items-center justify-between border-t border-[#242426]">
                  <span className="text-xs font-medium text-white/90">
                    {anomalyResolved ? "Audited & Verified via FaceMesh" : "Flag for Human Review"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAnomalyResolved(!anomalyResolved)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer border-0 ${
                      anomalyResolved
                        ? "bg-[#40c463] text-white"
                        : "bg-[#d9ff5c] text-[#242426] hover:scale-105"
                    }`}
                    title={anomalyResolved ? "Resolved" : "Click to verify anomaly"}
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
