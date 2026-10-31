"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const CIPHER_CHARS = "0101λ∑∂_#&0x*~<>+=!%/?$@";

export interface DecryptedWordHandle {
  decrypt: (durationMs?: number) => void;
}

interface DecryptedWordProps {
  word: string;
  index: number;
  wordClassName?: string;
  isAccent?: boolean;
  staggerDelay?: number;
  autoDecrypt?: boolean;
}

const DecryptedWord = forwardRef<DecryptedWordHandle, DecryptedWordProps>(
  (
    {
      word,
      index,
      wordClassName = "hero-title-word",
      isAccent = false,
      staggerDelay = 55,
      autoDecrypt = true,
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState(word);
    const [isScrambling, setIsScrambling] = useState(false);
    const animRef = useRef<number | null>(null);

    const runDecrypt = useCallback(
      (durationMs = 450) => {
        if (
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          setDisplayText(word);
          return;
        }

        if (animRef.current) cancelAnimationFrame(animRef.current);

        setIsScrambling(true);
        const startTime = performance.now();
        const length = word.length;

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / durationMs);
          const resolvedCount = Math.floor(progress * length);

          let result = "";
          for (let i = 0; i < length; i++) {
            if (i < resolvedCount) {
              result += word[i];
            } else if (word[i] === " " || word[i] === "." || word[i] === ",") {
              result += word[i];
            } else {
              const randomChar =
                CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
              result += randomChar;
            }
          }

          setDisplayText(result);

          if (progress < 1) {
            animRef.current = requestAnimationFrame(tick);
          } else {
            setDisplayText(word);
            setIsScrambling(false);
            animRef.current = null;
          }
        };

        animRef.current = requestAnimationFrame(tick);
      },
      [word]
    );

    useImperativeHandle(ref, () => ({
      decrypt: runDecrypt,
    }));

    // Auto-decrypt on mount staggered like an AI token stream
    useEffect(() => {
      if (!autoDecrypt) return;

      const hasPlayed =
        typeof window !== "undefined" &&
        sessionStorage.getItem("hero-intro-played");
      const baseDelay = hasPlayed ? 300 : 700;

      const timer = setTimeout(() => {
        runDecrypt(420);
      }, baseDelay + index * staggerDelay);

      return () => {
        clearTimeout(timer);
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    }, [autoDecrypt, index, runDecrypt, staggerDelay]);

    return (
      <span
        className={`inline-block overflow-hidden align-top mr-[0.32em] pb-1 cursor-pointer select-none transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0 ${
          isAccent ? "font-semibold" : ""
        }`}
        onMouseEnter={() => runDecrypt(350)}
        title="Click or hover to re-decrypt"
      >
        <span
          className={`inline-block ${wordClassName} ${
            isScrambling
              ? "text-[#1a7f37] font-mono tracking-tight drop-shadow-[0_0_6px_rgba(26,127,55,0.4)]"
              : isAccent
              ? "text-[#1f2022] underline decoration-[#d9ff5c] decoration-2 underline-offset-4"
              : ""
          }`}
        >
          {displayText}
        </span>
      </span>
    );
  }
);

DecryptedWord.displayName = "DecryptedWord";

interface AiDecryptHeadingProps {
  text: string;
  className?: string;
  wordClassName?: string;
  accentWords?: string[];
  showCursor?: boolean;
  autoDecrypt?: boolean;
  staggerDelay?: number;
}

export default function AiDecryptHeading({
  text,
  className = "",
  wordClassName = "hero-title-word",
  accentWords = ["perceive.", "act.", "AI", "Engineer."],
  showCursor = false,
  autoDecrypt = true,
  staggerDelay = 55,
}: AiDecryptHeadingProps) {
  const words = text.split(" ");
  const wordRefs = useRef<(DecryptedWordHandle | null)[]>([]);

  const handleReplayAll = () => {
    wordRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      setTimeout(() => {
        ref.decrypt(400);
      }, idx * 45);
    });
  };

  return (
    <span
      className={`inline-flex ${className.includes("flex-") ? "" : "flex-wrap"} items-baseline group/heading ${className}`}
      onClick={handleReplayAll}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleReplayAll();
        }
      }}
      title="Click to re-stream AI tokens"
    >
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word);
        return (
          <DecryptedWord
            key={`${word}-${i}`}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            word={word}
            index={i}
            wordClassName={wordClassName}
            isAccent={isAccent}
            staggerDelay={staggerDelay}
            autoDecrypt={autoDecrypt}
          />
        );
      })}

      {/* AI Token Stream Terminal Cursor */}
      {showCursor && (
        <span
          className="inline-block w-2.5 h-[0.78em] bg-[#1f2022] ml-1 align-baseline animate-pulse rounded-[1px] shadow-xs group-hover/heading:bg-[#2da44e] transition-colors"
          style={{ animationDuration: "0.9s" }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
