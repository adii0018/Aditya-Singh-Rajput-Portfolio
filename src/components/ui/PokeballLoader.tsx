"use client";

import React, { useRef } from "react";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import "./pokeball-loader.css";

export default function PokeballLoader({ className = "" }: { className?: string }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(loaderRef);

  return (
    <div ref={loaderRef} data-motion-paused="true" className={`pokeball-wrapper ${className}`} aria-hidden="true">
      <div className="pokeball-loader" />
    </div>
  );
}
