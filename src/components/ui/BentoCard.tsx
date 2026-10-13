"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}

export function BentoCard({
  children,
  className = "",
  color = "#d9ff5c",
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      className={`relative group rounded-3xl overflow-hidden border border-[#24242212] bg-white flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#24242215] ${className}`}
    >
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ background: color }}
      />
      {children}
    </motion.div>
  );
}
