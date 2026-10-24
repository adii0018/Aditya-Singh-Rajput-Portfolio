import type { NextConfig } from "next";

// Security headers applied to every response (S01)
const SECURITY_HEADERS = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Allow Formspree, Google Fonts, GitHub avatars; block framing
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // unsafe-eval required by GSAP
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://avatars.githubusercontent.com https://ghchart.rshah.org https://github-readme-stats.vercel.app",
      "media-src 'self'",
      "connect-src 'self' https://formspree.io https://api.github.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      // Force non-www apex domain to canonical www domain (Task 8)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "adityasinghrajput.me",
          },
        ],
        destination: "https://www.adityasinghrajput.me/:path*",
        permanent: true,
      },
      // Force legacy Vercel preview domain to canonical www domain (Task 8)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio-sepia-three-56.vercel.app",
          },
        ],
        destination: "https://www.adityasinghrajput.me/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
