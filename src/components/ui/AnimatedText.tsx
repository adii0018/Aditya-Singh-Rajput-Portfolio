"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedHeading({
  text,
  className = "",
  delay = 0.3,
}: AnimatedTextProps) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.12,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
