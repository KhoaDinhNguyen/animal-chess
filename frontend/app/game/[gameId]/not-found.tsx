"use client";

import { SearchX, RotateCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";

// Not found page
export default function NotFoundGame({ gameId }: { gameId: string }) {
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative">
      {/** Background watermark */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none flex items-center justify-center"
        aria-hidden="true">
        <SearchX size={320} style={{ color: "#c8892a", opacity: 0.03 }} />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Error code */}
        <p
          className="text-8xl font-bold mb-2"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: "#c8892a",
            opacity: 0.18,
            lineHeight: 1,
            letterSpacing: "0.05em",
          }}>
          404
        </p>

        {/* Icon */}
        <div
          className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 -mt-6"
          style={{ background: "rgba(184,52,27,0.12)", border: "1px solid rgba(184,52,27,0.3)" }}>
          <SearchX size={28} style={{ color: "#b8341b" }} />
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl mb-3"
          style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
          Game Not Found
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #b8341b)" }} />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
            The jungle has no record of this game
          </span>
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #b8341b, transparent)" }} />
        </div>

        <p className="text-sm leading-relaxed mb-10" style={{ color: "#8fa88a" }}>
          The game you are looking for may have ended, never existed, or the ID was entered incorrectly.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.refresh()}
            className="flex items-center gap-2 px-7 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105 active:scale-100"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, #c8892a, #a06a18)",
              color: "#0b1a10",
              fontWeight: 600,
              borderRadius: "2px",
              border: "none",
              boxShadow: "0 4px 24px rgba(200,137,42,0.3)",
            }}>
            <RotateCcw size={15} />
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-7 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-200 hover:scale-105 active:scale-100"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "transparent",
              color: "#8fa88a",
              fontWeight: 600,
              borderRadius: "2px",
              border: "1px solid rgba(143,168,138,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <Home size={15} />
            Return Home
          </button>
        </div>
      </div>
    </main>
  );
}
