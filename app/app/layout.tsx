import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
// import SocketProvider from "@/realTimeCommunication/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animal Chess | Play Dou Shou Qi Online",
  description:
    "Play Animal Chess (Dou Shou Qi) online with friends or challenge an AI. Enjoy real-time multiplayer, strategic gameplay, and a modern web experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col text-foreground relative overflow-x-hidden"
        style={{
          fontFamily: "'Noto Serif', Georgia, serif",
          background: "radial-gradient(ellipse at 50% 0%, #1a3a22 0%, #0b1a10 55%, #060e09 100%)",
          color: "#f0e4c2",
        }}>
        <PageAccentIndicator />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function PageAccentIndicator() {
  return (
    <div
      className="w-full h-0.5"
      style={{
        background: "linear-gradient(90deg, transparent, #c8892a 30%, #b8341b 50%, #c8892a 70%, transparent)",
      }}
    />
  );
}

export function PageLogo() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#c8892a" }}>
        SDQ
      </span>
      <div className="w-px h-8 bg-border" />
      <span className="text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        Shou Dou Qi - Animal Chess
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-8 py-6" style={{ borderTopColor: "#c8892a50" }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
          &copy; 2026 Shou Dou Qi — Animal Chess
        </span>
        <div className="flex items-center gap-2 text-lg">
          <span>🐘</span>
          <span style={{ color: "#2e4a38" }}>·</span>
          <span>🦁</span>
          <span style={{ color: "#2e4a38" }}>·</span>
          <span>🐯</span>
          <span style={{ color: "#2e4a38" }}>·</span>
          <span>🐀</span>
        </div>
        <div className="flex gap-5">
          <a
            href="#"
            className="text-xs tracking-widest uppercase transition-colors hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
            Privacy
          </a>
          <a
            href="#"
            className="text-xs tracking-widest uppercase transition-colors hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
            Terms
          </a>
          <a
            href="#"
            className="text-xs tracking-widest uppercase transition-colors hover:text-primary"
            style={{ fontFamily: "'Cinzel', serif", color: "#4a6350" }}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
