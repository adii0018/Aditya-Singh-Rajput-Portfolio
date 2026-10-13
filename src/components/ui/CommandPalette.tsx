"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, CornerDownLeft, Sparkles, Download, Mail } from "lucide-react";
import { personal, skills, projects, experience } from "@/lib/data";

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const COMMAND_HINTS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "contact",
  "resume",
  "sudo hire",
  "clear",
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "welcome",
      command: "welcome",
      output: (
        <div className="space-y-1.5 text-xs text-[#ffffff90]">
          <p className="text-[#d9ff5c] font-bold">
            🚀 Welcome to Adii&apos;s Interactive Terminal v2.4
          </p>
          <p>
            Type <span className="text-[#d9ff5c] font-mono font-semibold">help</span> to view available commands, or click any suggestion below.
          </p>
        </div>
      ),
    },
  ]);
  const [isHired, setIsHired] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Global shortcut (Ctrl+K or Cmd+K) & custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[#d9ff5c] font-bold mb-1.5">Available Commands:</p>
            <div className="grid grid-cols-2 gap-1.5 text-[#ffffff80]">
              <div><span className="text-white font-semibold">whoami</span> — About Aditya</div>
              <div><span className="text-white font-semibold">skills</span> — AI/ML & Tech Stack</div>
              <div><span className="text-white font-semibold">projects</span> — Featured Products</div>
              <div><span className="text-white font-semibold">contact</span> — Get in touch</div>
              <div><span className="text-white font-semibold">resume</span> — Download CV</div>
              <div><span className="text-[#d9ff5c] font-semibold">sudo hire</span> — Secret Command</div>
              <div><span className="text-white font-semibold">clear</span> — Reset terminal</div>
              <div><span className="text-white font-semibold">exit</span> — Close terminal</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-2 text-xs leading-relaxed text-[#ffffff90]">
            <p className="font-bold text-white text-sm">Aditya Singh Rajput (Adii)</p>
            <p>
              AI/ML Engineer & Full-Stack Developer specializing in Computer Vision,
              Natural Language Processing, and scalable web architectures.
            </p>
            <p className="text-[#ffffff70]">
              📍 Based in India · 🎓 B.Tech Computer Science (2022-2026) · 🏆 National Hackathon Winner
            </p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[#d9ff5c] font-bold">Tech Stack & Domains:</p>
            <div className="space-y-1.5 text-[#ffffff85]">
              <p>
                <span className="text-[#c0adff] font-semibold">AI/ML:</span>{" "}
                Python, TensorFlow, PyTorch, OpenCV, NLP, LangChain, Hugging Face
              </p>
              <p>
                <span className="text-[#b8deff] font-semibold">Frontend:</span>{" "}
                Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion
              </p>
              <p>
                <span className="text-[#d9ff5c] font-semibold">Backend:</span>{" "}
                FastAPI, Django, Node.js, PostgreSQL, REST APIs
              </p>
              <p>
                <span className="text-[#f1e05a] font-semibold">Tools:</span>{" "}
                Docker, Git, AWS, Linux, Turbopack
              </p>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-[#d9ff5c] font-bold font-mono">Featured Projects Shipped:</p>
            <div className="space-y-1.5">
              {projects.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
                  <div>
                    <span className="font-semibold text-white">{p.title}</span>
                    <span className="text-[#ffffff60] text-[11px] ml-2">({p.tag})</span>
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d9ff5c] hover:underline font-mono text-[11px]"
                  >
                    View Code →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-[#d9ff5c] font-bold font-mono">Direct Channels:</p>
            <p className="text-white flex items-center gap-2">
              <Mail size={13} className="text-[#d9ff5c]" />
              <a href={`mailto:${personal.email}`} className="underline hover:text-[#d9ff5c]">
                {personal.email}
              </a>
            </p>
            <p className="text-[#ffffff70]">
              LinkedIn:{" "}
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="underline text-white">
                {personal.linkedin}
              </a>
            </p>
          </div>
        );
        break;

      case "resume":
      case "cv":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-[#2da44e] font-bold font-mono">📄 Triggering Resume Download...</p>
            <a
              href="/Aditya_Singh_Rajput_Resume.pdf"
              download="Aditya_Singh_Rajput_Resume.pdf"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-[#242426] font-semibold text-xs mt-1"
            >
              <Download size={13} />
              <span>Download PDF directly</span>
            </a>
          </div>
        );
        // Automatically trigger download
        const a = document.createElement("a");
        a.href = "/Aditya_Singh_Rajput_Resume.pdf";
        a.download = "Aditya_Singh_Rajput_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;

      case "sudo hire":
      case "hire":
        setIsHired(true);
        outputNode = (
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#d9ff5c]/20 to-[#40c463]/20 border border-[#d9ff5c]/40 text-xs space-y-1.5">
            <p className="text-[#d9ff5c] font-bold text-sm flex items-center gap-2">
              <Sparkles size={16} /> OFFER ACCEPTED! 🎉
            </p>
            <p className="text-white leading-relaxed">
              Permission granted: Root level access unlocked. Let&apos;s build intelligent systems together!
            </p>
            <p className="text-[#d9ff5c] font-mono text-[11px] pt-1">
              Email sent to clipboard: {personal.email}
            </p>
          </div>
        );
        navigator.clipboard?.writeText(personal.email).catch(() => {});
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        setIsOpen(false);
        setInput("");
        return;

      default:
        outputNode = (
          <p className="text-xs text-[#ff6b6b] font-mono">
            command not found: {cmd}. Type <span className="text-[#d9ff5c] underline">help</span> for list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: cmd,
        output: outputNode,
      },
    ]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
  };

  return (
    <>
      {/* Floating launcher badge in bottom-right corner */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#242426] text-white border border-[#ffffff20] shadow-xl hover:border-[#d9ff5c] transition-all cursor-pointer group backdrop-blur-md"
        title="Open Developer Terminal (Ctrl+K)"
      >
        <div className="w-2 h-2 rounded-full bg-[#d9ff5c] animate-pulse" />
        <Terminal size={14} className="text-[#d9ff5c]" />
        <span className="text-xs font-mono text-[#ffffff90] group-hover:text-white">
          ⌘K Terminal
        </span>
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#1c1d1f] border border-[#ffffff15] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#242426] border-b border-[#ffffff10] select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-xs font-mono text-[#ffffff60] ml-2">
                    aditya@terminal:~ (zsh)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#ffffff40] hidden sm:inline">
                    ESC to close
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-md text-[#ffffff60] hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Terminal Logs & Output */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono min-h-[260px] text-sm">
                {history.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-[#ffffff60]">
                      <span className="text-[#d9ff5c]">aditya@portfolio:~$</span>
                      <span className="text-white font-medium">{item.command}</span>
                    </div>
                    <div className="pl-4 border-l border-white/10">{item.output}</div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Quick suggestion chips */}
              <div className="px-4 py-2 bg-[#242426]/70 border-t border-[#ffffff0a] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
                <span className="text-[#ffffff40] shrink-0 mr-1">Suggestions:</span>
                {COMMAND_HINTS.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => executeCommand(hint)}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#d9ff5c]/20 hover:text-[#d9ff5c] text-[#ffffff80] transition-colors border border-white/10 shrink-0 cursor-pointer"
                  >
                    {hint}
                  </button>
                ))}
              </div>

              {/* Interactive Command Input Form */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 bg-[#17181a] border-t border-[#ffffff15]"
              >
                <span className="text-[#d9ff5c] font-mono text-sm shrink-0">
                  aditya@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type a command or 'help'..."
                  className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none border-0 placeholder-[#ffffff40]"
                />
                <button
                  type="submit"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#d9ff5c] hover:text-[#242426] text-white transition-colors cursor-pointer border-0"
                  title="Execute command"
                >
                  <CornerDownLeft size={13} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
