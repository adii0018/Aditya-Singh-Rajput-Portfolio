"use client";

import { ReactNode } from "react";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export function AnimatedHeading({
  text,
  className = "",
  wordClassName = "hero-title-word",
}: AnimatedHeadingProps) {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top mr-[0.25em] pb-1"
        >
          <span className={`inline-block ${wordClassName}`}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function MaskedReveal({
  children,
  className = "",
  innerClassName = "masked-item",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden align-top ${className}`}>
      <span className={`inline-block ${innerClassName}`}>
        {children}
      </span>
    </span>
  );
}
