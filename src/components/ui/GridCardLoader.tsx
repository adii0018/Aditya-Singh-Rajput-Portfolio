"use client";

import React from "react";
import "./grid-card-loader.css";

export default function GridCardLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`grid-card-loader-wrapper ${className}`} aria-hidden="true">
      <div className="grid-card-main">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="grid-card-cell" />
        ))}
      </div>
    </div>
  );
}
