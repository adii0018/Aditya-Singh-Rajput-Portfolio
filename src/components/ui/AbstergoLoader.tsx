"use client";

import React, { useRef } from "react";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import "./abstergo-loader.css";

interface AbstergoLoaderProps {
  className?: string;
  primary?: string;
  secondary?: string;
  style?: React.CSSProperties;
}

export default function AbstergoLoader({
  className = "",
  primary = "#4E60E6",
  secondary = "rgba(78, 96, 230, 0.85)",
  style,
}: AbstergoLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(loaderRef);

  return (
    <div
      ref={loaderRef}
      className={`abstergo-wrapper ${className}`}
      aria-hidden="true"
      style={style}
    >
      <div
        className="abstergo-loader"
        style={
          {
            "--primary": primary,
            "--secondary": secondary,
            "--shadow-blur": "12px",
          } as React.CSSProperties
        }
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
