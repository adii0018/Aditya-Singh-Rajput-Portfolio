"use client";

import React from "react";
import "./abstergo-loader.css";

export default function AbstergoLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`abstergo-wrapper ${className}`} aria-hidden="true">
      <div className="abstergo-loader">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
