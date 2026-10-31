"use client";

import React, { useRef } from "react";
import { usePauseOffscreenAnimation } from "@/lib/usePauseOffscreenAnimation";
import "./sharingan-loader.css";

export default function SharinganLoader({ className = "" }: { className?: string }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  usePauseOffscreenAnimation(loaderRef);

  return (
    <div ref={loaderRef} data-motion-paused="true" className={`sharingon-wrapper ${className}`} aria-hidden="true">
      <div className="sharingon">
        <div className="ring">
          <div className="to" />
          <div className="to" />
          <div className="to" />
          <div className="circle" />
        </div>
      </div>
    </div>
  );
}
