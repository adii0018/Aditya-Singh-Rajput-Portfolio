"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, isReducedMotion } from "@/lib/gsap";
import { MapPin, Disc3, Sparkles } from "lucide-react";

const darkTextHaloStyle = {
  textShadow: "0 0 16px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.9), 0 1px 2px rgba(255,255,255,0.8)",
};

const darkTitleHaloStyle = {
  textShadow: "0 0 20px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.9), 0 2px 4px rgba(255,255,255,0.8)",
};

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle background Lofi track
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".about-corner-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
      .from(".about-music-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4")
      .from(cardRef.current, {
        y: 40,
        scale: 0.96,
        opacity: 0,
        duration: 0.85,
        ease: "back.out(1.2)",
      }, "-=0.3");
    },
    { scope: aboutRef }
  );

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative z-20 min-h-screen flex flex-col justify-center items-center py-20 px-6 overflow-visible rounded-t-[32px] sm:rounded-t-[44px]"
      style={{
        background: "#0a0a0c",
        cursor: "url('/custom-cursor.png') 16 16, auto",
      }}
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/lofi-track.mp3"
        loop
        preload="metadata"
      />

      {/* 🎬 Cosmic Anime Video Background (Guns.lol style) - 100% Pure Edge-to-Edge Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-t-[32px] sm:rounded-t-[44px] pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/cosmic-vortex.mp4"
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-100 pointer-events-none"
        />
      </div>

      {/* Subtle top & bottom divider lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent pointer-events-none z-10" />

      {/* Top Left: Subtle Badge */}
      <div className="absolute top-6 left-6 z-20 pointer-events-auto">
        <div className="about-corner-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 bg-white/70 hover:bg-white/90 backdrop-blur-md text-black/85 text-xs font-mono tracking-wider uppercase shadow-md transition-all">
          <Sparkles size={12} className="text-black" />
          / about
        </div>
      </div>

      {/* Top Right: Guns.lol Lofi Soundtrack Toggle */}
      <div className="absolute top-6 right-6 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={toggleAudio}
          className="about-music-btn inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-black/15 bg-white/70 hover:bg-white/95 backdrop-blur-md text-black text-xs font-mono transition-all duration-200 shadow-md group cursor-pointer"
          title={isPlaying ? "Pause background track" : "Play lofi soundtrack"}
        >
          <Disc3
            size={14}
            className={`text-black ${isPlaying ? "animate-spin" : "opacity-75"}`}
            style={{ animationDuration: "3s" }}
          />
          <span className="font-semibold text-black">
            {isPlaying ? "PAUSE LOFI" : "PLAY LOFI"}
          </span>

          {/* Equalizer animation bars */}
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span
              className={`w-0.5 bg-black rounded-full transition-all ${
                isPlaying ? "h-3 animate-pulse" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-0.5 bg-black rounded-full transition-all ${
                isPlaying ? "h-2 animate-bounce" : "h-1 opacity-40"
              }`}
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className={`w-0.5 bg-black rounded-full transition-all ${
                isPlaying ? "h-3 animate-pulse" : "h-1 opacity-40"
              }`}
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </button>
      </div>

      {/* 🪪 Guns.lol Center Identity & Bio (1:1 with Reference Screenshot) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-4 overflow-visible">
        {/* Soft, luminous white ambient aura behind text so white clouds provide maximum contrast */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.18)_45%,transparent_75%)] blur-2xl pointer-events-none" />

        <motion.div
          ref={cardRef}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
          className="relative w-full mx-auto flex flex-col items-center text-center"
        >
          {/* Mirror Selfie Avatar (User's Photo Preserved) */}
          <div className="relative mb-3 group">
            <img
              src="/avatar.jpg"
              alt="Aditya Singh Rajput Avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Stylized Name in Crisp Black */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-[0.22em] mb-2 font-mono"
            style={darkTitleHaloStyle}
          >
            Λ Ꭰ I I ㅤ么
          </h1>

          {/* Bio Tagline */}
          <p
            className="text-xs sm:text-sm font-mono text-zinc-900 tracking-wide mb-3 font-semibold max-w-md mx-auto"
            style={darkTextHaloStyle}
          >
            么 Turning caffeine into AI models, bugs into features.
          </p>

          {/* Location Badge (Original Style with Rose MapPin) */}
          <div className="mb-6 flex justify-center">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#38bdf8]/40 bg-black/60 backdrop-blur-sm text-white/95 text-xs font-mono font-medium tracking-wider shadow-lg shadow-black/20"
              style={{
                textShadow: "0 0 10px rgba(0,0,0,0.9), 0 1px 2px #000",
              }}
            >
              <MapPin size={12} className="text-rose-400" />
              INDIA
            </span>
          </div>

          {/* Bio Paragraphs (Replacing the Project / Social Badges in the Photo) */}
          <div className="space-y-4 max-w-xl sm:max-w-2xl mx-auto text-center px-2">
            <p
              className="text-zinc-950 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-medium"
              style={darkTextHaloStyle}
            >
              I&apos;m <span className="text-black font-bold underline decoration-black/60 decoration-1 underline-offset-4">Aditya Singh Rajput</span> — an AI engineer and full-stack developer based in India. I build real-time computer vision systems and language model applications that solve concrete problems, from automated online exam proctoring to multilingual governance assistants.
            </p>

            <p
              className="text-zinc-900 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-normal"
              style={darkTextHaloStyle}
            >
              My focus is taking machine learning models out of notebooks and into production: optimizing inference latency, building responsive user interfaces, and ensuring reliable data pipelines.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
