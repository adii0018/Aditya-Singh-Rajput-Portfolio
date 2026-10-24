import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import DynamicFavicon from "@/components/ui/DynamicFavicon";
import CommandPalette from "@/components/ui/CommandPalette";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, NAME, ROLE, DESCRIPTION, SOCIAL_LINKS } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const rawGoogleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "8ErObVQ509QnnduIF3GExso8Dns7FTYI42bAZISKF7o";

const googleVerification = rawGoogleVerification
  ? rawGoogleVerification.replace(/^google-site-verification=/, "").trim()
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} | ${ROLE}`,
    template: `%s | ${NAME}`,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicons/favicon-32x32.png",
    apple: "/favicons/favicon-32x32.png",
  },
  keywords: [
    "Aditya Singh Rajput",
    "Adii",
    "AI/ML Engineer",
    "Machine Learning",
    "Computer Vision",
    "NLP",
    "Full-Stack Developer",
    "Next.js",
    "Python",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: NAME, url: SOCIAL_LINKS.github }],
  creator: NAME,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} | ${ROLE}`,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} | ${ROLE}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body className={`${geist.className} noise-bg`}>
        <JsonLd />
        <DynamicFavicon />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
