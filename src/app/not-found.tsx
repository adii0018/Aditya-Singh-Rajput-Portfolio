import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The requested page could not be located.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111110] text-[#FAFAF8] flex flex-col items-center justify-center px-6 selection:bg-[#D9FF5C] selection:text-[#111110]">
      {/* Decorative top accent line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#D9FF5C]" />

      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#D9FF5C] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF5C] animate-pulse" />
          Error 404 · Signal Lost
        </div>

        <h1 className="text-6xl sm:text-7xl font-mono font-black tracking-tight text-white">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-sm text-[#78716C] leading-relaxed">
            The page or resource you are looking for does not exist, has been moved,
            or the coordinates were mistyped.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#D9FF5C] text-[#111110] hover:bg-[#cbf54a] transition-all cursor-pointer shadow-lg shadow-[#D9FF5C]/10"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
