"use client";

import React from "react";
import "./code-loader.css";

export default function CodeLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`select-none ${className}`} aria-hidden="true">
      <div className="code-loader">
        <span>{"{"}</span>
        <span>{"}"}</span>
      </div>
    </div>
  );
}
