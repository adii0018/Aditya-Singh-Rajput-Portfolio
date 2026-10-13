import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-8 h-8" }: TechIconProps) {
  const norm = name.toLowerCase().replace(/[\s.-]/g, "");

  switch (norm) {
    // JavaScript
    case "javascript":
    case "js":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#F7DF1E" />
          <path
            d="M75.5 100.2c3.7 6.1 8.5 10.6 17.2 10.6 7.3 0 12-3.7 12-8.8 0-6.1-4.9-8.3-13.1-11.8l-4.5-1.9c-13-5.6-21.7-12.6-21.7-27.4 0-13.6 10.4-24 26.6-24 11.5 0 19.8 4 25.5 14.1l-11.6 7.4c-3.2-5.7-6.8-7.9-13.9-7.9-5.9 0-10.2 3.7-10.2 8.3 0 5.7 3.5 7.9 11.6 11.4l4.5 1.9c15.2 6.5 23.5 13.3 23.5 28.1 0 16-12.6 24.8-28.5 24.8-16 0-26.3-7.7-31.1-17.6l13.7-7.1zm-48.4-1.2c2.6 4.6 6 8.5 12.2 8.5 6.3 0 10.4-2.5 10.4-12.3V48h16.2v47.4c0 18.5-10.9 26.6-26.4 26.6-14.2 0-22.7-7.4-26.8-16.3l14.4-8.7z"
            fill="#000000"
          />
        </svg>
      );

    // TypeScript
    case "typescript":
    case "ts":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path
            d="M70.5 48h42v13.5H98v49.5H81.5V61.5H70.5V48zm-19.1 27.2c-3-2.1-7.2-4.1-12.2-4.1-5.6 0-8.9 2.5-8.9 6.2 0 3.7 3.5 5.6 10.5 8.7 11.8 5.1 18.2 10.8 18.2 21.3 0 13.8-10.8 21.8-26.8 21.8-10.6 0-18.7-3.4-23.7-7.6l4.9-12.1c4.2 3.3 10.1 6.2 16.8 6.2 6.5 0 10.4-3 10.4-7 0-4.3-3.9-6.4-11.4-9.6-11.3-4.8-17.3-10.7-17.3-20.3 0-13.2 10.4-21.4 25.1-21.4 8.7 0 16 2.6 20.3 5.4l-5.9 12.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // React
    case "react":
    case "reactjs":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    // Next.js
    case "nextjs":
    case "next":
      return (
        <svg viewBox="0 0 180 180" className={className}>
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path
            d="M149.508 158.423L69.754 54H54v72h13.636V71.492l71.493 93.303a90.26 90.26 0 0010.379-6.372z"
            fill="url(#next-gradient)"
          />
          <path d="M115.5 54H129v47.25l-13.5-17.25V54z" fill="#FFFFFF" />
          <defs>
            <linearGradient
              id="next-gradient"
              x1="109"
              y1="116.5"
              x2="144.5"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" />
              <stop offset="0.75" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    // HTML / HTML5
    case "html":
    case "html5":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M19.4 113.8L8.7 0h110.6l-10.7 113.7L63.8 128l-44.4-14.2z" fill="#E44D26" />
          <path d="M64 116.8l35.7-11.4 8.8-94.8H64v106.2z" fill="#F16529" />
          <path
            d="M64 52.8H45.2l-1.3-14.7H64V24.5H27.9l3.9 41.9H64V52.8zm0 35.8l-.2.1-15.9-4.3-1-11.4H33.2l2 22.4 28.8 8V88.6z"
            fill="#EBEBEB"
          />
          <path
            d="M63.8 24.5v13.6h19.8l-1.9 21.2H63.8v13.5h31.9l-.3 3.6-3.7 41.3-27.9 7.7V119l28-7.7.3-3.6 4.3-48.4.3-3.6.4-4.8 1.4-15.6H63.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // CSS / CSS3
    case "css":
    case "css3":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M19.4 113.8L8.7 0h110.6l-10.7 113.7L63.8 128l-44.4-14.2z" fill="#1572B6" />
          <path d="M64 116.8l35.7-11.4 8.8-94.8H64v106.2z" fill="#33A9DC" />
          <path
            d="M64 53.6H45.4l-1.2-14.1H64V26H28.7l3.7 41.2H64V53.6zm0 36.3l-.2.1-16-4.3-1-11.5H33.3l2 22.6 28.7 8V89.9z"
            fill="#EBEBEB"
          />
          <path
            d="M63.8 67.2H81l-1.6 18.2-15.6 4.2V103l28-7.7.3-3.6 3.6-40.4.3-3.9H63.8v19.8zm0-41.2v13.5h33.8l1.2-13.5H63.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Node.js
    case "nodejs":
    case "node":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M64 6.7L11.5 37v60.6L64 128l52.5-30.4V37L64 6.7z"
            fill="#339933"
          />
          <path
            d="M64 12.6l47.4 27.4v54.8L64 122.2 16.6 94.8V40L64 12.6z"
            fill="#539E43"
          />
          <path
            d="M48.2 46.5c-7.8 0-14 3.7-14 11.2 0 11.8 17.5 10.4 17.5 17.3 0 2.8-2.6 4.3-6.6 4.3-5.2 0-9.2-2.1-12.7-6.2l-6.8 6.4c5.1 6.5 11.8 9.5 19.5 9.5 9.5 0 16.3-4.9 16.3-13.7 0-12.8-17.5-11.2-17.5-17.6 0-2.3 2.1-3.6 5.8-3.6 4.1 0 7.4 1.4 10.5 4.6l6.4-6.8c-4.4-4.2-9.8-5.4-18.4-5.4zm34.2.3v39.7c0 10.1-5.7 15.6-15.9 15.6-7.8 0-13.3-3.1-16.7-7.6l6.6-6.4c2.5 3.3 5.9 5.2 10.1 5.2 4.9 0 7.3-2.6 7.3-7.5V46.8h8.6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // MongoDB
    case "mongodb":
    case "mongo":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M62.6 1.8c-2.3 1.9-10.9 9.3-17.8 19.4-10.6 15.5-16.1 30.7-16.1 44.7 0 26.6 18.5 50.1 34.6 60.3 1.3.8 2.2 1 2.2.4 0-.3-.3-5.1-.6-10.6l-.6-10.1-2.9-1.5c-11.9-6.3-20.2-20.8-20.2-35.3 0-8.9 3-18.9 8.2-27.1 6.9-10.9 15.6-19.1 16-19.1.2 0 .4 9.1.4 20.3v20.3l1.8 1.9 1.8 1.9.4-31.5c.3-26.6.1-32.2-1.2-33.7-.9-1.2-4.4-1.7-6-1.5z"
            fill="#47A248"
          />
          <path
            d="M65.4 1.8c.8.6 3.8 3.9 6.6 7.4 8.7 10.7 17.5 25.8 20.9 36 2.5 7.6 3.1 13 3.1 23.3 0 13.9-4.8 26.7-13.8 36.6-5.8 6.4-13.6 11.4-19 12.3-.9.1-1.2.6-1.2 2.2 0 1.2.4 4.5.8 7.3l.8 5.2 1.4-.7c12.1-6.1 23.8-19.2 29.5-33.1 3.5-8.5 4.3-14 4.3-27.6 0-14.7-4.9-29.2-14.4-42.5-7.3-10.2-16.8-23.7-19-26.4h-2.1l2 0z"
            fill="#499D4A"
          />
        </svg>
      );

    // Express / Express.js
    case "express":
    case "expressjs":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <text
            x="64"
            y="88"
            fontSize="78"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
            fill="#242426"
            letterSpacing="-4"
          >
            ex
          </text>
        </svg>
      );

    // MySQL
    case "mysql":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M98.6 57.5c-4.2-7.5-12.7-11.6-21.7-10.4 4.9-4 12.2-5.7 18.2-3.8 3.6 1.1 6.8 3.5 9 6.7 1.4-2.8 1.4-6.3-.1-9.1-3-5.5-9.4-8.8-15.6-8.8-12.7 0-23.4 9.1-25.2 21.6-6.4 1.7-12 5.6-15.8 11-5.1 7.2-6.5 16.5-3.8 25 1.5 4.7 4.5 9 8.6 11.9 6.2 4.4 14.1 5.7 21.6 3.8 13.9-3.5 23.9-15.7 24.8-30.1.1-2.6 0-5.2-.4-7.8h.4z"
            fill="#00758F"
          />
          <text
            x="64"
            y="114"
            fontSize="26"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            fill="#00758F"
          >
            MySQL
          </text>
        </svg>
      );

    // Python
    case "python":
    case "py":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M63.2 2c-15.2 0-25 6.6-25 19.3v14.4h25.4v3.6H27.9C12.4 39.3 0 49.3 0 65.5s10.8 26.2 24.3 26.2h8v-11.7c0-12.8 10.9-24.1 24.1-24.1h25v-20c0-11.9-10.5-20.8-25-20.8h6.8zM45.5 12.1c3.8 0 6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9-6.9-3.1-6.9-6.9 3.1-6.9 6.9-6.9z"
            fill="#3776AB"
          />
          <path
            d="M64.8 126c15.2 0 25-6.6 25-19.3V92.3H64.4v-3.6h35.7c15.5 0 27.9-10 27.9-26.2s-10.8-26.2-24.3-26.2h-8v11.7c0 12.8-10.9 24.1-24.1 24.1h-25v20c0 11.9 10.5 20.8 25 20.8h-6.8zm17.7-10.1c-3.8 0-6.9-3.1-6.9-6.9s3.1-6.9 6.9-6.9 6.9 3.1 6.9 6.9-3.1 6.9-6.9 6.9z"
            fill="#FFD438"
          />
        </svg>
      );

    // Tailwind CSS
    case "tailwindcss":
    case "tailwind":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M64 25.6c-24 0-38.4 12-43.2 36 8.4-12 18-16.2 28.8-12.6 6.1 2 10.5 6.5 15.4 11.4 7.9 8.1 17 17.4 37 17.4 24 0 38.4-12 43.2-36-8.4 12-18 16.2-28.8 12.6-6.1-2-10.5-6.5-15.4-11.4-7.9-8.1-17-17.4-37-17.4zm-43.2 38.4c-24 0-38.4 12-43.2 36 8.4-12 18-16.2 28.8-12.6 6.1 2 10.5 6.5 15.4 11.4 7.9 8.1 17 17.4 37 17.4 24 0 38.4-12 43.2-36-8.4 12-18 16.2-28.8 12.6-6.1-2-10.5-6.5-15.4-11.4-7.9-8.1-17-17.4-37-17.4z"
            fill="#06B6D4"
          />
        </svg>
      );

    // FastAPI
    case "fastapi":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="64" fill="#05998B" />
          <path
            d="M68.5 22L33.7 68.2h28.1l-6.8 37.8 41.3-48.4H68.5l6.8-35.6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Django
    case "django":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#092E20" />
          <path
            d="M62 30.5h14.5v44.2c-4 2.1-8.5 3.3-14.5 3.3-13.6 0-21.8-8.2-21.8-21.6 0-14.4 9.1-23.2 21.8-23.2v-2.7zm0 16.2c-5.8 0-9.8 4.2-9.8 11.5 0 7.1 3.9 11.1 9.8 11.1v-22.6zm23.6-1.5h13.8v49c-4.4 2.3-9.9 3.5-15.8 3.5-5 0-9.2-1.3-11.7-3.3l3.6-10.2c2 1.4 4.8 2.3 7.8 2.3 4 0 6.1-1.7 6.1-6.1V45.2h-.1zm.1-14.7h13.8v11H85.7v-11z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // PostgreSQL
    case "postgresql":
    case "postgres":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M63.5 10c-25.2 0-41.2 16.7-44.5 36.8-3.4 20.8 6.5 40 21.6 49.3v18.7l12.8-7.5c3.2.7 6.6 1.1 10.1 1.1 27.6 0 49.5-21 49.5-49.2C113 29.8 91.1 10 63.5 10zm-9 68.7c-9.3 0-16.8-7.5-16.8-16.8 0-9.3 7.5-16.8 16.8-16.8s16.8 7.5 16.8 16.8c0 9.3-7.5 16.8-16.8 16.8z"
            fill="#336791"
          />
          <circle cx="54.5" cy="61.9" r="8" fill="#FFFFFF" />
          <circle cx="54.5" cy="61.9" r="4.5" fill="#336791" />
        </svg>
      );

    // Docker
    case "docker":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M125.8 54.8c-2.3-1.6-7.3-2.6-12.8-1.4-.8-6.1-4.8-11.6-10.5-14.7l-4.2-2.3-2.7 4c-5.8 8.6-6.6 19.3-2.1 28.6-2.5 1.4-5.8 2.6-9.6 3.4-3.5.7-7.4 1.1-11.4 1.1H8.5c-2.3 0-4.3.9-5.7 2.3-2.3 2.4-3.1 6.1-2.1 10.3 3.6 15 15.6 28.5 31.9 36 17.5 8.1 39.5 9 58.7 2.5 21-7.1 36.4-23.7 39.8-43.2.3-1.6.4-3.2.4-4.8 0-.6-.1-1.2-.2-1.8l-5.5.9z"
            fill="#2496ED"
          />
          <rect x="23.4" y="52.2" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="40.3" y="52.2" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="57.2" y="52.2" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="40.3" y="37.5" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="57.2" y="37.5" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="74.1" y="52.2" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="57.2" y="22.8" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
          <rect x="74.1" y="37.5" width="13.2" height="11.5" rx="1.5" fill="#2496ED" />
        </svg>
      );

    // PyTorch
    case "pytorch":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M66.4 11.5L64 14l-2.4-2.5a35.8 35.8 0 00-50.6 0 35.8 35.8 0 000 50.6l34.8 34.8a25.3 25.3 0 010-35.8L34 50.4a19.7 19.7 0 010-27.8 19.7 19.7 0 0127.8 0l2.2 2.2 2.2-2.2a19.7 19.7 0 0127.8 0 19.7 19.7 0 010 27.8L82.2 62.2l4.9 4.9 11.8-11.8a35.8 35.8 0 000-50.6 35.8 35.8 0 00-32.5 6.8z"
            fill="#EE4C2C"
          />
          <circle cx="89" cy="24" r="5" fill="#EE4C2C" />
        </svg>
      );

    // TensorFlow
    case "tensorflow":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path d="M64 128l-8-4.6V68.7L25.3 51l7.8-4.5 30.9 17.8V128z" fill="#E53935" />
          <path d="M64 128l8-4.6V64.3l30.9-17.8 7.8 4.5-30.7 17.7V123.4l-16 4.6z" fill="#FF8F00" />
          <path d="M64 0L17.5 26.8l7.8 4.5L64 9.1l38.7 22.2 7.8-4.5L64 0z" fill="#FFB300" />
          <path d="M64 36.3L40.7 22.9l-7.8 4.5L64 45.3l31.1-17.9-7.8-4.5L64 36.3z" fill="#FF6F00" />
        </svg>
      );

    // scikit-learn
    case "scikitlearn":
    case "sklearn":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="44" cy="48" r="32" fill="#F89939" opacity="0.9" />
          <circle cx="84" cy="80" r="32" fill="#3499CD" opacity="0.9" />
          <path
            d="M64 36l6 14-12 16 12 16-6 14"
            stroke="#FFFFFF"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );

    // OpenCV
    case "opencv":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="38" r="28" fill="#EA3829" />
          <circle cx="64" cy="38" r="14" fill="#EBEFF5" />
          <circle cx="36" cy="88" r="28" fill="#1C74B7" />
          <circle cx="36" cy="88" r="14" fill="#EBEFF5" />
          <circle cx="92" cy="88" r="28" fill="#01A858" />
          <circle cx="92" cy="88" r="14" fill="#EBEFF5" />
        </svg>
      );

    // Git
    case "git":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M125.7 57.5L70.5 2.3c-3.1-3.1-8.1-3.1-11.2 0L47.5 14.1l14.2 14.2c3.3-1.1 7.1-.4 9.8 2.3 2.7 2.7 3.4 6.5 2.3 9.8l13.7 13.7c3.3-1.1 7.1-.4 9.8 2.3 3.9 3.9 3.9 10.2 0 14.1s-10.2 3.9-14.1 0c-2.9-2.9-3.5-7.1-2-10.3L68.8 47.7v34.4c1 .6 2 1.5 2.7 2.3 3.9 3.9 3.9 10.2 0 14.1s-10.2 3.9-14.1 0-3.9-10.2 0-14.1c1.1-1.1 2.3-1.8 3.7-2.3V46.8c-1.4-.5-2.6-1.2-3.7-2.3-3-3-3.5-7.3-1.8-10.7L41.7 19.9 2.3 59.3c-3.1 3.1-3.1 8.1 0 11.2l55.2 55.2c3.1 3.1 8.1 3.1 11.2 0l57-57c3.1-3.1 3.1-8.1 0-11.2z"
            fill="#F05032"
          />
        </svg>
      );

    // AWS
    case "aws":
    case "amazonwebservices":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M40 76.8c-11.4 8.4-28 13-40 13-1.7 0-2.3-1.3-.9-2.3 12.6-9.1 29.8-14.2 41.5-14.2 1.8 0 2.2 1.7-.6 3.5zm88-1.5c-3.7-4.8-12.2-2.3-17.9-1.2-1.7.3-2-.9-.5-2 10.1-7.1 21.6-4.9 23-3.1 1.5 1.8-1.3 13.5-10.6 21.6-1.5 1.3-2.5.6-1.7-1.1 2.9-5.9 8.9-12.9 7.7-14.2zm-97.8-43h10.9v28.2c0 6.4 3.7 9.8 9.5 9.8 4.7 0 8.3-2.6 10.4-6.3v-31.7h10.9v42.2h-10.5V70c-2.8 3.5-7.3 5.4-12.4 5.4-9.9 0-18.8-6.6-18.8-19.4V32.3zm55.3 0h11.2l6.8 26.6 7-26.6h10.5l-12.8 42.2h-10.5L88.9 50l-6.9 24.5H71.5L58.7 32.3h6.8z"
            fill="#232F3E"
          />
          <path
            d="M33.6 86.6c19.3 8.3 42.7 8.3 62 0 2.2-.9 4.3 1.3 2.5 2.8-19.9 16.5-47.1 16.5-67 0-1.8-1.5.3-3.7 2.5-2.8z"
            fill="#FF9900"
          />
        </svg>
      );

    // Linux
    case "linux":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path
            d="M64 4c-16.5 0-26 12-26 26.5v18.7c0 8-3.4 15.6-9.5 21.1-6.1 5.5-9.5 13.2-9.5 21.3 0 15 11.2 27.2 26 28.9-2.5 2.1-4 5.1-4 8.5 0 6.6 6.3 12 14 12h18c7.7 0 14-5.4 14-12 0-3.4-1.5-6.4-4-8.5 14.8-1.7 26-13.9 26-28.9 0-8.1-3.4-15.8-9.5-21.3-6.1-5.5-9.5-13.1-9.5-21.1V30.5C90 16 80.5 4 64 4z"
            fill="#242426"
          />
          <ellipse cx="53" cy="28" rx="4" ry="7" fill="#FFFFFF" />
          <ellipse cx="75" cy="28" rx="4" ry="7" fill="#FFFFFF" />
          <circle cx="54" cy="29" r="2.5" fill="#000000" />
          <circle cx="74" cy="29" r="2.5" fill="#000000" />
          <path d="M51 38c0 8 5.8 14 13 14s13-6 13-14c0-2-5.8-3-13-3s-13 1-13 3z" fill="#FFA500" />
          <path d="M42 62c-7 8-10 18-10 26 0 12 14 20 32 20s32-8 32-20c0-8-3-18-10-26-4 8-13 14-22 14s-18-6-22-14z" fill="#FFFFFF" />
        </svg>
      );

    // LangChain
    case "langchain":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="28" fill="#1C3C3C" />
          <circle cx="48" cy="64" r="18" stroke="#10B981" strokeWidth="8" fill="none" />
          <circle cx="80" cy="64" r="18" stroke="#38BDF8" strokeWidth="8" fill="none" />
          <path d="M48 64h32" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    // Hugging Face
    case "huggingface":
    case "hf":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <circle cx="64" cy="64" r="60" fill="#FFD21E" />
          {/* Eyes */}
          <ellipse cx="44" cy="54" rx="6" ry="8" fill="#000000" />
          <ellipse cx="84" cy="54" rx="6" ry="8" fill="#000000" />
          {/* Smile */}
          <path
            d="M44 76c5 10 14 15 20 15s15-5 20-15"
            stroke="#000000"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hugging hands */}
          <path
            d="M20 78c6-8 16-10 24-4M108 78c-6-8-16-10-24-4"
            stroke="#EA580C"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    // NLP
    case "nlp":
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#6366F1" />
          <path
            d="M32 44h64M32 64h44M32 84h54"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="92" cy="74" r="8" fill="#A5B4FC" />
        </svg>
      );

    default:
      return (
        <span className="text-2xl font-bold flex items-center justify-center">
          ⚡
        </span>
      );
  }
}
