import type { Metadata } from "next";
import { Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";
import DynamicFavicon from "@/components/ui/DynamicFavicon";
import CommandPalette from "@/components/ui/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adii.dev"), // TODO: replace with your real domain
  title: "Aditya Singh Rajput — AI/ML Engineer & Full-Stack Developer",
  description:
    "AI/ML engineer and full-stack developer building computer vision, NLP, and scalable AI systems. Based in India, open to roles worldwide.",
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
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "NLP",
    "Full-Stack Developer",
    "Next.js",
    "Python",
    "FastAPI",
    "Aditya Singh Rajput",
    "Adii Portfolio",
  ],
  authors: [{ name: "Aditya Singh Rajput", url: "https://github.com/adii0018" }],
  creator: "Aditya Singh Rajput",
  openGraph: {
    title: "Aditya Singh Rajput — AI/ML Engineer & Full-Stack Developer",
    description:
      "AI/ML engineer and full-stack developer. Computer Vision, NLP, scalable AI systems.",
    type: "website",
    locale: "en_US",
    siteName: "Aditya Singh Rajput",
    // TODO: add og:image — place a 1200×630 PNG at /public/og-image.png and uncomment:
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aditya Singh Rajput" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Singh Rajput — AI/ML Engineer & Full-Stack Developer",
    description:
      "AI/ML engineer building computer vision, NLP, and full-stack AI systems.",
    // TODO: add twitter:image — same as og:image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fragmentMono.variable}`}>
      <body className={`${inter.className} noise-bg`}>
        <DynamicFavicon />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
