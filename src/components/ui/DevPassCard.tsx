import React, { forwardRef } from "react";
import "./devpass.css";

interface DevPassCardProps {
  className?: string;
  style?: React.CSSProperties;
}

export const DevPassCard = forwardRef<HTMLDivElement, DevPassCardProps>(
  ({ className = "", style }, ref) => {
    return (
      <div ref={ref} style={style} className={`devpass-wrapper ${className}`}>
        <div className="ticket">
          {/* Top Main Section */}
          <div className="t-main">
            <div className="t-content">
              <div className="t-header">
                <div className="t-logo">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  A L I C E
                </div>
                <div className="t-type">Dev Pass</div>
              </div>

              <div className="t-title">
                Syntax<br />Error &apos;18
              </div>
              <div className="t-subtitle">Global Developer Conference</div>

              <div className="t-details">
                <div className="t-detail-item">
                  <span className="t-label">Name</span>
                  <span className="t-value">Aditya Singh Rajput</span>
                </div>
                <div className="t-detail-item">
                  <span className="t-label">Date</span>
                  <span className="t-value">May 08, 2026</span>
                </div>
                <div className="t-detail-item">
                  <span className="t-label">Venue</span>
                  <span className="t-value">Indore Nexus Arena</span>
                </div>
                <div className="t-detail-item">
                  <span className="t-label">Gateway</span>
                  <span className="t-value">Sector OG</span>
                </div>
              </div>
            </div>

            {/* Perforation Cut / Notch */}
            <div
              className="t-perforation"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                transform: "translateY(50%)",
              }}
            >
              <div className="t-perf-line" />
            </div>
          </div>

          {/* Bottom Stub / Barcode Section */}
          <div className="t-stub">
            <div className="t-barcode-container">
              <div className="t-barcode" />
              <div className="t-barcode-id">ASR-18-OG-DEV</div>
            </div>
            <div className="t-admit">
              <div className="t-admit-text">Seat</div>
              <div className="t-admit-num">!8</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DevPassCard.displayName = "DevPassCard";

export default DevPassCard;
