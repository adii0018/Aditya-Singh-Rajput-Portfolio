import { ImageResponse } from "next/og";
import { NAME, ROLE } from "@/lib/site";

export const alt = "Aditya Singh Rajput | AI/ML Engineer and Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#111110",
          color: "#FAFAF8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#D9FF5C",
          }}
        />

        {/* Top row: badge & domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#D9FF5C",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#FAFAF8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO
            </span>
          </div>

          <span
            style={{
              fontSize: "20px",
              color: "#78716C",
              fontFamily: "monospace",
            }}
          >
            www.adityasinghrajput.me
          </span>
        </div>

        {/* Middle: Name & Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: "#FAFAF8",
              letterSpacing: "-0.02em",
            }}
          >
            {NAME}
          </h1>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 500,
              margin: 0,
              color: "#D9FF5C",
            }}
          >
            {ROLE}
          </p>
        </div>

        {/* Bottom row: Specializations / Tech pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {["Computer Vision", "NLP & LLMs", "Full-Stack AI", "FastAPI / Next.js"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "16px",
                  color: "#D1D5DB",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
