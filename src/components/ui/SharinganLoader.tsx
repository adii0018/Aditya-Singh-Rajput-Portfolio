"use client";

import React from "react";
import "./sharingan-loader.css";

export default function SharinganLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`sharingon-wrapper ${className}`} aria-hidden="true">
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
