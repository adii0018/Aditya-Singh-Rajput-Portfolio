"use client";

import React from "react";
import "./pokeball-loader.css";

export default function PokeballLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`pokeball-wrapper ${className}`} aria-hidden="true">
      <div className="pokeball-loader" />
    </div>
  );
}
