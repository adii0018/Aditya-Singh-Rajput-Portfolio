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
  title: "Adii — AI/ML Engineer & Full-Stack Developer",
  description:
    "I build AI-powered products that transform complex ideas into intelligent, real-world solutions. Computer Vision, NLP, and scalable architectures.",
  icons: {
    icon: "/favicons/a-minimal.png",
    shortcut: "/favicons/a-minimal.png",
    apple: "/favicons/a-minimal.png",
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
    title: "Adii — AI/ML Engineer & Full-Stack Developer",
    description:
      "I build AI-powered products that transform complex ideas into intelligent, real-world solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Adii Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adii — AI/ML Engineer & Full-Stack Developer",
    description:
      "I build AI-powered products that transform complex ideas into intelligent, real-world solutions.",
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
