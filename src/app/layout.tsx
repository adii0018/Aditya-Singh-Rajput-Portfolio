import type { Metadata } from "next";
import { Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";

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
    "I build AI-powered products that transform complex ideas into intelligent, real-world solutions.",
  keywords: ["AI", "ML", "Full-Stack", "Developer", "Aditya Singh Rajput", "Portfolio"],
  authors: [{ name: "Aditya Singh Rajput" }],
  openGraph: {
    title: "Adii — AI/ML Engineer & Full-Stack Developer",
    description:
      "I build AI-powered products that transform complex ideas into intelligent, real-world solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fragmentMono.variable}`}>
      <body className={`${inter.className} noise-bg`}>{children}</body>
    </html>
  );
}
